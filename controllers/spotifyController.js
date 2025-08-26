const querystring = require("querystring");
const axios = require("axios");

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;


const scope = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private'
].join(' ');


exports.spotifyLogin = (req, res) => {
  const params = querystring.stringify({
    response_type: "code",
    client_id,
    scope: scope,
    redirect_uri,
    state: "some-state-of-your-choice",  
});


  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
}


exports.exchangeToken = async (req, res) => {
  const code = req.body.code;

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI);
    params.append("client_id", process.env.SPOTIFY_CLIENT_ID);
    params.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET);

    const response = await axios.post("https://accounts.spotify.com/api/token", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const accessToken = response.data.access_token;

    res.json({ access_token: accessToken });

  } catch (err) {
    console.error("Token exchange failed:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to exchange token" });
  }
};


// Fetch playlists
exports.fetchUserPlaylists = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    const fetch = (await import('node-fetch')).default;

    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.status(200).json({ playlists: data.items });
  } catch (error) {
    console.error("Spotify fetch error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





// 
exports.portSpotifyPlaylistToYouTube = async (req, res) => {
  const { spotifyPlaylistId, spotify_access_token, youtube_access_token } = req.body

  // Validate required params
  if (!spotifyPlaylistId) {
    console.log('Missing "spotifyPlaylistId" in request body')
    return res.status(400).json({ error: 'spotifyPlaylistId is required' })
  }

  if (!youtube_access_token) {
    console.log('Missing youtube_access_token in request body')
    return res.status(400).json({ error: 'youtube_access_token is required' })
  }

  if (!spotify_access_token) {
    console.log('Missing spotify_access_token in request body')
    return res.status(400).json({ error: 'spotify_access_token is required' })
  }

  

  try {
    console.log('Starting playlist migration...')
    console.log(`Using Spotify playlist ID: ${spotifyPlaylistId}`)

    let playlistMeta
    try {
      console.log('Fetching Spotify playlist metadata...')
      playlistMeta = await getSpotifyPlaylistMeta(spotifyPlaylistId, spotify_access_token)
    } catch (e) {
      console.error('Failed to fetch Spotify playlist metadata:', e.response?.data || e.message)
      return res.status(500).json({ error: 'Failed to fetch Spotify playlist metadata' })
    }

    const playlistName = playlistMeta.name || `Imported Playlist ${spotifyPlaylistId}`
    console.log(`Playlist name: "${playlistName}"`)

    let spotifyTracks
    try {
      console.log('Fetching Spotify playlist tracks...')
      spotifyTracks = await getSpotifyTracks(spotifyPlaylistId, spotify_access_token)
    } catch (e) {
      console.error('Failed to fetch Spotify tracks:', e.response?.data || e.message)
      return res.status(500).json({ error: 'Failed to fetch tracks from Spotify' })
    }

    if (!spotifyTracks.length) {
      console.log('Spotify playlist is empty')
      return res.status(400).json({ error: 'Spotify playlist is empty' })
    }

    console.log(`Fetched ${spotifyTracks.length} tracks from Spotify`)

    let youtubePlaylistId
    try {
      console.log('Creating YouTube playlist...')
      youtubePlaylistId = await createYouTubePlaylist(playlistName, youtube_access_token)
    } catch (e) {
      console.error('Failed to create YouTube playlist:', e.response?.data || e.message)
      return res.status(500).json({ error: 'Failed to create YouTube playlist' })
    }

    console.log(`Created YouTube playlist with ID: ${youtubePlaylistId}`)

    const missedTracks = []

    console.log('Migrating tracks one by one...')
    for (const track of spotifyTracks) {
      const query = `${track.name} ${track.artist}`
      console.log(`Searching YouTube for: "${query}"`)

      try {
        const videoId = await searchYouTube(query, youtube_access_token)

        if (videoId) {
          console.log(`Found video ID: ${videoId}, adding to YouTube playlist...`)
          await addToYouTubePlaylist(videoId, youtubePlaylistId, youtube_access_token)
        } else {
          console.log(`No YouTube match found for: "${query}"`)
          missedTracks.push(query)
        }
      } catch (e) {
        console.error(`Error processing track "${query}":`, e.response?.data || e.message)
        missedTracks.push(query)
      }
    }

    console.log('Migration complete')
    console.log(`Missed tracks: ${missedTracks.length}`)

    res.json({
      message: 'Transfer complete',
      youtubePlaylistId,
      missedTracks
    })

  } catch (err) {
    console.error('Unexpected error during migration:', err.stack || err)
    res.status(500).json({ error: 'Something went wrong internally', details: err.message })
  }
}





async function getSpotifyTracks(playlistId, token) {
  const headers = { Authorization: `Bearer ${token}` }
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`
  const allTracks = []
  let nextUrl = url

  while (nextUrl) {
    const response = await axios.get(nextUrl, { headers })
    const items = response.data.items

    items.forEach(item => {
      if (item.track) {
        allTracks.push({
          name: item.track.name,
          artist: item.track.artists.map(a => a.name).join(', ')
        })
      }
    })

    nextUrl = response.data.next
  }

  return allTracks
}

async function searchYouTube(query, token) {
  const url = `https://www.googleapis.com/youtube/v3/search`
  const params = {
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: 1
  }
  const headers = { Authorization: `Bearer ${token}` }

  const response = await axios.get(url, { params, headers })
  const items = response.data.items

  return items.length > 0 ? items[0].id.videoId : null
}

async function createYouTubePlaylist(title, token) {
  const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,status`
  const body = {
    snippet: { title, description: 'Imported from Spotify' },
    status: { privacyStatus: 'private' }
  }
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  const response = await axios.post(url, body, { headers })
  return response.data.id
}

async function addToYouTubePlaylist(videoId, playlistId, token) {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet`
  const body = {
    snippet: {
      playlistId,
      resourceId: {
        kind: 'youtube#video',
        videoId
      }
    }
  }
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  await axios.post(url, body, { headers })
}

async function getSpotifyPlaylistMeta(playlistId, token) {
  const headers = { Authorization: `Bearer ${token}` }
  const url = `https://api.spotify.com/v1/playlists/${playlistId}`

  const response = await axios.get(url, { headers })
  return {
    name: response.data.name,
    description: response.data.description
  }
}

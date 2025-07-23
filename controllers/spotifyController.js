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
<<<<<<< HEAD
=======
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
>>>>>>> 856f8fa7ea2512e39c239ca34c1ad7e654758102
};
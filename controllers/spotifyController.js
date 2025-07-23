// controllers/spotifyController.js
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
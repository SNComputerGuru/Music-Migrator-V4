// Login
const querystring = require("querystring");

exports.youtubeLogin = (req, res) => {
  const params = querystring.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/youtube.readonly",
      "https://www.googleapis.com/auth/youtube.force-ssl"
    ].join(" "),
    access_type: "offline",
    prompt: "consent"
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
};


// Token exchange
const axios = require("axios");

exports.exchangeYoutubeToken = async (req, res) => {
  const code = req.body.code;

  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code"
    });

    res.json(response.data); // access_token, refresh_token, etc.

  } catch (error) {
    console.error("YouTube token exchange failed:", error.response?.data || error.message);
    res.status(500).json({ error: "Token exchange failed" });
  }
};

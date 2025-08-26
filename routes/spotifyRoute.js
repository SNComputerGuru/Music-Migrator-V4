const express = require("express");
const router = express.Router();
const { 
    spotifyLogin,
    exchangeToken,
    fetchUserPlaylists,
    portSpotifyPlaylistToYouTube
    } = require("../controllers/spotifyController");

// GET
router.get("/login/spotify", spotifyLogin);
router.get("/spotify/playlists", fetchUserPlaylists);

// POST
router.post("/spotify/token", exchangeToken);
router.post("/spotify/migrate", portSpotifyPlaylistToYouTube);

module.exports = router;
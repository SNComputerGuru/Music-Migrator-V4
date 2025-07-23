const express = require("express");
const router = express.Router();
const { spotifyLogin, exchangeToken, fetchUserPlaylists } = require("../controllers/spotifyController");

// GET
router.get("/login/spotify", spotifyLogin);
router.get("/spotify/playlists", fetchUserPlaylists);

// POST
router.post("/spotify/token", exchangeToken);

module.exports = router;
const express = require("express");
const router = express.Router();
const { spotifyLogin, exchangeToken } = require("../controllers/spotifyController");

router.get("/login/spotify", spotifyLogin);
router.post("/spotify/token", exchangeToken);

module.exports = router;
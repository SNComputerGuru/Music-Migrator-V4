const express = require("express");
const router = express.Router();

const { youtubeLogin, exchangeYoutubeToken} = require('../controllers/youtubeController');

router.get("/youtube/login", youtubeLogin);
router.post("/youtube/token", exchangeYoutubeToken);

module.exports = router;
const express = require("express");
const router = express.Router();
const {testing} = require("../controllers/testController")

router.get("/testing", testing);

module.exports = router;
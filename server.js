const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();


app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// Use Routes
//=========================================================
const testRouter = require("./routes/testRoute");
app.use("/", testRouter);

const spotifyRoute = require("./routes/spotifyRoute");
app.use("/api", spotifyRoute);

const youtubeRouter = require("./routes/youtubeRoute");
app.use("/api", youtubeRouter);

//=========================================================


const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Server running on Port ${PORT}`);
});

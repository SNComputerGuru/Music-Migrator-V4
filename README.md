<h1 align="center" style="color:#1DB954;">🎵 Music Migrator V4 🎶</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Spotify-API-1DB954?style=for-the-badge&logo=spotify&logoColor=white" />
  <img src="https://img.shields.io/badge/Youtube-API-FF0000?style=for-the-badge&logo=youtube&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js&logoColor=white" />
</p>

> A sleek utility to transfer your playlists from **Spotify** to **YouTube**. Built with ❤️ using Express, modern JavaScript, and OAuth2 integrations.

---

## 🚀 Features

- 🔐 Auth via Spotify & YouTube OAuth
- 🎧 Fetch and list all your Spotify playlists
- 📺 (Soon) Migrate them to YouTube Music
- ✅ Clean UI with checkbox selections
- ⚙️ Local API with Express.js

---

## 🛠️ Getting Started

Follow these simple steps to run the app locally:

```bash
# 1. Clone this repository
git clone https://github.com/your-username/music-migrator-v4.git
cd music-migrator-v4

# 2. Install dependencies
npm install

# 3. Start the development server
npm run devStart

---
🔐 Environment Setup
This project uses sensitive credentials from Spotify and YouTube, so the .env file is NOT included for security reasons.

You'll need:
A Spotify Developer Account

Get it here: https://developer.spotify.com/dashboard/

A Google Developer Console Project with YouTube Data API enabled

https://console.developers.google.com/

Your .env should look like this:
env
Copy
Edit
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/spotify/callback

YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_secret
YOUTUBE_REDIRECT_URI=http://localhost:3000/api/youtube/callback
Keep your credentials private! Never commit this file to GitHub.

🧪 Tech Stack
Node.js + Express

Spotify Web API

YouTube Data API

HTML/CSS/Vanilla JS

SessionStorage for auth tokens

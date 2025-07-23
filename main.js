window.addEventListener('DOMContentLoaded', () => {
  // === SPOTIFY STATUS ===
  const spotifyToken = sessionStorage.getItem('spotify_access_token');

  if (spotifyToken) {
    console.log("Spotify token found:", spotifyToken);

    const spotifyStatus = document.getElementById("spotify-status");
    const spotifyDot = spotifyStatus.querySelector(".status-dot");
    const spotifyText = spotifyStatus.querySelector(".status-text");
    const spotifyInfo = document.getElementById("spotify-user-info");
    const spotifyBtn = document.getElementById("spotify-login-btn");

    spotifyText.textContent = "Connected";
    spotifyDot.style.backgroundColor = "green";
    spotifyBtn.style.display = "none";
    spotifyInfo.textContent = "Spotify account connected successfully!";
  }

  // === YOUTUBE STATUS UPDATE ===
  const youtubeToken = sessionStorage.getItem('youtube_access_token');

  if (youtubeToken) {
    console.log("YouTube token found:", youtubeToken);

    const youtubeStatus = document.getElementById("youtube-status");
    const youtubeDot = youtubeStatus.querySelector(".status-dot");
    const youtubeText = youtubeStatus.querySelector(".status-text");
    const youtubeInfo = document.getElementById("youtube-user-info");
    const youtubeBtn = document.getElementById("youtube-login-btn");

    youtubeText.textContent = "Connected";
    youtubeDot.style.backgroundColor = "green";
    youtubeBtn.style.display = "none";
    youtubeInfo.textContent = "YouTube account connected successfully!";
  }
});


// Eventlistener for the Spotify login button
document.getElementById("spotify-login-btn").addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:3000/api/login/spotify";
})

// Eventlistener for the Youtube login button
document.getElementById("youtube-login-btn").addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:3000/api/youtube/login";
});


// Decide whether or not to show the Continue button
const continueBtn = document.getElementById("continue-btn");

const checkTokens = setInterval(() => {
  const spotifyToken = sessionStorage.getItem('spotify_access_token');
  const youtubeToken = sessionStorage.getItem('youtube_access_token');

  if (spotifyToken && youtubeToken) {
    continueBtn.style.display = "inline";
    console.log("Both tokens found. Showing Continue button.");

    // Stop checking once both tokens are found
    clearInterval(checkTokens);
  }
}, 500);

// Continue Button redirect to spotify_playlists.html
document.getElementById("continue-btn").addEventListener("click", () => {
  window.location.href = "./pages/spotify_playlists.html";
});
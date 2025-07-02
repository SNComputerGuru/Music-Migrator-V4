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

  // === SHOW CONTINUE BUTTON ===
  if (spotifyToken && youtubeToken) {
    continueBtn.style.display = "block"; // or "inline-block" if you'd like it inline
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
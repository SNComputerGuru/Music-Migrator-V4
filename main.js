window.addEventListener('DOMContentLoaded', () => {
  const spotifyToken = sessionStorage.getItem('spotify_access_token');

  if (spotifyToken) {
    console.log("Spotify token found:", spotifyToken);

    const spotifyStatus = document.getElementById("spotify-status");
    const statusDot = spotifyStatus.querySelector(".status-dot");
    const statusText = spotifyStatus.querySelector(".status-text");
    const userInfo = document.getElementById("spotify-user-info");
    const loginBtn = document.getElementById("spotify-login-btn");

    statusText.textContent = "Connected";
    statusDot.style.backgroundColor = "green";

    loginBtn.style.display = "none";

    userInfo.textContent = "Spotify account connected successfully!";
  }
});

// Event Listers for the Spotify login button
document.getElementById("spotify-login-btn").addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:3000/api/login/spotify";
})
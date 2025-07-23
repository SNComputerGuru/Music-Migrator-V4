import { displayPlaylists } from "../utils/utils.js";




// onclick for the Refresh Playlists button
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("display-playlist");

  button.addEventListener("click", () => {
    console.log("Here");
    const token = sessionStorage.getItem("spotify_access_token");

    if (!token) {
      console.error("No Spotify access token found in sessionStorage.");
      return;
    }

  button.textContent = "Loading playlists...";
  button.style.color = "#999";
  button.style.backgroundColor = "#333";
  button.disabled = true;

    fetch("http://127.0.0.1:3000/api/spotify/playlists", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched playlists:", data);
        const playlists = data.playlists;
        displayPlaylists(playlists);
      })
      .catch(error => {
        console.error("Error fetching playlists:", error);
      })
      .finally(() => {
        button.textContent = "Refresh Playlists";
        button.style.color = "#fff";
        button.style.backgroundColor = "#1db954";
        button.disabled = false;

      });
  });
});


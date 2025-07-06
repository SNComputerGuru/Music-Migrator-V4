// onclick for the Refresh Playlists button
console.log("Here");
document.getElementById("display-playlist").addEventListener("click", () => {
  const token = sessionStorage.getItem("spotify_access_token");

  if (!token) {
    console.error("No Spotify access token found in sessionStorage.");
    return;
  }

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
    })
    .catch(error => {
      console.error("Error fetching playlists:", error);
    });
});

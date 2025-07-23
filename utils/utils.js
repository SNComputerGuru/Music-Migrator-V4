const selectedPlaylists = [];

export function displayPlaylists(playlists) {
  const container = document.getElementById("playlist-list");
  const continueBtn = document.getElementById("continue-btn");

  if (!container) {
    console.error("Playlist container not found.");
    return;
  }

  const selectedPlaylists = [];

  container.innerHTML = "";

  playlists.forEach(playlist => {
    const playlistItem = document.createElement("div");
    playlistItem.classList.add("playlist-item");

    playlistItem.innerHTML = `
      <input type="checkbox">
      <img src="${playlist.images[0]?.url || ''}" alt="${playlist.name}">
      <span class="playlist-title">${playlist.name}</span>
    `;

    const checkbox = playlistItem.querySelector("input");

    playlistItem.addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() === "input") return;
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event("change"));
    });

    checkbox.addEventListener("change", () => {
      const index = selectedPlaylists.findIndex(p => p.id === playlist.id);
      if (checkbox.checked && index === -1) {
        selectedPlaylists.push(playlist);
      } else if (!checkbox.checked && index !== -1) {
        selectedPlaylists.splice(index, 1);
      }

      sessionStorage.setItem("selected_playlists", JSON.stringify(selectedPlaylists));

      //Show/hide the continue button
      if (selectedPlaylists.length > 0) {
        continueBtn.style.display = "inline-block";
      } else {
        continueBtn.style.display = "none";
      }

      console.log("Selected:", selectedPlaylists);
    });

    container.appendChild(playlistItem);
  });
}

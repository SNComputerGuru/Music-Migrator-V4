const selectedPlaylists = [];

export function displayPlaylists(playlists) {
  const container = document.getElementById("playlist-list");

  if (!container) {
    console.error("Playlist container not found.");
    return;
  }

  console.log(playlists);
  container.innerHTML = "";

  playlists.forEach(playlist => {
    const playlistItem = document.createElement("div");
    playlistItem.classList.add("playlist-item");

    playlistItem.innerHTML = `
      <input type="checkbox">
      <img src="${playlist.images[0].url}" alt="${playlist.name}">
      <span class="playlist-title">${playlist.name}</span>
    `;

    const checkbox = playlistItem.querySelector('input[type="checkbox"]');

    playlistItem.addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() === "input") return;

      checkbox.checked = !checkbox.checked;
      handleSelectionChange(checkbox.checked, playlist);
    });

    checkbox.addEventListener("change", () => {
      handleSelectionChange(checkbox.checked, playlist);
    });

    container.appendChild(playlistItem);
  });

  function handleSelectionChange(isChecked, playlist) {
    const playlistInfo = {
      id: playlist.id,
      name: playlist.name,
      image: playlist.images[0].url
    };

    if (isChecked) {
      if (!selectedPlaylists.some(p => p.id === playlist.id)) {
        selectedPlaylists.push(playlistInfo);
      }
    } else {
      const index = selectedPlaylists.findIndex(p => p.id === playlist.id);
      if (index !== -1) {
        selectedPlaylists.splice(index, 1);
      }
    }

    // 🔐 Store updated array in sessionStorage
    sessionStorage.setItem("selected_playlists", JSON.stringify(selectedPlaylists));

    console.log("Selected playlists:", selectedPlaylists);
  }

}

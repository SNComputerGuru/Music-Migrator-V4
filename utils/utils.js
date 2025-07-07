export function displayPlaylists(playlists){
  const container = document.getElementById("playlist-list");

  if (!container) {
    console.error("Playlist container not found.");
    return;
  }
  console.log(playlists);
  // Clear existing playlists to avoid duplicates
  container.innerHTML = "";

  playlists.forEach(playlist => {
    const playlistItem = document.createElement("div");
    playlistItem.classList.add("playlist-item");

    playlistItem.innerHTML = `
      <input type="checkbox">
      <img src="${playlist.images[0].url}" alt="${playlist.name}">
      <span class="playlist-title">${playlist.name}</span>
    `;
    
    playlistItem.addEventListener("click", (event) => {
        // Prevent toggling if the click is directly on the checkbox
        if (event.target.tagName.toLowerCase() === "input") return;

        const checkbox = playlistItem.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
        });
    container.appendChild(playlistItem);
  });
}
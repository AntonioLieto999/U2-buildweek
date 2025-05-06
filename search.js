const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");

const API_URL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const API_OPTIONS = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "20bdf23e00msh67850135a297dcap159dc5jsn5cee08722670",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

async function fetchSearchResults(query) {
  try {
    const response = await fetch(`${API_URL}${query}`, API_OPTIONS);
    if (!response.ok) throw new Error("Errore nella fetch");
    const data = await response.json();
    renderResults(data.data);
  } catch (error) {
    console.error("Errore nella ricerca:", error);
    resultsContainer.innerHTML = `<p>Qualcosa è andato storto. Riprova più tardi.</p>`;
  }
}

function renderResults(results) {
  resultsContainer.innerHTML = "";
  results.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("result-card");
    card.innerHTML = `
      <img src="${item.album.cover_medium}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p><strong>Artista:</strong> <a href="artist.html?id=${item.artist.id}">${item.artist.name}</a></p>
      <p><strong>Album:</strong> <a href="album.html?id=${item.album.id}">${item.album.title}</a></p>
    `;
    resultsContainer.appendChild(card);
  });
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) fetchSearchResults(query);
});

searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) fetchSearchResults(query);
  }
});

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");
const grid = document.getElementById("grid");

const API_URL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const API_OPTIONS = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "20bdf23e00msh67850135a297dcap159dc5jsn5cee08722670",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

// Funzione per fetch + rendering
async function fetchSearchResults(query) {
  try {
    grid.style.display = "none"; // Nasconde la griglia iniziale
    resultsContainer.innerHTML = "<p>Caricamento in corso...</p>";

    const response = await fetch(`${API_URL}${query}`, API_OPTIONS);
    if (!response.ok) throw new Error("Errore nella fetch");

    const data = await response.json();
    renderResults(data.data);
  } catch (error) {
    console.error("Errore nella ricerca:", error);
    resultsContainer.innerHTML = `<p>Qualcosa è andato storto. Riprova più tardi.</p>`;
  }
}

// Mostra i risultati in card
function renderResults(results) {
  resultsContainer.innerHTML = ""; // Pulisce risultati precedenti

  results.forEach(track => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.style.margin = "10px";
    card.innerHTML = `
      <img src="${track.album.cover_medium}" alt="${track.title}" style="width:100px; border-radius: 8px;">
      <h5 style="margin: 0.5em 0; font-weight: bold;">${track.title}</h5>
      <p style="color: gray;">${track.artist.name}</p>
    `;
    resultsContainer.appendChild(card);
  });
}

// Colori random per card
function randomColor() {
  const colors = [
    "#e13300",
    "#1e3264",
    "#8c1932",
    "#148a08",
    "#b49bc8",
    "#d84000",
    "#535353",
    "#e8115b",
    "#777",
    "#006450",
    "#27856a",
    "#509bf5",
    "#a56752",
    "#477d95",
    "#b49bc8",
    "#5f8104",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// All'avvio, genera la griglia
document.addEventListener("DOMContentLoaded", function () {
  const categories = [
    {title: "Weekly", img: "./assets/imgs/search/image-1.jpeg"},
    {title: "Podcasts", img: "./assets/imgs/search/image-2.jpg"},
    {title: "Live Events", img: "./assets/imgs/search/image-3.jpg"},
    {title: "Made for You", img: "./assets/imgs/search/image-4.jpg"},
    {title: "New Releases", img: "./assets/imgs/search/image-5.jpg"},
    {title: "San Remo Festival", img: "./assets/imgs/search/image-6.jpg"},
    {title: "Latin", img: "./assets/imgs/search/image-7.jpg"},
    {title: "Top Albums", img: "./assets/imgs/search/image-8.jpg"},
    {title: "Top Artists", img: "./assets/imgs/search/image-9.jpg"},
    {title: "Top Podcasts", img: "./assets/imgs/search/image-10.jpg"},
    {title: "Top Genres", img: "./assets/imgs/search/image-11.jpg"},
    {title: "Top Playlists", img: "./assets/imgs/search/image-12.jpg"},
    {title: "Top Music Videos", img: "./assets/imgs/search/image-13.jpeg"},
    {title: "Top Radio", img: "./assets/imgs/search/image-14.jpg"},
    {title: "Top Charts", img: "./assets/imgs/search/image-15.jpg"},
    {title: "Top Songs", img: "./assets/imgs/search/image-16.jpg"},
  ];

  categories.forEach(card => {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
      <div class="card" style="background-color: ${randomColor()}; cursor: pointer; padding: 1em; border-radius: 12px;" data-query="${card.title}">
        <h5 class="card-title" style="font-weight: bold;">${card.title}</h5>
        <img src="${card.img}" alt="${card.title}" style="width:100%; border-radius: 10px;">
      </div>
    `;

    grid.appendChild(col);
  });

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      const query = card.dataset.query;
      if (query) fetchSearchResults(query);
    });
  });
});

searchBtn.addEventListener("click", function () {
  const query = searchInput.value.trim();
  if (query) fetchSearchResults(query);
});

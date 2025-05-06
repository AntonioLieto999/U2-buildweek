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

const genres = [
  {name: "Pop", color: "#ff6b6b", image: "C:Users\franc.vscode.vscodeBW2D1U2-buildweekassetsimgssearchimage-1.jpeg"},
  {name: "Rock", color: "#6b6bff", image: "https://via.placeholder.com/100?text=Rock"},
  {name: "Jazz", color: "#ffd36b", image: "https://via.placeholder.com/100?text=Jazz"},
  {name: "Hip-Hop", color: "#6bffd3", image: "https://via.placeholder.com/100?text=HipHop"},
  {name: "Italiana", color: "#ff6b6b", image: "https://via.placeholder.com/100?text=Italiana"},
  {name: "Ambient", color: "#ff6b6b", image: "https://via.placeholder.com/100?text=Ambient"},
  {name: "Meditazione", color: "#ff6b6b", image: "https://via.placeholder.com/100?text=Meditazione"},
  {name: "Motown", color: "#ff6b6b", image: "https://via.placeholder.com/100?text=Motown"},
  {name: "Underground Techno", color: "#ff6b6b", image: "https://via.placeholder.com/100?text=UndergroundTechno"},
  {name: "Maga Hits", color: "#ff6b6b", image: "https://via.placeholder.com/100?text=MagaHits"},
  {name: "Dance", color: "#ff6b6b", image: "https://via.placeholder.com/100?text=Dance"},
  {name: "Indie", color: "#ff6b6b", image: "https://via.placeholder.com/100?text=Indie"},
];

const grid = document.getElementById("grid");

genres.forEach(genre => {
  const col = document.createElement("div");
  col.className = "col";

  const card = document.createElement("div");
  card.className = "card";
  card.style.backgroundColor = genre.color;

  card.innerHTML = `
      <h5 class="card-title">${genre.name}</h5>
      <img src="${genre.image}" alt="${genre.name}" />
    `;

  col.appendChild(card);
  grid.appendChild(col);
});

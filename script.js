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
document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("grid");

  const categories = [
    {title: "Music", img: "./assets/imgs/search/image-1.jpeg"},
    {title: "Live Events", img: "./assets/imgs/search/image-2.jpg"},
    {title: "New Releases", img: "./assets/imgs/search/image-3.jpg"},
    {title: "Sanremo Festival", img: "./assets/imgs/search/image-4.jpg"},
    {title: "Latin", img: "./assets/imgs/search/image-5.jpg"},
    {title: "Pop", img: "./assets/imgs/search/image-6.jpg"},
    {title: "Hip-Hop", img: "./assets/imgs/search/image-7.jpg"},
    {title: "Podcast Charts", img: "./assets/imgs/search/image-8.jpg"},
    {title: "Podcast New Releases", img: "./assets/imgs/search/image-9.jpg"},
    {title: "Video Podcasts", img: "./assets/imgs/search/image-10.jpg"},
    {title: "Charts", img: "../assets/imgs/search/image-11.jpg"},
    {title: "Dance/Electronic", img: "../assets/imgs/search/image-12.jpg"},
    {title: "Rock", img: "./assets/imgs/search/image-13.jpg"},
    {title: "Indie", img: "./assets/imgs/search/image-14.jpg"},
    {title: "R&B", img: "./assets/imgs/search/image-15.jpg"},
    {title: "Reggae", img: "./assets/imgs/search/image-16.jpg"},
    {title: "Metal", img: "./assets/imgs/search/image-17.jpg"},
    {title: "", img: "./assets/imgs/search/image-18.jpg"},
  ];

  categories.forEach(card => {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
      <div class="card" style="background-color: ${randomColor()}">
        <h5 class="card-title">${card.title}</h5>
        <img src="${card.img}" alt="${card.title}" />
      </div>
    `;

    grid.appendChild(col);
  });
});

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

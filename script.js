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
    {title: "", img: "./assets/imgs/search/image-1.jpeg"},
    {title: "", img: "./assets/imgs/search/image-2.jpg"},
    {title: "", img: "./assets/imgs/search/image-3.jpg"},
    {title: "", img: "./assets/imgs/search/image-4.jpg"},
    {title: "", img: "./assets/imgs/search/image-5.jpg"},
    {title: "", img: "./assets/imgs/search/image-6.jpg"},
    {title: "", img: "./assets/imgs/search/image-7.jpg"},
    {title: "", img: "./assets/imgs/search/image-8.jpg"},
    {title: "", img: "./assets/imgs/search/image-9.jpg"},
    {title: "", img: "./assets/imgs/search/image-10.jpg"},
    {title: "", img: "./assets/imgs/search/image-11.jpg"},
    {title: "", img: "./assets/imgs/search/image-12.jpg"},
    {title: "", img: "./assets/imgs/search/image-13.jpeg"},
    {title: "", img: "./assets/imgs/search/image-14.jpg"},
    {title: "", img: "./assets/imgs/search/image-15.jpg"},
    {title: "", img: "./assets/imgs/search/image-16.jpg"},
    {title: "", img: "./assets/imgs/search/image-17.jpg"},
    {title: "", img: "./assets/imgs/search/image-18.jpg"},
    {title: "", img: "./assets/imgs/search/image-19.jpg"},
    {title: "", img: "./assets/imgs/search/image-20.jpg"},
    {title: "", img: "./assets/imgs/search/image-21.jpg"},
    {title: "", img: "./assets/imgs/search/image-22.jpg"},
    {title: "", img: "./assets/imgs/search/image-23.jpg"},
    {title: "", img: "./assets/imgs/search/image-24.jpg"},
    {title: "", img: "./assets/imgs/search/image-25.jpeg"},
    {title: "", img: "./assets/imgs/search/image-26.jpg"},
    {title: "", img: "./assets/imgs/search/image-27.jpg"},
    {title: "", img: "./assets/imgs/search/image-28.jpg"},
    {title: "", img: "./assets/imgs/search/image-29.jpg"},
    {title: "", img: "./assets/imgs/search/image-30.jpg"},
    {title: "", img: "./assets/imgs/search/image-31.jpg"},
    {title: "", img: "./assets/imgs/search/image-32.jpg"},
    {title: "", img: "./assets/imgs/search/image-33.jpg"},
    {title: "", img: "./assets/imgs/search/image-34.jpg"},
    {title: "", img: "./assets/imgs/search/image-35.jpg"},
    {title: "", img: "./assets/imgs/search/image-36.jpg"},
    {title: "", img: "./assets/imgs/search/image-37.jpeg"},
    {title: "", img: "./assets/imgs/search/image-38.jpg"},
    {title: "", img: "./assets/imgs/search/image-39.jpg"},
    {title: "", img: "./assets/imgs/search/image-40.jpg"},
    {title: "", img: "./assets/imgs/search/image-41.jpg"},
    {title: "", img: "./assets/imgs/search/image-42.png"},
    {title: "", img: "./assets/imgs/search/image-43.png"},
    {title: "", img: "./assets/imgs/search/image-44.png"},
    {title: "", img: "./assets/imgs/search/image-45.jpeg"},
    {title: "", img: "./assets/imgs/search/image-46.jpeg"},
    {title: "", img: "./assets/imgs/search/image-47.jpg"},
    {title: "", img: "./assets/imgs/search/image-48.jpeg"},
    {title: "", img: "./assets/imgs/search/image-49.jpg"},
    {title: "", img: "./assets/imgs/search/image-50.jpg"},
    {title: "", img: "./assets/imgs/search/image-51.jpg"},
    {title: "", img: "./assets/imgs/search/image-52.jpg"},
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

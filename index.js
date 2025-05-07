import { token } from "./token.js";
const URL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
fetch(URL, {
  headers: {
    "x-rapidapi-key": token,
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
});

const generateAlbumsCards = function (array) {
  const row = document.getElementById("moreAlbum");
  row.innerHTML = ""; // Pulisce il contenuto esistente
  array.forEach((element) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col", "mb-4");
    newCol.innerHTML = `
            <div class="card h-100 d-flex flex-column border-3 bg-transparent text-white border-0 p-2">
            <img src="${element.album.cover_medium}" class="card-img-top mx-auto" alt="album image" style="width:80px,height:80px">
            <div class="card-body d-flex flex-column ">
              <a href="album.html?albumId=${element.album.id}" class="text-decoration-none text-white "><p class="card-title mb-0 ">${element.album.title}</p></a>
              <a href="artist.html?artistId=${element.artist.id}" class="text-decoration-none text-white-50"><p class="card-text small ">${element.artist.name}</p></a>
            </div>
          </div>
            `;
    row.appendChild(newCol);
  });
};

const albumRandom = function (array) {
  const indexRandom = Math.floor(Math.random() * array.length);
  console.log(indexRandom);
  let imgRandom = document.getElementById("imgMainAlbum");
  var imageUrl = array[indexRandom].album.cover_medium;
  imgRandom.setAttribute("src", imageUrl);
  const randomAlbum = document.getElementById("randomAlbum");
  randomAlbum.innerHTML = ""; // Pulisce il contenuto esistente
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `
      <p>ALBUM</p>
      <a href="album.html?albumId=${array[indexRandom].album.id}" class="text-decoration-none text-white "><h1>${array[indexRandom].title_short}</h1></a>
      <a href="artist.html?artistId=${array[indexRandom].artist.id}" class="text-decoration-none text-white "><p>${array[indexRandom].artist.name}</p></a>
      <p>Ascolta il nuovo singolo di <span><a href="artist.html?artistId=${array[indexRandom].artist.id}" class="text-decoration-none text-white ">${array[indexRandom].artist.name}</a></span></p>
      <div>
        <button class="text-dark fs-5 fw-bolder px-4 py-2 rounded-5 green fs-6">Play</button> 
        <button class="text-dark fs-5 bg-black fw-bolder px-4 py-2 rounded-5 text-white border-1 border-white fs-6">Salva</button> 
        <button class="text-dark fs-5 bg-black fw-bolder px-4 py-2 rounded-5 text-white border-0 fs-6">...</button> 
      </div>
    `;
  randomAlbum.appendChild(newDiv);
};
const generateListChart = function (array) {
  const ul = document.getElementById("random-songs");
  ul.innerHTML = ""; // Pulisce la lista esistente
  array.forEach((element) => {
    const newLi = document.createElement("li");
    newLi.innerHTML = `
    <a href="artist.html?artistId=${element.artist.id}" class='text-decoration-none'>
    <div class='d-flex gap-3 rounded-2 p-2 artist-list'>
      <div class='overflow-hidden' style='width: 2.5em'> 
          <img src="${element.artist.picture_small}" class="img-fluid"> 
        </div> 
        <div> 
          <h6 class='mb-0 text-light '> ${element.artist.name} </h6>
          <p class='small mt-0'> Artista</p>
        </div> 
      </div>
    </a>
    `;
    ul.appendChild(newLi);
  });
};

const getAlbums = function (searchKeyword) {
  console.log("Sto cercando:", searchKeyword);
  fetch(URL + searchKeyword, {
    headers: {
      "x-rapidapi-key": token,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => {
      console.log("Risposta ricevuta:", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore durante la richiesta.");
      }
    })
    .then((json) => {
      console.log("Dati ricevuti dall'API:", json.data); // Log dei dati ricevuti
      if (json && json.data) {
        generateAlbumsCards(json.data); // Passa i dati alla funzione
        albumRandom(json.data);
        generateListChart(json.data);
      } else {
        console.log("Nessun dato trovato.");
      }
    })
    .catch((err) => {
      console.error("ERRORE!", err);
    });
};

const inputSearch = document.getElementById("inputSearch");
const searchButton = document.getElementById("searchButton");
const searchInputWrapper = document.getElementById("searchInputWrapper");
const spanSearch = document.getElementById("spanSearch");

searchButton.addEventListener("click", function () {
  const keyword = inputSearch.value.trim();
  if (!keyword) {
    console.error("Il campo di ricerca è vuoto!");
    return;
  }
  getAlbums(keyword);
  searchInputWrapper.classList.toggle("d-none");
  spanSearch.classList.toggle("d-none");
  inputSearch.value = "";
});

document.addEventListener("DOMContentLoaded", function () {
  getAlbums();

  const spanSearch = document.getElementById("spanSearch");
  const searchIcon = document.getElementById("searchIcon");
  const searchInputWrapper = document.getElementById("searchInputWrapper");
  searchIcon.addEventListener("click", function () {
    searchInputWrapper.classList.toggle("d-none");
    spanSearch.classList.toggle("d-none");
  });
});

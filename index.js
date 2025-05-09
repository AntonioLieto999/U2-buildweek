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
    <img src="${element.album.cover_medium}" id="cardRandom" class="card-img-top mx-auto card-img" alt="Album Cover" data-album-id="${element.album.id}">
    <div class="card-body d-flex flex-column">
      <a href="album.html?albumId=${element.album.id}" class="text-decoration-none text-white">
        <p class="card-title mb-0 text-white">${element.album.title}</p>
      </a>
      <a href="artist.html?artistId=${element.artist.id}" class="text-decoration-none text-white-50">
        <p class="card-text small text-white">${element.artist.name}</p>
      </a>
    </div>
  </div>
`;

    console.log(element.album);
    row.appendChild(newCol);
  });
};

const albumRandom = function (array) {
  const indexRandom = Math.floor(Math.random() * array.length);
  // console.log(indexRandom);
  let imgRandom = document.getElementById("imgMainAlbum");
  var imageUrl = array[indexRandom].album.cover_medium;
  imgRandom.setAttribute("src", imageUrl);
  const randomAlbum = document.getElementById("randomAlbum");
  randomAlbum.innerHTML = ""; // Pulisce il contenuto esistente
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `
      <p>ALBUM</p>
      <a href="album.html?albumId=${array[indexRandom].album.id}" class="text-decoration-none text-white "><h1>${array[indexRandom].album.title}</h1></a>
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
    <div class='d-flex gap-3 rounded-2 ms-3 pb-2 artist-list'>
      <div class='overflow-hidden' style='width: 2.5em'> 
          <img src="${element.artist.picture_small}" class="img-fluid img-piccole"> 
        </div> 
        <div> 
          <a id="album-btn" class="text-decoration-none text-white fw-bold" href="album.html?album=${element.album.id}"> 
            <h6 class="mb-0 text-light">${element.album.title}</h6>
          </a>

          <a id="artist-btn" class='text-decoration-none small mt-0 grey-font fw-light' href="artist.html?artistId=${element.artist.id}">${element.artist.name}</a>
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
    method: "GET",
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
      console.log("Dati ricevuti dall'API:", json.data);
      if (json && json.data) {
        generateAlbumsCards(json.data);
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

document.addEventListener("DOMContentLoaded", function () {
  getAlbums();

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("card-img")) {
      const albumId = event.target.getAttribute("data-album-id");

      if (albumId) {
        window.location.href = `album.html?albumId=${albumId}`;
      } else {
        console.error("ID album non trovato!");
      }
    }
  });
});

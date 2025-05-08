import { Token } from "./token.js";

// const URL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const host = "deezerdevs-deezer.p.rapidapi.com";

// const params = new URLSearchParams(window.location.search);
// const idAlbum = params.get("album");

// const createDataArray = async () => {
//   try {
//     const response = await fetch(URL + albumID, {
//       method: "GET",
//       headers: {
//         "x-rapidapi-key": Token,
//         "x-rapidapi-host": host,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Errore nella fetch");
//     }

//     const objData = await response.json();

//     objData.data.forEach((obj) => {
//       // console.log(obj);
//       const album = obj.album;
//       // console.log(album);
//       const artist = obj.artist;
//       // console.log(artist);

//       const imgAlbum = document.getElementById("imgAlbum");
//       imgAlbum.src = album.cover_medium;
//       // console.log(album.cover_medium);

//       // console.log(album[0].contributors);

//       const typeAlbum = document.getElementById("typeAlbum");
//       typeAlbum.innerText = album.type;
//       // console.log(album.title);

//       const titleSong = document.getElementById("titleSong");
//       titleSong.innerText = artist.name;

//       const imgArtist = document.getElementById("imgArtist");
//       imgArtist.src = artist;
//     });
//   } catch (error) {
//     console.error("Errore nella fetch:", error);
//   }
// };
const idAlbum = "412";
const albumTracklist = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + idAlbum + "/top?limit=15";

// console.log(albumTracklist);

const getTrackList = () => {
  fetch(albumTracklist, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": Token,
      "x-rapidapi-host": host,
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        if (resp.status === 404) {
          throw new Error("Items not found");
        } else if (resp.status >= 500) {
          throw new Error("Server error");
        }

        throw new Error("Fetch error");
      }
      return resp.json();
    })
    .then((track) => {
      // console.log(track.data);
      track.data.forEach((song) => {
        // console.log(song.title);
        // console.log(song);
        const album = song.album;
        console.log(album);

        const artist = song.artist;
        // console.log(artist);

        const imgAlbum = document.getElementById("imgAlbum");
        imgAlbum.src = album.cover_medium;
        // console.log(album.cover_medium);

        const typeAlbum = document.getElementById("typeAlbum");
        typeAlbum.innerText = album.type;
        // console.log(album.title);

        const titleSong = document.getElementById("titleSong");
        titleSong.innerText = artist.name;

        const imgArtist = document.getElementById("imgArtist");
        imgArtist.src = artist;
      });
    });
};
window.onload = () => {
  // createDataArray();
  getTrackList();
};

import { token } from "../../token.js";

const host = "deezerdevs-deezer.p.rapidapi.com";

const params = new URLSearchParams(window.location.search);
const idAlbum = params.get("album");

const albumTracklist = " https://deezerdevs-deezer.p.rapidapi.com/album/" + idAlbum;

const getTrackList = () => {
  fetch(albumTracklist, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": token,
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
      const allArtist = track.tracks.data;
      const newRow = document.getElementById("newRow");
      newRow.innerText = "";
      // console.log(track);
      allArtist.forEach((song, index) => {
        // console.log(song);

        const albumTitle = song.album.title;
        const artistName = song.artist.name;
        const artistId = track.artist.id;
        const artistImg = track.artist.picture_small;
        const albumImg = song.album.cover_medium;
        const songName = song.title;
        console.log(songName);
        const totSong = track.nb_tracks;
        const durationAlbum = track.duration / 60;
        const min = Math.floor(durationAlbum);
        const seconds = Math.floor(Number(durationAlbum.toString()));
        const duration = min + " min e " + seconds + " sec.";
        const realeseDate = track.release_date;
        const riprod = allArtist[index].rank;
        const timeSong = song.duration;

        console.log(seconds);

        const imgALbum = document.getElementById("imgAlbum");
        imgALbum.src = albumImg;
        const songTitle = document.getElementById("titleSong");
        songTitle.innerText = albumTitle;
        songTitle.style.fontSize = "7rem";

        const imgArt = document.getElementById("imgArtist");
        imgArt.src = artistImg;

        const nameArtist = document.getElementById("nameArtist");
        nameArtist.innerText = artistName + " ";
        nameArtist.href = "artist.html?artistId=" + artistId;

        const yearAlbum = document.getElementById("yearAlbum");
        yearAlbum.innerText = realeseDate + " ";
        const numOfSongs = document.getElementById("numOfSongs");
        numOfSongs.innerText = totSong + " brani, ";
        const durataAlbum = document.getElementById("durata");
        durataAlbum.innerText = duration;

        const divColOne = document.createElement("div");
        divColOne.className = "col-1 d-flex opacity-50 justify-content-end";
        divColOne.innerText = index + 1;

        const divColFive = document.createElement("div");
        divColFive.className = "col-5";

        const h6 = document.createElement("h6");
        h6.innerText = songName;
        h6.className = "mb-0";

        const firstP = document.createElement("a");
        firstP.innerText = artistName;
        firstP.href = "artist.html?artistId=" + artistId;
        firstP.className = "text-decoration-none text-white opacity-50";

        const divColFour = document.createElement("div");
        divColFour.className = "col-4";

        const secondP = document.createElement("p");
        secondP.innerText = riprod;

        const divColTwo = document.createElement("div");
        divColTwo.className = "col-2 mb-4";

        const thirdP = document.createElement("p");
        thirdP.innerText = timeSong.toString().replace(/^(\d)/, "$1:") + "min";

        divColTwo.appendChild(thirdP);
        divColFour.appendChild(secondP);

        divColFive.appendChild(h6);
        divColFive.appendChild(firstP);

        newRow.appendChild(divColOne);
        newRow.appendChild(divColFive);
        newRow.appendChild(divColFour);
        newRow.appendChild(divColTwo);
      });
    })
    .catch(error);
  console.error("Errore nella fetch:", error);
};

window.onload = () => {
  // createDataArray();
  getTrackList();
};

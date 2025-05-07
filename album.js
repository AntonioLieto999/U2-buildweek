const URL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const Token = "a339121904mshf7084a99b9c4553p17eff8jsnf24dd4a8fce1";
const host = "deezerdevs-deezer.p.rapidapi.com";

const params = new URLSearchParams(window.location.search);
const albumID = params.get("album");

const createDataArray = async () => {
  try {
    const response = await fetch(URL + albumID, {
      method: "GET",
      headers: {
        "x-rapidapi-key": Token,
        "x-rapidapi-host": host,
      },
    });

    if (!response.ok) {
      throw new Error("Errore nella fetch");
    }

    const objData = await response.json();

    objData.data.forEach((obj) => {
      const album = obj.album;
      console.log(album);
      const artist = obj.artist;
      console.log(artist);

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
  } catch (error) {
    console.error("Errore nella fetch:", error);
  }
};

window.onload = () => {
  createDataArray();
};

const URL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const Token = "a339121904mshf7084a99b9c4553p17eff8jsnf24dd4a8fce1";
const host = "deezerdevs-deezer.p.rapidapi.com";

const params = new URLSearchParams(window.location.search);
const albumID = params.get("album");

const arrayAlbum = [];
const arrayArtist = [];

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
      const artist = obj.artist;

      arrayAlbum.push(album);
      arrayArtist.push(artist);
    });

    addAlbums(arrayAlbum);
    addArtist(arrayArtist);
  } catch (error) {
    console.error("Errore nella fetch:", error);
  }
};

const addAlbums = (albums) => {
  albums.forEach((album) => {});
  console.log(arrayAlbum);
};
const addArtist = (artists) => {
  artists.forEach((artist) => {
    // console.log(artist);
  });
  console.log(arrayArtist);
};

window.onload = () => {
  createDataArray();
};

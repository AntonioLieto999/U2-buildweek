import { token } from "../../token.js";
const param = new URLSearchParams(window.location.search);
const artistId = param.get("artistId");

const artistList = "https://deezerdevs-deezer.p.rapidapi.com/artist/" + artistId;
const artistTracklist = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId + "/top?limit=10";
const rapidHost = "deezerdevs-deezer.p.rapidapi.com";
const rapidKey = "ded3d84784msh38de646f264b36dp1038e9jsn039396fe0728";

const songList = document.getElementById("song-list");
const allTimeLikedArtistSong = document.getElementById("right-side-liked-songs");
const viewMoreBtn = document.getElementById("view-more-btn");

const getArtist = () => {
  fetch(artistList, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": token,
      "x-rapidapi-host": rapidHost,
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
    .then((artist) => {
      const artistName = document.getElementById("artist-page-title");
      artistName.innerText = artist.name;
    })
    .catch((error) => console.log(error));
};
const getTracklist = () => {
  fetch(artistTracklist, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": token,
      "x-rapidapi-host": rapidHost,
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
      console.log(track);
      const maxTracks = 5;

      for (let i = 0; i < track.data.length; i++) {
        const trackArray = track.data[i];
        const singleTrackDiv = document.createElement("div");
        singleTrackDiv.className = "one-track d-flex align-items-center grey-font";
        singleTrackDiv.id = "one-track";

        if (i >= maxTracks) {
          singleTrackDiv.classList.add("hidden-track");
          singleTrackDiv.classList.add("d-none");
        }

        const songTitleAndPicDiv = document.createElement("div");
        songTitleAndPicDiv.className = "d-flex align-items-center flex-grow-1 gap-4";

        const numberDiv = document.createElement("div");
        numberDiv.className = "track-number";

        const trackNumber = document.createElement("p");
        trackNumber.innerText = i + 1;

        const trackImage = document.createElement("img");
        trackImage.src = trackArray.album.cover;
        trackImage.alt = trackArray.album.title;

        const trackTitle = document.createElement("p");
        trackTitle.className = "track-title fw-semibold text-white";
        trackTitle.innerText = trackArray.title;

        const allTimeListenersAndSongDurationDiv = document.createElement("div");
        allTimeListenersAndSongDurationDiv.className = "d-flex gap-5";

        const allTimeListeners = document.createElement("p");
        allTimeListeners.className = "listeners-p d-inline-block";
        allTimeListeners.id = "played-number";
        allTimeListeners.innerText = trackArray.rank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        const songDuration = document.createElement("p");
        songDuration.className = "d-inline-block";
        songDuration.id = "song-duration";
        songDuration.innerText = trackArray.duration.toString().replace(/^(\d)/, "$1:");

        songList.appendChild(singleTrackDiv);
        singleTrackDiv.appendChild(songTitleAndPicDiv);
        songTitleAndPicDiv.appendChild(numberDiv);
        numberDiv.appendChild(trackNumber);
        songTitleAndPicDiv.appendChild(trackImage);
        songTitleAndPicDiv.appendChild(trackTitle);
        singleTrackDiv.appendChild(allTimeListenersAndSongDurationDiv);
        allTimeListenersAndSongDurationDiv.appendChild(allTimeListeners);
        allTimeListenersAndSongDurationDiv.appendChild(songDuration);
      }

      const likedSongsFromArtistImageDiv = document.createElement("div");
      likedSongsFromArtistImageDiv.className = "artist-liked-image col-3 position-relative";

      const artistImage = document.createElement("img");
      artistImage.src = track.data[0].contributors[0].picture_medium;
      artistImage.alt = "artist picture:" + track.data[0].contributors[0].name;

      const likedSongsIcon = document.createElement("div");
      likedSongsIcon.className = "liked-songs-icon position-absolute";
      likedSongsIcon.innerHTML = `<img src="./assets/imgs/main/heart.png" alt="liked songs icon">`;

      const likedSongsTextDiv = document.createElement("div");

      const likedSongsCount = document.createElement("p");
      likedSongsCount.className = "fw-bold";
      likedSongsCount.innerText = "Hai messo Mi piace a 11 brani";

      const likedSongsFromArtist = document.createElement("p");
      likedSongsFromArtist.innerHTML = `di ${track.data[0].contributors[0].name}`;

      allTimeLikedArtistSong.appendChild(likedSongsFromArtistImageDiv);
      likedSongsFromArtistImageDiv.appendChild(artistImage);
      likedSongsFromArtistImageDiv.appendChild(likedSongsIcon);
      allTimeLikedArtistSong.appendChild(likedSongsTextDiv);
      likedSongsTextDiv.appendChild(likedSongsCount);
      likedSongsTextDiv.appendChild(likedSongsFromArtist);

      viewMoreBtn.onclick = function () {
        const hiddenTracks = document.querySelectorAll(".hidden-track");
        const allTracks = document.querySelectorAll(".one-track");
        const showingAll = viewMoreBtn.innerText.toLowerCase() === "visualizza meno";

        if (!showingAll) {
          hiddenTracks.forEach((track) => {
            track.classList.remove("hidden-track", "d-none");
          });
          viewMoreBtn.innerText = "visualizza meno";
        } else {
          allTracks.forEach((track, index) => {
            if (index >= 5) {
              track.classList.add("hidden-track", "d-none");
            }
          });
          viewMoreBtn.innerText = "visualizza altro";
        }
      };
    })
    .catch((error) => console.log(error));
};

window.onload = function () {
  getArtist();
  getTracklist();
};

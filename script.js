let watchlist = [];

// initialise function
function initialise() {
  const movieInput = document.getElementById("movieInput");
  movieInput.addEventListener("input", fetchMovie);
  localwatchlist = JSON.parse(localStorage.getItem("watchlist"))
  if(localwatchlist) watchlist = JSON.parse(localStorage.getItem("watchlist"));

}




// fetch movie list
async function fetchMovie(e) {
  let result = await fetch(
    `https://www.omdbapi.com/?apikey=4f2ea418&s=${e.target.value}`
  );
  result = await result.json();
  result = result.Search;
  if (result) {

    const container = document.querySelector(".search-results")
    container.innerHTML = "";
    container.style.display = "block"

    for (let i = 0; i <= 3; i++) {
      updateSearchResult(result[i]);
    }
  }
}




// add to watch list
function addToWatchlistEventListner(elem) {
  elem.addEventListener("click", (e) => {
    e.stopPropagation()
    const elemImdbId = elem.getAttribute("imdbid");
    const index = watchlist.indexOf(elemImdbId);
    if (index == -1) {
      watchlist.push(elemImdbId);
      elem.innerHTML = "";
      elem.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
    } else {
      watchlist.splice(index, 1);
      elem.innerHTML = `<i class="fa-regular fa-bookmark"></i>`;
    }
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  });
}




// update movie list
function updateSearchResult(movie) {
  let link = document.createElement("a");
  link.href = "/";
  let movieElem = document.createElement("div");
  movieElem.className = "movie";
  movieElem.setAttribute("imdbid", movie.imdbID);
  movieElem.addEventListener("click", (event) => openPage(event));
  // poster
  const moviePoster = document.createElement("img");
  moviePoster.src = movie.Poster;
  // movie details
  const movieDetails = document.createElement("div");
  const movieName = document.createElement("h3");
  movieName.innerText = movie.Title;
  const movieYear = document.createElement("p");
  movieYear.innerText = movie.Year;
  movieDetails.append(movieName, movieYear);
  // watchlist icon
  let addToWatchlistElem = document.createElement("span");
  addToWatchlistElem.setAttribute("imdbid", movie.imdbID);
  addToWatchlistEventListner(addToWatchlistElem);
  const watchlistItem = watchlist.find((id) => id === movie.imdbID);
  if (watchlistItem) {
    addToWatchlistElem.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
  } else {
    addToWatchlistElem.innerHTML = `<i class="fa-regular fa-bookmark"></i>`;
  }

  movieElem.append(moviePoster, movieDetails, addToWatchlistElem);
  document.querySelector(".search-results").append(movieElem);
}




// event for new window
function openPage(e) {
  e.preventDefault();
  const newWindow = window.open("/IMDb-clone/moviepage.html", "_blank");
  const imdbID = e.target.getAttribute("imdbid");
  newWindow.onload = () =>{ initialiseMoviePage(newWindow, imdbID); }
}
// append data on new window
async function initialiseMoviePage(e, imdbID) {
  let result = await fetch(
    `https://www.omdbapi.com/?apikey=4f2ea418&i=${imdbID}`
  );
  result = await result.json();

  // movie title
  e.document.getElementById(
    "moviepage-title"
  ).innerText = `${result.Title} (${result.Year})`;
  // watchlist icon
  let addToWatchlistElem = e.document.getElementById(
    "moviepage-watchlist-status"
  );
  addToWatchlistElem.setAttribute("imdbid", imdbID);
  const movieid = watchlist.find((elem) => elem === imdbID);
  if (movieid)
    addToWatchlistElem.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
  else addToWatchlistElem.innerHTML = `<i class="fa-regular fa-bookmark"></i>`;
  addToWatchlistEventListner(addToWatchlistElem);
  // moviepage poster
  e.document.getElementById("moviepage-poster").src = result.Poster;
  // rating
  e.document.getElementById("moviepage-rating").innerText = result.imdbRating;
  // released
  e.document.getElementById("moviepage-released").innerText = result.Released;
  // genere
  e.document.getElementById("moviepage-genere").innerText = result.Genre;
  //director
  e.document.getElementById("moviepage-director").innerText = result.Director;
  // writer
  e.document.getElementById("moviepage-writer").innerText = result.Writer;
  // actor
  e.document.getElementById("moviepage-actor").innerText = result.Actors;
  // plot
  e.document.getElementById("moviepage-plot").innerText = result.Plot;
}


initialise();
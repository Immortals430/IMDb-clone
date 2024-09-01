let watchlist = [];

// initialise function
function initialise() {
  watchlist = JSON.parse(localStorage.getItem("watchlist"));
  renderMovies();
}

// render movie list
function renderMovies() {
  watchlist.forEach(async (id) => {
    let result = await fetch(`http://www.omdbapi.com/?apikey=4f2ea418&i=${id}`);
    result = await result.json();

    const movieContainer = document.createElement("div");
    movieContainer.id = id;

    const poster = document.createElement("img");
    poster.src = result.Poster;

    const ratingContainer = document.createElement("div");
    const star = document.createElement("span");
    const rating = document.createElement("span");
    rating.innerText = result.imdbRating;
    star.innerHTML = '<i class="fa-solid fa-star"></i>';
    ratingContainer.append(star, rating);

    const title = document.createElement("h3");
    title.innerText = result.Title;

    const year = document.createElement("span");
    year.innerText = result.Year;

    const genere = document.createElement("div");
    genere.innerText = result.Genre;

    const watchlistIcon = document.createElement("span");
    watchlistIcon.className = "watchlist-icon";
    watchlistIcon.innerHTML = '<i class="fa-solid fa-bookmark wicon"></i>';
    watchlistIcon.addEventListener("click", () => removeFromWatchList(id));

    movieContainer.append(
      poster,
      ratingContainer,
      title,
      year,
      genere,
      watchlistIcon
    );
    document.querySelector(".watchlist").append(movieContainer);
  });
}


// remove from watchlist
function removeFromWatchList(id) {
  document.getElementById(id).remove();
  const index = watchlist.indexOf(id);
  watchlist.splice(index, 1);
  const updatedWatchlist = JSON.stringify(watchlist);
  localStorage.setItem("watchlist", updatedWatchlist);
}

initialise();


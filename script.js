let favouriteList = []
let searchInput = document.getElementById('search');

// search result update as user type movie name
searchInput.addEventListener('input', async ()=>{
    let res = await fetch(`http://www.omdbapi.com/?apikey=4f2ea418&s=${searchInput.value}`)
    let data = await res.json()
    let dataArr = data.Search

    if(data.Response == 'True'){
        document.getElementById('search-list-container').classList.remove('hide')  // 
        for(i = 0; i <= 3; i++){
            document.getElementById(`search-list-${i}`).classList.remove('hide')
            document.getElementById(`list${i}`).setAttribute('imdb', `${dataArr[i].imdbID}`)
            document.getElementById(`fav${i}`).setAttribute('imdb', `${dataArr[i].imdbID}`)
            document.getElementById(`poster${i}`).src = dataArr[i].Poster
            document.getElementById(`movie-year-${i}`).innerText = dataArr[i].Year
            document.getElementById(`list${i}`).innerText = dataArr[i].Title
        }
    }  
})


// search List
async function searchResult(id){
    try{
        let imdb = document.getElementById(id).getAttribute('imdb')
        let res = await fetch(`https://www.omdbapi.com/?apikey=4f2ea418&i=${imdb}`)
        let data = await res.json()
        
        document.getElementById('search-result-container').classList.remove('hide')
        document.getElementById('result-movie-title').innerText = data.Title
        document.getElementById(`result-movie-year`).innerText = '(' + data.Year + ')'
        document.getElementById(`result-poster`).src = data.Poster
        document.getElementById(`result-imdbrating`).innerText = 'IMDb Rating: ' + data.imdbRating
        document.getElementById(`result-released`).innerText = 'Released: ' + data.Released
        document.getElementById(`result-genre`).innerText = 'Genere: ' + data.Genre
        document.getElementById(`result-director`).innerText = 'Director: ' + data.Director
        document.getElementById(`result-writer`).innerText = 'Writer: ' + data.Writer
        document.getElementById(`result-actors`).innerText = 'Actors: ' + data.Actors
        document.getElementById(`result-plot`).innerText = 'Plot: ' + data.Plot
        document.getElementById('result-favourite').setAttribute('imdb', data.imdbID)
        window.scrollTo(0, 200);
    }
    catch(err){
        console.log(err)
    }


}

// search result disapper if clicked anywhere else in screen
document.addEventListener('click', ()=>{
    document.getElementById('search-list-container').classList.add('hide')
    for(i = 0; i <= 3; i++){
        document.getElementById(`search-list-${i}`).classList.add('hide')
        document.getElementById(`list${i}`).innerText = ''
    }
})


// ADD movies to watchlist
async function favourite(id) {
    let imdb = document.getElementById(id).getAttribute('imdb');

    if (favouriteList.includes(imdb)) {
        console.log('Movie already exists in the list');
    } else {
        favouriteList.push(imdb);
        
        try {

            let res = await fetch(`https://www.omdbapi.com/?i=${imdb}&apikey=f47d6a04`);
            let data = await res.json();
            
            document.getElementById('nothing-here').classList.add('hide')
            let elem = document.createElement('div');
            elem.className = 'watchlist-movie flex';
            elem.id = Date.now();
            elem.setAttribute('imdb', imdb);
            elem.setAttribute('onclick', `searchResult('${elem.id}')`);
            elem.innerHTML = `<img src="${data.Poster}" width="200" height="290"><p class="watchlist-movie-title">${data.Title} (${data.Year})</p>`;            
            document.getElementById('watchlist-movie-container').appendChild(elem);
   
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    }
}












const tmdbKey = 'dc6abd1db4f8b3f9cc78138ffe242879';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
 const genreRequestEndpoint  = '/genre/movie/list';
 const requestParams = `?api_key = ${tmdbKey}`;
const  urlToFetch = 'https://api.themoviedb.org/3/genre/movie/list?api_key=dc6abd1db4f8b3f9cc78138ffe242879'
try{
  const response = await fetch(urlToFetch);
  if(response.ok){
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const genres = jsonResponse.genres;
    return genres;

  }

}catch(error){
  console.log(error);
}

};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `api_key= ${tmdbKey} with_genres = ${selectedGenre} `
  const urlToFetch =`https://api.themoviedb.org/3/discover/movie?api_key=dc6abd1db4f8b3f9cc78138ffe242879&with_genres=${selectedGenre}`
try{
  const response = await fetch(urlToFetch);
  if(response.ok){
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const movies = jsonResponse.results;
    return movies;

  }

}catch{

}
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = '/movie/${movieId}';
  const urlToFetch = `https://api.themoviedb.org/3/movie/${movieId}?api_key=dc6abd1db4f8b3f9cc78138ffe242879`;

try{
  const response = await  fetch(urlToFetch);
  if(response.ok){
    const movieInfo = await response.json();
    return movieInfo;

  }

}catch(error){
  console.log(error);

}




  

};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = await getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);



};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
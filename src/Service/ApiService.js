const BaseApiMovies = "https://api.themoviedb.org/3";
const ApiKey = "00058a67658e9f04ee21d5ffbe1d483a";
const fetchTrendingMovies = () => {
  return fetch(
    `${BaseApiMovies}/trending/movie/day?api_key=${ApiKey}`
  ).then((res) => res.json());
};

const fetchMovieDetails = (movieId) => {
  return fetch(
    `${BaseApiMovies}/movie/${movieId}?api_key=${ApiKey}`
  ).then((res) => res.json());
};
const fetchMovies = (searchQuery) => {
  return fetch(
    `${BaseApiMovies}/search/movie?api_key=${ApiKey}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
  ).then((res) => res.json());
};

const fetchMovieDetailsCast = (movieId) => {
  return fetch(
    `${BaseApiMovies}/movie/${movieId}/credits?api_key=${ApiKey}`
  ).then((data) => data.json());
};

const fetchMovieDetailsReviews = (movieId, page) => {
  return fetch(
    `${BaseApiMovies}/movie/${movieId}/reviews?api_key=${ApiKey}&language=en-US&page=1`
  ).then((data) => data.json());
};

export default {
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchMovieDetailsCast,
  fetchMovieDetailsReviews,
  fetchMovies,
};

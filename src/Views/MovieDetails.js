import React, { Component } from "react";

import movieApi from "../Service/ApiService";
import style from "../Style/movieDetails.module.css";
import { NavLink, Link } from "react-router-dom";

import routers from "../routes"
import Spinner from "../Components/Spinner/Spinner" 

const init = {
  movieDetails: null,
  movieId: "",
  listCast: "",
  listReview: "",
  activeCast: false,
  activeReview: false,
  wayBack: "",
  page: 1,
  error: null,
  isLoading: false,
};
class MovieDetails extends Component {
  state = {
    ...init,
  };
  componentDidMount() {
    console.log(this.props.match.params.movieId);
    
    const movieId = this.props.match.params.movieId;
    this.setState({ movieId });
    this.setState({ wayBack: this.props.location.state.from });
    movieApi
      .fetchMovieDetails(movieId)
      .then((movieDetails) => this.setState({ movieDetails }))
      .catch((error) => this.setState({ error: error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  handelShowMovieCast = () => {
    this.setState({ activeCast: true });
    this.setState({ activeReview: false });
    movieApi.fetchMovieDetailsCast(this.state.movieId).then((data) => {
      this.setState({ listCast: data });
    });
  };
  handelShowMovieReview = () => {
    this.setState({ activeCast: false });
    this.setState({ activeReview: true });
    movieApi
      .fetchMovieDetailsReviews(this.state.movieId)
      .then((data) => this.setState({ listReview: data }));
  };
  handelReturnToTheMenu = () => {
    if (this.props.location.state && this.props.location.state.from) {
      this.props.history.push(this.state.wayBack);
    }
  };

  render() {
    const { movieDetails,isLoading, error, activeCast, activeReview } = this.state;
    // const { match } = this.props;
    return (
      <div>
        {movieDetails && (
          <>
            <button type="button" onClick={this.handelReturnToTheMenu} className = {style.buttonReturnToMenu}>
              Return to the menu
            </button>
            <br />
            <div className={style.mainDetails}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
              alt={movieDetails.original_title} className={style.movieDetailsImg}
            />
            <div className={style.movieDetailsInform}>
            <h2>{movieDetails.original_title}</h2>
            <h3>User Score:</h3>
            <p>{movieDetails.popularity}</p>
            <h3>Overview:</h3>
            <p className={style.movieDetailsOverview}>{movieDetails.overview}</p>
            <h2>Genre</h2>
            
            <ul>
              {movieDetails.genres &&
                movieDetails.genres.map((genre) => (
                  <li key={"0000" + genre.id}>{genre.name}</li>
                ))}
            </ul>
            </div>
            </div>
            <hr />
            <h3>Additinal information</h3>
            <ul >
              <li onClick={this.handelShowMovieCast}>
                <NavLink
                  to={{
                    pathname: `${this.props.match.url}`,
                    state: { from: this.props.location },
                  }}
                  className={style.NavMovieDetails}
                  // activeClassName={style.ActiveNavMovieDetails}
                >
                  Cast
                </NavLink>
              </li>
              <li onClick={this.handelShowMovieReview}>
                <NavLink
                  to={{
                    pathname: `${this.props.match.url}`,
                    state: { from: this.props.location },
                  }}
                  className={style.NavMovieDetails}
                  // activeClassName={style.ActiveNavMovieDetails}
                >
                  Review
                </NavLink>
              </li>
            </ul>
            <hr />

            {this.state.listCast && activeCast && (
              <ul className={style.listAdditinalInformation }>
                {this.state.listCast.cast.length === 0 && activeCast && (
                  <li>
                    <p>There is no information about the cast</p>
                  </li>
                )}
                {this.state.listCast.cast && activeCast &&
                  this.state.listCast.cast.map((actor) => (
                    <li key={actor.id}>
                      <div>
                        {actor.profile_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}` } alt={actor.name}
                            className={style.imgAdditinalInformation }
                            
                          />
                        )}
                        <br />
                        <h3>Actor Name: {actor.name}</h3>
                        <h3>Character: {actor.character}</h3>
                        <hr />
                      </div>
                    </li>
                  ))}
              </ul>
            )}

            {this.state.listReview.results && activeReview && (
              <ul className={style.listAdditinalInformation}>
                {this.state.listReview.results.length === 0 && activeReview && (
                  <li>
                    <p>No reviews</p>
                  </li>
                )}
                {this.state.listReview.results && activeReview &&
                  this.state.listReview.results.map((review) => (
                    <li key={review.id}>
                      {review.author}
                      <p>{review.content}</p>
                      <hr />
                    </li>
                  ))}
              </ul>
            )}
            {isLoading && <Spinner/>}
            {error && (
          <p>
            Error<Link to={routers.movies}>To the movie List</Link>
          </p>
        )}
          </>
        )}
      </div>
    );
  }
}
export default MovieDetails;

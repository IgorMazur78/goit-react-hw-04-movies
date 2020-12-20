import React, { Component } from "react";
import { Link } from "react-router-dom";

import Spinner from "../Components/Spinner/Spinner";
import ApiTrendMovies from "../Service/ApiService";
import routers from "../routes"

class ListTrendMovies extends Component {
  state = {
    trendMovies: null,
    isLoading: false,
    error: null,
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    ApiTrendMovies.fetchTrendingMovies()
      .then((trendMovies) => this.setState({ trendMovies }))
      .catch((error) => this.setState({ error: error }))
      .finally(() => this.setState({ isLoading: false }));
    this.setState({ isLoading: false });
  }
  render() {
    const { trendMovies, isLoading, error } = this.state;
    const { match } = this.props;
    return (
      <>
        {isLoading && <Spinner />}
        {error && (
          <p>
            Error<Link to={routers.home}>To the Home page</Link>
          </p>
        )}
        <h2>Trend Movies</h2>

        <ul>
          {trendMovies !== null &&
            trendMovies.results.map((movie) => (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `${match.url}${movie.id}`,
                    state: { from: this.props.location },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            ))}
        </ul>
      </>
    );
  }
}
export default ListTrendMovies;

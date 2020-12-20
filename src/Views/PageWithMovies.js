import React, { Component } from "react";
import { Link } from "react-router-dom";

import getQueryParams from "../Utils/getQueryString";
import ApiMovies from "../Service/ApiService";

import SearchForm from "../Components/SearchForm";
import Spinner from "../Components/Spinner/Spinner";
import routers from "../routes"

const init = {
  ListMovies: null,
  error: null,
  isLoading: false,
};

class ListMovies extends Component {
  state = {
    ...init,
  };
  componentDidMount() {
    let { query } = getQueryParams(this.props.location.search);

    if (query) {
      ApiMovies.fetchMovies(query)
        .then((res) => this.setState({ ListMovies: res }))
        .catch((error) => this.setState({ error: error }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.setState({ isLoading: true });
      ApiMovies.fetchMovies(nextQuery)
        .then((res) => this.setState({ ListMovies: res }))
        .catch((error) => this.setState({ error: error }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }
  handelSearch = (query) => {
    if (query) {
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: `query=${query}`,
      });
    }
  };

  render() {
    const { ListMovies, isLoading, error } = this.state;
    const { match } = this.props;
    return (
      <>
        <SearchForm onSearch={this.handelSearch} />
        {isLoading && <Spinner />}
        {error && (
          <p>
            Error<Link to={routers.movies}>To the movie List</Link>
          </p>
        )}
        <ul>
          {ListMovies !== null &&
            ListMovies.results.map((item) => (
              <li key={item.id}>
                <Link
                  to={{
                    pathname: `${match.url}${item.id}`,
                    state: { from: this.props.location },
                  }}
                >
                  {item.title}
                </Link>
              </li>
            ))}
        </ul>
      </>
    );
  }
}
export default ListMovies;

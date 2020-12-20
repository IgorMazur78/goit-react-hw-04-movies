import React, { Component } from "react";

import style from "../Style/header.module.css"

export default class SearchForm extends Component {
  state = {
    searchValue: "",
  };
  handelSearchMovie = (event) => {
    event.preventDefault();
    this.setState({
      searchValue: event.target.value,
    });
  };

  handelSubmit = (evt) => {
    evt.preventDefault();
    this.props.onSearch(this.state.searchValue);
    this.setState({ searchValue: "" });
  };

  render() {
    return (
      <form onSubmit={this.handelSubmit} className={style.SearchForm}>
        <input
          type="text"
          value={this.state.searchValue}
          onChange={this.handelSearchMovie}
          placeholder="search"
        />
        <button type="submit" className = {style.SearchFormButton}>search</button>
      </form>
    );
  }
}

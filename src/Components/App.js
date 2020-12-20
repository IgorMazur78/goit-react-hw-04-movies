import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./Layout";
import PageWithMovies from "../Views/PageWithMovies";
import HomePage from "../Views/HomePage";
import MovieDetails from "../Views/MovieDetails";
import NotFound from "../Views/NotFound";
import routers from "../routes"

function App() {
  return (
    <div className="App">
      <Layout>
        <hr />
        <Switch>
          <Route path={routers.home} exact component={HomePage} />
          <Route path={routers.movies} exact component={PageWithMovies} />
          <Route path={routers.detailsMovies} exact component={MovieDetails} />
          <Route path={routers.detailsTrend} exact component={MovieDetails} />
          <Route path={routers.detailsCast} exact component={MovieDetails} />
          <Route
            path={routers.detailsReviews}
            exact
            component={MovieDetails}
          />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;

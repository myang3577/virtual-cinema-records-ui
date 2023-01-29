import { CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";

import MovieDetails from "../MovieDetails";
import Navbar from "../NavBar";
import SnackBar from "../SnackBar";
import About from "./About";
import Blacklist from "./Blacklist";
import Home from "./Home";
import MyMovies from "./MyMovies";
import Recommendations from "./Recommendations";

export const routes = {
  homeLink: "/",
  aboutLink: "/about",
  recsLink: "/recommendations",
  myMoviesLink: "/my_movies",
  blacklistLink: "/blacklist",
};

function App() {
  return (
    <Router>
      <div>
        {/* Remove margins */}
        <CssBaseline />
        <Navbar />
        <SnackBar />
        <MovieDetails />

        <div className="page-body">
          <Switch>
            <Route path={routes.recsLink}>
              <Recommendations />
            </Route>
            <Route path={routes.myMoviesLink}>
              <MyMovies />
            </Route>
            <Route path={routes.aboutLink}>
              <About />
            </Route>
            <Route path={routes.blacklistLink}>
              <Blacklist />
            </Route>
            <Route path={routes.homeLink}>
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

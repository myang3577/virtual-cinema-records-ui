import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GlobalState } from "../../reducers/rootReducer";
import MovieGrid from "../../components/MovieGrid";
import { Typography } from "@material-ui/core";
import SearchBar from "../SearchBar";
import { LoadingState } from "../../reducers/tmdbReducer";
import { listMovies } from "../../actions/movieListActions";
import { PageType } from "./Constants";

function Home() {
  const dispatch = useDispatch();
  const movieSearchResult = useSelector<GlobalState, any>(
    (state) => state.tmdbData.movieSearchResult
  );
  const userMyMoviesList = useSelector<GlobalState, []>(
    (state) => state.movieListData.movieListData
  );
  const movieDataLoading = useSelector<GlobalState, LoadingState>(
    (state) => state.tmdbData.loading
  );
  const isLoggedIn = useSelector<GlobalState, boolean>(
    (state) => state.loginData.isLoggedIn
  );
  const username = useSelector<GlobalState, string>(
    (state) => state.loginData.username
  );

  useEffect(() => {
    if (isLoggedIn && username !== "") dispatch(listMovies(username));
  }, [dispatch, username, isLoggedIn]);

  return (
    <div className="page-container">
      <Typography variant="h4" gutterBottom>
        Home
      </Typography>
      <SearchBar />
      <MovieGrid
        displayMovieList={movieSearchResult.results}
        loading={movieDataLoading}
        userMyMoviesList={userMyMoviesList}
        page={PageType.HOME}
      />
    </div>
  );
}

export default Home;

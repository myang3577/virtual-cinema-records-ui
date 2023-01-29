import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Slide,
  TextField,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";

import { listMovies } from "../../actions/movieListActions";
import {
  clearMovieSearchResults,
  getPopularMovies,
  searchMovies,
} from "../../actions/tmdbActions";
import { MovieListElement } from "../../actions/userInfoActions";
import MovieGrid from "../../components/MovieGrid";
import { PageType } from "../../constants/General";
import { LoadingState } from "../../reducers/tmdbReducer";
import { useAppDispatch, useAppSelector } from "../../store";

export const ENTER_KEYCODE = 13;

function Home() {
  const dispatch = useAppDispatch();

  const [movieQuery, setMovieQuery] = useState("");
  const [movieQueryDisplay, setMovieQueryDisplay] = useState("");

  // This is the actual movies that need to be rendered to the user
  const movieSearchResult = useAppSelector<any>(
    (state) => state.tmdbData.movieSearchResult
  );
  const popularMovies = useAppSelector<any>(
    (state) => state.tmdbData.popularMovies
  );

  // This just gets the user's movie list. It is not for rendering purposes.
  // Instead, it is used to indicate if a movie has been added or not
  const userMyMoviesList = useAppSelector<any[]>(
    (state) => state.myMoviesData.movieDataList
  );
  const userBlackList = useAppSelector<any[]>(
    (state) => state.blacklistData.blacklist
  );
  const movieDataLoading = useAppSelector<LoadingState>(
    (state) => state.tmdbData.loading
  );
  const isLoggedIn = useAppSelector<boolean>(
    (state) => state.loginData.isLoggedIn
  );
  const username = useAppSelector<string>((state) => state.loginData.username);

  const loading: LoadingState = useAppSelector<LoadingState>(
    (state) => state.tmdbData.loading
  );

  const userMovieIDList = useAppSelector<MovieListElement[]>(
    (state) => state.myMoviesData.movieIDList
  );

  useEffect(() => {
    if (isLoggedIn && username !== "") dispatch(listMovies(username));
  }, [dispatch, username, isLoggedIn]);

  useEffect(() => {
    dispatch(getPopularMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearMovieSearchResults());
    // eslint-disable-next-line
  }, []);

  const onSearchSubmit = () => {
    dispatch(searchMovies(movieQuery));
    setMovieQueryDisplay(movieQuery);
  };

  return (
    <Slide in={true} timeout={500} direction="up">
      <div className="page-container">
        <Typography variant="h4" gutterBottom>
          Home
        </Typography>
        <TextField
          label="Movie Search"
          variant={"outlined"}
          value={movieQuery}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={onSearchSubmit}
                  disabled={loading === LoadingState.LOADING}
                >
                  {loading === LoadingState.LOADING ? (
                    <CircularProgress size={25} />
                  ) : (
                    <SearchIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => setMovieQuery(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.keyCode === ENTER_KEYCODE) {
              onSearchSubmit();
            }
          }}
          style={{
            marginBottom: "5px",
          }}
        />
        <Typography
          variant="h6"
          gutterBottom
          style={{ marginTop: "5px", marginBottom: "5px" }}
        >
          {movieSearchResult.results
            ? 'Showing results for "' + movieQueryDisplay + '"'
            : "Popular movies"}
        </Typography>
        <MovieGrid
          displayMovieList={
            movieSearchResult.results
              ? movieSearchResult.results
              : popularMovies.results
          }
          loading={movieDataLoading}
          userMyMoviesList={userMyMoviesList}
          userMovieIDList={userMovieIDList}
          userBlackList={userBlackList}
          page={PageType.HOME}
        />
      </div>
    </Slide>
  );
}

export default Home;

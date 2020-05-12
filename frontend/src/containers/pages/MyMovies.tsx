import React, { useState, useEffect } from "react";
import MovieGrid from "../../components/MovieGrid";
import { useDispatch, useSelector } from "react-redux";
import { listMovies, MovieListElement } from "../../actions/movieListActions";
import { GlobalState } from "../../reducers/rootReducer";
import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Slide,
  CircularProgress,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import { LoadingState } from "../../reducers/tmdbReducer";
import { PageType } from "../../Constants";
import NoLogin from "./NoLogin";
import { ENTER_KEYCODE } from "./Home";

function MyMovies() {
  const dispatch = useDispatch();
  const username = useSelector<GlobalState, string>(
    (state) => state.loginData.username
  );
  const isLoggedIn = useSelector<GlobalState, boolean>(
    (state) => state.loginData.isLoggedIn
  );
  const movieDataList = useSelector<GlobalState, []>(
    (state) => state.movieListData.movieDataList
  );
  const movieIDList = useSelector<GlobalState, MovieListElement[]>(
    (state) => state.movieListData.movieIDList
  );
  const movieListLoading = useSelector<GlobalState, LoadingState>(
    (state) => state.movieListData.loading
  );

  const [movieFilter, setMovieFilter] = useState("");
  const [filterMovieList, setFilterMovieList]: any = useState([]);

  useEffect(() => {
    if (isLoggedIn && username !== "") dispatch(listMovies(username));
  }, [dispatch, username, isLoggedIn]);

  useEffect(() => {
    setFilterMovieList(movieDataList);
  }, [movieDataList]);

  useEffect(() => {
    if (movieFilter.trim() !== "") {
      setFilterMovieList((filterMovieList: any) =>
        filterMovieList.filter((e: any) =>
          e.original_title.toLowerCase().includes(movieFilter)
        )
      );
    } else {
      setFilterMovieList(movieDataList);
    }
  }, [movieFilter, movieDataList]);

  const handleSubmit = () => {
    if (movieFilter.trim() !== "") {
      setFilterMovieList(
        filterMovieList.filter((e: any) =>
          e.original_title.toLowerCase().includes(movieFilter)
        )
      );
    } else {
      setFilterMovieList(movieDataList);
    }
  };

  return (
    <Slide in={true} timeout={500} direction="up">
      <div className="page-container">
        {isLoggedIn ? (
          <div>
            <Typography variant="h4" gutterBottom>
              MyMovies
              <IconButton
                onClick={() => dispatch(listMovies(username))}
                size="small"
              >
                <RefreshIcon />
              </IconButton>
            </Typography>

            <TextField
              label="Filter MyMovies"
              variant={"outlined"}
              value={movieFilter}
              fullWidth
              disabled={
                !isLoggedIn || !movieDataList || movieDataList.length === 0
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSubmit}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setMovieFilter(e.target.value.toLowerCase());
              }}
              onKeyDown={(e: any) => {
                if (e.keyCode === ENTER_KEYCODE) {
                  handleSubmit();
                }
              }}
              style={{
                marginBottom: "5px",
              }}
            />

            {movieListLoading === LoadingState.LOADING ? (
              <CircularProgress />
            ) : movieDataList.length === 0 ? (
              <Typography variant="h5" gutterBottom>
                Add movies to view them here.
              </Typography>
            ) : (
              <MovieGrid
                displayMovieList={filterMovieList}
                loading={movieListLoading}
                userMyMoviesList={movieDataList}
                userMovieIDList={movieIDList}
                page={PageType.MY_MOVIES}
              />
            )}
          </div>
        ) : (
          <NoLogin />
        )}
      </div>
    </Slide>
  );
}

export default MyMovies;

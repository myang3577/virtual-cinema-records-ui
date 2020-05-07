import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GlobalState } from "../reducers/rootReducer";
import {
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { searchMovies } from "../actions/tmdbActions";
import { LoadingState } from "../reducers/tmdbReducer";

export const ENTER_KEYCODE = 13;

function SearchBar() {
  const dispatch = useDispatch();
  const [movieQuery, setMovieQuery] = useState("");

  const loading: LoadingState = useSelector<GlobalState>(
    (state) => state.tmdbData.loading
  ) as LoadingState;

  return (
    <TextField
      label="Movie Search"
      variant={"outlined"}
      value={movieQuery}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                dispatch(searchMovies(movieQuery));
              }}
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
          dispatch(searchMovies(movieQuery));
        }
      }}
      style={{
        marginBottom: "5px",
      }}
    />
  );
}

export default SearchBar;

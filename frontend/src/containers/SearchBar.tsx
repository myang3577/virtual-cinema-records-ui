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
import { searchMovies } from "../actions/actions";
import { LoadingState } from "../reducers/otherReducer";
// This defines the look of the searchbar

const ENTER_KEYCODE = 13;

function SearchBar() {
  const dispatch = useDispatch();
  const [movieQuery, setMovieQuery] = useState("");

  const loading: LoadingState = useSelector<GlobalState>(
    (state) => state.otherData.loading
  ) as LoadingState;

  return (
    <div>
      <TextField
        label="Movie Search"
        variant={"outlined"}
        value={movieQuery}
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
      />
    </div>
  );
}

export default SearchBar;

import { LoadingState } from "./otherReducer";
import {
  MovieListActionType,
  MovieListAction,
  MovieListElement,
} from "../actions/movieListActions";

export interface MovieListState {
  loading: LoadingState;
  movieList: MovieListElement[];
}

const initialState: MovieListState = {
  loading: LoadingState.IDLE,
  movieList: [],
};

export const movieListReducer = (
  state = initialState,
  action: MovieListAction
): MovieListState => {
  switch (action.type) {
    case MovieListActionType.LIST_END:
      return {
        ...state,
        loading: LoadingState.DONE,
        movieList: action.payload.movieList!, // this tells typescript that it exists and is not undefined
      };
    default:
      return state;
  }
};

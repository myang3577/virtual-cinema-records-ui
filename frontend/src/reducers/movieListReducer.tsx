import { LoadingState } from "./tmdbReducer";
import {
  MovieListActionType,
  MovieListAction,
  MovieListElement,
} from "../actions/movieListActions";

export interface MovieListState {
  loading: LoadingState;
  movieList: MovieListElement[];
  movieListData: [];
}

const initialState: MovieListState = {
  loading: LoadingState.IDLE,
  movieList: [],
  movieListData: [],
};

export const movieListReducer = (
  state = initialState,
  action: MovieListAction
): MovieListState => {
  switch (action.type) {
    case MovieListActionType.LIST_BEGIN:
      return {
        ...state,
        loading: LoadingState.LOADING,
        movieList: [],
        movieListData: [],
      };
    case MovieListActionType.LIST_END:
      return {
        ...state,
        loading: LoadingState.DONE,
        movieList: action.payload.movieList!, // this tells typescript that it exists and is not undefined
      };
    case MovieListActionType.ADD_MOVIE_DATA:
      return {
        ...state,
        movieListData: [
          ...state.movieListData,
          action.payload.movieData,
        ] as any,
      };
    default:
      return state;
  }
};

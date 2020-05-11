import { LoadingState } from "./tmdbReducer";
import {
  MovieListActionType,
  MovieListAction,
  MovieListElement,
} from "../actions/movieListActions";

export interface MovieListState {
  loading: LoadingState;
  movieIDList: MovieListElement[];
  movieDataList: [];
}

const initialState: MovieListState = {
  loading: LoadingState.IDLE,
  movieIDList: [],
  movieDataList: [],
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
        movieIDList: [],
        movieDataList: [],
      };
    case MovieListActionType.LIST_END:
      return {
        ...state,
        loading: LoadingState.DONE,
        movieIDList: action.payload.movieList!, // this tells typescript that it exists and is not undefined
      };
    case MovieListActionType.ADD_MOVIE_DATA:
      return {
        ...state,
        movieDataList: [
          ...state.movieDataList,
          action.payload.movieData,
        ] as any,
      };
    case MovieListActionType.CLEAR_MOVIE_LIST_DATA:
      return initialState;
    default:
      return state;
  }
};

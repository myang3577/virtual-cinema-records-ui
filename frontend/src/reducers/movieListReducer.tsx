import { LoadingState } from "./tmdbReducer";
import {
  MovieListActionType,
  MovieListAction,
  RatingUpdateAction,
} from "../actions/movieListActions";
import { MovieListElement } from "../actions/userInfoActions";

export interface MovieListState {
  loading: LoadingState;
  listDataLoading: LoadingState;
  movieIDList: MovieListElement[];
  movieDataList: [];
  ratingLoadingStatus: {
    [key: string]: LoadingState;
  };
}

const initialState: MovieListState = {
  loading: LoadingState.IDLE,
  listDataLoading: LoadingState.IDLE,
  movieIDList: [],
  movieDataList: [],
  ratingLoadingStatus: {},
};

export const movieListReducer = (
  state = initialState,
  action: MovieListAction | RatingUpdateAction
): MovieListState => {
  switch (action.type) {
    case MovieListActionType.PUT_RATING_BEGIN:
      return {
        ...state,
        ratingLoadingStatus: {
          ...state.ratingLoadingStatus,
          [(action as RatingUpdateAction).payload.tmdb_id]:
            LoadingState.LOADING,
        },
      };
    case MovieListActionType.PUT_RATING_END:
      return {
        ...state,
        ratingLoadingStatus: {
          ...state.ratingLoadingStatus,
          [(action as RatingUpdateAction).payload.tmdb_id]: LoadingState.DONE,
        },
      };
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
        movieIDList: (action as MovieListAction).payload.movieList!,
      };
    case MovieListActionType.ADD_MOVIE_DATA:
      return {
        ...state,
        movieDataList: [
          ...state.movieDataList,
          (action as MovieListAction).payload.movieData,
        ] as any,
      };
    case MovieListActionType.ADD_ALL_MOVIE_LIST_DATA_END:
      return {
        ...state,
        listDataLoading: LoadingState.DONE,
      };
    case MovieListActionType.CLEAR_MOVIE_LIST_DATA:
      return initialState;
    default:
      return state;
  }
};

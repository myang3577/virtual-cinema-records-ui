import { Dispatch, Action } from "redux";
import { apiKey } from "./tmdbActions";

export enum MovieListActionType {
  PUT_BEGIN = "PUT_BEGIN",
  PUT_END = "PUT_END",
  LIST_BEGIN = "LIST_BEGIN",
  LIST_END = "LIST_END",
  ADD_MOVIE_DATA = "ADD_MOVIE_DATA",
  CLEAR_MOVIE_LIST_DATA = "CLEAR_MOVIE_LIST_DATA",
}

export interface MovieListElement {
  tmdb_id: number;
  rating: number;
}

export interface MovieListAction {
  type: MovieListActionType;
  payload: {
    movieList?: MovieListElement[];
    movieData?: {};
  };
}

export const putRatingBegin = (): MovieListAction => {
  return {
    type: MovieListActionType.PUT_BEGIN,
    payload: {},
  };
};

export const putRatingEnd = (): MovieListAction => {
  return {
    type: MovieListActionType.PUT_END,
    payload: {},
  };
};

export const listMoviesBegin = (): MovieListAction => {
  return {
    type: MovieListActionType.LIST_BEGIN,
    payload: {},
  };
};

export const listMoviesEnd = (payload: any): MovieListAction => {
  return {
    type: MovieListActionType.LIST_END,
    payload: {
      movieList: payload,
    },
  };
};

const addMovieDataAction = (payload: any): MovieListAction => {
  return {
    type: MovieListActionType.ADD_MOVIE_DATA,
    payload: {
      movieData: payload,
    },
  };
};

export const clearMovieListData = (): Action => {
  return {
    type: MovieListActionType.CLEAR_MOVIE_LIST_DATA,
  };
};

export const listMovies = (email: string) => {
  return (dispatch: Dispatch) => {
    dispatch(listMoviesBegin());

    return fetch("/users/" + email + "/movie-list")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Error occurred, status: " + response.status);
        }
      })
      .then((json: MovieListElement[]) => {
        dispatch(listMoviesEnd(json));
        json.forEach((movie) => {
          fetchAndAddMovieData(movie.tmdb_id, dispatch);
        });
      })
      .catch((error) => console.log("An error occurred.", error));
  };
};

const fetchAndAddMovieData = (tmdb_id: number, dispatch: Dispatch) => {
  fetch(
    "https://api.themoviedb.org/3/movie/" +
      tmdb_id +
      "?api_key=" +
      apiKey +
      "&language=en-US"
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error("Error occurred, status: " + response.status);
      }
    })
    .then((json) => dispatch(addMovieDataAction(json)))
    .catch((error) => console.log("An error occurred.", error));
};

export const putMovie = (email: string, tmdb_id: number) => {
  return (dispatch: Dispatch) => {
    dispatch(putRatingBegin());

    const ratingRequestBody = {
      tmdb_id,
    };

    return fetch("/users/" + email + "/movie", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingRequestBody),
    })
      .then(() => dispatch(putRatingEnd()))
      .catch((error) => console.log("An error occurred.", error));
  };
};

export const deleteMovie = (email: string, tmdb_id: number) => {
  return (dispatch: Dispatch) => {
    // Begin/end actions can be added based on UI need
    const ratingRequestBody = {
      tmdb_id,
    };

    return fetch("/users/" + email + "/movie", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingRequestBody),
    })
      .then(() => dispatch(putRatingEnd()))
      .catch((error) => console.log("An error occurred.", error));
  };
};

export const putRating = (email: string, tmdb_id: number, rating: number) => {
  return (dispatch: Dispatch) => {
    dispatch(putRatingBegin());

    const ratingRequestBody = {
      tmdb_id,
      rating,
    };

    return fetch("/users/" + email + "/movie-rating", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingRequestBody),
    })
      .then(() => dispatch(putRatingEnd()))
      .catch((error) => console.log("An error occurred.", error));
  };
};

export const deleteRating = (email: string, tmdb_id: number) => {
  return (dispatch: Dispatch) => {
    // Begin/end actions can be added based on UI need
    const ratingRequestBody = {
      tmdb_id,
    };

    return fetch("/users/" + email + "/movie-rating", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingRequestBody),
    })
      .then(() => dispatch(putRatingEnd()))
      .catch((error) => console.log("An error occurred.", error));
  };
};

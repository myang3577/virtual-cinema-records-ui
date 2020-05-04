import { Dispatch } from "redux";

export enum MovieListActionType {
  PUT_BEGIN = "PUT_BEGIN",
  PUT_END = "PUT_END",
  LIST_END = "LIST_END",
}

export interface MovieListElement {
  tmdb_id: number;
  rating: number;
}

export interface MovieListAction {
  type: MovieListActionType;
  payload: {
    movieList?: MovieListElement[];
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

export const listMoviesEnd = (payload: any): MovieListAction => {
  return {
    type: MovieListActionType.LIST_END,
    payload: {
      movieList: payload,
    },
  };
};

export const listMovies = (email: string) => {
  return (dispatch: Dispatch) => {
    // Begin/end actions can be added based on UI need

    return fetch("/users/" + email + "/movie-list")
      .then((response) => response.json())
      .then((json) => dispatch(listMoviesEnd(json)))
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

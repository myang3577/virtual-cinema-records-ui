import { Dispatch } from "redux";

const apiKey = "5e38014a47f9412c29d0ca4667091633";

export enum ActionType {
  FETCH_BEGIN,
  FETCH_END,
}

export interface Action {
  type: ActionType;
  text: string;
  payload: {};
}

export const fetchDataBegin = () => {
  return {
    type: ActionType.FETCH_BEGIN,
  };
};

export const fetchDataEnd = (payload: {}) => {
  return {
    type: ActionType.FETCH_END,
    payload: payload,
  };
};

export const searchMovies = (query: string) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchDataBegin());
    return fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=" +
        apiKey +
        "&language=en-US&query=" +
        query +
        "&include_adult=true"
    )
      .then(
        (response) => response.json(),
        (error) => console.log("An error occurred.", error)
      )
      .then((json) => dispatch(fetchDataEnd(json)));
  };
};

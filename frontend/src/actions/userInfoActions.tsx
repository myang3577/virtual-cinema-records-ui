import { Dispatch, Action } from "redux";

export enum UserInfoActionType {
  GET_BEGIN = "GET_BEGIN",
  GET_END = "GET_END",
}

export interface MovieListElement {
  tmdb_id: number;
  rating: number;
}

export interface UserInfoAction {
  type: UserInfoActionType;
  payload: {
    username: string;
    hasUpdatedPreferences: boolean;
  };
}

export const getInfoBegin = (): Action => {
  return {
    type: UserInfoActionType.GET_BEGIN,
  };
};

export const getInfoEnd = (payload: any): UserInfoAction => {
  return {
    type: UserInfoActionType.GET_END,
    payload: payload,
  };
};

export const getUserInfo = (email: string) => {
  return (dispatch: Dispatch) => {
    // Begin/end actions can be added based on UI need

    return fetch("/users/" + email)
      .then((response) => response.json())
      .then((json) => dispatch(getInfoEnd(json)))
      .catch((error) => console.log("An error occurred.", error));
  };
};

export const setPreferencesFlag = (
  email: string,
  hasUpdatedPreferences: boolean
) => {
  // Begin/end actions can be added based on UI need
  return (dispatch: Dispatch) => {
    dispatch(getInfoBegin());

    const body = {
      hasUpdatedPreferences,
    };

    return fetch("/users/" + email + "/preferences-flag", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).catch((error) => console.log("An error occurred.", error));
  };
};

import { Dispatch } from "redux";
import { clearMovieDataList } from "./movieListActions";
import { clearRecommendationData } from "./recommendationActions";

export enum LoginType {
  LOGIN_BEGIN = "LOGIN_BEGIN",
  LOGIN_END = "LOGIN_END",
  CREATE_ACCT_END = "CREATE_ACCT_END",
  CHANGE_PASSWORD_END = "CHANGE_PASSWORD_END",
  RESET_PASSWORD_END = "RESET_PASSWORD_END",
  LOGOUT_END = "LOGOUT_END",
}

export interface Login {
  type: LoginType;
  payload: {
    isLoggedIn: boolean;
    requestFeedback: string;
  };
  username: string;
  password: string;
}

export const initiateLoading = (): Login => {
  return {
    type: LoginType.LOGIN_BEGIN,
    payload: {
      isLoggedIn: false,
      requestFeedback: "",
    },
    username: "",
    password: "",
  };
};

export const checkLoginEnd = (
  payload: {
    isLoggedIn: boolean;
    requestFeedback: string;
  },
  username: string,
  password: string
): Login => {
  return {
    type: LoginType.LOGIN_END,
    payload: {
      isLoggedIn: payload.isLoggedIn,
      requestFeedback: payload.requestFeedback,
    },
    username: username,
    password: password,
  };
};

export const createAcctEnd = (
  payload: {
    requestFeedback: string;
  },
  username: string,
  password: string
): Login => {
  return {
    type: LoginType.CREATE_ACCT_END,
    payload: {
      isLoggedIn: false,
      requestFeedback: payload.requestFeedback,
    },
    username: username,
    password: password,
  };
};

export const changePasswordEnd = (
  payload: {
    requestFeedback: string;
    isPassChange: boolean;
  },
  username: string,
  password: string
): Login => {
  return {
    type: LoginType.CHANGE_PASSWORD_END,
    payload: {
      isLoggedIn: true,
      requestFeedback: payload.requestFeedback,
    },
    username: username,
    password: password,
  };
};

export const forgotPasswordEnd = (payload: {
  requestFeedback: string;
}): Login => {
  return {
    type: LoginType.RESET_PASSWORD_END,
    payload: {
      isLoggedIn: false,
      requestFeedback: payload.requestFeedback,
    },
    username: "",
    password: "",
  };
};

export const logoutEnd = (): Login => {
  return {
    type: LoginType.LOGOUT_END,
    payload: {
      isLoggedIn: false,
      requestFeedback: "",
    },
    username: "",
    password: "",
  };
};

export const logout = () => {
  return (dispatch: Dispatch) => {
    dispatch(initiateLoading());
    dispatch(logoutEnd());
    dispatch(clearMovieDataList());
    dispatch(clearRecommendationData());
  };
};

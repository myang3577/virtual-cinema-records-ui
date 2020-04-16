import { Dispatch } from "redux";

export enum LoginType {
  LOGIN_BEGIN = "LOGIN_BEGIN",
  LOGIN_END = "LOGIN_END",
}

export interface Login {
  type: LoginType;
  payload: boolean;
  username: string;
  password: string;
}

// export interface LoginCredentials {
//   type: LoginType;
//   username: string;
//   password: string;
// }

export const checkLoginBegin = (username: string, password: string): Login => {
  return {
    type: LoginType.LOGIN_BEGIN,
    payload: false,
    username: username,
    password: password,
  };
};

export const checkLoginEnd = (
  payload: boolean,
  username: string,
  password: string
): Login => {
  return {
    type: LoginType.LOGIN_END,
    payload: payload,
    username: username,
    password: password,
  };
};

// export const setCredentials = (username: string, password: string) => {
//   return {
//     type: LoginType.LOGIN_CREDENTIAL,
//     username: username,
//     password: password,
//   };
// };

export const checkLogin = (username: string, password: string) => {
  return (dispatch: Dispatch) => {
    console.log("username is: " + username);
    dispatch(checkLoginBegin(username, password));
    // dispatch(setCredentials(username, password));
    return fetch(
      `/aws/checkLogin?name=${encodeURIComponent(username)}
                    &password=${encodeURIComponent(password)}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "access-control-allow-origin": "*",
        },
        // credentials: 'include'
      }
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch(checkLoginEnd(json, username, password));
      })
      .catch((err) => alert(err));
  };
};

import { Login, LoginType } from "../actions/loginActions";
import { LoadingState } from "./otherReducer";

// Defines the possible loading states
// export enum LoadingStatess {
//   IDLE,
//   LOADING,
//   DONE,
// }

export interface loginInitialState {
  loading: LoadingState;
  loginResult: boolean;
  username: string;
  password: string;
}

const initialState2: loginInitialState = {
  loading: LoadingState.IDLE,
  loginResult: false,
  username: "",
  password: "",
};

// export const loginReducer = (
//   state = initialState2,
//   action: Login
// ): loginInitialState => {
//   switch (action.type) {
//     case LoginType.LOGIN_BEGIN:
//       return {
//         ...state,
//         loading: LoadingState.LOADING,
//         username: action.username,
//         password: action.password,
//       };
//     case LoginType.LOGIN_END:
//       return {
//         ...state,
//         loginResult: action.payload,
//         loading: LoadingState.DONE,
//       };
//     default:
//       return state;
//   }
// };

export const loginReducer = (
  state = initialState2,
  action: Login
): loginInitialState => {
  switch (action.type) {
    case LoginType.LOGIN_BEGIN:
      return {
        ...state,
        loading: LoadingState.LOADING,
        username: action.username,
        password: action.password,
      };
    case LoginType.LOGIN_END:
      return {
        ...state,
        loginResult: action.payload,
        loading: LoadingState.DONE,
      };
    default:
      return state;
  }
};

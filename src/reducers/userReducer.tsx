import { LoadingState } from "./tmdbReducer";
import { UserInfoAction, UserInfoActionType } from "../actions/userInfoActions";

export interface UserInfoState {
  loading: LoadingState;
  username: string;
  hasUpdatedPreferences: boolean;
}

const initialState: UserInfoState = {
  loading: LoadingState.IDLE,
  username: "",
  hasUpdatedPreferences: false,
};

export const userInfoReducer = (
  state = initialState,
  action: UserInfoAction
): UserInfoState => {
  switch (action.type) {
    case UserInfoActionType.GET_END:
      return {
        ...state,
        loading: LoadingState.DONE,
        username: action.payload.username,
        hasUpdatedPreferences: action.payload.hasUpdatedPreferences,
      };
    default:
      return state;
  }
};

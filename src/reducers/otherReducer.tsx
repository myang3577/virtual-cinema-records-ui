import { Action, ActionType } from "../actions/actions";

export enum LoadingState {
  IDLE,
  LOADING,
  DONE,
}

export interface InitialState {
  loading: LoadingState;
  movieSearchResult: {};
}

const initialState: InitialState = {
  loading: LoadingState.IDLE,
  movieSearchResult: {},
};

export const otherReducer = (
  state = initialState,
  action: Action
): InitialState => {
  switch (action.type) {
    case ActionType.FETCH_BEGIN:
      return {
        ...state,
        loading: LoadingState.LOADING,
      };
    case ActionType.FETCH_END:
      return {
        ...state,
        movieSearchResult: action.payload,
        loading: LoadingState.DONE,
      };
    default:
      return state;
  }
};

export default otherReducer;

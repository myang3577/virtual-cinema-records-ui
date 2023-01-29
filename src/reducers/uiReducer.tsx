import {
  AccountModalContent,
  SnackBarActionType,
  UIAction,
  UIActionType,
  UISetModalContentAction,
  UISnackBarAction,
} from "../actions/uiActions";

export interface UIState {
  accountModalOpen: boolean;
  accountModalContent: AccountModalContent;
  accountDrawerOpen: boolean;
  snackBarOpen: boolean;
  snackBarString: string;
  snackBarAction: SnackBarActionType;
  snackBarExtraPayload: {
    movie: any;
    userRating: number;
  };
  tmdbBaseUrl: string;
}

const initialState: UIState = {
  accountModalOpen: false,
  accountModalContent: AccountModalContent.LOGIN,
  accountDrawerOpen: false,
  snackBarOpen: false,
  snackBarString: "",
  snackBarAction: SnackBarActionType.NONE,
  snackBarExtraPayload: {
    movie: {},
    userRating: 0,
  },
  tmdbBaseUrl: "https://image.tmdb.org/t/p/w500/",
};

export const uiReducer = (
  state = initialState,
  action: UIAction | UISetModalContentAction | UISnackBarAction
): UIState => {
  switch (action.type) {
    case UIActionType.OPEN_ACCOUNT_MODAL:
      return {
        ...state,
        accountModalOpen: true,
      };
    case UIActionType.CLOSE_ACCOUNT_MODAL:
      return {
        ...state,
        accountModalOpen: false,
      };
    case UIActionType.SET_ACCOUNT_MODAL_CONTENT:
      return {
        ...state,
        accountModalContent: (action as UISetModalContentAction).payload
          .modalContent,
      };
    case UIActionType.OPEN_ACCOUNT_DRAWER:
      return {
        ...state,
        accountDrawerOpen: true,
      };
    case UIActionType.CLOSE_ACCOUNT_DRAWER:
      return {
        ...state,
        accountDrawerOpen: false,
      };
    case UIActionType.OPEN_SNACKBAR:
      return {
        ...state,
        snackBarOpen: true,
        snackBarString: (action as UISnackBarAction).payload.snackBarString,
        snackBarAction: (action as UISnackBarAction).payload.snackBarAction,
        snackBarExtraPayload: (action as UISnackBarAction).payload
          .snackBarExtraPayload,
      };
    case UIActionType.CLOSE_SNACKBAR:
      return {
        ...state,
        snackBarOpen: false,
      };
    default:
      return state;
  }
};

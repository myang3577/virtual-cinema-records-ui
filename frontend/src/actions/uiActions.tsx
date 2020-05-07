export enum UIActionType {
  OPEN_ACCOUNT_MODAL = "OPEN_MODAL",
  CLOSE_ACCOUNT_MODAL = "CLOSE_MODAL",
  SET_ACCOUNT_MODAL_CONTENT = "SET_ACCOUNT_MODAL_CONTENT",
}

export interface UIAction {
  type: UIActionType;
}

export interface UISetModalContentAction {
  type: UIActionType;
  payload: {
    modalContent: AccountModalContent;
  };
}

export enum AccountModalContent {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  REGISTER = "REGISTER",
}

export const setAccountModalContent = (
  modalContent: AccountModalContent
): UISetModalContentAction => {
  return {
    type: UIActionType.SET_ACCOUNT_MODAL_CONTENT,
    payload: {
      modalContent,
    },
  };
};

export const openAccountModal = (): UIAction => {
  return {
    type: UIActionType.OPEN_ACCOUNT_MODAL,
  };
};

export const closeAccountModal = (): UIAction => {
  return {
    type: UIActionType.CLOSE_ACCOUNT_MODAL,
  };
};

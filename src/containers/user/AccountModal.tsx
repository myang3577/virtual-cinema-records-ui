import "../../styles/App.css";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";

import {
  AccountModalContent,
  closeAccountModal,
  openSnackBar,
  SnackBarActionType,
} from "../../actions/uiActions";
import VCRSmallLogo from "../../images/VCRIconOnly.png";
import { GlobalState } from "../../reducers/rootReducer";
import ChangePasswordForm from "./ChangePasswordForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AccountModal() {
  const isLoggedIn = useSelector<GlobalState, boolean>(
    (state) => state.loginData.isLoggedIn
  );

  const username = useSelector<GlobalState, string>(
    (state) => state.loginData.username
  );

  const isModalOpen = useSelector<GlobalState, boolean>(
    (state) => state.uiData.accountModalOpen
  );

  const modalType = useSelector<GlobalState, AccountModalContent>(
    (state) => state.uiData.accountModalContent
  );

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeAccountModal());
  };

  const accountModal = () => {
    switch (modalType) {
      case AccountModalContent.LOGIN:
        return <LoginForm />;
      case AccountModalContent.REGISTER:
        return <RegisterForm />;
      case AccountModalContent.CHANGE_PASSWORD:
        return <ChangePasswordForm />;
      case AccountModalContent.FORGOT_PASSWORD:
        return <ForgotPasswordForm />;
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(
        openSnackBar(username + " logged in", SnackBarActionType.MYMOVIES)
      );
    }
  }, [dispatch, isLoggedIn, username]);

  return (
    <Dialog open={isModalOpen} onClose={closeModal} className="account-modal">
      <DialogTitle>
        <div className="account-modal-close-button">
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <div id="account-modal-content">
          <img src={VCRSmallLogo} id="modal-img" alt="VCR logo" />
          {accountModal()}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AccountModal;

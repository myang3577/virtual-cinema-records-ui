import "../../styles/App.css";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect } from "react";

import {
  AccountModalContent,
  closeAccountModal,
  openSnackBar,
  SnackBarActionType,
} from "../../actions/uiActions";
import VCRSmallLogo from "../../images/VCRIconOnly.png";
import { useAppDispatch, useAppSelector } from "../../store";
import ChangePasswordForm from "./ChangePasswordForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AccountModal() {
  const isLoggedIn = useAppSelector<boolean>(
    (state) => state.loginData.isLoggedIn
  );

  const username = useAppSelector<string>((state) => state.loginData.username);

  const isModalOpen = useAppSelector<boolean>(
    (state) => state.uiData.accountModalOpen
  );

  const modalType = useAppSelector<AccountModalContent>(
    (state) => state.uiData.accountModalContent
  );

  const dispatch = useAppDispatch();

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

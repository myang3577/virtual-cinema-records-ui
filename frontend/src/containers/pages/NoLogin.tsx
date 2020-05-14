import React from "react";
import { useDispatch } from "react-redux";
import { Typography, Link } from "@material-ui/core";
import {
  openAccountModal,
  setAccountModalContent,
  AccountModalContent,
} from "../../actions/uiActions";

function NoLogin() {
  const dispatch = useDispatch();

  return (
    <Typography variant="h4" gutterBottom>
      <Link
        component="button"
        variant="h4"
        onClick={() => {
          dispatch(setAccountModalContent(AccountModalContent.LOGIN));
          dispatch(openAccountModal());
        }}
      >
        Log in
      </Link>{" "}
      to view.
    </Typography>
  );
}

export default NoLogin;

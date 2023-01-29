import { Link, Typography } from "@material-ui/core";
import React from "react";

import {
  AccountModalContent,
  openAccountModal,
  setAccountModalContent,
} from "../../actions/uiActions";
import { useAppDispatch } from "../../store";

function NoLogin() {
  const dispatch = useAppDispatch();

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

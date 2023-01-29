import { Link } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import {
  AccountModalContent,
  openSnackBar,
  setAccountModalContent,
  SnackBarActionType,
} from "../../actions/uiActions";
import { LoadingButton } from "../../components/LoadingButton";
import { PasswordField } from "../../components/Password";
import { UsernameField } from "../../components/Username";
import { validEmail } from "../../constants/General";
import { useAppDispatch, useAppSelector } from "../../store";

function LoginForm() {
  const [localUsername, setLocalUsername] = useState("");
  const [localPassword, setLocalPassword] = useState("");

  const feedback: any = useAppSelector(
    (state) => state.loginData.loginFeedback
  );

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (localUsername === "" || localPassword === "") {
      dispatch(
        openSnackBar(
          "Your username or password is empty. Please provide" +
            " both a username and a password"
        )
      );
    } else if (!validEmail(localUsername)) {
      dispatch(openSnackBar("Your username must be a valid email address"));
    }
  };

  useEffect(() => {
    if (feedback !== "") {
      dispatch(openSnackBar(feedback, SnackBarActionType.MYMOVIES));
    }
  }, [dispatch, feedback]);

  const openRegister = () => {
    dispatch(setAccountModalContent(AccountModalContent.REGISTER));
  };

  const openForgotPassword = () => {
    dispatch(setAccountModalContent(AccountModalContent.FORGOT_PASSWORD));
  };

  return (
    <div className="user-form">
      <UsernameField
        error={localUsername !== "" && !validEmail(localUsername)}
        username={localUsername}
        loading={false}
        setUsername={setLocalUsername}
      />
      <div className="divider"></div>
      <PasswordField
        password={localPassword}
        loading={false}
        setPassword={setLocalPassword}
        placeholder={"Password"}
      />
      <div className="divider"></div>
      <LoadingButton onClick={handleSubmit} loading={false}>
        Login
      </LoadingButton>
      <br />
      <div className="account-link">
        <Link onClick={openRegister} className="text-link">
          Not a member? Register
        </Link>
      </div>
      <br />
      <div className="account-link">
        <Link onClick={openForgotPassword} className="text-link">
          Forgot password?
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;

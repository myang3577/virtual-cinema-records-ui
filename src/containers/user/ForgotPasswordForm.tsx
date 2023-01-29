import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { openSnackBar } from "../../actions/uiActions";
import { LoadingButton } from "../../components/LoadingButton";
import { UsernameField } from "../../components/Username";
import { validEmail } from "../../constants/General";
import { useAppDispatch, useAppSelector } from "../../store";

function ForgotPassword() {
  const [localUsername, setLocalUsername] = useState("");

  const feedback: any = useAppSelector(
    (state) => state.loginData.passwordRecoverFeedback
  );

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (localUsername === "") {
      dispatch(
        openSnackBar(
          "Your entered username is empty. Please provide a valid email username"
        )
      );
    } else if (!validEmail(localUsername)) {
      dispatch(openSnackBar("Your username must be a valid email address"));
    }
  };

  useEffect(() => {
    if (feedback !== "") {
      dispatch(openSnackBar(feedback));
    }
  }, [dispatch, feedback]);

  return (
    <div className="user-form">
      <Typography variant="h6">
        Enter your username to receive an email with your password
      </Typography>
      <UsernameField
        error={localUsername !== "" && !validEmail(localUsername)}
        username={localUsername}
        loading={false}
        setUsername={setLocalUsername}
      />
      <div className="divider"></div>
      <LoadingButton onClick={handleSubmit} loading={false}>
        Receive Password
      </LoadingButton>
    </div>
  );
}

export default ForgotPassword;

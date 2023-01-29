import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GlobalState } from "../../reducers/rootReducer";
import { PasswordField } from "../../components/Password";
import { LoadingButton } from "../../components/LoadingButton";
import {
  openSnackBar,
  setAccountModalContent,
  AccountModalContent,
} from "../../actions/uiActions";
import { Link } from "@material-ui/core";

function ChangePassword() {
  const [localPassword, setLocalPassword] = useState("");
  const [newLocalPassword, setNewLocalPassword] = useState("");
  const [newRepeatLocalPassword, setNewRepeatLocalPassword] = useState("");

  const feedback: any = useSelector<GlobalState>(
    (state) => state.loginData.passwordChangeFeedback
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (feedback !== "") {
      dispatch(openSnackBar(feedback));
    }
  }, [dispatch, feedback]);

  const handleSubmit = () => {
    if (
      localPassword === "" ||
      newLocalPassword === "" ||
      newRepeatLocalPassword === ""
    ) {
      dispatch(
        openSnackBar(
          "Your current password, new password, or confirm password is empty. Please provide" +
            " both your current password, a new password, and a confirm password"
        )
      );
    } else if (newLocalPassword !== newRepeatLocalPassword) {
      dispatch(
        openSnackBar("Your new password does not match your confirm password")
      );
    }
  };

  const openForgotPassword = () => {
    dispatch(setAccountModalContent(AccountModalContent.FORGOT_PASSWORD));
  };

  return (
    <div className="user-form">
      <PasswordField
        password={localPassword}
        loading={false}
        setPassword={setLocalPassword}
        placeholder={"Old Password"}
      />
      <div className="divider"></div>
      <PasswordField
        password={newLocalPassword}
        loading={false}
        setPassword={setNewLocalPassword}
        placeholder={"New Password"}
      />
      <div className="divider"></div>
      <PasswordField
        password={newRepeatLocalPassword}
        loading={false}
        setPassword={setNewRepeatLocalPassword}
        placeholder={"Confirm Password"}
      />
      <div className="divider"></div>
      <LoadingButton onClick={handleSubmit} loading={false}>
        Change Password
      </LoadingButton>
      <div className="account-link">
        <Link onClick={openForgotPassword} className="text-link">
          Forgot password?
        </Link>
      </div>
    </div>
  );
}

export default ChangePassword;

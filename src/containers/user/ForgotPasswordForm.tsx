import { Typography } from "@material-ui/core";
import React, { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";

import { openSnackBar } from "../../actions/uiActions";
import { LoadingButton } from "../../components/LoadingButton";
import { UsernameField } from "../../components/Username";
import { validEmail } from "../../constants/General";
import { GlobalState } from "../../reducers/rootReducer";

function ForgotPassword() {
  const [localUsername, setLocalUsername] = useState("");

  const feedback: any = useSelector<GlobalState>(
    (state) => state.loginData.passwordRecoverFeedback
  );

  const dispatch = useDispatch();

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

import React from "react";
import { useDispatch } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import { openAccountModal } from "../../actions/uiActions";

function NoLogin() {
  const dispatch = useDispatch();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Log in to view.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={() => dispatch(openAccountModal())}
      >
        Log in
      </Button>
    </div>
  );
}

export default NoLogin;

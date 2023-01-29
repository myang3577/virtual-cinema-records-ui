import "../styles/App.css";

import { InputAdornment,TextField } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React from "react";

export interface UsernameFormProps {
  error: boolean;
  username: string;
  loading: boolean;
  setUsername: (username: string) => any;
}

export function UsernameField(props: UsernameFormProps) {
  return (
    <TextField
      label={"Email"}
      value={props.username}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        props.setUsername(e.target.value);
      }}
      error={props.error}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default UsernameField;

import React from "react";
import { FormControl, TextField, InputAdornment } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import "../styles/App.css";

export interface UsernameFormProps {
  error: boolean;
  username: string;
  loading: boolean;
  setUsername: (username: string) => any;
}

export function UsernameField(props: UsernameFormProps) {
  return (
    <FormControl error={props.error}>
      <TextField
        label={"Username"}
        value={props.username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setUsername(e.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}

export default UsernameField;

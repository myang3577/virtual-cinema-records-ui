import React from "react";
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
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
      <InputLabel>Username</InputLabel>
      <Input
        startAdornment={
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        }
        value={props.username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setUsername(e.target.value);
        }}
      />
    </FormControl>
  );
}

export default UsernameField;
import "../styles/App.css";

import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Lock, Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";

export interface PasswordFormProps {
  password: string;
  loading: boolean;
  setPassword: (password: string) => any;
  placeholder: string;
}

export function PasswordField(props: PasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      label={props.placeholder}
      type={showPassword ? "text" : "password"}
      value={props.password}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        props.setPassword(e.target.value);
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Lock />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  );
}

export default PasswordField;

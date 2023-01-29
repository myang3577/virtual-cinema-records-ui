import { Button, CircularProgress } from "@material-ui/core";
import React from "react";

export interface LoadingButtonProps {
  onClick: () => any;
  loading: boolean;
  children?: React.ReactNode;
  color?: "inherit" | "primary" | "secondary" | "default";
  variant?: "text" | "outlined" | "contained";
}

export function LoadingButton(props: LoadingButtonProps) {
  return (
    <Button
      variant={props.variant ? props.variant : "contained"}
      color={props.color ? props.color : "primary"}
      disableElevation
      disabled={props.loading}
      onClick={props.onClick}
    >
      {props.loading && <CircularProgress size={18} color="secondary" />}
      &nbsp; {props.children} &nbsp;
    </Button>
  );
}

export default LoadingButton;

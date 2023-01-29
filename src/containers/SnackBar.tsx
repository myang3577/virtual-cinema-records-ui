import { IconButton, Slide } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { Block, Person, Theaters } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import { closeMovieDetail } from "../actions/movieDetailsActions";
import {
  AccountModalContent,
  openAccountModal,
  setAccountModalContent,
  SnackBarActionType,
} from "../actions/uiActions";
import { useAppDispatch, useAppSelector } from "../store";
import { routes } from "./pages/App";
import RatingButtons from "./RatingButtons";

export interface SnackbarMessage {
  message: string;
  key: number;
  action: SnackBarActionType;
  extraPayload: {
    movie: any;
    userRating: number;
  };
}

function SnackBar() {
  const dispatch = useAppDispatch();

  const snackBarOpen: any = useAppSelector(
    (state) => state.uiData.snackBarOpen
  );

  const snackBarString = useAppSelector<string>(
    (state) => state.uiData.snackBarString
  );

  const snackBarAction = useAppSelector<SnackBarActionType>(
    (state) => state.uiData.snackBarAction
  );

  const snackBarExtraPayload: any = useAppSelector(
    (state) => state.uiData.snackBarExtraPayload
  );

  const [messageInfo, setMessageInfo] = React.useState<
    SnackbarMessage | undefined
  >(undefined);
  const [open, setOpen] = React.useState(false);
  const [snackPack, setSnackPack] = React.useState<SnackbarMessage[]>([]);

  useEffect(() => {
    if (snackBarString && snackBarAction && snackBarExtraPayload) {
      addMessage(snackBarString, snackBarAction, snackBarExtraPayload);
    }

    setOpen(snackBarOpen);
  }, [
    dispatch,
    snackBarString,
    snackBarOpen,
    snackBarAction,
    snackBarExtraPayload,
  ]);

  const addMessage = (
    message: string,
    action: SnackBarActionType,
    extraPayload: any
  ) => {
    setSnackPack((prev) => [
      ...prev,
      { message, key: new Date().getTime(), action, extraPayload },
    ]);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClose = () => {
    setOpen(false);
  };

  const interactiveIconClick = () => {
    setOpen(false);

    if (messageInfo) {
      switch (messageInfo.action) {
        case SnackBarActionType.NONE:
          return;
        case SnackBarActionType.LOGIN:
          dispatch(setAccountModalContent(AccountModalContent.LOGIN));
          dispatch(openAccountModal());
          return;
        case SnackBarActionType.MYMOVIES:
          dispatch(closeMovieDetail());
          return;
        case SnackBarActionType.BLACKLIST:
          dispatch(closeMovieDetail());
          return;
        case SnackBarActionType.RATING:
          dispatch(closeMovieDetail());
          return;
      }
    }
  };

  const interactiveIcon = () => {
    if (messageInfo) {
      switch (messageInfo.action) {
        case SnackBarActionType.NONE:
          return;
        case SnackBarActionType.LOGIN:
          return <Person fontSize="small" />;
        case SnackBarActionType.MYMOVIES:
          return <Theaters fontSize="small" />;
        case SnackBarActionType.RATING:
          return <Theaters fontSize="small" />;
        case SnackBarActionType.BLACKLIST:
          return <Block fontSize="small" />;
      }
    }
  };

  const interactiveIconLink = (event: any) => {
    if (messageInfo) {
      switch (messageInfo.action) {
        case SnackBarActionType.MYMOVIES:
          return routes.myMoviesLink;
        case SnackBarActionType.RATING:
          return routes.myMoviesLink;
        case SnackBarActionType.BLACKLIST:
          return routes.blacklistLink;
      }
    }

    return "";
  };

  const interactiveExtraAction = () => {
    if (messageInfo) {
      switch (messageInfo.action) {
        case SnackBarActionType.RATING:
          if (messageInfo.extraPayload.movie !== null)
            return (
              <RatingButtons
                movie={messageInfo.extraPayload.movie}
                userRating={messageInfo.extraPayload.userRating}
                displayWords={false}
                disabled
              />
            );
      }
    }

    return "";
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      onExited={handleExited}
      message={messageInfo ? messageInfo.message : undefined}
      TransitionComponent={Slide}
      transitionDuration={500}
      key={messageInfo ? messageInfo.key : undefined}
      action={
        <React.Fragment>
          {messageInfo &&
            messageInfo.action === SnackBarActionType.RATING &&
            interactiveExtraAction()}
          {messageInfo && messageInfo.action && (
            <IconButton
              size="small"
              color="inherit"
              onClick={interactiveIconClick}
              component={RouterLink}
              to={interactiveIconLink}
            >
              {interactiveIcon()}
            </IconButton>
          )}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}

export default SnackBar;

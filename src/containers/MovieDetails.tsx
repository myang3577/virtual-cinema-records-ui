import {
  Avatar,
  CircularProgress,
  createStyles,
  Dialog,
  Grid,
  GridList,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Slide,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useDispatch,useSelector } from "react-redux";

import {
  deleteBlackListMovie,
  putBlackListMovie,
} from "../actions/blacklistAction";
import {
  closeMovieDetail,
  setMovieButtons,
} from "../actions/movieDetailsActions";
import { deleteMovie, putMovie } from "../actions/movieListActions";
import { openSnackBar, SnackBarActionType } from "../actions/uiActions";
import AddRemoveMoviesIconButton from "../components/AddRemoveMoviesIconButton";
import BlacklistMovieIcon from "../components/BlacklistMovieIcon";
import { GlobalState } from "../reducers/rootReducer";
import { LoadingState } from "../reducers/tmdbReducer";
import Prices from "./Prices";
import RatingButtons from "./RatingButtons";
import RelatedMovies from "./RelatedMovies";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      margin: 0,
      width: "100%",
    },
    root: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      minHeight: 0,
      margin: 0,
      width: "100%",
      marginTop: "5%",
      overflow: "hidden",
    },
    descriptionHeader: {
      display: "inline-flex",
      alignItems: "center",
    },
    prices: {
      textAlign: "left",
      color: theme.palette.text.primary,
      flexGrow: 1,
      overflowY: "auto",
      overflowX: "hidden",
      minHeight: "100%",
    },
    paper: {
      textAlign: "left",
      color: theme.palette.text.primary,
      flexGrow: 1,
      overflowY: "auto",
      overflowX: "hidden",
      minHeight: "100%",
    },
    poster: {
      flexShrink: 0,
      textAlign: "left",
      color: theme.palette.text.primary,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MovieDetails() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const movie = useSelector<GlobalState, any>(
    (state) => state.movieDetailData.movie
  );

  const tmdb_id = useSelector<GlobalState, number>(
    (state) => state.movieDetailData.tmdb_id
  );

  const movieDetailsOpen = useSelector<GlobalState, boolean>(
    (state) => state.movieDetailData.movieDetailsOpen
  );

  const inUserList = useSelector<GlobalState, boolean>(
    (state) => state.movieDetailData.inUserList
  );

  const inBlackList = useSelector<GlobalState, boolean>(
    (state) => state.movieDetailData.inBlackList
  );

  const userRating = useSelector<GlobalState, number>(
    (state) => state.movieDetailData.userRating
  );

  const username = useSelector<GlobalState, string>(
    (state) => state.loginData.username
  );

  const isLoggedIn = useSelector<GlobalState, boolean>(
    (state) => state.loginData.isLoggedIn
  );

  const baseUrl = useSelector<GlobalState, string>(
    (state) => state.uiData.tmdbBaseUrl
  );

  const movieDetails = useSelector<GlobalState, any>(
    (state) => state.tmdbData.movieDetails[tmdb_id]
  );

  const movieDetailsLoading = useSelector<GlobalState, LoadingState>(
    (state) => state.tmdbData.movieDetailsLoading
  );

  const displayCast = () =>
    movieDetails.credits.cast.slice(0, 10).map((member: any, i: number) => (
      <ListItem disableGutters key={i}>
        <ListItemAvatar>
          <Avatar
            alt={member.name}
            src={
              member.profile_path ? baseUrl + member.profile_path : undefined
            }
          />
        </ListItemAvatar>
        <ListItemText primary={member.name + " (" + member.character + ")"} />
      </ListItem>
    ));

  const addRemoveMoviesIconButtonClick = () => {
    if (inUserList) {
      dispatch(deleteMovie(username, movieDetails.id));
      dispatch(
        openSnackBar(
          movie.title + " removed from MyMovies",
          SnackBarActionType.MYMOVIES
        )
      );
      dispatch(setMovieButtons(false, inBlackList));
    } else {
      dispatch(putMovie(username, movieDetails.id));
      dispatch(
        openSnackBar(
          movie.title + " added to MyMovies",
          SnackBarActionType.MYMOVIES
        )
      );
      dispatch(setMovieButtons(true, inBlackList));
    }
  };

  const blacklistIconButtonClick = () => {
    if (inBlackList) {
      dispatch(deleteBlackListMovie(username, movie.id));
      dispatch(
        openSnackBar(
          movie.title + " removed from blacklist",
          SnackBarActionType.BLACKLIST
        )
      );
      dispatch(setMovieButtons(inUserList, false));
    } else {
      dispatch(putBlackListMovie(username, movie.id));
      dispatch(
        openSnackBar(
          movie.title + " added to blacklist",
          SnackBarActionType.BLACKLIST
        )
      );
      dispatch(setMovieButtons(inUserList, true));
    }
  };

  const onClose = () => {
    dispatch(closeMovieDetail());
  };

  return (
    <Dialog
      fullScreen
      open={movieDetailsOpen}
      onClose={onClose}
      TransitionComponent={Transition}
      transitionDuration={500}
      className={classes.dialog}
    >
      <Paper
        elevation={3}
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 5000,
        }}
        square
      >
        <Toolbar>
          <IconButton edge="start" onClick={onClose}>
            <CloseIcon />
          </IconButton>
          {!inUserList && (
            <BlacklistMovieIcon
              inBlacklist={inBlackList!}
              isLoggedIn={isLoggedIn}
              onClick={blacklistIconButtonClick}
            />
          )}
          {!inBlackList && (
            <AddRemoveMoviesIconButton
              inUserList={inUserList}
              isLoggedIn={isLoggedIn}
              onClick={addRemoveMoviesIconButtonClick}
            />
          )}
        </Toolbar>
      </Paper>
      {movieDetailsLoading === LoadingState.LOADING ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Loading movie details
          </Typography>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={0} className={classes.root}>
          {/* movie poster */}
          <Grid
            className={classes.poster}
            item
            xs={4}
            style={{
              marginLeft: "0%",
            }}
          >
            <img
              style={{ maxWidth: "95%" }}
              src={
                movieDetails &&
                (movieDetails.poster_path
                  ? baseUrl + movieDetails.poster_path
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png")
              }
              alt="movie poster"
            />
          </Grid>
          {/* movie description, rating, and title */}
          <Grid
            className={classes.paper}
            item
            xs={5}
            style={{ marginRight: 0 }}
          >
            <br />
            <Grid className={classes.descriptionHeader}>
              <Typography variant="h3">
                {movieDetails && movieDetails.title}
              </Typography>
            </Grid>
            <br />
            {isLoggedIn && inUserList && !inBlackList && (
              <RatingButtons
                movie={movie}
                userRating={userRating}
                displayWords={true}
              />
            )}
            <br />
            <Typography variant="body1">
              {movieDetails && movieDetails.overview}
            </Typography>
            <br />
            <Typography variant="body1">
              {movieDetails && "Release Date: " + movieDetails.release_date}
            </Typography>
            <br />
            <Typography variant="h6">
              {movieDetails && movieDetails.credits && "The Cast"}
            </Typography>
            {movieDetails && movieDetails.credits && (
              <GridList cols={1} cellHeight={45} spacing={1}>
                {displayCast()}
              </GridList>
            )}
          </Grid>
          {/* movie prices */}
          <Grid className={classes.prices} item xs={3}>
            <Typography variant="h6" style={{ marginLeft: 5, marginTop: "5%" }}>
              Where to watch
            </Typography>
            <Prices />
            <Typography variant="h6" style={{ marginLeft: 5, marginTop: 10 }}>
              Related Movies
            </Typography>
            <RelatedMovies tmdb_id={tmdb_id} />
          </Grid>
        </Grid>
      )}
    </Dialog>
  );
}

export default MovieDetails;

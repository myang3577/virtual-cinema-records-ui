import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteBlackListMovie,
  putBlackListMovie,
} from "../actions/blacklistAction";
import { openMovieDetail } from "../actions/movieDetailsActions";
import { deleteMovie, putMovie } from "../actions/movieListActions";
import { getMovieDetails } from "../actions/tmdbActions";
import { openSnackBar, SnackBarActionType } from "../actions/uiActions";
import AddRemoveMoviesIconButton from "../components/AddRemoveMoviesIconButton";
import BlacklistMovieIcon from "../components/BlacklistMovieIcon";
import { PageType } from "../constants/General";
import { GlobalState } from "../reducers/rootReducer";
import RatingButtons from "./RatingButtons";

export interface MovieCardProps {
  movie: any;
  inUserList: boolean;
  inBlackList: boolean;
  page: PageType;
}

function MovieCard(props: MovieCardProps) {
  const baseUrl = useSelector<GlobalState, string>(
    (state) => state.uiData.tmdbBaseUrl
  );

  const isLoggedIn = useSelector<GlobalState, boolean>(
    (state) => state.loginData.isLoggedIn
  );

  const username = useSelector<GlobalState, string>(
    (state) => state.loginData.username
  );

  const movieDetailsOpen = useSelector<GlobalState, boolean>(
    (state) => state.movieDetailData.movieDetailsOpen
  );

  const userRating = useSelector<GlobalState, number>((state) => {
    const userMovieIDList = state.myMoviesData.movieIDList;
    const userMovieIDElement = userMovieIDList.find(
      (e) => e.tmdb_id === props.movie.id
    );
    if (userMovieIDElement) {
      const userRating = userMovieIDElement.rating;
      return userRating ? userRating : 0;
    }
    return 0;
  });

  const dispatch = useDispatch();

  const addRemoveIconButtonClick = () => {
    if (props.inUserList) {
      dispatch(deleteMovie(username, props.movie.id));
      dispatch(
        openSnackBar(
          props.movie.title + " removed from MyMovies",
          SnackBarActionType.MYMOVIES
        )
      );
    } else {
      dispatch(putMovie(username, props.movie.id));
      dispatch(
        openSnackBar(
          props.movie.title + " added to MyMovies",
          SnackBarActionType.MYMOVIES
        )
      );
    }
  };

  const blacklistIconButtonClick = () => {
    if (props.inBlackList) {
      dispatch(deleteBlackListMovie(username, props.movie.id));
      dispatch(
        openSnackBar(
          props.movie.title + " removed from blacklist",
          SnackBarActionType.BLACKLIST
        )
      );
    } else {
      dispatch(putBlackListMovie(username, props.movie.id));
      dispatch(
        openSnackBar(
          props.movie.title + " added to blacklist",
          SnackBarActionType.BLACKLIST
        )
      );
    }
  };

  const openMovieDetailDrawer = () => {
    dispatch(
      openMovieDetail(
        props.movie,
        props.movie.id,
        true,
        props.inUserList,
        props.inBlackList,
        userRating
      )
    );
    dispatch(getMovieDetails(props.movie.id));
  };

  return (
    <div>
      <Card elevation={3} style={{ margin: "5px", minWidth: 275 }}>
        <CardHeader
          titleTypographyProps={{
            variant: "subtitle1",
            display: "inline",
          }}
          title={<Typography>{props.movie.title}</Typography>}
          subheader={
            props.movie.release_data ? props.movie.release_date.slice(0, 4) : ""
          }
          subheaderTypographyProps={{
            variant: "subtitle2",
            display: "inline",
          }}
          action={
            props.page === PageType.BLACKLIST ? (
              <BlacklistMovieIcon
                inBlacklist={props.inBlackList!}
                isLoggedIn={isLoggedIn}
                onClick={blacklistIconButtonClick}
              />
            ) : props.page === PageType.RECOMMENDATIONS ? (
              <div>
                <BlacklistMovieIcon
                  inBlacklist={props.inBlackList!}
                  isLoggedIn={isLoggedIn}
                  onClick={blacklistIconButtonClick}
                />
                <AddRemoveMoviesIconButton
                  inUserList={props.inUserList}
                  isLoggedIn={isLoggedIn}
                  onClick={addRemoveIconButtonClick}
                />
              </div>
            ) : (
              <AddRemoveMoviesIconButton
                inUserList={props.inUserList}
                isLoggedIn={isLoggedIn}
                onClick={addRemoveIconButtonClick}
              />
            )
          }
        />
        {props.page === PageType.MY_MOVIES && !movieDetailsOpen && (
          <CardContent>
            <RatingButtons
              movie={props.movie}
              userRating={userRating}
              displayWords={true}
            />
          </CardContent>
        )}
        <CardActionArea onClick={openMovieDetailDrawer}>
          <CardMedia
            component="img"
            image={
              props.movie.poster_path
                ? baseUrl + props.movie.poster_path
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"
            }
          />
        </CardActionArea>
      </Card>
    </div>
  );
}

export default MovieCard;

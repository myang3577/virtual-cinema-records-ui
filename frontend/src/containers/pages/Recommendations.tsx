import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GlobalState } from "../../reducers/rootReducer";
import MovieGrid from "../../components/MovieGrid";
import { Typography, IconButton, Slide } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import { LoadingState } from "../../reducers/tmdbReducer";
import { listMovies } from "../../actions/movieListActions";
import {
  getMovieRecommendation,
  getActorRecommendation,
  getGenreRecommendation,
} from "../../actions/recommendationActions";
import { PageType } from "../../Constants";
import { RecommendationListObject } from "../../reducers/recommendationReducer";

const isEmpty = (object: {}) => Object.keys(object).length === 0;

function Recommendations() {
  const dispatch = useDispatch();

  // This is movie recommendations that need to be rendered to the user on the
  // gridlist
  const movieRecommendationResult = useSelector<
    GlobalState,
    RecommendationListObject
  >((state) => state.recommendationData.movieRecommendationList);

  // This is actor recommendations that need to be rendered to the user on the
  // gridlist
  const actorRecommendationResult = useSelector<
    GlobalState,
    RecommendationListObject
  >((state) => state.recommendationData.actorRecommendationList);

  // This is genre recommendations that need to be rendered to the user on the
  // gridlist
  const genreRecommendationResult = useSelector<
    GlobalState,
    RecommendationListObject
  >((state) => state.recommendationData.genreRecommendationList);

  // This just gets the user's movie list. It is not for rendering purposes.
  // Instead, it is used to indicate if a movie has been added or not
  const userMyMoviesList = useSelector<GlobalState, []>(
    (state) => state.movieListData.movieDataList
  );

  const movieDataLoading = useSelector<GlobalState, LoadingState>(
    (state) => state.tmdbData.loading
  );
  const isLoggedIn = useSelector<GlobalState, boolean>(
    (state) => state.loginData.isLoggedIn
  );
  const username = useSelector<GlobalState, string>(
    (state) => state.loginData.username
  );

  useEffect(() => {
    if (isLoggedIn && username !== "") {
      dispatch(listMovies(username));
      if (isEmpty(movieRecommendationResult)) {
        dispatch(getMovieRecommendation(username));
      }
      if (isEmpty(actorRecommendationResult)) {
        dispatch(getActorRecommendation(username));
      }
      if (isEmpty(genreRecommendationResult)) {
        dispatch(getGenreRecommendation(username));
      }
    }
    // eslint-disable-next-line
  }, [dispatch, username, isLoggedIn]);

  // Note: This is NOT what is defined as refresh in the use case document.
  // Currently this code is written to NOT get a new set of recommendations
  // every time the page is reloaded. Instead, just use the one from the store.
  // This refresh is only useful when the user updates or adds a movie/ranking.
  // then the refresh may generate a new list. Once again, THIS IS NOT REFRESH
  // RECOMMENDATIONS.
  const refreshRecommendations = (): void => {
    dispatch(getMovieRecommendation(username));
    dispatch(getActorRecommendation(username));
    dispatch(getGenreRecommendation(username));
  };

  useEffect(() => {
    if (isLoggedIn) refreshRecommendations();
    // eslint-disable-next-line
  }, [isLoggedIn, userMyMoviesList]);

  const renderMovieRecommendation = (recommendationResult: any): any[] => {
    if (movieDataLoading !== LoadingState.LOADING && recommendationResult) {
      return Object.keys(recommendationResult).map(
        (keyName: any, keyIndex: number) => {
          return (
            <div key={keyIndex}>
              <h2>Because you liked {keyName}</h2>
              <MovieGrid
                displayMovieList={recommendationResult[keyName]}
                loading={movieDataLoading}
                userMyMoviesList={userMyMoviesList}
                page={PageType.HOME}
              />
            </div>
          );
        }
      );
    } else {
      return [];
    }
  };

  return (
    <Slide in={true} timeout={500} direction="up">
      <div className="page-container">
        <Typography variant="h4" gutterBottom>
          Recommendations
          <IconButton onClick={refreshRecommendations} size="small">
            <RefreshIcon />
          </IconButton>
        </Typography>
        {/* <SearchBar /> */}
        {isLoggedIn &&
          isEmpty(movieRecommendationResult) &&
          isEmpty(actorRecommendationResult) &&
          isEmpty(genreRecommendationResult) && (
            <Typography variant="h5" gutterBottom>
              Rate more movies to get recommendations.
            </Typography>
          )}

        {renderMovieRecommendation(movieRecommendationResult)}
        {renderMovieRecommendation(actorRecommendationResult)}
        {renderMovieRecommendation(genreRecommendationResult)}
      </div>
    </Slide>
  );
}

export default Recommendations;

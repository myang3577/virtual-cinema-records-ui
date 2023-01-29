import { combineReducers } from "redux";

import { blacklistReducer, BlacklistState } from "./blacklistReducer";
import { loginReducer, LoginState } from "./loginReducer";
import { movieDetailReducer, MovieDetailState } from "./movieDetailReducer";
import { movieListReducer, MovieListState } from "./movieListReducer";
import {
  recommendationReducer,
  RecommendationState,
} from "./recommendationReducer";
import { tmdbReducer, TMDBState } from "./tmdbReducer";
import { uiReducer, UIState } from "./uiReducer";
import { userInfoReducer, UserInfoState } from "./userReducer";

export interface GlobalState {
  tmdbData: TMDBState;
  loginData: LoginState;
  myMoviesData: MovieListState;
  userInfo: UserInfoState;
  uiData: UIState;
  recommendationData: RecommendationState;
  blacklistData: BlacklistState;
  movieDetailData: MovieDetailState;
}

// combineReducers just takes multiple reducers and puts them all into one big
// reducer. We write reducers in different places because it's clearer to
// separate them. This also means never write the exact same case for two
// reducers because the behavior will be unexpected
const rootReducer = combineReducers<GlobalState>({
  tmdbData: tmdbReducer,
  loginData: loginReducer,
  myMoviesData: movieListReducer,
  userInfo: userInfoReducer,
  uiData: uiReducer,
  recommendationData: recommendationReducer,
  blacklistData: blacklistReducer,
  movieDetailData: movieDetailReducer,
});

export default rootReducer;

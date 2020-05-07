import React from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "../reducers/rootReducer";
import MovieGrid from "../components/MovieGrid";
import { Typography } from "@material-ui/core";
import SearchBar from "./SearchBar";
import { LoadingState } from "../reducers/otherReducer";

function Home() {
  const movieSearchResult: any = useSelector<GlobalState>(
    (state) => state.otherData.movieSearchResult
  );

  const movieDataLoading: any = useSelector<GlobalState, LoadingState>(
    (state) => state.otherData.loading
  );

  return (
    <div className="page-container">
      <Typography variant="h4" gutterBottom>
        Home
      </Typography>
      <SearchBar />
      <MovieGrid
        movieList={movieSearchResult.results}
        loading={movieDataLoading}
      />
    </div>
  );
}

export default Home;

import React from "react";
import { GridList, GridListTile } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import MovieCards from "./MovieCards";
import { LoadingState } from "../reducers/tmdbReducer";

interface MovieGridProps {
  movieList: [];
  loading: LoadingState;
}

function MovieGrid(props: MovieGridProps) {
  const gridItemStyle = {
    height: "auto",
  };

  const gridStyle = {
    display: "flex",
    justifyContent: "flex-start",
  };

  return (
    <div className="movie-grid">
      <GridList cols={6} style={gridStyle}>
        {props.loading !== LoadingState.LOADING && props.movieList
          ? props.movieList.map((e: any, i: number) => (
              <GridListTile key={i} cols={1} style={gridItemStyle}>
                <MovieCards movie={e} />
              </GridListTile>
            ))
          : [...Array(18).keys()].map((e, i) => (
              <GridListTile key={i} cols={1} style={gridItemStyle}>
                <Skeleton
                  variant="text"
                  animation={props.loading === LoadingState.DONE && "wave"}
                  height={80}
                />
                <Skeleton
                  variant="rect"
                  animation={props.loading === LoadingState.DONE && "wave"}
                  height={450}
                />
              </GridListTile>
            ))}
      </GridList>
    </div>
  );
}

export default MovieGrid;

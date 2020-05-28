import React from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "../reducers/rootReducer";
import {
  GridList,
  GridListTile,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";

interface RelatedMoviesProps {
  tmdb_id: number;
}

function RelatedMovies(props: RelatedMoviesProps) {
  const relatedMovies = useSelector<GlobalState, any>((state) =>
    state.tmdbData.movieDetails[props.tmdb_id]
      ? state.tmdbData.movieDetails[props.tmdb_id].similar.results
      : undefined
  );

  const baseUrl = useSelector<GlobalState, string>(
    (state) => state.uiData.tmdbBaseUrl
  );

  const displayRelatedMovies = () => {
    return (
      relatedMovies &&
      relatedMovies.slice(0, 8).map((movie: any, i: number) => (
        <GridListTile key={i}>
          <Card elevation={3} style={{ margin: "3px" }}>
            <CardActionArea
              style={{
                backgroundImage: "url(" + baseUrl + movie.backdrop_path + ")",
                backgroundSize: "cover",
              }}
            >
              <CardContent>
                <Typography
                  style={{
                    display: "inline-block",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    textShadow:
                      "0px 0px 8px rgba(0, 0, 0, 1),0px 0px 8px rgba(0, 0, 0, 1),0px 0px 8px rgba(0, 0, 0, 1),0px 0px 8px rgba(0, 0, 0, 1),0px 0px 8px rgba(0, 0, 0, 1),0px 0px 8px rgba(0, 0, 0, 1)",
                    color: "white",
                  }}
                >
                  {movie.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </GridListTile>
      ))
    );
  };

  return relatedMovies ? (
    <GridList cellHeight={"auto"} cols={2}>
      {displayRelatedMovies()}
    </GridList>
  ) : null;
}

export default RelatedMovies;

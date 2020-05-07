import React from "react";
import { Card, CardHeader, CardMedia } from "@material-ui/core";

// Material UI coode will be copy pasted in here and customized
export interface MovieCardProps {
  movie: any;
}

function MovieCards(props: MovieCardProps) {
  var baseUrl = "https://image.tmdb.org/t/p/w500/";

  const cardTitle = () => {
    var title = props.movie.title;

    if (props.movie.release_date) {
      title += " (" + props.movie.release_date.slice(0, 4) + ")";
    }
    if (props.movie.id) {
      title += " [" + props.movie.id + "]";
    }

    return title;
  };

  return (
    <Card>
      <CardHeader
        titleTypographyProps={{ variant: "body2" }}
        title={cardTitle()}
      />
      <CardMedia
        component="img"
        image={
          props.movie.poster_path
            ? baseUrl + props.movie.poster_path
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"
        }
        style={{ height: "auto", width: "100%" }}
      />
    </Card>
  );
}

export default MovieCards;

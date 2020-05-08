import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
} from "@material-ui/core";
import { RatingButtons, RatingType } from "../containers/RatingButtons";
import { Add, Delete } from "@material-ui/icons";
import { PageType } from "../containers/pages/Constants";

export interface MovieCardProps {
  movie: any;
  inUserList: boolean;
  page: PageType;
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
    <Card elevation={3} style={{ margin: "5px" }}>
      <CardHeader
        titleTypographyProps={{ variant: "subtitle1" }}
        title={cardTitle()}
        action={
          <IconButton size="medium">
            {props.inUserList ? <Delete /> : <Add />}
          </IconButton>
        }
      />
      <CardContent>
        {props.page === PageType.MY_MOVIES && (
          <RatingButtons movie_id={props.movie.id} rating={RatingType.TWO} />
        )}
      </CardContent>
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

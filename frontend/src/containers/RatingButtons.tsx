import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../reducers/rootReducer";
import { putRating } from "../actions/movieListActions";

export interface RatingButtonsProps {
  movie: any;
  userRating: number;
}

function RatingButtons(props: RatingButtonsProps) {
  const dispatch = useDispatch();

  const username = useSelector<GlobalState, string>(
    (state) => state.loginData.username
  );

  const [rating, setRating] = useState(props.userRating ? props.userRating : 0);
  const [displayRating, setDisplayRating] = useState(0);

  const onRatingChange = (e: React.ChangeEvent<{}>, value: number) => {
    setRating(value);
    dispatch(putRating(username, props.movie.id, value));
  };

  return (
    <div>
      <Typography variant="body1">
        Your rating: {displayRating > 0 ? displayRating : rating}
      </Typography>
      <Rating
        name={props.movie.id + "-rating"}
        precision={0.5}
        max={5}
        onChange={(e, value) => onRatingChange(e, value!)}
        onChangeActive={(e, value) => setDisplayRating(value!)}
        value={rating}
      />
    </div>
  );
}

export default RatingButtons;

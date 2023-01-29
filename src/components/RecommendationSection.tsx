import { Collapse, Fade, IconButton, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import React, { useState } from "react";

import { MovieListElement } from "../actions/userInfoActions";
import { PageType } from "../constants/General";
import { LoadingState } from "../reducers/tmdbReducer";
import MovieGrid from "./MovieGrid";

export interface RecommendationSectionProps {
  header: string;
  displayMovieList: [];
  loading: LoadingState;
  userMyMoviesList: any[];
  userBlackList: any[];
  userMovieIDList: MovieListElement[];
  page: PageType;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  })
);

function RecommendationSection(props: RecommendationSectionProps) {
  const classes = useStyles();

  const [showingGrid, setShowingGrid] = useState<boolean>(true);

  return (
    <Fade in={true} timeout={1000}>
      <div>
        <div className="recommendation-section-header">
          <Typography variant="h5" gutterBottom>
            {props.header}
          </Typography>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: showingGrid,
            })}
            onClick={() => setShowingGrid(!showingGrid)}
            aria-expanded={showingGrid}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>

        <Collapse in={showingGrid} timeout={500}>
          <MovieGrid
            displayMovieList={props.displayMovieList}
            loading={props.loading}
            userMyMoviesList={props.userMyMoviesList}
            userBlackList={props.userBlackList}
            userMovieIDList={props.userMovieIDList}
            page={props.page}
          />
        </Collapse>
      </div>
    </Fade>
  );
}

export default RecommendationSection;

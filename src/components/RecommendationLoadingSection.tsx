import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";

interface RecommendationLoadingSectionProps {
  loadingText: string;
}

function RecommendationLoadingSection(
  props: RecommendationLoadingSectionProps
) {
  return (
    <div className="loading-container">
      <Typography variant="h6" gutterBottom>
        {props.loadingText}
      </Typography>
      <CircularProgress className="center" />
    </div>
  );
}

export default RecommendationLoadingSection;

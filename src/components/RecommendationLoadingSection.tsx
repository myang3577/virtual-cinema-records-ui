import React from "react";
import { Typography, CircularProgress } from "@material-ui/core";

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

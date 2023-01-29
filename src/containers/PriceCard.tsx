import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";

export interface PriceCardProps {
  streamingPrice: number;
  streamingBG: string;
}

function PriceCard(props: PriceCardProps) {
  return (
    <Card
      style={{
        margin: "3px",
      }}
      elevation={3}
    >
      <CardActionArea
        style={{
          backgroundImage: "url(" + props.streamingBG + ")",
          backgroundSize: "cover",
          // backgroundColor: "#2F2F2F",
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
            {"$" + props.streamingPrice}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PriceCard;

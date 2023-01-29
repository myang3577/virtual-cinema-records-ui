import { GridList, GridListTile } from "@material-ui/core";
import React from "react";

import amazonlogo from "../images/amazonlogo.jpg";
import applelogo from "../images/applelogo.jpeg";
import disneypluslogo from "../images/disneypluslogo.jpeg";
import hululogo from "../images/hululogo.jpeg";
import netflixlogo from "../images/netflixlogo.jpeg";
import youtubelogo from "../images/youtubelogo.jpeg";
import PriceCard from "./PriceCard";

function Prices() {
  const displayPrices = () => {
    const sites = streamingSites();
    return sites.map((s: any, i: number) => (
      <GridListTile key={i}>
        <PriceCard streamingBG={s.siteBG} streamingPrice={s.sitePrice} />
      </GridListTile>
    ));
  };

  const streamingSites = () => {
    return [
      { siteTitle: "Netflix", sitePrice: 9.99, siteBG: netflixlogo },
      { siteTitle: "Hulu", sitePrice: 9.99, siteBG: hululogo },
      { siteTitle: "Disney+", sitePrice: 14.99, siteBG: disneypluslogo },
      { siteTitle: "YouTube", sitePrice: 14.99, siteBG: youtubelogo },
      { siteTitle: "Apple", sitePrice: 15.99, siteBG: applelogo },
      { siteTitle: "Prime Video", sitePrice: 8.99, siteBG: amazonlogo },
    ];
  };

  return (
    <GridList cellHeight={"auto"} cols={2}>
      {displayPrices()}
    </GridList>
  );
}

export default Prices;

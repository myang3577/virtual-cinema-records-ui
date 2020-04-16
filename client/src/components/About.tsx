import React from "react";
import { useSelector } from "react-redux";
import { InitialState } from "../reducers/otherReducer";
import "./App.css";

function About() {
  const movieSearchResult: any = useSelector<any>(
    (state) => state.otherReducer.movieSearchResult
  );

  return (
    <div>
      {movieSearchResult.results
        ? movieSearchResult.results.map((e: any, index: number) => (
            <div key={index}>{e.title + ": " + e.vote_average}</div>
          ))
        : "no movie search data"}
    </div>
  );
}

export default About;

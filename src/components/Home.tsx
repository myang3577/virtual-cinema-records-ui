import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchMovies } from "../actions/actions";
import { InitialState, LoadingState } from "../reducers/otherReducer";
import "./App.css";

function Home() {
  const [count, setCount] = useState(0);
  const [movieQuery, setMovieQuery] = useState("");

  const movieSearchResult: any = useSelector<InitialState>(
    (state) => state.movieSearchResult
  );
  const loading: LoadingState = useSelector<InitialState>(
    (state) => state.loading
  ) as LoadingState;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(searchMovies("avengers"));
  // }, [dispatch]);

  // useEffect(() => {
  //   console.log("movieSearchResult");
  //   console.log(movieSearchResult);
  // }, [movieSearchResult]);

  return (
    <div>
      Count: {count}
      <br />
      <button onClick={() => setCount(count + 1)}>+1</button>
      <br />
      <input
        value={movieQuery}
        onChange={(e) => setMovieQuery(e.target.value)}
      ></input>
      &nbsp;
      <button
        onClick={() => {
          dispatch(searchMovies(movieQuery));
        }}
      >
        {loading === LoadingState.LOADING ? "Loading" : "Search Movies asd"}
      </button>
      {movieSearchResult.results
        ? movieSearchResult.results.map((e: any, index: number) => (
            <div key={index}>{e.title}</div>
          ))
        : ""}
    </div>
  );
}

export default Home;

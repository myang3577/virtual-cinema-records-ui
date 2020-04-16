import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchMovies } from "../actions/actions";
import { InitialState, LoadingState } from "../reducers/otherReducer";
import "./App.css";

/**
 * Home is a component that we want to render. It has been implemented with
 * react hooks here instead of a react class
 */
function Home() {
  // This is the same as creating a state field called count and tying
  // a setter called setCount to it. useState(0) means the initial state is 0
  const [count, setCount] = useState(0);

  // Same as above but for the movie query
  const [movieQuery, setMovieQuery] = useState("");

  // Define two local variables that represent the movieSearchREsult and
  // loading. The local variables defined here should be the ones you intend to
  // use in rendering the component. the userSelector is the magic function that
  // binds the local variable to a particular state. By binding them to that
  // state, this variable will be updated anytime the state its bound to changes
  const movieSearchResult: any = useSelector<any>(
    (state) => state.otherReducer.movieSearchResult
  );
  const loading: LoadingState = useSelector<any>(
    (state) => state.otherReducer.loading
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
      {/* This is thunk specific. Use it as it. Always call dispatch on the async api call */}
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

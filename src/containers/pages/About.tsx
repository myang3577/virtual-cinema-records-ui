import React, { useEffect } from "react";

import { getUserInfo, setPreferencesFlag } from "../../actions/userInfoActions";
import LoadingButton from "../../components/LoadingButton";
import { useAppDispatch, useAppSelector } from "../../store";

function About() {
  const movieSearchResult: any = useAppSelector(
    (state) => state.tmdbData.movieSearchResult
  );

  const userData: any = useAppSelector((state) => state.userInfo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div>
      <LoadingButton
        onClick={() => {
          dispatch(getUserInfo("test@test.test"));
        }}
        loading={false}
      >
        Get User Info
      </LoadingButton>

      <LoadingButton
        onClick={() => {
          dispatch(setPreferencesFlag("test@test.test", false));
        }}
        loading={false}
      >
        Put Flag
      </LoadingButton>
      {movieSearchResult.results
        ? movieSearchResult.results.map((e: any, index: number) => (
            <div key={index}>{e.title + ": " + e.vote_average}</div>
          ))
        : "no movie search data"}
    </div>
  );
}

export default About;

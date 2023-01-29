import {
  MovieResultElement,
  hideMovie,
  unhideMovie,
} from "./recommendationActions";

export enum BlacklistActionType {
  BLACKLIST_BEGIN = "BLACKLIST_BEGIN",
  GET_BLACKLIST_END = "GET_BLACKLIST_END",
}

export interface BlacklistAction {
  type: BlacklistActionType;
  payload: {
    blacklist?: [];
  };
}

export const blacklistBegin = (): BlacklistAction => {
  return {
    type: BlacklistActionType.BLACKLIST_BEGIN,
    payload: {},
  };
};

export const getBlacklistEnd = (payload: any): BlacklistAction => {
  return {
    type: BlacklistActionType.GET_BLACKLIST_END,
    payload: {
      blacklist: payload,
    },
  };
};

export const getBlacklist = (email: string) => {
  return (dispatch: any) => {
    dispatch(blacklistBegin());
    return fetch("/users/" + email + "/movie-blacklist")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Error occurred, status: " + response.status);
        }
      })
      .then((json: MovieResultElement[]) => {
        dispatch(getBlacklistEnd(json));
      })
      .catch((error) => {
        console.log("An error occurred.", error);
      });
  };
};

export const putBlackListMovie = (email: string, tmdb_id: number) => {
  return (dispatch: any) => {
    dispatch(blacklistBegin());
    return fetch("/users/" + email + "/blacklisted-movie", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tmdb_id }),
    })
      .then(() => {
        // get the new updated blacklist
        dispatch(getBlacklist(email));

        // Remove the movie from the recommendation
        dispatch(hideMovie(tmdb_id));
      })
      .catch((error) => {
        console.log("An error occurred on putting blacklist movie.", error);
      });
  };
};

export const deleteBlackListMovie = (email: string, tmdb_id: number) => {
  return (dispatch: any) => {
    dispatch(blacklistBegin());
    return fetch("/users/" + email + "/blacklisted-movie", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tmdb_id }),
    })
      .then(() => {
        // Get the new updated blacklist
        dispatch(getBlacklist(email));

        // Add back the movie from the recommendation
        dispatch(unhideMovie(tmdb_id));
      })
      .catch((error) => {
        console.log("An error occurred on deleting blacklist movie.", error);
      });
  };
};

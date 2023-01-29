export interface GenreItem {
  id: number;
  name: string;
}

export const genreMap: { [key: string]: { [key: string]: number } } = {
  Action: { id: 28 },
  Adventure: { id: 12 },
  Animation: { id: 16 },
  Comedy: { id: 35 },
  Crime: { id: 80 },
  Documentary: { id: 99 },
  Drama: { id: 18 },
  Family: { id: 10751 },
  Fantasy: { id: 14 },
  History: { id: 36 },
  Horror: { id: 27 },
  Music: { id: 10402 },
  Mystery: { id: 9648 },
  Romance: { id: 10749 },
  "Science Fiction": { id: 878 },
  "TV Movie": { id: 10770 },
  Thriller: { id: 53 },
  War: { id: 10752 },
  Western: { id: 37 },
};

// The number of general recommendations after filtering out everything from
// blacklist and MyMovies
export const NUM_GENERAL_RECOMMENDATIONS = 20;

// The number of pages to traverse to find movies that are not in the user list
export const MAX_PAGE_SEARCH_LIMIT = 10;

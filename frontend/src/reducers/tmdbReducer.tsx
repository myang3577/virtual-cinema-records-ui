import { TMDBAction, TMDBActionType } from "../actions/tmdbActions";

// Defines the possible loading states
export enum LoadingState {
  IDLE = "IDLE",
  LOADING = "LOADING",
  DONE = "DONE",
}

/**
 * Essentially a class definition. Defines what
 * fields are inside of the InitialState object.
 * In this case we have a variable called loading
 * of type LoadingState
 * There is another variable called movieSearchResult
 * that is of type object. {} means object type
 */
export interface TMDBState {
  loading: LoadingState;
  movieSearchResult: {};
}

/**
 * Define a variable called initialState that is of type
 * InitialState. We then define the loading state to be
 * LoadingState.IDLE
 * We also define the movieSearchResult field to be an empty
 * object
 *
 * Note that InitialState is an arbitrary name. One reducer will have one set of
 * attributes defined by this type that it can modify. So we could have
 * userDataInitialState, movieListInitialState etc. And each one would define
 * the attributes that the respective reducer will be able to modify. BUT NOTE
 * THAT STATE IS ALWAYS GLOBAL. JUST BECAUSE REDUCER 1 CAN MODIFY X AND REDUCER
 * 2 CAN MODIFY Y DOES NOT MEAN THAT X AND Y ARE STORED SEPARATELY. THAT WOULD
 * DEFEAT THE POINT OF REDUX. Accessing them just becomes state.reducer1.x and
 * state.reducer2.y. All components are still allowed to read the global state,
 * but only if you are a reducer with the set attribute can you modify the
 * state.
 */
const initialState: TMDBState = {
  loading: LoadingState.IDLE,
  movieSearchResult: {
    page: 1,
    total_results: 10000,
    total_pages: 500,
    results: [
      {
        popularity: 24.407,
        id: 707,
        video: false,
        vote_count: 1039,
        vote_average: 6.1,
        title: "A View to a Kill",
        release_date: "1985-05-24",
        original_language: "en",
        original_title: "A View to a Kill",
        genre_ids: [12, 28, 53],
        backdrop_path: "/hsczSIUHVMNdkzuQQQa49FMoUjP.jpg",
        adult: false,
        overview:
          "A newly developed microchip designed by Zorin Industries for the British Government that can survive the electromagnetic radiation caused by a nuclear explosion has landed in the hands of the KGB. James Bond must find out how and why. His suspicions soon lead him to big industry leader Max Zorin.",
        poster_path: "/xGeww44gdzUnBbPWpp0atj3aGBR.jpg",
      },
      {
        popularity: 54.577,
        vote_count: 36,
        video: false,
        poster_path: "/8xiV8j18GhWnnrfMGaDR0E5oOif.jpg",
        id: 530956,
        adult: false,
        backdrop_path: "/9XCnndiIzsWibZhxPoo8EV04fzr.jpg",
        original_language: "en",
        original_title: "All Day and a Night",
        genre_ids: [18],
        title: "All Day and a Night",
        vote_average: 6.3,
        overview:
          "While serving life in prison, a young man looks back at the people, the circumstances and the system that set him on the path toward his crime.",
        release_date: "2020-05-01",
      },
      {
        popularity: 27.888,
        vote_count: 5980,
        video: false,
        poster_path: "/kHgWI1AbYnYPZrUl5DCwzq9tyB2.jpg",
        id: 9487,
        adult: false,
        backdrop_path: "/s0eIBHJROgDWO3IoOt8FfQCFPGh.jpg",
        original_language: "en",
        original_title: "A Bug's Life",
        genre_ids: [12, 16, 35, 10751],
        title: "A Bug's Life",
        vote_average: 6.9,
        overview:
          'On behalf of "oppressed bugs everywhere," an inventive ant named Flik hires a troupe of warrior bugs to defend his bustling colony from a horde of freeloading grasshoppers led by the evil-minded Hopper.',
        release_date: "1998-11-25",
      },
      {
        popularity: 31.37,
        vote_count: 7974,
        video: false,
        poster_path: "/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",
        id: 447332,
        adult: false,
        backdrop_path: "/roYyPiQDQKmIKUEhO912693tSja.jpg",
        original_language: "en",
        original_title: "A Quiet Place",
        genre_ids: [18, 27, 878],
        title: "A Quiet Place",
        vote_average: 7.3,
        overview:
          "A family is forced to live in silence while hiding from creatures that hunt by sound.",
        release_date: "2018-04-03",
      },
      {
        popularity: 19.014,
        vote_count: 1204,
        video: false,
        poster_path: "/hkSGFNVfEEUXFCxRZDITFHVhUlu.jpg",
        id: 623,
        adult: false,
        backdrop_path: "/y8HaV1Ntr6nHmKxZ29B7DwxwvNU.jpg",
        original_language: "en",
        original_title: "A Fish Called Wanda",
        genre_ids: [35, 80],
        title: "A Fish Called Wanda",
        vote_average: 7.2,
        overview:
          "A diamond advocate is attempting to steal a collection of diamonds, yet troubles arise when he realizes that he is not the only one after the diamonds.",
        release_date: "1988-07-15",
      },
      {
        popularity: 27.207,
        vote_count: 205,
        video: false,
        poster_path: "/ifn7yLH7W69MdrEEkNzCyO8rTmL.jpg",
        id: 526019,
        adult: false,
        backdrop_path: "/wMv7GL12s0bJmfv3ckdglOCQ8B3.jpg",
        original_language: "en",
        original_title: "Like a Boss",
        genre_ids: [35],
        title: "Like a Boss",
        vote_average: 6.4,
        overview:
          "Two female friends with very different ideals decide to start a beauty company together. One is more practical, while the other wants to earn her fortune and live a lavish lifestyle.",
        release_date: "2020-01-09",
      },
      {
        popularity: 70.309,
        vote_count: 6112,
        video: false,
        poster_path: "/8j58iEBw9pOXFD2L0nt0ZXeHviB.jpg",
        id: 466272,
        adult: false,
        backdrop_path: "/er1S5nJyDSkmy7i2KkPMBjbwK8x.jpg",
        original_language: "en",
        original_title: "Once Upon a Time… in Hollywood",
        genre_ids: [35, 18, 53],
        title: "Once Upon a Time… in Hollywood",
        vote_average: 7.5,
        overview:
          "Los Angeles, 1969. TV star Rick Dalton, a struggling actor specializing in westerns, and stuntman Cliff Booth, his best friend, try to survive in a constantly changing movie industry. Dalton is the neighbor of the young and promising actress and model Sharon Tate, who has just married the prestigious Polish director Roman Polanski…",
        release_date: "2019-07-25",
      },
      {
        popularity: 25.327,
        vote_count: 8223,
        video: false,
        poster_path: "/4sHeTAp65WrSSuc05nRBKddhBxO.jpg",
        id: 185,
        adult: false,
        backdrop_path: "/qhlt4mZR68VG9C1Hlwlq10D8KHJ.jpg",
        original_language: "en",
        original_title: "A Clockwork Orange",
        genre_ids: [18, 878],
        title: "A Clockwork Orange",
        vote_average: 8.2,
        overview:
          "In a near-future Britain, young Alexander DeLarge and his pals get their kicks beating and raping anyone they please. When not destroying the lives of others, Alex swoons to the music of Beethoven. The state, eager to crack down on juvenile crime, gives an incarcerated Alex the option to undergo an invasive procedure that'll rob him of all personal agency. In a time when conscience is a commodity, can Alex change his tune?",
        release_date: "1971-12-18",
      },
      {
        popularity: 18.401,
        vote_count: 184,
        video: false,
        poster_path: "/oXCItRHMBDgCGuJMw2JhWJoNvi7.jpg",
        id: 21519,
        adult: false,
        backdrop_path: "/5w5hj9rLvbm0Gk1S1Y8RHHnwhbP.jpg",
        original_language: "cn",
        original_title: "A計劃",
        genre_ids: [28, 12, 35],
        title: "Project A",
        vote_average: 7.2,
        overview:
          "In late 19th Century Hong Kong the British may rule the land, but the pirates rule the waters. One Coast Guard officer is Dragon Ma, who is determined that his beloved Coast Guard will not be made a fool of.",
        release_date: "1983-12-22",
      },
      {
        popularity: 19.731,
        id: 438590,
        video: false,
        vote_count: 560,
        vote_average: 5.8,
        title: "A-X-L",
        release_date: "2018-08-23",
        original_language: "en",
        original_title: "A-X-L",
        genre_ids: [878, 28, 12, 10751],
        backdrop_path: "/l1nYo0yzKjf84atnBDbx0do16vQ.jpg",
        adult: false,
        overview:
          "The life of a teenage boy is forever altered by a chance encounter with cutting edge military technology.",
        poster_path: "/9kB56ZdMB6RgY5QtX9Bar45jCeI.jpg",
      },
      {
        popularity: 11.286,
        vote_count: 390,
        video: false,
        poster_path: "/dVkdtbm39DL1RPgDzmPrjg2IrJR.jpg",
        id: 13312,
        adult: false,
        backdrop_path: "/iumvooyF68waPmQUJ5gfxAurEWi.jpg",
        original_language: "fr",
        original_title: "À l'intérieur",
        genre_ids: [27],
        title: "Inside",
        vote_average: 6.8,
        overview:
          "Four months after the death of her husband, a woman on the brink of motherhood is tormented in her home by a strange woman who wants her unborn baby.",
        release_date: "2007-06-13",
      },
      {
        popularity: 16.836,
        vote_count: 409,
        video: false,
        poster_path: "/4pzN52wxBZ05EXBdoii1kqoIoD4.jpg",
        id: 522518,
        adult: false,
        backdrop_path: "/71hIkBtvXhvRVh6HdE28CXaNNRz.jpg",
        original_language: "en",
        original_title: "A Dog's Journey",
        genre_ids: [10751],
        title: "A Dog's Journey",
        vote_average: 7.9,
        overview:
          "A dog finds the meaning of his own existence through the lives of the humans he meets.",
        release_date: "2019-05-03",
      },
      {
        popularity: 16.979,
        vote_count: 1982,
        video: false,
        poster_path: "/3jcNvhtVQe5Neoffdic39fRactM.jpg",
        id: 381289,
        adult: false,
        backdrop_path: "/2ddVTlMyATZdvUHE7DPExA2X6xF.jpg",
        original_language: "en",
        original_title: "A Dog's Purpose",
        genre_ids: [12, 35, 18, 14, 10751],
        title: "A Dog's Purpose",
        vote_average: 7.4,
        overview:
          "A dog goes on quest to discover his purpose in life over the course of several lifetimes with multiple owners.",
        release_date: "2017-01-19",
      },
      {
        popularity: 42.817,
        vote_count: 5201,
        video: false,
        poster_path: "/4oD6VEccFkorEBTEDXtpLAaz0Rl.jpg",
        id: 348350,
        adult: false,
        backdrop_path: "/7LZ0K4FsALrt7OeNIGOVLNuKQRU.jpg",
        original_language: "en",
        original_title: "Solo: A Star Wars Story",
        genre_ids: [12, 878],
        title: "Solo: A Star Wars Story",
        vote_average: 6.6,
        overview:
          "Through a series of daring escapades deep within a dark and dangerous criminal underworld, Han Solo meets his mighty future copilot Chewbacca and encounters the notorious gambler Lando Calrissian.",
        release_date: "2018-05-15",
      },
      {
        popularity: 30.888,
        vote_count: 7109,
        video: false,
        poster_path: "/zmmYdPa8Lxx999Af9vnVP4XQ1V6.jpg",
        id: 62,
        adult: false,
        backdrop_path: "/spoZUN4X1KiOc5S0plOyGAXLNtb.jpg",
        original_language: "en",
        original_title: "2001: A Space Odyssey",
        genre_ids: [12, 9648, 878],
        title: "2001: A Space Odyssey",
        vote_average: 8.1,
        overview:
          "Humanity finds a mysterious object buried beneath the lunar surface and sets off to find its origins with the help of HAL 9000, the world's most advanced super computer.",
        release_date: "1968-04-09",
      },
      {
        popularity: 22.08,
        vote_count: 2570,
        video: false,
        poster_path: "/aIYsjQM0piKc0ibPBCTWv3sqshj.jpg",
        id: 484247,
        adult: false,
        backdrop_path: "/nb1s8r6MhDcPyMjx3sjw9rFsEP5.jpg",
        original_language: "en",
        original_title: "A Simple Favor",
        genre_ids: [35, 80],
        title: "A Simple Favor",
        vote_average: 6.6,
        overview:
          "Stephanie, a dedicated mother and popular vlogger, befriends Emily, a mysterious upper-class woman whose son Nicky attends the same school as Miles, Stephanie's son. When Emily asks her to pick Nicky up from school and then disappears, Stephanie undertakes an investigation that will dive deep into Emily's cloudy past.",
        release_date: "2018-08-29",
      },
      {
        popularity: 21.204,
        vote_count: 6578,
        video: false,
        poster_path: "/zwzWCmH72OSC9NA0ipoqw5Zjya8.jpg",
        id: 453,
        adult: false,
        backdrop_path: "/9PwUQZDHGPKsgbnoBl1Ah9zXWjk.jpg",
        original_language: "en",
        original_title: "A Beautiful Mind",
        genre_ids: [18, 10749],
        title: "A Beautiful Mind",
        vote_average: 7.8,
        overview:
          "John Nash is a brilliant but asocial mathematician fighting schizophrenia. After he accepts secret work in cryptography, his life takes a turn for the nightmarish.",
        release_date: "2001-12-11",
      },
      {
        popularity: 20.924,
        id: 258230,
        video: false,
        vote_count: 2231,
        vote_average: 7.2,
        title: "A Monster Calls",
        release_date: "2016-10-07",
        original_language: "en",
        original_title: "A Monster Calls",
        genre_ids: [18, 14],
        backdrop_path: "/sBtLpesSh0pniKHGWZjgyxmtIks.jpg",
        adult: false,
        overview:
          "A boy imagines a monster that helps him deal with his difficult life and see the world in a different way.",
        poster_path: "/eNTalDnE6AcFKghdvws2ckguYWC.jpg",
      },
      {
        popularity: 21.18,
        vote_count: 170,
        video: false,
        poster_path: "/1co8thSgZR34jHJweLS90yDyLsI.jpg",
        id: 403300,
        adult: false,
        backdrop_path: "/7OcLrFT8VkrMTUUwLQISJOwzz0n.jpg",
        original_language: "en",
        original_title: "A Hidden Life",
        genre_ids: [18, 36, 10752],
        title: "A Hidden Life",
        vote_average: 7.2,
        overview:
          "Austrian farmer Franz Jägerstätter faces the threat of execution for refusing to fight for the Nazis during World War II.",
        release_date: "2019-12-11",
      },
      {
        popularity: 28.895,
        vote_count: 7846,
        video: false,
        poster_path: "/xdANQijuNrJaw1HA61rDccME4Tm.jpg",
        id: 76203,
        adult: false,
        backdrop_path: "/4Bb1kMIfrT2tYRZ9M6Jhqy6gkeF.jpg",
        original_language: "en",
        original_title: "12 Years a Slave",
        genre_ids: [18, 36],
        title: "12 Years a Slave",
        vote_average: 8,
        overview:
          "In the pre-Civil War United States, Solomon Northup, a free black man from upstate New York, is abducted and sold into slavery. Facing cruelty as well as unexpected kindnesses Solomon struggles not only to stay alive, but to retain his dignity. In the twelfth year of his unforgettable odyssey, Solomon’s chance meeting with a Canadian abolitionist will forever alter his life.",
        release_date: "2013-10-18",
      },
    ],
  },
};

/**
 * Define the other reducer. Takes 2 parameters state and action.
 * Every reducer must take these two things. The job of the
 * reducer is supposed to be used to set the state within the
 * storej.
 * action: Action): InitialState=>
 * The InitialState means the return type needs to be InitialState
 * It is also worth mentioning here that state = initialState
 *
 * @param state all of the states currently in the store. The default state it
 *              is set to is the variable initialState. This means that
 *              all of the states/attributes that exist have already been
 *              defined inside of initialState
 *
 * @param action the action we want to perform on the states in the store
 */
export const tmdbReducer = (
  state = initialState,
  action: TMDBAction
): TMDBState => {
  // Check the action type and choose the appropriate action. Within each action
  // you set the states you want to set
  switch (action.type) {
    case TMDBActionType.SEARCH_MOVIES_BEGIN:
      // Function calling because sometimes the cases get a bit long.
      // In this case you are just passing on the state and action for the
      // fetch reducer to do the state setting.
      // Reducers always return back the state. The action of returning back the
      // state is what actually sets the state within the store
      return fetchBeginReducer(state, action);
    case TMDBActionType.SEARCH_MOVIES_END:
      // Another example of setting state. In this case it sets the
      // movieSearchResult and the loading state. Note that states are
      // overrided. That's what it means to set them

      console.log(action.payload);
      return {
        ...state,
        movieSearchResult: action.payload,
        loading: LoadingState.DONE,
      };
    default:
      return state;
  }
};

const fetchBeginReducer = (state: TMDBState, action: TMDBAction) => {
  // Reducers always return back the state. The action of returning back the
  // state is what actually sets the state within the store
  return {
    ...state,
    loading: LoadingState.LOADING,
  };
};

export default tmdbReducer;

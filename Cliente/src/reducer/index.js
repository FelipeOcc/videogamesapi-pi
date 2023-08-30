const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  detail: {},
  platforms: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };

    case "GET_VIDEOGAME_NAME":
      return {
        ...state,
        videogames: action.payload,
      };

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "POST_VIDEOGAME":
      return {
        ...state,
      };

    case "FILTER_BY_GENRE":
      const allGames = state.videogames;
      const genresFiltered =
        action.payload === "Todos"
          ? state.allVideogames
          : allGames.filter((genreFilter) => {
              return genreFilter.genres.find((genreFilter) => {
                return genreFilter.name === action.payload;
              });
            });
      return {
        ...state,
        videogames: genresFiltered,
      };

    case "FILTER_CREATED":
      const filterCreated =
        action.payload === "Creado"
          ? state.allVideogames.filter(
              (createFilter) => createFilter.createdInDb
            )
          : state.allVideogames.filter(
              (createFilter) => !createFilter.createdInDb
            );
      return {
        ...state,
        videogames:
          action.payload === "Todos" ? state.allVideogames : filterCreated,
      };

    case "ORDER_BY_NAME":
      let sortName =
        action.payload === "Ascendente"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortName,
      };

    case "ORDER_BY_RATING":
      let sortRating =
        action.payload === "Peor calificado"
          ? state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortRating,
      };

    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };

    case "GET_PLATFORMS":
      return {
        ...state,
        platforms: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;

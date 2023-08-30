import axios from "axios";

export function getVideogames() {
  // FRONT <-> BACK
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/api/videogame");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getVideogameName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/api/videogame?name=` + name
      );
      return dispatch({
        type: "GET_VIDEOGAME_NAME",
        payload: json.data, //Devolucion a la asignacion por 'name'
      });
    } catch (error) {
      alert("Juego no Encontrado");
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/api/genre");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    const info = await axios.get("http://localhost:3001/api/platforms");
    dispatch({
      type: "GET_PLATFORMS",
      payload: info.data,
    });
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/api/videogame",
      payload
    );
    return response;
  };
}

export function filterVideogamesByGenre(payload) {
  //*Value del Input*
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function filterCreated(payload) {
  // *DataBase*
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  // *Ascendente - Descendente*
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}

export function getDetails(id) {
  if (id) {
    return async function (dispatch) {
      try {
        const detail = await axios.get(
          `http://localhost:3001/api/videogame/${id}`
        );
        dispatch({
          type: "GET_DETAILS",
          payload: detail.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
  return {
    type: "RESET",
  };
}

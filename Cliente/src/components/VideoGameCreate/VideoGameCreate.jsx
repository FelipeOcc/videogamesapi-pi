import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postVideogame, getGenres } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "../VideoGameCreate/videoGameCreate.css";

function validate(input) {
  let errors = {};
  if (input.name.trim() === "") {
    errors.name = "Escribe un nombre";
  }
  if (input.description.trim() === "") {
    errors.description = "Escribe una descripción";
  }
  if (input.platforms.length === 0) {
    errors.platforms = "Selecciona una plataforma";
  }
  return errors;
}

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const genre = useSelector((state) => state.genres);
  const platform = useSelector((state) => state.platforms);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  }

  function handleSelectGenre(event) {
    setInput({
      ...input,
      genres: [...input.genres, event.target.value],
    });
  }

  function handleSelectPlatform(event) {
    setInput({
      ...input,
      platforms: [...input.platforms, event.target.value],
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validate(input) 
    if (Object.keys(errors).length === 0) {
      dispatch(postVideogame(input));
      alert("¡Haz creado un videojuego!");
      setInput({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
      });
    } else {
      alert("Error al crear un videojuego");
      return;
    }
  }

  function handleDeletePlatform(event) {
    setInput({
      ...input,
      platforms: input.platforms.filter((plataform) => plataform !== event),
    });
  }

  function handleDeleteGenre(event) {
    setInput({
      ...input, // Estado anterior
      genres: input.genres.filter((genre) => genre !== event),
    });
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <>
      <div className="home_container">
        <Link className="home" to="/home">
          Home
        </Link>
        <h1 className="crear">¡A crear!</h1>
        <form className="form" onSubmit={(event) => handleSubmit(event)}>
          <div>
            <input
              className="input"
              placeholder="Nombre del Videojuego"
              type="text"
              value={input.name}
              name="name"
              onChange={(event) => handleChange(event)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <input
              className="input"
              placeholder="Imagen"
              type="img"
              value={input.image}
              name="image"
              alt="not found"
              onChange={(event) => handleChange(event)}
            />
          </div>
          <div>
            <input
              className="input"
              placeholder="Descripción"
              type="text"
              value={input.description}
              name="description"
              onChange={(event) => handleChange(event)}
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
          <div className="released_container">
            <label className="released"> Fecha de Lanzamiento </label>
            <input
              className="released_input"
              type="date"
              value={input.released}
              name="released"
              onChange={(event) => handleChange(event)}
            />
            <label className="rating"> Calificación </label>

            <input
              className="rating_input"
              placeholder="0 a 5"
              type="number"
              value={input.rating}
              min={0}
              max={5}
              name="rating"
              onChange={(event) => handleChange(event)}
            />
          </div>
          <div className="genres_container">
            <label className="genres"> Género </label>
            <select
              className="genres_input"
              onChange={(event) => handleSelectGenre(event)}
            >
              {genre.map((genre) => (
                <option key={genre.name} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div className="platforms_container">
            <label className="platforms"> Plataforma </label>
            <select
              className="platforms_input"
              onChange={(event) => handleSelectPlatform(event)}
            >
              {platform.map((plataform) => (
                <option key={plataform.name} value={plataform.name}>
                  {plataform.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="create" type="submit">
              {" "}
              Crear{" "}
            </button>
          </div>
        </form>
        {input.genres.map((genre) => (
          <div className="x_genre_container">
            <label className="x_genre">{genre}</label>
            <button
              className="x_genre_buttom"
              onClick={() => handleDeleteGenre(genre)}
            >
              X
            </button>
          </div>
        ))}
        {input.platforms.map((platform) => (
          <div className="x_platform_container">
            <label className="x_platform">{platform}</label>
            <button
              className="x_platform_buttom"
              onClick={() => handleDeletePlatform(platform)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

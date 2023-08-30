import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  getGenres,
  filterVideogamesByGenre,
  filterCreated,
  orderByName,
  orderByRating,
  getPlatforms,
} from "../../actions/index";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Page from "../Page/Page";

import Navbar from "../NavBar/NavBar";
import "../Home/home.css";

export default function Home() {
  // Reemplazar al mapStateToProp.

  const dispatch = useDispatch(); // Trae del Reduce el estado de Videojuego.
  const allVideogames = useSelector((state) => state.videogames); // useSelector trae el estado de Videojuego y lo guarda en esa k.

  const [currentPage, setCurrentPage] = useState(1); // Estado Local 1, para que inicie en la 1ra pagina.
  const [videogamesPerPage] = useState(15); // Estado Local 15, para guardar n cantidad de juegos por pagina.
  const [order, setOrder] = useState(""); // Estado Local de la calificacion. Inicia vacio.

  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const page = (pageNumber) => {
    // Render
    setCurrentPage(pageNumber);
  };

  //  const allGenres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  // if(!allVideogames.length) {
  //     return <Loader/>;
  // }

  function handleClick(event) {
    event.preventDefault();
    dispatch(getVideogames());
  }

  function handleSort(event) {
    // Dispatch de la calificacion.
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1); // Direccion a la pagina 1.
    setOrder(event.target.value);
  }

  function handleFilterGenre(event) {
    event.preventDefault();
    dispatch(filterVideogamesByGenre(event.target.value));
    setCurrentPage(1);
    setOrder(event.target.value);
  }

  function handleFilterCreated(event) {
    event.preventDefault();
    dispatch(filterCreated(event.target.value));
    setCurrentPage(1);
    setOrder(event.target.value);
    console.log(order);
  }

  function handleRating(event) {
    event.preventDefault();
    dispatch(orderByRating(event.target.value));
    setCurrentPage(1);
    setOrder(event.target.value);
  }

  return (
    <div>
      <div className="create_container"></div>
      <Link className="button_create_videogame" to="/videogame">
        Crear Videojuego
      </Link>

      <div className="reload_container">
        <button
          className="button_reload"
          onClick={(event) => {
            handleClick(event);
          }}
        >
          Recargar
        </button>
      </div>

      <div>
        <Navbar
          handleSort={handleSort}
          handleRating={handleRating}
          handleFilterCreated={handleFilterCreated}
          handleFilterGenre={handleFilterGenre}
        />
      </div>

      <ul className="card_grid">
        {currentVideogames?.map((game) => {
          return (
            <Card
              id={game.id}
              name={game.name}
              image={game.image}
              genres={game.genres}
              key={game.id}
              rating={game.rating}
              platforms={game.platforms}
            />
          );
        })}
      </ul>

      <div className="pagination">
        <Page
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          page={page}
        />
      </div>
    </div>
  );
}

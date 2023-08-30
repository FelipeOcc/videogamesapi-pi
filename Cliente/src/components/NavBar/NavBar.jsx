import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import "../NavBar/navBar.css";

export default function Navbar({
  handleFilterGenre,
  handleFilterCreated,
  handleRating,
  handleSort,
}) {
  const allGenre = useSelector((state) => state.genres);

  return (
    <div>
      <div className="navbar_container">
        <SearchBar />
      </div>

      <div>
        <select className="select" onChange={(event) => handleSort(event)}>
          <option>Orden</option>
          <option value="Ascendente">A-Z</option>
          <option value="Descendente">Z-A</option>
        </select>

        <select className="select" onChange={(event) => handleRating(event)}>
          <option>Calificación</option>
          <option value="Mejor">Mejor Calificado</option>
          <option value="Peor">Peor Calificado</option>
        </select>

        <select
          className="select"
          onChange={(event) => handleFilterCreated(event)}
        >
          {/* <option>Juegos</option> */}
          <option value="Todos">Todos</option>
          <option value="Creados">Creados</option>
          <option value="Api">Existentes</option>
        </select>

        <select
          className="select"
          onChange={(event) => handleFilterGenre(event)}
        >
          <option>Géneros</option>
          <option value="Todos">Todos</option>

          {allGenre.map((genre) => (
            <option key={genre.name} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

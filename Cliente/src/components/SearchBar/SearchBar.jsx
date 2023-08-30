import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameName } from "../../actions";
import "../SearchBar/searchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(event) {
    event.preventDefault();
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.length) {
      alert("Ingresa un nombre de videojuego");
    } else {
      dispatch(getVideogameName(name));
      setName("");
    }
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="search_container">
        <input
          className="search"
          type="text"
          value={name}
          placeholder="Ingresa un nombre"
          onChange={(event) => handleInputChange(event)}
        />

        <button className="button_search" type="submit">
          Buscar
        </button>
      </div>
    </form>
  );
}

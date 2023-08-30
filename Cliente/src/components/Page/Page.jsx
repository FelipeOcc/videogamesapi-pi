import React from "react";
import "../Page/page.css";

export default function Page({ videogamesPerPage, allVideogames, page }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination_container">
      {pageNumbers &&
        pageNumbers.map((number) => (
          <a key={number} href onClick={() => page(number)}>
            {number}
          </a>
        ))}
    </div>
  );
}

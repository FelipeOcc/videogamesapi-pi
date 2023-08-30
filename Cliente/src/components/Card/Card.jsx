import React from 'react';
import { Link } from "react-router-dom";
import '../Card/card.css';


export default function Card ({name, image, genres, id, rating}) {
    let genre = genres.map((event) => event.name);

    return (
       
        <div>
            <li className='card_game'>
            <Link to={'/videogame/' + id}>
            <img className='card_image' src={image} alt='not found' />
            </Link>
            <div className='title_name'><h3>{name}</h3></div>
            <div className="title_genre"> Género: </div>
            <div className='genre'><h5>{genre.join('-')}</h5></div>
            <div className="title_rating"> Calificación: </div>
            <div className='rating'><h6>{rating}</h6></div>
            
            </li>
        </div>
        
    );
}

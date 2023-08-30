import React from "react";
import { Link, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDetails } from '../../actions/index';
import { useEffect } from "react";
import '../Details/details.css'


export default function Details(){
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getDetails(id));   
    },[id, dispatch]);

    const detail = useSelector((state) => state.detail);

    function handleReset() {
        dispatch(getDetails());
    }

    return (
        <div >
            <div className="button_container_detail">
            <Link  to={'/home'} onClick={handleReset}>
                <button className="button_detail"> Home </button>
                </Link>
          
                <div className="title_container_detail">
                <h1 className="title_detail"> Título: {detail.name}</h1>
                <img className="image_detail" src = {detail.background_image? detail.background_image: detail.image } alt='not found'/>
                <p className="released_detail"> Lanzamiento: {detail.released}</p>
                <p className="platforms_detail">
                    Plataformas:  
                    {detail.id?.length > 7 
                     ? detail.platforms?.map(platform => platform.name).join("-")
                     : detail.platforms?.map(platform => platform.platform.name).join("-")}
                </p>
                <p className="genres_detail"> Géneros: {detail.genres?.map(g => g.name).join("-")}</p>
                <p className="rating_detail"> Calificación: {detail.rating}</p>
                <p className="description_detail"> Descripción: {detail.description || detail.description_raw}</p>
                </div>
            </div> 
             
            
         </div>   

    
    )

}

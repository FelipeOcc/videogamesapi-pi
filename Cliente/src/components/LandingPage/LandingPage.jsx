import React from 'react';
import {Link} from 'react-router-dom';
import '../LandingPage/landingPage.css';

export default function LandingPage(){
    return (
        
        <div className="landing_page">
          <div>
            <h4 className='title_landing'>Api de Videojuegos</h4>
            <h5 className='subtitle_landing'>¡Bienvenidos!</h5>
            
            <Link to = '/home'>

                <button className='button_landing'> Empezar </button>
                
            </Link>
          </div>
        </div>
    )

}
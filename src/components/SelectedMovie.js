import React from "react";
import {Link} from "react-router-dom"

export default function SelectedMovie({ movie, onOrderMovie, people})
{
    return (
        <>
        <div className="" id="movie-select">
        {/* movie banner */}
        <div >   
        <img src={movie.movie_banner} className="movie_image_banner" alt="movie banner"></img>
        </div>        
    
        {/* movie details */}
        <div className="mt-3 mb-5 row">
            <div className="col s3">
            <div className="card">
                <div className="card-image">   
                <img src={movie.image} alt="movie"></img>
                </div>        
            </div>
            </div>
            <div className="col s9">
            <h5 className=""><b>{movie.title}</b> <small><br/>({movie.original_title})</small></h5>
            <p><b>Released:</b> {movie.release_date}</p>  
            <p><b>Directed by:</b> {movie.director}</p>
            <p><b>Produced by:</b> {movie.producer}</p>
            <p><b>People:</b> {people}</p>
            <p><b>Run-time:</b> {movie.running_time} min</p>   
            <p className=""><b>Synopsis:</b> {movie.description}</p> 
            <button id="btn-add_order" className="btn" onClick={() => { onOrderMovie(movie); }}>Add to Cart</button>
            </div>
        </div>
        </div>
        </>
    )
}

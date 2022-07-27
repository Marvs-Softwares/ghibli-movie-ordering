import React from "react";
import { useEffect, useReducer, useState } from 'react';
import MovieList from "./MovieList";
import SelectedMovie from "./SelectedMovie";
import OrderForm from "./OrderForm";
import $ from "jquery";

export default function Movies()
{
    // Declared variables
    const [movieList, setMovieList] = useState([]); // use to display all list
    const [selectedMovie, setSelectedMovie] = useState([]); //use to display user selected movie
    const [orderedMovie, setOrderedMovie] = useState([]); // use to display all ordered movie(s)
    const [confirmOrder, setConfirmOrder] = useReducer((checked) => !checked, false); // checks the checkbox if the order is confirmed or not
    const [orderNotification, setOrderNotification] = useState(0); // use to display how many new items added to the cart

    /* MAIN FUNCTIONS */

    // function for user selected movie
    function onSelectMovie(data)
    {
        $('#movie-select').removeClass("hide");
        $('#movie-list').addClass("hide");
        setSelectedMovie([ data ]); // user selected movie will be inserted here
    }

    // function for user order movie(s)
    function onOrderMovie(data)
    {
        // checks if the order is already exist in the array
        if (orderedMovie.includes(data) === false) {
            setOrderedMovie(orderedMovie.concat([data])); //user ordered movies inserted here
            alert(
                "SUCCESS!" + "\n\n" +
                "'"+ data.title + "' successfully added to the list."
            )
            $('#movie-select').addClass("hide"); // hide selected movie
            $('#movie-list').removeClass("hide"); // unhide movie list
            $('#order-badge').removeClass("hide"); // unhide cart notification
            setOrderNotification(orderNotification + 1); // increment the current value
        } else {
            alert(
                "WARNING!" + "\n\n" +
                "'"+ data.title + "' is already exist."
            )
        }
    }

    // remove items on the ordered list if necessary
    function onHandleDelete(movie_id)
    {
        // check if ID is already exist in the array
        // return those elements that is not equal to the ID and updates the "OrderedMovie" array afterwards. 
        orderedMovie.map(data => setOrderedMovie(orderedMovie.filter(data => data.id !== movie_id)));
    }

    useEffect(() => {     
        // fetch the API
        fetch(
          'https://ghibliapi.herokuapp.com/films'
        )
        .then((response) => response.json())
        .then((data) => {
            setMovieList(data); // insert the api 1st data to the "movieList" useState
          } 
        );
    }, [])

    // get and deploy each elements from array or useState to the components
    const movie_list = movieList.map((movie, index) => (<MovieList key={index} data={movie} onSelectMovie={onSelectMovie}/>));
    const movie_selected = selectedMovie.map((movie, index) => (<SelectedMovie key={index} movie={movie} onOrderMovie={onOrderMovie}/>));
    const movie_ordered = orderedMovie.map((movie, index) => (<OrderedMovies key={index} data={movie} onDelete={onHandleDelete} />));
 

    return (
        <>
        HELLO branch
        <div className="container">
        {/* Section 1 */}
        <div className="card trans-bg">
            <div className="card-image">
                <img src={require("../img/R.png")} alt="ghibli logo" width="400" height="400"></img>
            </div>
        </div>
        <div className="">
            <button className="black-text mouse-pointer btn-flat" onClick={linkToHome}>Movies</button>
            <button className="black-text mouse-pointer btn-flat" onClick={() => {linkToForm(); setOrderNotification(0);}}>Cart <span className="teal-text fs-3" id="order-badge">{orderedMovie.length === 0 ? "" : orderNotification}</span></button>
        </div>
        <hr />          

        {/* Section 2 */}
        <div className="row " id="movie-list">
            {movie_list} 
        </div>

        {/* Section 3*/}
        <div className="" id="movie-select">
            {movie_selected}
        </div>
        
                
        {/* Section 4 */}
        <div className="mb-5 hide" id="movie-order_form">
            <h6 className="mt-3">Total Items: {orderedMovie.length}</h6>
            <ul className="collection">
            {movie_ordered} 
            </ul>
            <p>
            <label>
                <input type="checkbox" id="check-order" value={confirmOrder} onChange={setConfirmOrder}/>
                <span className={confirmOrder ? "teal-text" : ""}>{confirmOrder ? "Order Confirmed" : "Order Pending"}</span>
            </label>
            </p>

            <OrderForm isConfirm={confirmOrder} setConfirm={setConfirmOrder} totalOrdered={orderedMovie} />
        </div>
        </div>
        </>
    )
}

/* DESTRUCTURE */

// Ordered Movies Component
const OrderedMovies = ({ data, onDelete }) => 
(
    <li className="collection-item avatar">
      <img src={data.movie_banner} className="circle" alt="movie banner"></img>
      <span className="title">{data.title} ({data.original_title}) - {data.release_date }</span>
        <p>Directed by: { data.director}</p>
      <button className="secondary-content btn-flat" onClick={() => onDelete(data.id)}><i className="bi bi-x-lg mouse-pointer"></i></button>
    </li>
);


/* NON-MAIN FUNCTIONS */

function linkToHome()
{
    $('#movie-list').removeClass("hide"); // display
    $('#movie-select').addClass("hide"); // hide
    $('#movie-order_form').addClass("hide"); //hide
}

function linkToForm()
{
    $('#movie-list').addClass("hide"); // display
    $('#movie-select').addClass("hide"); // hide
    $('#movie-order_form').removeClass("hide"); // display
    $('#order-badge').addClass("hide"); // display
}

function dd(log)
{
    console.log(log);
}
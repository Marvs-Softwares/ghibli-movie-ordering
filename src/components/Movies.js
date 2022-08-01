import React from "react";
import { useEffect, useReducer, useState } from 'react';
import MovieList from "./MovieList";
import SelectedMovie from "./SelectedMovie";
import OrderForm from "./OrderForm";
import $ from "jquery";
import OrderList from "./OrderList";
import Navbar from "./Navbar";
import Orders from "./Orders";
import { Routes, Route } from "react-router-dom";

export default function Movies()
{
    // Declared variables
    const [movieList, setMovieList] = useState([]); // use to display all list
    const [selectedMovie, setSelectedMovie] = useState([]); //use to display user selected movie
    const [people, setPeople] = useState([]); // store people from the selected movie
    const [orderedMovie, setOrderedMovie] = useState([]); // use to display all ordered movie(s)
    const [confirmOrder, setConfirmOrder] = useReducer((checked) => !checked, false); // set default checkbox to false
    /* MAIN FUNCTIONS */

    // function for user selected movie
    function onSelectMovie(data)
    {
        $('#movie-select').removeClass("hide");
        setSelectedMovie([data]); // user selected movie will be inserted here

        // use "Promise" to fetch multiple api
        Promise.all(
            data.people.map(url => 
                fetch(url).then(response => response.json()) 
            )
        ).then(data => {
            setPeople(data); // store people from the selected mmovie
        });
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
        // return those elements that is not equal to the selected ID and updates the "OrderedMovie" array afterwards. 
        setOrderedMovie(orderedMovie.filter(data => data.id !== movie_id));
    }

    // useEffect will trigger anytime an update happens to the React component.
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

    // deploy each elements from array or useState to the components
    const movie_list = movieList.map((movie, index) => (<MovieList key={index} data={movie} onSelectMovie={onSelectMovie}/>));
    const movie_people = people.map((movie, index) => (<span key={index}>{movie.name}<i className="bi bi-dot fs-1"></i></span>));
    const movie_selected = selectedMovie.map((movie, index) => (<SelectedMovie key={index} movie={movie} onOrderMovie={onOrderMovie} people={movie_people} />));
    const movie_ordered = orderedMovie.map((movie, index) => (<OrderedMovies key={index} data={movie} onDelete={onHandleDelete} />));

    return (
        <>
            <div className="container mb-5">
            <Navbar orderedMovie={orderedMovie} linkToForm={ linkToForm} />  

            <div className="row" id="movie-list">
            <Routes>
                <Route path="/" element={movie_list}></Route>  
                <Route path=":id" element={movie_selected}></Route>  
                <Route path="cart" element={<OrderList movieOrderList={movie_ordered} orderMovie={orderedMovie} isConfirm={confirmOrder} setConfirm={setConfirmOrder} />}>
                    <Route path="customer-info" element={<OrderForm isConfirm={confirmOrder} setConfirm={setConfirmOrder} totalOrdered={orderedMovie} />}></Route>  
                </Route>   
                <Route path="/orders" element={ <Orders />}></Route>               
            </Routes>
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
    $('#movie-select').addClass("hide"); // hide
}

function dd(log)
{
    console.log(log);
}
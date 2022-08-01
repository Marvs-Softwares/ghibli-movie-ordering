import React from "react";
import {Link} from "react-router-dom"

export default function Navbar({orderedMovie, linkToForm})
{
    return (
        <>
        <div className="card trans-bg">
        <div className="card-image">
            <img src={require("../img/R.png")} alt="ghibli logo" width="400" height="400"></img>
        </div>
        </div>
        <div className="">        
            <Link to="/"><button className="black-text mouse-pointer btn-flat">Movies</button></Link>
            <Link to="/cart"><button className="black-text mouse-pointer btn-flat" onClick={linkToForm}>Cart<span className="teal-text fs-3" id="order-badge"> {orderedMovie.length === 0 ? "" : orderedMovie.length}</span></button></Link>
            <Link to="/orders"><button className="black-text mouse-pointer btn-flat">Orders</button></Link>
        </div>
        <hr/> 
        </>
    )
}
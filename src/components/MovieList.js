import React from "react";

export default function MovieList({data, onSelectMovie })
{
    return (
        <>
        <div className="col s6 m4 l3">
        <div className="card pb-3 trans-bg mt-3">
            <div className="card-image movie_image hoverable z-depth-2">
            <img src={data.image} title={data.title} onClick={() => onSelectMovie( data )} alt="movie"></img>
            {/* <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="bi bi-plus-lg" onClick={() => onSelectMovie( data )}></i></a> */}
            </div>
            <div className="my-0">
                <h6 className="fw-bold truncate" title={data.title}>{data.title}</h6>
                <span className="center-div left"><i className="bi bi-badge-hd fs-custom mr-1"></i>{data.release_date}<i className="bi bi-dot fs-1"></i>{data.running_time}m</span>
            </div>
        </div>
        </div> 
        </>
    )

}

import React, {useState} from "react";
import {Outlet, Link} from "react-router-dom"


export default function OrderList({movieOrderList, orderMovie, isConfirm, setConfirm})
{
    const [valid, setValid] = useState(false);
    function checkOrders()
    {
        if (orderMovie.length !== 0 && isConfirm === true)
        {
            setValid(true);
            document.getElementById("btn-verify").classList.add("hide");
        }
        if (orderMovie.length === 0 || isConfirm === false){
            alert("Warning!" + "\n" + "Please confirm your order before you proceed.");
        }

    }

    function hideNext()
    {
        document.getElementById("btn-next").classList.add("hide");
    }
    return (
        <>
            <h6 className="mt-3">Total Items: {orderMovie.length}</h6>
            <ul className="collection">
            {movieOrderList} 
            </ul>
            <p>
            <label>
                <input type="checkbox" id="check-order" value={isConfirm} onChange={setConfirm}/>
                <span className={isConfirm ? "teal-text" : ""}>{isConfirm ? "Order Confirmed" : "Order Pending"}</span>
            </label>
            </p>
            {orderMovie.length !== 0 ? <button className="btn" id="btn-verify" onClick={checkOrders}>Verify</button> : null}
            {valid === true ? <Link to="/cart/customer-info"><button className="btn" id="btn-next" onClick={hideNext}>Next</button></Link> : null}
            <Outlet />
        </>
    )
}
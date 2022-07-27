import React from "react";
import { useRef } from 'react';
import $ from "jquery";

export default function OrderForm({ isConfirm, setConfirm, totalOrdered})
{
    // declared variables
    const customerName = useRef();
    const customerAge = useRef();
    const customerColor = useRef();
    
    function submitCustomer(e)
    {
        e.preventDefault();
        // if the order is confirm and added items, alert SUCESS!
        if (isConfirm === true && totalOrdered.length !== 0) {
            alert("SUCCESS!" + '\n\n'+ "Thank you for ordering.");
            
            // reset inputs
            customerName.current.value = '';
            customerAge.current.value = '';
            customerColor.current.value = '';

            $('#check-order').prop('checked', false); //unchecks the checkbox
            setConfirm(false); // set the checkbox back to false

            $('#movie-list').removeClass("hide"); //unhide section 2
            $('#movie-order_form').addClass("hide"); //unhide section 4
            totalOrdered.length = 0; //set the array length back to zero to clear the order list
        }

        // if the order is not confirm, alert WARNING!
        if (isConfirm === false){
            alert("WARNING!" + "\n\n" + "Please confirm your order before submit");
        }
    }

    return (
        <>
        <div className="row">
            <form className="col s12" onSubmit={submitCustomer}>
            <div className="row">
            <div className="input-field col s12">
            <input id="name" type="text" className="" pattern="[a-zA-Z\s]+$" required ref={customerName}></input>
            <label for="name">Complete Name</label>
            </div>
            </div>
            <div className="row">
            <div className="input-field col s12">
            <input id="age" type="text" className="" maxLength="2"  pattern="[0-9]{1,2}" required ref={customerAge}></input>
            <label for="age">Age</label>
            </div>
            </div>
            <div className="row">
            <div className="input-field col s12">
            <input id="color" type="text" className="" pattern="[a-zA-Z\s]+$" required ref={customerColor}></input>
            <label for="color">Favorite Color</label>
            </div>
            </div>
            <button className="btn">Submit</button>
            </form>
        </div>
        </>
    )
}
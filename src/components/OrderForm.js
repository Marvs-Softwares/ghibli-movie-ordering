import React from "react";
import { useRef, useState } from 'react';
import $ from "jquery";

export default function OrderForm({ isConfirm, setConfirm, totalOrdered})
{
    // declared variables
    const [customerName, setCustomerName] = useState("");
    const [customerAge, setCustomerAge] = useState("");
    const [customerColor, setCustomerColor] = useState("");

    function submitCustomer(e)
    {
        e.preventDefault();
        // if the order is confirm and added items, alert SUCESS!
        if (isConfirm === true && totalOrdered.length !== 0) {
            alert("SUCCESS!" + '\n\n'+ "Thank you for ordering.");

            $('#check-order').prop('checked', false); //unchecks the checkbox
            setConfirm(false); // set the checkbox back to false

            const data = JSON.parse(localStorage.getItem('customer'));

            // set a json form data before saving to local storage
            const customerDetails = {
                'Name' : customerName,
                'Age' : customerAge,
                'Color': customerColor,
                'Orders': totalOrdered
            }
            const newCustomers = [...data, customerDetails];
            
            localStorage.setItem('customer', JSON.stringify(newCustomers)); // save to localstorage

            // reset inputs
            $('#name').val("");
            $('#age').val("");
            $('#color').val("");
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
        <input id="name" type="text" className="" pattern="[a-zA-Z\s]+$" required onChange={e => setCustomerName(e.target.value)}></input>
        <label htmlFor="name">Complete Name</label>
        </div>
        </div>
        <div className="row">
        <div className="input-field col s12">
        <input id="age" type="text" className="" maxLength="2"  pattern="[0-9]{1,2}" required onChange={e => setCustomerAge(e.target.value)}></input>
        <label htmlFor="age">Age</label>
        </div>
        </div>
        <div className="row">
        <div className="input-field col s12">
        <input id="color" type="text" className="" pattern="[a-zA-Z\s]+$" required onChange={e => setCustomerColor(e.target.value)}></input>
        <label htmlFor="color">Favorite Color</label>
        </div>
        </div>
        <button className="btn">Submit</button>
        </form>
        </div>
        </>
    )
}
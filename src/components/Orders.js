import React, {useState, useEffect} from "react";


export default function Orders() {
    const [customerDetails, setCustomerDetails] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('customer'));
        if (data) {
            setCustomerDetails(data);
        }
    }, []);
    const customer = customerDetails.map((data, index) => (<CustomerDetails key={index} data={data}/>));

    return ( 
        <>
            <ul className="collection with-header">
                {customer}
            </ul>

        </>
    );
}

function CustomerDetails({ data })
{
    return (
        <>
            <li className="collection-header"><h5><i className="bi bi-person"></i> {data.Name}</h5></li>
            {data.Orders.map((movie, index) => {
                return (
                    <li className="collection-item"><i className="bi bi-film mr-2"></i>{movie.title}</li>
                )
            })}
        </>
    )
}

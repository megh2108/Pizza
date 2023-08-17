import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Cart() {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    const callCartPage = async () => {
        try {
            const res = await fetch('/carts', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"

            });

            console.log(res);

            const data = await res.json();
            console.log(data);

            if (!data.status === 200) {
                const error = new Error(data.error);
                throw error;
            }

        }
        catch (err) {

            navigate("/Login");
        }
    }

    useEffect(() => {
        callCartPage();

    }, []);



    return (
        <>
            <h1>Pooja Sorathiya</h1>

        </>
    )
}

export default Cart

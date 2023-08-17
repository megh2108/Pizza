import React, { useState, useEffect } from 'react';
import '../Menu/Menu.css';

const MenuList = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [offers, setOffers] = useState([]);

    const callMenuPage = async () => {
        try {
            const response = await fetch("/pizza", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await response.json();
            console.log(data);
            setMenuItems(data.menuItems); // Assuming setMenuItems updates a state variable
            setOffers(data.offers); // Assuming setOffers updates a state variable

            if (!response.ok) {
                const error = new Error(data.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            //   navigate("/login");
        }
    }

    useEffect(() => {
        callMenuPage();
    }, []);


    const currentDate = new Date();

    return (

        <>
            <div className="tab-content" data-aos="fade-up" data-aos-delay="300">

                <div className="tab-pane fade active show" id="menu-pizzas">

                    <div className="menu-list">
                        <h1>Pizza Menu</h1>
                        <div className="col-lg-4 menu-item">
                            {/* Assuming your image URL is in pizza.imageUrl */}
                            {/* <a href="assets/img/menu/menu-item-1.png" className="glightbox"> */}
                                <img src="assets/img/menu/menu-item-1.png" className="menu-img img-fluid" alt="" />
                            {/* </a> */}
                            <h4>Margherita</h4>
                            <p className="ingredients">
                                Hello
                            </p>
                            {/* Assuming your price field is in pizza.price */}
                            <p className="price">
                                $50.00
                            </p>
                        </div>
                    </div>

                </div>
            </div>


        </>
    );
};

export default MenuList;

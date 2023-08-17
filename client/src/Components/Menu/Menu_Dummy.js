// src/Menu.js
import React, { useState } from "react";
import "./Menu_Dummy.css";
import PropTypes from "prop-types";



const Menu = ({ pizza }) => {
    const [isOrdered, setIsOrdered] = useState(false);

    const handleOrder = () => {
        // Implement your ordering logic here
        // You can use a state management solution (e.g., React Context, Redux) or just local state
        setIsOrdered(true);
    };

    return (
        <div>
            <h2>Pizza Menu</h2>
            <div className="menu">
                <div key={pizza.id} className="pizza-card">
                    <img src={pizza.imageUrl} alt={pizza.name} className="pizza-image" />
                    <h2 className="pizza-name">{pizza.name}</h2>
                    <p className="pizza-description">{pizza.description}</p>
                    <p className="pizza-price">Price: ${pizza.price.toFixed(2)}</p>
                    <button
                        className={`order-button ${isOrdered ? "ordered" : ""}`}
                        onClick={handleOrder}
                        disabled={isOrdered}
                    >
                        {isOrdered ? "Ordered" : "Order"}
                    </button>
                </div>
            </div>
        </div>
    );
};

Menu.propTypes = {
    pizza: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
    }).isRequired,
};


export default Menu;

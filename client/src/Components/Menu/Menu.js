import React, { useEffect, useState } from 'react';
import './Menu.css';

const Menu = () => {
  const [userData, setUserData] = useState([]);

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

      const res = await response.json();
      console.log(res);
      setUserData(res);

      if (!response.ok) {
        const error = new Error(res.error);
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

  return (
    <>
      <section id="menu" className="menu">
        <div className="container" data-aos="fade-up">

          <div className="section-header">
            <h2>Our Menu</h2>
            <p>Check Our <span>Cheesy Pizza Menu</span></p>
          </div>

          <ul className="nav nav-tabs d-flex justify-content-center" data-aos="fade-up" data-aos-delay="200">

            <li className="nav-item">
              <a className="nav-link active show" data-bs-toggle="tab" data-bs-target="#menu-pizzas">
                <h4>Pizzas</h4>
              </a>
            </li>


            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" data-bs-target="#menu-sendwiches">
                <h4>Sendwiches</h4>
              </a>
            </li>


            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" data-bs-target="#menu-burgers">
                <h4>Burgers</h4>
              </a>
            </li>



          </ul>

          <div className="tab-content" data-aos="fade-up" data-aos-delay="300">

            <div className="tab-pane fade active show" id="menu-pizzas">

              <div className="tab-header text-center">
                <p>Menu</p>
                <h3>Pizza</h3>
              </div>

              <div className="row gy-5">
                {userData.map((pizza, index) => (
                  <div key={index} className="col-lg-4 menu-item">
                    {/* Assuming your image URL is in pizza.imageUrl */}
                    <a href="assets/img/menu/menu-item-1.png" className="glightbox">
                      <img src="assets/img/menu/menu-item-1.png" className="menu-img img-fluid" alt="" />
                    </a>
                    <h4>{pizza.name}</h4>
                    <p className="ingredients">
                      {pizza.description}
                    </p>
                    {/* Assuming your price field is in pizza.price */}
                    <p className="price">
                      $50.00
                    </p>
                  </div>
                ))}
              </div>
            </div>


            <div className="tab-pane fade " id="menu-sendwiches">

              <div className="tab-header text-center">
                <p>Menu</p>
                <h3>Sendwiches</h3>
              </div>

              <div className="row gy-5">
                {userData.map((pizza, index) => (
                  <div key={index} className="col-lg-4 menu-item">
                    {/* Assuming your image URL is in pizza.imageUrl */}
                    <a href="assets/img/menu/menu-item-1.png" className="glightbox">
                      <img src="assets/img/menu/menu-item-1.png" className="menu-img img-fluid" alt="" />
                    </a>
                    <h4>{pizza.name}</h4>
                    <p className="ingredients">
                      {pizza.description}
                    </p>
                    {/* Assuming your price field is in pizza.price */}
                    <p className="price">
                      $50.00
                    </p>
                  </div>
                ))}
              </div>
            </div>


            <div className="tab-pane fade " id="menu-burgers">

              <div className="tab-header text-center">
                <p>Menu</p>
                <h3>Burgers</h3>
              </div>

              <div className="row gy-5">
                {userData.map((pizza, index) => (
                  <div key={index} className="col-lg-4 menu-item">
                    {/* Assuming your image URL is in pizza.imageUrl */}
                    <a href="assets/img/menu/menu-item-1.png" className="glightbox">
                      <img src="assets/img/menu/menu-item-1.png" className="menu-img img-fluid" alt="" />
                    </a>
                    <h4>{pizza.name}</h4>
                    <p className="ingredients">
                      {pizza.description}
                    </p>
                    {/* Assuming your price field is in pizza.price */}
                    <p className="price">
                      $50.00
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

    </>
  );
}

export default Menu;

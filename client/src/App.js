import React, { createContext, useReducer } from 'react';
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Menu from "./Components/Menu/Menu";
import About from "./Components/About/About";
import Cart from "./Components/Cart/Cart";
import Itemadd from './Components/Item/Itemadd';
import ScrollToTop from './Components/Scroll/ScrollToTop'
import Dashboard from "./Components/Dashboard/Dashboard";
import Logout from './Components/Logout/Logout';
import { initialState, reducer } from './Components/Reducer/Reducer';


import MenuList from "./Components/Menulist/Menulist";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { pizzaMenu } from "./menuData";
import Menu_Dummy from "./Components/Menu/Menu_Dummy"
import './App.css';
export const UserContext = createContext();


function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ state, dispatch }}>

          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            {/* <Route path="/Menu" element={<MenuList />} /> */}
            {/* <Route path="/Menu" element={<Menu />} /> */}
            <Route
              path="/Menu"
              element={<Menu_Dummy menuData={pizzaMenu} />} 
            />
            <Route path="/About" element={<About />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/item" element={<Itemadd />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/" element={<Home />} />

          </Routes>
          <Footer />
        </UserContext.Provider>

      </BrowserRouter>

    </>
  );
}

export default App;

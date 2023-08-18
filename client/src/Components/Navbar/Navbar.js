import React, { useEffect , useState, useContext} from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

import { UserContext } from '../../App';


const select = (el, all = false) => {
    el = el.trim();

    if (el.startsWith('/')) {
        el = el.substring(1);
    }

    if (all) {
        return [...document.querySelectorAll(el)];
    } else {
        return document.querySelector(el);
    }
};

const select1 = (el, all = false) => {
    el = el.trim();
    if (all) {
        return [...document.querySelectorAll(el)];
    } else {
        return document.querySelector(el);
    }
};

const scrollto = (hash) => {
    let header = select('#header');
    let offset = header.offsetHeight;

    let cleanedHash = hash.replace('/', ''); // Remove the leading forward slash
    let element = select(cleanedHash);

    if (element) {
        let elementPos = element.offsetTop;
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth',
        });
    }
};

function Navbar() {

    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {


        // moble navbar active
        const handleClick = (e) => {
            const clickedElement = e.target;
            const navbar = select('#navbar');

            if (clickedElement.matches('.mobile-nav-toggle')) {
                navbar.classList.toggle('navbar-mobile');
                clickedElement.classList.toggle('bi-list');
                clickedElement.classList.toggle('bi-x');
            }

            if (clickedElement.matches('.navbar a')) {
                navbar.classList.remove('navbar-mobile');
                let navbarToggle = select('.mobile-nav-toggle');
                navbarToggle.classList.toggle('bi-list');
                navbarToggle.classList.toggle('bi-x');
            }

            if (clickedElement.matches('.navbar .dropdown > .abc')) {
                const navbar = select('#navbar');

                if (navbar.classList.contains('navbar-mobile')) {
                    e.preventDefault();
                    clickedElement.nextElementSibling.classList.toggle('dropdown-active');
                }
            }

            if (clickedElement.matches('.scrollto')) {
                const targetHash = clickedElement.getAttribute('to');

                if (targetHash && select(targetHash)) {
                    e.preventDefault();

                    let navbar = select('#navbar');

                    if (navbar.classList.contains('navbar-mobile')) {
                        navbar.classList.remove('navbar-mobile');
                        let navbarToggle = select('.mobile-nav-toggle');
                        navbarToggle.classList.toggle('bi-list');
                        navbarToggle.classList.toggle('bi-x');
                    }

                    scrollto(targetHash);
                }
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };



    }, []);

    useEffect(() => {
        // sticked navbar

        const selectHeader = select1('#header');
        const nextElement = selectHeader?.nextElementSibling;
        let headerOffset = selectHeader?.offsetTop || 0;

        const handleHeaderFixed = () => {
            if ((headerOffset - window.scrollY) <= 0) {
                selectHeader?.classList.add('fixed-top');
                nextElement?.classList.add('scrolled-offset');
            } else {
                selectHeader?.classList.remove('fixed-top');
                nextElement?.classList.remove('scrolled-offset');
            }
        };

        handleHeaderFixed(); // Call it initially to set the initial state
        window.addEventListener('load', handleHeaderFixed);
        document.addEventListener('scroll', handleHeaderFixed);

        return () => {
            window.removeEventListener('load', handleHeaderFixed);
            document.removeEventListener('scroll', handleHeaderFixed);
        };
    }, [])

    return (
        <>


            <header id="header" className="header d-flex align-items-center">
                <div className="container d-flex align-items-center ">
                    <NavLink to="/" className="logo d-flex align-items-center me-auto me-lg-0">
                        <img src="assets/img/logo/image_1.png" alt="hello" className="wills" />
                    </NavLink>
                    <NavLink to="/" className="logo1 d-flex align-items-center me-auto me-lg-0">
                        <img src="assets/img/logo/image_2.png" alt="hello" className="wills" />
                    </NavLink>


                    <nav id="navbar" className="navbar">
                        <ul>
                            <li><NavLink to="/Home">Home</NavLink></li>
                            <li><NavLink to="/About">About</NavLink></li>
                            <li><NavLink to="/Menu">Menu</NavLink></li>
                            <li><NavLink to="/Contact">Contact</NavLink></li>
                            {/* <li><NavLink to="/Cart">Cart</NavLink></li>
                            <li><NavLink to="/Logout">Logout</NavLink></li>
                            <li><NavLink to="/Signup">Signup</NavLink></li>
                            <li><NavLink to="/Login">Login</NavLink></li> */}
                            {state ? (
                                <>
                                    <li><NavLink to="/Cart">Cart</NavLink></li>
                                    <li><NavLink to="/Logout">Logout</NavLink></li>

                                </>
                            ) : (
                                <>
                                    <li><NavLink to="/Signup">Signup</NavLink></li>
                                    <li><NavLink to="/Login">Login</NavLink></li>
                                </>
                            )}

                        </ul>
                    </nav>
                    <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>

                    <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>


                </div>
            </header>


        </>
    )
}

export default Navbar

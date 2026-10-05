import React from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import "../styles/Navbar.css";


const Navbar = () => {

    const navigate = useNavigate();


    const token =
        localStorage.getItem("token");


    const storedUser =
        localStorage.getItem("user");


    let user = null;


    try {

        user = storedUser
            ? JSON.parse(storedUser)
            : null;

    } catch (error) {

        user = null;
    }


    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");


        navigate(
            "/",
            {
                replace: true
            }
        );

    };


    return (

        <nav className="main-navbar">

            <div className="container navbar-container">


                {/* HOME */}

                <Link
                    to="/"
                    className="navbar-link"
                >
                    Home
                </Link>


                {/* SAREES */}

                <Link
                    to="/sarees"
                    className="navbar-link"
                >
                    Sarees
                </Link>


                {/* JEWELLERY */}

                <Link
                    to="/jewellery"
                    className="navbar-link"
                >
                    Jewellery
                </Link>


                {/* =================================
                    NOT LOGGED IN
                ================================= */}

                {!token || !user ? (

                    <Link
                        to="/login"
                        className="navbar-admin-login"
                    >
                        Admin Login
                    </Link>

                ) : (

                    /* =================================
                       ADMIN LOGGED IN
                    ================================= */

                    <>

                        <span className="navbar-admin-name">

                            Admin: {user.name}

                        </span>


                        <button
                            type="button"
                            onClick={handleLogout}
                            className="navbar-logout"
                        >
                            Logout
                        </button>

                    </>

                )}

            </div>

        </nav>

    );
};


export default Navbar;
import React, { useEffect, useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import "../styles/Navbar.css";


const Navbar = () => {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] =
        useState(false);


    // ==========================================
    // GET LOGIN INFORMATION
    // ==========================================

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


    // ==========================================
    // CLOSE MOBILE MENU
    // ==========================================

    const closeMenu = () => {

        setMenuOpen(false);

    };


    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setMenuOpen(false);

        navigate(
            "/",
            {
                replace: true
            }
        );

    };


    // ==========================================
    // CLOSE MENU WHEN WINDOW BECOMES DESKTOP
    // ==========================================

    useEffect(() => {

        const handleResize = () => {

            if (window.innerWidth > 768) {

                setMenuOpen(false);

            }

        };


        window.addEventListener(
            "resize",
            handleResize
        );


        return () => {

            window.removeEventListener(
                "resize",
                handleResize
            );

        };

    }, []);


    return (

        <nav className="main-navbar">

            <div className="navbar-container">


                {/* ==================================
                    BRAND
                ================================== */}

                <Link
                    to="/"
                    className="navbar-brand"
                    onClick={closeMenu}
                >

                    JCollection

                </Link>


                {/* ==================================
                    MOBILE HAMBURGER
                ================================== */}

                <button
                    type="button"
                    className={
                        menuOpen
                            ? "navbar-toggle active"
                            : "navbar-toggle"
                    }
                    onClick={() =>
                        setMenuOpen(
                            !menuOpen
                        )
                    }
                    aria-label={
                        menuOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={menuOpen}
                >

                    <span></span>
                    <span></span>
                    <span></span>

                </button>


                {/* ==================================
                    NAVIGATION MENU
                ================================== */}

                <div
                    className={
                        menuOpen
                            ? "navbar-menu open"
                            : "navbar-menu"
                    }
                >


                    {/* HOME */}

                    <Link
                        to="/"
                        className="navbar-link"
                        onClick={closeMenu}
                    >

                        Home

                    </Link>


                    {/* SAREES */}

                    <Link
                        to="/sarees"
                        className="navbar-link"
                        onClick={closeMenu}
                    >

                        Sarees

                    </Link>


                    {/* JEWELLERY */}

                    <Link
                        to="/jewellery"
                        className="navbar-link"
                        onClick={closeMenu}
                    >

                        Jewellery

                    </Link>


                    {/* ==================================
                        ADMIN SECTION
                    ================================== */}

                    {!token || !user ? (

                        <Link
                            to="/login"
                            className="navbar-admin-login"
                            onClick={closeMenu}
                        >

                            Admin Login

                        </Link>

                    ) : (

                        <div className="navbar-admin-section">


                            {/* ADMIN NAME */}

                            <span className="navbar-admin-name">

                                <span className="admin-dot"></span>

                                Admin: {user.name}

                            </span>


                            {/* LOGOUT */}

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="navbar-logout"
                            >

                                Logout

                            </button>


                        </div>

                    )}

                </div>

            </div>

        </nav>

    );

};


export default Navbar;
import React, { useEffect, useState } from "react";

import {
    Link,
    useNavigate,
    useLocation
} from "react-router-dom";

import "../styles/Navbar.css";


const API_URL =
    "https://sjb-backend-01lg.onrender.com";


const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation();


    // ==========================================
    // STATE
    // ==========================================

    const [menuOpen, setMenuOpen] =
        useState(false);

    const [orderCount, setOrderCount] =
        useState(0);


    // ==========================================
    // GET LOGIN INFORMATION
    // ==========================================

    const getUser = () => {

        const storedUser =
            localStorage.getItem("user");

        if (!storedUser) {
            return null;
        }

        try {

            return JSON.parse(
                storedUser
            );

        } catch (error) {

            console.error(
                "USER PARSE ERROR:",
                error
            );

            return null;
        }
    };


    const user = getUser();

    const token =
        localStorage.getItem("token");


    // ==========================================
    // CHECK ADMIN
    // ==========================================

    const isAdmin =
        Boolean(
            token &&
            user &&
            user.role === "admin"
        );


    // ==========================================
    // FETCH ADMIN ORDER COUNT
    // ==========================================

    const fetchOrderCount = async () => {

        // Only admin should request admin orders
        if (!isAdmin) {

            setOrderCount(0);

            return;
        }


        try {

            const response =
    await fetch(
        `${API_URL}/api/orders/admin/all`,
        {
            method: "GET",

            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );


            const data =
                await response.json();


            if (!response.ok) {

                console.error(
                    "ORDER COUNT API ERROR:",
                    data.message
                );

                return;
            }


            setOrderCount(
                Array.isArray(data.orders)
                    ? data.orders.length
                    : 0
            );

        } catch (error) {

            console.error(
                "ORDER COUNT ERROR:",
                error
            );

        }

    };


    // ==========================================
    // FETCH ORDER COUNT
    // ==========================================

    useEffect(() => {

        if (isAdmin) {

            fetchOrderCount();

        } else {

            setOrderCount(0);

        }

    }, [
        isAdmin,
        token
    ]);


    // ==========================================
    // REFRESH ORDER COUNT
    // WHEN ADMIN RETURNS TO WEBSITE
    // ==========================================

    useEffect(() => {

        const handleFocus = () => {

            if (isAdmin) {
                fetchOrderCount();
            }

        };


        window.addEventListener(
            "focus",
            handleFocus
        );


        return () => {

            window.removeEventListener(
                "focus",
                handleFocus
            );

        };

    }, [
        isAdmin,
        token
    ]);


    // ==========================================
    // REFRESH COUNT WHEN ROUTE CHANGES
    // ==========================================

    useEffect(() => {

        if (isAdmin) {
            fetchOrderCount();
        }

        setMenuOpen(false);

    }, [location.pathname]);


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

        setOrderCount(0);

        setMenuOpen(false);

        navigate(
            "/",
            {
                replace: true
            }
        );

    };


    // ==========================================
    // CLOSE MENU WHEN DESKTOP
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


    // ==========================================
    // RENDER
    // ==========================================

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


                    {/* ==================================
                        HOME
                    ================================== */}

                    <Link
                        to="/"
                        className="navbar-link"
                        onClick={closeMenu}
                    >
                        Home
                    </Link>


                    {/* ==================================
                        SAREES
                    ================================== */}

                    <Link
                        to="/sarees"
                        className="navbar-link"
                        onClick={closeMenu}
                    >
                        Sarees
                    </Link>


                    {/* ==================================
                        JEWELLERY
                    ================================== */}

                    <Link
                        to="/jewellery"
                        className="navbar-link"
                        onClick={closeMenu}
                    >
                        Jewellery
                    </Link>


                    {/* ==================================
                        ADMIN ORDERS
                    ================================== */}

                    {isAdmin && (

                        <Link
                            to="/orders"
                            className={
                                location.pathname.startsWith(
                                    "/orders"
                                )
                                    ? "navbar-link navbar-orders-link active"
                                    : "navbar-link navbar-orders-link"
                            }
                            onClick={closeMenu}
                        >

                            <span>
                                Orders
                            </span>


                            {/* ORDER COUNT */}

                            <span className="navbar-order-count">

                                {orderCount}

                            </span>

                        </Link>

                    )}


                    {/* ==================================
                        ADMIN LOGIN / ADMIN SECTION
                    ================================== */}

                    {!isAdmin ? (

                        <Link
                            to="/login"
                            className="navbar-admin-login"
                            onClick={closeMenu}
                        >
                            Admin Login
                        </Link>

                    ) : (

                        <div className="navbar-admin-section">


                            {/* ==================================
                                ADMIN NAME
                            ================================== */}

                            <span className="navbar-admin-name">

                                <span className="admin-dot"></span>

                                Admin:{" "}
                                {user?.name || "Admin"}

                            </span>


                            {/* ==================================
                                LOGOUT
                            ================================== */}

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
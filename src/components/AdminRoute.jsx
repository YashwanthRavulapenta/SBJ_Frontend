import React from "react";

import {
    Navigate,
    Outlet,
    useLocation
} from "react-router-dom";


const AdminRoute = () => {

    const location = useLocation();


    // ==========================================
    // GET TOKEN
    // ==========================================

    const token =
        localStorage.getItem("token");


    // ==========================================
    // GET USER
    // ==========================================

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
    // NOT LOGGED IN
    // ==========================================

    if (!token || !user) {

        return (

            <Navigate
                to="/login"
                replace
                state={{
                    message:
                        "Please login as admin first to access this page."
                }}
            />

        );
    }


    // ==========================================
    // LOGGED IN BUT NOT ADMIN
    // ==========================================

    if (user.role !== "admin") {

        localStorage.removeItem("token");

        localStorage.removeItem("user");


        return (

            <Navigate
                to="/login"
                replace
                state={{
                    message:
                        "You are not an admin. You are not authorized to access product management."
                }}
            />

        );
    }


    // ==========================================
    // ADMIN
    // ==========================================

    return <Outlet />;
};


export default AdminRoute;
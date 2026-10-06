import React, {
    useEffect,
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import axios from "axios";

import "../styles/AdminProducts.css";


// ==========================================
// BACKEND BASE URL
// ==========================================

const BASE_URL =
    "https://sjb-backend-01lg.onrender.com";


const Jewellery = () => {

    const [jewellery, setJewellery] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const navigate =
        useNavigate();


    // ==========================================
    // GET ALL JEWELLERY
    // ==========================================

    const getJewellery = async () => {

        try {

            setLoading(true);


            const response =
                await axios.get(
                    `${BASE_URL}/api/jewellery`
                );


            setJewellery(
                response.data
            );


        } catch (error) {

            console.error(
                "Error fetching jewellery:",
                error
            );


            if (
                error.response?.status === 401
            ) {

                alert(
                    "Please login first."
                );


                navigate(
                    "/login"
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // LOAD JEWELLERY
    // ==========================================

    useEffect(() => {

        getJewellery();

    }, []);


    // ==========================================
    // DELETE JEWELLERY
    // ==========================================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this jewellery?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            // ==================================
            // GET JWT TOKEN
            // ==================================

            const token =
                localStorage.getItem(
                    "token"
                );


            // ==================================
            // CHECK LOGIN
            // ==================================

            if (!token) {

                alert(
                    "Please login first."
                );


                navigate(
                    "/login"
                );


                return;

            }


            // ==================================
            // DELETE REQUEST
            // ==================================

            const response =
                await axios.delete(

                    `${BASE_URL}/api/jewellery/${id}`,

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );


            console.log(
                "Delete response:",
                response.data
            );


            // ==================================
            // REMOVE FROM UI
            // ==================================

            setJewellery((prev) =>
                prev.filter(
                    (item) =>
                        item._id !== id
                )
            );


            alert(
                "Jewellery deleted successfully"
            );


        } catch (error) {

            console.error(
                "Delete error:",
                error
            );


            console.error(
                "Status:",
                error.response?.status
            );


            console.error(
                "Backend response:",
                error.response?.data
            );


            // ==================================
            // UNAUTHORIZED
            // ==================================

            if (
                error.response?.status === 401
            ) {

                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "user"
                );


                alert(
                    "Your login session is invalid or expired. Please login again."
                );


                navigate(
                    "/login",
                    {
                        replace: true,

                        state: {
                            message:
                                "Please login again."
                        }

                    }
                );


                return;
            }


            // ==================================
            // OTHER ERROR
            // ==================================

            alert(
                error.response?.data?.message ||
                "Failed to delete jewellery"
            );

        }

    };


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="admin-page">


            {/* ======================================
                HEADER
            ====================================== */}

            <div className="admin-header">

                <div>

                    <h1>
                        Jewellery
                    </h1>


                    <p className="admin-label">

                        Manage your jewellery products

                    </p>

                </div>


                <div className="admin-header-actions">

                    <Link
                        to="/jewelleryForm"
                        className="add-product-btn"
                    >

                        + Add Jewellery

                    </Link>


                    <button
                        type="button"
                        className="back-btn"
                        onClick={() =>
                            navigate(-1)
                        }
                    >

                        Back

                    </button>

                </div>

            </div>


            {/* ======================================
                LOADING
            ====================================== */}

            {loading && (

                <div className="admin-loading">

                    Loading jewellery...

                </div>

            )}


            {/* ======================================
                EMPTY
            ====================================== */}

            {!loading &&
                jewellery.length === 0 && (

                    <div className="empty-products">

                        <h2>
                            No Jewellery Found
                        </h2>


                        <p>

                            Add your first jewellery
                            product.

                        </p>


                        <Link
                            to="/jewelleryForm"
                            className="add-product-btn"
                        >

                            Add Jewellery

                        </Link>

                    </div>

                )}


            {/* ======================================
                PRODUCTS
            ====================================== */}

            {!loading &&
                jewellery.length > 0 && (

                    <div className="products-grid">

                        {jewellery.map(
                            (item) => (

                                <div
                                    className="admin-product-card"
                                    key={item._id}
                                >


                                    {/* ================================
                                        IMAGE
                                    ================================= */}

                                    <div className="product-image-wrapper">

                                        {item.image ? (

                                            <img
                                                src={
                                                    item.image
                                                }
                                                alt={
                                                    item.name
                                                }
                                                className="admin-product-image"
                                            />

                                        ) : (

                                            <div className="no-image">

                                                No Image

                                            </div>

                                        )}


                                        {/* SOLD OUT */}

                                        {item.isAvailable === false && (

                                            <div className="sold-out-ribbon">

                                                SOLD OUT

                                            </div>

                                        )}

                                    </div>


                                    {/* ================================
                                        INFO
                                    ================================= */}

                                    <div className="product-info">

                                        <span className="product-category">

                                            {item.category}

                                        </span>


                                        <h3>

                                            {item.name}

                                        </h3>


                                        <div className="product-meta">

                                            ₹{item.price}

                                        </div>

                                    </div>


                                    {/* ================================
                                        ACTIONS
                                    ================================= */}

                                    <div className="product-actions">


                                        {/* VIEW */}

                                        <Link
                                            to={`/admin/view/jewellery/${item._id}`}
                                            className="view-btn"
                                        >

                                            View

                                        </Link>


                                        {/* UPDATE */}

                                        <Link
                                            to={`/admin/update/jewellery/${item._id}`}
                                            className="edit-btn"
                                        >

                                            Update

                                        </Link>


                                        {/* DELETE */}

                                        <button
                                            type="button"
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDelete(
                                                    item._id
                                                )
                                            }
                                        >

                                            Delete

                                        </button>


                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

        </div>

    );

};


export default Jewellery;
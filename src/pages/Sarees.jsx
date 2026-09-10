import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminProducts.css";

const BASE_URL = "https://sjb-backend-01lg.onrender.com";

const Sarees = () => {

    const [sarees, setSarees] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    // ==========================================
    // GET ALL SAREES
    // ==========================================

    const getSarees = async () => {

        try {

            setLoading(true);

            const response = await axios.get(
                `${BASE_URL}/api/sarees`
            );

            setSarees(response.data);

        } catch (error) {

            console.error(
                "Error fetching sarees:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        getSarees();

    }, []);


    // ==========================================
    // DELETE SAREE
    // ==========================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this saree?"
        );

        if (!confirmDelete) return;


        try {

            await axios.delete(
                `${BASE_URL}/api/sarees/${id}`
            );


            setSarees((prev) =>
                prev.filter(
                    (item) => item._id !== id
                )
            );


            alert(
                "Saree deleted successfully"
            );


        } catch (error) {

            console.error(
                "Delete error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete saree"
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
                        Sarees
                    </h1>

                    <p className="admin-label">
                        Manage your saree products
                    </p>

                </div>


                <div className="admin-header-actions">

                    <Link
                        to="/sareeForm"
                        className="add-product-btn"
                    >
                        + Add Saree
                    </Link>


                    <button
                        type="button"
                        className="back-btn"
                        onClick={() => navigate(-1)}
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
                    Loading sarees...
                </div>

            )}


            {/* ======================================
                EMPTY
            ====================================== */}

            {!loading &&
                sarees.length === 0 && (

                    <div className="empty-products">

                        <h2>
                            No Sarees Found
                        </h2>

                        <p>
                            Add your first saree product.
                        </p>


                        <Link
                            to="/sareeForm"
                            className="add-product-btn"
                        >
                            Add Saree
                        </Link>

                    </div>

                )}


            {/* ======================================
                PRODUCTS
            ====================================== */}

            {!loading &&
                sarees.length > 0 && (

                    <div className="products-grid">

                        {sarees.map((saree) => (

                            <div
                                className="admin-product-card"
                                key={saree._id}
                            >


                                {/* ==================================
                                    IMAGE
                                ================================== */}

                                <div className="product-image-wrapper">

                                    {saree.image ? (

                                        <img
                                            src={saree.image}
                                            alt={saree.name}
                                            className="admin-product-image"
                                        />

                                    ) : (

                                        <div className="no-image">
                                            No Image
                                        </div>

                                    )}


                                    {/* SOLD OUT */}

                                    {saree.isAvailable === false && (

                                        <div className="sold-out-ribbon">
                                            SOLD OUT
                                        </div>

                                    )}

                                </div>


                                {/* ==================================
                                    INFO
                                ================================== */}

                                <div className="product-info">

                                    <span className="product-category">
                                        {saree.category}
                                    </span>


                                    <h3>
                                        {saree.name}
                                    </h3>


                                    <p>
                                        Color:{" "}
                                        {saree.color}
                                    </p>


                                    <div className="product-meta">
                                        ₹{saree.price}
                                    </div>

                                </div>


                                {/* ==================================
                                    ACTIONS
                                ================================== */}

                                <div className="product-actions">


                                    <Link
                                        to={`/admin/view/sarees/${saree._id}`}
                                        className="view-btn"
                                    >
                                        View
                                    </Link>


                                    <Link
                                        to={`/admin/update/sarees/${saree._id}`}
                                        className="edit-btn"
                                    >
                                        Update
                                    </Link>


                                    <button
                                        type="button"
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(
                                                saree._id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>


                                </div>

                            </div>

                        ))}

                    </div>

                )}

        </div>

    );
};

export default Sarees;
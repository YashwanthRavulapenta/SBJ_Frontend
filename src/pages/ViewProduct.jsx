import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";

import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import "../styles/AdminProducts.css";


const BASE_URL =
    "https://sjb-backend-01lg.onrender.com";


const ViewProduct = () => {

    const {
        type,
        id
    } = useParams();


    const navigate = useNavigate();


    const isSaree =
        type === "sarees";


    const [product, setProduct] =
        useState(null);


    const [loading, setLoading] =
        useState(true);


    // ==========================================
    // GET PRODUCT
    // ==========================================

    useEffect(() => {

        const getProduct = async () => {

            try {

                setLoading(true);


                const response =
                    await axios.get(
                        `${BASE_URL}/api/${type}/${id}`
                    );


                setProduct(
                    response.data
                );


            } catch (error) {

                console.error(
                    "Error loading product:",
                    error
                );


                alert(
                    error.response?.data?.message ||
                    "Failed to load product"
                );


                navigate(
                    isSaree
                        ? "/sarees"
                        : "/jewellery"
                );


            } finally {

                setLoading(false);

            }

        };


        getProduct();

    }, [
        type,
        id,
        navigate,
        isSaree
    ]);


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="admin-loading">

                Loading product...

            </div>

        );

    }


    // ==========================================
    // NOT FOUND
    // ==========================================

    if (!product) {

        return (

            <div className="empty-products">

                <h2>
                    Product Not Found
                </h2>

                <button
                    className="back-list-btn"
                    onClick={() =>
                        navigate(
                            isSaree
                                ? "/sarees"
                                : "/jewellery"
                        )
                    }
                >
                    Back
                </button>

            </div>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="admin-page">


            {/* ==================================
                HEADER
            ================================== */}

            <div className="admin-header">

                <div>

                    <h1>
                        Product Details
                    </h1>

                    <p className="admin-label">
                        View complete product information
                    </p>

                </div>


                <button
                    type="button"
                    className="back-btn"
                    onClick={() =>
                        navigate(
                            isSaree
                                ? "/sarees"
                                : "/jewellery"
                        )
                    }
                >
                    ← Back
                </button>

            </div>


            {/* ==================================
                PRODUCT DETAILS
            ================================== */}

            <div className="product-details">


                {/* ==================================
                    IMAGE
                ================================== */}

                <div className="details-image-section">

                    {product.image ? (

                        <img
                            src={product.image}
                            alt={product.name}
                            className="details-image"
                        />

                    ) : (

                        <div className="details-no-image">
                            No Image Available
                        </div>

                    )}


                    {/* SOLD OUT */}

                    {product.isAvailable === false && (

                        <div className="details-sold-out">
                            SOLD OUT
                        </div>

                    )}

                </div>


                {/* ==================================
                    DETAILS
                ================================== */}

                <div className="details-content">


                    <span className="product-type">

                        {isSaree
                            ? "SAREE"
                            : "JEWELLERY"}

                    </span>


                    <h2>
                        {product.name}
                    </h2>


                    <div className="detail-row">

                        <span>
                            Category
                        </span>

                        <strong>
                            {product.category}
                        </strong>

                    </div>


                    {/* SAREE COLOR */}

                    {isSaree && (

                        <div className="detail-row">

                            <span>
                                Color
                            </span>

                            <strong>
                                {product.color}
                            </strong>

                        </div>

                    )}


                    {/* PRICE */}

                    <div className="detail-row">

                        <span>
                            Price
                        </span>

                        <strong className="product-price">
                            ₹{product.price}
                        </strong>

                    </div>


                    {/* AVAILABILITY */}

                    <div className="detail-row">

                        <span>
                            Availability
                        </span>


                        <strong
                            className={
                                product.isAvailable === false
                                    ? "status-sold"
                                    : "status-available"
                            }
                        >

                            {product.isAvailable === false
                                ? "Sold Out"
                                : "Available"}

                        </strong>

                    </div>


                    {/* ==================================
                        ACTIONS
                    ================================== */}

                    <div className="details-actions">


                        <Link
                            to={`/admin/update/${type}/${id}`}
                            className="edit-btn"
                        >
                            Update Product
                        </Link>


                        <button
                            type="button"
                            className="back-list-btn"
                            onClick={() =>
                                navigate(
                                    isSaree
                                        ? "/sarees"
                                        : "/jewellery"
                                )
                            }
                        >
                            Back to Products
                        </button>


                    </div>

                </div>

            </div>

        </div>

    );

};

export default ViewProduct;
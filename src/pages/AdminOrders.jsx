import React, { useEffect, useState } from "react";
import "../styles/AdminOrders.css";

const API_URL = "https://sjb-backend-01lg.onrender.com";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    // =========================================
    // FETCH ALL ORDERS
    // =========================================

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");

           const response = await fetch(
            `${API_URL}/api/orders/admin/all`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch orders"
                );
            }

            setOrders(data.orders || []);
        } catch (error) {
            console.error("FETCH ORDERS ERROR:", error);

            setError(
                error.message || "Unable to load orders"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // =========================================
    // FORMAT DATE
    // =========================================

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    // =========================================
    // STATUS CLASS
    // =========================================

    const getStatusClass = (status) => {
        if (!status) return "";

        return status
            .toLowerCase()
            .replace(/_/g, "-");
    };

    // =========================================
    // LOADING
    // =========================================

    if (loading) {
        return (
            <div className="admin-orders-page">
                <div className="orders-header">
                    <div>
                        <h1>Customer Orders</h1>
                        <p>Loading orders...</p>
                    </div>
                </div>

                <div className="orders-loading">
                    <div className="loading-spinner"></div>
                    <p>Fetching customer orders...</p>
                </div>
            </div>
        );
    }

    // =========================================
    // ERROR
    // =========================================

    if (error) {
        return (
            <div className="admin-orders-page">
                <div className="orders-error">
                    <h2>Unable to load orders</h2>

                    <p>{error}</p>

                    <button onClick={fetchOrders}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // =========================================
    // UI
    // =========================================

    return (
        <div className="admin-orders-page">

            {/* =====================================
                HEADER
            ====================================== */}

            <div className="orders-header">

                <div>
                    <h1>Customer Orders</h1>

                    <p>
                        View and manage all customer orders
                    </p>
                </div>

                <div className="orders-count-box">
                    <span>{orders.length}</span>
                    <small>Total Orders</small>
                </div>

            </div>


            {/* =====================================
                NO ORDERS
            ====================================== */}

            {orders.length === 0 ? (

                <div className="no-orders">

                    <div className="no-orders-icon">
                        🛍️
                    </div>

                    <h2>No Orders Yet</h2>

                    <p>
                        Customer orders will appear here.
                    </p>

                </div>

            ) : (

                <div className="orders-grid">

                    {orders.map((order) => (

                        <div
                            className="admin-order-card"
                            key={order._id}
                        >

                            {/* CARD HEADER */}

                            <div className="order-card-header">

                                <div>

                                    <span className="order-label">
                                        ORDER
                                    </span>

                                    <h3>
                                        #{order._id.slice(-8).toUpperCase()}
                                    </h3>

                                </div>

                                <span
                                    className={`order-status ${getStatusClass(
                                        order.orderStatus
                                    )}`}
                                >
                                    {order.orderStatus?.replace(
                                        /_/g,
                                        " "
                                    )}
                                </span>

                            </div>


                            {/* CUSTOMER */}

                            <div className="customer-section">

                                <div className="customer-avatar">
                                    {order.user?.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "U"}
                                </div>

                                <div className="customer-info">

                                    <h4>
                                        {order.user?.name ||
                                            order.shippingAddress?.fullName ||
                                            "Unknown Customer"}
                                    </h4>

                                    <p>
                                        {order.user?.phone ||
                                            order.shippingAddress?.phone ||
                                            "No phone"}
                                    </p>

                                </div>

                            </div>


                            {/* DATE */}

                            <div className="order-date">

                                <span>📅</span>

                                <div>
                                    <small>Ordered On</small>

                                    <p>
                                        {formatDate(
                                            order.createdAt
                                        )}
                                    </p>
                                </div>

                            </div>


                            {/* PRODUCTS */}

                            <div className="order-products">

                                <div className="section-title">
                                    Products
                                </div>

                                {order.items?.map(
                                    (item, index) => (

                                        <div
                                            className="order-product"
                                            key={`${item.productId}-${index}`}
                                        >

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                            />

                                            <div className="product-info">

                                                <h4>
                                                    {item.name}
                                                </h4>

                                                <p>
                                                    {item.category}
                                                </p>

                                                <span>
                                                    Qty:{" "}
                                                    {item.quantity}
                                                </span>

                                            </div>

                                            <strong>
                                                ₹
                                                {Number(
                                                    item.totalPrice || 0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </strong>

                                        </div>

                                    )
                                )}

                            </div>


                            {/* TOTAL */}

                            <div className="order-total">

                                <span>
                                    Total Amount
                                </span>

                                <strong>
                                    ₹
                                    {Number(
                                        order.totalAmount || 0
                                    ).toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>

                            </div>


                            {/* PAYMENT */}

                            <div className="order-payment">

                                <span>
                                    Payment
                                </span>

                                <span
                                    className={`payment-status ${
                                        order.paymentStatus
                                    }`}
                                >
                                    {order.paymentStatus}
                                </span>

                            </div>


                            {/* BUTTON */}

                            <button
                                className="view-order-btn"
                                onClick={() =>
                                    setSelectedOrder(order)
                                }
                            >
                                View Full Details
                                <span>→</span>
                            </button>

                        </div>

                    ))}

                </div>

            )}


            {/* =====================================
                ORDER DETAILS MODAL
            ====================================== */}

            {selectedOrder && (

                <div
                    className="order-modal-overlay"
                    onClick={() =>
                        setSelectedOrder(null)
                    }
                >

                    <div
                        className="order-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* MODAL HEADER */}

                        <div className="modal-header">

                            <div>

                                <span>
                                    ORDER DETAILS
                                </span>

                                <h2>
                                    #
                                    {selectedOrder._id
                                        .slice(-8)
                                        .toUpperCase()}
                                </h2>

                            </div>

                            <button
                                className="close-modal"
                                onClick={() =>
                                    setSelectedOrder(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        {/* CUSTOMER DETAILS */}

                        <section className="detail-section">

                            <h3>
                                Customer Information
                            </h3>

                            <div className="detail-grid">

                                <div>
                                    <label>Name</label>

                                    <p>
                                        {selectedOrder.user?.name ||
                                            selectedOrder.shippingAddress?.fullName ||
                                            "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <label>Phone</label>

                                    <p>
                                        {selectedOrder.user?.phone ||
                                            selectedOrder.shippingAddress?.phone ||
                                            "N/A"}
                                    </p>
                                </div>

                                {selectedOrder.user?.email && (
                                    <div>
                                        <label>Email</label>

                                        <p>
                                            {selectedOrder.user.email}
                                        </p>
                                    </div>
                                )}

                            </div>

                        </section>


                        {/* ORDER DATE */}

                        <section className="detail-section">

                            <h3>
                                Order Information
                            </h3>

                            <div className="detail-grid">

                                <div>
                                    <label>Order Date</label>

                                    <p>
                                        {formatDate(
                                            selectedOrder.createdAt
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <label>Payment</label>

                                    <p
                                        className={`detail-status ${selectedOrder.paymentStatus}`}
                                    >
                                        {selectedOrder.paymentStatus}
                                    </p>
                                </div>

                                <div>
                                    <label>Order Status</label>

                                    <p
                                        className={`detail-status ${getStatusClass(
                                            selectedOrder.orderStatus
                                        )}`}
                                    >
                                        {selectedOrder.orderStatus?.replace(
                                            /_/g,
                                            " "
                                        )}
                                    </p>
                                </div>

                            </div>

                        </section>


                        {/* SHIPPING ADDRESS */}

                        <section className="detail-section">

                            <h3>
                                Shipping Address
                            </h3>

                            <div className="address-box">

                                <strong>
                                    {
                                        selectedOrder
                                            .shippingAddress
                                            ?.fullName
                                    }
                                </strong>

                                <p>
                                    {
                                        selectedOrder
                                            .shippingAddress
                                            ?.phone
                                    }
                                </p>

                                <p>
                                    {
                                        selectedOrder
                                            .shippingAddress
                                            ?.address
                                    }
                                </p>

                                <p>
                                    {
                                        selectedOrder
                                            .shippingAddress
                                            ?.city
                                    }
                                    ,{" "}
                                    {
                                        selectedOrder
                                            .shippingAddress
                                            ?.state
                                    }
                                </p>

                                <p>
                                    Pincode:{" "}
                                    {
                                        selectedOrder
                                            .shippingAddress
                                            ?.pincode
                                    }
                                </p>

                            </div>

                        </section>


                        {/* PRODUCTS */}

                        <section className="detail-section">

                            <h3>
                                Ordered Products
                            </h3>

                            <div className="detailed-products">

                                {selectedOrder.items?.map(
                                    (item, index) => (

                                        <div
                                            className="detailed-product"
                                            key={`${item.productId}-${index}`}
                                        >

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                            />

                                            <div className="detailed-product-info">

                                                <h4>
                                                    {item.name}
                                                </h4>

                                                <p>
                                                    Category:{" "}
                                                    {item.category}
                                                </p>

                                                <p>
                                                    Product Type:{" "}
                                                    {item.productType}
                                                </p>

                                                <p>
                                                    Quantity:{" "}
                                                    <strong>
                                                        {item.quantity}
                                                    </strong>
                                                </p>

                                            </div>

                                            <div className="detailed-product-price">

                                                <small>
                                                    Original
                                                </small>

                                                <del>
                                                    ₹
                                                    {Number(
                                                        item.originalPrice ||
                                                            0
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </del>

                                                <strong>
                                                    ₹
                                                    {Number(
                                                        item.discountedPrice ||
                                                            0
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </strong>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </section>


                        {/* PRICE SUMMARY */}

                        <section className="detail-section">

                            <h3>
                                Payment Summary
                            </h3>

                            <div className="price-summary">

                                <div>
                                    <span>
                                        Subtotal
                                    </span>

                                    <strong>
                                        ₹
                                        {Number(
                                            selectedOrder.subtotal ||
                                                0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Discount
                                    </span>

                                    <strong className="discount">
                                        - ₹
                                        {Number(
                                            selectedOrder.discount ||
                                                0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Delivery Charge
                                    </span>

                                    <strong>
                                        ₹
                                        {Number(
                                            selectedOrder.deliveryCharge ||
                                                0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </strong>
                                </div>

                                <div className="grand-total">

                                    <span>
                                        Total Amount
                                    </span>

                                    <strong>
                                        ₹
                                        {Number(
                                            selectedOrder.totalAmount ||
                                                0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </strong>

                                </div>

                            </div>

                        </section>


                        {/* RAZORPAY */}

                        {selectedOrder.razorpayPaymentId && (

                            <section className="detail-section">

                                <h3>
                                    Payment Reference
                                </h3>

                                <div className="payment-reference">

                                    <span>
                                        Razorpay Payment ID
                                    </span>

                                    <code>
                                        {
                                            selectedOrder
                                                .razorpayPaymentId
                                        }
                                    </code>

                                </div>

                            </section>

                        )}

                    </div>

                </div>

            )}

        </div>
    );
};

export default AdminOrders;
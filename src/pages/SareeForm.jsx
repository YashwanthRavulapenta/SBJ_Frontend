import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ProductForm.css";

const BASE_URL = "https://sjb-backend-01lg.onrender.com";

const SareeForm = () => {

    const navigate = useNavigate();


    // ==========================================
    // FORM DATA
    // ==========================================

    const [formData, setFormData] = useState({

        name: "",

        category: "",

        color: "",

        price: "",

        image: null,

        isAvailable: true

    });


    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(false);


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData((prev) => ({

            ...prev,

            [name]: value

        }));

    };


    // ==========================================
    // IMAGE CHANGE
    // ==========================================

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;


        setFormData((prev) => ({

            ...prev,

            image: file

        }));


        setPreview(
            URL.createObjectURL(file)
        );

    };


    // ==========================================
    // AVAILABILITY
    // ==========================================

    const handleAvailabilityChange = (value) => {

        setFormData((prev) => ({

            ...prev,

            isAvailable: value

        }));

    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!formData.image) {

            alert(
                "Please select an image"
            );

            return;

        }


        try {

            setLoading(true);


            const data = new FormData();


            data.append(
                "image",
                formData.image
            );


            data.append(
                "name",
                formData.name.trim()
            );


            data.append(
                "category",
                formData.category
            );


            data.append(
                "color",
                formData.color.trim()
            );


            data.append(
                "price",
                formData.price
            );


            data.append(
                "isAvailable",
                String(formData.isAvailable)
            );


            await axios.post(

                `${BASE_URL}/api/sarees/add`,

                data,

                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }

            );


            alert(
                "Saree added successfully"
            );


            navigate("/sarees");


        } catch (error) {

            console.error(
                "Add Saree Error:",
                error
            );


            alert(

                error.response?.data?.message ||

                "Failed to add saree"

            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="product-form-page">


            {/* ======================================
                HEADER
            ====================================== */}

            <div className="product-form-header">

                <div>

                    <h1>
                        Add Saree
                    </h1>

                    <p>
                        Add a new saree product
                    </p>

                </div>


                <button
                    type="button"
                    className="product-back-btn"
                    onClick={() =>
                        navigate("/sarees")
                    }
                >
                    ← Back
                </button>

            </div>


            {/* ======================================
                FORM
            ====================================== */}

            <form
                className="product-form-card"
                onSubmit={handleSubmit}
            >


                {/* ==================================
                    IMAGE
                ================================== */}

                <div className="product-form-group">

                    <label className="product-form-label">

                        Product Image

                        <span className="required">
                            *
                        </span>

                    </label>


                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />


                    {preview && (

                        <div className="product-image-preview">

                            <img
                                src={preview}
                                alt="Saree Preview"
                            />

                        </div>

                    )}

                </div>


                {/* ==================================
                    NAME
                ================================== */}

                <div className="product-form-group">

                    <label>
                        Saree Name
                    </label>


                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter saree name"
                        required
                    />

                </div>


                {/* ==================================
                    CATEGORY
                ================================== */}

                <div className="product-form-group">

                    <label>
                        Category
                    </label>


                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Category
                        </option>

                        <option value="Cotton Sarees">
                            Cotton Sarees
                        </option>

                        <option value="Chiffon Saree">
                            Chiffon Saree
                        </option>

                        <option value="Silk Sarees">
                            Silk Sarees
                        </option>

                        <option value="Georgette Saree">
                            Georgette Saree
                        </option>

                        <option value="Kanjivaram Saree">
                            Kanjivaram Saree
                        </option>

                    </select>

                </div>


                {/* ==================================
                    COLOR
                ================================== */}

                <div className="product-form-group">

                    <label>
                        Color
                    </label>


                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        placeholder="Enter saree color"
                        required
                    />

                </div>


                {/* ==================================
                    PRICE
                ================================== */}

                <div className="product-form-group">

                    <label>
                        Price
                    </label>


                    <div className="price-input-wrapper">

                        <span className="price-symbol">
                            ₹
                        </span>


                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            min="0"
                            required
                        />

                    </div>

                </div>


                {/* ==================================
                    AVAILABILITY
                ================================== */}

                <div className="product-form-group">

                    <label>
                        Availability
                    </label>


                    <div className="availability-options">


                        <label className="availability-option">

                            <input
                                type="radio"
                                name="availability"
                                checked={
                                    formData.isAvailable === true
                                }
                                onChange={() =>
                                    handleAvailabilityChange(
                                        true
                                    )
                                }
                            />

                            <span>
                                Available
                            </span>

                        </label>


                        <label className="availability-option">

                            <input
                                type="radio"
                                name="availability"
                                checked={
                                    formData.isAvailable === false
                                }
                                onChange={() =>
                                    handleAvailabilityChange(
                                        false
                                    )
                                }
                            />

                            <span>
                                Sold Out
                            </span>

                        </label>

                    </div>

                </div>


                {/* ==================================
                    BUTTONS
                ================================== */}

                <div className="product-form-footer">

                    <button
                        type="button"
                        className="product-cancel-btn"
                        onClick={() =>
                            navigate("/sarees")
                        }
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="product-submit-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Adding..."
                            : "Add Saree"}

                    </button>

                </div>

            </form>

        </div>

    );
};

export default SareeForm;
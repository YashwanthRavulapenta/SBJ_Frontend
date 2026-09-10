import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ProductForm.css";

const BASE_URL = "https://sjb-backend-01lg.onrender.com";

const JewelleryForm = () => {

    const navigate = useNavigate();

    // ==========================================
    // FORM DATA
    // ==========================================

    const [formData, setFormData] = useState({

        name: "",

        category: "",

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


        // Check image type

        if (!file.type.startsWith("image/")) {

            alert("Please select a valid image");

            return;

        }


        // Check image size

        if (file.size > 5 * 1024 * 1024) {

            alert("Image size must be less than 5MB");

            return;

        }


        setFormData((prev) => ({

            ...prev,

            image: file

        }));


        // Preview

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


        // ========================================
        // VALIDATION
        // ========================================

        if (!formData.image) {

            alert("Please select a jewellery image");

            return;

        }


        if (!formData.name.trim()) {

            alert("Please enter jewellery name");

            return;

        }


        if (!formData.category) {

            alert("Please select a category");

            return;

        }


        if (
            formData.price === "" ||
            Number(formData.price) < 0
        ) {

            alert("Please enter a valid price");

            return;

        }


        try {

            setLoading(true);


            // ========================================
            // FORM DATA
            // ========================================

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
                "price",
                formData.price
            );


            // IMPORTANT
            // FormData converts this to "true"/"false"

            data.append(
                "isAvailable",
                String(formData.isAvailable)
            );


            // ========================================
            // DEBUG
            // ========================================

            console.log(
                "Name:",
                formData.name
            );

            console.log(
                "Category:",
                formData.category
            );

            console.log(
                "Price:",
                formData.price
            );

            console.log(
                "isAvailable:",
                formData.isAvailable,
                typeof formData.isAvailable
            );

            console.log(
                "FormData isAvailable:",
                data.get("isAvailable")
            );


            // ========================================
            // API
            // ========================================

            await axios.post(

                `${BASE_URL}/api/jewellery/add`,

                data

            );


            // ========================================
            // SUCCESS
            // ========================================

            alert(
                "Jewellery added successfully"
            );


            navigate("/jewellery");


        } catch (error) {

            console.error(
                "Add Jewellery Error:",
                error
            );


            alert(

                error.response?.data?.message ||

                "Failed to add jewellery"

            );


        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // JSX
    // ==========================================

    return (

        <div className="product-form-page">


            {/* ======================================
                HEADER
            ====================================== */}

            <div className="product-form-header">

                <div>

                    <h1>
                        Add Jewellery
                    </h1>

                    <p>
                        Add a new jewellery product
                    </p>

                </div>


                <button

                    type="button"

                    className="product-back-btn"

                    onClick={() =>
                        navigate("/jewellery")
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

                        Jewellery Image

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

                                alt="Jewellery Preview"

                            />

                        </div>

                    )}

                </div>


                {/* ==================================
                    NAME
                ================================== */}

                <div className="product-form-group">

                    <label>

                        Jewellery Name

                        <span className="required">
                            *
                        </span>

                    </label>


                    <input

                        type="text"

                        name="name"

                        value={formData.name}

                        onChange={handleChange}

                        placeholder="Enter jewellery name"

                        required

                        maxLength="100"

                    />

                </div>


                {/* ==================================
                    CATEGORY
                ================================== */}

                <div className="product-form-group">

                    <label>

                        Category

                        <span className="required">
                            *
                        </span>

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


                        <option value="Necklace">

                            Necklace

                        </option>


                        <option value="Earrings">

                            Earrings

                        </option>


                        <option value="Bangles">

                            Bangles

                        </option>


                        <option value="Bracelet">

                            Bracelet

                        </option>


                        <option value="Ring">

                            Ring

                        </option>


                        <option value="Jewellery Set">

                            Jewellery Set

                        </option>

                    </select>

                </div>


                {/* ==================================
                    PRICE
                ================================== */}

                <div className="product-form-group">

                    <label>

                        Price

                        <span className="required">
                            *
                        </span>

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

                            step="1"

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

                        <span className="required">
                            *
                        </span>

                    </label>


                    <div className="availability-options">


                        {/* AVAILABLE */}

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


                        {/* SOLD OUT */}

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
                            navigate("/jewellery")
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

                            : "Add Jewellery"

                        }

                    </button>

                </div>


            </form>

        </div>

    );

};


export default JewelleryForm;
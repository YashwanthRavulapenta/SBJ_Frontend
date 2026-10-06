import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import "../styles/ProductForm.css";


// ==========================================
// BACKEND BASE URL
// ==========================================

const BASE_URL =
    "https://sjb-backend-01lg.onrender.com";


const UpdateProduct = () => {

    const {
        type,
        id
    } = useParams();


    const navigate = useNavigate();


    const isSaree =
        type === "sarees";


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


    const [oldImage, setOldImage] =
        useState("");


    const [preview, setPreview] =
        useState(null);


    const [loading, setLoading] =
        useState(true);


    const [updating, setUpdating] =
        useState(false);


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


                const product =
                    response.data;


                if (!product) {

                    alert(
                        "Product not found"
                    );


                    navigate(
                        isSaree
                            ? "/sarees"
                            : "/jewellery"
                    );


                    return;

                }


                // ==================================
                // SET EXISTING VALUES
                // ==================================

                setFormData({

                    name:
                        product.name || "",

                    category:
                        product.category || "",

                    color:
                        product.color || "",

                    price:
                        product.price ?? "",

                    image:
                        null,

                    isAvailable:
                        product.isAvailable !== undefined
                            ? product.isAvailable
                            : true

                });


                setOldImage(
                    product.image || ""
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
    // IMAGE
    // ==========================================

    const handleImageChange = (e) => {

        const file =
            e.target.files[0];


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

    const handleAvailabilityChange =
        (value) => {

            setFormData((prev) => ({

                ...prev,

                isAvailable: value

            }));

        };


    // ==========================================
    // UPDATE PRODUCT
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            setUpdating(true);


            // ==================================
            // GET JWT TOKEN
            // ==================================

            const token =
                localStorage.getItem("token");


            if (!token) {

                alert(
                    "Please login first"
                );


                return;

            }


            // ==================================
            // CREATE FORM DATA
            // ==================================

            const data =
                new FormData();


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


            data.append(
                "isAvailable",
                String(
                    formData.isAvailable
                )
            );


            // ==================================
            // SAREE COLOR
            // ==================================

            if (isSaree) {

                data.append(
                    "color",
                    formData.color.trim()
                );

            }


            // ==================================
            // NEW IMAGE
            // ==================================

            if (formData.image) {

                data.append(
                    "image",
                    formData.image
                );

            }


            // ==================================
            // UPDATE API
            // ==================================

            const response =
                await axios.put(

                    `${BASE_URL}/api/${type}/${id}`,

                    data,

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );


            console.log(
                "Update response:",
                response.data
            );


            // ==================================
            // SUCCESS
            // ==================================

            alert(
                `${isSaree
                    ? "Saree"
                    : "Jewellery"
                } updated successfully`
            );


            navigate(
                isSaree
                    ? "/sarees"
                    : "/jewellery"
            );


        } catch (error) {

            console.error(
                "Update error:",
                error
            );


            console.error(
                "Backend response:",
                error.response?.data
            );


            alert(
                error.response?.data?.message ||
                "Failed to update product"
            );


        } finally {

            setUpdating(false);

        }

    };


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
    // PAGE
    // ==========================================

    return (

        <div className="product-form-page">


            {/* ==================================
                HEADER
            ================================== */}

            <div className="product-form-header">

                <div>

                    <h1>

                        Update{" "}

                        {isSaree
                            ? "Saree"
                            : "Jewellery"}

                    </h1>


                    <p>

                        Edit product information

                    </p>

                </div>


                <button
                    type="button"
                    className="product-back-btn"
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
                FORM
            ================================== */}

            <form
                className="product-form-card"
                onSubmit={handleSubmit}
            >


                {/* IMAGE */}

                <div className="product-form-group">

                    <label className="product-form-label">

                        Product Image

                    </label>


                    <input
                        type="file"
                        accept="image/*"
                        onChange={
                            handleImageChange
                        }
                    />


                    {(preview || oldImage) && (

                        <div className="product-image-preview">

                            <img
                                src={
                                    preview ||
                                    oldImage
                                }
                                alt="Product"
                            />

                        </div>

                    )}


                    <small>

                        Select a new image only if
                        you want to replace the
                        current image.

                    </small>

                </div>


                {/* NAME */}

                <div className="product-form-group">

                    <label>

                        {isSaree
                            ? "Saree Name"
                            : "Jewellery Name"}

                    </label>


                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        required
                    />

                </div>


                {/* CATEGORY */}

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


                        {isSaree ? (

                            <>

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

                            </>

                        ) : (

                            <>

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

                            </>

                        )}

                    </select>

                </div>


                {/* COLOR - SAREE ONLY */}

                {isSaree && (

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

                )}


                {/* PRICE */}

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


                {/* AVAILABILITY */}

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


                {/* BUTTONS */}

                <div className="product-form-footer">

                    <button
                        type="button"
                        className="product-cancel-btn"
                        onClick={() =>
                            navigate(
                                isSaree
                                    ? "/sarees"
                                    : "/jewellery"
                            )
                        }
                    >

                        Cancel

                    </button>


                    <button
                        type="submit"
                        className="product-submit-btn"
                        disabled={updating}
                    >

                        {updating
                            ? "Updating..."
                            : "Update Product"}

                    </button>

                </div>


            </form>

        </div>

    );

};


export default UpdateProduct;
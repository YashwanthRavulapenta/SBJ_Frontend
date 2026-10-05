import React, {
    useState
} from "react";

import {
    useLocation,
    useNavigate
} from "react-router-dom";


const Login = () => {

    const navigate = useNavigate();

    const location = useLocation();


    const [phone, setPhone] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    // ==========================================
    // MESSAGE FROM ADMIN ROUTE
    // ==========================================

    const routeMessage =
        location.state?.message || "";


    // ==========================================
    // LOGIN
    // ==========================================

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        setLoading(true);


        try {

            const response =
                await fetch(
                    `${import.meta.env.API_URL}/auth/login`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            phone,
                            password
                        })
                    }
                );


            const data =
                await response.json();


            // ==================================
            // LOGIN FAILED
            // ==================================

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Invalid phone number or password"
                );

            }


            // ==================================
            // CHECK ROLE
            // ==================================

            if (
                data.user.role !== "admin"
            ) {

                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "user"
                );


                setError(
                    "You are not an admin. You are not authorized to access product management."
                );


                return;
            }


            // ==================================
            // ADMIN LOGIN SUCCESS
            // ==================================

            localStorage.setItem(
                "token",
                data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(
                    data.user
                )
            );


            // ==================================
            // GO TO PRODUCT MANAGEMENT
            // ==================================

            navigate(
                "/sarees",
                {
                    replace: true
                }
            );


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            setError(
                error.message
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div
            className="container d-flex justify-content-center align-items-center"
            style={{
                minHeight: "80vh"
            }}
        >

            <div
                className="card shadow p-4"
                style={{
                    width: "400px"
                }}
            >

                <h2 className="text-center mb-2">
                    Admin Login
                </h2>


                <p className="text-center text-muted">
                    JCollection Product Management
                </p>


                {/* =================================
                    MESSAGE
                ================================= */}

                {routeMessage && (

                    <div className="alert alert-warning">

                        {routeMessage}

                    </div>

                )}


                {/* =================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}


                <form
                    onSubmit={handleLogin}
                >

                    {/* PHONE */}

                    <div className="mb-3">

                        <label className="form-label">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) =>
                                setPhone(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="mb-3">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="btn btn-dark w-100"
                        disabled={loading}
                    >

                        {loading
                            ? "Checking..."
                            : "Login"}

                    </button>

                </form>

            </div>

        </div>
    );
};


export default Login;
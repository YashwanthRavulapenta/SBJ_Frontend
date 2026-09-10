import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    return (

        <nav className="navbar bg-black py-3">

            <div className="container">

                <div className="d-flex justify-content-center gap-4 w-100">

                    <Link
                        to="/sarees"
                        className="text-decoration-none text-white fw-semibold"
                    >
                        Sarees
                    </Link>

                    <Link
                        to="/jewellery"
                        className="text-decoration-none text-white fw-semibold"
                    >
                        Jewellery
                    </Link>


                </div>

            </div>

        </nav>

    );
};

export default Navbar;
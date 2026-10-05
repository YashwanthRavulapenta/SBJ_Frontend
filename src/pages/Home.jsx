import React from "react";

import "../styles/Home.css";


const Home = () => {

    return (

        <div className="home-page">

            <section className="home-hero">

                <h1>
                    Welcome to JCollection
                </h1>

                <p>
                    Sarees, Jewellery & Beauty
                </p>

                <p className="home-description">
                    Welcome to JCollection product
                    management. Manage your sarees
                    and jewellery products easily
                    from one place.
                </p>

            </section>


            <section className="home-categories">

                <div className="home-card">

                    <h2>
                        Sarees
                    </h2>

                    <p>
                        Explore and manage your
                        saree collection.
                    </p>

                </div>


                <div className="home-card">

                    <h2>
                        Jewellery
                    </h2>

                    <p>
                        Explore and manage your
                        jewellery collection.
                    </p>

                </div>

            </section>

        </div>

    );
};


export default Home;
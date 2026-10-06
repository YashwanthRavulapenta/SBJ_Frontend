import {
    StrictMode
} from "react";


import {
    createRoot
} from "react-dom/client";


import "bootstrap/dist/css/bootstrap.min.css";


import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom";


import Layout from "./Layout.jsx";

import AdminRoute
    from "./components/AdminRoute.jsx";

import AdminOrders from "./pages/AdminOrders";

import Home
    from "./pages/Home.jsx";

import Login
    from "./pages/Login.jsx";


import Sarees
    from "./pages/Sarees.jsx";

import SareeForm
    from "./pages/SareeForm.jsx";


import Jewellery
    from "./pages/Jewellery.jsx";

import JewelleryForm
    from "./pages/JewelleryForm.jsx";


import ViewProduct
    from "./pages/ViewProduct.jsx";

import UpdateProduct
    from "./pages/UpdateProduct.jsx";


// ==================================================
// ROUTES
// ==================================================

const routes =
    createBrowserRouter([

        // ==========================================
        // PUBLIC LAYOUT
        // ==========================================

        {
            path: "/",

            element: <Layout />,

            children: [

                // ==================================
                // HOME
                // ==================================

                {
                    index: true,

                    element: <Home />
                },


                // ==================================
                // LOGIN
                // ==================================

                {
                    path: "login",

                    element: <Login />
                },


                // ==================================
                // ADMIN PROTECTED ROUTES
                // ==================================

                {
                    element: <AdminRoute />,

                    children: [

                        // ==========================
                        // SAREES
                        // ==========================

                        {
                            path: "sarees",

                            element: <Sarees />
                        },


                        {
                            path: "sareeForm",

                            element: <SareeForm />
                        },


                        // ==========================
                        // JEWELLERY
                        // ==========================

                        {
                            path: "jewellery",

                            element: <Jewellery />
                        },


                        {
                            path: "jewelleryForm",

                            element: <JewelleryForm />
                        },

                        {
                            path: "/orders",
                            element: <AdminOrders />
                        },


                        // ==========================
                        // VIEW
                        // ==========================

                        {
                            path:
                                "admin/view/:type/:id",

                            element:
                                <ViewProduct />
                        },


                        // ==========================
                        // UPDATE
                        // ==========================

                        {
                            path:
                                "admin/update/:type/:id",

                            element:
                                <UpdateProduct />
                        }

                    ]
                }

            ]
        },


        // ==========================================
        // UNKNOWN URL
        // ==========================================

        {
            path: "*",

            element: (
                <Navigate
                    to="/"
                    replace
                />
            )
        }

    ]);


createRoot(
    document.getElementById("root")
).render(

    <StrictMode>

        <RouterProvider
            router={routes}
        />

    </StrictMode>

);
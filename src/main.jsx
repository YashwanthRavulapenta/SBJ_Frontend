import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import Layout from "./Layout.jsx";

import Sarees from "./pages/Sarees.jsx";
import SareeForm from "./pages/SareeForm.jsx";

import Jewellery from "./pages/Jewellery.jsx";
import JewelleryForm from "./pages/JewelleryForm.jsx";

import ViewProduct from "./pages/ViewProduct.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,

        children: [

            // =====================================
            // SAREES
            // =====================================

            {
                path: "/sarees",
                element: <Sarees />
            },

            {
                path: "/sareeForm",
                element: <SareeForm />
            },


            // =====================================
            // JEWELLERY
            // =====================================

            {
                path: "/jewellery",
                element: <Jewellery />
            },

            {
                path: "/jewelleryForm",
                element: <JewelleryForm />
            },


            // =====================================
            // VIEW PRODUCT
            // =====================================

            {
                path: "/admin/view/:type/:id",
                element: <ViewProduct />
            },


            // =====================================
            // UPDATE PRODUCT
            // =====================================

            {
                path: "/admin/update/:type/:id",
                element: <UpdateProduct />
            }

        ]
    }
]);


createRoot(document.getElementById("root")).render(

    <StrictMode>

        <RouterProvider router={routes} />

    </StrictMode>

);
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Single from "./pages/Single";
import {Demo} from "./pages/Demo";


const NotFound = () => (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
            <i className="fas fa-robot text-warning display-1 mb-4"></i>
            <h1 className="text-warning mb-3">404 - Page Not Found</h1>
            <p className="text-light mb-4 lead">
                These aren't the droids you're looking for...
            </p>
            <div className="d-flex gap-3 justify-content-center">
                <a href="/" className="btn btn-warning">
                    <i className="fas fa-home me-2"></i>
                    Back to Home
                </a>
                <button 
                    className="btn btn-outline-warning"
                    onClick={() => window.history.back()}
                >
                    <i className="fas fa-arrow-left me-2"></i>
                    Go Back
                </button>
            </div>
        </div>
    </div>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />, 
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "demo",
                element: <Demo />
            },
            {
                path: "single/:category/:id",
                element: <Single />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
]);
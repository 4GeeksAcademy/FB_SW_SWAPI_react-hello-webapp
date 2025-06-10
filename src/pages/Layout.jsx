import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">

            <ScrollToTop />
            

            <Navbar />
            

            <main className="flex-grow-1">
                <Outlet />
            </main>
            

            <Footer />
        </div>
    );
};

export default Layout;
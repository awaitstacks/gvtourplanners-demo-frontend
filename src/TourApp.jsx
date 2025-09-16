import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import MyProfile from "./pages/MyProfile.jsx";

import Footer from "./components/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tours from "./pages/Tours.jsx";
import TourHome from "./pages/TourHome.jsx";
import TourNavbar from "./components/TourNavbar.jsx";
import TourBooking from "./pages/Booking.jsx";
import MyBookings from "./pages/MyBookings.jsx";

const TourApp = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <TourNavbar />
      <Routes>
        <Route path="/" element={<TourHome />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:batch" element={<Tours />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/booking/:tourId" element={<TourBooking />} />

        <Route path="/my-trolly" element={<MyBookings />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default TourApp;

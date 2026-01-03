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
import TourDetails from "./pages/TourDetails.jsx";

const TourApp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Sticky/Fixed Navbar */}
      <div className="sticky top-0 z-50 bg-white ">
        <div className="mx-4 sm:mx-[10%]">
          <TourNavbar />
        </div>
      </div>

      {/* Main Content - Takes remaining space */}
      <main className="flex-1 mx-4 sm:mx-[10%]">
        <Routes>
          <Route path="/" element={<TourHome />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tour-details/:tourId" element={<TourDetails />} />
          <Route path="/tours/:batch" element={<Tours />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/booking/:tourId" element={<TourBooking />} />
          <Route path="/my-trolly" element={<MyBookings />} />
        </Routes>
      </main>

      {/* Footer - Always at bottom */}
      <footer className="mx-4 sm:mx-[10%] mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default TourApp;

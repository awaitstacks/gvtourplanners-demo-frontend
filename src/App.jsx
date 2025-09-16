import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Doctors from "./pages/Doctors.jsx";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import MyAppoinments from "./pages/MyAppoinments.jsx";
import Appoinment from "./pages/Appoinment.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tours from "./pages/Tours.jsx";
import TourHome from "./pages/TourHome.jsx";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        {/* Home tour */}

        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<TourHome />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/appointment/:docId" element={<Appoinment />} />
        <Route path="/my-appointments" element={<MyAppoinments />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

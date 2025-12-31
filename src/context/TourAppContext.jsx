// context/TourAppContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const TourAppContext = createContext();

const TourAppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [tours, setTours] = useState([]);

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  const [userData, setUserData] = useState(false);

  const getToursData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/tour/list");
      if (data.success) {
        setTours(data.tours);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // LOGOUT FUNCTION
  const logout = () => {
    setToken(false);
    setUserData(false);
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
  };

  const value = {
    tours,
    setTours,
    getToursData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    logout, // ← Added
  };

  useEffect(() => {
    getToursData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <TourAppContext.Provider value={value}>
      {props.children}
    </TourAppContext.Provider>
  );
};

export default TourAppContextProvider;

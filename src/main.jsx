import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import TourApp from "./TourApp.jsx";
import { BrowserRouter } from "react-router-dom";
import TourAppContextProvider from "./context/TourAppContext.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <TourAppContextProvider>
          <TourApp />
        </TourAppContextProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);

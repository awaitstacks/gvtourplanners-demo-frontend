import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TourApp from "./TourApp.jsx";
import { BrowserRouter } from "react-router-dom";

import AppContextProvider from "./context/AppContext.jsx";

import TourAppContextProvider from "./context/TourAppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* prescripto app */}

    {/* <AppContextProvider>
      <App />
    </AppContextProvider> */}

    {/* Tour app */}

    <TourAppContextProvider>
      <TourApp />
    </TourAppContextProvider>
  </BrowserRouter>
);

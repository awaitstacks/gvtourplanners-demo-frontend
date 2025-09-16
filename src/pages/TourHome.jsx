import React from "react";

import Banner from "../components/Banner";
import TourHeader from "../components/TourHeader";
import TourSpecialityMenu from "../components/TourSpecialityMenu";
import TopTours from "../components/TopTours";
const TourHome = () => {
  return (
    <div>
      <TourHeader />
      <TourSpecialityMenu />
      <TopTours />
      <Banner />
    </div>
  );
};

export default TourHome;

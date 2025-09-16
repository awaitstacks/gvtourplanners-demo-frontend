import React from "react";
import { batch } from "../assets/tourAsset.js";
import { Link } from "react-router-dom";

const TourSpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="speciality"
    >
      <h1 className="text-3xl font-medium">Find by categories</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of group package tours and
        schedule your tour hassle-free.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {batch.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            key={index}
            to={`/tours/${item.speciality}`}
          >
            <img className="w-16 sm:w-24 mb-2" src={item.image} alt="" />
            {/* <p>{item.speciality}</p> */}
            <p className="h-10 flex items-center justify-center text-center">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TourSpecialityMenu;

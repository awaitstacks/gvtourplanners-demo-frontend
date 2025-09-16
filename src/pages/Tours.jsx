import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";

const Tours = () => {
  const { batch } = useParams();
  const [filterTour, setFilterTour] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { tours } = useContext(TourAppContext);
  const applyFilter = () => {
    if (batch) {
      setFilterTour(tours.filter((tour) => tour.batch === batch));
    } else {
      setFilterTour(tours);
    }
  };
  useEffect(() => {
    applyFilter();
  }, [tours, batch]);
  return (
    <div>
      <p className="text-gray-600">Browse through the tour planners</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={` flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              batch === "Devotional"
                ? navigate("/tours")
                : navigate("/tours/Devotional")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              batch === "Devotional" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Devotional
          </p>
          <p
            onClick={() =>
              batch === "Relegious"
                ? navigate("/tours")
                : navigate("/tours/Relegious")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              batch === "Relegious" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Relegious
          </p>
          <p
            onClick={() =>
              batch === "Honeymoon"
                ? navigate("/tours")
                : navigate("/tours/Honeymoon")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              batch === "Honeymoon" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Honeymoon
          </p>
          <p
            onClick={() =>
              batch === "Jolly" ? navigate("/tours") : navigate("/tours/Jolly")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              batch === "Jolly" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Jolly
          </p>
          <p
            onClick={() =>
              batch === "Spritual"
                ? navigate("/tours")
                : navigate("/tours/Spritual")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              batch === "Spritual" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Spritual
          </p>
          <p
            onClick={() =>
              batch === "Spritual+Sightseeing"
                ? navigate("/tours")
                : navigate("/tours/Spritual+Sightseeing")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              batch === "Spritual+Sightseeing" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Spritual+Sightseeing
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterTour.map((item, index) => (
            <div
              onClick={() => navigate(`/booking/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              {/* <img className="bg-blue-50" src={item.image} /> */}
              <img src={item.titleImage} />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    item.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <p
                    className={`inline-block w-2 h-2 ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    } rounded-full`}
                  />

                  <p>{item.available ? "Available" : "Not available"}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">
                  {item.title}
                </p>
                <p className="text-gray-600 text-sm">{item.batch}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tours;

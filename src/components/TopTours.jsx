import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";

const TopTours = () => {
  const navigate = useNavigate();
  const { tours } = useContext(TourAppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Tours to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Explore our most popular tour packages and start your journey!
      </p>

      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {tours.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/booking/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
            key={index}
          >
            {/* Tour Title Image */}
            <img
              className="bg-blue-50 w-full h-48 object-cover"
              src={item.titleImage}
              alt={item.title}
            />

            <div className="p-4">
              {/* Availability */}
              <div
                className={`flex items-center gap-2 text-sm ${
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

              {/* Tour Title */}
              <p className="text-gray-900 text-lg font-medium">{item.title}</p>

              {/* Batch & Price */}
              <p className="text-gray-600 text-sm">Batch: {item.batch}</p>
              <p className="text-gray-800 text-sm">
                Starting from ₹{item.price.doubleSharing.toLocaleString()}
              </p>

              {/* Duration */}
              <p className="text-gray-500 text-xs">
                {item.duration.days} Days / {item.duration.nights} Nights
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/tours");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        More...
      </button>
    </div>
  );
};

export default TopTours;

/* eslint-disable no-unused-vars */
// src/components/TopTours.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";

const TopTours = () => {
  const navigate = useNavigate();
  const { tours, currencySymbol } = useContext(TourAppContext);

  const handleCardClick = (tourId) => {
    navigate(`/tour-details/${tourId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewAll = () => {
    navigate("/tours");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Only 4 tours for clean 2x2 layout
  const featuredTours = tours.slice(0, 4);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-blue-50/8 to-white">
      {/* Minimal calming orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-16 left-1/6 w-64 h-64 bg-blue-200/4 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/6 w-56 h-56 bg-indigo-200/4 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-10 text-center">
        {/* Super Compact Heading */}
        <div className="mb-10 md:mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Our Most Loved Tours
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
            Curated experiences that inspire peace and wonder.
          </p>
        </div>

        {/* Ultra-Compact 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {featuredTours.map((item, index) => (
            <div
              key={item._id}
              onClick={() => handleCardClick(item._id)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-50"
            >
              {/* Minimal hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-300/3 to-indigo-300/3 opacity-0 group-hover:opacity-100 transition-opacity duration-600"></div>

              {/* Small Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.titleImage}
                  alt={item.title}
                  className="w-full h-40 md:h-44 object-cover group-hover:scale-105 transition-transform duration-800"
                />
              </div>

              {/* Tight Content */}
              <div className="relative p-4 md:p-5 text-left">
                {/* Availability */}
                <div className="flex items-center gap-2 text-xs mb-2">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.available ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      item.available ? "text-green-700" : "text-gray-500"
                    }`}
                  >
                    {item.available ? "Available" : "Sold Out"}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-400 line-clamp-2 mb-1">
                  {item.title}
                </h3>

                {/* Super Minimal Details */}
                <div className="space-y-1 text-xs text-gray-600">
                  <p className="text-gray-500">Batch: {item.batch}</p>
                  <p className="text-sm font-medium text-gray-800">
                    {currencySymbol}
                    {item.price.doubleSharing.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.duration.days}D/{item.duration.nights}N
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tiny & Elegant CTA */}
        <div className="mt-12 md:mt-14">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 px-7 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 hover:shadow transition-all duration-400"
          >
            View All Tours
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Ultra-calm pulse */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.04;
            transform: scale(1);
          }
          50% {
            opacity: 0.08;
            transform: scale(1.03);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 20s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 5s;
        }
      `}</style>
    </section>
  );
};

export default TopTours;

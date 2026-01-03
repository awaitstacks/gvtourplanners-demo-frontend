import React from "react";
import { Link } from "react-router-dom";
import { batch } from "../assets/tourAsset.js";

const TourSpecialityMenu = () => {
  // Limit to 9 for perfect 3x3 grid
  const displayedCategories = batch.slice(0, 9);

  return (
    <section
      className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-white via-blue-50/20 to-white"
      id="speciality"
    >
      {/* Subtle calming background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-16 left-1/4 w-72 h-72 bg-blue-200/6 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-24 right-1/4 w-64 h-64 bg-indigo-200/6 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-12 text-center">
        {/* Compact Heading */}
        <div className="mb-16 md:mb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Find Your Perfect Journey
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our curated tour categories
          </p>
        </div>

        {/* Clean 3x3 Grid – Small & Minimal Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {displayedCategories.map((item, index) => (
            <Link
              key={index}
              to={`/tours/${item.speciality}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group relative p-6 md:p-7 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center min-h-32 md:min-h-36"
            >
              {/* Very subtle hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/3 to-indigo-400/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Clean Category Name */}
              <h3 className="relative text-lg md:text-xl font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-400">
                {item.speciality}
              </h3>

              {/* Tiny underline on hover */}
              <div className="mt-3 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
            </Link>
          ))}
        </div>

        {/* Minimal CTA */}
        {batch.length > 9 && (
          <p className="mt-16 text-gray-500 text-sm md:text-base">
            More options available —{" "}
            <a
              href="/tours"
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              View all tours →
            </a>
          </p>
        )}
      </div>

      {/* Calm pulse animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.06;
            transform: scale(1);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.04);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 16s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default TourSpecialityMenu;

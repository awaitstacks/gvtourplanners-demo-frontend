import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";

const Tours = () => {
  const { batch } = useParams();
  const navigate = useNavigate();
  const { tours, currencySymbol } = useContext(TourAppContext);
  const sectionRef = useRef(null);

  const [filterTour, setFilterTour] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (batch) {
      setFilterTour(tours.filter((tour) => tour.batch === batch));
    } else {
      setFilterTour(tours);
    }
  }, [tours, batch]);

  // Smooth scroll-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-reveal");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCardClick = (tourId) => {
    navigate(`/tour-details/${tourId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categories = [
    { name: "All Tours", value: null },
    { name: "Devotional", value: "Devotional" },
    { name: "Religious", value: "Relegious" },
    { name: "Honeymoon", value: "Honeymoon" },
    { name: "Jolly", value: "Jolly" },
    { name: "Spiritual", value: "Spritual" },
    { name: "Spiritual + Sightseeing", value: "Spritual+Sightseeing" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-white via-blue-50/10 to-white relative overflow-hidden opacity-0 translate-y-20 transition-all duration-1600 ease-out"
    >
      {/* Subtle watermark icons */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <div className="absolute top-1/4 left-8 text-8xl text-blue-300 animate-float-slow">
          📍
        </div>
        <div className="absolute top-1/3 right-16 text-9xl text-indigo-300 animate-float-slow delay-1000">
          🧳
        </div>
        <div className="absolute bottom-1/3 left-1/3 text-7xl text-blue-200 animate-float-slow delay-2000">
          🧭
        </div>
        <div className="absolute bottom-44 right-12 text-8xl text-indigo-200 animate-float-slow delay-3000">
          ✈️
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl text-blue-100 animate-float-slow delay-4000">
          🌍
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            {batch ? `${batch} Tours` : "All Our Tours"}
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Discover peaceful journeys crafted with care.
          </p>
        </div>

        {/* Top Filters */}
        <div className="mb-12 md:mb-16">
          <div className="md:hidden text-center mb-6">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="px-8 py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-blue-50 transition"
            >
              Filters {showFilter ? "▲" : "▼"}
            </button>
          </div>

          <div
            className={`flex flex-wrap justify-center gap-4 ${
              showFilter ? "block" : "hidden md:flex"
            }`}
          >
            {categories.map((cat) => (
              <button
                key={cat.value || "all"}
                onClick={() =>
                  navigate(cat.value ? `/tours/${cat.value}` : "/tours")
                }
                className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                  batch === cat.value || (!batch && cat.value === null)
                    ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 shadow-md border border-blue-200"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Small Decent Rectangular Cards */}
        {filterTour.length === 0 ? (
          <p className="text-center text-gray-500 py-20 text-lg">
            No tours found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filterTour.map((item) => (
              <div
                key={item._id}
                onClick={() => handleCardClick(item._id)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-100"
              >
                {/* Soft hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-300/3 to-indigo-300/3 opacity-0 group-hover:opacity-100 transition-opacity duration-600"></div>

                {/* Compact Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.titleImage}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-800"
                  />
                </div>

                {/* Compact Content */}
                <div className="p-5">
                  {/* Availability */}
                  <div className="flex items-center gap-2 text-xs mb-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.available ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        item.available ? "text-green-700" : "text-gray-500"
                      }`}
                    >
                      {item.available ? "Available" : "Sold Out"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-400 line-clamp-2 mb-2">
                    {item.title}
                  </h3>

                  {/* Details */}
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>
                      Batch:{" "}
                      <span className="font-medium text-gray-800">
                        {item.batch}
                      </span>
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {currencySymbol}
                      {item.price.doubleSharing.toLocaleString()}
                    </p>
                    <p className="text-gray-500">
                      {item.duration.days}D/{item.duration.nights}N
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Calm animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-40px) rotate(8deg);
          }
        }
        .animate-float-slow {
          animation: float-slow 25s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        .delay-3000 {
          animation-delay: 3s;
        }
        .delay-4000 {
          animation-delay: 4s;
        }

        .animate-reveal {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
};

export default Tours;

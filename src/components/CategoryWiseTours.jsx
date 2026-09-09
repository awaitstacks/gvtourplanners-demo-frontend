
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";
import { MapPin, Clock } from "lucide-react";

const CategoryWiseTours = () => {
  const navigate = useNavigate();
  const { tours, currencySymbol } = useContext(TourAppContext);

  // Group available tours by batch and sort newest first
  const groupedTours = tours.reduce((acc, tour) => {
    if (tour.available) {
      if (!acc[tour.batch]) acc[tour.batch] = [];
      acc[tour.batch].push(tour);
    }
    return acc;
  }, {});

  // Sort each category newest first
  Object.keys(groupedTours).forEach((category) => {
    groupedTours[category].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  });

  // Search per category
  const [searchTerms, setSearchTerms] = useState({});

  const handleSearchChange = (category, value) => {
    setSearchTerms((prev) => ({ ...prev, [category]: value }));
  };

  const handleCardClick = (tourId) => {
    navigate(`/tour-details/${tourId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewAllCategory = (category) => {
    navigate(`/tours/${category}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section>
      <div className="
  w-full 
  max-w-[94vw] xs:max-w-[94%] sm:max-w-[96%] md:max-w-[92vw] 
  lg:max-w-[90vw] xl:max-w-[88vw] 2xl:max-w-[86vw]
  mx-auto
  rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] lg:rounded-[3rem]
  backdrop-blur-xl bg-white/45 border border-white/50
  shadow-xl md:shadow-2xl
  overflow-hidden
  p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16 xl:p-20
">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Explore Tours by Category
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
            Discover our most loved journeys across India
          </p>
        </div>

        {Object.keys(groupedTours).length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-12">
            No available tours at the moment.
          </p>
        ) : (
          Object.keys(groupedTours).map((category) => {
            const categoryTours = groupedTours[category];
            const search = searchTerms[category] || "";
            const filtered = categoryTours.filter((tour) =>
              tour.title.toLowerCase().includes(search.toLowerCase())
            );
            const displayed = filtered.slice(0, 4);
            const hasMore = filtered.length > 4;

            return (
              <div key={category} className="mb-16">
                {/* Category Title + Search */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                    {category} Tours
                  </h3>
                  <input
                    type="text"
                    placeholder="Search in this category..."
                    value={search}
                    onChange={(e) =>
                      handleSearchChange(category, e.target.value)
                    }
                    className="mt-4 sm:mt-0 w-full sm:w-64 px-6 py-2.5 rounded-full border border-gray-200 focus:border-blue-400 focus:outline-none text-sm"
                  />
                </div>

                {/* Same premium card design as Tours.jsx (All Tours page):
                    sheen hover, booking-closed ribbon, staggered entrance,
                    gold/red/green accent scheme. */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
                  {displayed.map((item, index) => (
                    <div
                      key={item._id}
                      onClick={() => handleCardClick(item._id)}
                      className="tour-card group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer border border-gray-100"
                      style={{
                        animationDelay: `${Math.min(index * 90, 720)}ms`,
                      }}
                    >
                      {/* Photo — light-sweep gleam on hover */}
                      <div className="relative overflow-hidden h-40 md:h-44">
                        <img
                          src={item.titleImage}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="tour-card-sheen absolute inset-0 pointer-events-none" />

                        {/* Booking-closed ribbon */}
                        {item.bookingClosed &&
                          !item.tripCancelled &&
                          item.available !== false && (
                            <div className="tour-ribbon-v absolute top-0 left-4 z-20 pointer-events-none">
                              <span>BOOKING</span>
                              <span>CLOSED</span>
                            </div>
                          )}
                      </div>

                      {/* Details */}
                      <div className="p-4 md:p-5">
                        <div className="flex items-center gap-1.5 mb-2">
                          <MapPin size={13} style={{ color: "#8A7A57" }} />
                          <span
                            className="text-xs font-medium truncate"
                            style={{ color: "#8A7A57" }}
                          >
                            {item.batch}
                          </span>
                        </div>

                        <h3 className="text-base md:text-lg font-bold leading-snug line-clamp-2 mb-2 transition-colors duration-300 text-[#232323] group-hover:text-blue-600">
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-1.5 mb-4">
                          <Clock size={13} style={{ color: "#E8A33D" }} />
                          <span
                            className="text-xs font-semibold"
                            style={{ color: "#E8A33D" }}
                          >
                            {item.duration.nights} Nights {item.duration.days} Days
                          </span>
                        </div>

                        <div className="h-px bg-gray-100 mb-3.5" />

                        <div className="flex items-end justify-between">
                          <div>
                            <div
                              className="text-[9px] font-semibold uppercase tracking-widest mb-0.5"
                              style={{ color: "#B3A57E" }}
                            >
                              Fare
                            </div>
                            <div className="flex items-baseline gap-0.5 transition-transform duration-300 group-hover:scale-[1.06] origin-left">
                              <span
                                className="text-xs font-bold"
                                style={{ color: "#D94A3D" }}
                              >
                                {currencySymbol}
                              </span>
                              <span
                                className="text-xl font-extrabold tabular-nums leading-none"
                                style={{ color: "#D94A3D" }}
                              >
                                {item.price.doubleSharing.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <span
                            className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                            style={{
                              backgroundColor: item.tripCancelled
                                ? "rgba(217,74,61,0.12)"
                                : item.available
                                  ? "rgba(47,125,79,0.12)"
                                  : "rgba(138,122,87,0.14)",
                              color: item.tripCancelled
                                ? "#D94A3D"
                                : item.available
                                  ? "#2F7D4F"
                                  : "#8A7A57",
                            }}
                          >
                            {item.tripCancelled
                              ? "Cancelled"
                              : item.available
                                ? "Available"
                                : "Sold Out"}
                          </span>
                        </div>
                      </div>

                      {/* Green accent rail — signature hover moment */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                        style={{ backgroundColor: "#2F7D4F" }}
                      />
                    </div>
                  ))}
                </div>

                {/* View All Button for this Category */}
                {hasMore && (
                  <div className="text-center mt-10">
                    <button
                      onClick={() => handleViewAllCategory(category)}
                      className="inline-flex items-center gap-2 px-7 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 hover:shadow transition-all duration-400"
                    >
                      View All {category} Tours
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
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Premium card animations (shared with Tours.jsx) */}
      <style>{`
        @keyframes tourCardRise {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tour-card {
          opacity: 0;
          animation: tourCardRise 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .tour-card-sheen {
          background: linear-gradient(
            115deg,
            transparent 0%,
            transparent 40%,
            rgba(255, 255, 255, 0.35) 50%,
            transparent 60%,
            transparent 100%
          );
          background-size: 250% 250%;
          background-position: -100% -100%;
          transition: background-position 0.9s ease;
        }
        .group:hover .tour-card-sheen {
          background-position: 100% 100%;
        }

        .tour-ribbon-v {
          width: 60px;
          padding: 8px 4px 16px;
          background: linear-gradient(165deg, #dc2626 0%, #7f1d1d 100%);
          clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
          color: #fff;
          font-size: 8.5px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-align: center;
          display: flex;
          flex-direction: column;
          line-height: 1.4;
          animation: ribbonPopIn 0.4s ease-out both;
        }
        @keyframes ribbonPopIn {
          0% { transform: translateY(-10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tour-card { animation: none; opacity: 1; }
          .tour-card-sheen { transition: none; }
          .tour-ribbon-v { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default CategoryWiseTours;

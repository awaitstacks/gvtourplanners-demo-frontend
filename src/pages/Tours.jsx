
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";
import { MapPin, Clock, Calendar, Tag, CheckCircle2, XCircle, Ban, RotateCcw, SlidersHorizontal } from "lucide-react";

const Tours = () => {
  const { batch } = useParams();
  const navigate = useNavigate();
  const { tours, currencySymbol, availableYears } = useContext(TourAppContext);

  const [filterTour, setFilterTour] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all"); // ← Missing state added
  const [availability, setAvailability] = useState("available"); // Default blinking Available
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    let filtered = tours || [];

    if (batch) {
      filtered = filtered.filter((tour) => tour.batch === batch);
    }

    if (activeCategory) {
      filtered = filtered.filter((tour) => tour.batch === activeCategory);
    }

    if (selectedYear !== "all") {
      filtered = filtered.filter((tour) => {
        if (!tour.lastBookingDate) return false;
        const tourYear = new Date(tour.lastBookingDate)
          .getFullYear()
          .toString();
        return tourYear === selectedYear;
      });
    }

    // Month Filter (added)
    if (selectedMonth !== "all") {
      filtered = filtered.filter((tour) => {
        if (!tour.lastBookingDate) return false;
        const tourMonth = new Date(tour.lastBookingDate).getMonth() + 1; // 1-12
        return tourMonth === parseInt(selectedMonth);
      });
    }

    if (availability === "available") {
      filtered = filtered.filter(
        (tour) => tour.available === true && !tour.tripCancelled,
      );
    } else if (availability === "soldout") {
      filtered = filtered.filter(
        (tour) => tour.available === false && !tour.tripCancelled,
      );
    } else if (availability === "cancelled") {
      filtered = filtered.filter((tour) => tour.tripCancelled === true);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((tour) =>
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    filtered = filtered.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setFilterTour(filtered);
    setVisibleCount(5);
  }, [
    tours,
    batch,
    activeCategory,
    selectedYear,
    selectedMonth,
    availability,
    searchTerm,
  ]);

  const handleCardClick = (tourId) => {
    navigate(`/tour-details/${tourId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const displayedTours = filterTour.slice(0, visibleCount);

  const categories = [
    { name: "Historical", value: "Historical" },
    { name: "Jolly", value: "Jolly" },
    { name: "Spiritual", value: "Spiritual" },
    { name: "Spiritual + Sightseeing", value: "Spiritual+Sightseeing" },
    { name: "International", value: "International" },
  ];

  // Reset active category on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".category-button")) {
        setActiveCategory(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <section
      className="
      relative 
      min-h-[65vh] xs:min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh] 
      flex items-center justify-center 
      px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 
      pt-0 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28
      "
    >
      {/* Main Glass Container */}
      <div
        className="
        w-full 
        max-w-[94vw] xs:max-w-[94%] sm:max-w-[96%] md:max-w-[92vw] 
        lg:max-w-[90vw] xl:max-w-[88vw] 2xl:max-w-[86vw]
        mx-auto
        rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] lg:rounded-[3rem]
        backdrop-blur-xl bg-white/45 border border-white/50
        shadow-xl md:shadow-2xl
        overflow-hidden
        p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16 xl:p-20
      "
      >
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
            Explore All Our Tours
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Carefully curated experiences for a journey of peace and discovery.
          </p>
        </div>

        {/* Filters — unified panel with labeled sections, so each group
            of controls (period / status / category) reads as its own
            row instead of a loose scatter of pills. */}
        <div
          className="mb-12 rounded-3xl p-6 sm:p-8"
          style={{
            background: "rgba(255,255,255,0.55)",
            border: "1px solid rgba(255,255,255,0.7)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 10px 40px rgba(30,58,138,0.06)",
          }}
        >
          {/* Panel header — icon + title on the left, Clear Filters as a
              small ghost button on the right instead of its own big pill
              row at the bottom. */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                <SlidersHorizontal size={16} className="text-white" />
              </div>
              <span className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                Refine your search
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedMonth("all");
                setSelectedYear("all");
                setAvailability("available");
                setActiveCategory(null);
                navigate("/tours");
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors duration-300"
            >
              <RotateCcw size={13} />
              Clear all
            </button>
          </div>

          <div className="space-y-5">
            {/* Row 1: Period (All Tours toggle + Year + Month) */}
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <Calendar size={13} className="text-gray-400" />
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Period
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedYear("all")}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    selectedYear === "all"
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200/40"
                      : "bg-white/80 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-700"
                  }`}
                >
                  All Tours
                </button>

                <div className="relative min-w-[150px]">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="appearance-none w-full px-5 py-2.5 pr-10 rounded-full bg-white/80 border border-gray-200 text-gray-800 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-200/50 focus:border-blue-400 transition-all duration-300 cursor-pointer hover:border-blue-300"
                  >
                    <option value="all">All Years</option>
                    {availableYears?.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500 text-xs">
                    ▼
                  </span>
                </div>

                <div className="relative min-w-[160px]">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="appearance-none w-full px-5 py-2.5 pr-10 rounded-full bg-white/80 border border-gray-200 text-gray-800 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-200/50 focus:border-blue-400 transition-all duration-300 cursor-pointer hover:border-blue-300"
                  >
                    <option value="all">All Months</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500 text-xs">
                    ▼
                  </span>
                </div>
              </div>
            </div>

            {/* Row 2: Status — segmented control with status icons */}
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 size={13} className="text-gray-400" />
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Status
                </span>
              </div>
              <div className="inline-flex flex-wrap gap-1 p-1 rounded-full bg-gray-100/80 border border-gray-200/60">
                {[
                  { label: "Available", icon: CheckCircle2, active: "bg-green-600 text-white shadow-md shadow-green-200/50" },
                  { label: "Sold Out", icon: XCircle, active: "bg-red-600 text-white shadow-md shadow-red-200/50" },
                  { label: "Cancelled", icon: Ban, active: "bg-gray-700 text-white shadow-md shadow-gray-300/50" },
                ].map(({ label, icon: Icon, active }) => {
                  const value = label.toLowerCase().replace(" ", "");
                  const isActive = availability === value;
                  return (
                    <button
                      key={label}
                      onClick={() => setAvailability(value)}
                      className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                        isActive ? active : "text-gray-600 hover:bg-white/80"
                      }`}
                    >
                      <Icon size={14} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Category */}
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <Tag size={13} className="text-gray-400" />
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Category
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {categories.map((cat) => (
                  <button
                    key={cat.value || "all"}
                    onClick={() => {
                      setActiveCategory(cat.value);
                      navigate(cat.value ? `/tours/${cat.value}` : "/tours");
                    }}
                    className={`category-button px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                      activeCategory === cat.value
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200/40"
                        : "bg-white/80 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-700"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tour Grid */}
        {filterTour.length === 0 ? (
          <div className="text-center py-20 bg-white/70 backdrop-blur-md rounded-3xl border border-gray-100">
            <p className="text-gray-500 font-medium text-lg">
              {batch ||
              selectedMonth !== "all" ||
              selectedYear !== "all" ||
              availability !== "available" ||
              activeCategory
                ? "No tours found matching your filters."
                : "No tours available at the moment."}
            </p>
            {(batch || activeCategory) && (
              <button
                onClick={() => {
                  setSelectedMonth("all");
                  setSelectedYear("all");
                  setAvailability("available");
                  setActiveCategory(null);
                  navigate("/tours");
                }}
                className="mt-4 text-blue-600 font-bold hover:underline"
              >
                Clear filters & View all tours
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
              {displayedTours.map((item, index) => (
                <div
                  key={item._id}
                  onClick={() => handleCardClick(item._id)}
                  className="tour-card group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer border border-gray-100"
                  style={{
                    animationDelay: `${Math.min(index * 90, 720)}ms`,
                  }}
                >
                  {/* Photo — clean, with a signature light-sweep gleam on
                      hover instead of a static zoom alone. */}
                  <div className="relative overflow-hidden h-40 md:h-44">
                    <img
                      src={item.titleImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="tour-card-sheen absolute inset-0 pointer-events-none" />

                    {/* Booking-closed badge — a small premium pill in the
                        top-left corner with a light-sweep "shine" that
                        glides across the text on a loop, plus a soft
                        pop-in entrance. Only shown while the tour is
                        still otherwise bookable-looking (not sold out /
                        cancelled — those have their own clearer states
                        elsewhere). */}
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

                    <h3
                      className="text-base md:text-lg font-bold leading-snug line-clamp-2 mb-2 transition-colors duration-300 text-[#232323] group-hover:text-blue-800"
                    >
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

            {/* Show More */}
            {filterTour.length > visibleCount && (
              <div className="text-center mt-16">
                <button
                  onClick={handleShowMore}
                  className="px-10 py-4 rounded-lg font-semibold text-sm transition-all shadow-sm hover:shadow-md border"
                  style={{
                    backgroundColor: "#FDFBF5",
                    color: "#2F7D4F",
                    borderColor: "#2F7D4F",
                  }}
                >
                  Show More Tours
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.3; }
        }
        .animate-pulse-slow { animation: pulse-slow 15s ease-in-out infinite; }
        .delay-2000 { animation-delay: 2s; }

        /* Staggered entrance — each card rises and fades in, offset by
           its animationDelay (set inline per card index). */
        @keyframes tourCardRise {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tour-card {
          opacity: 0;
          animation: tourCardRise 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Signature hover moment: a soft diagonal light sweep glides
           across the photo, like sunlight crossing a scene. */
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

        /* ── Premium vertical "Booking Closed" ribbon (simplified) ───────
           Deliberately built as ONE element with clip-path + box-shadow
           only — no stacked ::before/::after pseudo-elements combined
           with filter, which can silently fail to paint in some Chrome
           versions when animated together. Shape: rectangular top
           tapering to a point at the bottom (shield/bookmark cut). */
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

export default Tours;

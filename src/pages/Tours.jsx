// // // /* eslint-disable no-unused-vars */
// // // import React, { useContext, useEffect, useState } from "react";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import { TourAppContext } from "../context/TourAppContext.jsx";

// // // const Tours = () => {
// // //   const { batch } = useParams();
// // //   const navigate = useNavigate();
// // //   const { tours, currencySymbol, availableYears } = useContext(TourAppContext);

// // //   const [filterTour, setFilterTour] = useState([]);
// // //   const [visibleCount, setVisibleCount] = useState(5);
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [selectedYear, setSelectedYear] = useState("all");
// // //   const [selectedMonth, setSelectedMonth] = useState("all"); // ← Missing state added
// // //   const [availability, setAvailability] = useState("available"); // Default blinking Available
// // //   const [activeCategory, setActiveCategory] = useState(null);

// // //   useEffect(() => {
// // //     let filtered = tours || [];

// // //     if (batch) {
// // //       filtered = filtered.filter((tour) => tour.batch === batch);
// // //     }

// // //     if (activeCategory) {
// // //       filtered = filtered.filter((tour) => tour.batch === activeCategory);
// // //     }

// // //     if (selectedYear !== "all") {
// // //       filtered = filtered.filter((tour) => {
// // //         if (!tour.lastBookingDate) return false;
// // //         const tourYear = new Date(tour.lastBookingDate)
// // //           .getFullYear()
// // //           .toString();
// // //         return tourYear === selectedYear;
// // //       });
// // //     }

// // //     // Month Filter (added)
// // //     if (selectedMonth !== "all") {
// // //       filtered = filtered.filter((tour) => {
// // //         if (!tour.lastBookingDate) return false;
// // //         const tourMonth = new Date(tour.lastBookingDate).getMonth() + 1; // 1-12
// // //         return tourMonth === parseInt(selectedMonth);
// // //       });
// // //     }

// // //     if (availability === "available") {
// // //       filtered = filtered.filter((tour) => tour.available === true);
// // //     } else if (availability === "soldout") {
// // //       filtered = filtered.filter((tour) => tour.available === false);
// // //     }

// // //     if (searchTerm.trim()) {
// // //       filtered = filtered.filter((tour) =>
// // //         tour.title.toLowerCase().includes(searchTerm.toLowerCase()),
// // //       );
// // //     }

// // //     filtered = filtered.sort((a, b) => {
// // //       return new Date(b.createdAt) - new Date(a.createdAt);
// // //     });

// // //     setFilterTour(filtered);
// // //     setVisibleCount(5);
// // //   }, [
// // //     tours,
// // //     batch,
// // //     activeCategory,
// // //     selectedYear,
// // //     selectedMonth,
// // //     availability,
// // //     searchTerm,
// // //   ]);

// // //   const handleCardClick = (tourId) => {
// // //     navigate(`/tour-details/${tourId}`);
// // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // //   };

// // //   const handleShowMore = () => {
// // //     setVisibleCount((prev) => prev + 5);
// // //   };

// // //   const displayedTours = filterTour.slice(0, visibleCount);

// // //   const categories = [
// // //     { name: "Historical", value: "Historical" },
// // //     { name: "Jolly", value: "Jolly" },
// // //     { name: "Spiritual", value: "Spiritual" },
// // //     { name: "Spiritual + Sightseeing", value: "Spiritual+Sightseeing" },
// // //     { name: "International", value: "International" },
// // //   ];

// // //   // Reset active category on outside click
// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (!event.target.closest(".category-button")) {
// // //         setActiveCategory(null);
// // //       }
// // //     };
// // //     document.addEventListener("click", handleClickOutside);
// // //     return () => document.removeEventListener("click", handleClickOutside);
// // //   }, []);

// // //   return (
// // //     <section
// // //       className="
// // //       relative 
// // //       min-h-[65vh] xs:min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh] 
// // //       flex items-center justify-center 
// // //       px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 
// // //       pt-0 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28
// // //       "
// // //     >
// // //       {/* Main Glass Container */}
// // //       <div
// // //         className="
// // //         w-full 
// // //         max-w-[94vw] xs:max-w-[94%] sm:max-w-[96%] md:max-w-[92vw] 
// // //         lg:max-w-[90vw] xl:max-w-[88vw] 2xl:max-w-[86vw]
// // //         mx-auto
// // //         rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] lg:rounded-[3rem]
// // //         backdrop-blur-xl bg-white/45 border border-white/50
// // //         shadow-xl md:shadow-2xl
// // //         overflow-hidden
// // //         p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16 xl:p-20
// // //       "
// // //       >
// // //         {/* Title */}
// // //         <div className="text-center mb-16">
// // //           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
// // //             Explore All Our Tours
// // //           </h1>
// // //           <p className="text-gray-600 max-w-xl mx-auto text-lg">
// // //             Carefully curated experiences for a journey of peace and discovery.
// // //           </p>
// // //         </div>

// // //         {/* Filters */}
// // //         <div className="mb-12 space-y-6">
// // //           {/* Top Row */}
// // //           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 flex-wrap">
// // //             <div className="flex items-center gap-4 flex-wrap justify-center">
// // //               <button
// // //                 onClick={() => setSelectedYear("all")}
// // //                 className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
// // //                   selectedYear === "all"
// // //                     ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200/30 scale-105"
// // //                     : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-blue-300 hover:text-blue-700"
// // //                 }`}
// // //               >
// // //                 All Tours
// // //               </button>

// // //               {/* Year Dropdown */}
// // //               <div className="relative min-w-[160px]">
// // //                 <select
// // //                   value={selectedYear}
// // //                   onChange={(e) => setSelectedYear(e.target.value)}
// // //                   className="
// // //                     appearance-none w-full px-6 py-3 pr-12 
// // //                     rounded-full bg-white/70 backdrop-blur-xl 
// // //                     border border-white/40 shadow-lg shadow-black/5
// // //                     text-gray-800 text-sm font-medium
// // //                     focus:outline-none focus:ring-4 focus:ring-indigo-300/50 focus:border-indigo-500
// // //                     transition-all duration-300 cursor-pointer
// // //                     hover:bg-white/90 hover:shadow-xl"
// // //                 >
// // //                   <option value="all">All Years</option>
// // //                   {availableYears?.map((year) => (
// // //                     <option key={year} value={year}>
// // //                       {year}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //                 {/* Custom elegant arrow */}
// // //                 <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-500 text-base font-bold">
// // //                   ▼
// // //                 </span>
// // //               </div>

// // //               {/* Month Dropdown */}
// // //               <div className="relative min-w-[180px]">
// // //                 <select
// // //                   value={selectedMonth}
// // //                   onChange={(e) => setSelectedMonth(e.target.value)}
// // //                   className="
// // //                     appearance-none w-full px-6 py-3 pr-12 
// // //                     rounded-full bg-white/70 backdrop-blur-xl 
// // //                     border border-white/40 shadow-lg shadow-black/5
// // //                     text-gray-800 text-sm font-medium
// // //                     focus:outline-none focus:ring-4 focus:ring-indigo-300/50 focus:border-indigo-500
// // //                     transition-all duration-300 cursor-pointer
// // //                     hover:bg-white/90 hover:shadow-xl"
// // //                 >
// // //                   <option value="all">All Months</option>
// // //                   <option value="1">January</option>
// // //                   <option value="2">February</option>
// // //                   <option value="3">March</option>
// // //                   <option value="4">April</option>
// // //                   <option value="5">May</option>
// // //                   <option value="6">June</option>
// // //                   <option value="7">July</option>
// // //                   <option value="8">August</option>
// // //                   <option value="9">September</option>
// // //                   <option value="10">October</option>
// // //                   <option value="11">November</option>
// // //                   <option value="12">December</option>
// // //                 </select>
// // //                 <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-500 text-base font-bold">
// // //                   ▼
// // //                 </span>
// // //               </div>
// // //             </div>

// // //             {/* Availability Buttons */}
// // //             <div className="flex gap-3 flex-wrap justify-center">
// // //               {["Available", "Sold Out"].map((label) => {
// // //                 const value = label.toLowerCase().replace(" ", "");
// // //                 return (
// // //                   <button
// // //                     key={label}
// // //                     onClick={() => setAvailability(value)}
// // //                     className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
// // //                       availability === value
// // //                         ? label === "Available"
// // //                           ? "bg-green-600 text-white border-green-600 shadow-xl shadow-green-200/30 scale-105"
// // //                           : "bg-red-600 text-white border-red-600 shadow-xl shadow-red-200/30 scale-105"
// // //                         : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-gray-300 hover:text-gray-700"
// // //                     }`}
// // //                   >
// // //                     {label}
// // //                   </button>
// // //                 );
// // //               })}
// // //             </div>
// // //           </div>

// // //           {/* Category Buttons */}
// // //           <div className="flex flex-wrap gap-4 justify-center">
// // //             {categories.map((cat) => (
// // //               <button
// // //                 key={cat.value || "all"}
// // //                 onClick={() => {
// // //                   setActiveCategory(cat.value);
// // //                   navigate(cat.value ? `/tours/${cat.value}` : "/tours");
// // //                 }}
// // //                 className={`category-button px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
// // //                   activeCategory === cat.value
// // //                     ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200/30 scale-105"
// // //                     : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-blue-300 hover:text-blue-700"
// // //                 }`}
// // //               >
// // //                 {cat.name}
// // //               </button>
// // //             ))}
// // //           </div>

// // //           {/* Clear Filters Button */}
// // //           <div className="flex justify-center mt-6">
// // //             <button
// // //               onClick={() => {
// // //                 setSelectedMonth("all");
// // //                 setSelectedYear("all");
// // //                 setAvailability("available");
// // //                 setActiveCategory(null);
// // //                 navigate("/tours");
// // //               }}
// // //               className="px-10 py-4 bg-white-50 text-indigo-700 rounded-full font-medium hover:bg-blue-50 transition-all shadow-md hover:shadow-lg text-red-700 "
// // //             >
// // //               Clear Filters
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Tour Grid */}
// // //         {filterTour.length === 0 ? (
// // //           <div className="text-center py-20 bg-white/70 backdrop-blur-md rounded-3xl border border-gray-100">
// // //             <p className="text-gray-500 font-medium text-lg">
// // //               {batch ||
// // //               selectedMonth !== "all" ||
// // //               selectedYear !== "all" ||
// // //               availability !== "available" ||
// // //               activeCategory
// // //                 ? "No tours found matching your filters."
// // //                 : "No tours available at the moment."}
// // //             </p>
// // //             {(batch || activeCategory) && (
// // //               <button
// // //                 onClick={() => {
// // //                   setSelectedMonth("all");
// // //                   setSelectedYear("all");
// // //                   setAvailability("available");
// // //                   setActiveCategory(null);
// // //                   navigate("/tours");
// // //                 }}
// // //                 className="mt-4 text-blue-600 font-bold hover:underline"
// // //               >
// // //                 Clear filters & View all tours
// // //               </button>
// // //             )}
// // //           </div>
// // //         ) : (
// // //           <>
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
// // //               {displayedTours.map((item) => (
// // //                 <div
// // //                   key={item._id}
// // //                   onClick={() => handleCardClick(item._id)}
// // //                   className="group relative bg-white rounded-2xl overflow-hidden shadow hover:shadow-md transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-50"
// // //                 >
// // //                   {/* Hover glow */}
// // //                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-300/3 to-indigo-300/3 opacity-0 group-hover:opacity-100 transition-opacity duration-600"></div>

// // //                   {/* Image */}
// // //                   <div className="relative overflow-hidden">
// // //                     <img
// // //                       src={item.titleImage}
// // //                       alt={item.title}
// // //                       className="w-full h-40 md:h-44 object-cover group-hover:scale-105 transition-transform duration-800"
// // //                     />
// // //                   </div>

// // //                   {/* Content */}
// // //                   <div className="relative p-4 md:p-5 text-left">
// // //                     <div className="flex items-center gap-2 text-xs mb-2">
// // //                       <div
// // //                         className={`w-1.5 h-1.5 rounded-full ${
// // //                           item.available ? "bg-green-500" : "bg-gray-400"
// // //                         }`}
// // //                       />
// // //                       <span
// // //                         className={`text-xs font-medium ${
// // //                           item.available ? "text-green-700" : "text-gray-500"
// // //                         }`}
// // //                       >
// // //                         {item.available ? "Available" : "Sold Out"}
// // //                       </span>
// // //                     </div>

// // //                     <h3 className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-400 line-clamp-2 mb-1">
// // //                       {item.title}
// // //                     </h3>

// // //                     <div className="space-y-1 text-xs text-gray-600">
// // //                       <p className="text-gray-500">Batch: {item.batch}</p>
// // //                       <p className="text-sm font-medium text-gray-800">
// // //                         {currencySymbol}
// // //                         {item.price.doubleSharing.toLocaleString()}
// // //                       </p>
// // //                       <p className="text-xs text-gray-500">
// // //                         {item.duration.days}D/{item.duration.nights}N
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             {/* Show More */}
// // //             {filterTour.length > visibleCount && (
// // //               <div className="text-center mt-16">
// // //                 <button
// // //                   onClick={handleShowMore}
// // //                   className="px-10 py-4 bg-indigo-100 text-indigo-700 rounded-xl font-medium hover:bg-indigo-200 transition-all shadow-md hover:shadow-lg"
// // //                 >
// // //                   Show More Tours
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </>
// // //         )}
// // //       </div>

// // //       {/* Pulse animation */}
// // //       <style>{`
// // //         @keyframes pulse-slow {
// // //           0%, 100% { transform: scale(1); opacity: 0.2; }
// // //           50% { transform: scale(1.05); opacity: 0.3; }
// // //         }
// // //         .animate-pulse-slow { animation: pulse-slow 15s ease-in-out infinite; }
// // //         .delay-2000 { animation-delay: 2s; }
// // //       `}</style>
// // //     </section>
// // //   );
// // // };

// // // export default Tours;


// // /* eslint-disable no-unused-vars */
// // import React, { useContext, useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { TourAppContext } from "../context/TourAppContext.jsx";
// // import { MapPin, Clock } from "lucide-react";

// // const Tours = () => {
// //   const { batch } = useParams();
// //   const navigate = useNavigate();
// //   const { tours, currencySymbol, availableYears } = useContext(TourAppContext);

// //   const [filterTour, setFilterTour] = useState([]);
// //   const [visibleCount, setVisibleCount] = useState(5);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedYear, setSelectedYear] = useState("all");
// //   const [selectedMonth, setSelectedMonth] = useState("all"); // ← Missing state added
// //   const [availability, setAvailability] = useState("available"); // Default blinking Available
// //   const [activeCategory, setActiveCategory] = useState(null);

// //   useEffect(() => {
// //     let filtered = tours || [];

// //     if (batch) {
// //       filtered = filtered.filter((tour) => tour.batch === batch);
// //     }

// //     if (activeCategory) {
// //       filtered = filtered.filter((tour) => tour.batch === activeCategory);
// //     }

// //     if (selectedYear !== "all") {
// //       filtered = filtered.filter((tour) => {
// //         if (!tour.lastBookingDate) return false;
// //         const tourYear = new Date(tour.lastBookingDate)
// //           .getFullYear()
// //           .toString();
// //         return tourYear === selectedYear;
// //       });
// //     }

// //     // Month Filter (added)
// //     if (selectedMonth !== "all") {
// //       filtered = filtered.filter((tour) => {
// //         if (!tour.lastBookingDate) return false;
// //         const tourMonth = new Date(tour.lastBookingDate).getMonth() + 1; // 1-12
// //         return tourMonth === parseInt(selectedMonth);
// //       });
// //     }

// //     if (availability === "available") {
// //       filtered = filtered.filter(
// //         (tour) => tour.available === true && !tour.tripCancelled,
// //       );
// //     } else if (availability === "soldout") {
// //       filtered = filtered.filter(
// //         (tour) => tour.available === false && !tour.tripCancelled,
// //       );
// //     } else if (availability === "cancelled") {
// //       filtered = filtered.filter((tour) => tour.tripCancelled === true);
// //     }

// //     if (searchTerm.trim()) {
// //       filtered = filtered.filter((tour) =>
// //         tour.title.toLowerCase().includes(searchTerm.toLowerCase()),
// //       );
// //     }

// //     filtered = filtered.sort((a, b) => {
// //       return new Date(b.createdAt) - new Date(a.createdAt);
// //     });

// //     setFilterTour(filtered);
// //     setVisibleCount(5);
// //   }, [
// //     tours,
// //     batch,
// //     activeCategory,
// //     selectedYear,
// //     selectedMonth,
// //     availability,
// //     searchTerm,
// //   ]);

// //   const handleCardClick = (tourId) => {
// //     navigate(`/tour-details/${tourId}`);
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   };

// //   const handleShowMore = () => {
// //     setVisibleCount((prev) => prev + 5);
// //   };

// //   const displayedTours = filterTour.slice(0, visibleCount);

// //   const categories = [
// //     { name: "Historical", value: "Historical" },
// //     { name: "Jolly", value: "Jolly" },
// //     { name: "Spiritual", value: "Spiritual" },
// //     { name: "Spiritual + Sightseeing", value: "Spiritual+Sightseeing" },
// //     { name: "International", value: "International" },
// //   ];

// //   // Reset active category on outside click
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (!event.target.closest(".category-button")) {
// //         setActiveCategory(null);
// //       }
// //     };
// //     document.addEventListener("click", handleClickOutside);
// //     return () => document.removeEventListener("click", handleClickOutside);
// //   }, []);

// //   return (
// //     <section
// //       className="
// //       relative 
// //       min-h-[65vh] xs:min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh] 
// //       flex items-center justify-center 
// //       px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 
// //       pt-0 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28
// //       "
// //     >
// //       {/* Main Glass Container */}
// //       <div
// //         className="
// //         w-full 
// //         max-w-[94vw] xs:max-w-[94%] sm:max-w-[96%] md:max-w-[92vw] 
// //         lg:max-w-[90vw] xl:max-w-[88vw] 2xl:max-w-[86vw]
// //         mx-auto
// //         rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] lg:rounded-[3rem]
// //         backdrop-blur-xl bg-white/45 border border-white/50
// //         shadow-xl md:shadow-2xl
// //         overflow-hidden
// //         p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16 xl:p-20
// //       "
// //       >
// //         {/* Title */}
// //         <div className="text-center mb-16">
// //           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
// //             Explore All Our Tours
// //           </h1>
// //           <p className="text-gray-600 max-w-xl mx-auto text-lg">
// //             Carefully curated experiences for a journey of peace and discovery.
// //           </p>
// //         </div>

// //         {/* Filters */}
// //         <div className="mb-12 space-y-6">
// //           {/* Top Row */}
// //           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 flex-wrap">
// //             <div className="flex items-center gap-4 flex-wrap justify-center">
// //               <button
// //                 onClick={() => setSelectedYear("all")}
// //                 className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
// //                   selectedYear === "all"
// //                     ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200/30 scale-105"
// //                     : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-blue-300 hover:text-blue-700"
// //                 }`}
// //               >
// //                 All Tours
// //               </button>

// //               {/* Year Dropdown */}
// //               <div className="relative min-w-[160px]">
// //                 <select
// //                   value={selectedYear}
// //                   onChange={(e) => setSelectedYear(e.target.value)}
// //                   className="
// //                     appearance-none w-full px-6 py-3 pr-12 
// //                     rounded-full bg-white/70 backdrop-blur-xl 
// //                     border border-white/40 shadow-lg shadow-black/5
// //                     text-gray-800 text-sm font-medium
// //                     focus:outline-none focus:ring-4 focus:ring-indigo-300/50 focus:border-indigo-500
// //                     transition-all duration-300 cursor-pointer
// //                     hover:bg-white/90 hover:shadow-xl"
// //                 >
// //                   <option value="all">All Years</option>
// //                   {availableYears?.map((year) => (
// //                     <option key={year} value={year}>
// //                       {year}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 {/* Custom elegant arrow */}
// //                 <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-500 text-base font-bold">
// //                   ▼
// //                 </span>
// //               </div>

// //               {/* Month Dropdown */}
// //               <div className="relative min-w-[180px]">
// //                 <select
// //                   value={selectedMonth}
// //                   onChange={(e) => setSelectedMonth(e.target.value)}
// //                   className="
// //                     appearance-none w-full px-6 py-3 pr-12 
// //                     rounded-full bg-white/70 backdrop-blur-xl 
// //                     border border-white/40 shadow-lg shadow-black/5
// //                     text-gray-800 text-sm font-medium
// //                     focus:outline-none focus:ring-4 focus:ring-indigo-300/50 focus:border-indigo-500
// //                     transition-all duration-300 cursor-pointer
// //                     hover:bg-white/90 hover:shadow-xl"
// //                 >
// //                   <option value="all">All Months</option>
// //                   <option value="1">January</option>
// //                   <option value="2">February</option>
// //                   <option value="3">March</option>
// //                   <option value="4">April</option>
// //                   <option value="5">May</option>
// //                   <option value="6">June</option>
// //                   <option value="7">July</option>
// //                   <option value="8">August</option>
// //                   <option value="9">September</option>
// //                   <option value="10">October</option>
// //                   <option value="11">November</option>
// //                   <option value="12">December</option>
// //                 </select>
// //                 <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-500 text-base font-bold">
// //                   ▼
// //                 </span>
// //               </div>
// //             </div>

// //             {/* Availability Buttons */}
// //             <div className="flex gap-3 flex-wrap justify-center">
// //               {["Available", "Sold Out", "Cancelled"].map((label) => {
// //                 const value = label.toLowerCase().replace(" ", "");
// //                 return (
// //                   <button
// //                     key={label}
// //                     onClick={() => setAvailability(value)}
// //                     className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
// //                       availability === value
// //                         ? label === "Available"
// //                           ? "bg-green-600 text-white border-green-600 shadow-xl shadow-green-200/30 scale-105"
// //                           : label === "Sold Out"
// //                             ? "bg-red-600 text-white border-red-600 shadow-xl shadow-red-200/30 scale-105"
// //                             : "bg-gray-700 text-white border-gray-700 shadow-xl shadow-gray-300/30 scale-105"
// //                         : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-gray-300 hover:text-gray-700"
// //                     }`}
// //                   >
// //                     {label}
// //                   </button>
// //                 );
// //               })}
// //             </div>
// //           </div>

// //           {/* Category Buttons */}
// //           <div className="flex flex-wrap gap-4 justify-center">
// //             {categories.map((cat) => (
// //               <button
// //                 key={cat.value || "all"}
// //                 onClick={() => {
// //                   setActiveCategory(cat.value);
// //                   navigate(cat.value ? `/tours/${cat.value}` : "/tours");
// //                 }}
// //                 className={`category-button px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
// //                   activeCategory === cat.value
// //                     ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200/30 scale-105"
// //                     : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-blue-300 hover:text-blue-700"
// //                 }`}
// //               >
// //                 {cat.name}
// //               </button>
// //             ))}
// //           </div>

// //           {/* Clear Filters Button */}
// //           <div className="flex justify-center mt-6">
// //             <button
// //               onClick={() => {
// //                 setSelectedMonth("all");
// //                 setSelectedYear("all");
// //                 setAvailability("available");
// //                 setActiveCategory(null);
// //                 navigate("/tours");
// //               }}
// //               className="px-10 py-4 bg-white-50 text-indigo-700 rounded-full font-medium hover:bg-blue-50 transition-all shadow-md hover:shadow-lg text-red-700 "
// //             >
// //               Clear Filters
// //             </button>
// //           </div>
// //         </div>

// //         {/* Tour Grid */}
// //         {filterTour.length === 0 ? (
// //           <div className="text-center py-20 bg-white/70 backdrop-blur-md rounded-3xl border border-gray-100">
// //             <p className="text-gray-500 font-medium text-lg">
// //               {batch ||
// //               selectedMonth !== "all" ||
// //               selectedYear !== "all" ||
// //               availability !== "available" ||
// //               activeCategory
// //                 ? "No tours found matching your filters."
// //                 : "No tours available at the moment."}
// //             </p>
// //             {(batch || activeCategory) && (
// //               <button
// //                 onClick={() => {
// //                   setSelectedMonth("all");
// //                   setSelectedYear("all");
// //                   setAvailability("available");
// //                   setActiveCategory(null);
// //                   navigate("/tours");
// //                 }}
// //                 className="mt-4 text-blue-600 font-bold hover:underline"
// //               >
// //                 Clear filters & View all tours
// //               </button>
// //             )}
// //           </div>
// //         ) : (
// //           <>
// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
// //               {displayedTours.map((item, index) => (
// //                 <div
// //                   key={item._id}
// //                   onClick={() => handleCardClick(item._id)}
// //                   className="tour-card group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer border border-gray-100"
// //                   style={{
// //                     animationDelay: `${Math.min(index * 90, 720)}ms`,
// //                   }}
// //                 >
// //                   {/* Photo — clean, with a signature light-sweep gleam on
// //                       hover instead of a static zoom alone. */}
// //                   <div className="relative overflow-hidden h-40 md:h-44">
// //                     <img
// //                       src={item.titleImage}
// //                       alt={item.title}
// //                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
// //                     />
// //                     <div className="tour-card-sheen absolute inset-0 pointer-events-none" />
// //                   </div>

// //                   {/* Folded ribbon — hangs from the top-left corner, with a
// //                       gold trim edge and a notched fold at the bottom for a
// //                       more finished, dimensional look than a flat banner. */}
// //                   {item.bookingClosed && !item.tripCancelled && (
// //                     <div className="absolute top-0 left-4 z-20 pointer-events-none">
// //                       <div
// //                         className="relative w-9 pt-2.5 pb-4 flex flex-col items-center shadow-lg"
// //                         style={{
// //                           background:
// //                             "linear-gradient(135deg, #E45B4D 0%, #D94A3D 100%)",
// //                         }}
// //                       >
// //                         <span
// //                           className="w-full h-[3px] absolute top-1"
// //                           style={{ backgroundColor: "#E8A33D" }}
// //                         />
// //                         <span className="text-white text-[9px] font-extrabold leading-tight tracking-wide [writing-mode:vertical-rl] rotate-180">
// //                           BOOKING CLOSED
// //                         </span>
// //                         {/* Notched fold at the bottom of the ribbon */}
// //                         <span
// //                           className="absolute -bottom-2.5 left-0 w-0 h-0"
// //                           style={{
// //                             borderLeft: "18px solid transparent",
// //                             borderTop: "10px solid #A7291E",
// //                           }}
// //                         />
// //                         <span
// //                           className="absolute -bottom-2.5 right-0 w-0 h-0"
// //                           style={{
// //                             borderRight: "18px solid transparent",
// //                             borderTop: "10px solid #A7291E",
// //                           }}
// //                         />
// //                       </div>
// //                     </div>
// //                   )}

// //                   {/* Details */}
// //                   <div className="p-4 md:p-5">
// //                     <div className="flex items-center gap-1.5 mb-2">
// //                       <MapPin size={13} style={{ color: "#8A7A57" }} />
// //                       <span
// //                         className="text-xs font-medium truncate"
// //                         style={{ color: "#8A7A57" }}
// //                       >
// //                         {item.batch}
// //                       </span>
// //                     </div>

// //                     <h3
// //                       className="text-base md:text-lg font-bold leading-snug line-clamp-2 mb-2 transition-colors duration-300"
// //                       style={{ color: "#232323" }}
// //                     >
// //                       {item.title}
// //                     </h3>

// //                     <div className="flex items-center gap-1.5 mb-4">
// //                       <Clock size={13} style={{ color: "#E8A33D" }} />
// //                       <span
// //                         className="text-xs font-semibold"
// //                         style={{ color: "#E8A33D" }}
// //                       >
// //                         {item.duration.nights} Nights {item.duration.days} Days
// //                       </span>
// //                     </div>

// //                     <div className="h-px bg-gray-100 mb-3.5" />

// //                     <div className="flex items-end justify-between">
// //                       <div>
// //                         <div
// //                           className="text-[9px] font-semibold uppercase tracking-widest mb-0.5"
// //                           style={{ color: "#B3A57E" }}
// //                         >
// //                           Fare
// //                         </div>
// //                         <div className="flex items-baseline gap-0.5 transition-transform duration-300 group-hover:scale-[1.06] origin-left">
// //                           <span
// //                             className="text-xs font-bold"
// //                             style={{ color: "#D94A3D" }}
// //                           >
// //                             {currencySymbol}
// //                           </span>
// //                           <span
// //                             className="text-xl font-extrabold tabular-nums leading-none"
// //                             style={{ color: "#D94A3D" }}
// //                           >
// //                             {item.price.doubleSharing.toLocaleString()}
// //                           </span>
// //                         </div>
// //                       </div>

// //                       <span
// //                         className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
// //                         style={{
// //                           backgroundColor: item.tripCancelled
// //                             ? "rgba(217,74,61,0.12)"
// //                             : item.available
// //                               ? "rgba(47,125,79,0.12)"
// //                               : "rgba(138,122,87,0.14)",
// //                           color: item.tripCancelled
// //                             ? "#D94A3D"
// //                             : item.available
// //                               ? "#2F7D4F"
// //                               : "#8A7A57",
// //                         }}
// //                       >
// //                         {item.tripCancelled
// //                           ? "Cancelled"
// //                           : item.available
// //                             ? "Available"
// //                             : "Sold Out"}
// //                       </span>
// //                     </div>
// //                   </div>

// //                   {/* Green accent rail — signature hover moment */}
// //                   <div
// //                     className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
// //                     style={{ backgroundColor: "#2F7D4F" }}
// //                   />
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Show More */}
// //             {filterTour.length > visibleCount && (
// //               <div className="text-center mt-16">
// //                 <button
// //                   onClick={handleShowMore}
// //                   className="px-10 py-4 rounded-lg font-semibold text-sm transition-all shadow-sm hover:shadow-md border"
// //                   style={{
// //                     backgroundColor: "#FDFBF5",
// //                     color: "#2F7D4F",
// //                     borderColor: "#2F7D4F",
// //                   }}
// //                 >
// //                   Show More Tours
// //                 </button>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </div>

// //       {/* Pulse animation */}
// //       <style>{`
// //         @keyframes pulse-slow {
// //           0%, 100% { transform: scale(1); opacity: 0.2; }
// //           50% { transform: scale(1.05); opacity: 0.3; }
// //         }
// //         .animate-pulse-slow { animation: pulse-slow 15s ease-in-out infinite; }
// //         .delay-2000 { animation-delay: 2s; }

// //         /* Staggered entrance — each card rises and fades in, offset by
// //            its animationDelay (set inline per card index). */
// //         @keyframes tourCardRise {
// //           from { opacity: 0; transform: translateY(22px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //         .tour-card {
// //           opacity: 0;
// //           animation: tourCardRise 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
// //         }

// //         /* Signature hover moment: a soft diagonal light sweep glides
// //            across the photo, like sunlight crossing a scene. */
// //         .tour-card-sheen {
// //           background: linear-gradient(
// //             115deg,
// //             transparent 0%,
// //             transparent 40%,
// //             rgba(255, 255, 255, 0.35) 50%,
// //             transparent 60%,
// //             transparent 100%
// //           );
// //           background-size: 250% 250%;
// //           background-position: -100% -100%;
// //           transition: background-position 0.9s ease;
// //         }
// //         .group:hover .tour-card-sheen {
// //           background-position: 100% 100%;
// //         }

// //         @media (prefers-reduced-motion: reduce) {
// //           .tour-card { animation: none; opacity: 1; }
// //           .tour-card-sheen { transition: none; }
// //         }
// //       `}</style>
// //     </section>
// //   );
// // };

// // export default Tours;

// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { TourAppContext } from "../context/TourAppContext.jsx";
// import { MapPin, Clock } from "lucide-react";

// const Tours = () => {
//   const { batch } = useParams();
//   const navigate = useNavigate();
//   const { tours, currencySymbol, availableYears } = useContext(TourAppContext);

//   const [filterTour, setFilterTour] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(5);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedYear, setSelectedYear] = useState("all");
//   const [selectedMonth, setSelectedMonth] = useState("all"); // ← Missing state added
//   const [availability, setAvailability] = useState("available"); // Default blinking Available
//   const [activeCategory, setActiveCategory] = useState(null);

//   useEffect(() => {
//     let filtered = tours || [];

//     if (batch) {
//       filtered = filtered.filter((tour) => tour.batch === batch);
//     }

//     if (activeCategory) {
//       filtered = filtered.filter((tour) => tour.batch === activeCategory);
//     }

//     if (selectedYear !== "all") {
//       filtered = filtered.filter((tour) => {
//         if (!tour.lastBookingDate) return false;
//         const tourYear = new Date(tour.lastBookingDate)
//           .getFullYear()
//           .toString();
//         return tourYear === selectedYear;
//       });
//     }

//     // Month Filter (added)
//     if (selectedMonth !== "all") {
//       filtered = filtered.filter((tour) => {
//         if (!tour.lastBookingDate) return false;
//         const tourMonth = new Date(tour.lastBookingDate).getMonth() + 1; // 1-12
//         return tourMonth === parseInt(selectedMonth);
//       });
//     }

//     if (availability === "available") {
//       filtered = filtered.filter(
//         (tour) => tour.available === true && !tour.tripCancelled,
//       );
//     } else if (availability === "soldout") {
//       filtered = filtered.filter(
//         (tour) => tour.available === false && !tour.tripCancelled,
//       );
//     } else if (availability === "cancelled") {
//       filtered = filtered.filter((tour) => tour.tripCancelled === true);
//     }

//     if (searchTerm.trim()) {
//       filtered = filtered.filter((tour) =>
//         tour.title.toLowerCase().includes(searchTerm.toLowerCase()),
//       );
//     }

//     filtered = filtered.sort((a, b) => {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });

//     setFilterTour(filtered);
//     setVisibleCount(5);
//   }, [
//     tours,
//     batch,
//     activeCategory,
//     selectedYear,
//     selectedMonth,
//     availability,
//     searchTerm,
//   ]);

//   const handleCardClick = (tourId) => {
//     navigate(`/tour-details/${tourId}`);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleShowMore = () => {
//     setVisibleCount((prev) => prev + 5);
//   };

//   const displayedTours = filterTour.slice(0, visibleCount);

//   const categories = [
//     { name: "Historical", value: "Historical" },
//     { name: "Jolly", value: "Jolly" },
//     { name: "Spiritual", value: "Spiritual" },
//     { name: "Spiritual + Sightseeing", value: "Spiritual+Sightseeing" },
//     { name: "International", value: "International" },
//   ];

//   // Reset active category on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".category-button")) {
//         setActiveCategory(null);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   return (
//     <section
//       className="
//       relative 
//       min-h-[65vh] xs:min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh] 
//       flex items-center justify-center 
//       px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 
//       pt-0 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28
//       "
//     >
//       {/* Main Glass Container */}
//       <div
//         className="
//         w-full 
//         max-w-[94vw] xs:max-w-[94%] sm:max-w-[96%] md:max-w-[92vw] 
//         lg:max-w-[90vw] xl:max-w-[88vw] 2xl:max-w-[86vw]
//         mx-auto
//         rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] lg:rounded-[3rem]
//         backdrop-blur-xl bg-white/45 border border-white/50
//         shadow-xl md:shadow-2xl
//         overflow-hidden
//         p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16 xl:p-20
//       "
//       >
//         {/* Title */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
//             Explore All Our Tours
//           </h1>
//           <p className="text-gray-600 max-w-xl mx-auto text-lg">
//             Carefully curated experiences for a journey of peace and discovery.
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="mb-12 space-y-6">
//           {/* Top Row */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 flex-wrap">
//             <div className="flex items-center gap-4 flex-wrap justify-center">
//               <button
//                 onClick={() => setSelectedYear("all")}
//                 className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
//                   selectedYear === "all"
//                     ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200/30 scale-105"
//                     : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-blue-300 hover:text-blue-700"
//                 }`}
//               >
//                 All Tours
//               </button>

//               {/* Year Dropdown */}
//               <div className="relative min-w-[160px]">
//                 <select
//                   value={selectedYear}
//                   onChange={(e) => setSelectedYear(e.target.value)}
//                   className="
//                     appearance-none w-full px-6 py-3 pr-12 
//                     rounded-full bg-white/70 backdrop-blur-xl 
//                     border border-white/40 shadow-lg shadow-black/5
//                     text-gray-800 text-sm font-medium
//                     focus:outline-none focus:ring-4 focus:ring-indigo-300/50 focus:border-indigo-500
//                     transition-all duration-300 cursor-pointer
//                     hover:bg-white/90 hover:shadow-xl"
//                 >
//                   <option value="all">All Years</option>
//                   {availableYears?.map((year) => (
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//                 {/* Custom elegant arrow */}
//                 <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-500 text-base font-bold">
//                   ▼
//                 </span>
//               </div>

//               {/* Month Dropdown */}
//               <div className="relative min-w-[180px]">
//                 <select
//                   value={selectedMonth}
//                   onChange={(e) => setSelectedMonth(e.target.value)}
//                   className="
//                     appearance-none w-full px-6 py-3 pr-12 
//                     rounded-full bg-white/70 backdrop-blur-xl 
//                     border border-white/40 shadow-lg shadow-black/5
//                     text-gray-800 text-sm font-medium
//                     focus:outline-none focus:ring-4 focus:ring-indigo-300/50 focus:border-indigo-500
//                     transition-all duration-300 cursor-pointer
//                     hover:bg-white/90 hover:shadow-xl"
//                 >
//                   <option value="all">All Months</option>
//                   <option value="1">January</option>
//                   <option value="2">February</option>
//                   <option value="3">March</option>
//                   <option value="4">April</option>
//                   <option value="5">May</option>
//                   <option value="6">June</option>
//                   <option value="7">July</option>
//                   <option value="8">August</option>
//                   <option value="9">September</option>
//                   <option value="10">October</option>
//                   <option value="11">November</option>
//                   <option value="12">December</option>
//                 </select>
//                 <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-500 text-base font-bold">
//                   ▼
//                 </span>
//               </div>
//             </div>

//             {/* Availability Buttons */}
//             <div className="flex gap-3 flex-wrap justify-center">
//               {["Available", "Sold Out", "Cancelled"].map((label) => {
//                 const value = label.toLowerCase().replace(" ", "");
//                 return (
//                   <button
//                     key={label}
//                     onClick={() => setAvailability(value)}
//                     className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
//                       availability === value
//                         ? label === "Available"
//                           ? "bg-green-600 text-white border-green-600 shadow-xl shadow-green-200/30 scale-105"
//                           : label === "Sold Out"
//                             ? "bg-red-600 text-white border-red-600 shadow-xl shadow-red-200/30 scale-105"
//                             : "bg-gray-700 text-white border-gray-700 shadow-xl shadow-gray-300/30 scale-105"
//                         : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-gray-300 hover:text-gray-700"
//                     }`}
//                   >
//                     {label}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Category Buttons */}
//           <div className="flex flex-wrap gap-4 justify-center">
//             {categories.map((cat) => (
//               <button
//                 key={cat.value || "all"}
//                 onClick={() => {
//                   setActiveCategory(cat.value);
//                   navigate(cat.value ? `/tours/${cat.value}` : "/tours");
//                 }}
//                 className={`category-button px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
//                   activeCategory === cat.value
//                     ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200/30 scale-105"
//                     : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-blue-300 hover:text-blue-700"
//                 }`}
//               >
//                 {cat.name}
//               </button>
//             ))}
//           </div>

//           {/* Clear Filters Button */}
//           <div className="flex justify-center mt-6">
//             <button
//               onClick={() => {
//                 setSelectedMonth("all");
//                 setSelectedYear("all");
//                 setAvailability("available");
//                 setActiveCategory(null);
//                 navigate("/tours");
//               }}
//               className="px-10 py-4 bg-white-50 text-indigo-700 rounded-full font-medium hover:bg-blue-50 transition-all shadow-md hover:shadow-lg text-red-700 "
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>

//         {/* Tour Grid */}
//         {filterTour.length === 0 ? (
//           <div className="text-center py-20 bg-white/70 backdrop-blur-md rounded-3xl border border-gray-100">
//             <p className="text-gray-500 font-medium text-lg">
//               {batch ||
//               selectedMonth !== "all" ||
//               selectedYear !== "all" ||
//               availability !== "available" ||
//               activeCategory
//                 ? "No tours found matching your filters."
//                 : "No tours available at the moment."}
//             </p>
//             {(batch || activeCategory) && (
//               <button
//                 onClick={() => {
//                   setSelectedMonth("all");
//                   setSelectedYear("all");
//                   setAvailability("available");
//                   setActiveCategory(null);
//                   navigate("/tours");
//                 }}
//                 className="mt-4 text-blue-600 font-bold hover:underline"
//               >
//                 Clear filters & View all tours
//               </button>
//             )}
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
//               {displayedTours.map((item, index) => (
//                 <div
//                   key={item._id}
//                   onClick={() => handleCardClick(item._id)}
//                   className="tour-card group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer border border-gray-100"
//                   style={{
//                     animationDelay: `${Math.min(index * 90, 720)}ms`,
//                   }}
//                 >
//                   {/* Photo — clean, with a signature light-sweep gleam on
//                       hover instead of a static zoom alone. */}
//                   <div className="relative overflow-hidden h-40 md:h-44">
//                     <img
//                       src={item.titleImage}
//                       alt={item.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                     />
//                     <div className="tour-card-sheen absolute inset-0 pointer-events-none" />

//                     {/* Booking-closed badge — a small premium pill in the
//                         top-left corner with a light-sweep "shine" that
//                         glides across the text on a loop, plus a soft
//                         pop-in entrance. Only shown while the tour is
//                         still otherwise bookable-looking (not sold out /
//                         cancelled — those have their own clearer states
//                         elsewhere). */}
//                     {item.bookingClosed &&
//                       !item.tripCancelled &&
//                       item.available !== false && (
//                         <div className="tour-ribbon-v absolute top-0 left-4 z-20 pointer-events-none">
//                           <span>BOOKING</span>
//                           <span>CLOSED</span>
//                         </div>
//                       )}
//                   </div>

//                   {/* Details */}
//                   <div className="p-4 md:p-5">
//                     <div className="flex items-center gap-1.5 mb-2">
//                       <MapPin size={13} style={{ color: "#8A7A57" }} />
//                       <span
//                         className="text-xs font-medium truncate"
//                         style={{ color: "#8A7A57" }}
//                       >
//                         {item.batch}
//                       </span>
//                     </div>

//                     <h3
//                       className="text-base md:text-lg font-bold leading-snug line-clamp-2 mb-2 transition-colors duration-300"
//                       style={{ color: "#232323" }}
//                     >
//                       {item.title}
//                     </h3>

//                     <div className="flex items-center gap-1.5 mb-4">
//                       <Clock size={13} style={{ color: "#E8A33D" }} />
//                       <span
//                         className="text-xs font-semibold"
//                         style={{ color: "#E8A33D" }}
//                       >
//                         {item.duration.nights} Nights {item.duration.days} Days
//                       </span>
//                     </div>

//                     <div className="h-px bg-gray-100 mb-3.5" />

//                     <div className="flex items-end justify-between">
//                       <div>
//                         <div
//                           className="text-[9px] font-semibold uppercase tracking-widest mb-0.5"
//                           style={{ color: "#B3A57E" }}
//                         >
//                           Fare
//                         </div>
//                         <div className="flex items-baseline gap-0.5 transition-transform duration-300 group-hover:scale-[1.06] origin-left">
//                           <span
//                             className="text-xs font-bold"
//                             style={{ color: "#D94A3D" }}
//                           >
//                             {currencySymbol}
//                           </span>
//                           <span
//                             className="text-xl font-extrabold tabular-nums leading-none"
//                             style={{ color: "#D94A3D" }}
//                           >
//                             {item.price.doubleSharing.toLocaleString()}
//                           </span>
//                         </div>
//                       </div>

//                       <span
//                         className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
//                         style={{
//                           backgroundColor: item.tripCancelled
//                             ? "rgba(217,74,61,0.12)"
//                             : item.available
//                               ? "rgba(47,125,79,0.12)"
//                               : "rgba(138,122,87,0.14)",
//                           color: item.tripCancelled
//                             ? "#D94A3D"
//                             : item.available
//                               ? "#2F7D4F"
//                               : "#8A7A57",
//                         }}
//                       >
//                         {item.tripCancelled
//                           ? "Cancelled"
//                           : item.available
//                             ? "Available"
//                             : "Sold Out"}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Green accent rail — signature hover moment */}
//                   <div
//                     className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
//                     style={{ backgroundColor: "#2F7D4F" }}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* Show More */}
//             {filterTour.length > visibleCount && (
//               <div className="text-center mt-16">
//                 <button
//                   onClick={handleShowMore}
//                   className="px-10 py-4 rounded-lg font-semibold text-sm transition-all shadow-sm hover:shadow-md border"
//                   style={{
//                     backgroundColor: "#FDFBF5",
//                     color: "#2F7D4F",
//                     borderColor: "#2F7D4F",
//                   }}
//                 >
//                   Show More Tours
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Pulse animation */}
//       <style>{`
//         @keyframes pulse-slow {
//           0%, 100% { transform: scale(1); opacity: 0.2; }
//           50% { transform: scale(1.05); opacity: 0.3; }
//         }
//         .animate-pulse-slow { animation: pulse-slow 15s ease-in-out infinite; }
//         .delay-2000 { animation-delay: 2s; }

//         /* Staggered entrance — each card rises and fades in, offset by
//            its animationDelay (set inline per card index). */
//         @keyframes tourCardRise {
//           from { opacity: 0; transform: translateY(22px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .tour-card {
//           opacity: 0;
//           animation: tourCardRise 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
//         }

//         /* Signature hover moment: a soft diagonal light sweep glides
//            across the photo, like sunlight crossing a scene. */
//         .tour-card-sheen {
//           background: linear-gradient(
//             115deg,
//             transparent 0%,
//             transparent 40%,
//             rgba(255, 255, 255, 0.35) 50%,
//             transparent 60%,
//             transparent 100%
//           );
//           background-size: 250% 250%;
//           background-position: -100% -100%;
//           transition: background-position 0.9s ease;
//         }
//         .group:hover .tour-card-sheen {
//           background-position: 100% 100%;
//         }

//         /* ── Premium vertical "Booking Closed" ribbon ─────────────────────
//            A hanging shield-shaped ribbon (like a classic gift/deal
//            banner) — rectangular top tapering to a point at the bottom,
//            built with clip-path. A second, slightly inset layer with a
//            dashed border sits on top for that boutique-label look, and a
//            drop-shadow gives it real depth off the photo. Text sits on
//            two lines to stay legible at this width. Pops in on mount and
//            gets a slow shimmer sweep so it still reads as "live", but
//            the shape itself is the star this time. */
//         /* ── Premium vertical "Booking Closed" ribbon (simplified) ───────
//            Deliberately built as ONE element with clip-path + box-shadow
//            only — no stacked ::before/::after pseudo-elements combined
//            with filter, which can silently fail to paint in some Chrome
//            versions when animated together. Shape: rectangular top
//            tapering to a point at the bottom (shield/bookmark cut). */
//         .tour-ribbon-v {
//           width: 60px;
//           padding: 8px 4px 16px;
//           background: linear-gradient(165deg, #dc2626 0%, #7f1d1d 100%);
//           clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%);
//           box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
//           color: #fff;
//           font-size: 8.5px;
//           font-weight: 800;
//           letter-spacing: 0.04em;
//           text-align: center;
//           display: flex;
//           flex-direction: column;
//           line-height: 1.4;
//           animation: ribbonPopIn 0.4s ease-out both;
//         }
//         @keyframes ribbonPopIn {
//           0% { transform: translateY(-10px); opacity: 0; }
//           100% { transform: translateY(0); opacity: 1; }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .tour-card { animation: none; opacity: 1; }
//           .tour-card-sheen { transition: none; }
//           .tour-ribbon-v { animation: none; }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Tours;


import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";
import { MapPin, Clock } from "lucide-react";

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

        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Top Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <button
                onClick={() => setSelectedYear("all")}
                className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
                  selectedYear === "all"
                    ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200/30 scale-105"
                    : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                All Tours
              </button>

              {/* Year Dropdown */}
              <div className="relative min-w-[160px]">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="
                    appearance-none w-full px-6 py-3 pr-12 
                    rounded-full bg-white/70 backdrop-blur-xl 
                    border border-white/40 shadow-lg shadow-black/5
                    text-gray-800 text-sm font-medium
                    focus:outline-none focus:ring-4 focus:ring-indigo-300/50 focus:border-indigo-500
                    transition-all duration-300 cursor-pointer
                    hover:bg-white/90 hover:shadow-xl"
                >
                  <option value="all">All Years</option>
                  {availableYears?.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {/* Custom elegant arrow */}
                <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-500 text-base font-bold">
                  ▼
                </span>
              </div>

              {/* Month Dropdown */}
              <div className="relative min-w-[180px]">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="
                    appearance-none w-full px-6 py-3 pr-12 
                    rounded-full bg-white/70 backdrop-blur-xl 
                    border border-white/40 shadow-lg shadow-black/5
                    text-gray-800 text-sm font-medium
                    focus:outline-none focus:ring-4 focus:ring-indigo-300/50 focus:border-indigo-500
                    transition-all duration-300 cursor-pointer
                    hover:bg-white/90 hover:shadow-xl"
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
                <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-500 text-base font-bold">
                  ▼
                </span>
              </div>
            </div>

            {/* Availability Buttons */}
            <div className="flex gap-3 flex-wrap justify-center">
              {["Available", "Sold Out", "Cancelled"].map((label) => {
                const value = label.toLowerCase().replace(" ", "");
                return (
                  <button
                    key={label}
                    onClick={() => setAvailability(value)}
                    className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
                      availability === value
                        ? label === "Available"
                          ? "bg-green-600 text-white border-green-600 shadow-xl shadow-green-200/30 scale-105"
                          : label === "Sold Out"
                            ? "bg-red-600 text-white border-red-600 shadow-xl shadow-red-200/30 scale-105"
                            : "bg-gray-700 text-white border-gray-700 shadow-xl shadow-gray-300/30 scale-105"
                        : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.value || "all"}
                onClick={() => {
                  setActiveCategory(cat.value);
                  navigate(cat.value ? `/tours/${cat.value}` : "/tours");
                }}
                className={`category-button px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md ${
                  activeCategory === cat.value
                    ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200/30 scale-105"
                    : "bg-white/70 border-gray-200 text-gray-700 hover:bg-white/90 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Clear Filters Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                setSelectedMonth("all");
                setSelectedYear("all");
                setAvailability("available");
                setActiveCategory(null);
                navigate("/tours");
              }}
              className="px-10 py-4 bg-white-50 text-indigo-700 rounded-full font-medium hover:bg-blue-50 transition-all shadow-md hover:shadow-lg text-red-700 "
            >
              Clear Filters
            </button>
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
                      className="text-base md:text-lg font-bold leading-snug line-clamp-2 mb-2 transition-colors duration-300 text-[#232323] group-hover:text-blue-600"
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

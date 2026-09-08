// // // /* eslint-disable no-unused-vars */

// // // import React, { useContext, useEffect, useState } from "react";
// // // import { useParams, useNavigate, useLocation } from "react-router-dom";
// // // import { TourAppContext } from "../context/TourAppContext.jsx";
// // // import { toast } from "react-toastify";
// // // import jsPDF from "jspdf";

// // // const TourDetails = () => {
// // //   const { tourId } = useParams();
// // //   const navigate = useNavigate();
// // //   const location = useLocation(); // ← Added to capture current URL
// // //   const { tours, currencySymbol, token, userData } = useContext(TourAppContext);

// // //   const [tour, setTour] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [bookingLoading, setBookingLoading] = useState(false);
// // //   const [openVariants, setOpenVariants] = useState({});
// // //   const [openItinerary, setOpenItinerary] = useState({});

// // //   useEffect(() => {
// // //     if (tours.length > 0) {
// // //       const foundTour = tours.find((t) => t._id === tourId);
// // //       if (foundTour) setTour(foundTour);
// // //       else {
// // //         toast.error("Tour not found.");
// // //         navigate("/tours");
// // //       }
// // //       setLoading(false);
// // //     }
// // //   }, [tours, tourId, navigate]);

// // //   // Existing scroll animation for other sections
// // //   useEffect(() => {
// // //     const observer = new IntersectionObserver(
// // //       (entries) => {
// // //         entries.forEach((entry) => {
// // //           if (entry.isIntersecting) {
// // //             entry.target.classList.add("animate-fade-up");
// // //           }
// // //         });
// // //       },
// // //       { threshold: 0.1 },
// // //     );
// // //     document
// // //       .querySelectorAll(".animate-on-scroll")
// // //       .forEach((el) => observer.observe(el));
// // //     return () => observer.disconnect();
// // //   }, [tour]);

// // //   // New: Scroll animation specifically for Completed Trips Banner
// // //   useEffect(() => {
// // //     const bannerObserver = new IntersectionObserver(
// // //       (entries) => {
// // //         entries.forEach((entry) => {
// // //           if (entry.isIntersecting) {
// // //             entry.target.classList.add("visible");
// // //           }
// // //         });
// // //       },
// // //       { threshold: 0.2, rootMargin: "0px 0px -50px 0px" },
// // //     );

// // //     const banner = document.getElementById("completed-trips-banner");
// // //     if (banner) bannerObserver.observe(banner);

// // //     return () => {
// // //       if (banner) bannerObserver.unobserve(banner);
// // //     };
// // //   }, [tour]);

// // //   const toggleVariant = (index) =>
// // //     setOpenVariants((prev) => ({ ...prev, [index]: !prev[index] }));

// // //   const toggleItineraryDay = (pkgKey, dayIndex) =>
// // //     setOpenItinerary((prev) => ({
// // //       ...prev,
// // //       [`${pkgKey}-${dayIndex}`]: !prev[`${pkgKey}-${dayIndex}`],
// // //     }));

// // //   const formatDate = (dateString) =>
// // //     new Date(dateString).toLocaleDateString("en-IN", {
// // //       weekday: "long",
// // //       year: "numeric",
// // //       month: "long",
// // //       day: "numeric",
// // //     });

// // //   const handleBookNow = () => {
// // //     if (!tour.available) {
// // //       toast.error("This tour is currently sold out.");
// // //       return;
// // //     }

// // //     setBookingLoading(true);

// // //     if (!token || !userData?._id) {
// // //       // Not logged in → redirect to login with return path
// // //       toast.info("Please login or create an account to continue booking");

// // //       navigate("/login", {
// // //         state: { from: location.pathname + location.search },
// // //         replace: true,
// // //       });
// // //     } else {
// // //       // Already logged in → go to booking
// // //       navigate(`/booking/${tour._id}`);
// // //     }

// // //     setTimeout(() => {
// // //       setBookingLoading(false);
// // //     }, 300);
// // //   };

// // //   if (loading)
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// // //         <p className="text-lg text-gray-600">Loading tour details...</p>
// // //       </div>
// // //     );

// // //   if (!tour) return null;

// // //   // Professional sold-out message component
// // //   const SoldOutMessage = () => (
// // //     <div className="text-center py-16 px-6 bg-gradient-to-b from-red-50 to-white rounded-3xl shadow-xl border border-red-100 max-w-4xl mx-auto animate-fade-up">
// // //       <div className="text-6xl mb-6 text-red-500 animate-pulse">✗</div>
// // //       <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-6">
// // //         This Tour is Currently Sold Out
// // //       </h2>
// // //       <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
// // //         We're sorry, but all seats for this batch have been booked. Thank you
// // //         for your interest!
// // //       </p>
// // //       <p className="text-base text-gray-600 mb-10">
// // //         Check out our other upcoming tours or join the waitlist for future
// // //         batches.
// // //       </p>
// // //       <div className="flex flex-col sm:flex-row gap-4 justify-center">
// // //         <button
// // //           onClick={() => navigate("/tours")}
// // //           className="px-8 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition shadow-lg"
// // //         >
// // //           Explore Other Tours
// // //         </button>
// // //         <button
// // //           onClick={() => navigate("/contact")}
// // //           className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 font-medium rounded-full hover:bg-blue-50 transition shadow-lg"
// // //         >
// // //           Join Waitlist / Contact Us
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );

// // //   const renderDepartureDates = (dates, title) => {
// // //     if (!dates?.length) return null;
// // //     return (
// // //       <div className="mb-12">
// // //         <h3 className="text-xl font-semibold text-gray-800 mb-6">{title}</h3>
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
// // //           {dates
// // //             .sort((a, b) => new Date(a.date) - new Date(b.date))
// // //             .map((dep, i) => (
// // //               <div
// // //                 key={i}
// // //                 className="bg-white p-6 rounded-xl shadow-sm border text-center"
// // //               >
// // //                 <p className="text-lg font-bold text-indigo-700">
// // //                   {formatDate(dep.date)}
// // //                 </p>
// // //                 <p
// // //                   className={`mt-3 text-base font-medium ${
// // //                     dep.status === "Available"
// // //                       ? "text-green-600"
// // //                       : "text-red-600"
// // //                   }`}
// // //                 >
// // //                   {dep.status || "Available"}
// // //                 </p>
// // //               </div>
// // //             ))}
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   const renderPackageContent = (pkg, pkgKey = "main") => (
// // //     <div className="space-y-12">
// // //       {/* Tour Price */}
// // //       <div>
// // //         <h3 className="text-xl font-semibold text-gray-800 mb-5">
// // //           Tour Price (per person)
// // //         </h3>
// // //         <div className="bg-gray-50 p-6 rounded-xl border space-y-4">
// // //           <div className="flex justify-between text-base">
// // //             <span>Double Sharing</span>
// // //             <span className="font-bold text-indigo-700">
// // //               {pkg.price.doubleSharing?.toLocaleString()} INR
// // //             </span>
// // //           </div>
// // //           <div className="flex justify-between text-base">
// // //             <span>Triple Sharing</span>
// // //             <span className="font-bold text-indigo-700">
// // //               {pkg.price.tripleSharing?.toLocaleString()} INR
// // //             </span>
// // //           </div>
// // //           {pkg.price.childWithBerth && (
// // //             <div className="flex justify-between text-base">
// // //               <span>Child with Berth</span>
// // //               <span className="font-bold text-indigo-700">
// // //                 {pkg.price.childWithBerth.toLocaleString()} INR
// // //               </span>
// // //             </div>
// // //           )}
// // //           {pkg.price.childWithoutBerth && (
// // //             <div className="flex justify-between text-base">
// // //               <span>Child without Berth</span>
// // //               <span className="font-bold text-indigo-700">
// // //                 {pkg.price.childWithoutBerth.toLocaleString()} INR
// // //               </span>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Advance Payment */}
// // //       <div>
// // //         <h3 className="text-xl font-semibold text-gray-800 mb-5">
// // //           Advance Payment Required
// // //         </h3>
// // //         <div className="bg-gray-50 p-6 rounded-xl border space-y-4">
// // //           <div className="flex justify-between text-base">
// // //             <span>Adult</span>
// // //             <span className="font-bold text-indigo-700">
// // //               {pkg.advanceAmount.adult?.toLocaleString()} INR
// // //             </span>
// // //           </div>
// // //           <div className="flex justify-between text-base">
// // //             <span>Child</span>
// // //             <span className="font-bold text-indigo-700">
// // //               {pkg.advanceAmount.child || 0} INR
// // //             </span>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {renderDepartureDates(pkg.departureDates, "Departure Dates")}

// // //       {pkg.sightseeing?.length > 0 && (
// // //         <div>
// // //           <h3 className="text-xl font-semibold text-gray-800 mb-5">
// // //             Sightseeing Highlights
// // //           </h3>
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //             {pkg.sightseeing.map((place, i) => (
// // //               <div key={i} className="bg-white p-5 rounded-xl shadow-sm border">
// // //                 <p className="text-base">• {place}</p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {pkg.itinerary?.length > 0 && (
// // //         <div>
// // //           <h3 className="text-xl font-semibold text-gray-800 mb-5">
// // //             Day-wise Itinerary
// // //           </h3>
// // //           <div className="space-y-3">
// // //             {pkg.itinerary.map((dayDesc, i) => (
// // //               <div
// // //                 key={i}
// // //                 className="border border-gray-200 rounded-xl overflow-hidden"
// // //               >
// // //                 <button
// // //                   onClick={() => toggleItineraryDay(pkgKey, i)}
// // //                   className="w-full text-left bg-gray-50 hover:bg-gray-100 px-6 py-4 flex justify-between items-center transition"
// // //                 >
// // //                   <span className="font-semibold text-indigo-700">
// // //                     Day {i + 1}
// // //                   </span>
// // //                   <span
// // //                     className={`text-2xl text-indigo-700 transition-transform duration-300 ${
// // //                       openItinerary[`${pkgKey}-${i}`] ? "rotate-180" : ""
// // //                     }`}
// // //                   >
// // //                     ▼
// // //                   </span>
// // //                 </button>
// // //                 <div
// // //                   className={`transition-all duration-500 overflow-hidden ${
// // //                     openItinerary[`${pkgKey}-${i}`]
// // //                       ? "max-h-96 opacity-100"
// // //                       : "max-h-0 opacity-0"
// // //                   }`}
// // //                 >
// // //                   <div className="p-6 bg-white text-gray-700 leading-relaxed whitespace-pre-line">
// // //                     {dayDesc}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Train Details */}
// // //       {pkg.trainDetails?.length > 0 && (
// // //         <div>
// // //           <h3 className="text-xl font-semibold text-gray-800 mb-5">
// // //             Train Journey Details
// // //           </h3>
// // //           <div className="space-y-4">
// // //             {pkg.trainDetails.map((t, i) => (
// // //               <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
// // //                 <p className="font-medium text-gray-800">
// // //                   {t.trainNo} - {t.trainName}
// // //                 </p>
// // //                 <p className="text-gray-600 mt-2">
// // //                   Route: {t.fromStation} → {t.toStation}
// // //                 </p>
// // //                 <p className="text-gray-600">Class: {t.class}</p>
// // //                 <p className="text-gray-600">
// // //                   Timing: {t.departureTime} → {t.arrivalTime}
// // //                 </p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Flight Details */}
// // //       {pkg.flightDetails?.length > 0 && (
// // //         <div>
// // //           <h3 className="text-xl font-semibold text-gray-800 mb-5">
// // //             Flight Details
// // //           </h3>
// // //           <div className="space-y-4">
// // //             {pkg.flightDetails.map((f, i) => (
// // //               <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
// // //                 <p className="font-medium text-gray-800">
// // //                   {f.airline} {f.flightNo}
// // //                 </p>
// // //                 <p className="text-gray-600 mt-2">
// // //                   Route: {f.fromAirport} → {f.toAirport}
// // //                 </p>
// // //                 <p className="text-gray-600">Class: {f.class}</p>
// // //                 <p className="text-gray-600">
// // //                   Timing: {f.departureTime} → {f.arrivalTime}
// // //                 </p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Boarding & Deboarding */}
// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // //         {pkg.boardingPoints?.length > 0 && (
// // //           <div>
// // //             <h3 className="text-xl font-semibold text-gray-800 mb-5">
// // //               Boarding Points
// // //             </h3>
// // //             <div className="bg-gray-50 p-6 rounded-xl border">
// // //               <ul className="space-y-3">
// // //                 {pkg.boardingPoints.map((bp, i) => (
// // //                   <li key={i} className="flex items-center gap-3">
// // //                     <span className="text-indigo-700">•</span>
// // //                     <span>
// // //                       {bp.stationName} ({bp.stationCode})
// // //                     </span>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             </div>
// // //           </div>
// // //         )}
// // //         {pkg.deboardingPoints?.length > 0 && (
// // //           <div>
// // //             <h3 className="text-xl font-semibold text-gray-800 mb-5">
// // //               Deboarding Points
// // //             </h3>
// // //             <div className="bg-gray-50 p-6 rounded-xl border">
// // //               <ul className="space-y-3">
// // //                 {pkg.deboardingPoints.map((dp, i) => (
// // //                   <li key={i} className="flex items-center gap-3">
// // //                     <span className="text-indigo-700">•</span>
// // //                     <span>
// // //                       {dp.stationName} ({dp.stationCode})
// // //                     </span>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Optional Add-ons */}
// // //       {pkg.addons?.length > 0 && (
// // //         <div>
// // //           <h3 className="text-xl font-semibold text-gray-800 mb-5">
// // //             Optional Add-ons
// // //           </h3>
// // //           <div className="bg-gray-50 p-6 rounded-xl border space-y-4">
// // //             {pkg.addons.map((addon, i) => (
// // //               <div
// // //                 key={i}
// // //                 className="flex justify-between items-center text-base py-3 border-b border-gray-200 last:border-0"
// // //               >
// // //                 <span className="text-gray-700 font-medium">{addon.name}</span>
// // //                 <span className="font-bold text-indigo-700">
// // //                   {addon.amount.toLocaleString()} INR
// // //                 </span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Remarks */}
// // //       {pkg.remarks && pkg.remarks.trim() !== "" && (
// // //         <div>
// // //           <h3 className="text-xl font-semibold text-indigo-700 mb-4">
// // //             Important Remarks
// // //           </h3>
// // //           <div className="bg-blue-50 border-l-4 border-indigo-700 p-6 rounded-r-xl">
// // //             <p className="text-gray-700 leading-relaxed whitespace-pre-line">
// // //               {pkg.remarks}
// // //             </p>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Includes & Excludes */}
// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
// // //         {pkg.includes?.length > 0 && (
// // //           <div>
// // //             <h3 className="text-2xl font-bold text-green-800 mb-6">
// // //               Package Includes
// // //             </h3>
// // //             <ul className="space-y-4">
// // //               {pkg.includes.map((inc, i) => (
// // //                 <li key={i} className="flex items-start gap-4">
// // //                   <span className="text-2xl text-green-600 mt-1 flex-shrink-0">
// // //                     ✓
// // //                   </span>
// // //                   <span className="text-gray-700 leading-relaxed">{inc}</span>
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </div>
// // //         )}
// // //         {pkg.excludes?.length > 0 && (
// // //           <div>
// // //             <h3 className="text-2xl font-bold text-red-800 mb-6">
// // //               Package Excludes
// // //             </h3>
// // //             <ul className="space-y-4">
// // //               {pkg.excludes.map((exc, i) => (
// // //                 <li key={i} className="flex items-start gap-4">
// // //                   <span className="text-2xl text-red-600 mt-1 flex-shrink-0">
// // //                     ✗
// // //                   </span>
// // //                   <span className="text-gray-700 leading-relaxed">{exc}</span>
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );

// // //   return (
// // //     <>
// // //       <div className="bg-gray-50 min-h-screen">
// // //         {/* Hero Section */}
// // //         <div className="relative h-[55vh] sm:h-[65vh] md:h-[70vh] overflow-hidden">
// // //           <img
// // //             src={tour.titleImage}
// // //             alt={tour.title}
// // //             className="w-full h-full object-cover"
// // //           />
// // //           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

// // //           <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white text-center">
// // //             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight">
// // //               {tour.title}
// // //             </h1>
// // //             <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8">
// // //               {tour.duration.days} Days / {tour.duration.nights} Nights • Batch:{" "}
// // //               {tour.batch}
// // //             </p>

// // //             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
// // //               {tour.available ? (
// // //                 <button
// // //                   onClick={handleBookNow}
// // //                   disabled={bookingLoading}
// // //                   className={`px-8 py-3 bg-green-500 text-white font-bold rounded-full text-base flex items-center justify-center gap-2 transition shadow-lg max-w-xs mx-auto sm:mx-0 ${
// // //                     bookingLoading
// // //                       ? "opacity-80 cursor-not-allowed"
// // //                       : "hover:bg-green-600 hover:shadow-xl"
// // //                   }`}
// // //                 >
// // //                   {bookingLoading ? (
// // //                     <>
// // //                       <svg
// // //                         className="animate-spin h-5 w-5 text-white"
// // //                         viewBox="0 0 24 24"
// // //                       >
// // //                         <circle
// // //                           className="opacity-25"
// // //                           cx="12"
// // //                           cy="12"
// // //                           r="10"
// // //                           stroke="currentColor"
// // //                           strokeWidth="4"
// // //                           fill="none"
// // //                         />
// // //                         <path
// // //                           className="opacity-75"
// // //                           fill="currentColor"
// // //                           d="M4 12a8 8 0 018-8v8z"
// // //                         />
// // //                       </svg>
// // //                       Processing...
// // //                     </>
// // //                   ) : (
// // //                     "Book This Tour"
// // //                   )}
// // //                 </button>
// // //               ) : (
// // //                 <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-xl shadow-2xl animate-pulse">
// // //                   SOLD OUT
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Completed Trips Banner with Scroll Animation */}
// // //         {tour.completedTripsCount > 0 && (
// // //           <div className=" py-12 md:py-16 overflow-hidden">
// // //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //               <div
// // //                 id="completed-trips-banner"
// // //                 className="text-center opacity-0 translate-y-12 transition-all duration-1000 ease-out"
// // //               >
// // //                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
// // //                   <span className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl animate-bounce-slow  ">
// // //                     🎉
// // //                   </span>

// // //                   <div className="space-y-4">
// // //                     <p className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
// // //                       Successfully Completed{" "}
// // //                       <span className="text-yellow-500 text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-md">
// // //                         {tour.completedTripsCount}
// // //                       </span>{" "}
// // //                       {tour.completedTripsCount === 1 ? "Trip" : "Trips"}
// // //                     </p>
// // //                     <p className="text-lg sm:text-xl md:text-xl text-gray-700 font-medium opacity-90">
// // //                       Trusted by thousands of happy travelers!
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Sold Out Message + Only Image Gallery (no other details) */}
// // //         {!tour.available ? (
// // //           <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
// // //             <SoldOutMessage />

// // //             {tour.galleryImages?.length > 0 && (
// // //               <section className="mt-16 animate-fade-up">
// // //                 <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8 text-center">
// // //                   Tour Gallery
// // //                 </h2>
// // //                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
// // //                   {tour.galleryImages.map((img, i) => (
// // //                     <div
// // //                       key={i}
// // //                       className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition"
// // //                     >
// // //                       <img
// // //                         src={img}
// // //                         alt={`Gallery ${i + 1}`}
// // //                         className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
// // //                       />
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </section>
// // //             )}
// // //           </div>
// // //         ) : (
// // //           <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
// // //             {/* Gallery */}
// // //             {tour.galleryImages?.length > 0 && (
// // //               <section className="animate-on-scroll opacity-0 mb-16">
// // //                 <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8 text-center">
// // //                   Tour Gallery
// // //                 </h2>
// // //                 <div className="flex justify-center">
// // //                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl">
// // //                     {tour.galleryImages.map((img, i) => (
// // //                       <div
// // //                         key={i}
// // //                         className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition"
// // //                       >
// // //                         <img
// // //                           src={img}
// // //                           alt={`Gallery ${i + 1}`}
// // //                           className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
// // //                         />
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               </section>
// // //             )}

// // //             {/* Route Map */}
// // //             {tour.mapImage && (
// // //               <section className="animate-on-scroll opacity-0 mb-16">
// // //                 <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8 text-center">
// // //                   Route Map
// // //                 </h2>
// // //                 <div className="flex justify-center">
// // //                   <img
// // //                     src={tour.mapImage}
// // //                     alt="Route Map"
// // //                     className="w-full max-w-2xl rounded-2xl shadow-lg"
// // //                   />
// // //                 </div>
// // //               </section>
// // //             )}

// // //             {/* Main Package */}
// // //             <section className="animate-on-scroll opacity-0 mb-16">
// // //               <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8">
// // //                 Main Tour Package
// // //               </h2>
// // //               {tour.destination?.length > 0 && (
// // //                 <div className="mb-10">
// // //                   <h3 className="text-xl font-semibold text-gray-800 mb-4">
// // //                     Journey Route
// // //                   </h3>
// // //                   <p className="text-lg bg-white p-6 rounded-xl shadow-sm border text-center">
// // //                     {tour.destination.join(" → ")}
// // //                   </p>
// // //                 </div>
// // //               )}
// // //               {renderPackageContent(tour, "main")}
// // //             </section>

// // //             {/* Variant Packages */}
// // //             {tour.variantPackage?.length > 0 && (
// // //               <section className="animate-on-scroll opacity-0">
// // //                 <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8">
// // //                   Variant Packages
// // //                 </h2>
// // //                 {tour.variantPackage.map((variant, i) => (
// // //                   <div key={i} className="mb-10">
// // //                     <button
// // //                       onClick={() => toggleVariant(i)}
// // //                       className="w-full text-left bg-indigo-50 hover:bg-indigo-100 px-6 py-5 rounded-xl flex justify-between items-center mb-4 transition"
// // //                     >
// // //                       <span className="text-lg font-semibold text-indigo-800">
// // //                         Variant Package {i + 1}
// // //                       </span>
// // //                       <span
// // //                         className={`text-2xl transition-transform ${
// // //                           openVariants[i] ? "rotate-180" : ""
// // //                         }`}
// // //                       >
// // //                         ▼
// // //                       </span>
// // //                     </button>
// // //                     {openVariants[i] && (
// // //                       <div className="bg-white rounded-xl shadow-sm border p-6">
// // //                         {renderPackageContent(variant, `variant-${i}`)}
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 ))}
// // //               </section>
// // //             )}

// // //             {/* Final CTA */}
// // //             <section className="text-center py-16 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-3xl shadow-xl animate-on-scroll opacity-0">
// // //               <h2 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-6">
// // //                 Ready to Explore?
// // //               </h2>
// // //               <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
// // //                 {tour.available
// // //                   ? "Secure your seat today for an unforgettable journey!"
// // //                   : "This tour is currently sold out. Check out our other available tours!"}
// // //               </p>
// // //               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
// // //                 {tour.available ? (
// // //                   <button
// // //                     onClick={handleBookNow}
// // //                     disabled={bookingLoading}
// // //                     className={`px-10 py-4 bg-green-500 text-white font-bold rounded-full text-lg flex items-center justify-center gap-3 transition shadow-xl max-w-sm mx-auto ${
// // //                       bookingLoading
// // //                         ? "opacity-80 cursor-not-allowed"
// // //                         : "hover:bg-green-600 hover:scale-105"
// // //                     }`}
// // //                   >
// // //                     {bookingLoading ? (
// // //                       <>
// // //                         <svg
// // //                           className="animate-spin h-6 w-6 text-white"
// // //                           viewBox="0 0 24 24"
// // //                         >
// // //                           <circle
// // //                             className="opacity-25"
// // //                             cx="12"
// // //                             cy="12"
// // //                             r="10"
// // //                             stroke="currentColor"
// // //                             strokeWidth="4"
// // //                             fill="none"
// // //                           />
// // //                           <path
// // //                             className="opacity-75"
// // //                             fill="currentColor"
// // //                             d="M4 12a8 8 0 018-8v8z"
// // //                           />
// // //                         </svg>
// // //                         Processing...
// // //                       </>
// // //                     ) : (
// // //                       "Book Now"
// // //                     )}
// // //                   </button>
// // //                 ) : (
// // //                   <div className="bg-red-600 text-white px-8 py-3 rounded-full font-bold text-xl shadow-2xl">
// // //                     SOLD OUT
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </section>
// // //           </div>
// // //         )}
// // //       </div>

// // //       <style>{`
// // //         .animate-fade-up {
// // //           opacity: 1 !important;
// // //           transform: translateY(0) !important;
// // //         }
// // //         .animate-on-scroll {
// // //           opacity: 0;
// // //           transform: translateY(30px);
// // //           transition: opacity 1s ease, transform 1s ease;
// // //         }

// // //         #completed-trips-banner {
// // //           opacity: 0;
// // //           transform: translateY(48px);
// // //           transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
// // //         }
// // //         #completed-trips-banner.visible {
// // //           opacity: 1;
// // //           transform: translateY(0);
// // //         }

// // //         @keyframes bounce-slow {
// // //           0%, 100% { transform: translateY(0); }
// // //           50% { transform: translateY(-20px); }
// // //         }
// // //         .animate-bounce-slow {
// // //           animation: bounce-slow 4s ease-in-out infinite;
// // //         }
// // //       `}</style>
// // //     </>
// // //   );
// // // };

// // // export default TourDetails;


// // /* eslint-disable no-unused-vars */

// // import React, { useContext, useEffect, useState } from "react";
// // import { useParams, useNavigate, useLocation } from "react-router-dom";
// // import { TourAppContext } from "../context/TourAppContext.jsx";
// // import { toast } from "react-toastify";
// // import jsPDF from "jspdf";

// // const TourDetails = () => {
// //   const { tourId } = useParams();
// //   const navigate = useNavigate();
// //   const location = useLocation(); // ← Added to capture current URL
// //   const { tours, currencySymbol, token, userData } = useContext(TourAppContext);

// //   const [tour, setTour] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [bookingLoading, setBookingLoading] = useState(false);
// //   const [openVariants, setOpenVariants] = useState({});
// //   const [openItinerary, setOpenItinerary] = useState({});

// //   useEffect(() => {
// //     if (tours.length > 0) {
// //       const foundTour = tours.find((t) => t._id === tourId);
// //       if (foundTour) setTour(foundTour);
// //       else {
// //         toast.error("Tour not found.");
// //         navigate("/tours");
// //       }
// //       setLoading(false);
// //     }
// //   }, [tours, tourId, navigate]);

// //   // Existing scroll animation for other sections
// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       (entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) {
// //             entry.target.classList.add("animate-fade-up");
// //           }
// //         });
// //       },
// //       { threshold: 0.1 },
// //     );
// //     document
// //       .querySelectorAll(".animate-on-scroll")
// //       .forEach((el) => observer.observe(el));
// //     return () => observer.disconnect();
// //   }, [tour]);

// //   // New: Scroll animation specifically for Completed Trips Banner
// //   useEffect(() => {
// //     const bannerObserver = new IntersectionObserver(
// //       (entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) {
// //             entry.target.classList.add("visible");
// //           }
// //         });
// //       },
// //       { threshold: 0.2, rootMargin: "0px 0px -50px 0px" },
// //     );

// //     const banner = document.getElementById("completed-trips-banner");
// //     if (banner) bannerObserver.observe(banner);

// //     return () => {
// //       if (banner) bannerObserver.unobserve(banner);
// //     };
// //   }, [tour]);

// //   const toggleVariant = (index) =>
// //     setOpenVariants((prev) => ({ ...prev, [index]: !prev[index] }));

// //   const toggleItineraryDay = (pkgKey, dayIndex) =>
// //     setOpenItinerary((prev) => ({
// //       ...prev,
// //       [`${pkgKey}-${dayIndex}`]: !prev[`${pkgKey}-${dayIndex}`],
// //     }));

// //   const formatDate = (dateString) =>
// //     new Date(dateString).toLocaleDateString("en-IN", {
// //       weekday: "long",
// //       year: "numeric",
// //       month: "long",
// //       day: "numeric",
// //     });

// //   // Whether booking is currently possible at all — used by both CTA
// //   // spots below instead of just tour.available, so a cancelled trip or
// //   // an admin-closed booking window blocks booking the same way sold-out
// //   // already does.
// //   const canBook = tour?.available && !tour?.tripCancelled && !tour?.bookingClosed;
// //   const handleBookNow = () => {
// //     if (tour.tripCancelled) {
// //       toast.error("This trip has been cancelled and is no longer bookable.");
// //       return;
// //     }
// //     if (tour.bookingClosed) {
// //       toast.error("Bookings for this tour are currently closed.");
// //       return;
// //     }
// //     if (!tour.available) {
// //       toast.error("This tour is currently sold out.");
// //       return;
// //     }

// //     setBookingLoading(true);

// //     if (!token || !userData?._id) {
// //       // Not logged in → redirect to login with return path
// //       toast.info("Please login or create an account to continue booking");

// //       navigate("/login", {
// //         state: { from: location.pathname + location.search },
// //         replace: true,
// //       });
// //     } else {
// //       // Already logged in → go to booking
// //       navigate(`/booking/${tour._id}`);
// //     }

// //     setTimeout(() => {
// //       setBookingLoading(false);
// //     }, 300);
// //   };

// //   if (loading)
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// //         <p className="text-lg text-gray-600">Loading tour details...</p>
// //       </div>
// //     );

// //   if (!tour) return null;

// //   // Professional sold-out message component
// //   const SoldOutMessage = () => (
// //     <div className="text-center py-16 px-6 bg-gradient-to-b from-red-50 to-white rounded-3xl shadow-xl border border-red-100 max-w-4xl mx-auto animate-fade-up">
// //       <div className="text-6xl mb-6 text-red-500 animate-pulse">✗</div>
// //       <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-6">
// //         This Tour is Currently Sold Out
// //       </h2>
// //       <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
// //         We're sorry, but all seats for this batch have been booked. Thank you
// //         for your interest!
// //       </p>
// //       <p className="text-base text-gray-600 mb-10">
// //         Check out our other upcoming tours or join the waitlist for future
// //         batches.
// //       </p>
// //       <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //         <button
// //           onClick={() => navigate("/tours")}
// //           className="px-8 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition shadow-lg"
// //         >
// //           Explore Other Tours
// //         </button>
// //         <button
// //           onClick={() => navigate("/contact")}
// //           className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 font-medium rounded-full hover:bg-blue-50 transition shadow-lg"
// //         >
// //           Join Waitlist / Contact Us
// //         </button>
// //       </div>
// //     </div>
// //   );

// //   const renderDepartureDates = (dates, title) => {
// //     if (!dates?.length) return null;
// //     return (
// //       <div className="mb-12">
// //         <h3 className="text-xl font-semibold text-gray-800 mb-6">{title}</h3>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
// //           {dates
// //             .sort((a, b) => new Date(a.date) - new Date(b.date))
// //             .map((dep, i) => (
// //               <div
// //                 key={i}
// //                 className="bg-white p-6 rounded-xl shadow-sm border text-center"
// //               >
// //                 <p className="text-lg font-bold text-indigo-700">
// //                   {formatDate(dep.date)}
// //                 </p>
// //                 <p
// //                   className={`mt-3 text-base font-medium ${dep.status === "Available"
// //                       ? "text-green-600"
// //                       : "text-red-600"
// //                     }`}
// //                 >
// //                   {dep.status || "Available"}
// //                 </p>
// //               </div>
// //             ))}
// //         </div>
// //       </div>
// //     );
// //   };

// //   const renderPackageContent = (pkg, pkgKey = "main") => (
// //     <div className="space-y-12">
// //       {/* Tour Price */}
// //       <div>
// //         <h3 className="text-xl font-semibold text-gray-800 mb-5">
// //           Tour Price (per person)
// //         </h3>
// //         <div className="bg-gray-50 p-6 rounded-xl border space-y-4">
// //           <div className="flex justify-between text-base">
// //             <span>Double Sharing</span>
// //             <span className="font-bold text-indigo-700">
// //               {pkg.price.doubleSharing?.toLocaleString()} INR
// //             </span>
// //           </div>
// //           <div className="flex justify-between text-base">
// //             <span>Triple Sharing</span>
// //             <span className="font-bold text-indigo-700">
// //               {pkg.price.tripleSharing?.toLocaleString()} INR
// //             </span>
// //           </div>
// //           {pkg.price.childWithBerth && (
// //             <div className="flex justify-between text-base">
// //               <span>Child with Berth</span>
// //               <span className="font-bold text-indigo-700">
// //                 {pkg.price.childWithBerth.toLocaleString()} INR
// //               </span>
// //             </div>
// //           )}
// //           {pkg.price.childWithoutBerth && (
// //             <div className="flex justify-between text-base">
// //               <span>Child without Berth</span>
// //               <span className="font-bold text-indigo-700">
// //                 {pkg.price.childWithoutBerth.toLocaleString()} INR
// //               </span>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Advance Payment */}
// //       <div>
// //         <h3 className="text-xl font-semibold text-gray-800 mb-5">
// //           Advance Payment Required
// //         </h3>
// //         <div className="bg-gray-50 p-6 rounded-xl border space-y-4">
// //           <div className="flex justify-between text-base">
// //             <span>Adult</span>
// //             <span className="font-bold text-indigo-700">
// //               {pkg.advanceAmount.adult?.toLocaleString()} INR
// //             </span>
// //           </div>
// //           <div className="flex justify-between text-base">
// //             <span>Child</span>
// //             <span className="font-bold text-indigo-700">
// //               {pkg.advanceAmount.child || 0} INR
// //             </span>
// //           </div>
// //         </div>
// //       </div>

// //       {renderDepartureDates(pkg.departureDates, "Departure Dates")}

// //       {pkg.sightseeing?.length > 0 && (
// //         <div>
// //           <h3 className="text-xl font-semibold text-gray-800 mb-5">
// //             Sightseeing Highlights
// //           </h3>
// //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //             {pkg.sightseeing.map((place, i) => (
// //               <div key={i} className="bg-white p-5 rounded-xl shadow-sm border">
// //                 <p className="text-base">• {place}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       {pkg.itinerary?.length > 0 && (
// //         <div>
// //           <h3 className="text-xl font-semibold text-gray-800 mb-5">
// //             Day-wise Itinerary
// //           </h3>
// //           <div className="space-y-3">
// //             {pkg.itinerary.map((dayDesc, i) => (
// //               <div
// //                 key={i}
// //                 className="border border-gray-200 rounded-xl overflow-hidden"
// //               >
// //                 <button
// //                   onClick={() => toggleItineraryDay(pkgKey, i)}
// //                   className="w-full text-left bg-gray-50 hover:bg-gray-100 px-6 py-4 flex justify-between items-center transition"
// //                 >
// //                   <span className="font-semibold text-indigo-700">
// //                     Day {i + 1}
// //                   </span>
// //                   <span
// //                     className={`text-2xl text-indigo-700 transition-transform duration-300 ${openItinerary[`${pkgKey}-${i}`] ? "rotate-180" : ""
// //                       }`}
// //                   >
// //                     ▼
// //                   </span>
// //                 </button>
// //                 <div
// //                   className={`transition-all duration-500 overflow-hidden ${openItinerary[`${pkgKey}-${i}`]
// //                       ? "max-h-96 opacity-100"
// //                       : "max-h-0 opacity-0"
// //                     }`}
// //                 >
// //                   <div className="p-6 bg-white text-gray-700 leading-relaxed whitespace-pre-line">
// //                     {dayDesc}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* Train Details */}
// //       {pkg.trainDetails?.length > 0 && (
// //         <div>
// //           <h3 className="text-xl font-semibold text-gray-800 mb-5">
// //             Train Journey Details
// //           </h3>
// //           <div className="space-y-4">
// //             {pkg.trainDetails.map((t, i) => (
// //               <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
// //                 <p className="font-medium text-gray-800">
// //                   {t.trainNo} - {t.trainName}
// //                 </p>
// //                 <p className="text-gray-600 mt-2">
// //                   Route: {t.fromStation} → {t.toStation}
// //                 </p>
// //                 <p className="text-gray-600">Class: {t.class}</p>
// //                 <p className="text-gray-600">
// //                   Timing: {t.departureTime} → {t.arrivalTime}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* Flight Details */}
// //       {pkg.flightDetails?.length > 0 && (
// //         <div>
// //           <h3 className="text-xl font-semibold text-gray-800 mb-5">
// //             Flight Details
// //           </h3>
// //           <div className="space-y-4">
// //             {pkg.flightDetails.map((f, i) => (
// //               <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
// //                 <p className="font-medium text-gray-800">
// //                   {f.airline} {f.flightNo}
// //                 </p>
// //                 <p className="text-gray-600 mt-2">
// //                   Route: {f.fromAirport} → {f.toAirport}
// //                 </p>
// //                 <p className="text-gray-600">Class: {f.class}</p>
// //                 <p className="text-gray-600">
// //                   Timing: {f.departureTime} → {f.arrivalTime}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* Boarding & Deboarding */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //         {pkg.boardingPoints?.length > 0 && (
// //           <div>
// //             <h3 className="text-xl font-semibold text-gray-800 mb-5">
// //               Boarding Points
// //             </h3>
// //             <div className="bg-gray-50 p-6 rounded-xl border">
// //               <ul className="space-y-3">
// //                 {pkg.boardingPoints.map((bp, i) => (
// //                   <li key={i} className="flex items-center gap-3">
// //                     <span className="text-indigo-700">•</span>
// //                     <span>
// //                       {bp.stationName} ({bp.stationCode})
// //                     </span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           </div>
// //         )}
// //         {pkg.deboardingPoints?.length > 0 && (
// //           <div>
// //             <h3 className="text-xl font-semibold text-gray-800 mb-5">
// //               Deboarding Points
// //             </h3>
// //             <div className="bg-gray-50 p-6 rounded-xl border">
// //               <ul className="space-y-3">
// //                 {pkg.deboardingPoints.map((dp, i) => (
// //                   <li key={i} className="flex items-center gap-3">
// //                     <span className="text-indigo-700">•</span>
// //                     <span>
// //                       {dp.stationName} ({dp.stationCode})
// //                     </span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Optional Add-ons */}
// //       {pkg.addons?.length > 0 && (
// //         <div>
// //           <h3 className="text-xl font-semibold text-gray-800 mb-5">
// //             Optional Add-ons
// //           </h3>
// //           <div className="bg-gray-50 p-6 rounded-xl border space-y-4">
// //             {pkg.addons.map((addon, i) => (
// //               <div
// //                 key={i}
// //                 className="flex justify-between items-center text-base py-3 border-b border-gray-200 last:border-0"
// //               >
// //                 <span className="text-gray-700 font-medium">{addon.name}</span>
// //                 <span className="font-bold text-indigo-700">
// //                   {addon.amount.toLocaleString()} INR
// //                 </span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* Remarks */}
// //       {pkg.remarks && pkg.remarks.trim() !== "" && (
// //         <div>
// //           <h3 className="text-xl font-semibold text-indigo-700 mb-4">
// //             Important Remarks
// //           </h3>
// //           <div className="bg-blue-50 border-l-4 border-indigo-700 p-6 rounded-r-xl">
// //             <p className="text-gray-700 leading-relaxed whitespace-pre-line">
// //               {pkg.remarks}
// //             </p>
// //           </div>
// //         </div>
// //       )}

// //       {/* Includes & Excludes */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
// //         {pkg.includes?.length > 0 && (
// //           <div>
// //             <h3 className="text-2xl font-bold text-green-800 mb-6">
// //               Package Includes
// //             </h3>
// //             <ul className="space-y-4">
// //               {pkg.includes.map((inc, i) => (
// //                 <li key={i} className="flex items-start gap-4">
// //                   <span className="text-2xl text-green-600 mt-1 flex-shrink-0">
// //                     ✓
// //                   </span>
// //                   <span className="text-gray-700 leading-relaxed">{inc}</span>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         )}
// //         {pkg.excludes?.length > 0 && (
// //           <div>
// //             <h3 className="text-2xl font-bold text-red-800 mb-6">
// //               Package Excludes
// //             </h3>
// //             <ul className="space-y-4">
// //               {pkg.excludes.map((exc, i) => (
// //                 <li key={i} className="flex items-start gap-4">
// //                   <span className="text-2xl text-red-600 mt-1 flex-shrink-0">
// //                     ✗
// //                   </span>
// //                   <span className="text-gray-700 leading-relaxed">{exc}</span>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <>
// //       <div className="bg-gray-50 min-h-screen">
// //         {/* Hero Section */}
// //         <div className="relative h-[55vh] sm:h-[65vh] md:h-[70vh] overflow-hidden">
// //           <img
// //             src={tour.titleImage}
// //             alt={tour.title}
// //             className="w-full h-full object-cover"
// //           />
// //           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

// //           <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white text-center">
// //             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight">
// //               {tour.title}
// //             </h1>
// //             <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8">
// //               {tour.duration.days} Days / {tour.duration.nights} Nights • Batch:{" "}
// //               {tour.batch}
// //             </p>

// //             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
// //               {canBook ? (
// //                 <button
// //                   onClick={handleBookNow}
// //                   disabled={bookingLoading}
// //                   className={`px-8 py-3 bg-green-500 text-white font-bold rounded-full text-base flex items-center justify-center gap-2 transition shadow-lg max-w-xs mx-auto sm:mx-0 ${bookingLoading
// //                       ? "opacity-80 cursor-not-allowed"
// //                       : "hover:bg-green-600 hover:shadow-xl"
// //                     }`}
// //                 >
// //                   {bookingLoading ? (
// //                     <>
// //                       <svg
// //                         className="animate-spin h-5 w-5 text-white"
// //                         viewBox="0 0 24 24"
// //                       >
// //                         <circle
// //                           className="opacity-25"
// //                           cx="12"
// //                           cy="12"
// //                           r="10"
// //                           stroke="currentColor"
// //                           strokeWidth="4"
// //                           fill="none"
// //                         />
// //                         <path
// //                           className="opacity-75"
// //                           fill="currentColor"
// //                           d="M4 12a8 8 0 018-8v8z"
// //                         />
// //                       </svg>
// //                       Processing...
// //                     </>
// //                   ) : (
// //                     "Book This Tour"
// //                   )}
// //                 </button>
// //               ) : (
// //                 <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-xl shadow-2xl animate-pulse">
// //                   {tour.tripCancelled
// //                     ? "TRIP CANCELLED"
// //                     : tour.bookingClosed
// //                       ? "BOOKING CLOSED"
// //                       : "SOLD OUT"}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Completed Trips Banner with Scroll Animation */}
// //         {tour.completedTripsCount > 0 && (
// //           <div className=" py-12 md:py-16 overflow-hidden">
// //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //               <div
// //                 id="completed-trips-banner"
// //                 className="text-center opacity-0 translate-y-12 transition-all duration-1000 ease-out"
// //               >
// //                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
// //                   <span className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl animate-bounce-slow  ">
// //                     🎉
// //                   </span>

// //                   <div className="space-y-4">
// //                     <p className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
// //                       Successfully Completed{" "}
// //                       <span className="text-yellow-500 text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-md">
// //                         {tour.completedTripsCount}
// //                       </span>{" "}
// //                       {tour.completedTripsCount === 1 ? "Trip" : "Trips"}
// //                     </p>
// //                     <p className="text-lg sm:text-xl md:text-xl text-gray-700 font-medium opacity-90">
// //                       Trusted by thousands of happy travelers!
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Sold Out Message + Only Image Gallery (no other details) */}
// //         {!tour.available ? (
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
// //             <SoldOutMessage />

// //             {tour.galleryImages?.length > 0 && (
// //               <section className="mt-16 animate-fade-up">
// //                 <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8 text-center">
// //                   Tour Gallery
// //                 </h2>
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
// //                   {tour.galleryImages.map((img, i) => (
// //                     <div
// //                       key={i}
// //                       className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition"
// //                     >
// //                       <img
// //                         src={img}
// //                         alt={`Gallery ${i + 1}`}
// //                         className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
// //                       />
// //                     </div>
// //                   ))}
// //                 </div>
// //               </section>
// //             )}
// //           </div>
// //         ) : (
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
// //             {/* Gallery */}
// //             {tour.galleryImages?.length > 0 && (
// //               <section className="animate-on-scroll opacity-0 mb-16">
// //                 <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8 text-center">
// //                   Tour Gallery
// //                 </h2>
// //                 <div className="flex justify-center">
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl">
// //                     {tour.galleryImages.map((img, i) => (
// //                       <div
// //                         key={i}
// //                         className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition"
// //                       >
// //                         <img
// //                           src={img}
// //                           alt={`Gallery ${i + 1}`}
// //                           className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
// //                         />
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </section>
// //             )}

// //             {/* Route Map */}
// //             {tour.mapImage && (
// //               <section className="animate-on-scroll opacity-0 mb-16">
// //                 <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8 text-center">
// //                   Route Map
// //                 </h2>
// //                 <div className="flex justify-center">
// //                   <img
// //                     src={tour.mapImage}
// //                     alt="Route Map"
// //                     className="w-full max-w-2xl rounded-2xl shadow-lg"
// //                   />
// //                 </div>
// //               </section>
// //             )}

// //             {/* Main Package */}
// //             <section className="animate-on-scroll opacity-0 mb-16">
// //               <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8">
// //                 Main Tour Package
// //               </h2>
// //               {tour.destination?.length > 0 && (
// //                 <div className="mb-10">
// //                   <h3 className="text-xl font-semibold text-gray-800 mb-4">
// //                     Journey Route
// //                   </h3>
// //                   <p className="text-lg bg-white p-6 rounded-xl shadow-sm border text-center">
// //                     {tour.destination.join(" → ")}
// //                   </p>
// //                 </div>
// //               )}
// //               {renderPackageContent(tour, "main")}
// //             </section>

// //             {/* Variant Packages */}
// //             {tour.variantPackage?.length > 0 && (
// //               <section className="animate-on-scroll opacity-0">
// //                 <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8">
// //                   Variant Packages
// //                 </h2>
// //                 {tour.variantPackage.map((variant, i) => (
// //                   <div key={i} className="mb-10">
// //                     <button
// //                       onClick={() => toggleVariant(i)}
// //                       className="w-full text-left bg-indigo-50 hover:bg-indigo-100 px-6 py-5 rounded-xl flex justify-between items-center mb-4 transition"
// //                     >
// //                       <span className="text-lg font-semibold text-indigo-800">
// //                         Variant Package {i + 1}
// //                       </span>
// //                       <span
// //                         className={`text-2xl transition-transform ${openVariants[i] ? "rotate-180" : ""
// //                           }`}
// //                       >
// //                         ▼
// //                       </span>
// //                     </button>
// //                     {openVariants[i] && (
// //                       <div className="bg-white rounded-xl shadow-sm border p-6">
// //                         {renderPackageContent(variant, `variant-${i}`)}
// //                       </div>
// //                     )}
// //                   </div>
// //                 ))}
// //               </section>
// //             )}

// //             {/* Final CTA */}
// //             <section className="text-center py-16 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-3xl shadow-xl animate-on-scroll opacity-0">
// //               <h2 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-6">
// //                 Ready to Explore?
// //               </h2>
// //               <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
// //                 {tour.tripCancelled
// //                   ? "This trip has been cancelled. Check out our other available tours!"
// //                   : tour.bookingClosed
// //                     ? "Bookings for this tour are currently closed. Check out our other available tours!"
// //                     : tour.available
// //                       ? "Secure your seat today for an unforgettable journey!"
// //                       : "This tour is currently sold out. Check out our other available tours!"}
// //               </p>
// //               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
// //                 {canBook ? (
// //                   <button
// //                     onClick={handleBookNow}
// //                     disabled={bookingLoading}
// //                     className={`px-10 py-4 bg-green-500 text-white font-bold rounded-full text-lg flex items-center justify-center gap-3 transition shadow-xl max-w-sm mx-auto ${bookingLoading
// //                         ? "opacity-80 cursor-not-allowed"
// //                         : "hover:bg-green-600 hover:scale-105"
// //                       }`}
// //                   >
// //                     {bookingLoading ? (
// //                       <>
// //                         <svg
// //                           className="animate-spin h-6 w-6 text-white"
// //                           viewBox="0 0 24 24"
// //                         >
// //                           <circle
// //                             className="opacity-25"
// //                             cx="12"
// //                             cy="12"
// //                             r="10"
// //                             stroke="currentColor"
// //                             strokeWidth="4"
// //                             fill="none"
// //                           />
// //                           <path
// //                             className="opacity-75"
// //                             fill="currentColor"
// //                             d="M4 12a8 8 0 018-8v8z"
// //                           />
// //                         </svg>
// //                         Processing...
// //                       </>
// //                     ) : (
// //                       "Book Now"
// //                     )}
// //                   </button>
// //                 ) : (
// //                   <div className="bg-red-600 text-white px-8 py-3 rounded-full font-bold text-xl shadow-2xl">
// //                     {tour.tripCancelled
// //                       ? "TRIP CANCELLED"
// //                       : tour.bookingClosed
// //                         ? "BOOKING CLOSED"
// //                         : "SOLD OUT"}
// //                   </div>
// //                 )}
// //               </div>
// //             </section>
// //           </div>
// //         )}
// //       </div>

// //       <style>{`
// //         .animate-fade-up {
// //           opacity: 1 !important;
// //           transform: translateY(0) !important;
// //         }
// //         .animate-on-scroll {
// //           opacity: 0;
// //           transform: translateY(30px);
// //           transition: opacity 1s ease, transform 1s ease;
// //         }

// //         #completed-trips-banner {
// //           opacity: 0;
// //           transform: translateY(48px);
// //           transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
// //         }
// //         #completed-trips-banner.visible {
// //           opacity: 1;
// //           transform: translateY(0);
// //         }

// //         @keyframes bounce-slow {
// //           0%, 100% { transform: translateY(0); }
// //           50% { transform: translateY(-20px); }
// //         }
// //         .animate-bounce-slow {
// //           animation: bounce-slow 4s ease-in-out infinite;
// //         }
// //       `}</style>
// //     </>
// //   );
// // };

// // export default TourDetails;


// // import React, { useContext, useEffect, useState } from "react";
// // import { useParams, useNavigate, useLocation } from "react-router-dom";
// // import { TourAppContext } from "../context/TourAppContext.jsx";
// // import { toast } from "react-toastify";
// // import {
// //   MapPin,
// //   Clock,
// //   Calendar,
// //   Train,
// //   Plane,
// //   Check,
// //   X,
// //   ChevronDown,
// //   Ticket,
// //   IndianRupee,
// //   Users,
// // } from "lucide-react";

// // const TourDetails = () => {
// //   const { tourId } = useParams();
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { tours, currencySymbol, token, userData } = useContext(TourAppContext);

// //   const [tour, setTour] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [bookingLoading, setBookingLoading] = useState(false);
// //   const [openVariants, setOpenVariants] = useState({});
// //   const [openItinerary, setOpenItinerary] = useState({});

// //   useEffect(() => {
// //     if (tours.length > 0) {
// //       const foundTour = tours.find((t) => t._id === tourId);
// //       if (foundTour) setTour(foundTour);
// //       else {
// //         toast.error("Tour not found.");
// //         navigate("/tours");
// //       }
// //       setLoading(false);
// //     }
// //   }, [tours, tourId, navigate]);

// //   const toggleVariant = (index) =>
// //     setOpenVariants((prev) => ({ ...prev, [index]: !prev[index] }));

// //   const toggleItineraryDay = (pkgKey, dayIndex) =>
// //     setOpenItinerary((prev) => ({
// //       ...prev,
// //       [`${pkgKey}-${dayIndex}`]: !prev[`${pkgKey}-${dayIndex}`],
// //     }));

// //   const formatDate = (dateString) =>
// //     new Date(dateString).toLocaleDateString("en-IN", {
// //       weekday: "short",
// //       year: "numeric",
// //       month: "short",
// //       day: "numeric",
// //     });

// //   const canBook = tour?.available && !tour?.tripCancelled && !tour?.bookingClosed;

// //   const statusLabel = tour?.tripCancelled
// //     ? "Trip Cancelled"
// //     : !tour?.available
// //       ? "Sold Out"
// //       : "Booking Closed";

// //   const handleBookNow = () => {
// //     if (tour.tripCancelled) {
// //       toast.error("This trip has been cancelled and is no longer bookable.");
// //       return;
// //     }
// //     if (tour.bookingClosed) {
// //       toast.error("Bookings for this tour are currently closed.");
// //       return;
// //     }
// //     if (!tour.available) {
// //       toast.error("This tour is currently sold out.");
// //       return;
// //     }

// //     setBookingLoading(true);

// //     if (!token || !userData?._id) {
// //       toast.info("Please login or create an account to continue booking");
// //       navigate("/login", {
// //         state: { from: location.pathname + location.search },
// //         replace: true,
// //       });
// //     } else {
// //       navigate(`/booking/${tour._id}`);
// //     }

// //     setTimeout(() => setBookingLoading(false), 300);
// //   };

// //   if (loading)
// //     return (
// //       <div className="flex items-center justify-center py-24">
// //         <p style={{ color: "#8A7A57" }} className="text-lg">
// //           Loading tour details…
// //         </p>
// //       </div>
// //     );

// //   if (!tour) return null;

// //   // ── Sold-out state (unchanged behaviour, restyled) ─────────────────────
// //   const SoldOutMessage = () => (
// //     <div
// //       className="text-center py-16 px-6 rounded-3xl max-w-3xl mx-auto"
// //       style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
// //     >
// //       <div
// //         className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl"
// //         style={{ background: "rgba(217,74,61,0.12)", color: "#D94A3D" }}
// //       >
// //         ✕
// //       </div>
// //       <h2
// //         className="text-3xl font-bold mb-4"
// //         style={{ color: "#D94A3D", fontFamily: "Georgia, serif" }}
// //       >
// //         This tour is currently sold out
// //       </h2>
// //       <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#5C5347" }}>
// //         Every seat for this batch has been taken. Join the waitlist and we'll
// //         let you know the moment a new batch opens.
// //       </p>
// //       <div className="flex flex-col sm:flex-row gap-3 justify-center">
// //         <button
// //           onClick={() => navigate("/tours")}
// //           className="px-7 py-3 rounded-full font-semibold text-sm transition"
// //           style={{ background: "#2F7D4F", color: "#fff" }}
// //         >
// //           Browse other tours
// //         </button>
// //         <button
// //           onClick={() => navigate("/contact")}
// //           className="px-7 py-3 rounded-full font-semibold text-sm transition border"
// //           style={{ borderColor: "#2F7D4F", color: "#2F7D4F" }}
// //         >
// //           Join the waitlist
// //         </button>
// //       </div>
// //     </div>
// //   );

// //   const CancelledMessage = () => (
// //     <div
// //       className="text-center py-16 px-6 rounded-3xl max-w-3xl mx-auto"
// //       style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
// //     >
// //       <div
// //         className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl"
// //         style={{ background: "rgba(217,74,61,0.12)", color: "#D94A3D" }}
// //       >
// //         ✕
// //       </div>
// //       <h2
// //         className="text-3xl font-bold mb-4"
// //         style={{ color: "#D94A3D", fontFamily: "Georgia, serif" }}
// //       >
// //         This trip is currently cancelled
// //       </h2>
// //       <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#5C5347" }}>
// //         This trip has been cancelled and is no longer bookable. Take a look
// //         at our other tours.
// //       </p>
// //       <div className="flex flex-col sm:flex-row gap-3 justify-center">
// //         <button
// //           onClick={() => navigate("/tours")}
// //           className="px-7 py-3 rounded-full font-semibold text-sm transition"
// //           style={{ background: "#2F7D4F", color: "#fff" }}
// //         >
// //           Browse other tours
// //         </button>
// //         <button
// //           onClick={() => navigate("/contact")}
// //           className="px-7 py-3 rounded-full font-semibold text-sm transition border"
// //           style={{ borderColor: "#2F7D4F", color: "#2F7D4F" }}
// //         >
// //           Contact us
// //         </button>
// //       </div>
// //     </div>
// //   );

// //   // ── Section heading — small vermillion tick, serif title ───────────────
// //   const SectionTitle = ({ children }) => (
// //     <div className="flex items-center gap-3 mb-6">
// //       <span
// //         className="w-1.5 h-6 rounded-full flex-shrink-0"
// //         style={{ background: "#E8A33D" }}
// //       />
// //       <h3
// //         className="text-xl md:text-2xl font-bold"
// //         style={{ color: "#232323", fontFamily: "Georgia, serif" }}
// //       >
// //         {children}
// //       </h3>
// //     </div>
// //   );

// //   // ── Train / Flight "ticket stub" card — the signature element ──────────
// //   // Modelled on a physical journey ticket: route on the left with a
// //   // dashed perforation, class/timing on the right, and each entry's own
// //   // addons listed as small rows UNDER the ticket (not a separate global
// //   // section) so "3AC upgrade for THIS train" reads as exactly that.
// //   // ── Journey leg label ────────────────────────────────────────────────
// //   // Instead of a flat "Train 1 / Train 2 / Train 3", label each entry by
// //   // its role in the trip — first leg is Boarding, last is Deboarding,
// //   // anything between is Middle — matching the BOARDING/MIDDLE/DEBOARDING
// //   // convention already used for addon tripType elsewhere in the app. A
// //   // single entry gets no label at all (nothing to distinguish it from).
// //   const journeyLabel = (index, total) => {
// //     if (total <= 1) return "";
// //     if (index === 0) return "Boarding";
// //     if (index === total - 1) return "Deboarding";
// //     const middleCount = total - 2;
// //     return middleCount > 1 ? `Middle ${index}` : "Middle";
// //   };

// //   const JourneyTicket = ({ kind, entry, label }) => {
// //     const isTrain = kind === "train";
// //     const Icon = isTrain ? Train : Plane;
// //     const title = isTrain
// //       ? `${entry.trainName || "Train"} · ${entry.trainNo || "—"}`
// //       : `${entry.airline || "Flight"} ${entry.flightNo || ""}`.trim();
// //     const from = isTrain ? entry.fromStation : entry.fromAirport;
// //     const to = isTrain ? entry.toStation : entry.toAirport;
// //     const fromCode = entry.fromCode;
// //     const toCode = entry.toCode;

// //     return (
// //       <div
// //         className="relative rounded-2xl overflow-hidden mb-4"
// //         style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
// //       >
// //         <div className="flex flex-col sm:flex-row">
// //           {/* Stub */}
// //           <div
// //             className="sm:w-16 flex sm:flex-col items-center justify-center gap-2 py-4 sm:py-6"
// //             style={{ background: "#2F7D4F", color: "#FFFFFF" }}
// //           >
// //             <Icon size={20} />
// //             <span className="text-[10px] font-bold tracking-wide uppercase sm:[writing-mode:vertical-rl] sm:rotate-180">
// //               {label ? `${label} ${isTrain ? "Train" : "Flight"}` : isTrain ? "Train" : "Flight"}
// //             </span>
// //           </div>

// //           {/* Perforation */}
// //           <div
// //             className="hidden sm:block w-px my-4"
// //             style={{
// //               backgroundImage:
// //                 "repeating-linear-gradient(to bottom, #DDE6EF 0, #DDE6EF 6px, transparent 6px, transparent 12px)",
// //             }}
// //           />

// //           {/* Details */}
// //           <div className="flex-1 p-4 sm:p-5">
// //             <p
// //               className="font-bold text-base mb-2"
// //               style={{ color: "#232323" }}
// //             >
// //               {title}
// //             </p>

// //             {(from || to) && (
// //               <div className="flex items-center gap-2 text-sm mb-2 flex-wrap">
// //                 <span style={{ color: "#5C5347" }}>
// //                   {from} {fromCode && `(${fromCode})`}
// //                 </span>
// //                 <span style={{ color: "#E8A33D" }}>→</span>
// //                 <span style={{ color: "#5C5347" }}>
// //                   {to} {toCode && `(${toCode})`}
// //                 </span>
// //               </div>
// //             )}

// //             <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs" style={{ color: "#8A7A57" }}>
// //               {entry.class && <span>Class: {entry.class}</span>}
// //               {entry.departureTime && (
// //                 <span>
// //                   {entry.departureTime} → {entry.arrivalTime}
// //                 </span>
// //               )}
// //             </div>

// //             {/* Nested addons — this entry's own extras, not a global list */}
// //             {entry.addons?.length > 0 && (
// //               <div
// //                 className="mt-3 pt-3 flex flex-wrap gap-2"
// //                 style={{ borderTop: "1px dashed #DDE6EF" }}
// //               >
// //                 {entry.addons.map((addon, i) => (
// //                   <span
// //                     key={i}
// //                     className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
// //                     style={{ background: "rgba(232,163,61,0.16)", color: "#D94A3D" }}
// //                   >
// //                     {addon.name}
// //                     <span className="font-bold">
// //                       {currencySymbol}
// //                       {addon.amount?.toLocaleString()}
// //                     </span>
// //                   </span>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const renderPackageContent = (pkg, pkgKey = "main") => (
// //     <div className="space-y-14">
// //       {/* Price + Advance — side-by-side ticket-style cards */}
// //       <div>
// //         <SectionTitle>Fare per person</SectionTitle>
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //           {[
// //             ["Double sharing", pkg.price.doubleSharing],
// //             ["Triple sharing", pkg.price.tripleSharing],
// //             pkg.price.childWithBerth && ["Child, with berth", pkg.price.childWithBerth],
// //             pkg.price.childWithoutBerth && ["Child, without berth", pkg.price.childWithoutBerth],
// //           ]
// //             .filter(Boolean)
// //             .map(([label, amount]) => (
// //               <div
// //                 key={label}
// //                 className="rounded-2xl p-4"
// //                 style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
// //               >
// //                 <p className="text-xs mb-1.5" style={{ color: "#8A7A57" }}>
// //                   {label}
// //                 </p>
// //                 <p
// //                   className="text-xl font-bold"
// //                   style={{ color: "#2F7D4F", fontFamily: "Georgia, serif" }}
// //                 >
// //                   {currencySymbol}
// //                   {amount?.toLocaleString()}
// //                 </p>
// //               </div>
// //             ))}
// //         </div>
// //         <div
// //           className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-sm rounded-xl px-4 py-3"
// //           style={{ background: "rgba(232,163,61,0.12)", color: "#2F7D4F" }}
// //         >
// //           <span>
// //             Advance (adult): <strong>{currencySymbol}{pkg.advanceAmount.adult?.toLocaleString()}</strong>
// //           </span>
// //           <span>
// //             Advance (child): <strong>{currencySymbol}{(pkg.advanceAmount.child || 0).toLocaleString()}</strong>
// //           </span>
// //         </div>
// //       </div>

// //       {/* Departure dates — horizontal chips instead of a grid of boxes */}
// //       {pkg.departureDates?.length > 0 && (
// //         <div>
// //           <SectionTitle>Departure dates</SectionTitle>
// //           <div className="flex flex-wrap gap-3">
// //             {pkg.departureDates
// //               .sort((a, b) => new Date(a.date) - new Date(b.date))
// //               .map((dep, i) => (
// //                 <div
// //                   key={i}
// //                   className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm"
// //                   style={{
// //                     background: dep.status === "Available" ? "rgba(47,125,79,0.12)" : "rgba(217,74,61,0.12)",
// //                     color: dep.status === "Available" ? "#2F7D4F" : "#D94A3D",
// //                   }}
// //                 >
// //                   <Calendar size={14} />
// //                   {formatDate(dep.date)}
// //                 </div>
// //               ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* Sightseeing */}
// //       {pkg.sightseeing?.length > 0 && (
// //         <div>
// //           <SectionTitle>Sightseeing highlights</SectionTitle>
// //           <div className="flex flex-wrap gap-2.5">
// //             {pkg.sightseeing.map((place, i) => (
// //               <span
// //                 key={i}
// //                 className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm"
// //                 style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", color: "#232323" }}
// //               >
// //                 <MapPin size={13} style={{ color: "#E8A33D" }} />
// //                 {place}
// //               </span>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* Itinerary — genuinely a sequence, numbered accordion */}
// //       {pkg.itinerary?.length > 0 && (
// //         <div>
// //           <SectionTitle>Day-wise itinerary</SectionTitle>
// //           <div className="space-y-2.5">
// //             {pkg.itinerary.map((dayDesc, i) => {
// //               const isOpen = openItinerary[`${pkgKey}-${i}`];
// //               return (
// //                 <div
// //                   key={i}
// //                   className="rounded-xl overflow-hidden"
// //                   style={{ border: "1px solid #DDE6EF" }}
// //                 >
// //                   <button
// //                     onClick={() => toggleItineraryDay(pkgKey, i)}
// //                     className="w-full flex items-center gap-4 px-5 py-3.5 text-left"
// //                     style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
// //                   >
// //                     <span
// //                       className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
// //                       style={{ background: "#2F7D4F", color: "#FFFFFF" }}
// //                     >
// //                       {i + 1}
// //                     </span>
// //                     <span className="font-semibold flex-1" style={{ color: "#232323" }}>
// //                       Day {i + 1}
// //                     </span>
// //                     <ChevronDown
// //                       size={18}
// //                       style={{
// //                         color: "#8A7A57",
// //                         transform: isOpen ? "rotate(180deg)" : "none",
// //                         transition: "transform 0.3s",
// //                       }}
// //                     />
// //                   </button>
// //                   {isOpen && (
// //                     <div
// //                       className="px-5 py-4 text-sm leading-relaxed whitespace-pre-line"
// //                       style={{ color: "#5C5347", borderTop: "1px solid #DDE6EF" }}
// //                     >
// //                       {dayDesc}
// //                     </div>
// //                   )}
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       )}

// //       {/* Train Details — ticket stubs with nested addons */}
// //       {pkg.trainDetails?.length > 0 && (
// //         <div>
// //           <SectionTitle>Train journey</SectionTitle>
// //           {pkg.trainDetails.map((t, i) => (
// //             <JourneyTicket key={i} kind="train" entry={t} label={journeyLabel(i, pkg.trainDetails.length)} />
// //           ))}
// //         </div>
// //       )}

// //       {/* Flight Details — ticket stubs with nested addons */}
// //       {pkg.flightDetails?.length > 0 && (
// //         <div>
// //           <SectionTitle>Flight journey</SectionTitle>
// //           {pkg.flightDetails.map((f, i) => (
// //             <JourneyTicket key={i} kind="flight" entry={f} label={journeyLabel(i, pkg.flightDetails.length)} />
// //           ))}
// //         </div>
// //       )}

// //       {/* Boarding & Deboarding */}
// //       {(pkg.boardingPoints?.length > 0 || pkg.deboardingPoints?.length > 0) && (
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //           {pkg.boardingPoints?.length > 0 && (
// //             <div>
// //               <SectionTitle>Boarding points</SectionTitle>
// //               <ul className="space-y-2.5">
// //                 {pkg.boardingPoints.map((bp, i) => (
// //                   <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: "#5C5347" }}>
// //                     <MapPin size={15} style={{ color: "#E8A33D" }} />
// //                     {bp.stationName} ({bp.stationCode})
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           )}
// //           {pkg.deboardingPoints?.length > 0 && (
// //             <div>
// //               <SectionTitle>Deboarding points</SectionTitle>
// //               <ul className="space-y-2.5">
// //                 {pkg.deboardingPoints.map((dp, i) => (
// //                   <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: "#5C5347" }}>
// //                     <MapPin size={15} style={{ color: "#E8A33D" }} />
// //                     {dp.stationName} ({dp.stationCode})
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {/* Optional (general) Add-ons — separate from the per-journey ones above */}
// //       {pkg.addons?.length > 0 && (
// //         <div>
// //           <SectionTitle>Optional add-ons</SectionTitle>
// //           <div className="rounded-2xl p-1" style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
// //             {pkg.addons.map((addon, i) => (
// //               <div
// //                 key={i}
// //                 className="flex justify-between items-center px-4 py-3"
// //                 style={{ borderBottom: i < pkg.addons.length - 1 ? "1px solid #F1E8D8" : "none" }}
// //               >
// //                 <span className="text-sm" style={{ color: "#232323" }}>{addon.name}</span>
// //                 <span className="font-bold text-sm" style={{ color: "#2F7D4F" }}>
// //                   {currencySymbol}{addon.amount?.toLocaleString()}
// //                 </span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* Remarks */}
// //       {pkg.remarks && pkg.remarks.trim() !== "" && (
// //         <div
// //           className="rounded-2xl p-5"
// //           style={{ background: "rgba(232,163,61,0.12)", borderLeft: "4px solid #E8A33D" }}
// //         >
// //           <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#5C5347" }}>
// //             {pkg.remarks}
// //           </p>
// //         </div>
// //       )}

// //       {/* Includes & Excludes */}
// //       {(pkg.includes?.length > 0 || pkg.excludes?.length > 0) && (
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //           {pkg.includes?.length > 0 && (
// //             <div>
// //               <SectionTitle>Included</SectionTitle>
// //               <ul className="space-y-3">
// //                 {pkg.includes.map((inc, i) => (
// //                   <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#232323" }}>
// //                     <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#2F7D4F" }} />
// //                     {inc}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           )}
// //           {pkg.excludes?.length > 0 && (
// //             <div>
// //               <SectionTitle>Not included</SectionTitle>
// //               <ul className="space-y-3">
// //                 {pkg.excludes.map((exc, i) => (
// //                   <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#232323" }}>
// //                     <X size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#D94A3D" }} />
// //                     {exc}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );

// //   return (
// //     <div className="py-6 sm:py-10 px-3 sm:px-6">
// //       <div
// //         className="max-w-6xl mx-auto rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden"
// //         style={{
// //           background: "rgba(255,255,255,0.5)",
// //           backdropFilter: "blur(20px)",
// //           WebkitBackdropFilter: "blur(20px)",
// //           border: "1px solid rgba(255,255,255,0.6)",
// //           boxShadow: "0 20px 60px rgba(20,40,70,0.08)",
// //         }}
// //       >
// //         {/* Hero — asymmetric, bottom-left aligned, serif headline */}
// //         <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
// //           <img src={tour.titleImage} alt={tour.title} className="w-full h-full object-cover" />
// //           <div
// //             className="absolute inset-0"
// //             style={{
// //               background: "linear-gradient(0deg, rgba(20,14,10,0.6) 0%, rgba(20,14,10,0.15) 55%, transparent 80%)",
// //             }}
// //           />

// //           <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
// //             <div className="max-w-3xl">
// //               <h1
// //                 className="text-2xl sm:text-4xl font-semibold mb-2 leading-snug max-w-2xl"
// //                 style={{ fontFamily: "Georgia, serif", color: "#FFFFFF", textShadow: "0 2px 10px rgba(0,0,0,0.35)" }}
// //               >
// //                 {tour.title}
// //               </h1>
// //               <div className="w-14 h-0.5 mb-3" style={{ background: "#E8A33D" }} />
// //               <p className="text-sm sm:text-base mb-6" style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}>
// //                 {tour.duration.days} days · {tour.duration.nights} nights · {tour.batch}
// //               </p>

// //               {canBook ? (
// //                 <button
// //                   onClick={handleBookNow}
// //                   disabled={bookingLoading}
// //                   className="px-7 py-3 rounded-full font-semibold text-sm transition"
// //                   style={{
// //                     background: "#E8A33D",
// //                     color: "#232323",
// //                     opacity: bookingLoading ? 0.7 : 1,
// //                   }}
// //                 >
// //                   {bookingLoading ? "Processing…" : "Book this tour"}
// //                 </button>
// //               ) : (
// //                 <span
// //                   className="inline-block px-6 py-2.5 rounded-full font-semibold text-sm"
// //                   style={{ background: "#D94A3D", color: "#fff" }}
// //                 >
// //                   {statusLabel}
// //                 </span>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Completed trips banner — bold celebratory moment, brand-themed */}
// //         {tour.completedTripsCount > 0 && tour.available && !tour.tripCancelled && (
// //           <div
// //             className="text-center py-10 px-6"
// //             style={{ borderBottom: "1px solid rgba(255,255,255,0.7)" }}
// //           >
// //             <div className="text-5xl mb-4">🎉</div>
// //             <p
// //               className="text-2xl sm:text-3xl font-bold mb-2"
// //               style={{ color: "#232323", fontFamily: "Georgia, serif" }}
// //             >
// //               Successfully completed{" "}
// //               <span style={{ color: "#E8A33D" }}>{tour.completedTripsCount}</span>{" "}
// //               {tour.completedTripsCount === 1 ? "trip" : "trips"}
// //             </p>
// //             <p className="text-sm sm:text-base" style={{ color: "#5C5347" }}>
// //               Trusted by thousands of happy travelers!
// //             </p>
// //           </div>
// //         )}

// //         {/* Main content */}
// //         <div className="p-6 sm:p-10 md:p-14">
// //           {tour.tripCancelled ? (
// //             <>
// //               <CancelledMessage />
// //               {tour.galleryImages?.length > 0 && (
// //                 <div className="mt-14">
// //                   <SectionTitle>Gallery</SectionTitle>
// //                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
// //                     {tour.galleryImages.map((img, i) => (
// //                       <div key={i} className="rounded-xl overflow-hidden aspect-[4/3]">
// //                         <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </>
// //           ) : !tour.available ? (
// //             <>
// //               <SoldOutMessage />
// //               {tour.galleryImages?.length > 0 && (
// //                 <div className="mt-14">
// //                   <SectionTitle>Gallery</SectionTitle>
// //                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
// //                     {tour.galleryImages.map((img, i) => (
// //                       <div key={i} className="rounded-xl overflow-hidden aspect-[4/3]">
// //                         <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </>
// //           ) : (
// //             <>
// //               {tour.galleryImages?.length > 0 && (
// //                 <div className="mb-14">
// //                   <SectionTitle>Gallery</SectionTitle>
// //                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
// //                     {tour.galleryImages.map((img, i) => (
// //                       <div key={i} className="rounded-xl overflow-hidden aspect-[4/3]">
// //                         <img
// //                           src={img}
// //                           alt={`Gallery ${i + 1}`}
// //                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
// //                         />
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {tour.mapImage && (
// //                 <div className="mb-14">
// //                   <SectionTitle>Route map</SectionTitle>
// //                   <img src={tour.mapImage} alt="Route map" className="w-full max-w-xl rounded-2xl" style={{ border: "1px solid #DDE6EF" }} />
// //                 </div>
// //               )}

// //               {tour.destination?.length > 0 && (
// //                 <div className="mb-14">
// //                   <SectionTitle>Journey route</SectionTitle>
// //                   <p
// //                     className="text-lg rounded-2xl px-6 py-4"
// //                     style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.8)", color: "#232323" }}
// //                   >
// //                     {tour.destination.join("  →  ")}
// //                   </p>
// //                 </div>
// //               )}

// //               <div className="mb-14">{renderPackageContent(tour, "main")}</div>

// //               {tour.variantPackage?.length > 0 && (
// //                 <div className="mb-14">
// //                   <SectionTitle>Variant packages</SectionTitle>
// //                   {tour.variantPackage.map((variant, i) => (
// //                     <div key={i} className="mb-4">
// //                       <button
// //                         onClick={() => toggleVariant(i)}
// //                         className="w-full flex items-center justify-between px-5 py-4 rounded-xl text-left"
// //                         style={{ background: "rgba(232,163,61,0.12)" }}
// //                       >
// //                         <span className="font-semibold" style={{ color: "#2F7D4F" }}>
// //                           Variant package {i + 1}
// //                         </span>
// //                         <ChevronDown
// //                           size={18}
// //                           style={{
// //                             color: "#2F7D4F",
// //                             transform: openVariants[i] ? "rotate(180deg)" : "none",
// //                             transition: "transform 0.3s",
// //                           }}
// //                         />
// //                       </button>
// //                       {openVariants[i] && (
// //                         <div
// //                           className="rounded-xl p-6 mt-2"
// //                           style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.8)" }}
// //                         >
// //                           {renderPackageContent(variant, `variant-${i}`)}
// //                         </div>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}

// //               {/* Final CTA */}
// //               <div
// //                 className="text-center py-14 px-6 rounded-3xl"
// //                 style={{ background: "#2F7D4F" }}
// //               >
// //                 <h2
// //                   className="text-2xl sm:text-3xl font-bold text-white mb-3"
// //                   style={{ fontFamily: "Georgia, serif" }}
// //                 >
// //                   Ready when you are
// //                 </h2>
// //                 <p className="text-white/80 mb-7 max-w-lg mx-auto text-sm">
// //                   {tour.tripCancelled
// //                     ? "This trip has been cancelled — take a look at our other tours."
// //                     : !tour.available
// //                       ? "This tour is sold out — take a look at our other tours."
// //                       : tour.bookingClosed
// //                         ? "Bookings for this tour are closed — take a look at our other tours."
// //                         : "Secure your seat for this journey today."}
// //                 </p>
// //                 {canBook ? (
// //                   <button
// //                     onClick={handleBookNow}
// //                     disabled={bookingLoading}
// //                     className="px-8 py-3.5 rounded-full font-semibold text-sm transition"
// //                     style={{ background: "#E8A33D", color: "#232323", opacity: bookingLoading ? 0.7 : 1 }}
// //                   >
// //                     {bookingLoading ? "Processing…" : "Book now"}
// //                   </button>
// //                 ) : (
// //                   <span
// //                     className="inline-block px-7 py-3 rounded-full font-semibold text-sm"
// //                     style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
// //                   >
// //                     {statusLabel}
// //                   </span>
// //                 )}
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TourDetails;


// import React, { useContext, useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { TourAppContext } from "../context/TourAppContext.jsx";
// import { toast } from "react-toastify";
// import {
//   MapPin,
//   Clock,
//   Calendar,
//   Train,
//   Plane,
//   Check,
//   X,
//   ChevronDown,
//   Ticket,
//   IndianRupee,
//   Users,
// } from "lucide-react";

// const TourDetails = () => {
//   const { tourId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { tours, currencySymbol, token, userData } = useContext(TourAppContext);

//   const [tour, setTour] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [openVariants, setOpenVariants] = useState({});
//   const [openItinerary, setOpenItinerary] = useState({});

//   useEffect(() => {
//     if (tours.length > 0) {
//       const foundTour = tours.find((t) => t._id === tourId);
//       if (foundTour) setTour(foundTour);
//       else {
//         toast.error("Tour not found.");
//         navigate("/tours");
//       }
//       setLoading(false);
//     }
//   }, [tours, tourId, navigate]);

//   const toggleVariant = (index) =>
//     setOpenVariants((prev) => ({ ...prev, [index]: !prev[index] }));

//   const toggleItineraryDay = (pkgKey, dayIndex) =>
//     setOpenItinerary((prev) => ({
//       ...prev,
//       [`${pkgKey}-${dayIndex}`]: !prev[`${pkgKey}-${dayIndex}`],
//     }));

//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleDateString("en-IN", {
//       weekday: "short",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   const canBook = tour?.available && !tour?.tripCancelled && !tour?.bookingClosed;

//   const statusLabel = tour?.tripCancelled
//     ? "Trip Cancelled"
//     : !tour?.available
//       ? "Sold Out"
//       : "Booking Closed";

//   const handleBookNow = () => {
//     if (tour.tripCancelled) {
//       toast.error("This trip has been cancelled and is no longer bookable.");
//       return;
//     }
//     if (tour.bookingClosed) {
//       toast.error("Bookings for this tour are currently closed.");
//       return;
//     }
//     if (!tour.available) {
//       toast.error("This tour is currently sold out.");
//       return;
//     }

//     setBookingLoading(true);

//     if (!token || !userData?._id) {
//       toast.info("Please login or create an account to continue booking");
//       navigate("/login", {
//         state: { from: location.pathname + location.search },
//         replace: true,
//       });
//     } else {
//       navigate(`/booking/${tour._id}`);
//     }

//     setTimeout(() => setBookingLoading(false), 300);
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center py-24">
//         <p style={{ color: "#8A7A57" }} className="text-lg">
//           Loading tour details…
//         </p>
//       </div>
//     );

//   if (!tour) return null;

//   // ── Sold-out state (unchanged behaviour, restyled) ─────────────────────
//   const SoldOutMessage = () => (
//     <div
//       className="text-center py-16 px-6 rounded-3xl max-w-3xl mx-auto"
//       style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
//     >
//       <div
//         className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl"
//         style={{ background: "rgba(217,74,61,0.12)", color: "#D94A3D" }}
//       >
//         ✕
//       </div>
//       <h2
//         className="text-3xl font-bold mb-4"
//         style={{ color: "#D94A3D", fontFamily: "Georgia, serif" }}
//       >
//         This tour is currently sold out
//       </h2>
//       <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#5C5347" }}>
//         Every seat for this batch has been taken. Join the waitlist and we'll
//         let you know the moment a new batch opens.
//       </p>
//       <div className="flex flex-col sm:flex-row gap-3 justify-center">
//         <button
//           onClick={() => navigate("/tours")}
//           className="px-7 py-3 rounded-full font-semibold text-sm transition"
//           style={{ background: "#2F7D4F", color: "#fff" }}
//         >
//           Browse other tours
//         </button>
//         <button
//           onClick={() => navigate("/contact")}
//           className="px-7 py-3 rounded-full font-semibold text-sm transition border"
//           style={{ borderColor: "#2F7D4F", color: "#2F7D4F" }}
//         >
//           Join the waitlist
//         </button>
//       </div>
//     </div>
//   );

//   const CancelledMessage = () => (
//     <div
//       className="text-center py-16 px-6 rounded-3xl max-w-3xl mx-auto"
//       style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
//     >
//       <div
//         className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl"
//         style={{ background: "rgba(217,74,61,0.12)", color: "#D94A3D" }}
//       >
//         ✕
//       </div>
//       <h2
//         className="text-3xl font-bold mb-4"
//         style={{ color: "#D94A3D", fontFamily: "Georgia, serif" }}
//       >
//         This trip is currently cancelled
//       </h2>
//       <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#5C5347" }}>
//         This trip has been cancelled and is no longer bookable. Take a look
//         at our other tours.
//       </p>
//       <div className="flex flex-col sm:flex-row gap-3 justify-center">
//         <button
//           onClick={() => navigate("/tours")}
//           className="px-7 py-3 rounded-full font-semibold text-sm transition"
//           style={{ background: "#2F7D4F", color: "#fff" }}
//         >
//           Browse other tours
//         </button>
//         <button
//           onClick={() => navigate("/contact")}
//           className="px-7 py-3 rounded-full font-semibold text-sm transition border"
//           style={{ borderColor: "#2F7D4F", color: "#2F7D4F" }}
//         >
//           Contact us
//         </button>
//       </div>
//     </div>
//   );

//   // ── Section heading — small vermillion tick, serif title ───────────────
//   const SectionTitle = ({ children }) => (
//     <div className="flex items-center gap-3 mb-6">
//       <span
//         className="w-1.5 h-6 rounded-full flex-shrink-0"
//         style={{ background: "#E8A33D" }}
//       />
//       <h3
//         className="text-xl md:text-2xl font-bold"
//         style={{ color: "#232323", fontFamily: "Georgia, serif" }}
//       >
//         {children}
//       </h3>
//     </div>
//   );

//   // ── Train / Flight "ticket stub" card — the signature element ──────────
//   // Modelled on a physical journey ticket: route on the left with a
//   // dashed perforation, class/timing on the right, and each entry's own
//   // addons listed as small rows UNDER the ticket (not a separate global
//   // section) so "3AC upgrade for THIS train" reads as exactly that.
//   // ── Journey leg label ────────────────────────────────────────────────
//   // Instead of a flat "Train 1 / Train 2 / Train 3", label each entry by
//   // its role in the trip — first leg is Boarding, last is Deboarding,
//   // anything between is Middle — matching the BOARDING/MIDDLE/DEBOARDING
//   // convention already used for addon tripType elsewhere in the app. A
//   // single entry gets no label at all (nothing to distinguish it from).
//   const journeyLabel = (index, total) => {
//     if (total <= 1) return "";
//     if (index === 0) return "Boarding";
//     if (index === total - 1) return "Deboarding";
//     const middleCount = total - 2;
//     return middleCount > 1 ? `Middle ${index}` : "Middle";
//   };

//   const JourneyTicket = ({ kind, entry, label }) => {
//     const isTrain = kind === "train";
//     const Icon = isTrain ? Train : Plane;
//     const title = isTrain
//       ? `${entry.trainName || "Train"} · ${entry.trainNo || "—"}`
//       : `${entry.airline || "Flight"} ${entry.flightNo || ""}`.trim();
//     const from = isTrain ? entry.fromStation : entry.fromAirport;
//     const to = isTrain ? entry.toStation : entry.toAirport;
//     const fromCode = entry.fromCode;
//     const toCode = entry.toCode;

//     return (
//       <div
//         className="relative rounded-2xl overflow-hidden mb-4"
//         style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
//       >
//         <div className="flex flex-col sm:flex-row">
//           {/* Stub */}
//           <div
//             className="sm:w-16 flex sm:flex-col items-center justify-center gap-2 py-4 sm:py-6"
//             style={{ background: "#2F7D4F", color: "#FFFFFF" }}
//           >
//             <Icon size={20} />
//             <span className="text-[10px] font-bold tracking-wide uppercase sm:[writing-mode:vertical-rl] sm:rotate-180">
//               {label ? `${label} ${isTrain ? "Train" : "Flight"}` : isTrain ? "Train" : "Flight"}
//             </span>
//           </div>

//           {/* Perforation */}
//           <div
//             className="hidden sm:block w-px my-4"
//             style={{
//               backgroundImage:
//                 "repeating-linear-gradient(to bottom, #DDE6EF 0, #DDE6EF 6px, transparent 6px, transparent 12px)",
//             }}
//           />

//           {/* Details */}
//           <div className="flex-1 p-4 sm:p-5">
//             <p
//               className="font-bold text-base mb-2"
//               style={{ color: "#232323" }}
//             >
//               {title}
//             </p>

//             {(from || to) && (
//               <div className="flex items-center gap-2 text-sm mb-2 flex-wrap">
//                 <span style={{ color: "#5C5347" }}>
//                   {from} {fromCode && `(${fromCode})`}
//                 </span>
//                 <span style={{ color: "#E8A33D" }}>→</span>
//                 <span style={{ color: "#5C5347" }}>
//                   {to} {toCode && `(${toCode})`}
//                 </span>
//               </div>
//             )}

//             <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs" style={{ color: "#8A7A57" }}>
//               {entry.class && <span>Class: {entry.class}</span>}
//               {entry.departureTime && (
//                 <span>
//                   {entry.departureTime} → {entry.arrivalTime}
//                 </span>
//               )}
//             </div>

//             {/* Nested addons — this entry's own extras, not a global list */}
//             {entry.addons?.length > 0 && (
//               <div
//                 className="mt-3 pt-3 flex flex-wrap gap-2"
//                 style={{ borderTop: "1px dashed #DDE6EF" }}
//               >
//                 {entry.addons.map((addon, i) => (
//                   <span
//                     key={i}
//                     className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
//                     style={{ background: "rgba(232,163,61,0.16)", color: "#D94A3D" }}
//                   >
//                     {addon.name}
//                     <span className="font-bold">
//                       {currencySymbol}
//                       {addon.amount?.toLocaleString()}
//                     </span>
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderPackageContent = (pkg, pkgKey = "main") => (
//     <div className="space-y-14">
//       {/* Price + Advance — side-by-side ticket-style cards */}
//       <div>
//         <SectionTitle>Fare per person</SectionTitle>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[
//             ["Double sharing", pkg.price.doubleSharing],
//             ["Triple sharing", pkg.price.tripleSharing],
//             pkg.price.childWithBerth && ["Child, with berth", pkg.price.childWithBerth],
//             pkg.price.childWithoutBerth && ["Child, without berth", pkg.price.childWithoutBerth],
//           ]
//             .filter(Boolean)
//             .map(([label, amount]) => (
//               <div
//                 key={label}
//                 className="rounded-2xl p-4"
//                 style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
//               >
//                 <p className="text-xs mb-1.5" style={{ color: "#8A7A57" }}>
//                   {label}
//                 </p>
//                 <p
//                   className="text-xl font-bold"
//                   style={{ color: "#2F7D4F", fontFamily: "Georgia, serif" }}
//                 >
//                   {currencySymbol}
//                   {amount?.toLocaleString()}
//                 </p>
//               </div>
//             ))}
//         </div>
//         <div
//           className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-sm rounded-xl px-4 py-3"
//           style={{ background: "rgba(232,163,61,0.12)", color: "#2F7D4F" }}
//         >
//           <span>
//             Advance (adult): <strong>{currencySymbol}{pkg.advanceAmount.adult?.toLocaleString()}</strong>
//           </span>
//           <span>
//             Advance (child): <strong>{currencySymbol}{(pkg.advanceAmount.child || 0).toLocaleString()}</strong>
//           </span>
//         </div>
//       </div>

//       {/* Departure dates — horizontal chips instead of a grid of boxes */}
//       {pkg.departureDates?.length > 0 && (
//         <div>
//           <SectionTitle>Departure dates</SectionTitle>
//           <div className="flex flex-wrap gap-3">
//             {pkg.departureDates
//               .sort((a, b) => new Date(a.date) - new Date(b.date))
//               .map((dep, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm"
//                   style={{
//                     background: dep.status === "Available" ? "rgba(47,125,79,0.12)" : "rgba(217,74,61,0.12)",
//                     color: dep.status === "Available" ? "#2F7D4F" : "#D94A3D",
//                   }}
//                 >
//                   <Calendar size={14} />
//                   {formatDate(dep.date)}
//                 </div>
//               ))}
//           </div>
//         </div>
//       )}

//       {/* Sightseeing */}
//       {pkg.sightseeing?.length > 0 && (
//         <div>
//           <SectionTitle>Sightseeing highlights</SectionTitle>
//           <div className="flex flex-wrap gap-2.5">
//             {pkg.sightseeing.map((place, i) => (
//               <span
//                 key={i}
//                 className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm"
//                 style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", color: "#232323" }}
//               >
//                 <MapPin size={13} style={{ color: "#E8A33D" }} />
//                 {place}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Itinerary — genuinely a sequence, numbered accordion */}
//       {pkg.itinerary?.length > 0 && (
//         <div>
//           <SectionTitle>Day-wise itinerary</SectionTitle>
//           <div className="space-y-2.5">
//             {pkg.itinerary.map((dayDesc, i) => {
//               const isOpen = openItinerary[`${pkgKey}-${i}`];
//               return (
//                 <div
//                   key={i}
//                   className="rounded-xl overflow-hidden"
//                   style={{ border: "1px solid #DDE6EF" }}
//                 >
//                   <button
//                     onClick={() => toggleItineraryDay(pkgKey, i)}
//                     className="w-full flex items-center gap-4 px-5 py-3.5 text-left"
//                     style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
//                   >
//                     <span
//                       className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
//                       style={{ background: "#2F7D4F", color: "#FFFFFF" }}
//                     >
//                       {i + 1}
//                     </span>
//                     <span className="font-semibold flex-1" style={{ color: "#232323" }}>
//                       Day {i + 1}
//                     </span>
//                     <ChevronDown
//                       size={18}
//                       style={{
//                         color: "#8A7A57",
//                         transform: isOpen ? "rotate(180deg)" : "none",
//                         transition: "transform 0.3s",
//                       }}
//                     />
//                   </button>
//                   {isOpen && (
//                     <div
//                       className="px-5 py-4 text-sm leading-relaxed whitespace-pre-line"
//                       style={{ color: "#5C5347", borderTop: "1px solid #DDE6EF" }}
//                     >
//                       {dayDesc}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Train Details — ticket stubs with nested addons */}
//       {pkg.trainDetails?.length > 0 && (
//         <div>
//           <SectionTitle>Train journey</SectionTitle>
//           {pkg.trainDetails.map((t, i) => (
//             <JourneyTicket key={i} kind="train" entry={t} label={journeyLabel(i, pkg.trainDetails.length)} />
//           ))}
//         </div>
//       )}

//       {/* Flight Details — ticket stubs with nested addons */}
//       {pkg.flightDetails?.length > 0 && (
//         <div>
//           <SectionTitle>Flight journey</SectionTitle>
//           {pkg.flightDetails.map((f, i) => (
//             <JourneyTicket key={i} kind="flight" entry={f} label={journeyLabel(i, pkg.flightDetails.length)} />
//           ))}
//         </div>
//       )}

//       {/* Boarding & Deboarding */}
//       {(pkg.boardingPoints?.length > 0 || pkg.deboardingPoints?.length > 0) && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {pkg.boardingPoints?.length > 0 && (
//             <div>
//               <SectionTitle>Boarding points</SectionTitle>
//               <ul className="space-y-2.5">
//                 {pkg.boardingPoints.map((bp, i) => (
//                   <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: "#5C5347" }}>
//                     <MapPin size={15} style={{ color: "#E8A33D" }} />
//                     {bp.stationName} ({bp.stationCode})
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//           {pkg.deboardingPoints?.length > 0 && (
//             <div>
//               <SectionTitle>Deboarding points</SectionTitle>
//               <ul className="space-y-2.5">
//                 {pkg.deboardingPoints.map((dp, i) => (
//                   <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: "#5C5347" }}>
//                     <MapPin size={15} style={{ color: "#E8A33D" }} />
//                     {dp.stationName} ({dp.stationCode})
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Optional (general) Add-ons — separate from the per-journey ones
//           above. Some tours carry a blank placeholder entry in `addons`
//           (e.g. { name: "", amount: 0 } from the Add Tour form default) —
//           filter those out so an empty-looking section never shows. */}
//       {(() => {
//         const realAddons = (pkg.addons || []).filter(
//           (a) => a?.name && a.name.trim() !== "",
//         );
//         if (realAddons.length === 0) return null;
//         return (
//           <div>
//             <SectionTitle>Optional add-ons</SectionTitle>
//             <div className="rounded-2xl p-1" style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
//               {realAddons.map((addon, i) => (
//                 <div
//                   key={i}
//                   className="flex justify-between items-center px-4 py-3"
//                   style={{ borderBottom: i < realAddons.length - 1 ? "1px solid #F1E8D8" : "none" }}
//                 >
//                   <span className="text-sm" style={{ color: "#232323" }}>{addon.name}</span>
//                   <span className="font-bold text-sm" style={{ color: "#2F7D4F" }}>
//                     {currencySymbol}{addon.amount?.toLocaleString()}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       })()}

//       {/* Remarks */}
//       {pkg.remarks && pkg.remarks.trim() !== "" && (
//         <div
//           className="rounded-2xl p-5"
//           style={{ background: "rgba(232,163,61,0.12)", borderLeft: "4px solid #E8A33D" }}
//         >
//           <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#5C5347" }}>
//             {pkg.remarks}
//           </p>
//         </div>
//       )}

//       {/* Includes & Excludes */}
//       {(pkg.includes?.length > 0 || pkg.excludes?.length > 0) && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {pkg.includes?.length > 0 && (
//             <div>
//               <SectionTitle>Included</SectionTitle>
//               <ul className="space-y-3">
//                 {pkg.includes.map((inc, i) => (
//                   <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#232323" }}>
//                     <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#2F7D4F" }} />
//                     {inc}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//           {pkg.excludes?.length > 0 && (
//             <div>
//               <SectionTitle>Not included</SectionTitle>
//               <ul className="space-y-3">
//                 {pkg.excludes.map((exc, i) => (
//                   <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#232323" }}>
//                     <X size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#D94A3D" }} />
//                     {exc}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="py-6 sm:py-10 px-3 sm:px-6">
//       <div
//         className="max-w-6xl mx-auto rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden"
//         style={{
//           background: "rgba(255,255,255,0.5)",
//           backdropFilter: "blur(20px)",
//           WebkitBackdropFilter: "blur(20px)",
//           border: "1px solid rgba(255,255,255,0.6)",
//           boxShadow: "0 20px 60px rgba(20,40,70,0.08)",
//         }}
//       >
//         {/* Hero — asymmetric, bottom-left aligned, serif headline */}
//         <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
//           <img src={tour.titleImage} alt={tour.title} className="w-full h-full object-cover" />
//           <div
//             className="absolute inset-0"
//             style={{
//               background: "linear-gradient(0deg, rgba(20,14,10,0.6) 0%, rgba(20,14,10,0.15) 55%, transparent 80%)",
//             }}
//           />

//           <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
//             <div className="max-w-3xl">
//               <h1
//                 className="text-2xl sm:text-4xl font-semibold mb-2 leading-snug max-w-2xl"
//                 style={{ fontFamily: "Georgia, serif", color: "#FFFFFF", textShadow: "0 2px 10px rgba(0,0,0,0.35)" }}
//               >
//                 {tour.title}
//               </h1>
//               <div className="w-14 h-0.5 mb-3" style={{ background: "#E8A33D" }} />
//               <p className="text-sm sm:text-base mb-6" style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}>
//                 {tour.duration.days} days · {tour.duration.nights} nights · {tour.batch}
//               </p>

//               {canBook ? (
//                 <button
//                   onClick={handleBookNow}
//                   disabled={bookingLoading}
//                   className="px-7 py-3 rounded-full font-semibold text-sm transition"
//                   style={{
//                     background: "#E8A33D",
//                     color: "#232323",
//                     opacity: bookingLoading ? 0.7 : 1,
//                   }}
//                 >
//                   {bookingLoading ? "Processing…" : "Book this tour"}
//                 </button>
//               ) : (
//                 <span
//                   className="inline-block px-6 py-2.5 rounded-full font-semibold text-sm"
//                   style={{ background: "#D94A3D", color: "#fff" }}
//                 >
//                   {statusLabel}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Completed trips banner — bold celebratory moment, brand-themed */}
//         {tour.completedTripsCount > 0 && tour.available && !tour.tripCancelled && (
//           <div
//             className="text-center py-10 px-6"
//             style={{ borderBottom: "1px solid rgba(255,255,255,0.7)" }}
//           >
//             <div className="text-5xl mb-4">🎉</div>
//             <p
//               className="text-2xl sm:text-3xl font-bold mb-2"
//               style={{ color: "#232323", fontFamily: "Georgia, serif" }}
//             >
//               Successfully completed{" "}
//               <span style={{ color: "#E8A33D" }}>{tour.completedTripsCount}</span>{" "}
//               {tour.completedTripsCount === 1 ? "trip" : "trips"}
//             </p>
//             <p className="text-sm sm:text-base" style={{ color: "#5C5347" }}>
//               Trusted by thousands of happy travelers!
//             </p>
//           </div>
//         )}

//         {/* Main content */}
//         <div className="p-6 sm:p-10 md:p-14">
//           {tour.tripCancelled ? (
//             <>
//               <CancelledMessage />
//               {tour.galleryImages?.length > 0 && (
//                 <div className="mt-14">
//                   <SectionTitle>Gallery</SectionTitle>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                     {tour.galleryImages.map((img, i) => (
//                       <div key={i} className="rounded-xl overflow-hidden aspect-[4/3]">
//                         <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </>
//           ) : !tour.available ? (
//             <>
//               <SoldOutMessage />
//               {tour.galleryImages?.length > 0 && (
//                 <div className="mt-14">
//                   <SectionTitle>Gallery</SectionTitle>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                     {tour.galleryImages.map((img, i) => (
//                       <div key={i} className="rounded-xl overflow-hidden aspect-[4/3]">
//                         <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </>
//           ) : (
//             <>
//               {tour.galleryImages?.length > 0 && (
//                 <div className="mb-14">
//                   <SectionTitle>Gallery</SectionTitle>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                     {tour.galleryImages.map((img, i) => (
//                       <div key={i} className="rounded-xl overflow-hidden aspect-[4/3]">
//                         <img
//                           src={img}
//                           alt={`Gallery ${i + 1}`}
//                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {tour.mapImage && (
//                 <div className="mb-14">
//                   <SectionTitle>Route map</SectionTitle>
//                   <img src={tour.mapImage} alt="Route map" className="w-full max-w-xl rounded-2xl" style={{ border: "1px solid #DDE6EF" }} />
//                 </div>
//               )}

//               {tour.destination?.length > 0 && (
//                 <div className="mb-14">
//                   <SectionTitle>Journey route</SectionTitle>
//                   <p
//                     className="text-lg rounded-2xl px-6 py-4"
//                     style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.8)", color: "#232323" }}
//                   >
//                     {tour.destination.join("  →  ")}
//                   </p>
//                 </div>
//               )}

//               <div className="mb-14">{renderPackageContent(tour, "main")}</div>

//               {tour.variantPackage?.length > 0 && (
//                 <div className="mb-14">
//                   <SectionTitle>Variant packages</SectionTitle>
//                   {tour.variantPackage.map((variant, i) => (
//                     <div key={i} className="mb-4">
//                       <button
//                         onClick={() => toggleVariant(i)}
//                         className="w-full flex items-center justify-between px-5 py-4 rounded-xl text-left"
//                         style={{ background: "rgba(232,163,61,0.12)" }}
//                       >
//                         <span className="font-semibold" style={{ color: "#2F7D4F" }}>
//                           Variant package {i + 1}
//                         </span>
//                         <ChevronDown
//                           size={18}
//                           style={{
//                             color: "#2F7D4F",
//                             transform: openVariants[i] ? "rotate(180deg)" : "none",
//                             transition: "transform 0.3s",
//                           }}
//                         />
//                       </button>
//                       {openVariants[i] && (
//                         <div
//                           className="rounded-xl p-6 mt-2"
//                           style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.8)" }}
//                         >
//                           {renderPackageContent(variant, `variant-${i}`)}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Final CTA */}
//               <div
//                 className="text-center py-14 px-6 rounded-3xl"
//                 style={{ background: "#2F7D4F" }}
//               >
//                 <h2
//                   className="text-2xl sm:text-3xl font-bold text-white mb-3"
//                   style={{ fontFamily: "Georgia, serif" }}
//                 >
//                   Ready when you are
//                 </h2>
//                 <p className="text-white/80 mb-7 max-w-lg mx-auto text-sm">
//                   {tour.tripCancelled
//                     ? "This trip has been cancelled — take a look at our other tours."
//                     : !tour.available
//                       ? "This tour is sold out — take a look at our other tours."
//                       : tour.bookingClosed
//                         ? "Bookings for this tour are closed — take a look at our other tours."
//                         : "Secure your seat for this journey today."}
//                 </p>
//                 {canBook ? (
//                   <button
//                     onClick={handleBookNow}
//                     disabled={bookingLoading}
//                     className="px-8 py-3.5 rounded-full font-semibold text-sm transition"
//                     style={{ background: "#E8A33D", color: "#232323", opacity: bookingLoading ? 0.7 : 1 }}
//                   >
//                     {bookingLoading ? "Processing…" : "Book now"}
//                   </button>
//                 ) : (
//                   <span
//                     className="inline-block px-7 py-3 rounded-full font-semibold text-sm"
//                     style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
//                   >
//                     {statusLabel}
//                   </span>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TourDetails;

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";
import { toast } from "react-toastify";
import {
  MapPin,
  Clock,
  Calendar,
  Train,
  Plane,
  Check,
  X,
  ChevronDown,
  Ticket,
  IndianRupee,
  Users,
} from "lucide-react";

const TourDetails = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { tours, currencySymbol, token, userData } = useContext(TourAppContext);

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [openVariants, setOpenVariants] = useState({});
  const [openItinerary, setOpenItinerary] = useState({});

  useEffect(() => {
    if (tours.length > 0) {
      const foundTour = tours.find((t) => t._id === tourId);
      if (foundTour) setTour(foundTour);
      else {
        toast.error("Tour not found.");
        navigate("/tours");
      }
      setLoading(false);
    }
  }, [tours, tourId, navigate]);

  const toggleVariant = (index) =>
    setOpenVariants((prev) => ({ ...prev, [index]: !prev[index] }));

  const toggleItineraryDay = (pkgKey, dayIndex) =>
    setOpenItinerary((prev) => ({
      ...prev,
      [`${pkgKey}-${dayIndex}`]: !prev[`${pkgKey}-${dayIndex}`],
    }));

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const canBook = tour?.available && !tour?.tripCancelled && !tour?.bookingClosed;

  const statusLabel = tour?.tripCancelled
    ? "Trip Cancelled"
    : !tour?.available
      ? "Sold Out"
      : "Booking Closed";

  const handleBookNow = () => {
    if (tour.tripCancelled) {
      toast.error("This trip has been cancelled and is no longer bookable.");
      return;
    }
    if (tour.bookingClosed) {
      toast.error("Bookings for this tour are currently closed.");
      return;
    }
    if (!tour.available) {
      toast.error("This tour is currently sold out.");
      return;
    }

    setBookingLoading(true);

    if (!token || !userData?._id) {
      toast.info("Please login or create an account to continue booking");
      navigate("/login", {
        state: { from: location.pathname + location.search },
        replace: true,
      });
    } else {
      navigate(`/booking/${tour._id}`);
    }

    setTimeout(() => setBookingLoading(false), 300);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-24">
        <p style={{ color: "#8A7A57" }} className="text-lg">
          Loading tour details…
        </p>
      </div>
    );

  if (!tour) return null;

  // ── Sold-out state (unchanged behaviour, restyled) ─────────────────────
  const SoldOutMessage = () => (
    <div
      className="text-center py-16 px-6 rounded-3xl max-w-3xl mx-auto"
      style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
    >
      <div
        className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl"
        style={{ background: "rgba(217,74,61,0.12)", color: "#D94A3D" }}
      >
        ✕
      </div>
      <h2
        className="text-3xl font-bold mb-4"
        style={{ color: "#D94A3D", fontFamily: "Georgia, serif" }}
      >
        This tour is currently sold out
      </h2>
      <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#5C5347" }}>
        Every seat for this batch has been taken. Join the waitlist and we'll
        let you know the moment a new batch opens.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => navigate("/tours")}
          className="px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5"
          style={{ background: "#2F7D4F", color: "#fff" }}
        >
          Browse other tours
        </button>
        <button
          onClick={() => navigate("/contact")}
          className="px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 border hover:bg-[#2F7D4F] hover:text-white hover:shadow-lg hover:-translate-y-0.5"
          style={{ borderColor: "#2F7D4F", color: "#2F7D4F" }}
        >
          Join the waitlist
        </button>
      </div>
    </div>
  );

  const CancelledMessage = () => (
    <div
      className="text-center py-16 px-6 rounded-3xl max-w-3xl mx-auto"
      style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
    >
      <div
        className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl"
        style={{ background: "rgba(217,74,61,0.12)", color: "#D94A3D" }}
      >
        ✕
      </div>
      <h2
        className="text-3xl font-bold mb-4"
        style={{ color: "#D94A3D", fontFamily: "Georgia, serif" }}
      >
        This trip is currently cancelled
      </h2>
      <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#5C5347" }}>
        This trip has been cancelled and is no longer bookable. Take a look
        at our other tours.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => navigate("/tours")}
          className="px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5"
          style={{ background: "#2F7D4F", color: "#fff" }}
        >
          Browse other tours
        </button>
        <button
          onClick={() => navigate("/contact")}
          className="px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 border hover:bg-[#2F7D4F] hover:text-white hover:shadow-lg hover:-translate-y-0.5"
          style={{ borderColor: "#2F7D4F", color: "#2F7D4F" }}
        >
          Contact us
        </button>
      </div>
    </div>
  );

  // ── Section heading — small tick, serif title ───────────────
  const SectionTitle = ({ children }) => (
    <div className="flex items-center gap-3 mb-6">
      <span
        className="w-1.5 h-6 rounded-full flex-shrink-0"
        style={{ background: "#2563EB" }}
      />
      <h3
        className="text-xl md:text-2xl font-bold"
        style={{ color: "#232323", fontFamily: "Georgia, serif" }}
      >
        {children}
      </h3>
    </div>
  );

  // ── Train / Flight "ticket stub" card — the signature element ──────────
  // Modelled on a physical journey ticket: route on the left with a
  // dashed perforation, class/timing on the right, and each entry's own
  // addons listed as small rows UNDER the ticket (not a separate global
  // section) so "3AC upgrade for THIS train" reads as exactly that.
  // ── Journey leg label ────────────────────────────────────────────────
  // Instead of a flat "Train 1 / Train 2 / Train 3", label each entry by
  // its role in the trip — first leg is Boarding, last is Deboarding,
  // anything between is Middle — matching the BOARDING/MIDDLE/DEBOARDING
  // convention already used for addon tripType elsewhere in the app. A
  // single entry gets no label at all (nothing to distinguish it from).
  const journeyLabel = (index, total) => {
    if (total <= 1) return "";
    if (index === 0) return "Boarding";
    if (index === total - 1) return "Deboarding";
    const middleCount = total - 2;
    return middleCount > 1 ? `Middle ${index}` : "Middle";
  };

  const JourneyTicket = ({ kind, entry, label }) => {
    const isTrain = kind === "train";
    const Icon = isTrain ? Train : Plane;
    const title = isTrain
      ? `${entry.trainName || "Train"} · ${entry.trainNo || "—"}`
      : `${entry.airline || "Flight"} ${entry.flightNo || ""}`.trim();
    const from = isTrain ? entry.fromStation : entry.fromAirport;
    const to = isTrain ? entry.toStation : entry.toAirport;
    const fromCode = entry.fromCode;
    const toCode = entry.toCode;

    return (
      <div
        className="relative rounded-2xl overflow-hidden mb-4"
        style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Stub */}
          <div
            className="sm:w-16 flex sm:flex-col items-center justify-center gap-2 py-4 sm:py-6"
            style={{ background: "#2F7D4F", color: "#FFFFFF" }}
          >
            <Icon size={20} />
            <span className="text-[10px] font-bold tracking-wide uppercase sm:[writing-mode:vertical-rl] sm:rotate-180">
              {label ? `${label} ${isTrain ? "Train" : "Flight"}` : isTrain ? "Train" : "Flight"}
            </span>
          </div>

          {/* Perforation */}
          <div
            className="hidden sm:block w-px my-4"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #DDE6EF 0, #DDE6EF 6px, transparent 6px, transparent 12px)",
            }}
          />

          {/* Details */}
          <div className="flex-1 p-4 sm:p-5">
            <p
              className="font-bold text-base mb-2"
              style={{ color: "#232323" }}
            >
              {title}
            </p>

            {(from || to) && (
              <div className="flex items-center gap-2 text-sm mb-2 flex-wrap">
                <span style={{ color: "#5C5347" }}>
                  {from} {fromCode && `(${fromCode})`}
                </span>
                <span style={{ color: "#2563EB" }}>→</span>
                <span style={{ color: "#5C5347" }}>
                  {to} {toCode && `(${toCode})`}
                </span>
              </div>
            )}

            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs" style={{ color: "#8A7A57" }}>
              {entry.class && <span>Class: {entry.class}</span>}
              {entry.departureTime && (
                <span>
                  {entry.departureTime} → {entry.arrivalTime}
                </span>
              )}
            </div>

            {/* Nested addons — this entry's own extras, not a global list */}
            {entry.addons?.length > 0 && (
              <div
                className="mt-3 pt-3 flex flex-wrap gap-2"
                style={{ borderTop: "1px dashed #DDE6EF" }}
              >
                {entry.addons.map((addon, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ background: "rgba(232,163,61,0.16)", color: "#D94A3D" }}
                  >
                    {addon.name}
                    <span className="font-bold">
                      {currencySymbol}
                      {addon.amount?.toLocaleString()}
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderPackageContent = (pkg, pkgKey = "main") => (
    <div className="space-y-14">
      {/* Price + Advance — side-by-side ticket-style cards */}
      <div>
        <SectionTitle>Fare per person</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ["Double sharing", pkg.price.doubleSharing],
            ["Triple sharing", pkg.price.tripleSharing],
            pkg.price.childWithBerth && ["Child, with berth", pkg.price.childWithBerth],
            pkg.price.childWithoutBerth && ["Child, without berth", pkg.price.childWithoutBerth],
          ]
            .filter(Boolean)
            .map(([label, amount]) => (
              <div
                key={label}
                className="rounded-2xl p-4"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  boxShadow:
                    "0 3px 8px rgba(20,40,70,0.07), inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1.5px 3px rgba(20,40,70,0.06)",
                }}
              >
                <p className="text-xs mb-1.5" style={{ color: "#8A7A57" }}>
                  {label}
                </p>
                <p
                  className="text-xl font-bold"
                  style={{ color: "#2F7D4F", fontFamily: "Georgia, serif" }}
                >
                  {currencySymbol}
                  {amount?.toLocaleString()}
                </p>
              </div>
            ))}
        </div>
        <div
          className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-sm rounded-xl px-4 py-3"
          style={{ background: "rgba(37,99,235,0.10)", color: "#2F7D4F" }}
        >
          <span>
            Advance (adult): <strong>{currencySymbol}{pkg.advanceAmount.adult?.toLocaleString()}</strong>
          </span>
          <span>
            Advance (child): <strong>{currencySymbol}{(pkg.advanceAmount.child || 0).toLocaleString()}</strong>
          </span>
        </div>
      </div>

      {/* Departure dates — horizontal chips instead of a grid of boxes */}
      {pkg.departureDates?.length > 0 && (
        <div>
          <SectionTitle>Departure dates</SectionTitle>
          <div className="flex flex-wrap gap-3">
            {pkg.departureDates
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((dep, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm"
                  style={{
                    background: dep.status === "Available" ? "rgba(47,125,79,0.12)" : "rgba(217,74,61,0.12)",
                    color: dep.status === "Available" ? "#2F7D4F" : "#D94A3D",
                  }}
                >
                  <Calendar size={14} />
                  {formatDate(dep.date)}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Sightseeing */}
      {pkg.sightseeing?.length > 0 && (
        <div>
          <SectionTitle>Sightseeing highlights</SectionTitle>
          <div className="flex flex-wrap gap-2.5">
            {pkg.sightseeing.map((place, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm"
                style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", color: "#232323" }}
              >
                <MapPin size={13} style={{ color: "#E8A33D" }} />
                {place}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Itinerary — genuinely a sequence, numbered accordion */}
      {pkg.itinerary?.length > 0 && (
        <div>
          <SectionTitle>Day-wise itinerary</SectionTitle>
          <div className="space-y-2.5">
            {pkg.itinerary.map((dayDesc, i) => {
              const isOpen = openItinerary[`${pkgKey}-${i}`];
              return (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{ border: "1px solid #DDE6EF" }}
                >
                  <button
                    onClick={() => toggleItineraryDay(pkgKey, i)}
                    className="w-full flex items-center gap-4 px-5 py-3.5 text-left"
                    style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
                  >
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ background: "#2F7D4F", color: "#FFFFFF" }}
                    >
                      {i + 1}
                    </span>
                    <span className="font-semibold flex-1" style={{ color: "#232323" }}>
                      Day {i + 1}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{
                        color: "#8A7A57",
                        transform: isOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.3s",
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div
                      className="px-5 py-4 text-sm leading-relaxed whitespace-pre-line"
                      style={{ color: "#5C5347", borderTop: "1px solid #DDE6EF" }}
                    >
                      {dayDesc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Train Details — ticket stubs with nested addons */}
      {pkg.trainDetails?.length > 0 && (
        <div>
          <SectionTitle>Train journey</SectionTitle>
          {pkg.trainDetails.map((t, i) => (
            <JourneyTicket key={i} kind="train" entry={t} label={journeyLabel(i, pkg.trainDetails.length)} />
          ))}
        </div>
      )}

      {/* Flight Details — ticket stubs with nested addons */}
      {pkg.flightDetails?.length > 0 && (
        <div>
          <SectionTitle>Flight journey</SectionTitle>
          {pkg.flightDetails.map((f, i) => (
            <JourneyTicket key={i} kind="flight" entry={f} label={journeyLabel(i, pkg.flightDetails.length)} />
          ))}
        </div>
      )}

      {/* Boarding & Deboarding */}
      {(pkg.boardingPoints?.length > 0 || pkg.deboardingPoints?.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pkg.boardingPoints?.length > 0 && (
            <div>
              <SectionTitle>Boarding points</SectionTitle>
              <ul className="space-y-2.5">
                {pkg.boardingPoints.map((bp, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: "#6B3410" }}>
                    <MapPin size={15} style={{ color: "#D94A3D" }} />
                    {bp.stationName} ({bp.stationCode})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {pkg.deboardingPoints?.length > 0 && (
            <div>
              <SectionTitle>Deboarding points</SectionTitle>
              <ul className="space-y-2.5">
                {pkg.deboardingPoints.map((dp, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: "#6B3410" }}>
                    <MapPin size={15} style={{ color: "#D94A3D" }} />
                    {dp.stationName} ({dp.stationCode})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Optional (general) Add-ons — separate from the per-journey ones
          above. Some tours carry a blank placeholder entry in `addons`
          (e.g. { name: "", amount: 0 } from the Add Tour form default) —
          filter those out so an empty-looking section never shows. */}
      {(() => {
        const realAddons = (pkg.addons || []).filter(
          (a) => a?.name && a.name.trim() !== "",
        );
        if (realAddons.length === 0) return null;
        return (
          <div>
            <SectionTitle>Optional add-ons</SectionTitle>
            <div className="rounded-2xl p-1" style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
              {realAddons.map((addon, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center px-4 py-3"
                  style={{ borderBottom: i < realAddons.length - 1 ? "1px solid #F1E8D8" : "none" }}
                >
                  <span className="text-sm" style={{ color: "#232323" }}>{addon.name}</span>
                  <span className="font-bold text-sm" style={{ color: "#2F7D4F" }}>
                    {currencySymbol}{addon.amount?.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Remarks */}
      {pkg.remarks && pkg.remarks.trim() !== "" && (
        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(37,99,235,0.10)", borderLeft: "4px solid #2563EB" }}
        >
          <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#5C5347" }}>
            {pkg.remarks}
          </p>
        </div>
      )}

      {/* Includes & Excludes */}
      {(pkg.includes?.length > 0 || pkg.excludes?.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pkg.includes?.length > 0 && (
            <div>
              <SectionTitle>Included</SectionTitle>
              <ul className="space-y-3">
                {pkg.includes.map((inc, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#232323" }}>
                    <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#2F7D4F" }} />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {pkg.excludes?.length > 0 && (
            <div>
              <SectionTitle>Not included</SectionTitle>
              <ul className="space-y-3">
                {pkg.excludes.map((exc, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#232323" }}>
                    <X size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#D94A3D" }} />
                    {exc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="py-6 sm:py-10 px-3 sm:px-6">
      <div
        className="max-w-6xl mx-auto rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 20px 60px rgba(20,40,70,0.08)",
        }}
      >
        {/* Hero — asymmetric, bottom-left aligned, serif headline */}
        <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
          <img src={tour.titleImage} alt={tour.title} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(0deg, rgba(20,14,10,0.6) 0%, rgba(20,14,10,0.15) 55%, transparent 80%)",
            }}
          />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <div className="max-w-3xl">
              <h1
                className="text-2xl sm:text-4xl font-semibold mb-2 leading-snug max-w-2xl"
                style={{ fontFamily: "Georgia, serif", color: "#FFFFFF", textShadow: "0 2px 10px rgba(0,0,0,0.35)" }}
              >
                {tour.title}
              </h1>
              <div className="w-14 h-0.5 mb-3" style={{ background: "#E8A33D" }} />
              <p className="text-sm sm:text-base mb-6" style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}>
                {tour.duration.days} days · {tour.duration.nights} nights · {tour.batch}
              </p>

              {canBook ? (
                <button
                  onClick={handleBookNow}
                  disabled={bookingLoading}
                  className="px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:brightness-110 hover:shadow-xl hover:-translate-y-0.5 hover:scale-105"
                  style={{
                    background: "#2563EB",
                    color: "#FFFFFF",
                    opacity: bookingLoading ? 0.7 : 1,
                  }}
                >
                  {bookingLoading ? "Processing…" : "Book this tour"}
                </button>
              ) : (
                <span
                  className="inline-block px-6 py-2.5 rounded-full font-semibold text-sm"
                  style={{ background: "#D94A3D", color: "#fff" }}
                >
                  {statusLabel}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Completed trips banner — bold celebratory moment, brand-themed */}
        {tour.completedTripsCount > 0 && tour.available && !tour.tripCancelled && (
          <div
            className="text-center py-10 px-6"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.7)" }}
          >
            <div className="text-5xl mb-4">🎉</div>
            <p
              className="text-2xl sm:text-3xl font-bold mb-2"
              style={{ color: "#232323", fontFamily: "Georgia, serif" }}
            >
              Successfully completed{" "}
              <span style={{ color: "#2563EB" }}>{tour.completedTripsCount}</span>{" "}
              {tour.completedTripsCount === 1 ? "trip" : "trips"}
            </p>
            <p className="text-sm sm:text-base" style={{ color: "#5C5347" }}>
              Trusted by thousands of happy travelers!
            </p>
          </div>
        )}

        {/* Main content */}
        <div className="p-6 sm:p-10 md:p-14">
          {tour.tripCancelled ? (
            <>
              <CancelledMessage />
              {tour.galleryImages?.length > 0 && (
                <div className="mt-14">
                  <SectionTitle>Gallery</SectionTitle>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {tour.galleryImages.map((img, i) => (
                      <div key={i} className="rounded-xl overflow-hidden aspect-[4/3]">
                        <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : !tour.available ? (
            <>
              <SoldOutMessage />
              {tour.galleryImages?.length > 0 && (
                <div className="mt-14">
                  <SectionTitle>Gallery</SectionTitle>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {tour.galleryImages.map((img, i) => (
                      <div key={i} className="rounded-xl overflow-hidden aspect-[4/3]">
                        <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {tour.galleryImages?.length > 0 && (
                <div className="mb-14">
                  <SectionTitle>Gallery</SectionTitle>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {tour.galleryImages.map((img, i) => (
                      <div key={i} className="rounded-xl overflow-hidden aspect-[4/3]">
                        <img
                          src={img}
                          alt={`Gallery ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tour.mapImage && (
                <div className="mb-14">
                  <SectionTitle>Route map</SectionTitle>
                  <img src={tour.mapImage} alt="Route map" className="w-full max-w-xl rounded-2xl" style={{ border: "1px solid #DDE6EF" }} />
                </div>
              )}

              {tour.destination?.length > 0 && (
                <div className="mb-14">
                  <SectionTitle>Journey route</SectionTitle>
                  <p
                    className="text-lg rounded-2xl px-6 py-4"
                    style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.8)", color: "#232323" }}
                  >
                    {tour.destination.join("  →  ")}
                  </p>
                </div>
              )}

              <div className="mb-14">{renderPackageContent(tour, "main")}</div>

              {tour.variantPackage?.length > 0 && (
                <div className="mb-14">
                  <SectionTitle>Variant packages</SectionTitle>
                  {tour.variantPackage.map((variant, i) => (
                    <div key={i} className="mb-4">
                      <button
                        onClick={() => toggleVariant(i)}
                        className="w-full flex items-center justify-between px-5 py-4 rounded-xl text-left transition-all duration-300 hover:bg-[rgba(37,99,235,0.18)] hover:shadow-md"
                        style={{ background: "rgba(37,99,235,0.10)" }}
                      >
                        <span className="font-semibold" style={{ color: "#2F7D4F" }}>
                          Variant package {i + 1}
                        </span>
                        <ChevronDown
                          size={18}
                          style={{
                            color: "#2F7D4F",
                            transform: openVariants[i] ? "rotate(180deg)" : "none",
                            transition: "transform 0.3s",
                          }}
                        />
                      </button>
                      {openVariants[i] && (
                        <div
                          className="rounded-xl p-6 mt-2"
                          style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.8)" }}
                        >
                          {renderPackageContent(variant, `variant-${i}`)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Final CTA */}
              <div
                className="text-center py-14 px-6 rounded-3xl"
                style={{ background: "#2F7D4F" }}
              >
                <h2
                  className="text-2xl sm:text-3xl font-bold text-white mb-3"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Ready when you are
                </h2>
                <p className="text-white/80 mb-7 max-w-lg mx-auto text-sm">
                  {tour.tripCancelled
                    ? "This trip has been cancelled — take a look at our other tours."
                    : !tour.available
                      ? "This tour is sold out — take a look at our other tours."
                      : tour.bookingClosed
                        ? "Bookings for this tour are closed — take a look at our other tours."
                        : "Secure your seat for this journey today."}
                </p>
                {canBook ? (
                  <button
                    onClick={handleBookNow}
                    disabled={bookingLoading}
                    className="px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:brightness-110 hover:shadow-xl hover:-translate-y-0.5 hover:scale-105"
                    style={{ background: "#E8A33D", color: "#232323", opacity: bookingLoading ? 0.7 : 1 }}
                  >
                    {bookingLoading ? "Processing…" : "Book now"}
                  </button>
                ) : (
                  <span
                    className="inline-block px-7 py-3 rounded-full font-semibold text-sm"
                    style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
                  >
                    {statusLabel}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourDetails;

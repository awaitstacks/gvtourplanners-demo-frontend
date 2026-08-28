// /* eslint-disable no-unused-vars */

// import React, { useContext, useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { TourAppContext } from "../context/TourAppContext.jsx";
// import { toast } from "react-toastify";
// import jsPDF from "jspdf";

// const TourDetails = () => {
//   const { tourId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation(); // ← Added to capture current URL
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

//   // Existing scroll animation for other sections
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate-fade-up");
//           }
//         });
//       },
//       { threshold: 0.1 },
//     );
//     document
//       .querySelectorAll(".animate-on-scroll")
//       .forEach((el) => observer.observe(el));
//     return () => observer.disconnect();
//   }, [tour]);

//   // New: Scroll animation specifically for Completed Trips Banner
//   useEffect(() => {
//     const bannerObserver = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("visible");
//           }
//         });
//       },
//       { threshold: 0.2, rootMargin: "0px 0px -50px 0px" },
//     );

//     const banner = document.getElementById("completed-trips-banner");
//     if (banner) bannerObserver.observe(banner);

//     return () => {
//       if (banner) bannerObserver.unobserve(banner);
//     };
//   }, [tour]);

//   const toggleVariant = (index) =>
//     setOpenVariants((prev) => ({ ...prev, [index]: !prev[index] }));

//   const toggleItineraryDay = (pkgKey, dayIndex) =>
//     setOpenItinerary((prev) => ({
//       ...prev,
//       [`${pkgKey}-${dayIndex}`]: !prev[`${pkgKey}-${dayIndex}`],
//     }));

//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleDateString("en-IN", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

//   const handleBookNow = () => {
//     if (!tour.available) {
//       toast.error("This tour is currently sold out.");
//       return;
//     }

//     setBookingLoading(true);

//     if (!token || !userData?._id) {
//       // Not logged in → redirect to login with return path
//       toast.info("Please login or create an account to continue booking");

//       navigate("/login", {
//         state: { from: location.pathname + location.search },
//         replace: true,
//       });
//     } else {
//       // Already logged in → go to booking
//       navigate(`/booking/${tour._id}`);
//     }

//     setTimeout(() => {
//       setBookingLoading(false);
//     }, 300);
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-lg text-gray-600">Loading tour details...</p>
//       </div>
//     );

//   if (!tour) return null;

//   // Professional sold-out message component
//   const SoldOutMessage = () => (
//     <div className="text-center py-16 px-6 bg-gradient-to-b from-red-50 to-white rounded-3xl shadow-xl border border-red-100 max-w-4xl mx-auto animate-fade-up">
//       <div className="text-6xl mb-6 text-red-500 animate-pulse">✗</div>
//       <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-6">
//         This Tour is Currently Sold Out
//       </h2>
//       <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
//         We're sorry, but all seats for this batch have been booked. Thank you
//         for your interest!
//       </p>
//       <p className="text-base text-gray-600 mb-10">
//         Check out our other upcoming tours or join the waitlist for future
//         batches.
//       </p>
//       <div className="flex flex-col sm:flex-row gap-4 justify-center">
//         <button
//           onClick={() => navigate("/tours")}
//           className="px-8 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition shadow-lg"
//         >
//           Explore Other Tours
//         </button>
//         <button
//           onClick={() => navigate("/contact")}
//           className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 font-medium rounded-full hover:bg-blue-50 transition shadow-lg"
//         >
//           Join Waitlist / Contact Us
//         </button>
//       </div>
//     </div>
//   );

//   const renderDepartureDates = (dates, title) => {
//     if (!dates?.length) return null;
//     return (
//       <div className="mb-12">
//         <h3 className="text-xl font-semibold text-gray-800 mb-6">{title}</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
//           {dates
//             .sort((a, b) => new Date(a.date) - new Date(b.date))
//             .map((dep, i) => (
//               <div
//                 key={i}
//                 className="bg-white p-6 rounded-xl shadow-sm border text-center"
//               >
//                 <p className="text-lg font-bold text-indigo-700">
//                   {formatDate(dep.date)}
//                 </p>
//                 <p
//                   className={`mt-3 text-base font-medium ${
//                     dep.status === "Available"
//                       ? "text-green-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {dep.status || "Available"}
//                 </p>
//               </div>
//             ))}
//         </div>
//       </div>
//     );
//   };

//   const renderPackageContent = (pkg, pkgKey = "main") => (
//     <div className="space-y-12">
//       {/* Tour Price */}
//       <div>
//         <h3 className="text-xl font-semibold text-gray-800 mb-5">
//           Tour Price (per person)
//         </h3>
//         <div className="bg-gray-50 p-6 rounded-xl border space-y-4">
//           <div className="flex justify-between text-base">
//             <span>Double Sharing</span>
//             <span className="font-bold text-indigo-700">
//               {pkg.price.doubleSharing?.toLocaleString()} INR
//             </span>
//           </div>
//           <div className="flex justify-between text-base">
//             <span>Triple Sharing</span>
//             <span className="font-bold text-indigo-700">
//               {pkg.price.tripleSharing?.toLocaleString()} INR
//             </span>
//           </div>
//           {pkg.price.childWithBerth && (
//             <div className="flex justify-between text-base">
//               <span>Child with Berth</span>
//               <span className="font-bold text-indigo-700">
//                 {pkg.price.childWithBerth.toLocaleString()} INR
//               </span>
//             </div>
//           )}
//           {pkg.price.childWithoutBerth && (
//             <div className="flex justify-between text-base">
//               <span>Child without Berth</span>
//               <span className="font-bold text-indigo-700">
//                 {pkg.price.childWithoutBerth.toLocaleString()} INR
//               </span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Advance Payment */}
//       <div>
//         <h3 className="text-xl font-semibold text-gray-800 mb-5">
//           Advance Payment Required
//         </h3>
//         <div className="bg-gray-50 p-6 rounded-xl border space-y-4">
//           <div className="flex justify-between text-base">
//             <span>Adult</span>
//             <span className="font-bold text-indigo-700">
//               {pkg.advanceAmount.adult?.toLocaleString()} INR
//             </span>
//           </div>
//           <div className="flex justify-between text-base">
//             <span>Child</span>
//             <span className="font-bold text-indigo-700">
//               {pkg.advanceAmount.child || 0} INR
//             </span>
//           </div>
//         </div>
//       </div>

//       {renderDepartureDates(pkg.departureDates, "Departure Dates")}

//       {pkg.sightseeing?.length > 0 && (
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-5">
//             Sightseeing Highlights
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {pkg.sightseeing.map((place, i) => (
//               <div key={i} className="bg-white p-5 rounded-xl shadow-sm border">
//                 <p className="text-base">• {place}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {pkg.itinerary?.length > 0 && (
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-5">
//             Day-wise Itinerary
//           </h3>
//           <div className="space-y-3">
//             {pkg.itinerary.map((dayDesc, i) => (
//               <div
//                 key={i}
//                 className="border border-gray-200 rounded-xl overflow-hidden"
//               >
//                 <button
//                   onClick={() => toggleItineraryDay(pkgKey, i)}
//                   className="w-full text-left bg-gray-50 hover:bg-gray-100 px-6 py-4 flex justify-between items-center transition"
//                 >
//                   <span className="font-semibold text-indigo-700">
//                     Day {i + 1}
//                   </span>
//                   <span
//                     className={`text-2xl text-indigo-700 transition-transform duration-300 ${
//                       openItinerary[`${pkgKey}-${i}`] ? "rotate-180" : ""
//                     }`}
//                   >
//                     ▼
//                   </span>
//                 </button>
//                 <div
//                   className={`transition-all duration-500 overflow-hidden ${
//                     openItinerary[`${pkgKey}-${i}`]
//                       ? "max-h-96 opacity-100"
//                       : "max-h-0 opacity-0"
//                   }`}
//                 >
//                   <div className="p-6 bg-white text-gray-700 leading-relaxed whitespace-pre-line">
//                     {dayDesc}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Train Details */}
//       {pkg.trainDetails?.length > 0 && (
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-5">
//             Train Journey Details
//           </h3>
//           <div className="space-y-4">
//             {pkg.trainDetails.map((t, i) => (
//               <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
//                 <p className="font-medium text-gray-800">
//                   {t.trainNo} - {t.trainName}
//                 </p>
//                 <p className="text-gray-600 mt-2">
//                   Route: {t.fromStation} → {t.toStation}
//                 </p>
//                 <p className="text-gray-600">Class: {t.class}</p>
//                 <p className="text-gray-600">
//                   Timing: {t.departureTime} → {t.arrivalTime}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Flight Details */}
//       {pkg.flightDetails?.length > 0 && (
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-5">
//             Flight Details
//           </h3>
//           <div className="space-y-4">
//             {pkg.flightDetails.map((f, i) => (
//               <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
//                 <p className="font-medium text-gray-800">
//                   {f.airline} {f.flightNo}
//                 </p>
//                 <p className="text-gray-600 mt-2">
//                   Route: {f.fromAirport} → {f.toAirport}
//                 </p>
//                 <p className="text-gray-600">Class: {f.class}</p>
//                 <p className="text-gray-600">
//                   Timing: {f.departureTime} → {f.arrivalTime}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Boarding & Deboarding */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {pkg.boardingPoints?.length > 0 && (
//           <div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-5">
//               Boarding Points
//             </h3>
//             <div className="bg-gray-50 p-6 rounded-xl border">
//               <ul className="space-y-3">
//                 {pkg.boardingPoints.map((bp, i) => (
//                   <li key={i} className="flex items-center gap-3">
//                     <span className="text-indigo-700">•</span>
//                     <span>
//                       {bp.stationName} ({bp.stationCode})
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
//         {pkg.deboardingPoints?.length > 0 && (
//           <div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-5">
//               Deboarding Points
//             </h3>
//             <div className="bg-gray-50 p-6 rounded-xl border">
//               <ul className="space-y-3">
//                 {pkg.deboardingPoints.map((dp, i) => (
//                   <li key={i} className="flex items-center gap-3">
//                     <span className="text-indigo-700">•</span>
//                     <span>
//                       {dp.stationName} ({dp.stationCode})
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Optional Add-ons */}
//       {pkg.addons?.length > 0 && (
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-5">
//             Optional Add-ons
//           </h3>
//           <div className="bg-gray-50 p-6 rounded-xl border space-y-4">
//             {pkg.addons.map((addon, i) => (
//               <div
//                 key={i}
//                 className="flex justify-between items-center text-base py-3 border-b border-gray-200 last:border-0"
//               >
//                 <span className="text-gray-700 font-medium">{addon.name}</span>
//                 <span className="font-bold text-indigo-700">
//                   {addon.amount.toLocaleString()} INR
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Remarks */}
//       {pkg.remarks && pkg.remarks.trim() !== "" && (
//         <div>
//           <h3 className="text-xl font-semibold text-indigo-700 mb-4">
//             Important Remarks
//           </h3>
//           <div className="bg-blue-50 border-l-4 border-indigo-700 p-6 rounded-r-xl">
//             <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//               {pkg.remarks}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Includes & Excludes */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
//         {pkg.includes?.length > 0 && (
//           <div>
//             <h3 className="text-2xl font-bold text-green-800 mb-6">
//               Package Includes
//             </h3>
//             <ul className="space-y-4">
//               {pkg.includes.map((inc, i) => (
//                 <li key={i} className="flex items-start gap-4">
//                   <span className="text-2xl text-green-600 mt-1 flex-shrink-0">
//                     ✓
//                   </span>
//                   <span className="text-gray-700 leading-relaxed">{inc}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {pkg.excludes?.length > 0 && (
//           <div>
//             <h3 className="text-2xl font-bold text-red-800 mb-6">
//               Package Excludes
//             </h3>
//             <ul className="space-y-4">
//               {pkg.excludes.map((exc, i) => (
//                 <li key={i} className="flex items-start gap-4">
//                   <span className="text-2xl text-red-600 mt-1 flex-shrink-0">
//                     ✗
//                   </span>
//                   <span className="text-gray-700 leading-relaxed">{exc}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <div className="bg-gray-50 min-h-screen">
//         {/* Hero Section */}
//         <div className="relative h-[55vh] sm:h-[65vh] md:h-[70vh] overflow-hidden">
//           <img
//             src={tour.titleImage}
//             alt={tour.title}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

//           <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white text-center">
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight">
//               {tour.title}
//             </h1>
//             <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8">
//               {tour.duration.days} Days / {tour.duration.nights} Nights • Batch:{" "}
//               {tour.batch}
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               {tour.available ? (
//                 <button
//                   onClick={handleBookNow}
//                   disabled={bookingLoading}
//                   className={`px-8 py-3 bg-green-500 text-white font-bold rounded-full text-base flex items-center justify-center gap-2 transition shadow-lg max-w-xs mx-auto sm:mx-0 ${
//                     bookingLoading
//                       ? "opacity-80 cursor-not-allowed"
//                       : "hover:bg-green-600 hover:shadow-xl"
//                   }`}
//                 >
//                   {bookingLoading ? (
//                     <>
//                       <svg
//                         className="animate-spin h-5 w-5 text-white"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                           fill="none"
//                         />
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8v8z"
//                         />
//                       </svg>
//                       Processing...
//                     </>
//                   ) : (
//                     "Book This Tour"
//                   )}
//                 </button>
//               ) : (
//                 <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-xl shadow-2xl animate-pulse">
//                   SOLD OUT
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Completed Trips Banner with Scroll Animation */}
//         {tour.completedTripsCount > 0 && (
//           <div className=" py-12 md:py-16 overflow-hidden">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div
//                 id="completed-trips-banner"
//                 className="text-center opacity-0 translate-y-12 transition-all duration-1000 ease-out"
//               >
//                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
//                   <span className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl animate-bounce-slow  ">
//                     🎉
//                   </span>

//                   <div className="space-y-4">
//                     <p className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
//                       Successfully Completed{" "}
//                       <span className="text-yellow-500 text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-md">
//                         {tour.completedTripsCount}
//                       </span>{" "}
//                       {tour.completedTripsCount === 1 ? "Trip" : "Trips"}
//                     </p>
//                     <p className="text-lg sm:text-xl md:text-xl text-gray-700 font-medium opacity-90">
//                       Trusted by thousands of happy travelers!
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Sold Out Message + Only Image Gallery (no other details) */}
//         {!tour.available ? (
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
//             <SoldOutMessage />

//             {tour.galleryImages?.length > 0 && (
//               <section className="mt-16 animate-fade-up">
//                 <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8 text-center">
//                   Tour Gallery
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//                   {tour.galleryImages.map((img, i) => (
//                     <div
//                       key={i}
//                       className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition"
//                     >
//                       <img
//                         src={img}
//                         alt={`Gallery ${i + 1}`}
//                         className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}
//           </div>
//         ) : (
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
//             {/* Gallery */}
//             {tour.galleryImages?.length > 0 && (
//               <section className="animate-on-scroll opacity-0 mb-16">
//                 <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8 text-center">
//                   Tour Gallery
//                 </h2>
//                 <div className="flex justify-center">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl">
//                     {tour.galleryImages.map((img, i) => (
//                       <div
//                         key={i}
//                         className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition"
//                       >
//                         <img
//                           src={img}
//                           alt={`Gallery ${i + 1}`}
//                           className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Route Map */}
//             {tour.mapImage && (
//               <section className="animate-on-scroll opacity-0 mb-16">
//                 <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8 text-center">
//                   Route Map
//                 </h2>
//                 <div className="flex justify-center">
//                   <img
//                     src={tour.mapImage}
//                     alt="Route Map"
//                     className="w-full max-w-2xl rounded-2xl shadow-lg"
//                   />
//                 </div>
//               </section>
//             )}

//             {/* Main Package */}
//             <section className="animate-on-scroll opacity-0 mb-16">
//               <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8">
//                 Main Tour Package
//               </h2>
//               {tour.destination?.length > 0 && (
//                 <div className="mb-10">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                     Journey Route
//                   </h3>
//                   <p className="text-lg bg-white p-6 rounded-xl shadow-sm border text-center">
//                     {tour.destination.join(" → ")}
//                   </p>
//                 </div>
//               )}
//               {renderPackageContent(tour, "main")}
//             </section>

//             {/* Variant Packages */}
//             {tour.variantPackage?.length > 0 && (
//               <section className="animate-on-scroll opacity-0">
//                 <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8">
//                   Variant Packages
//                 </h2>
//                 {tour.variantPackage.map((variant, i) => (
//                   <div key={i} className="mb-10">
//                     <button
//                       onClick={() => toggleVariant(i)}
//                       className="w-full text-left bg-indigo-50 hover:bg-indigo-100 px-6 py-5 rounded-xl flex justify-between items-center mb-4 transition"
//                     >
//                       <span className="text-lg font-semibold text-indigo-800">
//                         Variant Package {i + 1}
//                       </span>
//                       <span
//                         className={`text-2xl transition-transform ${
//                           openVariants[i] ? "rotate-180" : ""
//                         }`}
//                       >
//                         ▼
//                       </span>
//                     </button>
//                     {openVariants[i] && (
//                       <div className="bg-white rounded-xl shadow-sm border p-6">
//                         {renderPackageContent(variant, `variant-${i}`)}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </section>
//             )}

//             {/* Final CTA */}
//             <section className="text-center py-16 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-3xl shadow-xl animate-on-scroll opacity-0">
//               <h2 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-6">
//                 Ready to Explore?
//               </h2>
//               <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
//                 {tour.available
//                   ? "Secure your seat today for an unforgettable journey!"
//                   : "This tour is currently sold out. Check out our other available tours!"}
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//                 {tour.available ? (
//                   <button
//                     onClick={handleBookNow}
//                     disabled={bookingLoading}
//                     className={`px-10 py-4 bg-green-500 text-white font-bold rounded-full text-lg flex items-center justify-center gap-3 transition shadow-xl max-w-sm mx-auto ${
//                       bookingLoading
//                         ? "opacity-80 cursor-not-allowed"
//                         : "hover:bg-green-600 hover:scale-105"
//                     }`}
//                   >
//                     {bookingLoading ? (
//                       <>
//                         <svg
//                           className="animate-spin h-6 w-6 text-white"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                             fill="none"
//                           />
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8v8z"
//                           />
//                         </svg>
//                         Processing...
//                       </>
//                     ) : (
//                       "Book Now"
//                     )}
//                   </button>
//                 ) : (
//                   <div className="bg-red-600 text-white px-8 py-3 rounded-full font-bold text-xl shadow-2xl">
//                     SOLD OUT
//                   </div>
//                 )}
//               </div>
//             </section>
//           </div>
//         )}
//       </div>

//       <style>{`
//         .animate-fade-up {
//           opacity: 1 !important;
//           transform: translateY(0) !important;
//         }
//         .animate-on-scroll {
//           opacity: 0;
//           transform: translateY(30px);
//           transition: opacity 1s ease, transform 1s ease;
//         }

//         #completed-trips-banner {
//           opacity: 0;
//           transform: translateY(48px);
//           transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//         }
//         #completed-trips-banner.visible {
//           opacity: 1;
//           transform: translateY(0);
//         }

//         @keyframes bounce-slow {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-bounce-slow {
//           animation: bounce-slow 4s ease-in-out infinite;
//         }
//       `}</style>
//     </>
//   );
// };

// export default TourDetails;


/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";
import { toast } from "react-toastify";
import jsPDF from "jspdf";

const TourDetails = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // ← Added to capture current URL
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

  // Existing scroll animation for other sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(".animate-on-scroll")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tour]);

  // New: Scroll animation specifically for Completed Trips Banner
  useEffect(() => {
    const bannerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" },
    );

    const banner = document.getElementById("completed-trips-banner");
    if (banner) bannerObserver.observe(banner);

    return () => {
      if (banner) bannerObserver.unobserve(banner);
    };
  }, [tour]);

  const toggleVariant = (index) =>
    setOpenVariants((prev) => ({ ...prev, [index]: !prev[index] }));

  const toggleItineraryDay = (pkgKey, dayIndex) =>
    setOpenItinerary((prev) => ({
      ...prev,
      [`${pkgKey}-${dayIndex}`]: !prev[`${pkgKey}-${dayIndex}`],
    }));

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Whether booking is currently possible at all — used by both CTA
  // spots below instead of just tour.available, so a cancelled trip or
  // an admin-closed booking window blocks booking the same way sold-out
  // already does.
  const canBook = tour?.available && !tour?.tripCancelled && !tour?.bookingClosed;
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
      // Not logged in → redirect to login with return path
      toast.info("Please login or create an account to continue booking");

      navigate("/login", {
        state: { from: location.pathname + location.search },
        replace: true,
      });
    } else {
      // Already logged in → go to booking
      navigate(`/booking/${tour._id}`);
    }

    setTimeout(() => {
      setBookingLoading(false);
    }, 300);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading tour details...</p>
      </div>
    );

  if (!tour) return null;

  // Professional sold-out message component
  const SoldOutMessage = () => (
    <div className="text-center py-16 px-6 bg-gradient-to-b from-red-50 to-white rounded-3xl shadow-xl border border-red-100 max-w-4xl mx-auto animate-fade-up">
      <div className="text-6xl mb-6 text-red-500 animate-pulse">✗</div>
      <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-6">
        This Tour is Currently Sold Out
      </h2>
      <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
        We're sorry, but all seats for this batch have been booked. Thank you
        for your interest!
      </p>
      <p className="text-base text-gray-600 mb-10">
        Check out our other upcoming tours or join the waitlist for future
        batches.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate("/tours")}
          className="px-8 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition shadow-lg"
        >
          Explore Other Tours
        </button>
        <button
          onClick={() => navigate("/contact")}
          className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 font-medium rounded-full hover:bg-blue-50 transition shadow-lg"
        >
          Join Waitlist / Contact Us
        </button>
      </div>
    </div>
  );

  const renderDepartureDates = (dates, title) => {
    if (!dates?.length) return null;
    return (
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {dates
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((dep, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm border text-center"
              >
                <p className="text-lg font-bold text-indigo-700">
                  {formatDate(dep.date)}
                </p>
                <p
                  className={`mt-3 text-base font-medium ${dep.status === "Available"
                      ? "text-green-600"
                      : "text-red-600"
                    }`}
                >
                  {dep.status || "Available"}
                </p>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const renderPackageContent = (pkg, pkgKey = "main") => (
    <div className="space-y-12">
      {/* Tour Price */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-5">
          Tour Price (per person)
        </h3>
        <div className="bg-gray-50 p-6 rounded-xl border space-y-4">
          <div className="flex justify-between text-base">
            <span>Double Sharing</span>
            <span className="font-bold text-indigo-700">
              {pkg.price.doubleSharing?.toLocaleString()} INR
            </span>
          </div>
          <div className="flex justify-between text-base">
            <span>Triple Sharing</span>
            <span className="font-bold text-indigo-700">
              {pkg.price.tripleSharing?.toLocaleString()} INR
            </span>
          </div>
          {pkg.price.childWithBerth && (
            <div className="flex justify-between text-base">
              <span>Child with Berth</span>
              <span className="font-bold text-indigo-700">
                {pkg.price.childWithBerth.toLocaleString()} INR
              </span>
            </div>
          )}
          {pkg.price.childWithoutBerth && (
            <div className="flex justify-between text-base">
              <span>Child without Berth</span>
              <span className="font-bold text-indigo-700">
                {pkg.price.childWithoutBerth.toLocaleString()} INR
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Advance Payment */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-5">
          Advance Payment Required
        </h3>
        <div className="bg-gray-50 p-6 rounded-xl border space-y-4">
          <div className="flex justify-between text-base">
            <span>Adult</span>
            <span className="font-bold text-indigo-700">
              {pkg.advanceAmount.adult?.toLocaleString()} INR
            </span>
          </div>
          <div className="flex justify-between text-base">
            <span>Child</span>
            <span className="font-bold text-indigo-700">
              {pkg.advanceAmount.child || 0} INR
            </span>
          </div>
        </div>
      </div>

      {renderDepartureDates(pkg.departureDates, "Departure Dates")}

      {pkg.sightseeing?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-5">
            Sightseeing Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pkg.sightseeing.map((place, i) => (
              <div key={i} className="bg-white p-5 rounded-xl shadow-sm border">
                <p className="text-base">• {place}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {pkg.itinerary?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-5">
            Day-wise Itinerary
          </h3>
          <div className="space-y-3">
            {pkg.itinerary.map((dayDesc, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleItineraryDay(pkgKey, i)}
                  className="w-full text-left bg-gray-50 hover:bg-gray-100 px-6 py-4 flex justify-between items-center transition"
                >
                  <span className="font-semibold text-indigo-700">
                    Day {i + 1}
                  </span>
                  <span
                    className={`text-2xl text-indigo-700 transition-transform duration-300 ${openItinerary[`${pkgKey}-${i}`] ? "rotate-180" : ""
                      }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`transition-all duration-500 overflow-hidden ${openItinerary[`${pkgKey}-${i}`]
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="p-6 bg-white text-gray-700 leading-relaxed whitespace-pre-line">
                    {dayDesc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Train Details */}
      {pkg.trainDetails?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-5">
            Train Journey Details
          </h3>
          <div className="space-y-4">
            {pkg.trainDetails.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
                <p className="font-medium text-gray-800">
                  {t.trainNo} - {t.trainName}
                </p>
                <p className="text-gray-600 mt-2">
                  Route: {t.fromStation} → {t.toStation}
                </p>
                <p className="text-gray-600">Class: {t.class}</p>
                <p className="text-gray-600">
                  Timing: {t.departureTime} → {t.arrivalTime}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flight Details */}
      {pkg.flightDetails?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-5">
            Flight Details
          </h3>
          <div className="space-y-4">
            {pkg.flightDetails.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
                <p className="font-medium text-gray-800">
                  {f.airline} {f.flightNo}
                </p>
                <p className="text-gray-600 mt-2">
                  Route: {f.fromAirport} → {f.toAirport}
                </p>
                <p className="text-gray-600">Class: {f.class}</p>
                <p className="text-gray-600">
                  Timing: {f.departureTime} → {f.arrivalTime}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Boarding & Deboarding */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pkg.boardingPoints?.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-5">
              Boarding Points
            </h3>
            <div className="bg-gray-50 p-6 rounded-xl border">
              <ul className="space-y-3">
                {pkg.boardingPoints.map((bp, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-indigo-700">•</span>
                    <span>
                      {bp.stationName} ({bp.stationCode})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {pkg.deboardingPoints?.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-5">
              Deboarding Points
            </h3>
            <div className="bg-gray-50 p-6 rounded-xl border">
              <ul className="space-y-3">
                {pkg.deboardingPoints.map((dp, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-indigo-700">•</span>
                    <span>
                      {dp.stationName} ({dp.stationCode})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Optional Add-ons */}
      {pkg.addons?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-5">
            Optional Add-ons
          </h3>
          <div className="bg-gray-50 p-6 rounded-xl border space-y-4">
            {pkg.addons.map((addon, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-base py-3 border-b border-gray-200 last:border-0"
              >
                <span className="text-gray-700 font-medium">{addon.name}</span>
                <span className="font-bold text-indigo-700">
                  {addon.amount.toLocaleString()} INR
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Remarks */}
      {pkg.remarks && pkg.remarks.trim() !== "" && (
        <div>
          <h3 className="text-xl font-semibold text-indigo-700 mb-4">
            Important Remarks
          </h3>
          <div className="bg-blue-50 border-l-4 border-indigo-700 p-6 rounded-r-xl">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {pkg.remarks}
            </p>
          </div>
        </div>
      )}

      {/* Includes & Excludes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
        {pkg.includes?.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-green-800 mb-6">
              Package Includes
            </h3>
            <ul className="space-y-4">
              {pkg.includes.map((inc, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-2xl text-green-600 mt-1 flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-gray-700 leading-relaxed">{inc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {pkg.excludes?.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-red-800 mb-6">
              Package Excludes
            </h3>
            <ul className="space-y-4">
              {pkg.excludes.map((exc, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-2xl text-red-600 mt-1 flex-shrink-0">
                    ✗
                  </span>
                  <span className="text-gray-700 leading-relaxed">{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[55vh] sm:h-[65vh] md:h-[70vh] overflow-hidden">
          <img
            src={tour.titleImage}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight">
              {tour.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8">
              {tour.duration.days} Days / {tour.duration.nights} Nights • Batch:{" "}
              {tour.batch}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {canBook ? (
                <button
                  onClick={handleBookNow}
                  disabled={bookingLoading}
                  className={`px-8 py-3 bg-green-500 text-white font-bold rounded-full text-base flex items-center justify-center gap-2 transition shadow-lg max-w-xs mx-auto sm:mx-0 ${bookingLoading
                      ? "opacity-80 cursor-not-allowed"
                      : "hover:bg-green-600 hover:shadow-xl"
                    }`}
                >
                  {bookingLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Book This Tour"
                  )}
                </button>
              ) : (
                <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-xl shadow-2xl animate-pulse">
                  {tour.tripCancelled
                    ? "TRIP CANCELLED"
                    : tour.bookingClosed
                      ? "BOOKING CLOSED"
                      : "SOLD OUT"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Completed Trips Banner with Scroll Animation */}
        {tour.completedTripsCount > 0 && (
          <div className=" py-12 md:py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                id="completed-trips-banner"
                className="text-center opacity-0 translate-y-12 transition-all duration-1000 ease-out"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
                  <span className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl animate-bounce-slow  ">
                    🎉
                  </span>

                  <div className="space-y-4">
                    <p className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                      Successfully Completed{" "}
                      <span className="text-yellow-500 text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-md">
                        {tour.completedTripsCount}
                      </span>{" "}
                      {tour.completedTripsCount === 1 ? "Trip" : "Trips"}
                    </p>
                    <p className="text-lg sm:text-xl md:text-xl text-gray-700 font-medium opacity-90">
                      Trusted by thousands of happy travelers!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sold Out Message + Only Image Gallery (no other details) */}
        {!tour.available ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <SoldOutMessage />

            {tour.galleryImages?.length > 0 && (
              <section className="mt-16 animate-fade-up">
                <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8 text-center">
                  Tour Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {tour.galleryImages.map((img, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition"
                    >
                      <img
                        src={img}
                        alt={`Gallery ${i + 1}`}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            {/* Gallery */}
            {tour.galleryImages?.length > 0 && (
              <section className="animate-on-scroll opacity-0 mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8 text-center">
                  Tour Gallery
                </h2>
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl">
                    {tour.galleryImages.map((img, i) => (
                      <div
                        key={i}
                        className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition"
                      >
                        <img
                          src={img}
                          alt={`Gallery ${i + 1}`}
                          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Route Map */}
            {tour.mapImage && (
              <section className="animate-on-scroll opacity-0 mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8 text-center">
                  Route Map
                </h2>
                <div className="flex justify-center">
                  <img
                    src={tour.mapImage}
                    alt="Route Map"
                    className="w-full max-w-2xl rounded-2xl shadow-lg"
                  />
                </div>
              </section>
            )}

            {/* Main Package */}
            <section className="animate-on-scroll opacity-0 mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8">
                Main Tour Package
              </h2>
              {tour.destination?.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Journey Route
                  </h3>
                  <p className="text-lg bg-white p-6 rounded-xl shadow-sm border text-center">
                    {tour.destination.join(" → ")}
                  </p>
                </div>
              )}
              {renderPackageContent(tour, "main")}
            </section>

            {/* Variant Packages */}
            {tour.variantPackage?.length > 0 && (
              <section className="animate-on-scroll opacity-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8">
                  Variant Packages
                </h2>
                {tour.variantPackage.map((variant, i) => (
                  <div key={i} className="mb-10">
                    <button
                      onClick={() => toggleVariant(i)}
                      className="w-full text-left bg-indigo-50 hover:bg-indigo-100 px-6 py-5 rounded-xl flex justify-between items-center mb-4 transition"
                    >
                      <span className="text-lg font-semibold text-indigo-800">
                        Variant Package {i + 1}
                      </span>
                      <span
                        className={`text-2xl transition-transform ${openVariants[i] ? "rotate-180" : ""
                          }`}
                      >
                        ▼
                      </span>
                    </button>
                    {openVariants[i] && (
                      <div className="bg-white rounded-xl shadow-sm border p-6">
                        {renderPackageContent(variant, `variant-${i}`)}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Final CTA */}
            <section className="text-center py-16 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-3xl shadow-xl animate-on-scroll opacity-0">
              <h2 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-6">
                Ready to Explore?
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                {tour.tripCancelled
                  ? "This trip has been cancelled. Check out our other available tours!"
                  : tour.bookingClosed
                    ? "Bookings for this tour are currently closed. Check out our other available tours!"
                    : tour.available
                      ? "Secure your seat today for an unforgettable journey!"
                      : "This tour is currently sold out. Check out our other available tours!"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {canBook ? (
                  <button
                    onClick={handleBookNow}
                    disabled={bookingLoading}
                    className={`px-10 py-4 bg-green-500 text-white font-bold rounded-full text-lg flex items-center justify-center gap-3 transition shadow-xl max-w-sm mx-auto ${bookingLoading
                        ? "opacity-80 cursor-not-allowed"
                        : "hover:bg-green-600 hover:scale-105"
                      }`}
                  >
                    {bookingLoading ? (
                      <>
                        <svg
                          className="animate-spin h-6 w-6 text-white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Book Now"
                    )}
                  </button>
                ) : (
                  <div className="bg-red-600 text-white px-8 py-3 rounded-full font-bold text-xl shadow-2xl">
                    {tour.tripCancelled
                      ? "TRIP CANCELLED"
                      : tour.bookingClosed
                        ? "BOOKING CLOSED"
                        : "SOLD OUT"}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </div>

      <style>{`
        .animate-fade-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s ease, transform 1s ease;
        }

        #completed-trips-banner {
          opacity: 0;
          transform: translateY(48px);
          transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        #completed-trips-banner.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default TourDetails;

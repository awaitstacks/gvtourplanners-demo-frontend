// // src/components/Tnr.jsx
// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { TourAppContext } from "../context/TourAppContext";
// import {
//   Loader2,
//   AlertCircle,
//   CheckCircle2,
//   Bus,
//   Users,
//   CreditCard,
//   Calendar,
//   Phone,
//   ArrowLeftCircle,
//   Clock3,
//   XCircle,
//   Train,
//   Plane,
// } from "lucide-react";

// const Tnr = () => {
//   const { getBookingDetailsByTNR, getSeatAllocationByTNR } =
//     useContext(TourAppContext);
//   const navigate = useNavigate();

//   const [tnr, setTnr] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [booking, setBooking] = useState(null);
//   const [seatData, setSeatData] = useState(null);
//   const [showInput, setShowInput] = useState(true);

//   useEffect(() => {
//     if (showInput) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   }, [showInput]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setBooking(null);
//     setSeatData(null);

//     const upperTnr = tnr.trim().toUpperCase();

//     if (!upperTnr || upperTnr.length !== 6 || !/^[A-Z0-9]{6}$/.test(upperTnr)) {
//       setError("Please enter a valid 6-digit TNR (letters & numbers)");
//       return;
//     }

//     setLoading(true);

//     try {
//       const [bookingRes, seatRes] = await Promise.all([
//         getBookingDetailsByTNR(upperTnr),
//         getSeatAllocationByTNR(upperTnr),
//       ]);

//       if (bookingRes.success) {
//         setBooking(bookingRes.booking);
//         setShowInput(false);
//       } else {
//         setError(bookingRes.message || "Failed to fetch booking details");
//       }

//       if (seatRes.success) {
//         setSeatData(seatRes.data);
//       }
//     } catch (err) {
//       setError("Failed to load details. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetAndSearchAgain = () => {
//     setTnr("");
//     setError("");
//     setBooking(null);
//     setSeatData(null);
//     setShowInput(true);
//   };

//   const handleSelectSeat = () => {
//     if (booking?.tnr) {
//       navigate(`/seat-allocation/${booking.tnr}`);
//       setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
//     }
//   };

//   // Helper – get vehicle name from seat number (fallback only)
//   const getVehicleNameForSeat = (seatNumber) => {
//     if (!seatData?.vehicles || !seatNumber) return "";

//     for (const vehicle of seatData.vehicles) {
//       if (vehicle.leaderRow?.includes(seatNumber)) {
//         return vehicle.vehicleName || "";
//       }
//       for (const row of vehicle.passengerRows || []) {
//         if (row.includes(seatNumber)) {
//           return vehicle.vehicleName || "";
//         }
//       }
//     }
//     return "";
//   };

//   const getStatusBadge = () => {
//     const cancelled = booking?.cancelled || {};

//     if (cancelled.byTraveller && !cancelled.byAdmin) {
//       return {
//         text: "Cancellation Request in Process",
//         color: "bg-yellow-100 text-yellow-800 border-yellow-300",
//         icon: <Clock3 size={20} />,
//         isActionable: true,
//       };
//     }
//     if (cancelled.byTraveller && cancelled.byAdmin) {
//       return {
//         text: "Cancelled by Traveller",
//         color: "bg-red-100 text-red-800 border-red-300",
//         icon: <XCircle size={20} />,
//         isActionable: false,
//       };
//     }
//     if (cancelled.byAdmin && !cancelled.byTraveller) {
//       return {
//         text: "Booking Rejected by Admin",
//         color: "bg-red-100 text-red-800 border-red-300",
//         icon: <XCircle size={20} />,
//         isActionable: false,
//       };
//     }

//     return {
//       text: booking?.isBookingCompleted
//         ? "Booking Completed"
//         : "Active Booking",
//       color: booking?.isBookingCompleted
//         ? "bg-green-100 text-green-800 border-green-300"
//         : "bg-amber-100 text-amber-800 border-amber-300",
//       icon: booking?.isBookingCompleted ? <CheckCircle2 size={20} /> : null,
//       isActionable: true,
//     };
//   };

//   const status = getStatusBadge();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-teal-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
//       <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
//         <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full blur-3xl animate-pulse-slow"></div>
//         <div className="absolute bottom-10 right-5 w-64 h-64 bg-gradient-to-tl from-teal-300 to-indigo-300 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
//       </div>

//       <div className="max-w-5xl mx-auto relative z-10">
//         {showInput && (
//           <>
//             <div className="text-center mb-10 sm:mb-12">
//               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-900 mb-3 tracking-tight">
//                 Booking Details by TNR
//               </h1>
//               <p className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto px-2">
//                 Enter your 6-digit booking reference to view details and select
//                 seats.
//               </p>
//             </div>

//             <form
//               onSubmit={handleSubmit}
//               className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-6 sm:p-8 border border-indigo-100/50"
//             >
//               <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
//                 <input
//                   type="text"
//                   value={tnr}
//                   onChange={(e) => setTnr(e.target.value.toUpperCase())}
//                   placeholder="Enter 6-digit TNR"
//                   maxLength={6}
//                   className="w-full sm:w-80 px-6 py-4 border border-gray-300 rounded-xl text-center text-xl uppercase tracking-widest focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
//                 />
//                 <button
//                   type="submit"
//                   disabled={loading || tnr.length !== 6}
//                   className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-3 text-lg"
//                 >
//                   {loading ? (
//                     <Loader2 className="animate-spin" size={22} />
//                   ) : (
//                     "View Details"
//                   )}
//                 </button>
//               </div>

//               {error && (
//                 <div className="mt-6 flex items-center justify-center gap-3 text-red-700 bg-red-50 p-4 rounded-2xl border border-red-200">
//                   <AlertCircle size={24} />
//                   <p className="font-medium">{error}</p>
//                 </div>
//               )}
//             </form>
//           </>
//         )}

//         {booking && (
//           <div className="space-y-8 animate-fade-in">
//             <div className="text-center">
//               <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900">
//                 TNR: <span className="text-indigo-700">{booking.tnr}</span>
//               </h2>
//             </div>

//             <div className="flex justify-center">
//               <div
//                 className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border text-base sm:text-lg font-semibold ${status.color}`}
//               >
//                 {status.icon}
//                 {status.text}
//               </div>
//             </div>

//             {/* Main Booking Info */}
//             <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                     {booking?.tourData?.title || "Tour Name Not Available"}
//                   </h3>
//                   <p className="text-gray-600">
//                     Booked on{" "}
//                     {new Date(booking.bookingDate).toLocaleDateString("en-IN", {
//                       day: "numeric",
//                       month: "long",
//                       year: "numeric",
//                     })}
//                   </p>
//                 </div>
//                 <div className="flex flex-col items-start lg:items-end">
//                   <span className="text-sm text-gray-600">
//                     Type: <strong>{booking.bookingType?.toUpperCase()}</strong>
//                   </span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//                 <InfoItem
//                   icon={<Calendar />}
//                   label="Booking Date"
//                   value={new Date(booking.bookingDate).toLocaleDateString(
//                     "en-IN",
//                   )}
//                 />
//                 <InfoItem
//                   icon={<Users />}
//                   label="Travellers"
//                   value={booking.travellers?.length || 0}
//                 />
//                 <InfoItem
//                   icon={<CreditCard />}
//                   label="Advance Payment"
//                   value={
//                     <>
//                       <span className="font-bold text-lg">
//                         ₹
//                         {(booking.payment?.advance?.amount || 0).toLocaleString(
//                           "en-IN",
//                         )}
//                       </span>
//                       <span
//                         className={`ml-3 text-sm font-medium ${
//                           booking.payment?.advance?.paid
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }`}
//                       >
//                         {booking.payment?.advance?.paid ? "✓ Paid" : "Pending"}
//                       </span>
//                     </>
//                   }
//                 />
//                 <InfoItem
//                   icon={<CreditCard />}
//                   label="Balance Payment"
//                   value={
//                     <>
//                       <span className="font-bold text-lg">
//                         ₹
//                         {(booking.payment?.balance?.amount || 0).toLocaleString(
//                           "en-IN",
//                         )}
//                       </span>
//                       <span
//                         className={`ml-3 text-sm font-medium ${
//                           booking.payment?.balance?.paid
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }`}
//                       >
//                         {booking.payment?.balance?.paid ? "✓ Paid" : "Pending"}
//                       </span>
//                     </>
//                   }
//                 />
//                 <InfoItem
//                   icon={<CheckCircle2 />}
//                   label="Terms"
//                   value={booking.termsAgreed ? "Agreed" : "Not Agreed"}
//                 />
//                 {booking.contact?.mobile && (
//                   <InfoItem
//                     icon={<Phone />}
//                     label="Mobile"
//                     value={booking.contact.mobile}
//                   />
//                 )}
//                 {booking.emergencyContact && (
//                   <InfoItem
//                     icon={<Phone />}
//                     label="Emergency Contact"
//                     value={booking.emergencyContact}
//                   />
//                 )}
//               </div>
//             </div>

//             {/* Travellers List */}
//             {booking.travellers?.length > 0 && (
//               <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//                   <Users size={28} className="text-indigo-600" />
//                   Travellers ({booking.travellers.length})
//                 </h3>

//                 <div className="space-y-6">
//                   {booking.travellers.map((t, idx) => {
//                     const isCancelled =
//                       t.cancelled?.byAdmin ||
//                       t.cancelled?.byTraveller ||
//                       booking.cancelled?.byAdmin ||
//                       booking.cancelled?.byTraveller;

//                     const isRejected =
//                       t.cancelled?.byAdmin || booking.cancelled?.byAdmin;

//                     const vehicleName =
//                       t.vehicleName ||
//                       (t.seatNumber ? getVehicleNameForSeat(t.seatNumber) : "");

//                     const hasTrainSeats = t.trainSeats?.length > 0;
//                     const hasFlightSeats = t.flightSeats?.length > 0;

//                     return (
//                       <div
//                         key={idx}
//                         className={`p-5 sm:p-6 rounded-2xl border transition-all ${
//                           isCancelled
//                             ? "bg-red-50/70 border-red-200"
//                             : "bg-gray-50 border-gray-200 hover:border-indigo-200"
//                         }`}
//                       >
//                         <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
//                           <div className="flex-1">
//                             {isCancelled && (
//                               <div
//                                 className={`mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase ${
//                                   isRejected
//                                     ? "bg-red-100 text-red-800 border-red-200"
//                                     : "bg-yellow-100 text-yellow-800 border-yellow-200"
//                                 }`}
//                               >
//                                 {isRejected ? (
//                                   <XCircle size={14} />
//                                 ) : (
//                                   <Clock3 size={14} />
//                                 )}
//                                 {isRejected
//                                   ? "Rejected / Cancelled"
//                                   : "Cancellation Pending"}
//                               </div>
//                             )}

//                             <p
//                               className={`text-xl font-semibold ${isRejected ? "text-red-900" : "text-gray-900"}`}
//                             >
//                               {t.title} {t.firstName} {t.lastName}
//                             </p>

//                             <div
//                               className={`mt-2 space-y-1.5 text-sm sm:text-base ${
//                                 isRejected ? "text-red-700/70" : "text-gray-600"
//                               }`}
//                             >
//                               <p>
//                                 Age: {t.age} • {t.gender}
//                               </p>
//                               <p>
//                                 Sharing: {t.sharingType} • Package:{" "}
//                                 {t.packageType}
//                               </p>

//                               {(t.boardingPoint?.stationName ||
//                                 t.deboardingPoint?.stationName) && (
//                                 <div className="mt-2 pt-2 border-t border-gray-200">
//                                   {t.boardingPoint?.stationName && (
//                                     <p>
//                                       <span className="font-medium text-indigo-700">
//                                         Boarding:
//                                       </span>{" "}
//                                       {t.boardingPoint.stationName}
//                                       {t.boardingPoint.stationCode &&
//                                         ` (${t.boardingPoint.stationCode})`}
//                                     </p>
//                                   )}
//                                   {t.deboardingPoint?.stationName && (
//                                     <p>
//                                       <span className="font-medium text-indigo-700">
//                                         Deboarding:
//                                       </span>{" "}
//                                       {t.deboardingPoint.stationName}
//                                       {t.deboardingPoint.stationCode &&
//                                         ` (${t.deboardingPoint.stationCode})`}
//                                     </p>
//                                   )}
//                                 </div>
//                               )}

//                               {t.selectedAddon?.name && (
//                                 <p className="mt-1 pt-1 border-t border-gray-200">
//                                   <span className="font-medium text-teal-700">
//                                     Addon:
//                                   </span>{" "}
//                                   {t.selectedAddon.name}{" "}
//                                   <span className="text-green-700 font-medium">
//                                     +₹
//                                     {(
//                                       t.selectedAddon.price || 0
//                                     ).toLocaleString("en-IN")}
//                                   </span>
//                                 </p>
//                               )}

//                               {/* ─── Train & Flight Seats ──────────────────────────────── */}
//                               {(hasTrainSeats || hasFlightSeats) && (
//                                 <div className="mt-2 pt-2 border-t border-gray-200 space-y-1.5">
//                                   {hasTrainSeats && (
//                                     <div className="flex items-start gap-2">
//                                       <Train
//                                         size={16}
//                                         className="text-amber-700 mt-0.5 flex-shrink-0"
//                                       />
//                                       <div>
//                                         <span className="font-medium text-amber-800">
//                                           Train Seat(s):
//                                         </span>
//                                         <div className="text-gray-700">
//                                           {t.trainSeats.map((s, i) => (
//                                             <div key={i}>
//                                               {s.trainName
//                                                 ? `${s.trainName} → `
//                                                 : ""}
//                                               <strong>{s.seatNo}</strong>
//                                             </div>
//                                           ))}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   )}

//                                   {hasFlightSeats && (
//                                     <div className="flex items-start gap-2">
//                                       <Plane
//                                         size={16}
//                                         className="text-blue-700 mt-0.5 flex-shrink-0"
//                                       />
//                                       <div>
//                                         <span className="font-medium text-blue-800">
//                                           Flight Seat(s):
//                                         </span>
//                                         <div className="text-gray-700">
//                                           {t.flightSeats.map((s, i) => (
//                                             <div key={i}>
//                                               {s.flightName
//                                                 ? `${s.flightName} → `
//                                                 : ""}
//                                               <strong>{s.seatNo}</strong>
//                                             </div>
//                                           ))}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   )}
//                                 </div>
//                               )}
//                               {/* ─────────────────────────────────────────────────────────── */}

//                               {t.seatNumber && (
//                                 <p
//                                   className={`font-medium pt-1 ${isRejected ? "line-through text-red-400" : "text-indigo-700"}`}
//                                 >
//                                   Seat: {t.seatNumber}
//                                   {vehicleName && ` - ${vehicleName}`}
//                                   {t.seatLocked && " (Locked)"}
//                                 </p>
//                               )}
//                             </div>

//                             {t.cancelled?.reason && (
//                               <p className="mt-3 text-xs italic text-red-600">
//                                 Reason: {t.cancelled.reason}
//                               </p>
//                             )}
//                           </div>

//                           {t.seatNumber && !isRejected && (
//                             <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
//                               Seat {t.seatNumber}
//                               {vehicleName && ` - ${vehicleName}`}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
//               {status.isActionable && (
//                 <button
//                   onClick={handleSelectSeat}
//                   className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-lg font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-800 shadow-lg transform hover:-translate-y-1 transition-all min-w-[220px]"
//                 >
//                   <Bus size={20} />
//                   Select Seats
//                 </button>
//               )}

//               <button
//                 onClick={resetAndSearchAgain}
//                 className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-200 text-gray-800 text-lg font-semibold rounded-xl hover:bg-gray-300 transition-all shadow-md min-w-[220px]"
//               >
//                 <ArrowLeftCircle size={20} />
//                 Search Another TNR
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fadeIn 0.7s ease-out forwards;
//         }
//         @keyframes pulse-slow {
//           0%,
//           100% {
//             transform: scale(1);
//             opacity: 0.3;
//           }
//           50% {
//             transform: scale(1.1);
//             opacity: 0.5;
//           }
//         }
//         .animate-pulse-slow {
//           animation: pulse-slow 14s infinite ease-in-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// const InfoItem = ({ icon, label, value }) => (
//   <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-200">
//     <div className="text-indigo-600 mt-1 flex-shrink-0">{icon}</div>
//     <div className="flex-1 min-w-0">
//       <p className="text-xs text-gray-600 mb-1">{label}</p>
//       <div className="text-lg font-semibold text-gray-900 break-words">
//         {value || "—"}
//       </div>
//     </div>
//   </div>
// );

// export default Tnr;


// src/components/Tnr.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Bus,
  Users,
  CreditCard,
  Calendar,
  Phone,
  ArrowLeftCircle,
  Clock3,
  XCircle,
  Train,
  Plane,
} from "lucide-react";

const Tnr = () => {
  const { getBookingDetailsByTNR, getSeatAllocationByTNR } =
    useContext(TourAppContext);
  const navigate = useNavigate();

  const [tnr, setTnr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);
  const [seatData, setSeatData] = useState(null);
  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    if (showInput) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showInput]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBooking(null);
    setSeatData(null);

    const upperTnr = tnr.trim().toUpperCase();

    if (!upperTnr || upperTnr.length !== 6 || !/^[A-Z0-9]{6}$/.test(upperTnr)) {
      setError("Please enter a valid 6-digit TNR (letters & numbers)");
      return;
    }

    setLoading(true);

    try {
      const [bookingRes, seatRes] = await Promise.all([
        getBookingDetailsByTNR(upperTnr),
        getSeatAllocationByTNR(upperTnr),
      ]);

      if (bookingRes.success) {
        setBooking(bookingRes.booking);
        setShowInput(false);
      } else {
        setError(bookingRes.message || "Failed to fetch booking details");
      }

      if (seatRes.success) {
        setSeatData(seatRes.data);
      }
    } catch (err) {
      setError("Failed to load details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAndSearchAgain = () => {
    setTnr("");
    setError("");
    setBooking(null);
    setSeatData(null);
    setShowInput(true);
  };

  const handleSelectSeat = () => {
    if (booking?.tnr) {
      navigate(`/seat-allocation/${booking.tnr}`);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  // Helper – get vehicle name from seat number (fallback only)
  const getVehicleNameForSeat = (seatNumber) => {
    if (!seatData?.vehicles || !seatNumber) return "";

    for (const vehicle of seatData.vehicles) {
      if (vehicle.leaderRow?.includes(seatNumber)) {
        return vehicle.vehicleName || "";
      }
      for (const row of vehicle.passengerRows || []) {
        if (row.includes(seatNumber)) {
          return vehicle.vehicleName || "";
        }
      }
    }
    return "";
  };

  const getStatusBadge = () => {
    const cancelled = booking?.cancelled || {};

    if (cancelled.byTraveller && !cancelled.byAdmin) {
      return {
        text: "Cancellation Request in Process",
        color: "bg-yellow-100 text-yellow-800 border-yellow-300",
        icon: <Clock3 size={20} />,
        isActionable: true,
      };
    }
    if (cancelled.byTraveller && cancelled.byAdmin) {
      return {
        text: "Cancelled by Traveller",
        color: "bg-red-100 text-red-800 border-red-300",
        icon: <XCircle size={20} />,
        isActionable: false,
      };
    }
    if (cancelled.byAdmin && !cancelled.byTraveller) {
      return {
        text: "Booking Rejected by Admin",
        color: "bg-red-100 text-red-800 border-red-300",
        icon: <XCircle size={20} />,
        isActionable: false,
      };
    }

    return {
      text: booking?.isBookingCompleted
        ? "Booking Completed"
        : "Active Booking",
      color: booking?.isBookingCompleted
        ? "bg-green-100 text-green-800 border-green-300"
        : "bg-amber-100 text-amber-800 border-amber-300",
      icon: booking?.isBookingCompleted ? <CheckCircle2 size={20} /> : null,
      isActionable: true,
    };
  };

  const status = getStatusBadge();

  // ── Addon display resolver — shared by every traveller card below ──
  // NEW bookings: t.selectedAddons is an array, each entry EITHER
  // train-wise (trainNo/trainName) OR flight-wise (flightNo/airline).
  // OLD bookings: t.selectedAddon is a flat single object — kept
  // working exactly as before.
  const renderTravellerAddons = (t) => {
    if (Array.isArray(t.selectedAddons) && t.selectedAddons.length > 0) {
      const getTripTypeStyle = (tripType) => {
        const tt = (tripType || "").toUpperCase();
        if (tt.startsWith("BOARD"))
          return { badge: "bg-blue-100 text-blue-700", label: "Boarding" };
        if (tt.startsWith("MIDDLE"))
          return { badge: "bg-purple-100 text-purple-700", label: "Middle" };
        if (tt.startsWith("DEBOARD") || tt.startsWith("DEBOARF"))
          return { badge: "bg-orange-100 text-orange-700", label: "Deboarding" };
        return { badge: "bg-gray-100 text-gray-700", label: tripType || "Trip" };
      };

      // Classify by which identifying fields are ACTUALLY present — not
      // by tripKind/flightIndex alone, since those can be missing on
      // entries saved from admin-edit flows or older data.
      const isFlightAddon = (a) => {
        if (a.flightNo || a.airline) return true;
        if (a.trainNo || a.trainName) return false;
        return (
          (a.flightIndex !== undefined && a.flightIndex !== null) ||
          a.tripKind === "flight"
        );
      };

      const buildLabel = (a, isFlight) => {
        const primary = isFlight ? a.airline : a.trainName;
        const secondary = isFlight ? a.flightNo : a.trainNo;
        if (!primary && !secondary) return null;
        if (primary && secondary) return `${primary} (${secondary})`;
        return primary || secondary;
      };

      const trainEntries = t.selectedAddons.filter((a) => !isFlightAddon(a));
      const flightEntries = t.selectedAddons.filter((a) => isFlightAddon(a));

      const renderRow = (a, idx) => {
        const isFlight = isFlightAddon(a);
        const style = getTripTypeStyle(a.tripType);
        const label = buildLabel(a, isFlight);
        return (
          <div key={idx} className="flex flex-wrap items-center gap-1.5 mt-1">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${style.badge}`}
            >
              {style.label}
            </span>
            <span className="text-gray-700">
              {label ? `${label}: ` : ""}
              {a.name}
            </span>
            <span className="text-green-700 font-medium">
              +₹{(a.amount || 0).toLocaleString("en-IN")}
            </span>
          </div>
        );
      };

      return (
        <div className="mt-2 pt-2 border-t border-gray-200 space-y-2">
          {trainEntries.length > 0 && (
            <div>
              <p className="font-medium text-amber-800 flex items-center gap-1.5">
                <Train size={14} /> Train Addons
              </p>
              {trainEntries.map((a, idx) => renderRow(a, idx))}
            </div>
          )}
          {flightEntries.length > 0 && (
            <div>
              <p className="font-medium text-blue-800 flex items-center gap-1.5">
                <Plane size={14} /> Flight Addons
              </p>
              {flightEntries.map((a, idx) => renderRow(a, idx))}
            </div>
          )}
        </div>
      );
    }

    // ── OLD flat addon (unchanged) ──
    return (
      t.selectedAddon?.name && (
        <p className="mt-1 pt-1 border-t border-gray-200">
          <span className="font-medium text-teal-700">Addon:</span>{" "}
          {t.selectedAddon.name}{" "}
          <span className="text-green-700 font-medium">
            +₹{(t.selectedAddon.price || 0).toLocaleString("en-IN")}
          </span>
        </p>
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-teal-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-5 w-64 h-64 bg-gradient-to-tl from-teal-300 to-indigo-300 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {showInput && (
          <>
            <div className="text-center mb-10 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-900 mb-3 tracking-tight">
                Booking Details by TNR
              </h1>
              <p className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto px-2">
                Enter your 6-digit booking reference to view details and select
                seats.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-6 sm:p-8 border border-indigo-100/50"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <input
                  type="text"
                  value={tnr}
                  onChange={(e) => setTnr(e.target.value.toUpperCase())}
                  placeholder="Enter 6-digit TNR"
                  maxLength={6}
                  className="w-full sm:w-80 px-6 py-4 border border-gray-300 rounded-xl text-center text-xl uppercase tracking-widest focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                />
                <button
                  type="submit"
                  disabled={loading || tnr.length !== 6}
                  className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-3 text-lg"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={22} />
                  ) : (
                    "View Details"
                  )}
                </button>
              </div>

              {error && (
                <div className="mt-6 flex items-center justify-center gap-3 text-red-700 bg-red-50 p-4 rounded-2xl border border-red-200">
                  <AlertCircle size={24} />
                  <p className="font-medium">{error}</p>
                </div>
              )}
            </form>
          </>
        )}

        {booking && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900">
                TNR: <span className="text-indigo-700">{booking.tnr}</span>
              </h2>
            </div>

            <div className="flex justify-center">
              <div
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border text-base sm:text-lg font-semibold ${status.color}`}
              >
                {status.icon}
                {status.text}
              </div>
            </div>

            {/* Main Booking Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {booking?.tourData?.title || "Tour Name Not Available"}
                  </h3>
                  <p className="text-gray-600">
                    Booked on{" "}
                    {new Date(booking.bookingDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-col items-start lg:items-end">
                  <span className="text-sm text-gray-600">
                    Type: <strong>{booking.bookingType?.toUpperCase()}</strong>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <InfoItem
                  icon={<Calendar />}
                  label="Booking Date"
                  value={new Date(booking.bookingDate).toLocaleDateString(
                    "en-IN",
                  )}
                />
                <InfoItem
                  icon={<Users />}
                  label="Travellers"
                  value={booking.travellers?.length || 0}
                />
                <InfoItem
                  icon={<CreditCard />}
                  label="Advance Payment"
                  value={
                    <>
                      <span className="font-bold text-lg">
                        ₹
                        {(booking.payment?.advance?.amount || 0).toLocaleString(
                          "en-IN",
                        )}
                      </span>
                      <span
                        className={`ml-3 text-sm font-medium ${
                          booking.payment?.advance?.paid
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {booking.payment?.advance?.paid ? "✓ Paid" : "Pending"}
                      </span>
                    </>
                  }
                />
                <InfoItem
                  icon={<CreditCard />}
                  label="Balance Payment"
                  value={
                    <>
                      <span className="font-bold text-lg">
                        ₹
                        {(booking.payment?.balance?.amount || 0).toLocaleString(
                          "en-IN",
                        )}
                      </span>
                      <span
                        className={`ml-3 text-sm font-medium ${
                          booking.payment?.balance?.paid
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {booking.payment?.balance?.paid ? "✓ Paid" : "Pending"}
                      </span>
                    </>
                  }
                />
                <InfoItem
                  icon={<CheckCircle2 />}
                  label="Terms"
                  value={booking.termsAgreed ? "Agreed" : "Not Agreed"}
                />
                {booking.contact?.mobile && (
                  <InfoItem
                    icon={<Phone />}
                    label="Mobile"
                    value={booking.contact.mobile}
                  />
                )}
                {booking.emergencyContact && (
                  <InfoItem
                    icon={<Phone />}
                    label="Emergency Contact"
                    value={booking.emergencyContact}
                  />
                )}
              </div>
            </div>

            {/* Travellers List */}
            {booking.travellers?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Users size={28} className="text-indigo-600" />
                  Travellers ({booking.travellers.length})
                </h3>

                <div className="space-y-6">
                  {booking.travellers.map((t, idx) => {
                    const isCancelled =
                      t.cancelled?.byAdmin ||
                      t.cancelled?.byTraveller ||
                      booking.cancelled?.byAdmin ||
                      booking.cancelled?.byTraveller;

                    const isRejected =
                      t.cancelled?.byAdmin || booking.cancelled?.byAdmin;

                    const vehicleName =
                      t.vehicleName ||
                      (t.seatNumber ? getVehicleNameForSeat(t.seatNumber) : "");

                    const hasTrainSeats = t.trainSeats?.length > 0;
                    const hasFlightSeats = t.flightSeats?.length > 0;

                    return (
                      <div
                        key={idx}
                        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                          isCancelled
                            ? "bg-red-50/70 border-red-200"
                            : "bg-gray-50 border-gray-200 hover:border-indigo-200"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                          <div className="flex-1">
                            {isCancelled && (
                              <div
                                className={`mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                                  isRejected
                                    ? "bg-red-100 text-red-800 border-red-200"
                                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                }`}
                              >
                                {isRejected ? (
                                  <XCircle size={14} />
                                ) : (
                                  <Clock3 size={14} />
                                )}
                                {isRejected
                                  ? "Rejected / Cancelled"
                                  : "Cancellation Pending"}
                              </div>
                            )}

                            <p
                              className={`text-xl font-semibold ${isRejected ? "text-red-900" : "text-gray-900"}`}
                            >
                              {t.title} {t.firstName} {t.lastName}
                            </p>

                            <div
                              className={`mt-2 space-y-1.5 text-sm sm:text-base ${
                                isRejected ? "text-red-700/70" : "text-gray-600"
                              }`}
                            >
                              <p>
                                Age: {t.age} • {t.gender}
                              </p>
                              <p>
                                Sharing: {t.sharingType} • Package:{" "}
                                {t.packageType}
                              </p>

                              {(t.boardingPoint?.stationName ||
                                t.deboardingPoint?.stationName) && (
                                <div className="mt-2 pt-2 border-t border-gray-200">
                                  {t.boardingPoint?.stationName && (
                                    <p>
                                      <span className="font-medium text-indigo-700">
                                        Boarding:
                                      </span>{" "}
                                      {t.boardingPoint.stationName}
                                      {t.boardingPoint.stationCode &&
                                        ` (${t.boardingPoint.stationCode})`}
                                    </p>
                                  )}
                                  {t.deboardingPoint?.stationName && (
                                    <p>
                                      <span className="font-medium text-indigo-700">
                                        Deboarding:
                                      </span>{" "}
                                      {t.deboardingPoint.stationName}
                                      {t.deboardingPoint.stationCode &&
                                        ` (${t.deboardingPoint.stationCode})`}
                                    </p>
                                  )}
                                </div>
                              )}

                              {renderTravellerAddons(t)}

                              {/* ─── Train & Flight Seats ──────────────────────────────── */}
                              {(hasTrainSeats || hasFlightSeats) && (
                                <div className="mt-2 pt-2 border-t border-gray-200 space-y-1.5">
                                  {hasTrainSeats && (
                                    <div className="flex items-start gap-2">
                                      <Train
                                        size={16}
                                        className="text-amber-700 mt-0.5 flex-shrink-0"
                                      />
                                      <div>
                                        <span className="font-medium text-amber-800">
                                          Train Seat(s):
                                        </span>
                                        <div className="text-gray-700">
                                          {t.trainSeats.map((s, i) => (
                                            <div key={i}>
                                              {s.trainName
                                                ? `${s.trainName} → `
                                                : ""}
                                              <strong>{s.seatNo}</strong>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {hasFlightSeats && (
                                    <div className="flex items-start gap-2">
                                      <Plane
                                        size={16}
                                        className="text-blue-700 mt-0.5 flex-shrink-0"
                                      />
                                      <div>
                                        <span className="font-medium text-blue-800">
                                          Flight Seat(s):
                                        </span>
                                        <div className="text-gray-700">
                                          {t.flightSeats.map((s, i) => (
                                            <div key={i}>
                                              {s.flightName
                                                ? `${s.flightName} → `
                                                : ""}
                                              <strong>{s.seatNo}</strong>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              {/* ─────────────────────────────────────────────────────────── */}

                              {t.seatNumber && (
                                <p
                                  className={`font-medium pt-1 ${isRejected ? "line-through text-red-400" : "text-indigo-700"}`}
                                >
                                  Seat: {t.seatNumber}
                                  {vehicleName && ` - ${vehicleName}`}
                                  {t.seatLocked && " (Locked)"}
                                </p>
                              )}
                            </div>

                            {t.cancelled?.reason && (
                              <p className="mt-3 text-xs italic text-red-600">
                                Reason: {t.cancelled.reason}
                              </p>
                            )}
                          </div>

                          {t.seatNumber && !isRejected && (
                            <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                              Seat {t.seatNumber}
                              {vehicleName && ` - ${vehicleName}`}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              {status.isActionable && (
                <button
                  onClick={handleSelectSeat}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-lg font-semibold rounded-xl hover:from-indigo-700 hover:to-indigo-800 shadow-lg transform hover:-translate-y-1 transition-all min-w-[220px]"
                >
                  <Bus size={20} />
                  Select Seats
                </button>
              )}

              <button
                onClick={resetAndSearchAgain}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-200 text-gray-800 text-lg font-semibold rounded-xl hover:bg-gray-300 transition-all shadow-md min-w-[220px]"
              >
                <ArrowLeftCircle size={20} />
                Search Another TNR
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.7s ease-out forwards;
        }
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 14s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-200">
    <div className="text-indigo-600 mt-1 flex-shrink-0">{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-600 mb-1">{label}</p>
      <div className="text-lg font-semibold text-gray-900 break-words">
        {value || "—"}
      </div>
    </div>
  </div>
);

export default Tnr;

// /* eslint-disable no-unused-vars */
// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { TourAppContext } from "../context/TourAppContext.jsx";
// import axios from "axios";
// import { toast } from "react-toastify";

// const TourBooking = () => {
//   const { tourId } = useParams();
//   const { tours, currencySymbol, backendUrl, token, userData } =
//     useContext(TourAppContext);

//   const [tourInfo, setTourInfo] = useState(null);
//   const [bookingType, setBookingType] = useState("offline");

//   const [transportPoints, setTransportPoints] = useState({
//     boarding: [],
//     deboarding: [],
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [travellers, setTravellers] = useState([
//     {
//       title: "Mr",
//       firstName: "",
//       lastName: "",
//       age: "",
//       gender: "Male",
//       sharingType: "double",
//       selectedAddon: null,
//       boardingPoint: null,
//       deboardingPoint: null,
//       remarks: "",
//       packageType: "main",
//       variantPackageIndex: null,
//     },
//   ]);

//   const [amounts, setAmounts] = useState({
//     advance: 0,
//     balance: 0,
//     addonsTotal: 0,
//   });

//   const [contact, setContact] = useState({
//     email: userData?.email || "",
//     mobile: userData?.mobile || "",
//   });

//   const [billingAddress, setBillingAddress] = useState({
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "India",
//   });

//   const navigate = useNavigate();
//   const location = useLocation();

//   const STORAGE_KEY = `booking-draft-${tourId}`;

//   // Restore saved draft on mount (after login redirect)
//   useEffect(() => {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     if (saved) {
//       try {
//         const draft = JSON.parse(saved);

//         if (draft.travellers?.length > 0) {
//           setTravellers(draft.travellers);
//         }
//         if (draft.contact?.email || draft.contact?.mobile) {
//           setContact(draft.contact);
//         }
//         if (draft.billingAddress?.city || draft.billingAddress?.pincode) {
//           setBillingAddress(draft.billingAddress);
//         }
//         if (draft.bookingType) {
//           setBookingType(draft.bookingType);
//         }

//         // Show toast only if something meaningful was restored
//         if (
//           draft.travellers?.length > 0 ||
//           draft.contact?.email ||
//           draft.billingAddress?.addressLine1
//         ) {
//           toast.info("We restored your previous booking details 😊", {
//             autoClose: 5000,
//           });
//         }
//       } catch (e) {
//         console.warn("Failed to restore booking draft:", e);
//         // Optional: clean broken data
//         // localStorage.removeItem(STORAGE_KEY);
//       }
//     }
//   }, [tourId]);

//   useEffect(() => {
//     if (tours.length > 0) {
//       const t = tours.find((tour) => tour._id === tourId);
//       if (!t) {
//         toast.error("Tour not found.");
//         return;
//       }
//       setTourInfo(t);
//       setTransportPoints({
//         boarding: t.boardingPoints || [],
//         deboarding: t.deboardingPoints || [],
//       });
//     }
//   }, [tours, tourId]);

//   useEffect(() => {
//     if (!tourInfo) return;

//     let totalAdvance = 0;
//     let totalBalance = 0;
//     let totalAddons = 0;

//     travellers.forEach((t) => {
//       const age = Number(t.age);
//       let travellerAdvance = 0;
//       let travellerBalance = 0;

//       const selectedPackage =
//         t.packageType === "main"
//           ? tourInfo
//           : tourInfo.variantPackage?.[t.variantPackageIndex];

//       if (!selectedPackage) return;

//       if (age >= 11) {
//         travellerAdvance = Number(selectedPackage.advanceAmount?.adult) || 0;
//         if (t.sharingType === "double") {
//           travellerBalance = Number(selectedPackage.balanceDouble) || 0;
//         } else if (t.sharingType === "triple") {
//           travellerBalance = Number(selectedPackage.balanceTriple) || 0;
//         }
//       } else if (age >= 6 && age <= 10) {
//         travellerAdvance = Number(selectedPackage.advanceAmount?.child) || 0;
//         if (t.sharingType === "withBerth") {
//           travellerBalance = Number(selectedPackage.balanceChildWithBerth) || 0;
//         } else if (t.sharingType === "withoutBerth") {
//           travellerBalance =
//             Number(selectedPackage.balanceChildWithoutBerth) || 0;
//         }
//       } else if (age >= 1 && age <= 5) {
//         travellerAdvance = 0;
//         travellerBalance = 0;
//       }

//       if (t.selectedAddon?.amount) {
//         const addonPrice = Number(t.selectedAddon.amount) || 0;
//         totalAddons += addonPrice;
//         travellerAdvance += addonPrice;
//       }

//       totalAdvance += travellerAdvance;
//       totalBalance += travellerBalance;
//     });

//     setAmounts({
//       advance: totalAdvance,
//       balance: totalBalance,
//       addonsTotal: totalAddons,
//     });
//   }, [travellers, tourInfo]);

//   const handleTravellerChange = (index, field, value) => {
//     const updated = [...travellers];

//     if (field === "title") {
//       if (value === "Mr") {
//         updated[index].gender = "Male";
//       } else if (value === "Mrs" || value === "Ms") {
//         updated[index].gender = "Female";
//       }
//     } else if (field === "gender") {
//       if (value === "Male") {
//         updated[index].title = "Mr";
//       } else if (value === "Female") {
//         updated[index].title = "Ms";
//       }
//     }

//     if (field === "age") {
//       const age = Number(value);
//       if (age > 85) {
//         toast.error("Age cannot exceed 85 years.");
//         return;
//       }
//       if (age >= 11) {
//         updated[index].sharingType = "double";
//       } else if (age >= 6 && age <= 10) {
//         updated[index].sharingType = "withBerth";
//       } else if (age >= 1 && age <= 5) {
//         updated[index].sharingType = "withoutBerth";
//       } else {
//         updated[index].sharingType = "";
//       }
//     }

//     updated[index][field] = value;

//     if (field === "packageType" || field === "variantPackageIndex") {
//       updated[index].boardingPoint = null;
//       updated[index].deboardingPoint = null;
//       updated[index].selectedAddon = null;
//     }

//     setTravellers(updated);
//   };

//   const addTraveller = () => {
//     setTravellers([
//       ...travellers,
//       {
//         title: "Mr",
//         firstName: "",
//         lastName: "",
//         age: "",
//         gender: "Male",
//         sharingType: "",
//         selectedAddon: null,
//         boardingPoint: null,
//         deboardingPoint: null,
//         remarks: "",
//         packageType: "main",
//         variantPackageIndex: null,
//       },
//     ]);
//   };

//   const removeTraveller = (index) => {
//     setTravellers(travellers.filter((_, i) => i !== index));
//   };

//   const handleBooking = async () => {
//     setIsSubmitting(true);

//     if (!token) {
//       toast.warning("Please login to continue booking");

//       // Save current form state before redirect
//       const draft = {
//         travellers,
//         contact,
//         billingAddress,
//         bookingType,
//       };
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));

//       navigate("/login", {
//         state: { from: location.pathname + location.search },
//         replace: true,
//       });

//       setTimeout(() => {
//         window.scrollTo({
//           top: 0,
//           left: 0,
//           behavior: "smooth",
//         });
//       }, 100);

//       setIsSubmitting(false);
//       return;
//     }

//     const emailRegex = /.+@.+\..+/;

//     if (!emailRegex.test(contact.email)) {
//       toast.error("Please enter a valid email address.");
//       setIsSubmitting(false);
//       return;
//     }

//     const mobile = contact.mobile?.trim() || "";
//     if (mobile && !/^[+\d\s()-]{8,20}$/.test(mobile)) {
//       toast.error(
//         "Mobile number should be 8–20 characters (digits, +, space, -, () allowed).",
//       );
//       setIsSubmitting(false);
//       return;
//     }

//     for (let [idx, t] of travellers.entries()) {
//       const age = Number(t.age);

//       if (!t.firstName?.trim()) {
//         toast.error(
//           `Traveller ${idx + 1}: First Name is required (As per Aadhar).`,
//         );
//         setIsSubmitting(false);
//         return;
//       }

//       if (!t.lastName?.trim()) {
//         toast.error(
//           `Traveller ${idx + 1}: Last Name is required (As per Aadhar).`,
//         );
//         setIsSubmitting(false);
//         return;
//       }

//       if (isNaN(age) || age < 1) {
//         toast.error(
//           `Invalid age for traveller: ${t.firstName || "Unnamed"}. Age must be greater than 0.`,
//         );
//         setIsSubmitting(false);
//         return;
//       }
//       if (age < 6) {
//         toast.error(
//           `Age must be at least 6 years for traveller: ${t.firstName || "Unnamed"}.`,
//         );
//         setIsSubmitting(false);
//         return;
//       }
//       if (age > 85) {
//         toast.error("Age cannot exceed 85 years.");
//         setIsSubmitting(false);
//         return;
//       }
//       if (!t.gender) {
//         toast.error("Please select gender for all travellers.");
//         setIsSubmitting(false);
//         return;
//       }
//       if (!t.sharingType) {
//         toast.error("Please select a sharing type for all travellers.");
//         setIsSubmitting(false);
//         return;
//       }
//       if (!t.boardingPoint) {
//         toast.error("Please select a boarding point for all travellers.");
//         setIsSubmitting(false);
//         return;
//       }
//       if (!t.deboardingPoint) {
//         toast.error("Please select a deboarding point for all travellers.");
//         setIsSubmitting(false);
//         return;
//       }
//       if (!t.packageType) {
//         toast.error("Please select a package type for all travellers.");
//         setIsSubmitting(false);
//         return;
//       }
//       if (t.packageType === "variant" && t.variantPackageIndex === null) {
//         toast.error(
//           `Please select a variant package for traveller: ${t.firstName || "Unnamed"}.`,
//         );
//         setIsSubmitting(false);
//         return;
//       }
//     }

//     const billingData =
//       billingAddress.addressLine1.trim() ||
//       billingAddress.city.trim() ||
//       billingAddress.state.trim() ||
//       billingAddress.pincode.trim()
//         ? billingAddress
//         : null;

//     try {
//       const payload = {
//         userId: userData._id,
//         tourId,
//         bookingType,
//         contact,
//         billingAddress: billingData,
//         travellers: travellers.map((t) => ({
//           ...t,
//           boardingPoint: t.boardingPoint,
//           deboardingPoint: t.deboardingPoint,
//           selectedAddon: t.selectedAddon
//             ? {
//                 name: t.selectedAddon.name,
//                 price: Number(t.selectedAddon.amount) || 0,
//               }
//             : null,
//           remarks: t.remarks?.trim() || null,
//           packageType: t.packageType,
//           variantPackageIndex:
//             t.packageType === "variant" ? t.variantPackageIndex : null,
//         })),
//         payment: {
//           advance: { amount: amounts.advance },
//           balance: { amount: amounts.balance },
//         },
//       };

//       const { data } = await axios.post(
//         `${backendUrl}/api/user/addtotrolly`,
//         payload,
//         { headers: { token } },
//       );

//       if (data.success) {
//         toast.success(
//           bookingType === "offline"
//             ? "Offline booking added to My Trolly! Awaiting confirmation."
//             : "Booking added to My Trolly! Complete payment from My Trolly.",
//         );

//         // Clear draft after successful submission
//         localStorage.removeItem(STORAGE_KEY);

//         navigate("/my-trolly");
//         // Scroll to top after navigation
//         setTimeout(() => {
//           window.scrollTo({ top: 0, left: 0, behavior: "instant" });
//         }, 100); // small delay ensures navigation completes first
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(
//         error.response?.data?.message ||
//           "Booking failed. Please check traveller details.",
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!tourInfo) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <p className="text-xl text-gray-600 animate-pulse">
//           Loading tour details...
//         </p>
//       </div>
//     );
//   }

//   if (!tourInfo.available) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 text-center max-w-lg">
//           <p className="text-2xl font-medium text-gray-700">
//             This tour package is currently not available for booking.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const formatDate = (dateString) => {
//     if (!dateString) return "Not specified";
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   return (
//     <div
//       className="w-full 
//         max-w-[98%] xs:max-w-[96%] sm:max-w-[98%] md:max-w-[96vw] 
//         lg:max-w-[94vw] xl:max-w-[92vw] 2xl:max-w-[90vw]
//         rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[3.5rem] xl:rounded-[4rem]
//         backdrop-blur-xl bg-white/40 border border-white/50
//         shadow-2xl md:shadow-[0_30px_90px_-15px_rgba(0,0,0,0.12)]
//         overflow-hidden
//         p-8 xs:p-10 sm:p-12 md:p-16 lg:p-20 xl:p-24
//       "
//     >
//       <div className="max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto">
//         {/* Tour Header */}
//         <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 sm:p-8 md:p-10 mb-6 sm:mb-8 md:mb-10 text-center transition-all duration-500 hover:shadow-xl">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
//             {tourInfo.title}
//           </h1>
//           <p className="text-lg sm:text-xl text-gray-600 mb-4">
//             {tourInfo.duration?.days} Days / {tourInfo.duration?.nights} Nights
//           </p>

//           {/* Main Package Departure */}
//           <div className="mb-6">
//             <p className="text-base sm:text-lg font-medium text-gray-700">
//               Main Package Departure
//             </p>
//             <p className="text-lg sm:text-xl text-indigo-700 font-semibold">
//               {formatDate(tourInfo.lastBookingDate)}
//             </p>
//           </div>

//           {/* Variant Packages Departures */}
//           {tourInfo.variantPackage && tourInfo.variantPackage.length > 0 && (
//             <div className="mt-6 pt-6 border-t border-gray-200">
//               <p className="text-base sm:text-lg font-medium text-gray-700 mb-4">
//                 Variant Package Departures
//               </p>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {tourInfo.variantPackage.map((variant, i) => (
//                   <div
//                     key={i}
//                     className="bg-indigo-50/70 rounded-xl p-4 text-left"
//                   >
//                     <p className="text-sm sm:text-base font-medium text-gray-800">
//                       Variant {i + 1}
//                     </p>
//                     {variant.destination && (
//                       <p className="text-sm text-gray-600 mt-1">
//                         {variant.destination.join(", ")}
//                       </p>
//                     )}
//                     <p className="text-base sm:text-lg text-indigo-700 font-semibold mt-2">
//                       Departure: {formatDate(variant.lastBookingDate)}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Important Notice Alert */}
//         <div className="mb-8 px-6 py-5 bg-amber-50 border border-amber-300 rounded-2xl text-amber-900 shadow-md">
//           <p className="text-center font-medium leading-relaxed">
//             <span className="font-semibold">Important Notice:</span> To avoid
//             higher payment gateway charges, we are currently processing all
//             bookings in offline mode only.
//             <br />
//             Please proceed with{" "}
//             <span className="font-semibold">Offline Booking</span>. We will
//             immediately share the payment details via WhatsApp once you confirm.
//             Kindly complete the payment and inform us for instant booking
//             confirmation. Thank you for your understanding.
//           </p>
//         </div>

//         <div className="space-y-6 sm:space-y-8">
//           {/* Booking Type */}
//           <div className="bg-white/70 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl">
//             <label className="text-base sm:text-lg font-medium text-gray-800">
//               Booking Type
//             </label>
//             <select
//               className="mt-2 sm:mt-3 w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none text-gray-700"
//               value={bookingType}
//               onChange={(e) => setBookingType(e.target.value)}
//             >
//               <option value="offline">Offline Booking</option>
//             </select>
//           </div>

//           {/* Contact Info */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//             <div className="bg-white/70 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl">
//               <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">
//                 Contact Email
//               </label>
//               <input
//                 type="email"
//                 className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
//                 placeholder="your@email.com"
//                 value={contact.email}
//                 onChange={(e) =>
//                   setContact((prev) => ({ ...prev, email: e.target.value }))
//                 }
//               />
//             </div>
//             <div className="bg-white/70 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl">
//               <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">
//                 Mobile Number
//               </label>
//               <input
//                 type="tel"
//                 className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
//                 placeholder="Mobile number (with country code if international)"
//                 value={contact.mobile}
//                 onChange={(e) =>
//                   setContact((prev) => ({ ...prev, mobile: e.target.value }))
//                 }
//               />
//             </div>
//           </div>

//           {/* Billing Address */}
//           <div className="bg-white/70 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl">
//             <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
//               Billing Address (Optional)
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               <input
//                 type="text"
//                 placeholder="Address Line 1"
//                 className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                 value={billingAddress.addressLine1}
//                 onChange={(e) =>
//                   setBillingAddress((prev) => ({
//                     ...prev,
//                     addressLine1: e.target.value,
//                   }))
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="Address Line 2"
//                 className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                 value={billingAddress.addressLine2}
//                 onChange={(e) =>
//                   setBillingAddress((prev) => ({
//                     ...prev,
//                     addressLine2: e.target.value,
//                   }))
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="City"
//                 className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                 value={billingAddress.city}
//                 onChange={(e) =>
//                   setBillingAddress((prev) => ({
//                     ...prev,
//                     city: e.target.value,
//                   }))
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="State"
//                 className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                 value={billingAddress.state}
//                 onChange={(e) =>
//                   setBillingAddress((prev) => ({
//                     ...prev,
//                     state: e.target.value,
//                   }))
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="Pincode"
//                 className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                 value={billingAddress.pincode}
//                 onChange={(e) =>
//                   setBillingAddress((prev) => ({
//                     ...prev,
//                     pincode: e.target.value,
//                   }))
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="Country"
//                 className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                 value={billingAddress.country}
//                 onChange={(e) =>
//                   setBillingAddress((prev) => ({
//                     ...prev,
//                     country: e.target.value,
//                   }))
//                 }
//               />
//             </div>
//           </div>

//           {/* Travellers Section */}
//           <div>
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
//               Traveller Details
//             </h2>
//             {travellers.map((traveller, index) => (
//               <div
//                 key={index}
//                 className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 sm:p-8 mb-4 sm:mb-6 transition-all duration-500 hover:shadow-xl border border-indigo-100"
//               >
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
//                   <h3 className="text-lg sm:text-xl font-semibold text-indigo-800">
//                     Traveller {index + 1}
//                   </h3>
//                   {travellers.length > 1 && (
//                     <button
//                       onClick={() => removeTraveller(index)}
//                       className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
//                     >
//                       Remove Traveller
//                     </button>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 mb-4 sm:mb-6">
//                   <select
//                     className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                     value={
//                       traveller.packageType === "main"
//                         ? "main"
//                         : traveller.variantPackageIndex
//                     }
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (value === "main") {
//                         handleTravellerChange(index, "packageType", "main");
//                         handleTravellerChange(
//                           index,
//                           "variantPackageIndex",
//                           null,
//                         );
//                       } else {
//                         handleTravellerChange(index, "packageType", "variant");
//                         handleTravellerChange(
//                           index,
//                           "variantPackageIndex",
//                           Number(value),
//                         );
//                       }
//                     }}
//                   >
//                     <option value="main">Main Package</option>
//                     {tourInfo.variantPackage?.map((pkg, i) => (
//                       <option key={i} value={i}>
//                         Variant {i + 1} ({pkg.destination?.join(", ")})
//                       </option>
//                     ))}
//                   </select>

//                   <select
//                     value={traveller.title}
//                     onChange={(e) =>
//                       handleTravellerChange(index, "title", e.target.value)
//                     }
//                     className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                   >
//                     <option>Mr</option>
//                     <option>Mrs</option>
//                     <option>Ms</option>
//                   </select>

//                   <input
//                     type="text"
//                     placeholder="First Name (As per Aadhar)"
//                     className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                     value={traveller.firstName}
//                     onChange={(e) =>
//                       handleTravellerChange(index, "firstName", e.target.value)
//                     }
//                   />
//                   <input
//                     type="text"
//                     placeholder="Last Name (As per Aadhar)"
//                     className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                     value={traveller.lastName}
//                     onChange={(e) =>
//                       handleTravellerChange(index, "lastName", e.target.value)
//                     }
//                   />
//                   <input
//                     type="number"
//                     placeholder="Age"
//                     className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                     value={traveller.age}
//                     onChange={(e) =>
//                       handleTravellerChange(index, "age", e.target.value)
//                     }
//                   />
//                   <select
//                     value={traveller.gender}
//                     onChange={(e) =>
//                       handleTravellerChange(index, "gender", e.target.value)
//                     }
//                     className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                   >
//                     <option value="">Gender</option>
//                     <option>Male</option>
//                     <option>Female</option>
//                     <option>Other</option>
//                   </select>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mb-4 sm:mb-6">
//                   <div>
//                     <label className="block font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
//                       Boarding Point
//                     </label>
//                     <select
//                       className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                       value={traveller.boardingPoint?.stationCode || ""}
//                       onChange={(e) => {
//                         const selectedPackage =
//                           traveller.packageType === "main"
//                             ? tourInfo
//                             : tourInfo.variantPackage?.[
//                                 traveller.variantPackageIndex
//                               ];
//                         const selectedBP =
//                           selectedPackage?.boardingPoints?.find(
//                             (bp) => bp.stationCode === e.target.value,
//                           );
//                         handleTravellerChange(
//                           index,
//                           "boardingPoint",
//                           selectedBP || null,
//                         );
//                       }}
//                     >
//                       <option value="">Select Boarding Point</option>
//                       {(traveller.packageType === "main"
//                         ? tourInfo.boardingPoints
//                         : tourInfo.variantPackage?.[
//                             traveller.variantPackageIndex
//                           ]?.boardingPoints || []
//                       )?.map((bp, i) => (
//                         <option key={i} value={bp.stationCode}>
//                           {bp.stationCode} - {bp.stationName}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
//                       Deboarding Point
//                     </label>
//                     <select
//                       className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                       value={traveller.deboardingPoint?.stationCode || ""}
//                       onChange={(e) => {
//                         const selectedPackage =
//                           traveller.packageType === "main"
//                             ? tourInfo
//                             : tourInfo.variantPackage?.[
//                                 traveller.variantPackageIndex
//                               ];
//                         const selectedDP =
//                           selectedPackage?.deboardingPoints?.find(
//                             (dp) => dp.stationCode === e.target.value,
//                           );
//                         handleTravellerChange(
//                           index,
//                           "deboardingPoint",
//                           selectedDP || null,
//                         );
//                       }}
//                     >
//                       <option value="">Select Deboarding Point</option>
//                       {(traveller.packageType === "main"
//                         ? tourInfo.deboardingPoints
//                         : tourInfo.variantPackage?.[
//                             traveller.variantPackageIndex
//                           ]?.deboardingPoints || []
//                       )?.map((dp, i) => (
//                         <option key={i} value={dp.stationCode}>
//                           {dp.stationCode} - {dp.stationName}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mb-4 sm:mb-6">
//                   <div>
//                     <label className="block font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
//                       Sharing Type
//                     </label>
//                     <select
//                       value={traveller.sharingType}
//                       onChange={(e) =>
//                         handleTravellerChange(
//                           index,
//                           "sharingType",
//                           e.target.value,
//                         )
//                       }
//                       className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                     >
//                       <option value="">Select Sharing</option>
//                       {Number(traveller.age) >= 11 ? (
//                         <>
//                           <option value="double">Double Sharing</option>
//                           <option value="triple">Triple Sharing</option>
//                         </>
//                       ) : Number(traveller.age) >= 6 &&
//                         Number(traveller.age) <= 10 ? (
//                         <>
//                           <option value="withBerth">Child with Berth</option>
//                           <option value="withoutBerth">
//                             Child without Berth
//                           </option>
//                         </>
//                       ) : null}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
//                       Add-ons (Optional)
//                     </label>
//                     <select
//                       className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                       value={
//                         traveller.selectedAddon?._id ||
//                         traveller.selectedAddon?.id ||
//                         ""
//                       }
//                       onChange={(e) => {
//                         const selectedPackage =
//                           traveller.packageType === "main"
//                             ? tourInfo
//                             : tourInfo.variantPackage?.[
//                                 traveller.variantPackageIndex
//                               ];
//                         const selected = selectedPackage?.addons?.find(
//                           (addon) =>
//                             addon._id === e.target.value ||
//                             addon.id === e.target.value,
//                         );
//                         handleTravellerChange(
//                           index,
//                           "selectedAddon",
//                           selected || null,
//                         );
//                       }}
//                     >
//                       <option value="">No Add-on</option>
//                       {(traveller.packageType === "main"
//                         ? tourInfo.addons
//                         : tourInfo.variantPackage?.[
//                             traveller.variantPackageIndex
//                           ]?.addons || []
//                       )?.map((addon) => (
//                         <option
//                           key={addon._id || addon.id}
//                           value={addon._id || addon.id}
//                         >
//                           {addon.name} (+{currencySymbol}
//                           {addon.amount || 0})
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <textarea
//                   className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 resize-none"
//                   rows="3"
//                   placeholder="Remarks (optional)"
//                   value={traveller.remarks}
//                   onChange={(e) =>
//                     handleTravellerChange(index, "remarks", e.target.value)
//                   }
//                 />
//               </div>
//             ))}

//             <button
//               onClick={addTraveller}
//               className="bg-indigo-100 text-indigo-700 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium hover:bg-indigo-200 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto"
//             >
//               + Add Another Traveller
//             </button>
//           </div>

//           {/* Booking Summary */}
//           <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
//             <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
//               Booking Summary
//             </h3>
//             <div className="space-y-3 sm:space-y-5 text-base sm:text-lg text-gray-700">
//               <div className="flex justify-between">
//                 <span>Advance Amount:</span>
//                 <strong className="text-indigo-700">
//                   {currencySymbol}
//                   {amounts.advance}/-
//                 </strong>
//               </div>
//               <div className="flex justify-between">
//                 <span>Balance Amount:</span>
//                 <strong className="text-indigo-700">
//                   {currencySymbol}
//                   {amounts.balance}/-
//                 </strong>
//               </div>
//               <div className="flex justify-between">
//                 <span>Add-ons Total:</span>
//                 <strong className="text-indigo-700">
//                   {currencySymbol}
//                   {amounts.addonsTotal}/-
//                 </strong>
//               </div>
//               <hr className="border-gray-200" />
//               <div className="flex justify-between text-xl sm:text-2xl font-bold text-gray-800 pt-2 sm:pt-3">
//                 <span>Total Payable:</span>
//                 <span className="text-indigo-800">
//                   {currencySymbol}
//                   {amounts.advance + amounts.balance}/-
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={handleBooking}
//             disabled={isSubmitting}
//             className={`w-full py-4 sm:py-5 rounded-2xl text-white font-bold text-lg sm:text-xl transition-all duration-500 transform hover:scale-[1.02] shadow-xl ${
//               isSubmitting
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:from-indigo-600 hover:to-blue-600"
//             } ${isSubmitting ? "" : "hover:shadow-2xl"}`}
//           >
//             {isSubmitting ? (
//               <span className="flex items-center justify-center gap-3">
//                 <svg
//                   className="animate-spin h-5 sm:h-6 w-5 sm:w-6"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                     fill="none"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v8z"
//                   />
//                 </svg>
//                 Adding to Trolly...
//               </span>
//             ) : (
//               "Add to Trolly"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TourBooking;


/* eslint-disable no-unused-vars */
// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { TourAppContext } from "../context/TourAppContext.jsx";
// import axios from "axios";
// import { toast } from "react-toastify";

// const TourBooking = () => {
//   const { tourId } = useParams();
//   const { tours, currencySymbol, backendUrl, token, userData } =
//     useContext(TourAppContext);

//   const [tourInfo, setTourInfo] = useState(null);
//   const [bookingType, setBookingType] = useState("offline");

//   const [transportPoints, setTransportPoints] = useState({
//     boarding: [],
//     deboarding: [],
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [travellers, setTravellers] = useState([
//     {
//       title: "Mr",
//       firstName: "",
//       lastName: "",
//       age: "",
//       gender: "Male",
//       sharingType: "double",

//       // OLD:
//       // selectedAddon: null,

//       // NEW:
//       selectedAddons: [],

//       boardingPoint: null,
//       deboardingPoint: null,
//       remarks: "",
//       packageType: "main",
//       variantPackageIndex: null,
//     },
//   ]);

//   const [amounts, setAmounts] = useState({
//     advance: 0,
//     balance: 0,
//     addonsTotal: 0,
//   });

//   const [contact, setContact] = useState({
//     email: userData?.email || "",
//     mobile: userData?.mobile || "",
//   });

//   const [billingAddress, setBillingAddress] = useState({
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "India",
//   });

//   const navigate = useNavigate();
//   const location = useLocation();

//   const STORAGE_KEY = `booking-draft-${tourId}`;

//   // ----------------------------------------------------
//   // RESTORE DRAFT
//   // ----------------------------------------------------
//   useEffect(() => {
//     const saved = localStorage.getItem(STORAGE_KEY);

//     if (saved) {
//       try {
//         const draft = JSON.parse(saved);

//         if (draft.travellers?.length > 0) {
//           setTravellers(draft.travellers);
//         }

//         if (draft.contact?.email || draft.contact?.mobile) {
//           setContact(draft.contact);
//         }

//         if (
//           draft.billingAddress?.city ||
//           draft.billingAddress?.pincode
//         ) {
//           setBillingAddress(draft.billingAddress);
//         }

//         if (draft.bookingType) {
//           setBookingType(draft.bookingType);
//         }

//         if (
//           draft.travellers?.length > 0 ||
//           draft.contact?.email ||
//           draft.billingAddress?.addressLine1
//         ) {
//           toast.info("We restored your previous booking details 😊", {
//             autoClose: 5000,
//           });
//         }
//       } catch (e) {
//         console.warn("Failed to restore booking draft:", e);
//       }
//     }
//   }, [tourId]);

//   // ----------------------------------------------------
//   // GET TOUR
//   // ----------------------------------------------------
//   useEffect(() => {
//     if (tours.length > 0) {
//       const t = tours.find((tour) => tour._id === tourId);

//       if (!t) {
//         toast.error("Tour not found.");
//         return;
//       }

//       setTourInfo(t);

//       setTransportPoints({
//         boarding: t.boardingPoints || [],
//         deboarding: t.deboardingPoints || [],
//       });
//     }
//   }, [tours, tourId]);

//   // ----------------------------------------------------
//   // CALCULATE AMOUNTS
//   // ----------------------------------------------------
//   useEffect(() => {
//     if (!tourInfo) return;

//     let totalAdvance = 0;
//     let totalBalance = 0;
//     let totalAddons = 0;

//     travellers.forEach((t) => {
//       const age = Number(t.age);

//       let travellerAdvance = 0;
//       let travellerBalance = 0;

//       const selectedPackage =
//         t.packageType === "main"
//           ? tourInfo
//           : tourInfo.variantPackage?.[t.variantPackageIndex];

//       if (!selectedPackage) return;

//       // -----------------------------------------------
//       // EXISTING PACKAGE CALCULATION
//       // -----------------------------------------------

//       if (age >= 11) {
//         travellerAdvance =
//           Number(selectedPackage.advanceAmount?.adult) || 0;

//         if (t.sharingType === "double") {
//           travellerBalance =
//             Number(selectedPackage.balanceDouble) || 0;
//         } else if (t.sharingType === "triple") {
//           travellerBalance =
//             Number(selectedPackage.balanceTriple) || 0;
//         }
//       } else if (age >= 6 && age <= 10) {
//         travellerAdvance =
//           Number(selectedPackage.advanceAmount?.child) || 0;

//         if (t.sharingType === "withBerth") {
//           travellerBalance =
//             Number(selectedPackage.balanceChildWithBerth) || 0;
//         } else if (t.sharingType === "withoutBerth") {
//           travellerBalance =
//             Number(selectedPackage.balanceChildWithoutBerth) || 0;
//         }
//       } else if (age >= 1 && age <= 5) {
//         travellerAdvance = 0;
//         travellerBalance = 0;
//       }

//       // -----------------------------------------------
//       // NEW ADDONS CALCULATION
//       // -----------------------------------------------

//       const travellerAddons = Array.isArray(t.selectedAddons)
//         ? t.selectedAddons
//         : [];

//       travellerAddons.forEach((addon) => {
//         const addonPrice = Number(addon.amount) || 0;

//         totalAddons += addonPrice;

//         // Same existing logic:
//         // addon amount goes into advance
//         travellerAdvance += addonPrice;
//       });

//       totalAdvance += travellerAdvance;
//       totalBalance += travellerBalance;
//     });

//     setAmounts({
//       advance: totalAdvance,
//       balance: totalBalance,
//       addonsTotal: totalAddons,
//     });
//   }, [travellers, tourInfo]);

//   // ----------------------------------------------------
//   // TRAVELLER CHANGE
//   // ----------------------------------------------------
//   const handleTravellerChange = (index, field, value) => {
//     const updated = [...travellers];

//     if (field === "title") {
//       if (value === "Mr") {
//         updated[index].gender = "Male";
//       } else if (value === "Mrs" || value === "Ms") {
//         updated[index].gender = "Female";
//       }
//     }

//     if (field === "gender") {
//       if (value === "Male") {
//         updated[index].title = "Mr";
//       } else if (value === "Female") {
//         updated[index].title = "Ms";
//       }
//     }

//     if (field === "age") {
//       const age = Number(value);

//       if (age > 85) {
//         toast.error("Age cannot exceed 85 years.");
//         return;
//       }

//       if (age >= 11) {
//         updated[index].sharingType = "double";
//       } else if (age >= 6 && age <= 10) {
//         updated[index].sharingType = "withBerth";
//       } else if (age >= 1 && age <= 5) {
//         updated[index].sharingType = "withoutBerth";
//       } else {
//         updated[index].sharingType = "";
//       }
//     }

//     updated[index][field] = value;

//     if (
//       field === "packageType" ||
//       field === "variantPackageIndex"
//     ) {
//       updated[index].boardingPoint = null;
//       updated[index].deboardingPoint = null;

//       // Clear addons when package changes
//       updated[index].selectedAddons = [];
//     }

//     setTravellers(updated);
//   };

//   // ----------------------------------------------------
//   // ADD / REMOVE TRAVELLER
//   // ----------------------------------------------------
//   const addTraveller = () => {
//     setTravellers([
//       ...travellers,
//       {
//         title: "Mr",
//         firstName: "",
//         lastName: "",
//         age: "",
//         gender: "Male",
//         sharingType: "",
//         selectedAddons: [],
//         boardingPoint: null,
//         deboardingPoint: null,
//         remarks: "",
//         packageType: "main",
//         variantPackageIndex: null,
//       },
//     ]);
//   };

//   const removeTraveller = (index) => {
//     setTravellers(travellers.filter((_, i) => i !== index));
//   };

//   // ----------------------------------------------------
//   // ADDON CHANGE
//   // ----------------------------------------------------
//   const handleAddonChange = (
//     travellerIndex,
//     trainIndex,
//     addonId
//   ) => {
//     const updated = [...travellers];

//     const traveller = updated[travellerIndex];

//     const selectedPackage =
//       traveller.packageType === "main"
//         ? tourInfo
//         : tourInfo.variantPackage?.[
//             traveller.variantPackageIndex
//           ];

//     const train = selectedPackage?.trainDetails?.[trainIndex];

//     if (!train) return;

//     // Current selected addons
//     let selectedAddons = Array.isArray(traveller.selectedAddons)
//       ? [...traveller.selectedAddons]
//       : [];

//     // Remove previous addon for this train
//     selectedAddons = selectedAddons.filter(
//       (addon) => addon.trainIndex !== trainIndex
//     );

//     // If "No Add-on"
//     if (!addonId) {
//       updated[travellerIndex].selectedAddons = selectedAddons;
//       setTravellers(updated);
//       return;
//     }

//     // Find addon
//     const selectedAddon = train.addons?.find(
//       (addon) =>
//         String(addon._id || addon.id) === String(addonId)
//     );

//     if (!selectedAddon) {
//       updated[travellerIndex].selectedAddons = selectedAddons;
//       setTravellers(updated);
//       return;
//     }

//     // Add selected addon
//     selectedAddons.push({
//       trainIndex,
//       trainNo: train.trainNo,
//       trainName: train.trainName,
//       tripType: train.tripType,

//       addonId: selectedAddon._id || selectedAddon.id,

//       name: selectedAddon.name,

//       amount: Number(selectedAddon.amount) || 0,
//     });

//     updated[travellerIndex].selectedAddons = selectedAddons;

//     setTravellers(updated);
//   };

//   // ----------------------------------------------------
//   // GET SELECTED ADDON FOR TRAIN
//   // ----------------------------------------------------
//   const getSelectedAddonForTrain = (
//     traveller,
//     trainIndex
//   ) => {
//     const selectedAddons = Array.isArray(
//       traveller.selectedAddons
//     )
//       ? traveller.selectedAddons
//       : [];

//     return (
//       selectedAddons.find(
//         (addon) => addon.trainIndex === trainIndex
//       )?.addonId || ""
//     );
//   };

//   // ----------------------------------------------------
//   // BOOKING
//   // ----------------------------------------------------
//   const handleBooking = async () => {
//     setIsSubmitting(true);

//     if (!token) {
//       toast.warning("Please login to continue booking");

//       const draft = {
//         travellers,
//         contact,
//         billingAddress,
//         bookingType,
//       };

//       localStorage.setItem(
//         STORAGE_KEY,
//         JSON.stringify(draft)
//       );

//       navigate("/login", {
//         state: {
//           from:
//             location.pathname + location.search,
//         },
//         replace: true,
//       });

//       setTimeout(() => {
//         window.scrollTo({
//           top: 0,
//           left: 0,
//           behavior: "smooth",
//         });
//       }, 100);

//       setIsSubmitting(false);
//       return;
//     }

//     const emailRegex = /.+@.+\..+/;

//     if (!emailRegex.test(contact.email)) {
//       toast.error("Please enter a valid email address.");
//       setIsSubmitting(false);
//       return;
//     }

//     const mobile = contact.mobile?.trim() || "";

//     if (
//       mobile &&
//       !/^[+\d\s()-]{8,20}$/.test(mobile)
//     ) {
//       toast.error(
//         "Mobile number should be 8–20 characters (digits, +, space, -, () allowed)."
//       );
//       setIsSubmitting(false);
//       return;
//     }

//     // ----------------------------------------------------
//     // VALIDATE TRAVELLERS
//     // ----------------------------------------------------

//     for (let [idx, t] of travellers.entries()) {
//       const age = Number(t.age);

//       if (!t.firstName?.trim()) {
//         toast.error(
//           `Traveller ${idx + 1}: First Name is required (As per Aadhar).`
//         );
//         setIsSubmitting(false);
//         return;
//       }

//       if (!t.lastName?.trim()) {
//         toast.error(
//           `Traveller ${idx + 1}: Last Name is required (As per Aadhar).`
//         );
//         setIsSubmitting(false);
//         return;
//       }

//       if (isNaN(age) || age < 1) {
//         toast.error(
//           `Invalid age for traveller: ${
//             t.firstName || "Unnamed"
//           }. Age must be greater than 0.`
//         );
//         setIsSubmitting(false);
//         return;
//       }

//       if (age < 6) {
//         toast.error(
//           `Age must be at least 6 years for traveller: ${
//             t.firstName || "Unnamed"
//           }.`
//         );
//         setIsSubmitting(false);
//         return;
//       }

//       if (age > 85) {
//         toast.error(
//           "Age cannot exceed 85 years."
//         );
//         setIsSubmitting(false);
//         return;
//       }

//       if (!t.gender) {
//         toast.error(
//           "Please select gender for all travellers."
//         );
//         setIsSubmitting(false);
//         return;
//       }

//       if (!t.sharingType) {
//         toast.error(
//           "Please select a sharing type for all travellers."
//         );
//         setIsSubmitting(false);
//         return;
//       }

//       if (!t.boardingPoint) {
//         toast.error(
//           "Please select a boarding point for all travellers."
//         );
//         setIsSubmitting(false);
//         return;
//       }

//       if (!t.deboardingPoint) {
//         toast.error(
//           "Please select a deboarding point for all travellers."
//         );
//         setIsSubmitting(false);
//         return;
//       }

//       if (!t.packageType) {
//         toast.error(
//           "Please select a package type for all travellers."
//         );
//         setIsSubmitting(false);
//         return;
//       }

//       if (
//         t.packageType === "variant" &&
//         t.variantPackageIndex === null
//       ) {
//         toast.error(
//           `Please select a variant package for traveller: ${
//             t.firstName || "Unnamed"
//           }.`
//         );
//         setIsSubmitting(false);
//         return;
//       }
//     }

//     // ----------------------------------------------------
//     // BILLING
//     // ----------------------------------------------------

//     const billingData =
//       billingAddress.addressLine1.trim() ||
//       billingAddress.city.trim() ||
//       billingAddress.state.trim() ||
//       billingAddress.pincode.trim()
//         ? billingAddress
//         : null;

//     try {
//       const payload = {
//         userId: userData._id,
//         tourId,
//         bookingType,
//         contact,
//         billingAddress: billingData,

//         travellers: travellers.map((t) => ({
//           ...t,

//           boardingPoint: t.boardingPoint,
//           deboardingPoint: t.deboardingPoint,

//           // NEW ADDONS ARRAY
//           selectedAddons: Array.isArray(
//             t.selectedAddons
//           )
//             ? t.selectedAddons.map((addon) => ({
//                 trainIndex: addon.trainIndex,
//                 trainNo: addon.trainNo,
//                 trainName: addon.trainName,
//                 tripType: addon.tripType,
//                 addonId: addon.addonId,
//                 name: addon.name,
//                 amount: Number(addon.amount) || 0,
//               }))
//             : [],

//           remarks: t.remarks?.trim() || null,

//           packageType: t.packageType,

//           variantPackageIndex:
//             t.packageType === "variant"
//               ? t.variantPackageIndex
//               : null,
//         })),

//         payment: {
//           advance: {
//             amount: amounts.advance,
//           },

//           balance: {
//             amount: amounts.balance,
//           },
//         },
//       };

//       const { data } = await axios.post(
//         `${backendUrl}/api/user/addtotrolly`,
//         payload,
//         {
//           headers: {
//             token,
//           },
//         }
//       );

//       if (data.success) {
//         toast.success(
//           bookingType === "offline"
//             ? "Offline booking added to My Trolly! Awaiting confirmation."
//             : "Booking added to My Trolly! Complete payment from My Trolly."
//         );

//         localStorage.removeItem(STORAGE_KEY);

//         navigate("/my-trolly");

//         setTimeout(() => {
//           window.scrollTo({
//             top: 0,
//             left: 0,
//             behavior: "instant",
//           });
//         }, 100);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);

//       toast.error(
//         error.response?.data?.message ||
//           "Booking failed. Please check traveller details."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ----------------------------------------------------
//   // LOADING
//   // ----------------------------------------------------

//   if (!tourInfo) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <p className="text-xl text-gray-600 animate-pulse">
//           Loading tour details...
//         </p>
//       </div>
//     );
//   }

//   // ----------------------------------------------------
//   // NOT AVAILABLE
//   // ----------------------------------------------------

//   if (!tourInfo.available) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 text-center max-w-lg">
//           <p className="text-2xl font-medium text-gray-700">
//             This tour package is currently not available for booking.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // ----------------------------------------------------
//   // DATE FORMAT
//   // ----------------------------------------------------

//   const formatDate = (dateString) => {
//     if (!dateString) return "Not specified";

//     return new Date(dateString).toLocaleDateString(
//       "en-IN",
//       {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       }
//     );
//   };

//   // ====================================================
//   // UI
//   // ====================================================

//   return (
//     <div
//       className="
//         w-full 
//         max-w-[98%] xs:max-w-[96%] sm:max-w-[98%] md:max-w-[96vw] 
//         lg:max-w-[94vw] xl:max-w-[92vw] 2xl:max-w-[90vw]
//         rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[3.5rem] xl:rounded-[4rem]
//         backdrop-blur-xl bg-white/40 border border-white/50
//         shadow-2xl md:shadow-[0_30px_90px_-15px_rgba(0,0,0,0.12)]
//         overflow-hidden
//         p-8 xs:p-10 sm:p-12 md:p-16 lg:p-20 xl:p-24
//       "
//     >
//       <div className="max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto">

//         {/* =================================================
//             TOUR HEADER
//         ================================================= */}

//         <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 sm:p-8 md:p-10 mb-6 sm:mb-8 md:mb-10 text-center transition-all duration-500 hover:shadow-xl">

//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
//             {tourInfo.title}
//           </h1>

//           <p className="text-lg sm:text-xl text-gray-600 mb-4">
//             {tourInfo.duration?.days} Days /{" "}
//             {tourInfo.duration?.nights} Nights
//           </p>

//           <div className="mb-6">
//             <p className="text-base sm:text-lg font-medium text-gray-700">
//               Main Package Departure
//             </p>

//             <p className="text-lg sm:text-xl text-indigo-700 font-semibold">
//               {formatDate(
//                 tourInfo.lastBookingDate
//               )}
//             </p>
//           </div>

//           {tourInfo.variantPackage &&
//             tourInfo.variantPackage.length > 0 && (
//               <div className="mt-6 pt-6 border-t border-gray-200">

//                 <p className="text-base sm:text-lg font-medium text-gray-700 mb-4">
//                   Variant Package Departures
//                 </p>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//                   {tourInfo.variantPackage.map(
//                     (variant, i) => (
//                       <div
//                         key={i}
//                         className="bg-indigo-50/70 rounded-xl p-4 text-left"
//                       >
//                         <p className="text-sm sm:text-base font-medium text-gray-800">
//                           Variant {i + 1}
//                         </p>

//                         {variant.destination && (
//                           <p className="text-sm text-gray-600 mt-1">
//                             {variant.destination.join(
//                               ", "
//                             )}
//                           </p>
//                         )}

//                         <p className="text-base sm:text-lg text-indigo-700 font-semibold mt-2">
//                           Departure:{" "}
//                           {formatDate(
//                             variant.lastBookingDate
//                           )}
//                         </p>
//                       </div>
//                     )
//                   )}

//                 </div>
//               </div>
//             )}
//         </div>

//         {/* =================================================
//             IMPORTANT NOTICE
//         ================================================= */}

//         <div className="mb-8 px-6 py-5 bg-amber-50 border border-amber-300 rounded-2xl text-amber-900 shadow-md">

//           <p className="text-center font-medium leading-relaxed">

//             <span className="font-semibold">
//               Important Notice:
//             </span>{" "}
//             To avoid higher payment gateway charges,
//             we are currently processing all bookings
//             in offline mode only.

//             <br />

//             Please proceed with{" "}
//             <span className="font-semibold">
//               Offline Booking
//             </span>
//             . We will immediately share the payment
//             details via WhatsApp once you confirm.
//             Kindly complete the payment and inform us
//             for instant booking confirmation. Thank you
//             for your understanding.

//           </p>
//         </div>

//         <div className="space-y-6 sm:space-y-8">

//           {/* =================================================
//               BOOKING TYPE
//           ================================================= */}

//           <div className="bg-white/70 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl">

//             <label className="text-base sm:text-lg font-medium text-gray-800">
//               Booking Type
//             </label>

//             <select
//               className="mt-2 sm:mt-3 w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none text-gray-700"
//               value={bookingType}
//               onChange={(e) =>
//                 setBookingType(e.target.value)
//               }
//             >
//               <option value="offline">
//                 Offline Booking
//               </option>
//             </select>

//           </div>

//           {/* =================================================
//               CONTACT
//           ================================================= */}

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

//             <div className="bg-white/70 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl">

//               <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">
//                 Contact Email
//               </label>

//               <input
//                 type="email"
//                 className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
//                 placeholder="your@email.com"
//                 value={contact.email}
//                 onChange={(e) =>
//                   setContact((prev) => ({
//                     ...prev,
//                     email: e.target.value,
//                   }))
//                 }
//               />

//             </div>

//             <div className="bg-white/70 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl">

//               <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">
//                 Mobile Number
//               </label>

//               <input
//                 type="tel"
//                 className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
//                 placeholder="Mobile number"
//                 value={contact.mobile}
//                 onChange={(e) =>
//                   setContact((prev) => ({
//                     ...prev,
//                     mobile: e.target.value,
//                   }))
//                 }
//               />

//             </div>

//           </div>

//           {/* =================================================
//               BILLING ADDRESS
//           ================================================= */}

//           <div className="bg-white/70 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl">

//             <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
//               Billing Address (Optional)
//             </h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

//               {[
//                 ["addressLine1", "Address Line 1"],
//                 ["addressLine2", "Address Line 2"],
//                 ["city", "City"],
//                 ["state", "State"],
//                 ["pincode", "Pincode"],
//                 ["country", "Country"],
//               ].map(([field, placeholder]) => (
//                 <input
//                   key={field}
//                   type="text"
//                   placeholder={placeholder}
//                   className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                   value={billingAddress[field]}
//                   onChange={(e) =>
//                     setBillingAddress(
//                       (prev) => ({
//                         ...prev,
//                         [field]:
//                           e.target.value,
//                       })
//                     )
//                   }
//                 />
//               ))}

//             </div>
//           </div>

//           {/* =================================================
//               TRAVELLERS
//           ================================================= */}

//           <div>

//             <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
//               Traveller Details
//             </h2>

//             {travellers.map(
//               (traveller, index) => {

//                 const selectedPackage =
//                   traveller.packageType === "main"
//                     ? tourInfo
//                     : tourInfo.variantPackage?.[
//                         traveller.variantPackageIndex
//                       ];

//                 const trainDetails =
//                   selectedPackage?.trainDetails || [];

//                 return (
//                   <div
//                     key={index}
//                     className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 sm:p-8 mb-4 sm:mb-6 transition-all duration-500 hover:shadow-xl border border-indigo-100"
//                   >

//                     {/* Traveller Header */}

//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">

//                       <h3 className="text-lg sm:text-xl font-semibold text-indigo-800">
//                         Traveller {index + 1}
//                       </h3>

//                       {travellers.length > 1 && (
//                         <button
//                           onClick={() =>
//                             removeTraveller(index)
//                           }
//                           className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
//                         >
//                           Remove Traveller
//                         </button>
//                       )}

//                     </div>

//                     {/* Traveller basic details */}

//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 mb-4 sm:mb-6">

//                       <select
//                         className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                         value={
//                           traveller.packageType ===
//                           "main"
//                             ? "main"
//                             : traveller.variantPackageIndex
//                         }
//                         onChange={(e) => {
//                           const value =
//                             e.target.value;

//                           if (value === "main") {
//                             handleTravellerChange(
//                               index,
//                               "packageType",
//                               "main"
//                             );

//                             handleTravellerChange(
//                               index,
//                               "variantPackageIndex",
//                               null
//                             );
//                           } else {
//                             handleTravellerChange(
//                               index,
//                               "packageType",
//                               "variant"
//                             );

//                             handleTravellerChange(
//                               index,
//                               "variantPackageIndex",
//                               Number(value)
//                             );
//                           }
//                         }}
//                       >

//                         <option value="main">
//                           Main Package
//                         </option>

//                         {tourInfo.variantPackage?.map(
//                           (pkg, i) => (
//                             <option
//                               key={i}
//                               value={i}
//                             >
//                               Variant {i + 1} (
//                               {pkg.destination?.join(
//                                 ", "
//                               )}
//                               )
//                             </option>
//                           )
//                         )}

//                       </select>

//                       <select
//                         value={traveller.title}
//                         onChange={(e) =>
//                           handleTravellerChange(
//                             index,
//                             "title",
//                             e.target.value
//                           )
//                         }
//                         className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                       >
//                         <option>Mr</option>
//                         <option>Mrs</option>
//                         <option>Ms</option>
//                       </select>

//                       <input
//                         type="text"
//                         placeholder="First Name (As per Aadhar)"
//                         className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                         value={traveller.firstName}
//                         onChange={(e) =>
//                           handleTravellerChange(
//                             index,
//                             "firstName",
//                             e.target.value
//                           )
//                         }
//                       />

//                       <input
//                         type="text"
//                         placeholder="Last Name (As per Aadhar)"
//                         className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                         value={traveller.lastName}
//                         onChange={(e) =>
//                           handleTravellerChange(
//                             index,
//                             "lastName",
//                             e.target.value
//                           )
//                         }
//                       />

//                       <input
//                         type="number"
//                         placeholder="Age"
//                         className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                         value={traveller.age}
//                         onChange={(e) =>
//                           handleTravellerChange(
//                             index,
//                             "age",
//                             e.target.value
//                           )
//                         }
//                       />

//                       <select
//                         value={traveller.gender}
//                         onChange={(e) =>
//                           handleTravellerChange(
//                             index,
//                             "gender",
//                             e.target.value
//                           )
//                         }
//                         className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                       >
//                         <option value="">
//                           Gender
//                         </option>
//                         <option>Male</option>
//                         <option>Female</option>
//                         <option>Other</option>
//                       </select>

//                     </div>

//                     {/* Boarding / Deboarding */}

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mb-4 sm:mb-6">

//                       <div>

//                         <label className="block font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
//                           Boarding Point
//                         </label>

//                         <select
//                           className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                           value={
//                             traveller.boardingPoint
//                               ?.stationCode || ""
//                           }
//                           onChange={(e) => {

//                             const selectedPackage =
//                               traveller.packageType ===
//                               "main"
//                                 ? tourInfo
//                                 : tourInfo
//                                     .variantPackage?.[
//                                     traveller.variantPackageIndex
//                                   ];

//                             const selectedBP =
//                               selectedPackage?.boardingPoints?.find(
//                                 (bp) =>
//                                   bp.stationCode ===
//                                   e.target.value
//                               );

//                             handleTravellerChange(
//                               index,
//                               "boardingPoint",
//                               selectedBP || null
//                             );
//                           }}
//                         >

//                           <option value="">
//                             Select Boarding Point
//                           </option>

//                           {(traveller.packageType ===
//                           "main"
//                             ? tourInfo.boardingPoints
//                             : tourInfo.variantPackage?.[
//                                 traveller
//                                   .variantPackageIndex
//                               ]?.boardingPoints ||
//                               []
//                           )?.map((bp, i) => (
//                             <option
//                               key={i}
//                               value={bp.stationCode}
//                             >
//                               {bp.stationCode} -{" "}
//                               {bp.stationName}
//                             </option>
//                           ))}

//                         </select>

//                       </div>

//                       <div>

//                         <label className="block font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
//                           Deboarding Point
//                         </label>

//                         <select
//                           className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                           value={
//                             traveller.deboardingPoint
//                               ?.stationCode || ""
//                           }
//                           onChange={(e) => {

//                             const selectedPackage =
//                               traveller.packageType ===
//                               "main"
//                                 ? tourInfo
//                                 : tourInfo
//                                     .variantPackage?.[
//                                     traveller.variantPackageIndex
//                                   ];

//                             const selectedDP =
//                               selectedPackage?.deboardingPoints?.find(
//                                 (dp) =>
//                                   dp.stationCode ===
//                                   e.target.value
//                               );

//                             handleTravellerChange(
//                               index,
//                               "deboardingPoint",
//                               selectedDP || null
//                             );
//                           }}
//                         >

//                           <option value="">
//                             Select Deboarding Point
//                           </option>

//                           {(traveller.packageType ===
//                           "main"
//                             ? tourInfo.deboardingPoints
//                             : tourInfo.variantPackage?.[
//                                 traveller
//                                   .variantPackageIndex
//                               ]?.deboardingPoints ||
//                               []
//                           )?.map((dp, i) => (
//                             <option
//                               key={i}
//                               value={dp.stationCode}
//                             >
//                               {dp.stationCode} -{" "}
//                               {dp.stationName}
//                             </option>
//                           ))}

//                         </select>

//                       </div>

//                     </div>

//                     {/* Sharing */}

//                     <div className="mb-6">

//                       <label className="block font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
//                         Sharing Type
//                       </label>

//                       <select
//                         value={traveller.sharingType}
//                         onChange={(e) =>
//                           handleTravellerChange(
//                             index,
//                             "sharingType",
//                             e.target.value
//                           )
//                         }
//                         className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
//                       >

//                         <option value="">
//                           Select Sharing
//                         </option>

//                         {Number(
//                           traveller.age
//                         ) >= 11 ? (
//                           <>
//                             <option value="double">
//                               Double Sharing
//                             </option>

//                             <option value="triple">
//                               Triple Sharing
//                             </option>
//                           </>
//                         ) : Number(
//                             traveller.age
//                           ) >= 6 &&
//                           Number(
//                             traveller.age
//                           ) <= 10 ? (
//                           <>
//                             <option value="withBerth">
//                               Child with Berth
//                             </option>

//                             <option value="withoutBerth">
//                               Child without Berth
//                             </option>
//                           </>
//                         ) : null}

//                       </select>

//                     </div>

//                     {/* =================================================
//                         NEW TRAIN / TRIP ADDONS UI
//                     ================================================= */}

//                     <div className="mt-6 pt-6 border-t border-gray-200">

//                       {/* Header */}

//                       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">

//                         <div>

//                           <div className="flex items-center gap-2">

//                             <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-lg">
//                               🚆
//                             </div>

//                             <h3 className="text-lg sm:text-xl font-bold text-gray-800">
//                               TRAIN / TRIP DETAILS
//                             </h3>

//                           </div>

//                           <p className="text-sm text-gray-500 mt-1">
//                             Select add-ons for each trip
//                           </p>

//                         </div>

//                         <div className="px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-100">

//                           <span className="text-sm font-semibold text-gray-600">
//                             TOTAL ADD ONS:
//                           </span>

//                           <span className="ml-2 text-base font-bold text-indigo-700">

//                             {currencySymbol}

//                             {(
//                               traveller.selectedAddons ||
//                               []
//                             ).reduce(
//                               (
//                                 total,
//                                 addon
//                               ) =>
//                                 total +
//                                 (Number(
//                                   addon.amount
//                                 ) || 0),
//                               0
//                             )}

//                           </span>

//                         </div>

//                       </div>

//                       {/* Train Cards */}

//                       {trainDetails.length > 0 ? (
//                         <div className="space-y-3">

//                           {trainDetails.map(
//                             (train, trainIndex) => {

//                               const trainAddons =
//                                 train.addons || [];

//                               return (
//                                 <div
//                                   key={
//                                     train._id ||
//                                     trainIndex
//                                   }
//                                   className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white hover:border-indigo-200 transition-all"
//                                 >

//                                   <div className="grid grid-cols-1 md:grid-cols-[60px_1fr_300px] gap-4 items-center">

//                                     {/* S.NO */}

//                                     <div className="flex md:justify-center">

//                                       <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">

//                                         {String(
//                                           trainIndex +
//                                             1
//                                         ).padStart(
//                                           2,
//                                           "0"
//                                         )}

//                                       </div>

//                                     </div>

//                                     {/* TRAIN DETAILS */}

//                                     <div>

//                                       <div className="flex flex-wrap items-center gap-2 mb-1">

//                                         {train.tripType && (
//                                           <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase">
//                                             {
//                                               train.tripType
//                                             }
//                                           </span>
//                                         )}

//                                       </div>

//                                       <h4 className="text-base sm:text-lg font-semibold text-gray-800">

//                                         {
//                                           train.trainName
//                                         }{" "}

//                                         <span className="text-gray-500 font-medium">
//                                           (
//                                           {
//                                             train.trainNo
//                                           }
//                                           )
//                                         </span>

//                                       </h4>

//                                       <p className="text-sm text-gray-500 mt-1">

//                                         {
//                                           train.fromStation
//                                         }{" "}

//                                         <span className="mx-2 text-gray-400">
//                                           →
//                                         </span>

//                                         {
//                                           train.toStation
//                                         }

//                                       </p>

//                                     </div>

//                                     {/* ADDON DROPDOWN */}

//                                     <div>

//                                       <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                                         Add-on
//                                       </label>

//                                       <select
//                                         className="w-full px-3.5 py-3 rounded-lg border border-gray-200 bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all"
//                                         value={getSelectedAddonForTrain(
//                                           traveller,
//                                           trainIndex
//                                         )}
//                                         onChange={(
//                                           e
//                                         ) =>
//                                           handleAddonChange(
//                                             index,
//                                             trainIndex,
//                                             e
//                                               .target
//                                               .value
//                                           )
//                                         }
//                                       >

//                                         <option value="">
//                                           No Add-on
//                                         </option>

//                                         {trainAddons.map(
//                                           (
//                                             addon
//                                           ) => (
//                                             <option
//                                               key={
//                                                 addon._id ||
//                                                 addon.id
//                                               }
//                                               value={
//                                                 addon._id ||
//                                                 addon.id
//                                               }
//                                             >

//                                               {
//                                                 addon.name
//                                               }{" "}

//                                               (
//                                               {
//                                                 currencySymbol
//                                               }
//                                               {
//                                                 addon.amount ||
//                                                   0
//                                               }
//                                               )

//                                             </option>
//                                           )
//                                         )}

//                                       </select>

//                                     </div>

//                                   </div>

//                                 </div>
//                               );
//                             }
//                           )}

//                         </div>
//                       ) : (
//                         <div className="border border-dashed border-gray-300 rounded-xl p-5 text-center">

//                           <p className="text-sm text-gray-500">
//                             No train / trip details
//                             available.
//                           </p>

//                         </div>
//                       )}

//                     </div>

//                     {/* Remarks */}

//                     <textarea
//                       className="w-full mt-6 px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 resize-none"
//                       rows="3"
//                       placeholder="Remarks (optional)"
//                       value={traveller.remarks}
//                       onChange={(e) =>
//                         handleTravellerChange(
//                           index,
//                           "remarks",
//                           e.target.value
//                         )
//                       }
//                     />

//                   </div>
//                 );
//               }
//             )}

//             {/* Add Traveller */}

//             <button
//               onClick={addTraveller}
//               className="bg-indigo-100 text-indigo-700 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium hover:bg-indigo-200 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto"
//             >
//               + Add Another Traveller
//             </button>

//           </div>

//           {/* =================================================
//               BOOKING SUMMARY
//           ================================================= */}

//           <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">

//             <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
//               Booking Summary
//             </h3>

//             <div className="space-y-3 sm:space-y-5 text-base sm:text-lg text-gray-700">

//               <div className="flex justify-between">
//                 <span>
//                   Advance Amount:
//                 </span>

//                 <strong className="text-indigo-700">
//                   {currencySymbol}
//                   {amounts.advance}/-
//                 </strong>
//               </div>

//               <div className="flex justify-between">
//                 <span>
//                   Balance Amount:
//                 </span>

//                 <strong className="text-indigo-700">
//                   {currencySymbol}
//                   {amounts.balance}/-
//                 </strong>
//               </div>

//               <div className="flex justify-between">
//                 <span>
//                   Add-ons Total:
//                 </span>

//                 <strong className="text-indigo-700">
//                   {currencySymbol}
//                   {amounts.addonsTotal}/-
//                 </strong>
//               </div>

//               <hr className="border-gray-200" />

//               <div className="flex justify-between text-xl sm:text-2xl font-bold text-gray-800 pt-2 sm:pt-3">

//                 <span>
//                   Total Payable:
//                 </span>

//                 <span className="text-indigo-800">
//                   {currencySymbol}
//                   {amounts.advance +
//                     amounts.balance}
//                   /-
//                 </span>

//               </div>

//             </div>
//           </div>

//           {/* =================================================
//               SUBMIT
//           ================================================= */}

//           <button
//             onClick={handleBooking}
//             disabled={isSubmitting}
//             className={`w-full py-4 sm:py-5 rounded-2xl text-white font-bold text-lg sm:text-xl transition-all duration-500 transform hover:scale-[1.02] shadow-xl ${
//               isSubmitting
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             } ${
//               isSubmitting
//                 ? ""
//                 : "hover:shadow-2xl"
//             }`}
//           >

//             {isSubmitting ? (
//               <span className="flex items-center justify-center gap-3">

//                 <svg
//                   className="animate-spin h-5 sm:h-6 w-5 sm:w-6"
//                   viewBox="0 0 24 24"
//                 >

//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                     fill="none"
//                   />

//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v8z"
//                   />

//                 </svg>

//                 Adding to Trolly...

//               </span>
//             ) : (
//               "Add to Trolly"
//             )}

//           </button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default TourBooking;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const TourBooking = () => {
  const { tourId } = useParams();
  const { tours, currencySymbol, backendUrl, token, userData } =
    useContext(TourAppContext);

  const [tourInfo, setTourInfo] = useState(null);
  const [bookingType, setBookingType] = useState("offline");

  const [transportPoints, setTransportPoints] = useState({
    boarding: [],
    deboarding: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [travellers, setTravellers] = useState([
    {
      title: "Mr",
      firstName: "",
      lastName: "",
      age: "",
      gender: "Male",
      sharingType: "double",
      selectedAddons: [],
      boardingPoint: null,
      deboardingPoint: null,
      remarks: "",
      packageType: "main",
      variantPackageIndex: null,
    },
  ]);

  const [amounts, setAmounts] = useState({
    advance: 0,
    balance: 0,
    addonsTotal: 0,
  });

  const [contact, setContact] = useState({
    email: userData?.email || "",
    mobile: userData?.mobile || "",
  });

  const [billingAddress, setBillingAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const STORAGE_KEY = `booking-draft-${tourId}`;

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const draft = JSON.parse(saved);

        if (draft.travellers?.length > 0) {
          setTravellers(draft.travellers);
        }

        if (draft.contact?.email || draft.contact?.mobile) {
          setContact(draft.contact);
        }

        if (draft.billingAddress?.city || draft.billingAddress?.pincode) {
          setBillingAddress(draft.billingAddress);
        }

        if (draft.bookingType) {
          setBookingType(draft.bookingType);
        }

        if (
          draft.travellers?.length > 0 ||
          draft.contact?.email ||
          draft.billingAddress?.addressLine1
        ) {
          toast.info("We restored your previous booking details 😊", {
            autoClose: 5000,
          });
        }
      } catch (e) {
        console.warn("Failed to restore booking draft:", e);
      }
    }
  }, [tourId]);

  useEffect(() => {
    if (tours.length > 0) {
      const t = tours.find((tour) => tour._id === tourId);

      if (!t) {
        toast.error("Tour not found.");
        return;
      }

      setTourInfo(t);

      setTransportPoints({
        boarding: t.boardingPoints || [],
        deboarding: t.deboardingPoints || [],
      });
    }
  }, [tours, tourId]);

  useEffect(() => {
    if (!tourInfo) return;

    let totalAdvance = 0;
    let totalBalance = 0;
    let totalAddons = 0;

    travellers.forEach((t) => {
      const age = Number(t.age);

      let travellerAdvance = 0;
      let travellerBalance = 0;

      const selectedPackage =
        t.packageType === "main"
          ? tourInfo
          : tourInfo.variantPackage?.[t.variantPackageIndex];

      if (!selectedPackage) return;

      if (age >= 11) {
        travellerAdvance = Number(selectedPackage.advanceAmount?.adult) || 0;

        if (t.sharingType === "double") {
          travellerBalance = Number(selectedPackage.balanceDouble) || 0;
        } else if (t.sharingType === "triple") {
          travellerBalance = Number(selectedPackage.balanceTriple) || 0;
        }
      } else if (age >= 6 && age <= 10) {
        travellerAdvance = Number(selectedPackage.advanceAmount?.child) || 0;

        if (t.sharingType === "withBerth") {
          travellerBalance =
            Number(selectedPackage.balanceChildWithBerth) || 0;
        } else if (t.sharingType === "withoutBerth") {
          travellerBalance =
            Number(selectedPackage.balanceChildWithoutBerth) || 0;
        }
      } else if (age >= 1 && age <= 5) {
        travellerAdvance = 0;
        travellerBalance = 0;
      }

      // Addons calculation — already generic over t.selectedAddons,
      // covers train-keyed AND flight-keyed entries the same way.
      const travellerAddons = Array.isArray(t.selectedAddons)
        ? t.selectedAddons
        : [];

      travellerAddons.forEach((addon) => {
        const addonPrice = Number(addon.amount) || 0;
        totalAddons += addonPrice;
        travellerAdvance += addonPrice;
      });

      totalAdvance += travellerAdvance;
      totalBalance += travellerBalance;
    });

    setAmounts({
      advance: totalAdvance,
      balance: totalBalance,
      addonsTotal: totalAddons,
    });
  }, [travellers, tourInfo]);

  const handleTravellerChange = (index, field, value) => {
    const updated = [...travellers];

    if (field === "title") {
      if (value === "Mr") {
        updated[index].gender = "Male";
      } else if (value === "Mrs" || value === "Ms") {
        updated[index].gender = "Female";
      }
    }

    if (field === "gender") {
      if (value === "Male") {
        updated[index].title = "Mr";
      } else if (value === "Female") {
        updated[index].title = "Ms";
      }
    }

    if (field === "age") {
      const age = Number(value);

      if (age > 85) {
        toast.error("Age cannot exceed 85 years.");
        return;
      }

      if (age >= 11) {
        updated[index].sharingType = "double";
      } else if (age >= 6 && age <= 10) {
        updated[index].sharingType = "withBerth";
      } else if (age >= 1 && age <= 5) {
        updated[index].sharingType = "withoutBerth";
      } else {
        updated[index].sharingType = "";
      }
    }

    updated[index][field] = value;

    if (field === "packageType" || field === "variantPackageIndex") {
      updated[index].boardingPoint = null;
      updated[index].deboardingPoint = null;
      updated[index].selectedAddons = [];
    }

    setTravellers(updated);
  };

  const addTraveller = () => {
    setTravellers([
      ...travellers,
      {
        title: "Mr",
        firstName: "",
        lastName: "",
        age: "",
        gender: "Male",
        sharingType: "",
        selectedAddons: [],
        boardingPoint: null,
        deboardingPoint: null,
        remarks: "",
        packageType: "main",
        variantPackageIndex: null,
      },
    ]);
  };

  const removeTraveller = (index) => {
    setTravellers(travellers.filter((_, i) => i !== index));
  };

  // TRAIN addon change — unchanged, exactly as before
  const handleAddonChange = (travellerIndex, trainIndex, addonId) => {
    const updated = [...travellers];
    const traveller = updated[travellerIndex];

    const selectedPackage =
      traveller.packageType === "main"
        ? tourInfo
        : tourInfo.variantPackage?.[traveller.variantPackageIndex];

    const train = selectedPackage?.trainDetails?.[trainIndex];
    if (!train) return;

    let selectedAddons = Array.isArray(traveller.selectedAddons)
      ? [...traveller.selectedAddons]
      : [];

    selectedAddons = selectedAddons.filter(
      (addon) => addon.trainIndex !== trainIndex,
    );

    if (!addonId) {
      updated[travellerIndex].selectedAddons = selectedAddons;
      setTravellers(updated);
      return;
    }

    const selectedAddon = train.addons?.find(
      (addon) => String(addon._id || addon.id) === String(addonId),
    );

    if (!selectedAddon) {
      updated[travellerIndex].selectedAddons = selectedAddons;
      setTravellers(updated);
      return;
    }

    selectedAddons.push({
      trainIndex,
      trainNo: train.trainNo,
      trainName: train.trainName,
      tripType: train.tripType,
      addonId: selectedAddon._id || selectedAddon.id,
      name: selectedAddon.name,
      amount: Number(selectedAddon.amount) || 0,
    });

    updated[travellerIndex].selectedAddons = selectedAddons;
    setTravellers(updated);
  };

  // FLIGHT addon change — new, mirrors train version exactly but keys
  // off `flightIndex` so both coexist in selectedAddons[] without collision.
  const handleFlightAddonChange = (travellerIndex, flightIndex, addonId) => {
    const updated = [...travellers];
    const traveller = updated[travellerIndex];

    const selectedPackage =
      traveller.packageType === "main"
        ? tourInfo
        : tourInfo.variantPackage?.[traveller.variantPackageIndex];

    const flight = selectedPackage?.flightDetails?.[flightIndex];
    if (!flight) return;

    let selectedAddons = Array.isArray(traveller.selectedAddons)
      ? [...traveller.selectedAddons]
      : [];

    selectedAddons = selectedAddons.filter(
      (addon) => addon.flightIndex !== flightIndex,
    );

    if (!addonId) {
      updated[travellerIndex].selectedAddons = selectedAddons;
      setTravellers(updated);
      return;
    }

    const selectedAddon = flight.addons?.find(
      (addon) => String(addon._id || addon.id) === String(addonId),
    );

    if (!selectedAddon) {
      updated[travellerIndex].selectedAddons = selectedAddons;
      setTravellers(updated);
      return;
    }

    selectedAddons.push({
      flightIndex,
      flightNo: flight.flightNo,
      airline: flight.airline,
      tripType: flight.tripType,
      addonId: selectedAddon._id || selectedAddon.id,
      name: selectedAddon.name,
      amount: Number(selectedAddon.amount) || 0,
    });

    updated[travellerIndex].selectedAddons = selectedAddons;
    setTravellers(updated);
  };

  const getSelectedAddonForTrain = (traveller, trainIndex) => {
    const selectedAddons = Array.isArray(traveller.selectedAddons)
      ? traveller.selectedAddons
      : [];

    return (
      selectedAddons.find((addon) => addon.trainIndex === trainIndex)
        ?.addonId || ""
    );
  };

  const getSelectedAddonForFlight = (traveller, flightIndex) => {
    const selectedAddons = Array.isArray(traveller.selectedAddons)
      ? traveller.selectedAddons
      : [];

    return (
      selectedAddons.find((addon) => addon.flightIndex === flightIndex)
        ?.addonId || ""
    );
  };

  const handleBooking = async () => {
    setIsSubmitting(true);

    if (!token) {
      toast.warning("Please login to continue booking");

      const draft = { travellers, contact, billingAddress, bookingType };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));

      navigate("/login", {
        state: { from: location.pathname + location.search },
        replace: true,
      });

      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 100);

      setIsSubmitting(false);
      return;
    }

    const emailRegex = /.+@.+\..+/;

    if (!emailRegex.test(contact.email)) {
      toast.error("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    const mobile = contact.mobile?.trim() || "";

    if (mobile && !/^[+\d\s()-]{8,20}$/.test(mobile)) {
      toast.error(
        "Mobile number should be 8–20 characters (digits, +, space, -, () allowed).",
      );
      setIsSubmitting(false);
      return;
    }

    for (let [idx, t] of travellers.entries()) {
      const age = Number(t.age);

      if (!t.firstName?.trim()) {
        toast.error(
          `Traveller ${idx + 1}: First Name is required (As per Aadhar).`,
        );
        setIsSubmitting(false);
        return;
      }

      if (!t.lastName?.trim()) {
        toast.error(
          `Traveller ${idx + 1}: Last Name is required (As per Aadhar).`,
        );
        setIsSubmitting(false);
        return;
      }

      if (isNaN(age) || age < 1) {
        toast.error(
          `Invalid age for traveller: ${t.firstName || "Unnamed"}. Age must be greater than 0.`,
        );
        setIsSubmitting(false);
        return;
      }

      if (age < 6) {
        toast.error(
          `Age must be at least 6 years for traveller: ${t.firstName || "Unnamed"}.`,
        );
        setIsSubmitting(false);
        return;
      }

      if (age > 85) {
        toast.error("Age cannot exceed 85 years.");
        setIsSubmitting(false);
        return;
      }

      if (!t.gender) {
        toast.error("Please select gender for all travellers.");
        setIsSubmitting(false);
        return;
      }

      if (!t.sharingType) {
        toast.error("Please select a sharing type for all travellers.");
        setIsSubmitting(false);
        return;
      }

      if (!t.boardingPoint) {
        toast.error("Please select a boarding point for all travellers.");
        setIsSubmitting(false);
        return;
      }

      if (!t.deboardingPoint) {
        toast.error("Please select a deboarding point for all travellers.");
        setIsSubmitting(false);
        return;
      }

      if (!t.packageType) {
        toast.error("Please select a package type for all travellers.");
        setIsSubmitting(false);
        return;
      }

      if (t.packageType === "variant" && t.variantPackageIndex === null) {
        toast.error(
          `Please select a variant package for traveller: ${t.firstName || "Unnamed"}.`,
        );
        setIsSubmitting(false);
        return;
      }
    }

    const billingData =
      billingAddress.addressLine1.trim() ||
      billingAddress.city.trim() ||
      billingAddress.state.trim() ||
      billingAddress.pincode.trim()
        ? billingAddress
        : null;

    try {
      const payload = {
        userId: userData._id,
        tourId,
        bookingType,
        contact,
        billingAddress: billingData,

        travellers: travellers.map((t) => ({
          ...t,
          boardingPoint: t.boardingPoint,
          deboardingPoint: t.deboardingPoint,

          // Now carries BOTH train-keyed entries (trainIndex/trainNo/
          // trainName) and flight-keyed entries (flightIndex/flightNo/
          // airline) side by side in the same array.
          selectedAddons: Array.isArray(t.selectedAddons)
            ? t.selectedAddons.map((addon) => ({
                trainIndex: addon.trainIndex,
                trainNo: addon.trainNo,
                trainName: addon.trainName,
                flightIndex: addon.flightIndex,
                flightNo: addon.flightNo,
                airline: addon.airline,
                tripType: addon.tripType,
                addonId: addon.addonId,
                name: addon.name,
                amount: Number(addon.amount) || 0,
              }))
            : [],

          remarks: t.remarks?.trim() || null,
          packageType: t.packageType,
          variantPackageIndex:
            t.packageType === "variant" ? t.variantPackageIndex : null,
        })),

        payment: {
          advance: { amount: amounts.advance },
          balance: { amount: amounts.balance },
        },
      };

      const { data } = await axios.post(
        `${backendUrl}/api/user/addtotrolly`,
        payload,
        { headers: { token } },
      );

      if (data.success) {
        toast.success(
          bookingType === "offline"
            ? "Offline booking added to My Trolly! Awaiting confirmation."
            : "Booking added to My Trolly! Complete payment from My Trolly.",
        );

        localStorage.removeItem(STORAGE_KEY);
        navigate("/my-trolly");

        setTimeout(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }, 100);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Booking failed. Please check traveller details.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!tourInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-xl text-gray-600 animate-pulse">
          Loading tour details...
        </p>
      </div>
    );
  }

  if (!tourInfo.available) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 text-center max-w-lg">
          <p className="text-2xl font-medium text-gray-700">
            This tour package is currently not available for booking.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      className="
        w-full 
        max-w-[98%] xs:max-w-[96%] sm:max-w-[98%] md:max-w-[96vw] 
        lg:max-w-[94vw] xl:max-w-[92vw] 2xl:max-w-[90vw]
        rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[3.5rem] xl:rounded-[4rem]
        backdrop-blur-xl bg-white/40 border border-white/50
        shadow-2xl md:shadow-[0_30px_90px_-15px_rgba(0,0,0,0.12)]
        overflow-hidden
        p-8 xs:p-10 sm:p-12 md:p-16 lg:p-20 xl:p-24
      "
    >
      <div className="max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 sm:p-8 md:p-10 mb-6 sm:mb-8 md:mb-10 text-center transition-all duration-500 hover:shadow-xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
            {tourInfo.title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-4">
            {tourInfo.duration?.days} Days / {tourInfo.duration?.nights}{" "}
            Nights
          </p>

          <div className="mb-6">
            <p className="text-base sm:text-lg font-medium text-gray-700">
              Main Package Departure
            </p>

            <p className="text-lg sm:text-xl text-indigo-700 font-semibold">
              {formatDate(tourInfo.lastBookingDate)}
            </p>
          </div>

          {tourInfo.variantPackage && tourInfo.variantPackage.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-base sm:text-lg font-medium text-gray-700 mb-4">
                Variant Package Departures
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tourInfo.variantPackage.map((variant, i) => (
                  <div key={i} className="bg-indigo-50/70 rounded-xl p-4 text-left">
                    <p className="text-sm sm:text-base font-medium text-gray-800">
                      Variant {i + 1}
                    </p>

                    {variant.destination && (
                      <p className="text-sm text-gray-600 mt-1">
                        {variant.destination.join(", ")}
                      </p>
                    )}

                    <p className="text-base sm:text-lg text-indigo-700 font-semibold mt-2">
                      Departure: {formatDate(variant.lastBookingDate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mb-8 px-6 py-5 bg-amber-50 border border-amber-300 rounded-2xl text-amber-900 shadow-md">
          <p className="text-center font-medium leading-relaxed">
            <span className="font-semibold">Important Notice:</span> To avoid
            higher payment gateway charges, we are currently processing all
            bookings in offline mode only.
            <br />
            Please proceed with{" "}
            <span className="font-semibold">Offline Booking</span>. We will
            immediately share the payment details via WhatsApp once you
            confirm. Kindly complete the payment and inform us for instant
            booking confirmation. Thank you for your understanding.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="bg-white/70 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl">
            <label className="text-base sm:text-lg font-medium text-gray-800">
              Booking Type
            </label>

            <select
              className="mt-2 sm:mt-3 w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none text-gray-700"
              value={bookingType}
              onChange={(e) => setBookingType(e.target.value)}
            >
              <option value="offline">Offline Booking</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/70 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl">
              <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">
                Contact Email
              </label>

              <input
                type="email"
                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
                placeholder="your@email.com"
                value={contact.email}
                onChange={(e) =>
                  setContact((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div className="bg-white/70 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl">
              <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">
                Mobile Number
              </label>

              <input
                type="tel"
                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none"
                placeholder="Mobile number"
                value={contact.mobile}
                onChange={(e) =>
                  setContact((prev) => ({ ...prev, mobile: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
              Billing Address (Optional)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                ["addressLine1", "Address Line 1"],
                ["addressLine2", "Address Line 2"],
                ["city", "City"],
                ["state", "State"],
                ["pincode", "Pincode"],
                ["country", "Country"],
              ].map(([field, placeholder]) => (
                <input
                  key={field}
                  type="text"
                  placeholder={placeholder}
                  className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                  value={billingAddress[field]}
                  onChange={(e) =>
                    setBillingAddress((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
              Traveller Details
            </h2>

            {travellers.map((traveller, index) => {
              const selectedPackage =
                traveller.packageType === "main"
                  ? tourInfo
                  : tourInfo.variantPackage?.[traveller.variantPackageIndex];

              const trainDetails = selectedPackage?.trainDetails || [];

              // Only flights that actually have at least one addon
              // configured are shown — a flight leg with no addons
              // doesn't need a "No Add-on" dropdown cluttering the page.
              // We keep the ORIGINAL index (flightIndexInPackage) from
              // the full flightDetails array so handleFlightAddonChange
              // / getSelectedAddonForFlight still refer to the right
              // flight even though we're rendering a filtered subset.
              const flightDetailsAll = selectedPackage?.flightDetails || [];

              const flightsWithAddons = flightDetailsAll
                .map((flight, flightIndexInPackage) => ({
                  flight,
                  flightIndexInPackage,
                }))
                .filter(
                  ({ flight }) =>
                    Array.isArray(flight.addons) && flight.addons.length > 0,
                );

              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 sm:p-8 mb-4 sm:mb-6 transition-all duration-500 hover:shadow-xl border border-indigo-100"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-indigo-800">
                      Traveller {index + 1}
                    </h3>

                    {travellers.length > 1 && (
                      <button
                        onClick={() => removeTraveller(index)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                      >
                        Remove Traveller
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 mb-4 sm:mb-6">
                    <select
                      className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                      value={
                        traveller.packageType === "main"
                          ? "main"
                          : traveller.variantPackageIndex
                      }
                      onChange={(e) => {
                        const value = e.target.value;

                        if (value === "main") {
                          handleTravellerChange(index, "packageType", "main");
                          handleTravellerChange(
                            index,
                            "variantPackageIndex",
                            null,
                          );
                        } else {
                          handleTravellerChange(
                            index,
                            "packageType",
                            "variant",
                          );
                          handleTravellerChange(
                            index,
                            "variantPackageIndex",
                            Number(value),
                          );
                        }
                      }}
                    >
                      <option value="main">Main Package</option>

                      {tourInfo.variantPackage?.map((pkg, i) => (
                        <option key={i} value={i}>
                          Variant {i + 1} ({pkg.destination?.join(", ")})
                        </option>
                      ))}
                    </select>

                    <select
                      value={traveller.title}
                      onChange={(e) =>
                        handleTravellerChange(index, "title", e.target.value)
                      }
                      className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                    >
                      <option>Mr</option>
                      <option>Mrs</option>
                      <option>Ms</option>
                    </select>

                    <input
                      type="text"
                      placeholder="First Name (As per Aadhar)"
                      className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                      value={traveller.firstName}
                      onChange={(e) =>
                        handleTravellerChange(
                          index,
                          "firstName",
                          e.target.value,
                        )
                      }
                    />

                    <input
                      type="text"
                      placeholder="Last Name (As per Aadhar)"
                      className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                      value={traveller.lastName}
                      onChange={(e) =>
                        handleTravellerChange(
                          index,
                          "lastName",
                          e.target.value,
                        )
                      }
                    />

                    <input
                      type="number"
                      placeholder="Age"
                      className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                      value={traveller.age}
                      onChange={(e) =>
                        handleTravellerChange(index, "age", e.target.value)
                      }
                    />

                    <select
                      value={traveller.gender}
                      onChange={(e) =>
                        handleTravellerChange(index, "gender", e.target.value)
                      }
                      className="px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                    >
                      <option value="">Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mb-4 sm:mb-6">
                    <div>
                      <label className="block font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
                        Boarding Point
                      </label>

                      <select
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                        value={traveller.boardingPoint?.stationCode || ""}
                        onChange={(e) => {
                          const selectedPackage =
                            traveller.packageType === "main"
                              ? tourInfo
                              : tourInfo.variantPackage?.[
                                  traveller.variantPackageIndex
                                ];

                          const selectedBP =
                            selectedPackage?.boardingPoints?.find(
                              (bp) => bp.stationCode === e.target.value,
                            );

                          handleTravellerChange(
                            index,
                            "boardingPoint",
                            selectedBP || null,
                          );
                        }}
                      >
                        <option value="">Select Boarding Point</option>

                        {(traveller.packageType === "main"
                          ? tourInfo.boardingPoints
                          : tourInfo.variantPackage?.[
                              traveller.variantPackageIndex
                            ]?.boardingPoints || []
                        )?.map((bp, i) => (
                          <option key={i} value={bp.stationCode}>
                            {bp.stationCode} - {bp.stationName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
                        Deboarding Point
                      </label>

                      <select
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                        value={traveller.deboardingPoint?.stationCode || ""}
                        onChange={(e) => {
                          const selectedPackage =
                            traveller.packageType === "main"
                              ? tourInfo
                              : tourInfo.variantPackage?.[
                                  traveller.variantPackageIndex
                                ];

                          const selectedDP =
                            selectedPackage?.deboardingPoints?.find(
                              (dp) => dp.stationCode === e.target.value,
                            );

                          handleTravellerChange(
                            index,
                            "deboardingPoint",
                            selectedDP || null,
                          );
                        }}
                      >
                        <option value="">Select Deboarding Point</option>

                        {(traveller.packageType === "main"
                          ? tourInfo.deboardingPoints
                          : tourInfo.variantPackage?.[
                              traveller.variantPackageIndex
                            ]?.deboardingPoints || []
                        )?.map((dp, i) => (
                          <option key={i} value={dp.stationCode}>
                            {dp.stationCode} - {dp.stationName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
                      Sharing Type
                    </label>

                    <select
                      value={traveller.sharingType}
                      onChange={(e) =>
                        handleTravellerChange(
                          index,
                          "sharingType",
                          e.target.value,
                        )
                      }
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                    >
                      <option value="">Select Sharing</option>

                      {Number(traveller.age) >= 11 ? (
                        <>
                          <option value="double">Double Sharing</option>
                          <option value="triple">Triple Sharing</option>
                        </>
                      ) : Number(traveller.age) >= 6 &&
                        Number(traveller.age) <= 10 ? (
                        <>
                          <option value="withBerth">Child with Berth</option>
                          <option value="withoutBerth">
                            Child without Berth
                          </option>
                        </>
                      ) : null}
                    </select>
                  </div>

                  {/* TRAIN / TRIP ADDONS UI — unchanged */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-lg">
                            🚆
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                            TRAIN / TRIP DETAILS
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Select add-ons for each trip
                        </p>
                      </div>

                      <div className="px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-100">
                        <span className="text-sm font-semibold text-gray-600">
                          TOTAL ADD ONS:
                        </span>
                        <span className="ml-2 text-base font-bold text-indigo-700">
                          {currencySymbol}
                          {(traveller.selectedAddons || []).reduce(
                            (total, addon) =>
                              total + (Number(addon.amount) || 0),
                            0,
                          )}
                        </span>
                      </div>
                    </div>

                    {trainDetails.length > 0 ? (
                      <div className="space-y-3">
                        {trainDetails.map((train, trainIndex) => {
                          const trainAddons = train.addons || [];

                          return (
                            <div
                              key={train._id || trainIndex}
                              className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white hover:border-indigo-200 transition-all"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-[60px_1fr_300px] gap-4 items-center">
                                <div className="flex md:justify-center">
                                  <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                                    {String(trainIndex + 1).padStart(2, "0")}
                                  </div>
                                </div>

                                <div>
                                  <div className="flex flex-wrap items-center gap-2 mb-1">
                                    {train.tripType && (
                                      <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase">
                                        {train.tripType}
                                      </span>
                                    )}
                                  </div>

                                  <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                                    {train.trainName}{" "}
                                    <span className="text-gray-500 font-medium">
                                      ({train.trainNo})
                                    </span>
                                  </h4>

                                  <p className="text-sm text-gray-500 mt-1">
                                    {train.fromStation}{" "}
                                    <span className="mx-2 text-gray-400">
                                      →
                                    </span>
                                    {train.toStation}
                                  </p>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Add-on
                                  </label>

                                  <select
                                    className="w-full px-3.5 py-3 rounded-lg border border-gray-200 bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all"
                                    value={getSelectedAddonForTrain(
                                      traveller,
                                      trainIndex,
                                    )}
                                    onChange={(e) =>
                                      handleAddonChange(
                                        index,
                                        trainIndex,
                                        e.target.value,
                                      )
                                    }
                                  >
                                    <option value="">No Add-on</option>

                                    {trainAddons.map((addon) => (
                                      <option
                                        key={addon._id || addon.id}
                                        value={addon._id || addon.id}
                                      >
                                        {addon.name} ({currencySymbol}
                                        {addon.amount || 0})
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="border border-dashed border-gray-300 rounded-xl p-5 text-center">
                        <p className="text-sm text-gray-500">
                          No train / trip details available.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* FLIGHT ADDONS UI — new, only shows when at least
                      one flight in the selected package has addons
                      configured. Mirrors the train block above, but
                      keyed off flightIndex. */}
                  {flightsWithAddons.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 text-lg">
                          ✈️
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                          FLIGHT DETAILS
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {flightsWithAddons.map(
                          ({ flight, flightIndexInPackage }) => (
                            <div
                              key={flight._id || flightIndexInPackage}
                              className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white hover:border-purple-200 transition-all"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-[60px_1fr_300px] gap-4 items-center">
                                <div className="flex md:justify-center">
                                  <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                                    {String(
                                      flightIndexInPackage + 1,
                                    ).padStart(2, "0")}
                                  </div>
                                </div>

                                <div>
                                  <div className="flex flex-wrap items-center gap-2 mb-1">
                                    {flight.tripType && (
                                      <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold uppercase">
                                        {flight.tripType}
                                      </span>
                                    )}
                                  </div>

                                  <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                                    {flight.airline}{" "}
                                    <span className="text-gray-500 font-medium">
                                      ({flight.flightNo})
                                    </span>
                                  </h4>

                                  <p className="text-sm text-gray-500 mt-1">
                                    {flight.fromAirport}
                                    <span className="mx-2 text-gray-400">
                                      →
                                    </span>
                                    {flight.toAirport}
                                  </p>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Add-on
                                  </label>

                                  <select
                                    className="w-full px-3.5 py-3 rounded-lg border border-gray-200 bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none text-sm transition-all"
                                    value={getSelectedAddonForFlight(
                                      traveller,
                                      flightIndexInPackage,
                                    )}
                                    onChange={(e) =>
                                      handleFlightAddonChange(
                                        index,
                                        flightIndexInPackage,
                                        e.target.value,
                                      )
                                    }
                                  >
                                    <option value="">No Add-on</option>

                                    {(flight.addons || []).map((addon) => (
                                      <option
                                        key={addon._id || addon.id}
                                        value={addon._id || addon.id}
                                      >
                                        {addon.name} ({currencySymbol}
                                        {addon.amount || 0})
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  <textarea
                    className="w-full mt-6 px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 resize-none"
                    rows="3"
                    placeholder="Remarks (optional)"
                    value={traveller.remarks}
                    onChange={(e) =>
                      handleTravellerChange(index, "remarks", e.target.value)
                    }
                  />
                </div>
              );
            })}

            <button
              onClick={addTraveller}
              className="bg-indigo-100 text-indigo-700 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium hover:bg-indigo-200 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto"
            >
              + Add Another Traveller
            </button>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
              Booking Summary
            </h3>

            <div className="space-y-3 sm:space-y-5 text-base sm:text-lg text-gray-700">
              <div className="flex justify-between">
                <span>Advance Amount:</span>
                <strong className="text-indigo-700">
                  {currencySymbol}
                  {amounts.advance}/-
                </strong>
              </div>

              <div className="flex justify-between">
                <span>Balance Amount:</span>
                <strong className="text-indigo-700">
                  {currencySymbol}
                  {amounts.balance}/-
                </strong>
              </div>

              <div className="flex justify-between">
                <span>Add-ons Total:</span>
                <strong className="text-indigo-700">
                  {currencySymbol}
                  {amounts.addonsTotal}/-
                </strong>
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-between text-xl sm:text-2xl font-bold text-gray-800 pt-2 sm:pt-3">
                <span>Total Payable:</span>
                <span className="text-indigo-800">
                  {currencySymbol}
                  {amounts.advance + amounts.balance}/-
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={isSubmitting}
            className={`w-full py-4 sm:py-5 rounded-2xl text-white font-bold text-lg sm:text-xl transition-all duration-500 transform hover:scale-[1.02] shadow-xl ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } ${isSubmitting ? "" : "hover:shadow-2xl"}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-3">
                <svg
                  className="animate-spin h-5 sm:h-6 w-5 sm:w-6"
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
                Adding to Trolly...
              </span>
            ) : (
              "Add to Trolly"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourBooking;

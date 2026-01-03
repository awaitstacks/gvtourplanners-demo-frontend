import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyBookings = () => {
  const { backendUrl, token, currencySymbol } = useContext(TourAppContext);
  const [bookings, setBookings] = useState([]);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [cancelPopup, setCancelPopup] = useState({
    show: false,
    bookingId: null,
    travellerId: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(10);
  const navigate = useNavigate();

  // Fetch user bookings
  const getUserBookings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/my-trolly`, {
        headers: { token },
      });
      if (data.success) {
        setBookings(data.bookings.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to fetch bookings");
    }
  };

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(10);
  }, [searchTerm, statusFilter]);

  // Confirm cancellation
  const confirmCancellation = async () => {
    const { bookingId, travellerId } = cancelPopup;
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-traveller`,
        { bookingId, travellerId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to cancel booking");
    } finally {
      setCancelPopup({ show: false, bookingId: null, travellerId: null });
    }
  };

  // Razorpay payment init
  const initPay = (order, bookingId, paymentType) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currencySymbol,
      name: "Tour Booking Payment",
      description: `${paymentType.toUpperCase()} Payment`,
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verifyRazorpay`,
            { ...response, bookingId, paymentType },
            { headers: { token } }
          );
          if (data.success) {
            toast.success(data.message);
            getUserBookings();
            navigate("/my-trolly");
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message || "Payment verification failed");
        }
      },
      theme: { color: "#2563EB" },
    };
    new window.Razorpay(options).open();
  };

  const bookingRazorpay = async (bookingId, paymentType) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { bookingId, paymentType },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order, bookingId, paymentType);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Payment initiation failed");
    }
  };

  useEffect(() => {
    if (token) getUserBookings();
  }, [token]);

  const slotDateFormat = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB") + " " + d.toLocaleTimeString();
  };

  // Check if all travellers are cancelled
  const allTravellersCancelled = (item) => {
    if (!item.travellers || item.travellers.length === 0) return false;

    return item.travellers.every((t) => {
      const byT = t?.cancelled?.byTraveller;
      const byA = t?.cancelled?.byAdmin;

      if (byA) return true;
      if (byT && byA) return true;

      return false;
    });
  };

  // Decide Pay Balance button
  const canShowBalanceButton = (item) => {
    if (item.bookingType !== "online") return false;
    if (!item.payment?.advance?.paid) return false;
    if (item.payment?.balance?.paid) return false;
    if (allTravellersCancelled(item)) return false;

    const travellers = item.travellers || [];
    const hasUserOnlyCancel = travellers.some(
      (t) => t?.cancelled?.byTraveller && !t?.cancelled?.byAdmin
    );
    return !hasUserOnlyCancel;
  };

  // Render booking status
  const renderStatus = (item) => {
    if (item.isBookingCompleted) return "Booking Completed";

    if (allTravellersCancelled(item)) return "Booking Cancelled";

    if (item.cancelled?.byTraveller) return "Booking cancelled by user";
    if (item.cancelled?.byAdmin) return "Booking rejected by admin";

    const hasPendingCancellation = item.travellers?.some(
      (t) => t?.cancelled?.byTraveller && !t?.cancelled?.byAdmin
    );
    if (hasPendingCancellation) return "Cancellation Requested";

    if (item.bookingType === "offline") {
      if (!item.payment?.advance?.paid) return "Awaiting Booking Confirmation";
      if (item.payment?.advance?.paid && !item.payment?.balance?.paid)
        return "Advance Received and booking reserved";
      if (item.payment?.advance?.paid)
        return "Balance Received and waiting for booking completion";
    }

    if (item.bookingType === "online") {
      if (!item.payment?.advance?.paid) return "Awaiting for Advance Payment";
      if (
        item.payment?.advance?.paid &&
        !item.payment?.advance?.paymentVerified
      )
        return "Advance Paid - Pending Verification";
      if (item.payment?.advance?.paid && !item.payment?.balance?.paid)
        return "Advance Paid and Booking reserved";
      if (
        item.payment?.balance?.paid &&
        !item.payment?.balance?.paymentVerified
      )
        return "Balance Paid - Pending Verification";
      if (item.payment?.balance?.paymentVerified)
        return "Balance paid, waiting for booking completion";
    }

    return "Pending";
  };

  // Filter bookings
  const filteredBookings = bookings.filter((item) => {
    const matchesTitle = item.tourData.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (!matchesTitle) return false;

    if (statusFilter === "all") return true;

    if (statusFilter !== "all" && allTravellersCancelled(item)) return false;

    let itemStatus = null;
    if (item.isBookingCompleted) {
      itemStatus = "completed";
    } else if (item.payment?.advance?.paid && !item.payment?.balance?.paid) {
      itemStatus = "balance";
    } else if (!item.payment?.advance?.paid) {
      itemStatus = "advance";
    }

    return itemStatus === statusFilter;
  });

  // Displayed bookings with pagination
  const displayedBookings = filteredBookings.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          My Trolly
        </h1>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by tour title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="advance">Advance Pending</option>
            <option value="balance">Balance Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="space-y-8">
          {displayedBookings.length === 0 ? (
            <p className="text-center text-gray-600 text-xl py-12">
              No bookings found.
            </p>
          ) : (
            displayedBookings.map((item) => (
              <div
                key={item._id}
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
              >
                <div
                  className="flex flex-col md:flex-row gap-6 cursor-pointer"
                  onClick={() =>
                    setExpandedBooking(
                      expandedBooking === item._id ? null : item._id
                    )
                  }
                >
                  <img
                    src={item.tourData.titleImage}
                    alt={item.tourData.title}
                    className="w-full md:w-48 h-32 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {item.tourData.title}
                    </h2>
                    <p className="text-gray-600 mb-1">
                      Duration: {item.tourData.duration?.days} Days /{" "}
                      {item.tourData.duration?.nights} Nights
                    </p>
                    <p className="text-gray-600 mb-1">
                      Booking Date: {slotDateFormat(item.bookingDate)}
                    </p>
                    <p className="text-indigo-700 font-medium">
                      Status: {renderStatus(item)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 justify-center md:justify-end">
                    {item.bookingType === "online" && (
                      <>
                        {allTravellersCancelled(item) ? (
                          <span className="px-4 py-2 bg-red-100 text-red-700 rounded-xl font-medium text-center">
                            Booking Cancelled
                          </span>
                        ) : (
                          <>
                            {!item.payment?.advance?.paid && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  bookingRazorpay(item._id, "advance");
                                }}
                                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl font-medium hover:bg-indigo-200 transition-all"
                              >
                                Pay Advance
                              </button>
                            )}
                            {canShowBalanceButton(item) && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  bookingRazorpay(item._id, "balance");
                                }}
                                className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-all"
                              >
                                Pay Balance
                              </button>
                            )}
                            {item.isBookingCompleted && (
                              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium text-center">
                                Booking Completed
                              </span>
                            )}
                          </>
                        )}
                      </>
                    )}

                    {item.bookingType === "offline" && (
                      <>
                        {allTravellersCancelled(item) ? (
                          <span className="px-4 py-2 bg-red-100 text-red-700 rounded-xl font-medium text-center">
                            Booking Cancelled
                          </span>
                        ) : (
                          <>
                            {!item.payment?.advance?.paid && (
                              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium text-center">
                                Awaiting Confirmation
                              </span>
                            )}
                            {item.payment?.advance?.paid &&
                              !item.payment?.balance?.paid && (
                                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium text-center">
                                  Advance Received
                                </span>
                              )}
                            {item.payment?.balance?.paid &&
                              !item.isBookingCompleted && (
                                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium text-center">
                                  Balance Received
                                </span>
                              )}
                            {item.isBookingCompleted && (
                              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium text-center">
                                Booking Completed
                              </span>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Expanded Traveller Details */}
                {expandedBooking === item._id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Traveller Details
                    </h3>
                    <div className="space-y-4">
                      {item.travellers?.map((traveller, idx) => {
                        const byT = traveller?.cancelled?.byTraveller;
                        const byA = traveller?.cancelled?.byAdmin;

                        let travellerBadge = null;
                        if (byT && byA) travellerBadge = "Cancelled";
                        else if (byT && !byA)
                          travellerBadge = "Cancellation Requested";
                        else if (!byT && byA)
                          travellerBadge = "Rejected by Admin";

                        return (
                          <div
                            key={idx}
                            className="bg-indigo-50/50 rounded-xl p-4 transition-all duration-300 hover:bg-indigo-100/50"
                          >
                            <p className="font-medium text-gray-800">
                              Name: {traveller.title} {traveller.firstName}{" "}
                              {traveller.lastName}
                            </p>
                            <p className="text-gray-600">
                              Age: {traveller.age} | Gender: {traveller.gender}
                            </p>
                            <p className="text-gray-600">
                              Package:{" "}
                              {traveller.packageType === "main"
                                ? "Main Package"
                                : `Variant ${
                                    traveller.variantPackageIndex + 1
                                  }`}
                            </p>
                            <p className="text-gray-600">
                              Sharing: {traveller.sharingType}
                            </p>
                            {traveller.selectedAddon && (
                              <p className="text-gray-600">
                                Add-ons: {traveller.selectedAddon.name} (+
                                {currencySymbol}
                                {traveller.selectedAddon.price})
                              </p>
                            )}
                            <p className="text-gray-600">
                              Boarding: {traveller.boardingPoint?.stationName} (
                              {traveller.boardingPoint?.stationCode})
                            </p>
                            <p className="text-gray-600">
                              Deboarding:{" "}
                              {traveller.deboardingPoint?.stationName} (
                              {traveller.deboardingPoint?.stationCode})
                            </p>
                            {traveller.remarks && (
                              <p className="text-gray-600">
                                Remarks: {traveller.remarks}
                              </p>
                            )}
                            {travellerBadge && (
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                                  travellerBadge === "Cancelled"
                                    ? "bg-red-100 text-red-700"
                                    : travellerBadge ===
                                      "Cancellation Requested"
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-purple-100 text-purple-700"
                                }`}
                              >
                                {travellerBadge}
                              </span>
                            )}
                            {!traveller.cancelled?.byTraveller &&
                              !traveller.cancelled?.byAdmin &&
                              item.payment?.advance?.paid && (
                                <button
                                  onClick={() =>
                                    setCancelPopup({
                                      show: true,
                                      bookingId: item._id,
                                      travellerId: traveller._id,
                                    })
                                  }
                                  className="mt-2 px-4 py-1 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-all"
                                >
                                  Cancel Traveller
                                </button>
                              )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {filteredBookings.length > visibleCount && (
            <div className="text-center py-8">
              <button
                onClick={handleShowMore}
                className="px-8 py-3 bg-indigo-100 text-indigo-700 rounded-xl font-medium hover:bg-indigo-200 transition-all shadow-md hover:shadow-lg"
              >
                Show More
              </button>
            </div>
          )}
        </div>

        {/* Cancel Confirmation Popup */}
        {cancelPopup.show && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-md w-full text-center transition-all duration-300 scale-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Confirm Cancellation?
              </h3>
              <p className="text-gray-600 mb-6">
                This action cannot be undone. Are you sure?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() =>
                    setCancelPopup({
                      show: false,
                      bookingId: null,
                      travellerId: null,
                    })
                  }
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmCancellation}
                  className="px-6 py-3 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-all"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

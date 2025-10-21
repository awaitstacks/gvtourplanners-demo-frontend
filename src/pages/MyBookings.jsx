import React, { useContext, useEffect, useState } from "react";
import { TourAppContext } from "../context/TourAppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const { backendUrl, token, getToursData } = useContext(TourAppContext);
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

  // Cancel booking for traveller
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
        getToursData();
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

  // Razorpay
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

  // ✅ Check if all travellers are cancelled
  const allTravellersCancelled = (item) => {
    if (!item.travellers || item.travellers.length === 0) return false;

    return item.travellers.every((t) => {
      const byT = t?.cancelled?.byTraveller;
      const byA = t?.cancelled?.byAdmin;

      // Must be cancelled by admin, OR cancelled by both
      if (byA) return true;
      if (byT && byA) return true;

      return false;
    });
  };

  // ✅ Decide Pay Balance button
  const canShowBalanceButton = (item) => {
    if (item.bookingType !== "online") return false;
    if (!item.payment?.advance?.paid) return false;
    if (item.payment?.balance?.paid) return false;
    if (allTravellersCancelled(item)) return false; // ⛔ Hide if all cancelled

    // Hide if user-only cancellation exists
    const travellers = item.travellers || [];
    const hasUserOnlyCancel = travellers.some(
      (t) => t?.cancelled?.byTraveller && !t?.cancelled?.byAdmin
    );
    return !hasUserOnlyCancel;
  };

  // ✅ Render booking status
  const renderStatus = (item) => {
    if (item.isBookingCompleted) return "Booking Completed";
    if (item.isTripCompleted) return "Trip Completed";

    if (allTravellersCancelled(item)) return "Booking Cancelled";

    if (item.cancelled.byTraveller) return "Booking cancelled by user";
    if (item.cancelled.byAdmin) return "Booking rejected by admin";

    if (item.bookingType === "offline") {
      if (!item.payment?.advance?.paid) return "Awaiting Booking Confirmation";
      if (item.payment?.advance?.paid && !item.payment?.balance?.paid)
        return "Advance Received and booking reserved";
      if (item.payment?.balance?.paid)
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
    // Title search
    const matchesTitle = item.tourData.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (!matchesTitle) return false;

    // Status filter
    if (statusFilter === "all") return true;

    // Exclude cancelled bookings for specific status filters
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
    <div className="px-4">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Trolly</p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by tour title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="advance">Advance Pending</option>
          <option value="balance">Balance Pending</option>
          <option value="completed">Booking Completed</option>
        </select>
      </div>

      <div>
        {displayedBookings.length === 0 && (
          <p className="text-center text-gray-500 py-6">No bookings found.</p>
        )}
        {displayedBookings.map((item, index) => (
          <div key={index} className="border-b py-4">
            <div
              className="grid grid-cols-[1fr_2fr_1fr] gap-4 sm:flex sm:gap-6 cursor-pointer"
              onClick={() =>
                setExpandedBooking(
                  expandedBooking === item._id ? null : item._id
                )
              }
            >
              <div>
                <img
                  className="w-32 h-24 object-cover rounded bg-indigo-50"
                  src={item.tourData.titleImage}
                  alt={item.tourData.title}
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.tourData.title}
                </p>
                <p className="text-xs mt-1">
                  Duration: {item.tourData.duration?.days} Days /
                  {item.tourData.duration?.nights} Nights
                </p>
                <p className="text-xs">
                  Booking Date: {slotDateFormat(item.bookingDate)}
                </p>
                <p className="text-xs font-medium mt-1 text-blue-600">
                  Status: {renderStatus(item)}
                </p>
              </div>

              {/* ✅ Action buttons */}
              <div className="flex flex-col gap-2 justify-end">
                {item.bookingType === "online" && (
                  <>
                    {allTravellersCancelled(item) ? (
                      <button className="sm:min-w-48 py-2 border rounded bg-red-500 text-white cursor-not-allowed">
                        Booking Cancelled
                      </button>
                    ) : (
                      <>
                        {!item.cancelled.byTraveller &&
                          !item.cancelled.byAdmin &&
                          !item.payment?.advance?.paid && (
                            <button
                              onClick={() =>
                                bookingRazorpay(item._id, "advance")
                              }
                              className="sm:min-w-48 py-2 border rounded text-white bg-blue-600 hover:bg-blue-700 transition-all"
                            >
                              Pay Advance
                            </button>
                          )}

                        {canShowBalanceButton(item) && (
                          <button
                            onClick={() => bookingRazorpay(item._id, "balance")}
                            className="sm:min-w-48 py-2 border rounded text-white bg-green-600 hover:bg-green-700 transition-all"
                          >
                            Pay Balance
                          </button>
                        )}

                        {item.isBookingCompleted && (
                          <button className="sm:min-w-48 px-3 py-2 border rounded bg-green-500 text-white cursor-not-allowed">
                            Booking Completed and confirmed
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}

                {item.bookingType === "offline" && (
                  <>
                    {allTravellersCancelled(item) ? (
                      <button className="sm:min-w-48 py-2 border rounded bg-red-500 text-white cursor-not-allowed">
                        Booking Cancelled
                      </button>
                    ) : (
                      <>
                        {!item.payment?.advance?.paid && (
                          <button className="sm:min-w-48 py-2 border rounded bg-gray-400 text-white cursor-not-allowed">
                            Awaiting Booking Confirmation
                          </button>
                        )}

                        {item.payment?.advance?.paid &&
                          !item.payment?.balance?.paid && (
                            <button className="sm:min-w-48 py-2 border rounded bg-green-500 text-white cursor-not-allowed">
                              Advance Payment Received
                            </button>
                          )}

                        {item.payment?.balance?.paid &&
                          !item.isBookingCompleted && (
                            <button className="sm:min-w-48 py-2 border rounded bg-green-500 text-white cursor-not-allowed">
                              Balance Payment Received
                            </button>
                          )}

                        {item.isBookingCompleted && (
                          <button className="sm:min-w-48 px-3 py-3 border rounded bg-green-500 text-white cursor-not-allowed">
                            Booking Completed and confirmed
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Travellers */}
            {expandedBooking === item._id && (
              <div className="bg-gray-50 p-4 mt-2 rounded-lg text-sm">
                <p className="font-semibold mb-2">Traveller Details</p>
                {item.travellers?.map((traveller, idx) => {
                  const byT = traveller?.cancelled?.byTraveller;
                  const byA = traveller?.cancelled?.byAdmin;

                  let travellerBadge = null;
                  if (byT && byA) {
                    travellerBadge = (
                      <span className="text-red-500 font-medium">
                        Traveller Cancelled
                      </span>
                    );
                  } else if (byT && !byA) {
                    travellerBadge = (
                      <span className="text-orange-500 font-medium">
                        Requested for Cancellation
                      </span>
                    );
                  } else if (!byT && byA) {
                    travellerBadge = (
                      <span className="text-purple-500 font-medium">
                        Booking Rejected by Admin
                      </span>
                    );
                  }

                  return (
                    <div
                      key={idx}
                      className="border-b py-2 flex justify-between"
                    >
                      <div>
                        <p>
                          Name: {traveller.firstName} {traveller.lastName}
                        </p>
                        <p>
                          Age: {traveller.age} | Gender: {traveller.gender}
                        </p>
                        <p>Sharing: {traveller.sharingType}</p>
                        {traveller.selectedAddon?.length > 0 && (
                          <p>
                            Add-ons:{" "}
                            {traveller.selectedAddon
                              .map((a) => a.name)
                              .join(", ")}
                          </p>
                        )}
                        {traveller.remarks && (
                          <p>Remarks: {traveller.remarks}</p>
                        )}
                      </div>

                      <div className="text-right">
                        {travellerBadge}

                        {!byT && !byA && item.payment?.advance?.paid && (
                          <button
                            onClick={() =>
                              setCancelPopup({
                                show: true,
                                bookingId: item._id,
                                travellerId: traveller._id,
                              })
                            }
                            className="text-red-500 underline"
                          >
                            Cancel Traveller
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {filteredBookings.length > visibleCount && (
          <div className="text-center py-6">
            <button
              onClick={handleShowMore}
              className="px-6 py-2 border rounded bg-blue-600 text-white hover:bg-blue-700 transition-all"
            >
              Show More Bookings
            </button>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {cancelPopup.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full">
            <p className="text-lg font-semibold mb-4">Confirm Cancellation?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCancelPopup({ show: false, bookingId: null })}
                className="px-4 py-2 border rounded"
              >
                No
              </button>
              <button
                onClick={confirmCancellation}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;

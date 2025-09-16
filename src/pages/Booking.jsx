import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const TourBooking = () => {
  const { tourId } = useParams();
  const { tours, currencySymbol, backendUrl, token, userData } =
    useContext(TourAppContext);

  const [tourInfo, setTourInfo] = useState(null);
  const [bookingType, setBookingType] = useState("online");

  const [travellers, setTravellers] = useState([
    {
      title: "Mr",
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      sharingType: "double",
      selectedAddon: null,
      boardingPoint: null, // will hold {stationCode, stationName}
      remarks: "",
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

  // Billing Address (optional - only sent if filled)
  const [billingAddress, setBillingAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (tours.length > 0) {
      const t = tours.find((tour) => tour._id === tourId);
      setTourInfo(t);
    }
  }, [tours, tourId]);

  useEffect(() => {
    if (!tourInfo) return;

    let baseAdvance = 0;
    let totalBalance = 0;
    let totalAddons = 0;

    travellers.forEach((t) => {
      baseAdvance += Number(tourInfo.advanceAmount) || 0;

      if (t.sharingType === "double")
        totalBalance += Number(tourInfo.balanceDouble) || 0;
      else if (t.sharingType === "triple")
        totalBalance += Number(tourInfo.balanceTriple) || 0;

      if (t.selectedAddon?.amount) {
        totalAddons += Number(t.selectedAddon.amount);
      } else if (t.selectedAddon?.price) {
        totalAddons += Number(t.selectedAddon.price);
      }
    });

    setAmounts({
      advance: baseAdvance + totalAddons,
      balance: totalBalance,
      addonsTotal: totalAddons,
    });
  }, [travellers, tourInfo]);

  const handleTravellerChange = (index, field, value) => {
    const updated = [...travellers];
    updated[index][field] = value;
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
        gender: "",
        sharingType: "double",
        selectedAddon: null,
        boardingPoint: null,
        remarks: "",
      },
    ]);
  };

  const removeTraveller = (index) => {
    setTravellers(travellers.filter((_, i) => i !== index));
  };

  const handleBooking = async () => {
    if (!token) {
      toast.warning("Login to continue");
      return navigate("/login");
    }
    if (!userData?._id) {
      return toast.error("User not found. Please re-login.");
    }

    const emailRegex = /.+@.+\..+/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(contact.email)) {
      return toast.error("Please enter a valid email address.");
    }

    if (!mobileRegex.test(contact.mobile)) {
      return toast.error("Please enter a valid 10-digit mobile number.");
    }

    // Boarding point validation
    for (let t of travellers) {
      if (!t.boardingPoint) {
        return toast.error("Please select boarding point for all travellers.");
      }
    }

    // Prepare billing address (only send if filled)
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
        billingAddress: billingData, // Optional
        travellers: travellers.map((t) => ({
          ...t,
          boardingPoint: t.boardingPoint, // { stationCode, stationName }
          selectedAddon: t.selectedAddon
            ? {
                name: t.selectedAddon.name,
                price:
                  Number(t.selectedAddon.amount) ||
                  Number(t.selectedAddon.price) ||
                  0,
              }
            : null,

          remarks: t.remarks?.trim() || null,
        })),
      };

      const { data } = await axios.post(
        `${backendUrl}/api/user/addtotrolly`,
        payload,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(
          bookingType === "offline"
            ? "Offline booking added to My Trolly! Awaiting confirmation."
            : "Booking added to My Trolly! Complete payment from My Trolly."
        );
        navigate("/my-trolly");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Booking failed. Please fill all traveller details.");
    }
  };

  if (!tourInfo) return <p>Loading tour...</p>;

  if (!tourInfo.available) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center text-red-600 font-semibold">
        This tour package is currently not available for booking.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-2">{tourInfo.title}</h1>
      <p className="text-gray-600 mb-4">
        Duration: {tourInfo.duration?.days} Days / {tourInfo.duration?.nights}{" "}
        Nights
      </p>
      <img
        src={tourInfo.titleImage}
        alt={tourInfo.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      {/* Booking Type */}
      <div className="mb-4">
        <label className="block font-medium">Booking Type</label>
        <select
          className="border rounded p-2 w-full"
          value={bookingType}
          onChange={(e) => setBookingType(e.target.value)}
        >
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      {/* Contact Info */}
      <div className="mb-4">
        <label className="block font-medium">Contact Email</label>
        <input
          type="email"
          className="border rounded p-2 w-full"
          placeholder="Enter contact email"
          value={contact.email}
          onChange={(e) =>
            setContact((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Mobile Number</label>
        <input
          type="tel"
          className="border rounded p-2 w-full"
          placeholder="Enter 10-digit mobile number"
          value={contact.mobile}
          onChange={(e) =>
            setContact((prev) => ({ ...prev, mobile: e.target.value }))
          }
        />
      </div>

      {/* Billing Address (optional) */}
      <div className="mb-4">
        <label className="block font-medium">Billing Address</label>
        <input
          type="text"
          className="border rounded p-2 w-full mb-2"
          placeholder="Address Line 1"
          value={billingAddress.addressLine1}
          onChange={(e) =>
            setBillingAddress((prev) => ({
              ...prev,
              addressLine1: e.target.value,
            }))
          }
        />
        <input
          type="text"
          className="border rounded p-2 w-full mb-2"
          placeholder="Address Line 2"
          value={billingAddress.addressLine2}
          onChange={(e) =>
            setBillingAddress((prev) => ({
              ...prev,
              addressLine2: e.target.value,
            }))
          }
        />
        <input
          type="text"
          className="border rounded p-2 w-full mb-2"
          placeholder="City"
          value={billingAddress.city}
          onChange={(e) =>
            setBillingAddress((prev) => ({ ...prev, city: e.target.value }))
          }
        />
        <input
          type="text"
          className="border rounded p-2 w-full mb-2"
          placeholder="State"
          value={billingAddress.state}
          onChange={(e) =>
            setBillingAddress((prev) => ({ ...prev, state: e.target.value }))
          }
        />
        <input
          type="text"
          className="border rounded p-2 w-full mb-2"
          placeholder="Pincode"
          value={billingAddress.pincode}
          onChange={(e) =>
            setBillingAddress((prev) => ({ ...prev, pincode: e.target.value }))
          }
        />
        <input
          type="text"
          className="border rounded p-2 w-full"
          placeholder="Country"
          value={billingAddress.country}
          onChange={(e) =>
            setBillingAddress((prev) => ({ ...prev, country: e.target.value }))
          }
        />
      </div>

      <h2 className="text-xl font-semibold mb-3">Travellers</h2>
      {travellers.map((traveller, index) => (
        <div key={index} className="border p-4 rounded mb-4">
          <div className="grid grid-cols-2 gap-3">
            <select
              value={traveller.title}
              onChange={(e) =>
                handleTravellerChange(index, "title", e.target.value)
              }
              className="border rounded p-2"
            >
              <option>Mr</option>
              <option>Mrs</option>
              <option>Ms</option>
            </select>
            <input
              type="text"
              placeholder="First Name (As per aadhar)"
              className="border rounded p-2"
              value={traveller.firstName}
              onChange={(e) =>
                handleTravellerChange(index, "firstName", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Last Name (As per aadhar)"
              className="border rounded p-2"
              value={traveller.lastName}
              onChange={(e) =>
                handleTravellerChange(index, "lastName", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Age"
              className="border rounded p-2"
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
              className="border rounded p-2"
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <select
              value={traveller.sharingType}
              onChange={(e) =>
                handleTravellerChange(index, "sharingType", e.target.value)
              }
              className="border rounded p-2"
            >
              <option value="double">Double Sharing</option>
              <option value="triple">Triple Sharing</option>
            </select>
          </div>

          {/* Boarding Point */}
          {tourInfo.boardingPoints?.length > 0 && (
            <select
              className="border rounded p-2 w-full mt-3"
              value={traveller.boardingPoint?.stationCode || ""}
              onChange={(e) => {
                const selectedBP = tourInfo.boardingPoints.find(
                  (bp) => bp.stationCode === e.target.value
                );
                handleTravellerChange(
                  index,
                  "boardingPoint",
                  selectedBP || null
                );
              }}
            >
              <option value="">Select Boarding Point</option>
              {tourInfo.boardingPoints.map((bp) => (
                <option key={bp._id || bp.stationCode} value={bp.stationCode}>
                  {bp.stationCode} - {bp.stationName}
                </option>
              ))}
            </select>
          )}

          {/* Add-ons */}
          {tourInfo.addons?.length > 0 && (
            <select
              className="border rounded p-2 w-full mt-3"
              value={
                traveller.selectedAddon?._id ||
                traveller.selectedAddon?.id ||
                ""
              }
              onChange={(e) => {
                const selected = tourInfo.addons.find(
                  (addon) =>
                    addon._id === e.target.value || addon.id === e.target.value
                );
                handleTravellerChange(index, "selectedAddon", selected || null);
              }}
            >
              <option value="">Select Add-ons</option>
              {tourInfo.addons.map((addon) => (
                <option
                  key={addon._id || addon.id}
                  value={addon._id || addon.id}
                >
                  {addon.name} (+{currencySymbol}
                  {addon.amount || addon.price})
                </option>
              ))}
            </select>
          )}

          {/* Remarks */}
          <textarea
            className="border rounded p-2 w-full mt-3"
            placeholder="Remarks (optional)"
            value={traveller.remarks}
            onChange={(e) =>
              handleTravellerChange(index, "remarks", e.target.value)
            }
          />

          {travellers.length > 1 && (
            <button
              onClick={() => removeTraveller(index)}
              className="text-red-500 text-sm mt-2"
            >
              Remove Traveller
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addTraveller}
        className="bg-gray-200 px-4 py-2 rounded mb-6"
      >
        + Add Traveller
      </button>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <p>
          Advance:{" "}
          <strong>
            {currencySymbol}
            {amounts.advance}/-
          </strong>
        </p>
        <p>
          Balance:{" "}
          <strong>
            {currencySymbol}
            {amounts.balance}/-
          </strong>
        </p>
        <p>
          Add-ons Total:{" "}
          <strong>
            {currencySymbol}
            {amounts.addonsTotal}/-
          </strong>
        </p>
        <hr className="my-2" />
        <p className="font-bold">
          Total Payable: {currencySymbol}
          {amounts.advance + amounts.balance}/-
        </p>
      </div>

      <button
        onClick={handleBooking}
        className="bg-primary text-white px-6 py-3 rounded w-full"
      >
        Add to Trolly
      </button>
    </div>
  );
};

export default TourBooking;

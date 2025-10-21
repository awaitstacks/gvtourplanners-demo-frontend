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
  const [transportPoints, setTransportPoints] = useState({
    boarding: [],
    deboarding: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for loading

  const [travellers, setTravellers] = useState([
    {
      title: "Mr",
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      sharingType: "double",
      selectedAddon: null,
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

  useEffect(() => {
    if (tours.length > 0) {
      const t = tours.find((tour) => tour._id === tourId);
      if (!t) {
        toast.error("Tour not found.");
        return;
      }
      setTourInfo(t);
      console.log("Tour Info:", t); // Debug: Log tourInfo to verify data

      // Set boarding and deboarding points
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

    travellers.forEach((t, index) => {
      const age = Number(t.age);
      let travellerAdvance = 0;
      let travellerBalance = 0;

      // Select package based on traveller's packageType
      const selectedPackage =
        t.packageType === "main"
          ? tourInfo
          : tourInfo.variantPackage?.[t.variantPackageIndex];

      if (!selectedPackage) {
        console.warn(`Invalid package for traveller ${index + 1}:`, {
          packageType: t.packageType,
          variantPackageIndex: t.variantPackageIndex,
        });
        return; // Skip if package is invalid
      }

      console.log(`Traveller ${index + 1} Package:`, selectedPackage); // Debug: Log selected package

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
          travellerBalance = Number(selectedPackage.balanceChildWithBerth) || 0;
        } else if (t.sharingType === "withoutBerth") {
          travellerBalance =
            Number(selectedPackage.balanceChildWithoutBerth) || 0;
        }
      } else if (age >= 1 && age <= 5) {
        travellerAdvance = 0; // No advance for age <= 5 to align with backend
        travellerBalance = 0; // No balance for age <= 5
      }

      if (t.selectedAddon?.amount) {
        const addonPrice = Number(t.selectedAddon.amount) || 0;
        totalAddons += addonPrice;
        travellerAdvance += addonPrice;
      }

      totalAdvance += travellerAdvance;
      totalBalance += travellerBalance;

      console.log(
        `Traveller ${
          index + 1
        } - Advance: ${travellerAdvance}, Balance: ${travellerBalance}, Addon: ${
          t.selectedAddon?.amount || 0
        }`
      );
    });

    setAmounts({
      advance: totalAdvance,
      balance: totalBalance,
      addonsTotal: totalAddons,
    });

    console.log("Calculated Amounts:", {
      advance: totalAdvance,
      balance: totalBalance,
      addonsTotal: totalAddons,
    });
  }, [travellers, tourInfo]);

  const handleTravellerChange = (index, field, value) => {
    const updated = [...travellers];
    updated[index][field] = value;

    if (field === "age") {
      const age = Number(value);
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

    // Reset boarding/deboarding points and add-ons when package changes
    if (field === "packageType" || field === "variantPackageIndex") {
      updated[index].boardingPoint = null;
      updated[index].deboardingPoint = null;
      updated[index].selectedAddon = null;
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
        gender: "",
        sharingType: "",
        selectedAddon: null,
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

  const handleBooking = async () => {
    setIsSubmitting(true); // Set loading state
    if (!token) {
      toast.warning("Login to continue");
      setIsSubmitting(false);
      return navigate("/login");
    }
    if (!userData?._id) {
      toast.error("User not found. Please re-login.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /.+@.+\..+/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(contact.email)) {
      toast.error("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (!mobileRegex.test(contact.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      setIsSubmitting(false);
      return;
    }

    for (let t of travellers) {
      const age = Number(t.age);
      if (isNaN(age) || age < 1) {
        toast.error(
          `Invalid age for traveller: ${
            t.firstName || "Unnamed"
          }. Age must be a number greater than 0.`
        );
        setIsSubmitting(false);
        return;
      }
      if (age < 6) {
        toast.error(
          `Invalid age for traveller: ${
            t.firstName || "Unnamed"
          }. Age must be greater than 5.`
        );
        setIsSubmitting(false);
        return;
      }
      if (age > 100) {
        toast.error("Please enter a realistic age.");
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
          `Please select a variant package for traveller: ${
            t.firstName || "Unnamed"
          }.`
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
          selectedAddon: t.selectedAddon
            ? {
                name: t.selectedAddon.name,
                price: Number(t.selectedAddon.amount) || 0,
              }
            : null,
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

      console.log("Booking Payload:", payload); // Debug: Log payload before sending

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
      toast.error(
        error.response?.data?.message ||
          "Booking failed. Please check traveller details."
      );
    } finally {
      setIsSubmitting(false); // Reset loading state
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
          <h3 className="text-lg font-semibold mb-2">Traveller {index + 1}</h3>
          <div className="grid grid-cols-2 gap-3">
            <select
              className="border rounded p-2"
              value={
                traveller.packageType === "main"
                  ? "main"
                  : traveller.variantPackageIndex
              }
              onChange={(e) => {
                const value = e.target.value;
                if (value === "main") {
                  handleTravellerChange(index, "packageType", "main");
                  handleTravellerChange(index, "variantPackageIndex", null);
                } else {
                  handleTravellerChange(index, "packageType", "variant");
                  handleTravellerChange(
                    index,
                    "variantPackageIndex",
                    Number(value)
                  );
                }
              }}
            >
              <option value="main">Main Package</option>
              {tourInfo.variantPackage?.length > 0 &&
                tourInfo.variantPackage.map((pkg, i) => (
                  <option key={i} value={i}>
                    Variant Package {i + 1} (
                    {pkg.destination?.join(", ") || "N/A"})
                  </option>
                ))}
            </select>

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
              <option value="">Select Sharing</option>
              {Number(traveller.age) >= 11 ? (
                <>
                  <option value="double">Double Sharing</option>
                  <option value="triple">Triple Sharing</option>
                </>
              ) : Number(traveller.age) >= 6 && Number(traveller.age) <= 10 ? (
                <>
                  <option value="withBerth">Child with Berth</option>
                  <option value="withoutBerth">Child without Berth</option>
                </>
              ) : (
                <>
                  <option value="double">Double Sharing</option>
                  <option value="triple">Triple Sharing</option>
                </>
              )}
            </select>
          </div>

          <h4 className="font-semibold mt-4">From journey Boarding Point</h4>
          <select
            className="border rounded p-2 w-full mt-3"
            value={traveller.boardingPoint?.stationCode || ""}
            onChange={(e) => {
              const selectedPackage =
                traveller.packageType === "main"
                  ? tourInfo
                  : tourInfo.variantPackage?.[traveller.variantPackageIndex];
              const selectedBP = selectedPackage?.boardingPoints?.find(
                (bp) => bp.stationCode === e.target.value
              );
              handleTravellerChange(index, "boardingPoint", selectedBP || null);
            }}
          >
            <option value="">Select Boarding Point</option>
            {(traveller.packageType === "main"
              ? tourInfo.boardingPoints
              : tourInfo.variantPackage?.[traveller.variantPackageIndex]
                  ?.boardingPoints || []
            )?.map((bp, i) => (
              <option key={i} value={bp.stationCode}>
                {bp.stationCode} - {bp.stationName}
              </option>
            ))}
          </select>

          <h4 className="font-semibold mt-4">
            Return journey Deboarding Point
          </h4>
          <select
            className="border rounded p-2 w-full mt-3"
            value={traveller.deboardingPoint?.stationCode || ""}
            onChange={(e) => {
              const selectedPackage =
                traveller.packageType === "main"
                  ? tourInfo
                  : tourInfo.variantPackage?.[traveller.variantPackageIndex];
              const selectedDP = selectedPackage?.deboardingPoints?.find(
                (dp) => dp.stationCode === e.target.value
              );
              handleTravellerChange(
                index,
                "deboardingPoint",
                selectedDP || null
              );
            }}
          >
            <option value="">Select Deboarding Point</option>
            {(traveller.packageType === "main"
              ? tourInfo.deboardingPoints
              : tourInfo.variantPackage?.[traveller.variantPackageIndex]
                  ?.deboardingPoints || []
            )?.map((dp, i) => (
              <option key={i} value={dp.stationCode}>
                {dp.stationCode} - {dp.stationName}
              </option>
            ))}
          </select>

          <h4 className="font-semibold mt-4">Add-ons</h4>
          <select
            className="border rounded p-2 w-full mt-3"
            value={
              traveller.selectedAddon?._id || traveller.selectedAddon?.id || ""
            }
            onChange={(e) => {
              const selectedPackage =
                traveller.packageType === "main"
                  ? tourInfo
                  : tourInfo.variantPackage?.[traveller.variantPackageIndex];
              const selected = selectedPackage?.addons?.find(
                (addon) =>
                  addon._id === e.target.value || addon.id === e.target.value
              );
              handleTravellerChange(index, "selectedAddon", selected || null);
            }}
          >
            <option value="">Select Add-ons</option>
            {(traveller.packageType === "main"
              ? tourInfo.addons
              : tourInfo.variantPackage?.[traveller.variantPackageIndex]
                  ?.addons || []
            )?.map((addon) => (
              <option key={addon._id || addon.id} value={addon._id || addon.id}>
                {addon.name} (+{currencySymbol}
                {addon.amount || 0})
              </option>
            ))}
          </select>

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
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
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
        className={`bg-primary text-white px-6 py-3 rounded w-full ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding to Trolly..." : "Add to Trolly"}
      </button>
    </div>
  );
};

export default TourBooking;

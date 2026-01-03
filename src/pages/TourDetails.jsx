import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TourAppContext } from "../context/TourAppContext.jsx";
import { toast } from "react-toastify";
import jsPDF from "jspdf";

const TourDetails = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const { tours, currencySymbol } = useContext(TourAppContext);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("animate-fade-up");
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(".animate-on-scroll")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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

  const handleBookNow = () => {
    if (!tour.available) {
      toast.error("This tour is not available for booking.");
      return;
    }
    setBookingLoading(true);
    setTimeout(() => {
      navigate(`/booking/${tour._id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setBookingLoading(false);
    }, 600);
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 15;
    let y = margin;

    const addText = (text, options = {}) => {
      const {
        size = 12,
        bold = false,
        color = "#000000",
        align = "left",
        lineHeight = 7,
      } = options;

      pdf.setFontSize(size);
      pdf.setFont("helvetica", bold ? "bold" : "normal");
      pdf.setTextColor(color);

      const splitText = pdf.splitTextToSize(text, pageWidth - margin * 2);
      pdf.text(splitText, margin, y, { align });

      y += splitText.length * lineHeight;

      if (y > pdf.internal.pageSize.getHeight() - margin) {
        pdf.addPage();
        y = margin;
      }
    };

    const addSectionTitle = (title) => {
      y += 5;
      addText(title, { size: 16, bold: true, color: "#1e40af" });
      y += 3;
    };

    const addBulletList = (items) => {
      items.forEach((item) => {
        addText(`• ${item}`, { size: 12 });
      });
      y += 5;
    };

    // Title & Basic Info
    addText(tour.title, { size: 20, bold: true, color: "#1e40af" });
    addText(
      `${tour.duration.days} Days / ${tour.duration.nights} Nights • Batch: ${tour.batch}`,
      { size: 14 }
    );
    y += 10;

    // Main Package
    addSectionTitle("MAIN TOUR PACKAGE");

    if (tour.destination?.length > 0) {
      addText("Journey Route", { size: 14, bold: true });
      addText(tour.destination.join(" → "), { size: 12 });
      y += 5;
    }

    addText("Tour Price (per person)", { size: 14, bold: true });
    addText(
      `Double Sharing: ${currencySymbol}${tour.price.doubleSharing?.toLocaleString()}`,
      { size: 12 }
    );
    addText(
      `Triple Sharing: ${currencySymbol}${tour.price.tripleSharing?.toLocaleString()}`,
      { size: 12 }
    );
    if (tour.price.childWithBerth)
      addText(
        `Child with Berth: ${currencySymbol}${tour.price.childWithBerth.toLocaleString()}`,
        { size: 12 }
      );
    if (tour.price.childWithoutBerth)
      addText(
        `Child without Berth: ${currencySymbol}${tour.price.childWithoutBerth.toLocaleString()}`,
        { size: 12 }
      );
    y += 5;

    addText("Advance Payment Required", { size: 14, bold: true });
    addText(
      `Adult: ${currencySymbol}${tour.advanceAmount.adult?.toLocaleString()}`,
      { size: 12 }
    );
    addText(`Child: ${currencySymbol}${tour.advanceAmount.child || 0}`, {
      size: 12,
    });
    y += 10;

    if (tour.departureDates?.length > 0) {
      addText("Tour Start Dates", { size: 14, bold: true });
      tour.departureDates.slice(0, 15).forEach((dep) => {
        addText(`• ${formatDate(dep.date)} (${dep.status || "Available"})`, {
          size: 11,
        });
      });
      y += 5;
    }

    if (tour.sightseeing?.length > 0) {
      addText("Sightseeing Highlights", { size: 14, bold: true });
      addBulletList(tour.sightseeing);
    }

    if (tour.itinerary?.length > 0) {
      addText("Day-wise Itinerary Summary", { size: 14, bold: true });
      tour.itinerary.forEach((day, i) => {
        const summary = day.length > 150 ? day.substring(0, 147) + "..." : day;
        addText(`Day ${i + 1}: ${summary}`, { size: 11 });
      });
      y += 5;
    }

    if (tour.trainDetails?.length > 0) {
      addText("Train Journey Details", { size: 14, bold: true });
      tour.trainDetails.forEach((t) => {
        addText(`${t.trainNo} - ${t.trainName}`, { size: 12, bold: true });
        addText(`Route: ${t.fromStation} → ${t.toStation}`, { size: 11 });
        addText(
          `Class: ${t.class} | Timing: ${t.departureTime} → ${t.arrivalTime}`,
          { size: 11 }
        );
        y += 3;
      });
    }

    if (tour.flightDetails?.length > 0) {
      addText("Flight Details", { size: 14, bold: true });
      tour.flightDetails.forEach((f) => {
        addText(`${f.airline} ${f.flightNo}`, { size: 12, bold: true });
        addText(`Route: ${f.fromAirport} → ${f.toAirport}`, { size: 11 });
        addText(
          `Class: ${f.class} | Timing: ${f.departureTime} → ${f.arrivalTime}`,
          { size: 11 }
        );
        y += 3;
      });
    }

    if (tour.boardingPoints?.length > 0 || tour.deboardingPoints?.length > 0) {
      addText("Boarding & Deboarding Points", { size: 14, bold: true });
      if (tour.boardingPoints?.length > 0) {
        addText("Boarding:", { size: 12, bold: true });
        addBulletList(
          tour.boardingPoints.map(
            (bp) => `${bp.stationName} (${bp.stationCode})`
          )
        );
      }
      if (tour.deboardingPoints?.length > 0) {
        addText("Deboarding:", { size: 12, bold: true });
        addBulletList(
          tour.deboardingPoints.map(
            (dp) => `${dp.stationName} (${dp.stationCode})`
          )
        );
      }
    }

    if (tour.addons?.length > 0) {
      addText("Optional Add-ons", { size: 14, bold: true });
      tour.addons.forEach((addon) => {
        addText(`• ${addon.name}: +${currencySymbol}${addon.amount}`, {
          size: 12,
        });
      });
      y += 5;
    }

    if (tour.remarks) {
      addText("Important Remarks", { size: 14, bold: true });
      addText(tour.remarks, { size: 12 });
      y += 10;
    }

    if (tour.includes?.length > 0) {
      addText("Package Includes", { size: 14, bold: true, color: "#166534" });
      addBulletList(tour.includes);
    }

    if (tour.excludes?.length > 0) {
      addText("Package Excludes", { size: 14, bold: true, color: "#991b1b" });
      addBulletList(tour.excludes);
    }

    // Variant Packages
    tour.variantPackage?.forEach((v, i) => {
      pdf.addPage();
      y = margin;
      addText(`VARIANT PACKAGE ${i + 1}`, {
        size: 18,
        bold: true,
        color: "#1e40af",
      });
      y += 8;

      addText(
        `Duration: ${v.duration.days} Days / ${v.duration.nights} Nights`,
        { size: 13 }
      );
      addText(
        `Double Sharing: ${currencySymbol}${v.price.doubleSharing?.toLocaleString()}`,
        { size: 13 }
      );

      if (v.sightseeing?.length > 0) {
        addText("Sightseeing", { size: 13, bold: true });
        addBulletList(v.sightseeing);
      }

      if (v.remarks) {
        addText("Remarks", { size: 13, bold: true });
        addText(v.remarks, { size: 12 });
      }
    });

    pdf.save(`${tour.title.replace(/[^a-z0-9]/gi, "_")}_Brochure.pdf`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  if (!tour) return null;
  if (!tour.available) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center px-6">
        <p className="text-3xl font-bold text-red-600 mb-6">
          Tour not available
        </p>
        <button
          onClick={() => navigate("/tours")}
          className="px-8 py-4 bg-indigo-600 text-white rounded-full font-medium"
        >
          Explore Tours
        </button>
      </div>
    );
  }

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
                  className={`mt-3 text-base font-medium ${
                    dep.status === "Available"
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
              {currencySymbol}
              {pkg.price.doubleSharing?.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-base">
            <span>Triple Sharing</span>
            <span className="font-bold text-indigo-700">
              {currencySymbol}
              {pkg.price.tripleSharing?.toLocaleString()}
            </span>
          </div>
          {pkg.price.childWithBerth && (
            <div className="flex justify-between text-base">
              <span>Child with Berth</span>
              <span className="font-bold text-indigo-700">
                {currencySymbol}
                {pkg.price.childWithBerth.toLocaleString()}
              </span>
            </div>
          )}
          {pkg.price.childWithoutBerth && (
            <div className="flex justify-between text-base">
              <span>Child without Berth</span>
              <span className="font-bold text-indigo-700">
                {currencySymbol}
                {pkg.price.childWithoutBerth.toLocaleString()}
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
              {currencySymbol}
              {pkg.advanceAmount.adult?.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-base">
            <span>Child</span>
            <span className="font-bold text-indigo-700">
              {currencySymbol}
              {pkg.advanceAmount.child || 0}
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
                  className="w-full text-left bg-gray-50 hover:bg-gray-100 px-6 py-4 flex justify-between items-center"
                >
                  <span className="font-semibold text-indigo-700">
                    Day {i + 1}
                  </span>
                  <span
                    className={`text-2xl text-indigo-700 transition-transform duration-300 ${
                      openItinerary[`${pkgKey}-${i}`] ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    openItinerary[`${pkgKey}-${i}`]
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

      {pkg.addons?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-5">
            Optional Add-ons
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {pkg.addons.map((addon, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm border text-center hover:shadow transition"
              >
                <p className="font-medium text-gray-800">{addon.name}</p>
                <p className="text-2xl font-bold text-indigo-700 mt-3">
                  + {currencySymbol}
                  {addon.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {pkg.includes?.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-green-800 mb-6">
              Package Includes
            </h3>
            <ul className="space-y-4">
              {pkg.includes.map((inc, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-2xl text-green-600 mt-1">✓</span>
                  <span className="text-gray-700">{inc}</span>
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
                  <span className="text-2xl text-red-600 mt-1">✗</span>
                  <span className="text-gray-700">{exc}</span>
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
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight">
              {tour.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8">
              {tour.duration.days} Days / {tour.duration.nights} Nights
            </p>
            {/* Fixed Button Alignment */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <button
                onClick={handleBookNow}
                disabled={bookingLoading}
                className={`relative px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg flex items-center justify-center gap-3 transition shadow-xl w-full sm:w-auto ${
                  bookingLoading
                    ? "opacity-80 cursor-not-allowed"
                    : "hover:bg-green-600"
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
              <button
                onClick={handleDownloadPDF}
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full text-lg hover:bg-blue-700 transition w-full sm:w-auto"
              >
                Download Brochure
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Gallery - Centered on Desktop */}
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

          {/* Route Map - Reduced Size */}
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
                    className="w-full text-left bg-indigo-50 hover:bg-indigo-100 px-6 py-5 rounded-xl flex justify-between items-center mb-4"
                  >
                    <span className="text-lg font-semibold text-indigo-800">
                      Variant Package {i + 1}
                    </span>
                    <span
                      className={`text-2xl transition-transform ${
                        openVariants[i] ? "rotate-180" : ""
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

          {/* Final CTA - Perfectly Aligned Buttons */}
          <section className="text-center py-16 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-3xl shadow-xl animate-on-scroll opacity-0">
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-6">
              Ready to Explore?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Secure your seat today for an unforgettable journey!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleBookNow}
                disabled={bookingLoading}
                className={`relative px-10 py-5 bg-green-500 text-white font-bold rounded-full text-xl flex items-center justify-center gap-3 transition shadow-2xl w-full sm:w-auto ${
                  bookingLoading
                    ? "opacity-80 cursor-not-allowed"
                    : "hover:bg-green-600"
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
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s ease, transform 1s ease;
        }
      `}</style>
    </>
  );
};

export default TourDetails;

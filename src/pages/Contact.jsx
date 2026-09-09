
import React from "react";

const Contact = () => {
  return (
     <div className="
        w-full 
        max-w-[98%] xs:max-w-[96%] sm:max-w-[98%] md:max-w-[96vw] 
        lg:max-w-[94vw] xl:max-w-[92vw] 2xl:max-w-[90vw]
        mx-auto
        rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[3.5rem] xl:rounded-[4rem]
        backdrop-blur-xl bg-white/40 border border-white/50
        shadow-2xl md:shadow-[0_30px_90px_-15px_rgba(0,0,0,0.12)]
        overflow-hidden
        p-8 xs:p-10 sm:p-12 md:p-16 lg:p-20 xl:p-24
      ">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Page Title */}
        <div className="text-center mb-12 md:mb-20 lg:mb-24">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
          >
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
              Us
            </span>
          </h1>
          <div className="w-16 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-[#E8A33D] to-blue-600" />
          <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            We're here to assist you in planning your dream journey
          </p>
        </div>

        <div className="glass-card rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl border border-white/50">
          <div className="text-center mb-10 md:mb-14">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2"
            >
              Get in Touch
            </h2>
            <p
              className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700"
            >
              GV - Tour Planners LLP
            </p>
          </div>

          {/* ── Row 1: four contact-method cards side by side ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
            {/* Address card */}
            <div className="contact-card group rounded-2xl p-7 md:p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ background: "rgba(255,255,255,0.6)", borderColor: "rgba(59,130,246,0.15)" }}>
              <div className="contact-icon w-12 h-12 md:w-14 md:h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-blue-600 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-200">
                <svg
                  className="w-6 h-6 md:w-7 md:h-7 text-blue-600 transition-colors duration-300 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p className="text-xs uppercase tracking-wider text-blue-600 font-semibold mb-2">
                Registered Office
              </p>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                23, Nehru Street,
                <br />
                Jaihindpuram,
                <br />
                Madurai - 625011
                <br />
                Tamil Nadu, India
              </p>
            </div>

            {/* Phone card */}
            <div className="contact-card group rounded-2xl p-7 md:p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ background: "rgba(255,255,255,0.6)", borderColor: "rgba(59,130,246,0.15)" }}>
              <div className="contact-icon w-12 h-12 md:w-14 md:h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-blue-600 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-200">
                <svg
                  className="w-6 h-6 md:w-7 md:h-7 text-blue-600 transition-colors duration-300 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <p className="text-xs uppercase tracking-wider text-blue-600 font-semibold mb-2">
                Customer Care
              </p>
              <a
                href="tel:+919003998648"
                className="block text-lg sm:text-xl font-bold text-gray-800 hover:text-blue-600 hover:translate-x-1 transition-all duration-300"
              >
                +91 90039 98648
              </a>
              <a
                href="tel:+919344457790"
                className="block text-lg sm:text-xl font-bold text-gray-800 hover:text-blue-600 hover:translate-x-1 transition-all duration-300 mt-1"
              >
                +91 93444 57790
              </a>
            </div>

            {/* WhatsApp card */}
            <div className="contact-card group rounded-2xl p-7 md:p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ background: "rgba(255,255,255,0.6)", borderColor: "rgba(37,211,102,0.2)" }}>
              <div className="contact-icon w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg" style={{ background: "rgba(37,211,102,0.15)" }}>
                <svg
                  className="w-6 h-6 md:w-7 md:h-7 transition-colors duration-300"
                  style={{ color: "#25D366" }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.868-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.94.556 3.752 1.517 5.28L2.06 22l4.868-1.432A9.945 9.945 0 0012.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.2a8.16 8.16 0 01-4.412-1.29l-.316-.19-3.152.927.945-3.075-.206-.319A8.155 8.155 0 013.8 12c0-4.522 3.678-8.2 8.201-8.2 4.522 0 8.199 3.678 8.199 8.2 0 4.523-3.677 8.2-8.199 8.2z"/>
                </svg>
              </div>
              <p className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: "#25D366" }}>
                WhatsApp
              </p>
              <a
                href="https://wa.me/919003998648"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg sm:text-xl font-bold text-gray-800 hover:translate-x-1 transition-all duration-300"
                onMouseEnter={(e) => (e.currentTarget.style.color = "#25D366")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                +91 90039 98648
              </a>
              <p className="text-gray-500 text-xs sm:text-sm mt-3">
                Chat with us instantly
              </p>
            </div>

            {/* Email card */}
            <div className="contact-card group rounded-2xl p-7 md:p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ background: "rgba(255,255,255,0.6)", borderColor: "rgba(59,130,246,0.15)" }}>
              <div className="contact-icon w-12 h-12 md:w-14 md:h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-blue-600 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-200">
                <svg
                  className="w-6 h-6 md:w-7 md:h-7 text-blue-600 transition-colors duration-300 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <p className="text-xs uppercase tracking-wider text-blue-600 font-semibold mb-2">
                Email Us
              </p>
              <a
                href="mailto:info@gvtourplanners.com"
                className="inline-block text-base sm:text-lg font-medium text-gray-800 hover:text-blue-600 hover:translate-x-1 transition-all duration-300 break-all focus:outline-none focus-visible:underline focus-visible:decoration-2 focus-visible:decoration-blue-500"
              >
                info@gvtourplanners.com
              </a>
              <p className="text-gray-500 text-xs sm:text-sm mt-3">
                We typically respond within a few hours ✨
              </p>
            </div>
          </div>

          {/* ── Row 2: Legal Info + Support Hours side by side ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div
              className="rounded-2xl p-6 md:p-8 border transition-all duration-300 hover:shadow-lg"
              style={{
                background: "rgba(232,163,61,0.08)",
                borderColor: "rgba(232,163,61,0.25)",
              }}
            >
              <p
                className="text-xs sm:text-sm uppercase tracking-wider font-bold mb-4"
                style={{ color: "#B3781E" }}
              >
                Legal Information
              </p>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <p className="text-xs text-gray-600">LLPIN</p>
                  <p className="text-sm sm:text-base font-bold text-gray-900 mt-1 font-mono tracking-wide">
                    ACK-2472
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">TAN</p>
                  <p className="text-sm sm:text-base font-bold text-gray-900 mt-1 font-mono tracking-wide">
                    MRIG03766A
                  </p>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-6 md:p-8 border transition-all duration-300 hover:shadow-lg"
              style={{
                background: "rgba(47,125,79,0.06)",
                borderColor: "rgba(47,125,79,0.18)",
              }}
            >
              <p className="text-xs sm:text-sm uppercase tracking-wider font-semibold mb-3" style={{ color: "#2F7D4F" }}>
                Support Hours
              </p>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 text-gray-700 text-sm sm:text-base">
                <span className="font-medium">Mon – Sat</span>
                <span>11:00 AM – 2:00 PM</span>
                <span>3:00 PM – 5:00 PM</span>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm italic mt-2">
                Closed on Sundays and Public Holidays
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FIXED: Removed `jsx global` → now using regular <style> */}
      <style>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-40px) rotate(8deg);
          }
        }
        .animate-float-slow {
          animation: float-slow 25s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        .delay-3000 {
          animation-delay: 3s;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }

        .contact-row {
          padding: 0.5rem;
          margin: -0.5rem;
          border-radius: 1rem;
          transition: background-color 0.3s ease;
        }
        .contact-row:hover {
          background-color: rgba(59, 130, 246, 0.04);
        }
      `}</style>
    </div>
  );
};

export default Contact;

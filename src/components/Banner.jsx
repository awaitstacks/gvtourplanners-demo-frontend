import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const bannerRef = useRef(null);

  // Smooth fade-in when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-up");
        }
      },
      { threshold: 0.2 }
    );

    if (bannerRef.current) observer.observe(bannerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleCreateAccount = () => {
    navigate("/login");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={bannerRef}
      className="relative my-20 md:my-28 lg:my-36 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 rounded-3xl shadow-lg mx-6 md:mx-10 lg:mx-20 opacity-0 translate-y-12 transition-all duration-1000 ease-out"
    >
      {/* Subtle calming orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-200/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-200/8 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="relative grid md:grid-cols-2 items-center gap-10 md:gap-16 px-8 py-16 md:px-16 lg:px-24">
        {/* Left: Text & CTA */}
        <div className="text-center md:text-left space-y-8 order-2 md:order-1">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Begin Your Journey
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                With Trusted Planners
              </span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Connect with experienced tour planners who craft peaceful,
              meaningful travel experiences just for you.
            </p>
          </div>

          <button
            onClick={handleCreateAccount}
            className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-base md:text-lg rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
          >
            Create Your Account
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Right: Beautiful Tour Vector Illustration */}
        <div className="flex justify-center order-1 md:order-2">
          <svg
            width="380"
            height="380"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-xl"
          >
            {/* Sky Background */}
            <rect width="400" height="400" rx="200" fill="#e0f2fe" />

            {/* Mountains */}
            <path
              d="M0 300 L100 180 L200 240 L300 160 L400 220 L400 400 L0 400 Z"
              fill="#93c5fd"
              opacity="0.6"
            />
            <path
              d="M50 280 L150 200 L250 260 L350 190 L400 240 L400 400 L0 400 Z"
              fill="#60a5fa"
              opacity="0.4"
            />

            {/* Sun */}
            <circle cx="320" cy="80" r="40" fill="#fbbf24" opacity="0.8" />
            <circle cx="320" cy="80" r="60" fill="#fbbf24" opacity="0.3" />

            {/* Traveler with Backpack */}
            <g transform="translate(180, 220)">
              {/* Body */}
              <ellipse cx="20" cy="80" rx="30" ry="60" fill="#3b82f6" />
              {/* Head */}
              <circle cx="20" cy="30" r="25" fill="#fcd34d" />
              {/* Hair */}
              <path
                d="M0 20 Q20 0 40 20 Q35 30 20 30 Q5 30 0 20"
                fill="#1e293b"
              />
              {/* Eyes */}
              <circle cx="12" cy="28" r="4" fill="#1e293b" />
              <circle cx="28" cy="28" r="4" fill="#1e293b" />
              {/* Smile */}
              <path
                d="M10 40 Q20 50 30 40"
                stroke="#1e293b"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              {/* Arms */}
              <rect
                x="0"
                y="70"
                width="15"
                height="50"
                rx="8"
                fill="#3b82f6"
                transform="rotate(-30 0 70)"
              />
              <rect
                x="25"
                y="70"
                width="15"
                height="50"
                rx="8"
                fill="#3b82f6"
                transform="rotate(30 40 70)"
              />
              {/* Backpack */}
              <rect
                x="-10"
                y="50"
                width="60"
                height="80"
                rx="20"
                fill="#ef4444"
              />
              <rect
                x="5"
                y="60"
                width="30"
                height="60"
                rx="10"
                fill="#dc2626"
              />
            </g>

            {/* Map in Hand */}
            <g transform="translate(240, 280)">
              <rect
                width="60"
                height="80"
                rx="10"
                fill="#fefce8"
                stroke="#f59e0b"
                strokeWidth="3"
              />
              <path
                d="M10 20 L30 10 L50 30"
                stroke="#f59e0b"
                strokeWidth="4"
                fill="none"
              />
              <circle cx="30" cy="50" r="8" fill="#ef4444" />
            </g>

            {/* Compass */}
            <g transform="translate(100, 300)">
              <circle cx="0" cy="0" r="40" fill="#1e293b" />
              <circle cx="0" cy="0" r="30" fill="#fefce8" />
              <path d="M0 -30 L10 0 L0 10 L-10 0 Z" fill="#ef4444" />
              <path d="M0 30 L8 8 L-8 8 Z" fill="#3b82f6" />
              <text
                x="0"
                y="5"
                textAnchor="middle"
                fontSize="12"
                fill="#1e293b"
                fontWeight="bold"
              >
                N
              </text>
            </g>

            {/* Pine Trees */}
            <path d="M50 340 L70 300 L90 340 Z" fill="#166534" />
            <path d="M45 360 L70 320 L95 360 Z" fill="#15803d" />
            <path d="M320 340 L340 300 L360 340 Z" fill="#166534" />
            <path d="M315 360 L340 320 L365 360 Z" fill="#15803d" />

            {/* Birds */}
            <path
              d="M80 100 Q90 90 100 100"
              stroke="#6366f1"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M280 120 Q290 110 300 120"
              stroke="#6366f1"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Smooth animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.08;
            transform: scale(1);
          }
          50% {
            opacity: 0.15;
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 18s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 3s;
        }
        .animate-fade-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
};

export default Banner;

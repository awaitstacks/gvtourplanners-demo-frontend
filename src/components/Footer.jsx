import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-blue-50/50 mt-20 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {/* Left: Logo & Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {/* Replace with your actual logo */}

              <img src="assets.logo" alt="" />
            </div>
            <p className="text-gray-600 leading-relaxed max-w-md">
              We craft peaceful, meaningful, and unforgettable travel
              experiences with care, trust, and a passion for exploration. Your
              journey begins here — with comfort, joy, and memories that last a
              lifetime.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-gray-800">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-600 hover:text-indigo-700 transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-indigo-700 transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/tours"
                  className="text-gray-600 hover:text-indigo-700 transition-colors duration-300"
                >
                  Tours
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-indigo-700 transition-colors duration-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Right: Get In Touch */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-gray-800">
              Get In Touch
            </h4>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-indigo-600"
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
                <span>+91 9003998648</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-indigo-600"
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
                <span>gvtourplanners@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm md:text-base">
            Crafted with{" "}
            <span className="text-red-500 text-lg animate-pulse">❤️</span> by{" "}
            <span className="font-medium text-indigo-700">AwaitStacks</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

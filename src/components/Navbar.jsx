import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import TourHeader from "../components/TourHeader";
import TourSpecialityMenu from "../components/TourSpecialityMenu";
import TopTours from "../components/TopTours";
// Import your actual Navbar component
// import Navbar from "../components/Navbar";

const TourHome = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to add fixed navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-in animation for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-reveal");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Floating watermark icons */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <div className="absolute top-1/4 left-8 text-8xl text-blue-300 animate-float-slow">
          📍
        </div>
        <div className="absolute top-1/3 right-16 text-9xl text-indigo-300 animate-float-slow delay-1000">
          🧳
        </div>
        <div className="absolute bottom-1/3 left-1/3 text-7xl text-blue-200 animate-float-slow delay-2000">
          🧭
        </div>
        <div className="absolute bottom-44 right-12 text-8xl text-indigo-200 animate-float-slow delay-3000">
          ✈️
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl text-blue-100 animate-float-slow delay-4000">
          🌍
        </div>
      </div>

      {/* Fixed Navbar - appears on scroll */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "translate-y-0 bg-white/90 backdrop-blur-md shadow-lg"
            : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Replace with your actual logo or brand */}
          <h1 className="text-2xl font-bold text-indigo-700">TourPlanner</h1>

          {/* Simple navigation links */}
          <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
            <a href="#home" className="hover:text-indigo-600 transition">
              Home
            </a>
            <a href="#tours" className="hover:text-indigo-600 transition">
              Tours
            </a>
            <a
              href="#specialities"
              className="hover:text-indigo-600 transition"
            >
              Specialities
            </a>
            <a href="#contact" className="hover:text-indigo-600 transition">
              Contact
            </a>
          </nav>

          {/* Mobile menu button (optional) */}
          <button className="md:hidden text-2xl">☰</button>
        </div>
      </div>

      {/* Add top padding to body content so it doesn't hide under fixed navbar */}
      <div
        className={`pt-20 ${
          isScrolled ? "pt-32" : "pt-20"
        } transition-all duration-500`}
      >
        <div className="relative z-10">
          <div className="scroll-reveal">
            <TourHeader />
          </div>

          <div className="scroll-reveal">
            <TourSpecialityMenu />
          </div>

          <div className="scroll-reveal">
            <TopTours />
          </div>

          <div className="scroll-reveal">
            <Banner />
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
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
        .delay-4000 {
          animation-delay: 4s;
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(100px);
          transition: all 1.6s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .animate-reveal {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

export default TourHome;

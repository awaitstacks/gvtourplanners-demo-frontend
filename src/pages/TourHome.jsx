// src/pages/TourHome.jsx
import React, { useEffect } from "react";
import Banner from "../components/Banner";
import TourHeader from "../components/TourHeader";
import TourSpecialityMenu from "../components/TourSpecialityMenu";
import TopTours from "../components/TopTours";

const TourHome = () => {
  // Strong, visible, blissful scroll-in animation for each section
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
        rootMargin: "0px 0px -80px 0px", // Starts animation a bit earlier
      }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Subtle floating watermark icons – kept exactly as you liked */}
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

      {/* Components with strong, smooth scroll-in reveal */}
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

      {/* Stronger, slower, more visible scroll-in animation */}
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

        /* Initial hidden state – starts lower for stronger movement */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(100px);
          transition: all 1.6s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        /* Revealed state – smooth, strong, blissful entrance */
        .animate-reveal {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

export default TourHome;

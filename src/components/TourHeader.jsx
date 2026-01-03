import React from "react";

const TourHeader = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white-50 via-white-50 to-white-100 py-24 md:py-36">
      {/* Very subtle calming wave pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(147,197,253,0.3)_0%,transparent_50%),radial-gradient(circle_at_70%_30%,rgba(165,180,252,0.2)_0%,transparent_50%)]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
        <div className="space-y-10 animate-fade-in">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Embark on a Journey
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
              of Peace & Discovery
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Let us take care of every detail while you relax and immerse
            yourself in beautiful destinations. Travel with comfort, confidence,
            and calm — the way it should be.
          </p>

          {/* Trust Element */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12">
            <div className="text-left sm:text-center">
              <p className="text-gray-700 font-medium text-lg">
                Trusted by thousands of travelers
              </p>
              <p className="text-gray-500 mt-1">
                4.7/5 from 600+ heartfelt reviews
              </p>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <a
              href="#speciality"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-10 py-5 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Explore Our Tours
            </a>
          </div>
        </div>
      </div>

      {/* Smooth fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in > * {
          opacity: 0;
          animation: fadeIn 1.2s ease-out forwards;
        }

        .animate-fade-in > *:nth-child(1) {
          animation-delay: 0.2s;
        }
        .animate-fade-in > *:nth-child(2) {
          animation-delay: 0.5s;
        }
        .animate-fade-in > *:nth-child(3) {
          animation-delay: 0.8s;
        }
        .animate-fade-in > *:nth-child(4) {
          animation-delay: 1.1s;
        }
      `}</style>
    </section>
  );
};

export default TourHeader;

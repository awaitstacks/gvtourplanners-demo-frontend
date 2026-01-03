import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Hero Heading */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
              Us
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Crafting meaningful journeys with care, trust, and passion for
            exploration.
          </p>
        </div>

        {/* Main Content - Image + Text */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          {/* Left: Image with subtle overlay */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-700/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700"></div>
            <img
              src="/team.png"
              alt="Peaceful travel landscape"
              className="w-full rounded-3xl shadow-2xl object-cover h-[500px] group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Right: Text Content */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Your Trusted Travel Companion
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                At{" "}
                <span className="font-semibold text-indigo-700">
                  GV - Tour Planners
                </span>
                , we believe travel is more than just visiting new places — it's
                about creating memories, finding peace, and experiencing the
                world with comfort and joy.
              </p>
              <p>
                Founded with a vision to make travel seamless and stress-free,
                we partner with experienced planners and trusted providers to
                offer curated tours that match your pace, preferences, and
                dreams.
              </p>
              <p>
                From serene hill stations to vibrant cultural trails, every
                journey is designed with attention to detail, safety, and your
                well-being at heart.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values / Why Choose Us */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Travel With Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-9 h-9 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Effortless Planning
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We handle every detail — from transport and stays to meals and
                guides — so you can relax and enjoy the journey.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-9 h-9 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Trusted & Safe
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Years of experience, verified partners, and 24/7 support ensure
                your trip is safe, comfortable, and memorable.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-9 h-9 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Personalized Experience
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every tour is thoughtfully designed to match your interests —
                whether you seek peace, adventure, or culture.
              </p>
            </div>
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Let’s Create Your Perfect Journey
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands who have discovered the joy of stress-free,
            meaningful travel with us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

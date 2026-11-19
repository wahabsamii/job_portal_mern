
import React from "react";
import job1 from "../assets/both.jpg";
import job2 from "../assets/job2.jpg";
import { useSelector } from "react-redux";

const JobSection = () => {
  const theme = useSelector((state) => state.theme.theme);

  const isDark = theme === "dark";

  return (
    <section
      className={`relative overflow-hidden ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* =========================
              LEFT IMAGE
          ========================== */}
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="100"
            className="relative"
          >
            {/* Main image */}
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={job1}
                alt="Happy professional"
                className="job-main-image h-[380px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[460px]"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/5" />

              {/* Play button */}
              <button
                type="button"
                className="job-play-button absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl transition-all duration-300 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-7 w-7 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5.14v13.72c0 .78.85 1.25 1.5.83l10.2-6.86a1 1 0 0 0 0-1.66L9.5 4.31A1 1 0 0 0 8 5.14Z" />
                </svg>
              </button>
            </div>

            {/* Small secondary image */}
            <div
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="600"
              className="absolute -bottom-7 -right-5 hidden w-36 overflow-hidden rounded-2xl border-8 border-white shadow-xl dark:border-black sm:block md:w-44"
            >
              <img
                src={job2}
                alt="Professional workplace"
                className="job-secondary-image h-28 w-full object-cover md:h-32"
              />
            </div>

            {/* Small blue badge */}
            <div
              data-aos="fade-down"
              data-aos-duration="800"
              data-aos-delay="500"
              className="job-badge absolute -left-4 top-8 rounded-2xl bg-blue-600 px-5 py-4 text-white shadow-xl"
            >
              <p className="text-2xl font-bold">30K+</p>
              <p className="text-xs text-white/80">
                Companies
              </p>
            </div>
          </div>

          {/* =========================
              RIGHT CONTENT
          ========================== */}
          <div className="space-y-6">

            {/* Small label */}
            <div
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay="150"
              className="inline-flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-blue-600" />

              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Find Your Future
              </span>
            </div>

            {/* Heading */}
            <h2
              data-aos="fade-up"
              data-aos-duration="900"
              data-aos-delay="250"
              className={`text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              Millions of jobs.
              <br />
              Find the one that's
              <br />
              right for you.
            </h2>

            {/* Description */}
            <p
              data-aos="fade-up"
              data-aos-duration="900"
              data-aos-delay="350"
              className={`max-w-xl text-base leading-7 sm:text-lg ${
                isDark ? "text-white/70" : "text-gray-600"
              }`}
            >
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over
              30,000+ companies worldwide.
            </p>

            {/* Features */}
            <div className="space-y-4 pt-2">

              <div
                data-aos="fade-left"
                data-aos-duration="700"
                data-aos-delay="450"
                className="group flex items-start gap-4 transition-transform duration-300 hover:translate-x-2"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm text-white transition-transform duration-300 group-hover:scale-110">
                  ✓
                </div>

                <p
                  className={`text-sm sm:text-base ${
                    isDark
                      ? "text-white/80"
                      : "text-gray-700"
                  }`}
                >
                  Digital Marketing Solutions for Tomorrow
                </p>
              </div>

              <div
                data-aos="fade-left"
                data-aos-duration="700"
                data-aos-delay="550"
                className="group flex items-start gap-4 transition-transform duration-300 hover:translate-x-2"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm text-white transition-transform duration-300 group-hover:scale-110">
                  ✓
                </div>

                <p
                  className={`text-sm sm:text-base ${
                    isDark
                      ? "text-white/80"
                      : "text-gray-700"
                  }`}
                >
                  Our Talented & Experienced Marketing Agency
                </p>
              </div>

              <div
                data-aos="fade-left"
                data-aos-duration="700"
                data-aos-delay="650"
                className="group flex items-start gap-4 transition-transform duration-300 hover:translate-x-2"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm text-white transition-transform duration-300 group-hover:scale-110">
                  ✓
                </div>

                <p
                  className={`text-sm sm:text-base ${
                    isDark
                      ? "text-white/80"
                      : "text-gray-700"
                  }`}
                >
                  Create your own skin to match your brand
                </p>
              </div>

            </div>

            {/* Button */}
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="750"
              className="pt-3"
            >
              <button
                type="button"
                className="group inline-flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
              >
                ABOUT US

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          CUSTOM ANIMATIONS
      ========================== */}
      <style>{`
        .job-main-image {
          animation: jobImageFloat 6s ease-in-out infinite;
        }

        .job-secondary-image {
          animation: secondaryFloat 4s ease-in-out infinite;
        }

        .job-badge {
          animation: badgeFloat 4s ease-in-out infinite;
        }

        .job-play-button {
          animation: playPulse 2.5s ease-in-out infinite;
        }

        @keyframes jobImageFloat {
          0%,
          100% {
            transform: scale(1) translateY(0);
          }

          50% {
            transform: scale(1.015) translateY(-5px);
          }
        }

        @keyframes secondaryFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes badgeFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes playPulse {
          0%,
          100% {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.20);
          }

          50% {
            box-shadow: 0 10px 35px rgba(37, 99, 235, 0.35);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .job-main-image,
          .job-secondary-image,
          .job-badge,
          .job-play-button {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default JobSection;
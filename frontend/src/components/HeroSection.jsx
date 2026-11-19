
import React, { useState } from "react";
import rightImg from "../assets/rightImg2.png";
import bgLayer from "../assets/homelayer.png";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/search/jobSlice";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const HeroSection = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (searchInput.trim() !== "") {
      dispatch(setSearchTerm(searchInput));

      const params = new URLSearchParams({
        query: searchInput,
      });

      navigate(`/search?${params.toString()}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handlePopularSearch = (value) => {
    setSearchInput(value);
    dispatch(setSearchTerm(value));
    navigate(`/search?query=${encodeURIComponent(value)}`);
  };

  return (
    <section
      className={`relative min-h-[calc(100vh-64px)] overflow-hidden ${
        theme === "light" ? "bg-blue-500" : "bg-black"
      }`}
      style={{
        backgroundImage: `url(${bgLayer})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/5" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2">

          {/* =========================
              LEFT SIDE
          ========================== */}
          <div className="max-w-2xl">

            {/* Small heading */}
            <div
              data-aos="fade-down"
              data-aos-duration="800"
              data-aos-delay="100"
              className="mb-5 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm"
            >
              <span className="text-sm font-medium text-white">
                Find your next opportunity
              </span>
            </div>

            {/* Heading */}
            <h1
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="200"
              className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Get hired by the
              <span className="block">
                popular candidates.
              </span>
            </h1>

            {/* Description */}
            <p
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="350"
              className="mt-6 max-w-xl text-base leading-7 text-white/90 sm:text-lg"
            >
              Find Jobs, Employment & Career Opportunities.
              Some of the companies we've helped recruit excellent
              applicants over the years.
            </p>

            {/* =========================
                SEARCH BOX
            ========================== */}
            <div
              data-aos="fade-up"
              data-aos-duration="900"
              data-aos-delay="500"
              className="mt-8 max-w-2xl"
            >
              <div className="flex items-center rounded-full bg-white p-2 shadow-2xl transition-all duration-300 focus-within:shadow-[0_0_30px_rgba(255,255,255,0.25)]">

                <IoIosSearch
                  className="ml-4 shrink-0 text-2xl text-gray-500"
                />

                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search jobs & candidates..."
                  className="w-full bg-transparent px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:text-base"
                />

                <button
                  onClick={handleSearchSubmit}
                  className="rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-600 hover:scale-105 active:scale-95 sm:px-8"
                >
                  SEARCH
                </button>
              </div>

              {/* Popular searches */}
              <div
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="650"
                className="mt-4 flex flex-wrap items-center gap-2"
              >
                <span className="text-sm font-medium text-white">
                  Popular:
                </span>

                <button
                  onClick={() =>
                    handlePopularSearch("Mobile App Development")
                  }
                  className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
                >
                 Mobile App Development
                </button>

                <button
                  onClick={() =>
                    handlePopularSearch("Artificial Intelligence")
                  }
                  className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
                >
                  Artificial Intelligence
                </button>

                <button
                  onClick={() =>
                    handlePopularSearch("Graphics & Design")
                  }
                  className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
                >
                  Designer
                </button>
              </div>
            </div>

            {/* =========================
                STATS
            ========================== */}
            <div
              data-aos="fade-up"
              data-aos-duration="900"
              data-aos-delay="750"
              className="mt-9 grid max-w-lg grid-cols-3 gap-3"
            >
              {/* Jobs */}
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">
                <p className="text-xl font-bold text-white">
                  10K+
                </p>

                <p className="mt-1 text-xs text-white/75">
                  Jobs
                </p>
              </div>

              {/* Job Seekers */}
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">
                <p className="text-xl font-bold text-white">
                  25K+
                </p>

                <p className="mt-1 text-xs text-white/75">
                  Job Seekers
                </p>
              </div>

              {/* Companies */}
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">
                <p className="text-xl font-bold text-white">
                  1.2K+
                </p>

                <p className="mt-1 text-xs text-white/75">
                  Companies
                </p>
              </div>
            </div>
          </div>

          {/* =========================
              RIGHT SIDE
          ========================== */}
          <div
            data-aos="fade-left"
            data-aos-duration="1200"
            data-aos-delay="300"
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative">

              {/* Soft existing-color overlay */}
              <div className="absolute inset-0 rounded-full bg-white/5 blur-3xl" />

              {/* Floating image */}
              <img
                src={rightImg}
                alt="Job opportunities"
                className="hero-floating-image relative z-10 w-[280px] object-contain drop-shadow-2xl sm:w-[380px] lg:w-[480px]"
              />
            </div>

            {/* Floating information card */}
            <div
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="1000"
              className="absolute bottom-2 left-1/2 z-20 hidden -translate-x-1/2 rounded-2xl border border-white/20 bg-white/95 px-5 py-3 shadow-xl transition-all duration-300 hover:-translate-y-1 sm:block lg:left-10 lg:translate-x-0"
            >
              <p className="text-sm font-semibold text-gray-900">
                New opportunities
              </p>

              <p className="mt-0.5 text-xs text-gray-500">
                Find your next career move
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom subtle animation indicator */}
      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 sm:block">
        <div className="hero-scroll-dot h-8 w-5 rounded-full border border-white/40 p-1">
          <div className="h-1.5 w-1.5 mx-auto rounded-full bg-white" />
        </div>
      </div>

      {/* Component animations */}
      <style>{`
        .hero-floating-image {
          animation: heroFloat 5s ease-in-out infinite;
        }

        .hero-scroll-dot {
          animation: heroPulse 2s ease-in-out infinite;
        }

        @keyframes heroFloat {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-14px);
          }
        }

        @keyframes heroPulse {
          0%,
          100% {
            opacity: 0.45;
          }

          50% {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-floating-image,
          .hero-scroll-dot {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

import React from "react";
import OtherHero from "../components/OtherHero";
import { useSelector } from "react-redux";
import {
  FaBullseye,
  FaBriefcase,
  FaFilter,
  FaShieldAlt,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import Header from "../components/Header";

export default function About() {
  const theme = useSelector((state) => state.theme.theme);

  const isLight = theme === "light";

  return (
    <>
      <Header />
      <OtherHero title={"About Us"} />

      <main
        className={`w-full ${
          isLight ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">

          {/* Introduction */}
          <section
            data-aos="fade-up"
            data-aos-duration="800"
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block bg-blue-100 text-blue-600
              text-sm font-semibold px-4 py-2 rounded-full mb-5">
              About JobConnect
            </span>

            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-bold
                tracking-tight ${
                  isLight ? "text-gray-900" : "text-white"
                }`}
            >
              Connecting Talent With
              <span className="text-blue-600"> Opportunity</span>
            </h1>

            <p
              className={`mt-6 text-base md:text-lg leading-8 ${
                isLight ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Welcome to{" "}
              <span className="font-semibold text-blue-600">
                JobConnect
              </span>{" "}
              – your trusted job portal dedicated to connecting talented
              individuals with top employers across industries. Whether
              you're a developer, designer, marketer, or manager, our
              platform is built to help you find your dream job faster
              and smarter.
            </p>
          </section>

          {/* Mission & What We Offer */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-14">

            {/* Mission */}
            <div
              data-aos="fade-right"
              data-aos-duration="800"
              className={`rounded-2xl border p-7 md:p-8
                transition-all duration-300 hover:-translate-y-1
                hover:shadow-xl ${
                  isLight
                    ? "bg-white border-gray-100 shadow-md"
                    : "bg-gray-900 border-gray-800 shadow-md"
                }`}
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100
                text-blue-600 flex items-center justify-center
                text-2xl mb-5">
                <FaBullseye />
              </div>

              <h2
                className={`text-2xl font-bold mb-4 ${
                  isLight ? "text-gray-900" : "text-white"
                }`}
              >
                Our Mission
              </h2>

              <p
                className={`leading-7 ${
                  isLight ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Our mission is simple — empower professionals and
                businesses by providing a seamless and transparent
                platform for job discovery, hiring, and talent
                acquisition. We aim to reduce the gap between
                opportunity and talent by making the recruitment process
                efficient and accessible.
              </p>
            </div>

            {/* What We Offer */}
            <div
              data-aos="fade-left"
              data-aos-duration="800"
              className={`rounded-2xl border p-7 md:p-8
                transition-all duration-300 hover:-translate-y-1
                hover:shadow-xl ${
                  isLight
                    ? "bg-white border-gray-100 shadow-md"
                    : "bg-gray-900 border-gray-800 shadow-md"
                }`}
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100
                text-blue-600 flex items-center justify-center
                text-2xl mb-5">
                <FaBriefcase />
              </div>

              <h2
                className={`text-2xl font-bold mb-5 ${
                  isLight ? "text-gray-900" : "text-white"
                }`}
              >
                What We Offer
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaBriefcase className="text-blue-600 mt-1 shrink-0" />
                  <p
                    className={
                      isLight ? "text-gray-600" : "text-gray-400"
                    }
                  >
                    Real-time job listings across various categories
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <FaFilter className="text-blue-600 mt-1 shrink-0" />
                  <p
                    className={
                      isLight ? "text-gray-600" : "text-gray-400"
                    }
                  >
                    Smart filtering and job alerts
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <FaUsers className="text-blue-600 mt-1 shrink-0" />
                  <p
                    className={
                      isLight ? "text-gray-600" : "text-gray-400"
                    }
                  >
                    Verified company and applicant profiles
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <FaShieldAlt className="text-blue-600 mt-1 shrink-0" />
                  <p
                    className={
                      isLight ? "text-gray-600" : "text-gray-400"
                    }
                  >
                    Secure application process and profile management
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section
            data-aos="fade-up"
            data-aos-duration="800"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10"
          >
            {[
              { value: "30K+", label: "Companies" },
              { value: "10K+", label: "Jobs" },
              { value: "20K+", label: "Job Seekers" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`rounded-xl border p-5 text-center
                  transition-all duration-300 hover:-translate-y-1
                  hover:shadow-lg ${
                    isLight
                      ? "bg-gray-50 border-gray-100"
                      : "bg-gray-900 border-gray-800"
                  }`}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-blue-600">
                  {stat.value}
                </h3>

                <p
                  className={`mt-1 text-sm ${
                    isLight
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </section>

          {/* Join Us */}
          <section
            data-aos="zoom-in"
            data-aos-duration="800"
            className={`mt-14 rounded-2xl border text-center
              px-6 py-10 md:px-12 md:py-12 ${
                isLight
                  ? "bg-gray-50 border-gray-100"
                  : "bg-gray-900 border-gray-800"
              }`}
          >
            <div className="w-14 h-14 mx-auto rounded-full
              bg-blue-100 text-blue-600 flex items-center
              justify-center text-xl mb-5">
              <FaUsers />
            </div>

            <h2
              className={`text-2xl md:text-3xl font-bold ${
                isLight ? "text-gray-900" : "text-white"
              }`}
            >
              Join Our Community
            </h2>

            <p
              className={`max-w-2xl mx-auto mt-4 leading-7 ${
                isLight ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Whether you're a job seeker or an employer, we invite you
              to become a part of the JobConnect community. Let's build
              the future of work — together.
            </p>

            <a
              href="/register"
              className="mt-7 inline-flex items-center gap-2
                bg-blue-600 text-white px-6 py-3 rounded-lg
                font-semibold shadow-md
                hover:bg-blue-700 hover:shadow-lg
                transition-all duration-300"
            >
              Get Started
              <FaArrowRight className="text-sm" />
            </a>
          </section>
        </div>
      </main>
    </>
  );
}

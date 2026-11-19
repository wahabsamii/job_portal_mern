import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaPaintBrush,
  FaMobileAlt,
  FaLaptopCode,
  FaLayerGroup,
  FaBrain,
  FaVideo,
  FaKeyboard,
  FaBriefcase,
} from "react-icons/fa";

import { serverUrl } from "../utils/api";

export default function ExploreJobs() {
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const isDark = theme === "dark";

  // =========================
  // CATEGORY ICONS
  // =========================
  const categoryIcons = {
    "Graphics & Design": FaPaintBrush,
    "Mobile App Development": FaMobileAlt,
    "Frontend Web Development": FaLaptopCode,
    "MERN Stack Development": FaLayerGroup,
    "Artificial Intelligence": FaBrain,
    "Video Animation": FaVideo,
    "Data Entry Operator": FaKeyboard,
  };

  // =========================
  // GET CATEGORY ICON
  // =========================
  const getCategoryIcon = (category) => {
    return categoryIcons[category] || FaBriefcase;
  };

  // =========================
  // FETCH JOBS
  // =========================
  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/job/getall`
      );

      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <section
      className={`w-full ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">

        {/* =========================
            HEADER
        ========================== */}
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />

              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Opportunities
              </span>
            </div>

            <h2
              className={`text-3xl font-bold tracking-tight md:text-4xl ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              Explore Jobs
            </h2>

            <p
              className={`mt-3 max-w-2xl text-sm md:text-base ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Search all open positions and find the right
              opportunity for your career.
            </p>
          </div>

          {/* Job Count */}
          <div
            className={`rounded-xl border px-5 py-3 ${
              isDark
                ? "border-gray-800 bg-gray-900"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <p
              className={`text-xs ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Available Jobs
            </p>

            <p
              className={`mt-1 text-xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {jobs.length}
            </p>
          </div>
        </div>

        {/* =========================
            JOB GRID
        ========================== */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {jobs.map((job, index) => {
            const CategoryIcon = getCategoryIcon(job.category);

            return (
              <div
                onClick={() =>
                  navigate(`/job-details/${job._id}`)
                }
                key={job._id}
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay={Math.min(index * 100, 500)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  isDark
                    ? "border-gray-800 bg-gray-900 shadow-md hover:border-blue-600"
                    : "border-gray-200 bg-white shadow-md hover:border-blue-200"
                }`}
              >
                {/* Top Blue Line */}
                <div className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-blue-600 transition-transform duration-300 group-hover:scale-x-100" />

                {/* =========================
                    JOB HEADER
                ========================== */}
                <div className="flex items-start gap-4">

                  {/* Category Icon */}
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 ${
                      isDark
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-100 bg-gray-50"
                    }`}
                  >
                    <CategoryIcon className="text-2xl text-blue-600" />
                  </div>

                  {/* Job Title */}
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`truncate text-lg font-semibold transition-colors duration-300 group-hover:text-blue-600 ${
                        isDark
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {job.title}
                    </h3>

                    <p
                      className={`mt-1 flex items-center gap-1.5 text-xs ${
                        isDark
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      <FaClock className="text-[11px] text-blue-600" />

                      {job.jobPostedOn
                        ? new Date(
                            job.jobPostedOn
                          ).toDateString()
                        : "Recently posted"}
                    </p>
                  </div>
                </div>

                {/* =========================
                    CATEGORY
                ========================== */}
                <div className="mt-5">
                  <span
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                      isDark
                        ? "bg-blue-950 text-blue-400"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    <CategoryIcon />

                    {job.category || "General"}
                  </span>
                </div>

                {/* =========================
                    LOCATION
                ========================== */}
                <p
                  className={`mt-4 flex items-center gap-2 text-sm ${
                    isDark
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  <FaMapMarkerAlt className="shrink-0 text-blue-600" />

                  <span>
                    {job.city || "Location not specified"}

                    {job.country &&
                      `, ${job.country}`}
                  </span>
                </p>

                {/* =========================
                    SALARY
                ========================== */}
                <div className="mt-4">
                  <span
                    className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-medium ${
                      isDark
                        ? "bg-blue-950 text-blue-400"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {job.fixedSalary
                      ? `Fixed: ${job.fixedSalary}`
                      : job.salaryFrom || job.salaryTo
                      ? `${job.salaryFrom || ""}${
                          job.salaryFrom &&
                          job.salaryTo
                            ? " - "
                            : ""
                        }${job.salaryTo || ""}`
                      : "Salary Not Disclosed"}
                  </span>
                </div>

                {/* =========================
                    DESCRIPTION
                ========================== */}
                <p
                  className={`mt-5 line-clamp-3 text-sm leading-6 ${
                    isDark
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  {job.description ||
                    "No description available."}
                </p>

                {/* =========================
                    VIEW JOB
                ========================== */}
                <div
                  className={`mt-6 flex items-center justify-between border-t pt-4 text-sm font-medium ${
                    isDark
                      ? "border-gray-800 text-blue-400"
                      : "border-gray-100 text-blue-600"
                  }`}
                >
                  <span>View Job</span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-blue-700">
                    <FaArrowRight className="text-xs" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================
            EMPTY STATE
        ========================== */}
        {jobs.length === 0 && (
          <div
            data-aos="zoom-in"
            data-aos-duration="700"
            className="py-16 text-center"
          >
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
                isDark ? "bg-gray-900" : "bg-blue-50"
              }`}
            >
              <FaBriefcase className="text-2xl text-blue-600" />
            </div>

            <h3
              className={`mt-5 text-xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              No jobs available
            </h3>

            <p
              className={`mt-2 text-sm ${
                isDark
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              No job opportunities are available at
              the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
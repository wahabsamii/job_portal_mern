
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaSearch,
  FaArrowRight,
  FaPaintBrush,
  FaMobileAlt,
  FaLaptopCode,
  FaLayerGroup,
  FaBrain,
  FaVideo,
  FaKeyboard,
} from "react-icons/fa";

import { serverUrl } from "../utils/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useSelector((state) => state.theme.theme);

  const isDark = theme === "dark";

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query") || "";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);

      const response = await axios.get(
        `${serverUrl}/api/job/getall`
      );

      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // =========================
  // FILTER JOBS
  // =========================
  const filteredJobs = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return jobs;
    }

    return jobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      const description = job.description?.toLowerCase() || "";
      const category = job.category?.toLowerCase() || "";
      const city = job.city?.toLowerCase() || "";
      const country = job.country?.toLowerCase() || "";

      return (
        title.includes(search) ||
        description.includes(search) ||
        category.includes(search) ||
        city.includes(search) ||
        country.includes(search)
      );
    });
  }, [jobs, searchTerm]);

  return (
    <>
      <Header />

      <section
        className={`min-h-screen transition-colors duration-300 ${
          isDark ? "bg-black" : "bg-gray-50"
        }`}
      >
        {/* =========================
            TOP HEADER
        ========================== */}
        <div
          className={`border-b ${
            isDark
              ? "border-gray-800 bg-black"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
            <div
              data-aos="fade-down"
              data-aos-duration="800"
              className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <FaSearch className="text-sm" />
                  </span>

                  <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Job Search
                  </span>
                </div>

                <h1
                  className={`text-3xl font-bold tracking-tight sm:text-4xl ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  Search Results
                </h1>

                <p
                  className={`mt-2 text-sm sm:text-base ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Find the right opportunity for your career.
                </p>
              </div>

              {/* Search Query Box */}
              <div
                className={`flex max-w-md items-center gap-3 rounded-xl border px-4 py-3 shadow-sm ${
                  isDark
                    ? "border-gray-700 bg-gray-900"
                    : "border-gray-200 bg-white"
                }`}
              >
                <FaSearch className="shrink-0 text-blue-600" />

                <div className="min-w-0">
                  <p
                    className={`text-xs ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Searching for
                  </p>

                  <p
                    className={`truncate text-sm font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {searchTerm || "All Jobs"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            RESULTS
        ========================== */}
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

          {/* Results Count */}
          {!loading && (
            <div
              data-aos="fade-up"
              data-aos-duration="700"
              className="mb-6 flex items-center justify-between"
            >
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <span
                  className={`font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {filteredJobs.length}
                </span>{" "}
                {filteredJobs.length === 1 ? "job" : "jobs"} found
              </p>

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => navigate("/search")}
                  className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  View All Jobs
                </button>
              )}
            </div>
          )}

          {/* =========================
              LOADING SKELETON
          ========================== */}
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className={`animate-pulse rounded-2xl border p-6 ${
                    isDark
                      ? "border-gray-800 bg-gray-900"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex gap-4">
                    <div
                      className={`h-14 w-14 rounded-xl ${
                        isDark ? "bg-gray-800" : "bg-gray-200"
                      }`}
                    />

                    <div className="flex-1 space-y-3">
                      <div
                        className={`h-4 w-3/4 rounded ${
                          isDark ? "bg-gray-800" : "bg-gray-200"
                        }`}
                      />

                      <div
                        className={`h-3 w-1/2 rounded ${
                          isDark ? "bg-gray-800" : "bg-gray-200"
                        }`}
                      />
                    </div>
                  </div>

                  <div
                    className={`mt-6 h-3 w-1/3 rounded ${
                      isDark ? "bg-gray-800" : "bg-gray-200"
                    }`}
                  />

                  <div
                    className={`mt-4 h-3 w-full rounded ${
                      isDark ? "bg-gray-800" : "bg-gray-200"
                    }`}
                  />

                  <div
                    className={`mt-2 h-3 w-5/6 rounded ${
                      isDark ? "bg-gray-800" : "bg-gray-200"
                    }`}
                  />
                </div>
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (

            /* =========================
                JOB GRID
            ========================== */
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job, index) => {
                const CategoryIcon = getCategoryIcon(job.category);

                return (
                  <div
                    key={job._id}
                    data-aos="fade-up"
                    data-aos-duration="700"
                    data-aos-delay={Math.min(index * 100, 500)}
                    onClick={() =>
                      navigate(`/job-details/${job._id}`)
                    }
                    className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                      isDark
                        ? "border-gray-800 bg-gray-900 hover:border-blue-600"
                        : "border-gray-200 bg-white hover:border-blue-200"
                    }`}
                  >
                    {/* Top Accent */}
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
                          className={`truncate text-lg font-bold transition-colors duration-300 group-hover:text-blue-600 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {job.title}
                        </h3>

                        <div
                          className={`mt-1 flex items-center gap-1.5 text-xs ${
                            isDark ? "text-gray-500" : "text-gray-500"
                          }`}
                        >
                          <FaCalendarAlt className="text-blue-600" />

                          <span>
                            {job.jobPostedOn
                              ? new Date(job.jobPostedOn).toDateString()
                              : "Recently posted"}
                          </span>
                        </div>
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
                    <div
                      className={`mt-5 flex items-center gap-2 text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <FaMapMarkerAlt className="shrink-0 text-blue-600" />

                      <span>
                        {job.city || "Location not specified"}
                        {job.country && `, ${job.country}`}
                      </span>
                    </div>

                    {/* =========================
                        SALARY
                    ========================== */}
                    <div
                      className={`mt-3 flex items-center gap-2 text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <FaMoneyBillWave className="shrink-0 text-blue-600" />

                      <span>
                        {job.fixedSalary
                          ? `Fixed: ${job.fixedSalary}`
                          : job.salaryFrom || job.salaryTo
                          ? `${job.salaryFrom || ""}${
                              job.salaryFrom && job.salaryTo ? " - " : ""
                            }${job.salaryTo || ""}`
                          : "Salary Not Disclosed"}
                      </span>
                    </div>

                    {/* =========================
                        DESCRIPTION
                    ========================== */}
                    <p
                      className={`mt-5 line-clamp-3 text-sm leading-6 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {job.description || "No description available."}
                    </p>

                    {/* =========================
                        VIEW JOB
                    ========================== */}
                    <div
                      className={`mt-6 flex items-center justify-between border-t pt-5 ${
                        isDark ? "border-gray-800" : "border-gray-100"
                      }`}
                    >
                      <span
                        className={`text-xs font-medium ${
                          isDark ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        View job details
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-blue-700">
                        <FaArrowRight className="text-sm" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          ) : (

            /* =========================
                NO RESULTS
            ========================== */
            <div
              data-aos="zoom-in"
              data-aos-duration="700"
              className={`mx-auto max-w-2xl rounded-2xl border p-10 text-center shadow-sm ${
                isDark
                  ? "border-gray-800 bg-gray-900"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
                  isDark ? "bg-gray-800" : "bg-blue-50"
                }`}
              >
                <FaSearch className="text-2xl text-blue-600" />
              </div>

              <h3
                className={`mt-5 text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                No jobs found
              </h3>

              <p
                className={`mx-auto mt-2 max-w-md text-sm leading-6 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                We couldn't find any jobs matching{" "}
                <span className="font-semibold text-blue-600">
                  "{searchTerm}"
                </span>
                . Try searching for another job title, category,
                or location.
              </p>

              <button
                type="button"
                onClick={() => navigate("/dashboard/seeker/all-jobs")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
              >
                Browse All Jobs
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SearchResults;

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { serverUrl } from "../../utils/api";

const AllJobs = () => {
  const [jobsall, setAllJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // =========================================
  // CATEGORY ICONS
  // =========================================

  const categoryIcons = {
    "Graphics & Design": FaPaintBrush,
    "Mobile App Development": FaMobileAlt,
    "Frontend Web Development": FaLaptopCode,
    "MERN Stack Development": FaLayerGroup,
    "Artificial Intelligence": FaBrain,
    "Video Animation": FaVideo,
    "Data Entry Operator": FaKeyboard,
  };

  const getCategoryIcon = (category) => {
    return categoryIcons[category] || FaBriefcase;
  };

  // =========================================
  // GET ALL JOBS
  // =========================================

  const getAllJobs = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${serverUrl}/api/job/getall`
      );

      setAllJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  // =========================================
  // GET UNIQUE CATEGORIES
  // =========================================

  const categories = useMemo(() => {
    return [
      ...new Set(
        jobsall
          .map((job) => job.category)
          .filter(Boolean)
      ),
    ];
  }, [jobsall]);

  // =========================================
  // FILTER JOBS
  // =========================================

  const filteredJobs = useMemo(() => {
    const searchValue = search.toLowerCase();

    return jobsall.filter((job) => {
      const matchesSearch =
        job.title
          ?.toLowerCase()
          .includes(searchValue) ||
        job.category
          ?.toLowerCase()
          .includes(searchValue) ||
        job.city
          ?.toLowerCase()
          .includes(searchValue) ||
        job.country
          ?.toLowerCase()
          .includes(searchValue);

      const matchesCategory =
        !category || job.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [jobsall, search, category]);

  return (
    <div className="w-full bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="mb-7">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <FaBriefcase className="text-sm" />

            <span className="text-xs font-semibold uppercase tracking-widest">
              Job Opportunities
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Find Jobs
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Browse available jobs and find your next opportunity.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
              <span className="text-xs text-gray-500">
                Available Jobs
              </span>

              <span className="ml-2 text-lg font-bold text-gray-900">
                {jobsall.length}
              </span>
            </div>
          </div>
        </div>

        {/* =========================================
            FILTERS
        ========================================= */}

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* SEARCH */}
            <div className="md:col-span-2 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by job title, category, city or country..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-11 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
              />
            </div>

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none cursor-pointer transition-all duration-200 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            >
              <option value="">All Categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* =========================================
            RESULT COUNT
        ========================================= */}

        {!loading && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredJobs.length}
              </span>{" "}
              job{filteredJobs.length !== 1 ? "s" : ""}
            </p>

            {(search || category) && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("");
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* =========================================
            LOADING
        ========================================= */}

        {loading && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

            <p className="text-sm text-gray-500">
              Loading available jobs...
            </p>
          </div>
        )}

        {/* =========================================
            NO JOBS
        ========================================= */}

        {!loading && jobsall.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <FaBriefcase />
            </div>

            <h2 className="text-lg font-bold text-gray-900">
              No Jobs Available
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              There are no job listings available at the moment.
            </p>
          </div>
        )}

        {/* =========================================
            NO FILTER RESULTS
        ========================================= */}

        {!loading &&
          jobsall.length > 0 &&
          filteredJobs.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                <FaSearch />
              </div>

              <h2 className="text-lg font-bold text-gray-900">
                No Matching Jobs
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Try changing your search or category filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("");
                }}
                className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}

        {/* =========================================
            JOB CARDS
        ========================================= */}

        {!loading && filteredJobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredJobs.map((job) => {

              // Get category-specific icon
              const CategoryIcon = getCategoryIcon(
                job.category
              );

              return (
                <div
                  key={job._id}
                  onClick={() =>
                    navigate(`/job-details/${job._id}`)
                  }
                  className="group bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* =========================================
                      CARD HEADER
                  ========================================= */}

                  <div className="p-5 border-b border-gray-100">
                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-center gap-3 min-w-0">

                        {/* CATEGORY ICON */}
                        <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-100">
                          <CategoryIcon className="text-xl text-blue-600" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>

                          <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                            <FaCalendarAlt className="text-[10px]" />

                            <p className="text-xs">
                              {job.jobPostedOn
                                ? new Date(
                                    job.jobPostedOn
                                  ).toDateString()
                                : "Date unavailable"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <span className="shrink-0 bg-blue-50 text-blue-600 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        Job
                      </span>
                    </div>
                  </div>

                  {/* =========================================
                      CARD BODY
                  ========================================= */}

                  <div className="p-5">

                    {/* CATEGORY */}
                    <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg">

                      <CategoryIcon className="text-blue-600" />

                      {job.category || "General"}
                    </span>

                    {/* LOCATION */}
                    <div className="flex items-center gap-2 mt-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <FaMapMarkerAlt className="text-xs" />
                      </div>

                      <p className="text-sm text-gray-600">
                        {job.city || "City unavailable"}
                        {job.country &&
                          `, ${job.country}`}
                      </p>
                    </div>

                    {/* SALARY */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <FaMoneyBillWave className="text-xs" />
                      </div>

                      <p className="text-sm font-semibold text-gray-700">
                        {job.fixedSalary
                          ? `Fixed: ${job.fixedSalary}`
                          : job.salaryFrom ||
                            job.salaryTo
                          ? `${job.salaryFrom || "—"} - ${
                              job.salaryTo || "—"
                            }`
                          : "Salary Not Disclosed"}
                      </p>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-sm text-gray-500 leading-6 line-clamp-3 mt-5 min-h-[72px]">
                      {job.description ||
                        "No job description available."}
                    </p>
                  </div>

                  {/* =========================================
                      CARD FOOTER
                  ========================================= */}

                  <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between">

                      <span className="text-xs font-medium text-gray-400">
                        View job details
                      </span>

                      <span className="flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all duration-200">
                        View Job

                        <FaArrowRight className="text-xs" />
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default AllJobs;
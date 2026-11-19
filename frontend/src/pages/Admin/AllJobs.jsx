
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../utils/api";
import toast from "react-hot-toast";

import {
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaMoneyBillWave,
  FaSearch,
  FaPlus,
  FaBuilding,
  FaPaintBrush,
  FaMobileAlt,
  FaLaptopCode,
  FaLayerGroup,
  FaBrain,
  FaVideo,
  FaKeyboard,
} from "react-icons/fa";

const AdminAllJobs = () => {
  const [jobsall, setAllJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // UPDATE JOB
  // =========================================

  const handleUpdate = (id) => {
    navigate(`/dashboard/admin/update-job/${id}`);
  };

  // =========================================
  // DELETE JOB
  // =========================================

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${serverUrl}/api/job/delete/${id}`
      );

      if (res.data.success) {
        toast.success("Job Deleted!");

        // Refresh jobs after deletion
        getAllJobs();
      } else {
        toast.error(
          res.data.message || "Unable to delete job"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete job"
      );
    }
  };

  // =========================================
  // FETCH JOBS
  // =========================================

  useEffect(() => {
    getAllJobs();
  }, []);

  // =========================================
  // SEARCH JOBS
  // =========================================

  const filteredJobs = jobsall.filter((job) => {
    const search = searchTerm.toLowerCase();

    return (
      job.title?.toLowerCase().includes(search) ||
      job.category?.toLowerCase().includes(search) ||
      job.city?.toLowerCase().includes(search) ||
      job.country?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="space-y-6">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div
        // data-aos="fade-down"
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <FaBriefcase className="text-sm" />

            <span className="text-xs font-semibold uppercase tracking-wider">
              Job Management
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            All Jobs
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            Manage all job listings published on Jobnova.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/dashboard/admin/add-job")
          }
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/20"
        >
          <FaPlus className="text-sm" />
          Add New Job
        </button>
      </div>

      {/* =========================================
          STATS
      ========================================= */}

      <div
        // data-aos="fade-up"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Jobs
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {jobsall.length}
              </h2>
            </div>

            <div className="w-11 h-11 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <FaBriefcase />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Categories
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {
                  new Set(
                    jobsall
                      .map((job) => job.category)
                      .filter(Boolean)
                  ).size
                }
              </h2>
            </div>

            <div className="w-11 h-11 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <FaBuilding />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Showing
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {filteredJobs.length}
              </h2>
            </div>

            <div className="w-11 h-11 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <FaSearch />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          SEARCH
      ========================================= */}

      <div
        // data-aos="fade-up"
        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
      >
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

          <input
            type="text"
            placeholder="Search jobs by title, category, city or country..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all"
          />
        </div>
      </div>

      {/* =========================================
          LOADING
      ========================================= */}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : filteredJobs.length === 0 ? (

        /* =========================================
            EMPTY STATE
        ========================================= */

        <div
          data-aos="zoom-in"
          className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center">
            <FaBriefcase className="text-2xl" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-5">
            {searchTerm
              ? "No Jobs Found"
              : "No Jobs Available"}
          </h3>

          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            {searchTerm
              ? "Try changing your search keywords to find other job listings."
              : "There are currently no jobs available. Create your first job listing to get started."}
          </p>

          {!searchTerm && (
            <button
              onClick={() =>
                navigate("/dashboard/admin/add-job")
              }
              className="mt-5 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-all"
            >
              <FaPlus />
              Add New Job
            </button>
          )}
        </div>

      ) : (

        /* =========================================
            JOB GRID
        ========================================= */

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredJobs.map((job, index) => {

            // Get icon according to job category
            const CategoryIcon = getCategoryIcon(
              job.category
            );

            return (
              <div
                key={job._id}
                // data-aos="fade-up"
                // data-aos-delay={Math.min(
                //   index * 80,
                //   400
                // )}
                className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >

                {/* Card Top */}
                <div className="p-5">

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-3 min-w-0">

                      {/* CATEGORY ICON */}
                      <div className="w-12 h-12 shrink-0 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-100">
                        <CategoryIcon className="text-xl text-blue-600" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 truncate">
                          {job.title}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          Job ID: {job._id.slice(-6)}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                      Active
                    </span>
                  </div>

                  {/* Category */}
                  <div className="mt-5">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                      <CategoryIcon className="text-blue-600" />

                      {job.category || "General"}
                    </span>
                  </div>

                  {/* Job Details */}
                  <div className="mt-4 space-y-3">

                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <FaMapMarkerAlt className="text-blue-600 shrink-0" />

                      <span>
                        {job.city || "Unknown City"},{" "}
                        {job.country || "Unknown Country"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <FaCalendarAlt className="text-blue-600 shrink-0" />

                      <span>
                        {job.jobPostedOn
                          ? new Date(
                              job.jobPostedOn
                            ).toDateString()
                          : "Date not available"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <FaMoneyBillWave className="text-blue-600 shrink-0" />

                      <span className="font-semibold text-gray-700">
                        {job.fixedSalary
                          ? `Fixed: ${job.fixedSalary}`
                          : "Salary Not Disclosed"}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 leading-6 line-clamp-3">
                      {job.description ||
                        "No job description available."}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">

                  <button
                    onClick={() =>
                      handleUpdate(job._id)
                    }
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium text-sm transition-all duration-300"
                  >
                    <FaEdit className="text-xs" />
                    Update
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(job._id)
                    }
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-900 text-white hover:bg-red-600 font-medium text-sm transition-all duration-300"
                  >
                    <FaTrash className="text-xs" />
                    Delete
                  </button>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminAllJobs;
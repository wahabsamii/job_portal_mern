import React, { useEffect, useState } from "react";
import OthersHero from "../components/OtherHero";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { serverUrl } from "../utils/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function JobsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${serverUrl}/api/job/getone/${id}`
        );

        setJobDetails(response.data.job);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Unable to load this job. Please try again.");
        setJobDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-64 rounded-3xl bg-gray-200" />

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="h-8 w-2/3 rounded bg-gray-200" />
              <div className="mt-4 h-4 w-1/3 rounded bg-gray-200" />

              <div className="mt-8 h-4 w-full rounded bg-gray-200" />
              <div className="mt-3 h-4 w-5/6 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-4/6 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR / NOT FOUND
  // =========================
  if (error || !jobDetails) {
    return (
      <div className="min-h-screen bg-gray-50 px-5 py-20">
        <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <FaBriefcase className="text-2xl text-blue-600" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            Job Not Found
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {error ||
              "The job you are looking for may have been removed or is no longer available."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard/seeker/all-jobs")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
          >
            Browse Jobs
            <FaArrowRight />
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // SALARY
  // =========================
  const salary = jobDetails.fixedSalary
    ? `PKR ${jobDetails.fixedSalary}`
    : jobDetails.salaryFrom || jobDetails.salaryTo
    ? `PKR ${jobDetails.salaryFrom || ""}${
        jobDetails.salaryFrom && jobDetails.salaryTo ? " - " : ""
      }${jobDetails.salaryTo || ""}`
    : "Salary Not Disclosed";

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
      {/* =========================
          PAGE HERO
      ========================== */}
      <OthersHero title={jobDetails.title} />

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-3">

          {/* =========================
              LEFT / MAIN CONTENT
          ========================== */}
          <div className="space-y-8 lg:col-span-2">

            {/* Job Image */}
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              className="group relative h-[280px] overflow-hidden rounded-3xl shadow-xl sm:h-[360px]"
            >
              <img
                src={
                  jobDetails.image ||
                  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80"
                }
                alt={jobDetails.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Image Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
                  <FaBriefcase />
                  {jobDetails.category || "Job Opportunity"}
                </span>

                <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                  {jobDetails.title}
                </h1>
              </div>
            </div>

            {/* Job Description */}
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="150"
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <FaBriefcase className="text-blue-600" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  Job Description
                </h2>
              </div>

              <p className="mt-6 whitespace-pre-line text-base leading-8 text-gray-600">
                {jobDetails.description ||
                  "No job description has been provided."}
              </p>
            </div>

            {/* Job Requirements */}
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="250"
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                Why Apply?
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="mt-1 shrink-0 text-blue-600" />
                  <p className="text-sm leading-6 text-gray-600">
                    Work with talented professionals and grow your career.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <FaCheckCircle className="mt-1 shrink-0 text-blue-600" />
                  <p className="text-sm leading-6 text-gray-600">
                    Explore new opportunities and develop your skills.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <FaCheckCircle className="mt-1 shrink-0 text-blue-600" />
                  <p className="text-sm leading-6 text-gray-600">
                    Take the next step toward your professional goals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =========================
              RIGHT SIDEBAR
          ========================== */}
          <aside className="lg:col-span-1">

            <div
              data-aos="fade-left"
              data-aos-duration="900"
              className="sticky top-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
            >
              {/* Sidebar Header */}
              <div className="bg-blue-600 p-6 text-white">
                <p className="text-sm font-medium text-white/80">
                  Job Opportunity
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {jobDetails.title}
                </h2>

                <p className="mt-2 text-sm text-white/80">
                  {jobDetails.category || "General"}
                </p>
              </div>

              {/* Job Information */}
              <div className="space-y-5 p-6">

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <FaMapMarkerAlt className="text-blue-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {jobDetails.city || "Not specified"}
                      {jobDetails.country &&
                        `, ${jobDetails.country}`}
                    </p>
                  </div>
                </div>

                {/* Salary */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <FaMoneyBillWave className="text-blue-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Salary
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {salary}
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <FaBriefcase className="text-blue-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Category
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {jobDetails.category || "General"}
                    </p>
                  </div>
                </div>

                {/* Posted Date */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <FaCalendarAlt className="text-blue-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Posted
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {jobDetails.jobPostedOn
                        ? new Date(
                            jobDetails.jobPostedOn
                          ).toDateString()
                        : "Recently posted"}
                    </p>
                  </div>
                </div>

                {/* Job Type */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <FaClock className="text-blue-600" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Employment
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      Full Time
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 pt-5">

                  {/* Apply Button */}
                  <button
                    type="button"
                    onClick={() => navigate(`/application/${id}`)}
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
                  >
                    Apply Now

                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <p className="mt-3 text-center text-xs text-gray-400">
                    Take the next step in your career
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
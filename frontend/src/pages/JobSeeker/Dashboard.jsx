
import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaFileAlt,
  FaSearch,
  FaUser,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../utils/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [myApplications, setMyApplications] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchSpecficMyJobs = async() => {
    try {
      const resposne = await axios.post(`${serverUrl}/api/application/userapp`, {id : currentUser._id});
      setMyApplications(resposne.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

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
    fetchSpecficMyJobs();
    getAllJobs();
  }, []);


  const stats = [
    {
      title: "Available Jobs",
      value: allJobs?.length || 0,
      icon: FaBriefcase,
      description: "Jobs currently available",
    },
    {
      title: "My Applications",
      value: myApplications?.length || 0,
      icon: FaFileAlt,
      description: "Applications submitted",
    },
    {
      title: "Profile",
      value: currentUser?.name ? 'Completed' : 'Incompleted',
      icon: FaUser,
      description: "Keep your profile updated",
    },
  ];

  return (
    <div className="w-full bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* HEADER */}
        <div className="mb-7">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <FaBriefcase className="text-sm" />

            <span className="text-xs font-semibold uppercase tracking-widest">
              Job Seeker Portal
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Job Seeker Dashboard
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Find jobs, track your applications, and manage your profile.
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </h2>

                    <p className="text-xs text-gray-400 mt-2">
                      {stat.description}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MAIN ACTION AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* FIND JOBS */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 sm:p-7">
              <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <FaSearch />
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                Find Your Next Opportunity
              </h2>

              <p className="text-sm text-gray-500 mt-2 max-w-xl leading-6">
                Explore available jobs and find opportunities that match
                your skills, experience, and career goals.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard/seeker/all-jobs")
                }
                className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/20"
              >
                Browse Jobs
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>

          {/* PROFILE */}
          <div className="bg-gray-900 text-white rounded-xl shadow-sm p-6">
            <div className="w-11 h-11 rounded-lg bg-blue-600 flex items-center justify-center mb-5">
              <FaUser />
            </div>

            <h2 className="text-lg font-bold">
              Complete Your Profile
            </h2>

            <p className="text-sm text-gray-400 mt-2 leading-6">
              Keep your profile information updated so employers can
              learn more about you.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard/seeker/profile")
              }
              className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-white hover:text-blue-400 transition-colors"
            >
              Manage Profile
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>

        {/* APPLICATION SECTION */}
        <div className="mt-5 bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FaFileAlt />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Track Your Applications
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  View the jobs you have applied for and keep track of
                  your application activity.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard/seeker/my-applications")
              }
              className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-blue-600 hover:text-blue-600 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            >
              My Applications
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>

        {/* QUICK TIPS */}
        <div className="mt-5">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Quick Tips
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              A few things to keep your job search organized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <FaCheckCircle className="text-blue-600 mb-3" />

              <h3 className="text-sm font-bold text-gray-900">
                Keep Your Profile Updated
              </h3>

              <p className="text-xs text-gray-500 mt-2 leading-5">
                Make sure your contact information and profile details
                are up to date.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <FaCheckCircle className="text-blue-600 mb-3" />

              <h3 className="text-sm font-bold text-gray-900">
                Explore New Jobs
              </h3>

              <p className="text-xs text-gray-500 mt-2 leading-5">
                Check available job listings regularly for new
                opportunities.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <FaCheckCircle className="text-blue-600 mb-3" />

              <h3 className="text-sm font-bold text-gray-900">
                Track Applications
              </h3>

              <p className="text-xs text-gray-500 mt-2 leading-5">
                Keep an eye on your submitted applications from the
                My Applications section.
              </p>
            </div>

          </div>
        </div>

        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default Dashboard;
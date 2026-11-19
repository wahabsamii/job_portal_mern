
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaFileAlt,
  FaUsers,
  FaEye,
  FaPlus,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Socket.IO temporarily disabled
// import { io } from "socket.io-client";
// const socket = io("http://localhost:4000");

const AdminDashboard = () => {
  const navigate = useNavigate();

  /*
    ============================================
    TEMPORARY DUMMY DATA
    Replace this with API data later.
    ============================================
  */

  const stats = [
    {
      title: "Total Jobs",
      value: "48",
      change: "+12%",
      icon: FaBriefcase,
      description: "Active job listings",
    },
    {
      title: "Applications",
      value: "326",
      change: "+18%",
      icon: FaFileAlt,
      description: "Total applications",
    },
    {
      title: "Job Seekers",
      value: "1,284",
      change: "+9%",
      icon: FaUsers,
      description: "Registered users",
    },
    {
      title: "Job Views",
      value: "8,492",
      change: "+24%",
      icon: FaEye,
      description: "This month's views",
    },
  ];

  // Dummy chart data
  const applicationData = [
    { day: "Mon", applications: 18 },
    { day: "Tue", applications: 25 },
    { day: "Wed", applications: 21 },
    { day: "Thu", applications: 32 },
    { day: "Fri", applications: 28 },
    { day: "Sat", applications: 40 },
    { day: "Sun", applications: 35 },
  ];

  // Dummy recent applications
  const recentApplications = [
    {
      name: "John Smith",
      position: "Frontend Developer",
      date: "Today, 10:30 AM",
      status: "Pending",
    },
    {
      name: "Sarah Johnson",
      position: "UI/UX Designer",
      date: "Today, 09:15 AM",
      status: "Reviewed",
    },
    {
      name: "Michael Brown",
      position: "Backend Developer",
      date: "Yesterday, 04:20 PM",
      status: "Pending",
    },
    {
      name: "Emily Davis",
      position: "Project Manager",
      date: "Yesterday, 02:10 PM",
      status: "Accepted",
    },
    {
      name: "David Wilson",
      position: "Software Engineer",
      date: "Sep 30, 2026",
      status: "Reviewed",
    },
  ];

  /*
    ============================================
    SOCKET.IO - TEMPORARILY DISABLED

    useEffect(() => {
      socket.on("userCount", (count) => {
        ...
      });

      return () => socket.disconnect();
    }, []);

    We can enable this again when the backend
    live-user functionality is ready.
    ============================================
  */

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* =========================================
            HEADER
        ========================================= */}
        <div
          data-aos="fade-down"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <p className="text-sm text-blue-600 font-semibold mb-1">
              ADMINISTRATION
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Manage jobs, applications and your Jobnova platform.
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard/admin/add-job")}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/20"
          >
            <FaPlus className="text-sm" />
            Add New Job
          </button>
        </div>

        {/* =========================================
            STAT CARDS
        ========================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      {stat.title}
                    </p>

                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </h2>
                  </div>

                  <div className="w-11 h-11 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
                    <Icon className="text-lg" />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <span className="text-xs font-semibold text-blue-600">
                    {stat.change}
                  </span>

                  <span className="text-xs text-gray-400">
                    from last month
                  </span>
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* =========================================
            CHART + QUICK ACTIONS
        ========================================= */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Application Chart */}
          <div
            data-aos="fade-right"
            className="xl:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-5 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Applications Overview
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Application activity over the last 7 days
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span className="text-xs text-gray-500">
                  Applications
                </span>
              </div>
            </div>

            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={applicationData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                  />

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="applications"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fill: "#2563eb",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions */}
          <div
            data-aos="fade-left"
            className="bg-gray-900 text-white rounded-xl shadow-sm p-5 sm:p-6"
          >
            <h2 className="text-lg font-bold">Quick Actions</h2>

            <p className="text-sm text-gray-400 mt-1 mb-6">
              Frequently used admin actions
            </p>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/dashboard/admin/add-job")}
                className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-800 hover:bg-blue-600 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-600/10 flex items-center justify-center">
                    <FaPlus className="text-blue-400 group-hover:text-white" />
                  </div>

                  <span className="text-sm font-medium">
                    Add New Job
                  </span>
                </div>

                <FaArrowRight className="text-gray-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => navigate("/dashboard/admin/all-jobs")}
                className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-800 hover:bg-blue-600 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-600/10 flex items-center justify-center">
                    <FaBriefcase className="text-blue-400 group-hover:text-white" />
                  </div>

                  <span className="text-sm font-medium">
                    Manage Jobs
                  </span>
                </div>

                <FaArrowRight className="text-gray-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() =>
                  navigate("/dashboard/admin/all-applications")
                }
                className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-800 hover:bg-blue-600 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-600/10 flex items-center justify-center">
                    <FaFileAlt className="text-blue-400 group-hover:text-white" />
                  </div>

                  <span className="text-sm font-medium">
                    View Applications
                  </span>
                </div>

                <FaArrowRight className="text-gray-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================
            RECENT APPLICATIONS
        ========================================= */}
        <div
          data-aos="fade-up"
          className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-5 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Recent Applications
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Latest applications received
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/dashboard/admin/all-applications")
              }
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View All
              <FaArrowRight className="text-xs" />
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Applicant
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Position
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {recentApplications.map((application) => (
                  <tr
                    key={`${application.name}-${application.position}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center font-semibold text-sm">
                          {application.name.charAt(0)}
                        </div>

                        <span className="text-sm font-semibold text-gray-900">
                          {application.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {application.position}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {application.date}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={application.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {recentApplications.map((application) => (
              <div
                key={`${application.name}-${application.position}-mobile`}
                className="p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center font-semibold">
                      {application.name.charAt(0)}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {application.name}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {application.position}
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={application.status} />
                </div>

                <p className="text-xs text-gray-400 mt-3">
                  {application.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================
            OUTLET
        ========================================= */}
        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

/* =========================================
   STATUS BADGE
========================================= */

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-gray-100 text-gray-600",
    Reviewed: "bg-blue-50 text-blue-600",
    Accepted: "bg-blue-100 text-blue-700",
  };

  const icons = {
    Pending: FaClock,
    Reviewed: FaEye,
    Accepted: FaCheckCircle,
  };

  const Icon = icons[status] || FaClock;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        styles[status] || styles.Pending
      }`}
    >
      <Icon className="text-[10px]" />
      {status}
    </span>
  );
};

export default AdminDashboard;

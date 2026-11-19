import React, { useState } from "react";
import logo from "../assets/logo.png";
import { LuUser, LuSettings, LuLogOut, LuBriefcaseBusiness } from "react-icons/lu";
import { IoSunnyOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  signinSuccess,
  signoutSuccess,
} from "../redux/user/authUser";
import { toggleTheme } from "../redux/theme/themeSlice";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { serverUrl } from "../utils/api";

export default function Header() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const { currentUser } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.theme);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [showmodel, setShowmodel] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [registeruser, setRegisteruser] = useState(false);
  const [userMenu, setuserMenu] = useState(false);

  // =========================
  // LOGIN / REGISTER
  // =========================

  const handelReg = async () => {
    if (!registeruser) {
      // Login
      try {
        const response = await axios.post(`${serverUrl}/api/user/login`, {
          email,
          password,
        }, {
          withCredentials: true
        });

        if (response.data.success) {
          dispatch(signinSuccess(response.data.user));
          setShowmodel(false);

          toast.success("Login successful!");
        } else {
          toast.error(response.data.message || "Login failed!");
        }
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message || "Something went wrong!"
        );
      }
    } else {
      // Register
      try {
        const response = await axios.post(
          `${serverUrl}/api/user/register`,
          {
            email,
            password,
            phone,
            name,
          }
        );


        if (response.data.success) {
          toast.success(response.data.message || "Account Created!");

          setRegisteruser(false);
          setShowmodel(false);
        } else {
          toast.error(
            response.data.message || "Registration failed!"
          );
        }
      } catch (error) {
        console.error("Registration error:", error);

        toast.error(
          error.response?.data?.message || "Something went wrong!"
        );
      }
    }
  };

  // =========================
  // EMPLOYEE LOGIN
  // =========================

  const handleEmployeeLogin = () => {
    setEmail("andress@gmail.com");
    setPassword("AndressNova");

    toast.success("Employee credentials loaded");
  };

  // =========================
  // JOB SEEKER LOGIN
  // =========================

  const handleSeekerLogin = () => {
    setEmail("jhonsmith@gmail.com");
    setPassword("jhonsmithNova");

    toast.success("Job seeker credentials loaded");
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    dispatch(signoutSuccess());
    setuserMenu(false);
    navigation("/");
  };

  // =========================
  // CLOSE MODAL
  // =========================

  const closeModal = () => {
    setShowmodel(false);
    setRegisteruser(false);
  };

  return (
    <div className="relative z-50">

      {/* =====================================================
          LOGIN / REGISTER MODAL
      ====================================================== */}

      {showmodel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

            {/* Top Accent */}
            <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

            <div className="p-7">

              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-red-50 hover:text-red-500"
              >
                ✕
              </button>

              {/* Heading */}
              <div className="mb-7 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  {registeruser ? (
                    <LuUser size={28} />
                  ) : (
                    <LuBriefcaseBusiness size={28} />
                  )}
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  {registeruser
                    ? "Create Your Account"
                    : "Welcome Back"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {registeruser
                    ? "Create an account to get started"
                    : "Login to continue to your account"}
                </p>
              </div>

              {/* =========================
                  QUICK LOGIN BUTTONS
              ========================== */}

              {!registeruser && (
                <div className="mb-6">

                  <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Quick Login
                  </p>

                  <div className="grid grid-cols-2 gap-3">

                    {/* Employee */}
                    <button
                      type="button"
                      onClick={handleEmployeeLogin}
                      className="group flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-3 text-sm font-semibold text-blue-700 transition-all hover:border-blue-400 hover:bg-blue-100 hover:shadow-md"
                    >
                      <LuBriefcaseBusiness
                        size={18}
                        className="transition-transform group-hover:scale-110"
                      />

                      Employee Login
                    </button>

                    {/* Job Seeker */}
                    <button
                      type="button"
                      onClick={handleSeekerLogin}
                      className="group flex items-center justify-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-3 py-3 text-sm font-semibold text-purple-700 transition-all hover:border-purple-400 hover:bg-purple-100 hover:shadow-md"
                    >
                      <LuUser
                        size={18}
                        className="transition-transform group-hover:scale-110"
                      />

                      Job Seeker
                    </button>

                  </div>
                </div>
              )}

              {/* Divider */}
              {!registeruser && (
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs text-gray-400">
                    OR LOGIN MANUALLY
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
              )}

              {/* =========================
                  FORM
              ========================== */}

              <div className="space-y-4">

                {/* Name */}
                {registeruser && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Phone */}
                {registeruser && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      placeholder="Enter your phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                )}

                {/* Password */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Main Button */}
                <button
                  type="button"
                  onClick={handelReg}
                  className="mt-2 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                >
                  {registeruser ? "Create Account" : "Login"}
                </button>

              </div>

              {/* Switch Login/Register */}
              <p className="mt-6 text-center text-sm text-gray-500">

                {registeruser
                  ? "Already have an account?"
                  : "Don't have an account?"}

                <button
                  type="button"
                  onClick={() =>
                    setRegisteruser((prev) => !prev)
                  }
                  className="ml-1 font-semibold text-blue-600 hover:text-blue-700"
                >
                  {registeruser ? "Login Now" : "Register Now"}
                </button>

              </p>

            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          HEADER
      ====================================================== */}

      <nav
        className={`sticky top-0 ${
          theme === "light"
            ? "bg-blue-600"
            : "bg-gray-950"
        } border-b border-white/10 shadow-lg`}
      >

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex h-[72px] items-center justify-between">

            {/* =========================
                LOGO + NAVIGATION
            ========================== */}

            <div className="flex items-center gap-8">

              {/* Logo */}
              <NavLink
                to="/"
                className="flex items-center"
              >
                <img
                  src={logo}
                  alt="Company Logo"
                  className="h-6 object-cover"
                />
              </NavLink>

              {/* Navigation */}
              <div className="hidden lg:block">

                <div className="flex items-center gap-1">

                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                        isActive
                          ? "bg-white text-blue-700 shadow-sm"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    Home
                  </NavLink>

                  {/* Employees */}
                  <div
                    className="relative"
                    onMouseEnter={() =>
                      setuserMenu("employee")
                    }
                    onMouseLeave={() =>
                      setuserMenu(null)
                    }
                  >

                    <button
                      type="button"
                      className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:text-white"
                    >
                      Employees
                    </button>

                    {userMenu === "employee" && (
                      <div className="absolute left-0 top-full pt-2">
                        <div className="w-48 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-2xl">

                          <a
                            href="#"
                            className="block rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                          >
                            Members
                          </a>

                          <a
                            href="#"
                            className="block rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                          >
                            Roles
                          </a>

                        </div>
                      </div>
                    )}

                  </div>

                  <NavLink
                    to="/apply"
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                        isActive
                          ? "bg-white text-blue-700 shadow-sm"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    Apply Now
                  </NavLink>

                  <NavLink
                    to="/about-us"
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                        isActive
                          ? "bg-white text-blue-700 shadow-sm"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    About Us
                  </NavLink>

                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                        isActive
                          ? "bg-white text-blue-700 shadow-sm"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    Contact Us
                  </NavLink>

                </div>

              </div>

            </div>

            {/* =========================
                RIGHT SIDE
            ========================== */}

            <div className="flex items-center gap-3">

              {/* Theme */}
              <button
                type="button"
                onClick={() => dispatch(toggleTheme())}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
              >
                {theme === "light" ? (
                  <IoSunnyOutline size={19} />
                ) : (
                  <FaRegMoon size={17} />
                )}
              </button>

              {/* Authentication */}
              {isAuth ? (
                <div className="relative">

                  <button
                    type="button"
                    onClick={() =>
                      setuserMenu((prev) =>
                        prev === "profile"
                          ? null
                          : "profile"
                      )
                    }
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 p-1 pr-3 transition hover:bg-white/20"
                  >

                    <img
                      className="h-9 w-9 rounded-full object-cover"
                      src={
                        currentUser?.image ||
                        "https://ui-avatars.com/api/?name=User"
                      }
                      alt="Profile"
                    />

                    <span className="hidden text-sm font-semibold text-white sm:block">
                      {currentUser?.name || "Account"}
                    </span>

                  </button>

                  {userMenu === "profile" && (
                    <div className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-2xl">

                      <div className="border-b border-gray-100 px-4 py-3">
                        <p className="text-sm font-semibold text-gray-900">
                          {currentUser?.name || "User"}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {currentUser?.email}
                        </p>
                      </div>

                      <NavLink
                        onClick={() =>
                          setuserMenu(false)
                        }
                        to={
                          currentUser?.role ===
                          "job seeker"
                            ? "/dashboard/seeker"
                            : "/dashboard/admin"
                        }
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <LuUser size={18} />
                        Dashboard
                      </NavLink>

                     <NavLink
                        to={
                          currentUser?.role === "Employee"
                            ? "/dashboard/admin/profile"
                            : "/dashboard/seeker/profile"
                        }
                        onClick={() => {
                          setuserMenu(false)
                        }}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <LuSettings size={18} />
                        Profile
                      </NavLink>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                      >
                        <LuLogOut size={18} />
                        Sign Out
                      </button>

                    </div>
                  )}

                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowmodel(true)}
                  className="rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-xl"
                >
                  Login
                </button>
              )}

            </div>

          </div>
        </div>
      </nav>

    </div>
  );
}

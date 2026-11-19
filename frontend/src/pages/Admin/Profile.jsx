
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCamera,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaSave,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../../utils/api";
import toast from "react-hot-toast";
import { updateUser } from "../../redux/user/authUser";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    password: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(
    currentUser?.image || ""
  );

  // Handle text fields and image
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files?.[0];

      if (!file) return;

      // Store actual file
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Show selected image immediately
      setImagePreview(URL.createObjectURL(file));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);

    if (formData.password) {
      data.append("password", formData.password);
    }

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await axios.put(
        `${serverUrl}/api/user/update-profile`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log("Updated User:", response.data);
        dispatch(updateUser(response.data.user));

        toast.success(
          response.data.message || "Profile Updated!"
        );

        // Update preview with new image URL returned by backend
        if (response.data.user?.image) {
          setImagePreview(response.data.user.image);
        }

        // Clear password field
        setFormData((prev) => ({
          ...prev,
          password: "",
          image: null,
        }));
      } else {
        toast.error(
          response.data.message || "Update failed!"
        );
      }
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong!"
      );
    }
  };

  return (
    <div className="w-full bg-gray-50 min-h-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">

        {/* HEADER */}
        <div className="mb-7">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <FaUserCircle className="text-sm" />

            <span className="text-xs font-semibold uppercase tracking-widest">
              Account Management
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your personal information and account details.
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

          {/* PROFILE HEADER */}
          <div className="px-5 sm:px-8 py-7 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">

              {/* PROFILE IMAGE */}
              <div className="relative w-fit">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-50 border-4 border-white shadow-md flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-3xl text-blue-600" />
                  )}
                </div>

                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center cursor-pointer shadow-md transition-all duration-200"
                  title="Change profile picture"
                >
                  <FaCamera className="text-xs" />
                </label>

                <input
                  id="profile-image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </div>

              {/* USER INFO */}
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {formData.name || "Administrator"}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {formData.email || "No email available"}
                </p>

                <div className="inline-flex items-center gap-2 mt-3 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full">
                  <FaUser className="text-xs" />

                  <span className="text-xs font-semibold">
                    Administrator
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit}>

            {/* PERSONAL INFORMATION */}
            <section className="px-5 sm:px-8 py-7 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FaUser className="text-sm" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Personal Information
                  </h3>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Update your basic account information.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* NAME */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>

                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pl-11 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                      required
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pl-11 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>

                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pl-11 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                      required
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SECURITY */}
            <section className="px-5 sm:px-8 py-7 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FaLock className="text-sm" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Account Security
                  </h3>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Change your password if you want to update your login
                    credentials.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter a new password"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pl-11 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                  />
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Leave this field empty if you do not want to change your
                  password.
                </p>
              </div>
            </section>

            {/* SUBMIT */}
            <div className="px-5 sm:px-8 py-5 bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <p className="text-xs text-gray-500">
                  Make sure your information is correct before saving.
                </p>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/20"
                >
                  <FaSave className="text-sm" />
                  Update Profile
                </button>

              </div>
            </div>

          </form>
        </div>

        <div className="h-8"></div>
      </div>
    </div>
  );
}

export default Profile;
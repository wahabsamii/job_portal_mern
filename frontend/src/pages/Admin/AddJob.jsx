
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaBriefcase,
  FaLayerGroup,
  FaGlobe,
  FaCity,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaFileAlt,
  FaPlus,
  FaArrowLeft,
} from "react-icons/fa";
import { serverUrl } from "../../utils/api";
import { TailSpin } from 'react-loader-spinner'

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector((state) => state.user);
  const postedBy = currentUser.currentUser._id;

  const navigate = useNavigate();

  const handleJobPost = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    }

    await axios.post(`${serverUrl}/api/job/post`,
      fixedSalary.length >= 4
        ? {
            title,
            description,
            category,
            country,
            city,
            location,
            fixedSalary,
            postedBy,
          }
        : {
            title,
            description,
            category,
            country,
            city,
            location,
            salaryFrom,
            salaryTo,
            postedBy,
          },
      {
        withCredentials: true,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      }

    );
    setLoading(false);
    setTitle('');
    setDescription('');
    setCity('');
    setCountry('');
    setFixedSalary('');
  };

  const inputClass =
    "w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10";

  const labelClass =
    "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="w-full bg-gray-50 min-h-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <FaBriefcase className="text-sm" />

              <span className="text-xs font-semibold uppercase tracking-widest">
                Job Management
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Post a New Job
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Create a new job listing for candidates on Jobnova.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/admin/all-jobs")
            }
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-100 transition-all duration-200"
          >
            <FaArrowLeft className="text-xs" />
            Back to Jobs
          </button>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

          {/* CARD HEADER */}
          <div className="px-5 sm:px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <FaPlus />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Job Information
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Enter the information for your new job listing.
                </p>
              </div>

            </div>
          </div>

          <form onSubmit={handleJobPost}>

            {/* BASIC INFORMATION */}
            <section className="px-5 sm:px-8 py-7 border-b border-gray-200">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FaBriefcase className="text-sm" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Basic Information
                  </h3>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Define the position and its category.
                  </p>
                </div>

              </div>

              <div className="space-y-5">

                {/* JOB TITLE */}
                <div>
                  <label className={labelClass}>
                    Job Title
                  </label>

                  <div className="relative">
                    <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                    <input
                      type="text"
                      value={title}
                      onChange={(e) =>
                        setTitle(e.target.value)
                      }
                      placeholder="e.g. Senior React Developer"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* CATEGORY */}
                <div>
                  <label className={labelClass}>
                    Job Category
                  </label>

                  <div className="relative">
                    <FaLayerGroup className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />

                    <select
                      value={category}
                      onChange={(e) =>
                        setCategory(e.target.value)
                      }
                      className={`${inputClass} pl-11 cursor-pointer`}
                    >
                      <option value="">
                        Select Category
                      </option>

                      <option value="Graphics & Design">
                        Graphics & Design
                      </option>

                      <option value="Mobile App Development">
                        Mobile App Development
                      </option>

                      <option value="Frontend Web Development">
                        Frontend Web Development
                      </option>

                      <option value="MERN Stack Development">
                        MERN Stack Development
                      </option>

                      <option value="Artificial Intelligence">
                        Artificial Intelligence
                      </option>

                      <option value="Video Animation">
                        Video Animation
                      </option>

                      <option value="Data Entry Operator">
                        Data Entry Operator
                      </option>
                    </select>
                  </div>
                </div>

              </div>
            </section>

            {/* LOCATION */}
            <section className="px-5 sm:px-8 py-7 border-b border-gray-200 bg-gray-50">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-sm" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Job Location
                  </h3>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Specify where the job is located.
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* COUNTRY */}
                <div>
                  <label className={labelClass}>
                    Country
                  </label>

                  <div className="relative">
                    <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                    <input
                      type="text"
                      value={country}
                      onChange={(e) =>
                        setCountry(e.target.value)
                      }
                      placeholder="e.g. Pakistan"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* CITY */}
                <div>
                  <label className={labelClass}>
                    City
                  </label>

                  <div className="relative">
                    <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                    <input
                      type="text"
                      value={city}
                      onChange={(e) =>
                        setCity(e.target.value)
                      }
                      placeholder="e.g. Islamabad"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* LOCATION */}
                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Location / Address
                  </label>

                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                    <input
                      type="text"
                      value={location}
                      onChange={(e) =>
                        setLocation(e.target.value)
                      }
                      placeholder="e.g. Blue Area, Islamabad"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* SALARY */}
            <section className="px-5 sm:px-8 py-7 border-b border-gray-200">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FaMoneyBillWave className="text-sm" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Salary Information
                  </h3>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Choose how the salary should be displayed.
                  </p>
                </div>

              </div>

              <div className="space-y-5">

                <div>
                  <label className={labelClass}>
                    Salary Type
                  </label>

                  <select
                    value={salaryType}
                    onChange={(e) =>
                      setSalaryType(e.target.value)
                    }
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="default">
                      Select Salary Type
                    </option>

                    <option value="Fixed Salary">
                      Fixed Salary
                    </option>

                    <option value="Ranged Salary">
                      Ranged Salary
                    </option>
                  </select>
                </div>

                {salaryType === "default" && (
                  <div className="border border-gray-200 bg-gray-50 rounded-lg px-4 py-3">
                    <p className="text-sm text-gray-500">
                      Please select a salary type to enter
                      salary details.
                    </p>
                  </div>
                )}

                {salaryType === "Fixed Salary" && (
                  <div>
                    <label className={labelClass}>
                      Fixed Salary
                    </label>

                    <div className="relative">
                      <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                      <input
                        type="number"
                        placeholder="Enter fixed salary"
                        value={fixedSalary}
                        onChange={(e) =>
                          setFixedSalary(e.target.value)
                        }
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>
                )}

                {salaryType === "Ranged Salary" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <div>
                      <label className={labelClass}>
                        Salary From
                      </label>

                      <div className="relative">
                        <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                        <input
                          type="number"
                          placeholder="Minimum salary"
                          value={salaryFrom}
                          onChange={(e) =>
                            setSalaryFrom(e.target.value)
                          }
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Salary To
                      </label>

                      <div className="relative">
                        <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                        <input
                          type="number"
                          placeholder="Maximum salary"
                          value={salaryTo}
                          onChange={(e) =>
                            setSalaryTo(e.target.value)
                          }
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </section>

            {/* DESCRIPTION */}
            <section className="px-5 sm:px-8 py-7 border-b border-gray-200 bg-gray-50">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FaFileAlt className="text-sm" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Job Description
                  </h3>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Describe the position and its requirements.
                  </p>
                </div>

              </div>

              <div className="relative">

                <FaFileAlt className="absolute left-4 top-4 text-gray-400 text-sm" />

                <textarea
                  rows="7"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Describe the responsibilities, requirements, skills, experience and other important details..."
                  className={`${inputClass} pl-11 resize-y min-h-[180px]`}
                />

              </div>
            </section>

            {/* SUBMIT */}
            <div className="px-5 sm:px-8 py-5 bg-white">

              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">

                <p className="text-xs text-gray-500">
                  Review all job information before creating
                  the listing.
                </p>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/20"
                >
                   {
                  loading ? <>
                   <TailSpin width={18} height={18} color="white" size={14}/> Creating...
                  </> : <>
                  <FaPlus className="text-sm" />
                  Create Job
                  </>
                }
                 
                </button>

              </div>

            </div>

          </form>
        </div>

        <div className="h-8"></div>

      </div>
    </div>
  );
};

export default AddJob;
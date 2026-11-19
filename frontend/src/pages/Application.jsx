
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileAlt,
  FaPaperPlane,
  FaUpload,
  FaArrowLeft,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Header from "../components/Header";
import OtherHero from "../components/OtherHero";
import Footer from "../components/Footer";
import { serverUrl } from "../utils/api";

export default function Application() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [jobs, setJobs] = useState([]);
  // selected job id save here
  const [job, setJob] = useState('');

  // console.log('the all jobs', jobs);
  // console.log('SELECTED JOB IS', job);

  const navigateTo = useNavigate();

  // const { id } = useParams();
  // const id = "67d6a2afaa3163b780aaf82a";

  const theme = useSelector((state) => state.theme.theme);
  const isLight = theme === "light";

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      console.log("Selected file:", file);
      setResume(file);
    } else {
      setResume(null);
    }
  };

  const handleApplication = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload your resume before submitting.");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", job);

    try {
      setSubmitting(true);

      await axios.post(
        `${serverUrl}/api/application/post`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Application Submitted");

      setName("");
      setEmail("");
      setAddress("");
      setResume(null);
      setCoverLetter("");
      setPhone("");
    } catch (error) {
      console.log("Upload Error:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong while submitting your application."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const fetchJobs = async() => {
    try {
      const response = await axios.get(`${serverUrl}/api/job/getall`);
      setJobs(response.data.jobs);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
    <Header />
    <OtherHero title={'Apply Now'}/>
    <div
      className={`min-h-screen py-10 md:py-16 px-4 sm:px-6 ${
        isLight ? "bg-gray-50" : "bg-black"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        {/* <button
          type="button"
          onClick={() => navigateTo(-1)}
          className={`flex items-center gap-2 mb-6 text-sm font-medium transition-colors ${
            isLight
              ? "text-gray-600 hover:text-blue-600"
              : "text-gray-400 hover:text-blue-500"
          }`}
        >
          <FaArrowLeft className="text-xs" />
          Back
        </button> */}

        {/* Main Card */}
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          className={`rounded-2xl overflow-hidden shadow-xl border ${
            isLight
              ? "bg-white border-gray-200"
              : "bg-gray-900 border-gray-800"
          }`}
        >
          {/* Header */}
          <div
            className={`px-6 sm:px-8 md:px-10 py-8 text-center border-b ${
              isLight
                ? "border-gray-200 bg-white"
                : "border-gray-800 bg-gray-900"
            }`}
          >
            <div
              data-aos="zoom-in"
              data-aos-delay="100"
              className="w-14 h-14 mx-auto rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center mb-4"
            >
              <FaPaperPlane className="text-xl" />
            </div>

            <h1
              className={`text-3xl sm:text-4xl font-bold ${
                isLight ? "text-gray-900" : "text-white"
              }`}
            >
              Apply for this Job
            </h1>

            <p
              className={`mt-3 max-w-xl mx-auto text-sm sm:text-base ${
                isLight ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Complete the form below and submit your application. Make sure
              your information and resume are up to date.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleApplication}
            className="p-6 sm:p-8 md:p-10 space-y-6"
          >
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div data-aos="fade-right" data-aos-delay="100">
                <label
                  className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                    isLight ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <FaUser className="text-blue-600 text-xs" />
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 ${
                    isLight
                      ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                      : "bg-gray-950 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  }`}
                />
              </div>

              {/* Email */}
              <div data-aos="fade-left" data-aos-delay="100">
                <label
                  className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                    isLight ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <FaEnvelope className="text-blue-600 text-xs" />
                  Your Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 ${
                    isLight
                      ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                      : "bg-gray-950 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  }`}
                />
              </div>
            </div>

             {/* Phone + Jobs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Phone */}
            <div data-aos="fade-up" data-aos-delay="150">
              <label
                className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                  isLight ? "text-gray-700" : "text-gray-300"
                }`}
              >
                <FaPhone className="text-blue-600 text-xs" />
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 ${
                  isLight
                    ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                    : "bg-gray-950 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                }`}
              />
            </div>

              {/* Jobs */}
              <div data-aos="fade-left" data-aos-delay="100">
                <label
                  className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                    isLight ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <FaEnvelope className="text-blue-600 text-xs" />
                  Jobs
                </label>

                <select 
                onChange={(e) => setJob(e.target.value)}
                required
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 ${
                  isLight
                    ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                    : "bg-gray-950 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                }`} name="" id="">
                  {jobs.map((job) => (
                    <option value={job._id}>{job.title}</option>
                  ))}
                </select>
              </div>

            </div>


            

            {/* Address */}
            <div data-aos="fade-up" data-aos-delay="200">
              <label
                className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                  isLight ? "text-gray-700" : "text-gray-300"
                }`}
              >
                <FaMapMarkerAlt className="text-blue-600 text-xs" />
                Address
              </label>

              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 ${
                  isLight
                    ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                    : "bg-gray-950 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                }`}
              />
            </div>

            {/* Cover Letter */}
            <div data-aos="fade-up" data-aos-delay="250">
              <label
                className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                  isLight ? "text-gray-700" : "text-gray-300"
                }`}
              >
                <FaFileAlt className="text-blue-600 text-xs" />
                Cover Letter
              </label>

              <textarea
                placeholder="Write your cover letter..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                required
                rows="6"
                className={`w-full px-4 py-3 rounded-lg border outline-none resize-none transition-all duration-300 ${
                  isLight
                    ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                    : "bg-gray-950 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                }`}
              ></textarea>
            </div>

            {/* Resume Upload */}
            <div data-aos="fade-up" data-aos-delay="300">
              <label
                className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                  isLight ? "text-gray-700" : "text-gray-300"
                }`}
              >
                <FaUpload className="text-blue-600 text-xs" />
                Upload Resume
              </label>

              <div
                className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                  isLight
                    ? "border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50/30"
                    : "border-gray-700 bg-gray-950 hover:border-blue-500 hover:bg-blue-950/20"
                }`}
              >
                <FaUpload className="mx-auto text-blue-600 text-2xl mb-3" />

                <p
                  className={`text-sm font-medium ${
                    isLight ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  {resume ? resume.name : "Choose your resume"}
                </p>

                <p
                  className={`text-xs mt-1 ${
                    isLight ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  PDF, JPG or PNG
                </p>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  required={!resume}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {resume && (
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  Selected: {resume.name}
                </p>
              )}
            </div>

            {/* Submit */}
            <div data-aos="fade-up" data-aos-delay="350" className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 rounded-lg font-semibold text-base transition-all duration-300 ${
                  submitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/20"
                }`}
              >
                <FaPaperPlane className="text-sm" />

                {submitting ? "Submitting..." : "Send Application"}
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Note */}
        <p
          data-aos="fade-up"
          data-aos-delay="400"
          className={`text-center text-xs mt-5 ${
            isLight ? "text-gray-500" : "text-gray-500"
          }`}
        >
          Please make sure all information provided is accurate before
          submitting your application.
        </p>
      </div>
    </div>

    <Footer />
    
    </>
  );
}

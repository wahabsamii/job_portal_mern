
import React from "react";
import logolft from "../assets/contact.svg";
import OtherHero from "../components/OtherHero";
import { useSelector } from "react-redux";
import { FaEnvelope, FaUser, FaTag, FaCommentDots } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  const theme = useSelector((state) => state.theme.theme);

  const isLight = theme === "light";

  return (
    <div>
      <Header />
      <OtherHero title="Contact Us" />

      <section
        className={`py-14 md:py-20 px-4 sm:px-6 ${
          isLight ? "bg-white" : "bg-black"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <div
            data-aos="fade-up"
            data-aos-duration="800"
            className="text-center mb-10 md:mb-14"
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Contact Us
            </span>

            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-2 ${
                isLight ? "text-gray-900" : "text-white"
              }`}
            >
              We'd Love to Hear From You
            </h2>

            <p
              className={`max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-7 ${
                isLight ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Have a question, suggestion, or need assistance? Send us a
              message and our team will get back to you.
            </p>
          </div>

          {/* Contact Card */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl border shadow-xl ${
              isLight
                ? "bg-white border-gray-200"
                : "bg-gray-900 border-gray-800"
            }`}
          >
            {/* Left Side */}
            <div
              data-aos="fade-right"
              data-aos-duration="900"
              className={`flex flex-col justify-center items-center p-8 sm:p-10 md:p-12 ${
                isLight ? "bg-gray-50" : "bg-gray-950"
              }`}
            >
              <div className="w-full max-w-md">
                <img
                  src={logolft}
                  alt="Contact Illustration"
                  className="w-full max-w-sm mx-auto transition-transform duration-500 hover:scale-105"
                />

                <div className="text-center mt-6">
                  <h3
                    className={`text-2xl font-bold ${
                      isLight ? "text-gray-900" : "text-white"
                    }`}
                  >
                    Let&apos;s Connect
                  </h3>

                  <p
                    className={`mt-3 text-sm leading-6 ${
                      isLight ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    Whether you are looking for a job or hiring talented
                    people, we are here to help you make the right connection.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="mt-7 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                      <FaEnvelope />
                    </div>

                    <div>
                      <p
                        className={`text-xs uppercase tracking-wide font-semibold ${
                          isLight ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        Email
                      </p>

                      <p
                        className={`text-sm mt-1 ${
                          isLight ? "text-gray-800" : "text-gray-200"
                        }`}
                      >
                        support@jobnova.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div
              data-aos="fade-left"
              data-aos-duration="900"
              className="p-6 sm:p-8 md:p-10 lg:p-12"
            >
              <div className="mb-7">
                <h3
                  className={`text-2xl md:text-3xl font-bold ${
                    isLight ? "text-gray-900" : "text-white"
                  }`}
                >
                  Get in touch!
                </h3>

                <p
                  className={`mt-2 text-sm ${
                    isLight ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Fill out the form below and send us your message.
                </p>
              </div>

              <form className="space-y-5">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div data-aos="fade-up" data-aos-delay="100">
                    <label
                      className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                        isLight ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      <FaUser className="text-blue-600 text-xs" />
                      Your Name *
                    </label>

                    <input
                      type="text"
                      placeholder="Name"
                      className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 ${
                        isLight
                          ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                          : "bg-gray-950 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div data-aos="fade-up" data-aos-delay="150">
                    <label
                      className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                        isLight ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      <FaEnvelope className="text-blue-600 text-xs" />
                      Your Email *
                    </label>

                    <input
                      type="email"
                      placeholder="Email"
                      className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 ${
                        isLight
                          ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                          : "bg-gray-950 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      }`}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div data-aos="fade-up" data-aos-delay="200">
                  <label
                    className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                      isLight ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    <FaTag className="text-blue-600 text-xs" />
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="Subject"
                    className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 ${
                      isLight
                        ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                        : "bg-gray-950 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                    }`}
                  />
                </div>

                {/* Comments */}
                <div data-aos="fade-up" data-aos-delay="250">
                  <label
                    className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                      isLight ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    <FaCommentDots className="text-blue-600 text-xs" />
                    Comments *
                  </label>

                  <textarea
                    rows="5"
                    placeholder="Message"
                    className={`w-full px-4 py-3 rounded-lg border outline-none resize-none transition-all duration-300 ${
                      isLight
                        ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                        : "bg-gray-950 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                    }`}
                  ></textarea>
                </div>

                {/* Submit */}
                <div data-aos="fade-up" data-aos-delay="300">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20 hover:-translate-y-0.5"
                  >
                    SEND MESSAGE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
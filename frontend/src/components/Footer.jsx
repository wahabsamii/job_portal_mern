
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaDribbble,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#131A2F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          className="py-12 md:py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                J
              </div>

              <span className="text-xl font-bold tracking-wide">
                JOBNOVA
              </span>
            </div>

            <p className="mt-5 text-gray-400 text-sm leading-7 max-w-sm">
              Find your dream job and discover new career opportunities.
              Jobnova connects talented people with companies around the
              world.
            </p>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="mt-5 inline-flex items-center gap-2 text-blue-400
                hover:text-blue-300 text-sm font-medium transition-colors"
            >
              Back to top
              <FaArrowUp className="text-xs" />
            </button>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <nav className="grid grid-cols-2 gap-y-3">
              <a
                href="#"
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                Home
              </a>

              <a
                href="#"
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                How it works
              </a>

              <a
                href="#"
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                Create a job
              </a>

              <a
                href="#"
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                About us
              </a>

              <a
                href="#"
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                Plans
              </a>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Follow Us
            </h3>

            <p className="text-gray-400 text-sm leading-6 mb-5">
              Stay connected with Jobnova and get the latest job and
              career updates.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 bg-gray-800 rounded-lg
                  flex items-center justify-center
                  text-gray-400 hover:bg-blue-600 hover:text-white
                  transition-all duration-300 hover:-translate-y-1"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-gray-800 rounded-lg
                  flex items-center justify-center
                  text-gray-400 hover:bg-blue-600 hover:text-white
                  transition-all duration-300 hover:-translate-y-1"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-gray-800 rounded-lg
                  flex items-center justify-center
                  text-gray-400 hover:bg-blue-600 hover:text-white
                  transition-all duration-300 hover:-translate-y-1"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 bg-gray-800 rounded-lg
                  flex items-center justify-center
                  text-gray-400 hover:bg-blue-600 hover:text-white
                  transition-all duration-300 hover:-translate-y-1"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                aria-label="Dribbble"
                className="w-10 h-10 bg-gray-800 rounded-lg
                  flex items-center justify-center
                  text-gray-400 hover:bg-blue-600 hover:text-white
                  transition-all duration-300 hover:-translate-y-1"
              >
                <FaDribbble />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="border-t border-gray-700 py-6
            flex flex-col md:flex-row items-center
            justify-between gap-4"
        >
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; 2025 Jobnova. Designed with{" "}
            <span className="text-red-500">❤</span>{" "}
            by <Link to='https://wahabsami.dev'>Abdul Wahab</Link>.
          </p>

          <div className="flex items-center gap-5 text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

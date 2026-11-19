
import {
  FaFacebook,
  FaAndroid,
  FaSpotify,
  FaGoogle,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa";
import { SiLenovo } from "react-icons/si";
import { useSelector } from "react-redux";
import officeSpace from "../assets/office-space.jpg";

export default function BestCompanies() {
  const theme = useSelector((state) => state.theme.theme);

  const companies = [
    {
      name: "Facebook",
      icon: <FaFacebook />,
    },
    {
      name: "Google",
      icon: <FaGoogle />,
    },
    {
      name: "Android",
      icon: <FaAndroid />,
    },
    {
      name: "Lenovo",
      icon: <SiLenovo />,
    },
    {
      name: "Spotify",
      icon: <FaSpotify />,
    },
    {
      name: "Linkedin",
      icon: <FaLinkedin />,
    },
  ];

  return (
    <section
      className={`w-full py-14 md:py-16 ${
        theme === "light" ? "bg-white" : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* Left Content */}
          <div>
            <h2
              className={`text-3xl md:text-4xl font-bold tracking-tight ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
            >
              Find Best Companies.
            </h2>

            <p
              className={`mt-4 text-sm md:text-base leading-7 max-w-xl ${
                theme === "light"
                  ? "text-gray-500"
                  : "text-gray-400"
              }`}
            >
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 30,000+
              companies worldwide.
            </p>

            {/* Companies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className={`group flex items-center gap-4 p-4
                    rounded-xl border cursor-pointer
                    transition-all duration-300
                    hover:-translate-y-1 hover:shadow-lg ${
                      theme === "light"
                        ? "bg-gray-50 border-gray-100"
                        : "bg-gray-900 border-gray-800"
                    }`}
                >
                  {/* Company Icon */}
                  <div
                    className={`w-12 h-12 shrink-0 rounded-lg
                      flex items-center justify-center text-2xl
                      transition-all duration-300
                      group-hover:bg-blue-500 group-hover:text-white ${
                        theme === "light"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "bg-gray-800 text-blue-500"
                      }`}
                  >
                    {company.icon}
                  </div>

                  {/* Company Info */}
                  <div className="min-w-0">
                    <h3
                      className={`text-base font-semibold ${
                        theme === "light"
                          ? "text-gray-900"
                          : "text-white"
                      }`}
                    >
                      {company.name}
                    </h3>

                    <p
                      className={`mt-1 text-sm ${
                        theme === "light"
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      40 vacancies
                    </p>
                  </div>

                  {/* Arrow */}
                  <FaArrowRight
                    className={`ml-auto text-sm transition-all duration-300
                      group-hover:translate-x-1 ${
                        theme === "light"
                          ? "text-blue-500"
                          : "text-blue-400"
                      }`}
                  />
                </div>
              ))}
            </div>

            {/* See More */}
            <button
              className="mt-7 inline-flex items-center gap-2
                text-blue-600 font-semibold text-sm
                hover:text-blue-700 transition-colors duration-300"
            >
              See More Companies
              <FaArrowRight className="text-xs" />
            </button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={officeSpace}
                alt="Office Space"
                className="w-full h-[320px] sm:h-[400px] lg:h-[480px]
                  object-cover transition-transform duration-500
                  hover:scale-105"
              />
            </div>

            {/* Play Button */}
            <button
              className="absolute left-6 bottom-6 w-12 h-12
                bg-white rounded-full shadow-xl
                flex items-center justify-center
                text-blue-600 transition-all duration-300
                hover:scale-110"
              aria-label="Play video"
            >
              <svg
                className="w-6 h-6 ml-0.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
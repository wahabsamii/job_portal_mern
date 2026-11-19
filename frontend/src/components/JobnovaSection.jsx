
import {
  FaPhone,
  FaMicrochip,
  FaHeartbeat,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const features = [
  {
    icon: <FaPhone />,
    title: "24/7 Support",
    description:
      "Many desktop publishing now use and a search for job.",
  },
  {
    icon: <FaMicrochip />,
    title: "Tech & Startup Jobs",
    description:
      "Many desktop publishing now use and a search for job.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Quick & Easy",
    description:
      "Many desktop publishing now use and a search for job.",
  },
  {
    icon: <FaClock />,
    title: "Save Time",
    description:
      "Many desktop publishing now use and a search for job.",
  },
];

export default function JobnovaSection() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <section
      className={`w-full py-14 md:py-16 ${
        theme === "light" ? "bg-white" : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-bold tracking-tight ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Here's why you'll love it Jobnova
          </h2>

          <p
            className={`mt-4 text-sm md:text-base leading-7 ${
              theme === "light"
                ? "text-gray-500"
                : "text-gray-400"
            }`}
          >
            Search all the open positions on the web. Get your own
            personalized salary estimate. Read reviews on over 30000+
            companies worldwide.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group rounded-2xl p-6 md:p-7 text-center
                border transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl ${
                  theme === "light"
                    ? "bg-white border-gray-100 shadow-md"
                    : "bg-gray-900 border-gray-800 shadow-md"
                }`}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 mx-auto rounded-xl
                  flex items-center justify-center
                  text-3xl transition-all duration-300
                  group-hover:scale-105 ${
                    theme === "light"
                      ? "bg-blue-100 text-blue-500 group-hover:bg-blue-500 group-hover:text-white"
                      : "bg-gray-800 text-blue-500 group-hover:bg-blue-500 group-hover:text-white"
                  }`}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3
                className={`mt-5 text-lg font-semibold ${
                  theme === "light"
                    ? "text-gray-900"
                    : "text-white"
                }`}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className={`mt-3 text-sm leading-6 ${
                  theme === "light"
                    ? "text-gray-500"
                    : "text-gray-400"
                }`}
              >
                {feature.description}
              </p>

              {/* Read More */}
              <a
                href="#"
                className="mt-5 text-blue-500 font-medium text-sm
                  inline-flex items-center gap-2
                  transition-all duration-300
                  hover:text-blue-600"
              >
                Read More
                <FaArrowRight
                  className="text-xs transition-transform duration-300
                    group-hover:translate-x-1"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
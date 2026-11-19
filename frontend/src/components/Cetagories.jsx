
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useSelector } from "react-redux";
import {
  FaProjectDiagram,
  FaHeadset,
  FaLaptopCode,
  FaUserTie,
  FaNetworkWired,
  FaBug,
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    title: "Project Management",
    jobs: 35,
    icon: <FaProjectDiagram />,
  },
  {
    id: 2,
    title: "Customer Service",
    jobs: 46,
    icon: <FaHeadset />,
  },
  {
    id: 3,
    title: "Software Engineer",
    jobs: 60,
    icon: <FaLaptopCode />,
  },
  {
    id: 4,
    title: "Human Resource HR",
    jobs: 74,
    icon: <FaUserTie />,
  },
  {
    id: 5,
    title: "IT & Networking",
    jobs: 20,
    icon: <FaNetworkWired />,
  },
  {
    id: 6,
    title: "Software Testing",
    jobs: 20,
    icon: <FaBug />,
  },
];

export default function Cetagories() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <section
      className={`w-full ${
        theme === "light" ? "bg-white" : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16 relative">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <h2
            className={`text-3xl md:text-4xl font-bold tracking-tight ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Popular Categories
          </h2>

          <p
            className={`mt-3 text-sm md:text-base leading-7 ${
              theme === "light" ? "text-gray-500" : "text-gray-300"
            }`}
          >
            Search all open positions on the web. Get your own personalized
            salary estimate.
          </p>
        </div>

        {/* Custom Navigation Buttons */}
        <button
          className="custom-prev absolute left-1 sm:left-2 md:left-0 top-[58%] md:top-1/2 z-10
          -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white
          w-10 h-10 md:w-11 md:h-11 rounded-full shadow-md
          flex items-center justify-center transition-all duration-300
          hover:scale-105 active:scale-95"
          aria-label="Previous category"
        >
          <FaAngleLeft className="text-lg md:text-xl" />
        </button>

        <button
          className="custom-next absolute right-1 sm:right-2 md:right-0 top-[58%] md:top-1/2 z-10
          -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white
          w-10 h-10 md:w-11 md:h-11 rounded-full shadow-md
          flex items-center justify-center transition-all duration-300
          hover:scale-105 active:scale-95"
          aria-label="Next category"
        >
          <FaAngleRight className="text-lg md:text-xl" />
        </button>

        {/* Swiper */}
        <div className="px-5 sm:px-7 md:px-8">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={18}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 18,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 22,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            loop={true}
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <div
                  className={`my-3 min-h-[230px] rounded-xl p-6
                  flex flex-col items-center justify-center text-center
                  border shadow-md transition-all duration-300
                  hover:-translate-y-2 hover:shadow-xl ${
                    theme === "light"
                      ? "bg-white text-gray-800 border-gray-100"
                      : "bg-gray-900 text-white border-gray-800"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-20 h-20 flex items-center justify-center
                    text-4xl rounded-full transition-all duration-300
                    hover:scale-105 ${
                      theme === "light"
                        ? "bg-gray-100 text-blue-600 hover:bg-blue-600 hover:text-white"
                        : "bg-gray-800 text-blue-500 hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    {category.icon}
                  </div>

                  {/* Category Name */}
                  <h3
                    className={`mt-5 text-base md:text-lg font-semibold leading-6 ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {category.title}
                  </h3>

                  {/* Jobs */}
                  <p
                    className={`mt-2 text-sm ${
                      theme === "light"
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    {category.jobs} Jobs
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

import bgimg from "../assets/jobbg.jpg";
import { NavLink } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

export default function OtherHero({ title }) {
  return (
    <section
      className="relative w-full min-h-[260px] md:min-h-[320px]
        flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgimg})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        className="relative z-10 max-w-3xl mx-auto
          text-white text-center px-6"
      >
        {/* Small Label */}
        <span
          data-aos="fade-down"
          data-aos-delay="100"
          className="inline-block text-blue-400 text-sm
            font-semibold tracking-wider uppercase mb-3"
        >
          Jobnova
        </span>

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl
            font-bold tracking-tight"
        >
          {title}
        </h1>

        {/* Breadcrumb */}
        <div
          className="mt-5 flex items-center justify-center
            gap-2 text-sm md:text-base"
        >
          <NavLink
            to="/"
            className="text-gray-300 hover:text-white
              transition-colors duration-300"
          >
            Home
          </NavLink>

          <FaChevronRight className="text-blue-500 text-xs" />

          <span className="text-blue-400 font-medium">
            {title}
          </span>
        </div>
      </div>

      {/* Bottom Accent */}
      <div
        className="absolute bottom-0 left-0 right-0
          h-1 bg-blue-600"
      ></div>
    </section>
  );
}

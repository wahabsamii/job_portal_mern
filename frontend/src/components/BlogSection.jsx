
import { Card, CardContent } from "./card";
import blog1 from "../assets/blog1.jpeg";
import blog2 from "../assets/blog2.jpg";
import blog3 from "../assets/blog3.jpeg";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";

const blogs = [
  {
    id: 1,
    title: "11 Tips to Help You Get New Clients Through Cold Calling",
    date: "13th Sep 2023",
    readTime: "5 min read",
    category: "Arts",
    image: blog1,
    author: "Google",
  },
  {
    id: 2,
    title: "DigitalOcean launches first Canadian data centre in Toronto",
    date: "29th Nov 2023",
    readTime: "5 min read",
    category: "Illustration",
    image: blog2,
    author: "Facebook",
  },
  {
    id: 3,
    title: "Using Banner Stands To Increase Trade Show Traffic",
    date: "29th Dec 2023",
    readTime: "5 min read",
    category: "Music",
    image: blog3,
    author: "Linkedin",
  },
];

export default function BlogSection() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <section
      className={`w-full py-14 md:py-16 ${
        theme === "light" ? "bg-white" : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div
          className="text-center max-w-2xl mx-auto mb-10"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2
            className={`text-3xl md:text-4xl font-bold tracking-tight ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Latest Blog or News
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

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <Card
              key={blog.id}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              data-aos-duration="800"
              className={`group overflow-hidden rounded-2xl border
                transition-all duration-300 hover:-translate-y-2
                hover:shadow-xl ${
                  theme === "light"
                    ? "bg-white border-gray-100 shadow-md"
                    : "bg-gray-900 border-gray-800 shadow-md"
                }`}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover transition-transform
                    duration-500 group-hover:scale-105"
                />

                {/* Category */}
                <span
                  className="absolute top-4 left-4 bg-blue-600
                    text-white text-xs font-medium px-3 py-1.5
                    rounded-full shadow-md"
                >
                  {blog.category}
                </span>
              </div>

              <CardContent className="p-5">

                {/* Date + Read Time */}
                <div
                  className={`flex flex-wrap items-center gap-x-4 gap-y-2
                    text-xs md:text-sm ${
                      theme === "light"
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>{blog.date}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`mt-4 text-lg font-semibold leading-7
                    line-clamp-2 transition-colors duration-300 ${
                      theme === "light"
                        ? "text-gray-900 group-hover:text-blue-600"
                        : "text-white group-hover:text-blue-400"
                    }`}
                >
                  {blog.title}
                </h3>

                {/* Read More */}
                <div className="mt-5 flex items-center justify-between">
                  <button
                    className="inline-flex items-center gap-2
                      text-blue-600 font-semibold text-sm
                      transition-all duration-300
                      hover:text-blue-700"
                  >
                    Read Now
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300
                        group-hover:translate-x-1"
                    />
                  </button>

                  {/* Author */}
                  <span
                    className={`text-xs ${
                      theme === "light"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    By {blog.author}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

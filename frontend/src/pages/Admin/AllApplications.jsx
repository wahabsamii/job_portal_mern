
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaEnvelope,
  FaFileAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { serverUrl } from "../../utils/api";

const AllApplications = () => {
  const [allApplications, setAllApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAllApplications = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${serverUrl}/api/application/all/application`
      );

      setAllApplications(response.data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllApplications();
  }, []);

  const filteredApplications = allApplications.filter((application) => {
    const searchText = search.toLowerCase();

    return (
      application.name?.toLowerCase().includes(searchText) ||
      application.email?.toLowerCase().includes(searchText) ||
      application.phone?.toLowerCase().includes(searchText) ||
      application.address?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="w-full bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-7">
          <div>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <FaFileAlt className="text-sm" />

              <span className="text-xs font-semibold uppercase tracking-widest">
                Application Management
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              All Applications
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Review and manage applications submitted by job seekers.
            </p>
          </div>

          {/* TOTAL */}
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FaFileAlt />
            </div>

            <div>
              <p className="text-xs text-gray-500">Total Applications</p>
              <p className="text-xl font-bold text-gray-900">
                {allApplications.length}
              </p>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by applicant name, email, phone or address..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-11 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
            />
          </div>
        </div>

        {/* RESULTS INFO */}
        {!loading && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredApplications.length}
              </span>{" "}
              application
              {filteredApplications.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

            <p className="text-sm text-gray-500">
              Loading applications...
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredApplications.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <FaFileAlt className="text-xl" />
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              No Applications Found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {search
                ? "No applications match your search."
                : "There are currently no job applications."}
            </p>
          </div>
        )}

        {/* APPLICATIONS */}
        {!loading && filteredApplications.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredApplications.map((application) => (
              <div
                key={application._id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* CARD TOP */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <FaUser />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-gray-900 truncate">
                          {application.name || "Unknown Applicant"}
                        </h3>

                        <div className="flex items-center gap-2 text-gray-500 mt-1">
                          <FaEnvelope className="text-xs shrink-0" />

                          <p className="text-xs truncate">
                            {application.email || "No email provided"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <span className="shrink-0 text-[11px] font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                      Application
                    </span>
                  </div>
                </div>

                {/* CONTACT DETAILS */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                      <FaPhone className="text-xs" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                        Phone
                      </p>

                      <p className="text-sm text-gray-700 break-words">
                        {application.phone || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                      <FaMapMarkerAlt className="text-xs" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                        Address
                      </p>

                      <p className="text-sm text-gray-700 break-words">
                        {application.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* COVER LETTER */}
                <div className="px-5 pb-5">
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaBriefcase className="text-blue-600 text-xs" />

                      <h4 className="text-xs font-bold uppercase tracking-wide text-gray-700">
                        Cover Letter
                      </h4>
                    </div>

                    <p className="text-sm text-gray-600 leading-6 line-clamp-4">
                      {application.coverLetter ||
                        "No cover letter provided."}
                    </p>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-gray-400">
                      <FaCalendarAlt className="text-xs" />

                      <span className="text-xs">
                        Application
                      </span>
                    </div>

                    {application.resume?.url ? (
                      <a
                        href={application.resume.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <FaFileAlt />
                        View Resume
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">
                        No resume
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllApplications;
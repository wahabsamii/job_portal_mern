
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FaBriefcase,
  FaHome,
  FaUser,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { signoutSuccess } from "../redux/user/authUser";

const SeekerSidebar = () => {
  const dispatch = useDispatch();

  const menuItems = [
    {
      title: "Dashboard",
      icon: FaHome,
      path: "/dashboard/seeker",
      end: true,
    },
    {
      title: "View All Jobs",
      icon: FaBriefcase,
      path: "/dashboard/seeker/all-jobs",
    },
    {
      title: "My Applications",
      icon: FaFileAlt,
      path: "/dashboard/seeker/my-applications",
    },
    {
      title: "Profile",
      icon: FaUser,
      path: "/dashboard/seeker/profile",
    },
  ];

  const handleLogout = () => {
    dispatch(signoutSuccess());
  };

  return (
    <aside className="w-64 h-screen shrink-0 bg-gray-900 text-white flex flex-col shadow-xl">

      {/* HEADER */}
      <div className="px-5 py-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <FaBriefcase className="text-lg" />
          </div>

          <div>
            <h2 className="text-lg font-bold leading-tight">
              Jobnova
            </h2>

            <p className="text-xs text-gray-400 mt-0.5">
              Job Seeker Portal
            </p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">

        <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
          Main Menu
        </p>

        <ul className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator */}
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 bg-white rounded-r-full" />
                      )}

                      <Icon
                        className={`text-base ${
                          isActive
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      />

                      <span>{item.title}</span>

                      {isActive && (
                        <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* ACCOUNT */}
        <div className="mt-8">
          <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
            Account
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200"
          >
            <FaSignOutAlt className="text-base text-gray-400" />

            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* FOOTER */}
      <div className="px-4 py-4 border-t border-gray-800">
        <div className="bg-gray-800 rounded-lg px-3 py-3">
          <p className="text-xs font-semibold text-white">
            Job Seeker Account
          </p>

          <p className="text-[11px] text-gray-400 mt-1">
            Find your next opportunity
          </p>
        </div>
      </div>
    </aside>
  );
};

export default SeekerSidebar;
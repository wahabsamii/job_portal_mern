import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaPlusCircle,
  FaFileAlt,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { MdDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/authUser";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(signoutSuccess());
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard/admin",
      icon: MdDashboard,
      end: true, // IMPORTANT
    },
    {
      name: "View All Jobs",
      path: "/dashboard/admin/all-jobs",
      icon: FaBriefcase,
    },
    {
      name: "Add New Job",
      path: "/dashboard/admin/add-job",
      icon: FaPlusCircle,
    },
    {
      name: "All Applications",
      path: "/dashboard/admin/all-applications",
      icon: FaFileAlt,
    },
    {
      name: "Edit Profile",
      path: "/dashboard/admin/profile",
      icon: FaUserCircle,
    },
  ];

  return (
    <aside className="w-64 h-screen shrink-0 bg-gray-900 text-white flex flex-col border-r border-gray-800">
      {/* Header */}
      <div className="px-5 py-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <FaBriefcase className="text-white text-lg" />
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-tight">
              Admin Panel
            </h2>

            <p className="text-xs text-gray-500 mt-0.5">
              Jobnova Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
          Management
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
                    `group relative flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 bg-white rounded-r-full" />
                      )}

                      <Icon
                        className={`text-base transition-transform duration-200 ${
                          isActive
                            ? "text-white"
                            : "text-gray-500 group-hover:text-blue-400 group-hover:scale-110"
                        }`}
                      />

                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Account */}
        <p className="px-3 mt-8 mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
          Account
        </p>

        <ul>
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="group w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <FaSignOutAlt className="text-base text-gray-500 group-hover:text-blue-400 transition-colors" />

              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center">
            <FaUserCircle className="text-gray-400 text-lg" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-200 truncate">
              Administrator
            </p>

            <p className="text-xs text-gray-500">
              Manage your portal
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
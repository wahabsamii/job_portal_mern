
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

function AdminLayout() {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <AdminSidebar />

      {/* Page Content */}
      <main className="flex-1 min-w-0 min-h-0 overflow-y-auto overflow-x-hidden p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;

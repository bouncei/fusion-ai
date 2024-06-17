import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full relative">
      {/* SIDE BAR */}
      <div className="hidden h-full md:flex md:flex-col md:fixed z-[80] md:w-72 md:inset-y-0 bg-gray-900">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <Navbar /> {children}
      </main>
    </div>
  );
}

export default DashboardLayout;

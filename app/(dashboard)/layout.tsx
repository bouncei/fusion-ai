import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import React from "react";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const apiLimitCounts = await getApiLimitCount();

  return (
    <div className="h-full relative">
      {/* SIDE BAR */}
      <div className="hidden h-full md:flex md:flex-col md:fixed  md:w-72 md:inset-y-0 bg-gray-900">
        <Sidebar apiLimitCounts={apiLimitCounts} />
      </div>
      <main className="md:pl-72  h-full ">
        <div className=" sticky top-0">
          <Navbar apiLimitCounts={apiLimitCounts} />
        </div>

        <div className="pb-16">{children}</div>
        <div className=" w-full  fixed bottom-0 ">
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;

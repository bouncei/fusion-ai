import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubsctiption } from "@/lib/subscription";
import React from "react";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const apiLimitCounts = await getApiLimitCount();
  const isPro = await checkSubsctiption();

  return (
    <div className="h-full flex flex-col relative">
      {/* SIDE BAR */}
      <div className="hidden h-full md:flex md:flex-col md:fixed  md:w-72 md:inset-y-0 bg-gray-900">
        <Sidebar apiLimitCounts={apiLimitCounts} isPro={isPro} />
      </div>
      <main className="md:pl-72 flex flex-1 flex-col ">
        <div className=" sticky top-0">
          <Navbar apiLimitCounts={apiLimitCounts} isPro={isPro} />
        </div>

        <div className="pb-10">{children}</div>
      </main>

      <div className="md:pl-72">
        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;

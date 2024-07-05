import Footer from "@/components/Footer";
import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full ">{children}</div>

      <div className=" "></div>
    </main>
  );
};

export default LandingLayout;

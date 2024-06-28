import Footer from "@/components/Footer";
import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full ">{children}</div>

      <div className=" w-full  fixed bottom-0 ">
        <Footer />
      </div>
    </main>
  );
};

export default LandingLayout;

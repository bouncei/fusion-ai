import Footer from "@/components/Footer";
import LandingContent from "@/components/LandingContent";
import LandingHero from "@/components/LandingHero";
import LandingNavBar from "@/components/LandingNavBar";
import React from "react";

function LandingPgae() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-1 flex-col">
        <LandingNavBar />
        <LandingHero />
        <LandingContent />
      </div>

      <Footer />
    </div>
  );
}

export default LandingPgae;

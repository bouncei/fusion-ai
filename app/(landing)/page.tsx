import LandingContent from "@/components/LandingContent";
import LandingHero from "@/components/LandingHero";
import LandingNavBar from "@/components/LandingNavBar";
import React from "react";

function LandingPgae() {
  return (
    <div className="h-full">
      <LandingNavBar />
      <LandingHero />
      <LandingContent />
    </div>
  );
}

export default LandingPgae;

/**
 * Landing Page component.
 *
 * This component renders the landing page of the application, including the navigation bar, hero section, content section, and footer.
 *
 * @example
 * <LandingPage />
 */
import Footer from "@/components/Footer";
import LandingContent from "@/components/LandingContent";
import LandingHero from "@/components/LandingHero";
import LandingNavBar from "@/components/LandingNavBar";
import React from "react";

/**
 * Landing Page component function.
 *
 * @returns {JSX.Element} The JSX element representing the landing page.
 */
function LandingPage() {
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

export default LandingPage;

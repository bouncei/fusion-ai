"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className=" font-bold py-36 text-center space-y-5">
      <div className="text-4xl tracking-wide sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className=" text-transparent bg-clip-text bg-gradient-to-r  from-[#01acb6] via-[#01b6ad] to-[#06f6a2] ">
          <TypewriterComponent
            options={{
              strings: [
                "Chatbot.",
                "Photo Generation.",
                "Music Generation.",
                "Code Generation.",
                "Video Generation.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>

      <div className="text-sm md:text-xl font-light tracking-wide text-zinc-600">
        Create content using AI 10x faster
      </div>

      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            className="md:text-lg p-4 md:p-6 rounded-full"
            variant="premium"
          >
            Start Generating For Free
          </Button>
        </Link>
      </div>

      <div className="text-zinc-600 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
    </div>
  );
};

export default LandingHero;

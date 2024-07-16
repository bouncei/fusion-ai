"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Github, Heart, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const LandingNavBar = () => {
  const { setTheme } = useTheme();
  const { isSignedIn } = useAuth();

  return (
    <div className="p-4 sticky top-0  bg-opacity-70  bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative size-4 md:h-8 md:w-8 mr-4">
          <Image fill alt="logo" src="/logo.png" />
        </div>

        <h1 className={cn("text-lg md:text-2xl font-bold", font.className)}>
          FusionAI
        </h1>
      </Link>

      <div className="flex items-center gap-x-1 md:gap-x-2">
        <div className="hidden md:flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Link
                    href="https://github.com/bouncei/fusion-ai"
                    target="_blank"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Help us grow! Star our repo and contribute ⭐️</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="hidden md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className=" rounded-full">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          variant="sponsor"
          asChild
          className="rounded-full text-xs md:text-sm"
        >
          <Link href="https://www.patreon.com/user?u=61298522" target="_blank">
            <Heart className="mr-2 h-4 w-4" /> Sponsor
          </Link>
        </Button>

        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <Button variant="outline" className="rounded-full text-xs md:text-sm">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingNavBar;

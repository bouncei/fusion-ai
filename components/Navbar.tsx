"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./MobileSidebar";
import { Github, Heart, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";

interface NavbarProps {
  apiLimitCounts: number;
  isPro: boolean;
}

const Navbar = ({ apiLimitCounts = 0, isPro = false }: NavbarProps) => {
  const { setTheme } = useTheme();

  return (
    <div className="bg-transparent bg-opacity-30 backdrop-blur-sm  flex items-center  p-4">
      <MobileSidebar apiLimitCounts={apiLimitCounts} isPro={isPro} />

      <div className="w-full space-x-2 flex items-center justify-end">
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

        <Button variant="sponsor" asChild className=" rounded-full">
          <Link href="https://www.patreon.com/user?u=61298522" target="_blank">
            <Heart className="mr-2 h-4 w-4" /> Sponsor
          </Link>
        </Button>

        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;

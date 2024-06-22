"use client";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import FreeCounter from "./FreeCounter";
import { TOOLS } from "@/constants";

interface SideBarProps {
  apiLimitCounts: number;
}

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const Sidebar = ({ apiLimitCounts }: SideBarProps) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill src="/logo.png" alt="Logo" />
          </div>

          <h1 className={cn("text-xl font-bold", montserrat.className)}>
            Fusion AI
          </h1>
        </Link>

        <div className="space-y-1">
          {TOOLS.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group p-3 flex w-full justify-start items-center font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <FreeCounter apiLimitCounts={apiLimitCounts} />
    </div>
  );
};

export default Sidebar;

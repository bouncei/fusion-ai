"use client";

import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-sky-500",
  },

  {
    label: "Conversation",
    href: "/conversation",
    icon: MessageSquare,
    color: "text-violet-500",
  },

  {
    label: "Image Generation",
    href: "/image",
    icon: ImageIcon,
    color: "text-pink-500",
  },

  {
    label: "Video Generation",
    href: "/video",
    icon: VideoIcon,
    color: "text-orange-500",
  },

  {
    label: "Music Generation",
    href: "/music",
    icon: Music,
    color: "text-red-500",
  },

  {
    label: "Code Generation",
    href: "/code",
    icon: Code,
    color: "text-green-500",
  },

  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    color: "",
  },
];

const Sidebar = () => {
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
          {routes.map((route) => (
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
    </div>
  );
};

export default Sidebar;

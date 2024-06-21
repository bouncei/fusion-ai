"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, ImageIcon, MessageSquare, Music } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },

  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/image",
  },

  {
    label: "Music Generation",
    icon: Music,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: "/music",
  },

  {
    label: "Video Generation",
    icon: MessageSquare,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/video",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl text-center tracking-wider font-bold">
          Welcome to FusionAI
        </h2>

        <p className="text-muted-foreground font-light tracking-wide text-sm md:text-lg text-center">
          Experience the power of AI ~ Where knowledge begins
        </p>
      </div>

      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 cursor-pointer flex  items-center justify-between hover:shadow-md transition"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>

              <div className="font-semibold">{tool.label}</div>
            </div>

            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </>
  );
}

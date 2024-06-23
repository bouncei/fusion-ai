"use client";

import { Card } from "@/components/ui/card";
import { tools } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

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

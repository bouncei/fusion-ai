import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { MessageSquare } from "lucide-react";
import Image from "next/image";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversations",
  },
];

export default function DashboardPage() {
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

      <div className="px-4 md:px-20 lg:px-32 space-y-4"></div>
    </>
  );
}

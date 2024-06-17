import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="flex items-center justify-between">
      <h3>Welcome to FusionAI</h3>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

import Heading from "@/components/Heading";
import SubscriptionButton from "@/components/SubscriptionButton";
import { checkSubsctiption } from "@/lib/subscription";
import { Settings } from "lucide-react";
import React from "react";

const SettingsPage = async () => {
  const isPro = await checkSubsctiption();

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage account settings"
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="text-gray-700/10"
      />

      <div className="px-6 lg:px-10 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro
            ? "You are currently on a pro plan. "
            : "You are currently on a free plan."}
        </div>

        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;

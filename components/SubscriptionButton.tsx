"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader, Zap } from "lucide-react";
import axios from "axios";

interface SubscriptionButtonprops {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonprops) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log("BILLING_ERROR", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      variant={isPro ? "default" : "premium"}
    >
      {loading && <Loader className="w-4 h-4 mr-2" />}
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2" />}
    </Button>
  );
};

export default SubscriptionButton;

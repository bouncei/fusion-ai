"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";

interface FreeCounterProps {
  apiLimitCounts: number;
}

const FreeCounter = ({ apiLimitCounts }: FreeCounterProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4">
            <p className="">
              {apiLimitCounts} / {MAX_FREE_COUNTS} Free Generation
            </p>
            <Progress
              className="h-3 mt-1"
              value={(apiLimitCounts / MAX_FREE_COUNTS) * 100}
              max={MAX_FREE_COUNTS}
            />
          </div>

          <Button className="w-full" variant="premium">
            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
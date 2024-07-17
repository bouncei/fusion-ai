import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonHeading = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
};

export default SkeletonHeading;

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonChatItem = () => {
  return (
    <div className="flex p-4 items-center gap-x-8 rounded-lg">
      <Skeleton className="w-14 h-14 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

export default SkeletonChatItem;

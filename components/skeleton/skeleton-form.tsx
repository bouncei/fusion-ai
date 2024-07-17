import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonForm = () => {
  return (
    <div className="rounded-lg border w-full p-4 md:px-6 px-3 grid grid-cols-12 gap-2">
      <div className="col-span-12 lg:col-span-10">
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="col-span-12 lg:col-span-2">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

export default SkeletonForm;

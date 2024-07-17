import SkeletonChatItem from "@/components/skeleton/skeleton-chat-item";
import SkeletonForm from "@/components/skeleton/skeleton-form";
import SkeletonHeading from "@/components/skeleton/skeleton-header";
import React from "react";

const Loading = () => {
  return (
    <div className="px-4 lg:px-8">
      <div className="space-y-4">
        <SkeletonHeading />
        <SkeletonForm />
        <div className="space-y-4 mt-4">
          {[0, 1, 2, 3, 4].map((_, index) => (
            <SkeletonChatItem key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;

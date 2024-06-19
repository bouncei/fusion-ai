import Image from "next/image";
import React from "react";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="relative h-10 w-10 animate-spin">
        <Image alt="loader" fill src="/logo.png" />
      </div>

      <p className="text-sm text-muted-foreground">Fusion is thinking...</p>
    </div>
  );
};

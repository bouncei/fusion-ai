import Image from "next/image";
import React from "react";

interface EmptyProps {
  label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image alt="Empty" src="/empty.png" fill />
      </div>

      <p className=" text-muted-foreground text-center text-sm">{label}</p>
    </div>
  );
};

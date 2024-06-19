import { useUser } from "@clerk/nextjs";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserAvatar = () => {
  const { user } = useUser();

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="" src={user?.imageUrl} />

      {/* INCASE THE IMAGE DOESN'T LOAD */}
      <AvatarFallback className="">
        {user?.firstName?.charAt(0)} {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

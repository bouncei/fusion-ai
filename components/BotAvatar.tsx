import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function BotAvatar() {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src="/logo.png" className="p-1" alt="bot-image" />
    </Avatar>
  );
}

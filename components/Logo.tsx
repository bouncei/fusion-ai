import { Menu } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const Logo = () => {
  return (
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu />
    </Button>
  );
};

export default Logo;

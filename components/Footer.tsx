import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full bg-opacity-80  p-4 lg:p-8">
      <div className="text-sm text-muted-foreground ">
        {" "}
        © {new Date().getFullYear()} FusionAI. Made with love by{" "}
        <Link
          href="https://bouncei.vercel.app"
          target="_blank"
          className=" font-semibold"
        >
          <Button className="p-0 m-0 text-muted-foreground" variant="link">
            Bouncey ❤️
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Footer;

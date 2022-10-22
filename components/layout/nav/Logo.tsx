import { useState } from "react";
import Link from "next/link";
import corndocsConfig from "../../../corndocs.config";

const Logo = () => {
  return (
    <Link href="/">
      <a className="flex h-full cursor-pointer items-center justify-start gap-2 text-xl font-black">
        <span className="relative h-10 w-24 overflow-hidden">
          {corndocsConfig.project.logo}
        </span>
        <span className="hidden md:inline-block">
          {corndocsConfig.project.name}
        </span>
      </a>
    </Link>
  );
};

export default Logo;

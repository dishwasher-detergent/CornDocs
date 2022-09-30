import Link from "next/link";
import React from "react";

interface NavItemProps {
  path: string;
  children: React.ReactChild;
}

const NavItem = ({ path, children }: NavItemProps) => {
  return (
    <Link href={`/${path}`} passHref>
      <a className="flex flex-row flex-nowrap items-center gap-2 truncate px-3 py-1.5 hover:bg-amber-300/20">
        {children}
      </a>
    </Link>
  );
};

export default NavItem;

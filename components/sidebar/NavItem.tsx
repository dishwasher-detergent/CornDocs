import Link from "next/link";
import Image from "next/image";
import React from "react";

interface NavItemProps {
  slug: string;
  children: React.ReactChild;
}

const NavItem = ({ slug, children }: NavItemProps) => {
  return (
    <Link href={`/${slug}`} passHref>
      <a className="flex flex-row flex-nowrap items-center gap-2 truncate px-3 py-1.5 hover:bg-amber-300/20">
        {children}
      </a>
    </Link>
  );
};

export default NavItem;

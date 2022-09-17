import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItem from "./NavItem";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

function Header() {
  const { theme, setTheme } = useTheme();
  const customLoader = ({ src }: any) => {
    return src;
  };
  return (
    <header className="w-full flex justify-center border-b border-slate-300 dark:bg-slate-900 dark:border-slate-700">
      <div className="flex justify-between px-6 h-20 w-full max-w-7xl">
        <Link href="/" passHref>
          <div className="flex gap-4 align-center items-center">
            <Image
              loader={customLoader}
              src={`${prefix}/static/logo.svg`}
              alt="Profile Image"
              height={60}
              width={60}
              className="cursor-pointer"
            />
            <span className="font-bold text-lg xl:text-2xl md:text-xxl hidden md:block cursor-pointer dark:text-white">
              {process.env.NEXT_PUBLIC_OWNER_NAME}
            </span>
          </div>
        </Link>
        <nav className="flex gap-4 items-center">
          <button
            className="text-gray-900 dark:text-white"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" /> }
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;

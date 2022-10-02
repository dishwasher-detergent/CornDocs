import React from "react";
import Logo from "./Logo";
import DarkToggle from "./DarkToggle";
import SidebarToggle from "./SidebarToggle";

function Nav() {
  return (
    <header className="fixed top-0 z-20 flex h-16 w-full flex-none items-center justify-center border-b border-slate-300 bg-white/80 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80 dark:text-white">
      <div className="flex h-full w-full max-w-screen-2xl items-center justify-between px-6 py-2">
        <Logo />
        {/* <Search /> */}
        <div className="flex flex-row justify-end gap-4">
          <DarkToggle />
          <SidebarToggle />
        </div>
      </div>
    </header>
  );
}

export default Nav;

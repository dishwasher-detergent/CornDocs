import React from "react";
import Logo from "./Logo";
import DarkToggle from "./DarkToggle";

function Nav() {
  return (
    <header className="flex h-16 w-full flex-none items-center justify-center border-b border-slate-300 dark:border-slate-700">
      <div className="flex h-full w-full max-w-screen-2xl items-center justify-between px-6 py-2">
        <Logo />
        {/* <Search /> */}
        <DarkToggle />
      </div>
    </header>
  );
}

export default Nav;

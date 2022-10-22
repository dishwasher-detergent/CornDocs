import React, { useContext } from "react";
import { DarkmodeContext } from "../../context/DarkModeContext";
import Nav from "./nav";
import Sidebar from "./sidebar";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: LayoutProps) {
  /* @ts-ignore */
  const { darkmode } = useContext(DarkmodeContext);

  return (
    <div className={`${darkmode && "dark"}`}>
      <div className="flex min-h-screen w-full flex-col items-center dark:bg-slate-900">
        <Nav />
        <div className="w-full max-w-[90rem] flex-1 px-4 sm:px-6 md:px-8">
          <Sidebar />
          <main className="lg:pl-[19.5rem]">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default Layout;

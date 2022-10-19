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
      <div className="min-h-screen dark:bg-slate-900">
        <Nav />
        <div className="h-full">
          <div className="mx-auto h-full max-w-[90rem] px-4 sm:px-6 md:px-8">
            <Sidebar />
            <main className="lg:pl-[19.5rem]">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;

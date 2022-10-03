import React, { useContext } from "react";
import Div100vh from "react-div-100vh";
import { DarkmodeContext } from "../../context/DarkModeContext";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: LayoutProps) {
  /* @ts-ignore */
  const { darkmode } = useContext(DarkmodeContext);

  return (
    <Div100vh
      className={`${
        darkmode ? "dark" : ""
      }`}
    >
      <div className="h-full w-full overflow-hidden dark:bg-slate-900 bg-white">
        {children}
      </div>
    </Div100vh>
  );
}

export default Layout;

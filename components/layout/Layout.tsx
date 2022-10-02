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
      className={`flex flex-row overflow-hidden transition-all ${
        darkmode ? "dark" : ""
      }`}
    >
      {children}
    </Div100vh>
  );
}

export default Layout;

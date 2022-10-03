import React, { useContext } from "react";
import Div100vh from "react-div-100vh";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: LayoutProps) {
  return (
    <Div100vh
      className={`flex flex-row overflow-hidden transition-all dark:bg-slate-900 bg-white`}
    >
      {children}
    </Div100vh>
  );
}

export default Layout;

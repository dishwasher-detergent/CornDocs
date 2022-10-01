import React from "react";
import Div100vh from "react-div-100vh";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: LayoutProps) {
  return (
    <Div100vh className="flex flex-col overflow-hidden">{children}</Div100vh>
  );
}

export default Layout;

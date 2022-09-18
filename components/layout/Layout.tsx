import React from "react";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      {children}
    </div>
  );
}

export default Layout;

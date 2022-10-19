import React, { createContext, useState } from "react";

/* @ts-ignore */
const SidebarContext = createContext();

interface ProviderProps {
  children: React.ReactChild;
}

const SidebarProvider = ({ children }: ProviderProps) => {
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <SidebarContext.Provider value={{ sidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarProvider, SidebarContext };

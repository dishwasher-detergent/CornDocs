import React, { createContext, useState } from "react";

/* @ts-ignore */
const SidebarContext = createContext();

interface ProviderProps {
  children: React.ReactChild;
}

const SidebarProvider = ({ children }: ProviderProps) => {
  const [sidebar, setSidebar] = useState<boolean>(true);
  const toggleSidebar = (bool: boolean) => {
    if (bool != null || bool != undefined) setSidebar(bool);
    else setSidebar(!sidebar);
  };
  return (
    <SidebarContext.Provider value={{ sidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarProvider, SidebarContext };

import React, { createContext, useState } from "react";

/* @ts-ignore */
const DarkmodeContext = createContext();

interface ProviderProps {
  children: React.ReactChild;
}

const DarkmodeProvider = ({ children }: ProviderProps) => {
  const [darkmode, setDarkmode] = useState(true);
  const toggleDarkmode = () => {
    setDarkmode(!darkmode);
  };
  return (
    <DarkmodeContext.Provider value={{ darkmode, toggleDarkmode }}>
      {children}
    </DarkmodeContext.Provider>
  );
};

export { DarkmodeProvider, DarkmodeContext };

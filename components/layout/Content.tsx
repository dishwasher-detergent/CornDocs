import { SidebarContext } from "../../context/SidebarContext";
import { useContext } from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Content = ({ children }: Props) => {
  /* @ts-ignore */
  const { sidebar } = useContext(SidebarContext);

  return (
    <div className={`relative flex h-full w-full flex-row justify-start overflow-hidden overflow-y-auto bg-white pt-16 text-slate-900 dark:bg-slate-900 lg:pl-64 ${sidebar ? "" : "md:pl-64"}`}>
      {children}
    </div>
  );
};

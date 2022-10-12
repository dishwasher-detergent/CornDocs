import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";

const SidebarToggle = () => {
  /* @ts-ignore */
  const { sidebar, toggleSidebar } = useContext(SidebarContext);

  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center"
      onClick={() => toggleSidebar()}
    >
      <span className="sr-only">Navigation</span>
      {sidebar ? (
        <Bars3BottomRightIcon className="h-6 w-6" />
      ) : (
        <XMarkIcon className="h-6 w-6" />
      )}
    </button>
  );
};

export default SidebarToggle;

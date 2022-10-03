import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";

const SidebarToggle = () => {
  /* @ts-ignore */
  const { sidebar, toggleSidebar } = useContext(SidebarContext);

  return (
    <button
      className="block text-gray-900 dark:text-white lg:hidden"
      onClick={() => toggleSidebar()}
    >
      {sidebar ? (
        <Bars3BottomRightIcon className="h-6 w-6" />
      ) : (
        <XMarkIcon className="h-6 w-6" />
      )}
    </button>
  );
};

export default SidebarToggle;

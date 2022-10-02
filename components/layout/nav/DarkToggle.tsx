import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { DarkmodeContext } from "../../../context/DarkModeContext";

const DarkToggle = () => {
  /* @ts-ignore */
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);

  return (
    <button
      className="text-gray-900 dark:text-white"
      onClick={() => toggleDarkmode()}
    >
      {darkmode ? (
        <SunIcon className="h-6 w-6" />
      ) : (
        <MoonIcon className="h-6 w-6" />
      )}
    </button>
  );
};

export default DarkToggle;

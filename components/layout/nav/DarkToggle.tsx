import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { DarkmodeContext } from "../../../context/DarkModeContext";

const DarkToggle = () => {
  /* @ts-ignore */
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);

  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center"
      onClick={() => toggleDarkmode()}
    >
      <span className="sr-only">Navigation</span>
      {darkmode ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
};

export default DarkToggle;

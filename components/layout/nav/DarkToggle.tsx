import { Sun, Moon } from "lucide-react";
import { useContext } from "react";
import { DarkmodeContext } from "../../../context/DarkModeContext";
import corndocsConfig from "../../../corndocs.config.js";

const DarkToggle = () => {
  /* @ts-ignore */
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);

  if (!corndocsConfig.darkMode) return null;

  return (
    <button
      className={`rounded-md p-2 hover:bg-slate-200 hover:dark:bg-slate-800`}
      onClick={() => toggleDarkmode()}
    >
      <span className="sr-only">Navigation</span>
      {darkmode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default DarkToggle;

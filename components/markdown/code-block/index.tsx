import React, { useState, useEffect, useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Prism from "prismjs";
import Responsive from "./resize";
import {
  TerminalSquare,
  Laptop,
  Smartphone,
  Sun,
  Moon,
  Clipboard,
  ClipboardCheck,
  Image,
} from "lucide-react";
import { DarkmodeContext } from "../../../context/DarkModeContext";

interface CodeBlockProps {
  className: string;
  children: any;
}

const CodeBlock = ({ children }: CodeBlockProps) => {
  /* @ts-ignore */
  const { darkmode } = useContext(DarkmodeContext);

  const [isCopied, setIsCopied] = useState(false);
  const [code, setCode] = useState(true);
  const [dark, setDark] = useState(darkmode);
  const [size, setSize] = useState<number>(1500);
  const [language, setLanguage] = useState<string>(children.props.className);
  const [preview, setPreview] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, [language]);

  useEffect(() => {
    if (children.props.className.includes("preview")) {
      setPreview(true);
      setCode(false);
      setLanguage(children.props.className.replace("-preview", ""));
    }
  }, []);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  }, [isCopied]);

  return (
    <>
      {preview && (
        <nav className="relative flex h-12 w-full flex-row items-center gap-2">
          <div className="flex h-full w-full flex-row items-center gap-2">
            <button
              onClick={() => setSize(420)}
              className={`rounded-md p-2 hover:bg-slate-200 hover:dark:bg-slate-800 ${
                size == 420 && "bg-slate-200 dark:bg-slate-800"
              }`}
            >
              <Smartphone size={20} />
            </button>
            <button
              onClick={() => setSize(1500)}
              className={`${
                size == 1500 && "bg-slate-200 dark:bg-slate-800"
              } rounded-md p-2 hover:bg-slate-200 hover:dark:bg-slate-800`}
            >
              <Laptop size={20} />
            </button>
          </div>
          <button
            type="button"
            className={`rounded-md p-2 hover:bg-slate-200 hover:dark:bg-slate-800`}
            onClick={() => setDark(!dark)}
          >
            <span className="sr-only">Navigation</span>
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className={`rounded-md p-2 hover:bg-slate-200 hover:dark:bg-slate-800`}
            onClick={() => setCode(!code)}
          >
            {!code ? <TerminalSquare size={20} /> : <Image size={20} />}
          </button>
        </nav>
      )}
      <div style={{ display: code ? "" : "none" }}>
        <div className="not-prose relative">
          <pre
            className={`${language} h-full max-h-[48rem] w-full overflow-auto rounded-md`}
          >
            <code className={`${language}`}>{children}</code>
          </pre>

          <CopyToClipboard
            text={children.props.children}
            onCopy={() => setIsCopied(true)}
          >
            <button className="absolute top-2 right-2 rounded-md bg-slate-600/50 p-1.5 text-slate-50 hover:bg-slate-600">
              {isCopied ? (
                <ClipboardCheck size={20} className="text-emerald-300" />
              ) : (
                <Clipboard size={20} />
              )}{" "}
            </button>
          </CopyToClipboard>
        </div>
      </div>
      {preview && (
        <div className="not-prose" style={{ display: code ? "none" : "" }}>
          <Responsive size={size} dark={dark}>
            {children.props.children}
          </Responsive>
        </div>
      )}
    </>
  );
};

export default CodeBlock;

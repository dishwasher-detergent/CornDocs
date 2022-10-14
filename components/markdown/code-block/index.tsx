import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Prism from "prismjs";
import Responsive from "./resize";
import {
  CommandLineIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  PhotoIcon,
  SunIcon,
  MoonIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

interface CodeBlockProps {
  className: string;
  children: any;
}

const CodeBlock = ({ children }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [code, setCode] = useState(true);
  const [dark, setDark] = useState(false);
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

  return (
    <>
      {preview && (
        <nav className="relative flex h-12 w-full flex-row items-center gap-2">
          <div className="flex h-full w-full flex-row items-center gap-2">
            <button
              onClick={() => setSize(420)}
              className={`rounded-md p-2 hover:bg-slate-300 hover:dark:bg-slate-800 ${
                size == 420 && "bg-slate-300 dark:bg-slate-800"
              }`}
            >
              <DevicePhoneMobileIcon width={20} height={20} />
            </button>
            <button
              onClick={() => setSize(1500)}
              className={`${
                size == 1500 && "bg-slate-300 dark:bg-slate-800"
              } rounded-md p-2 hover:bg-slate-300 hover:dark:bg-slate-800`}
            >
              <ComputerDesktopIcon width={20} height={20} />
            </button>
          </div>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center"
            onClick={() => setDark(!dark)}
          >
            <span className="sr-only">Navigation</span>
            {dark ? (
              <SunIcon width={20} height={20} />
            ) : (
              <MoonIcon width={20} height={20} />
            )}
          </button>
          <button
            className={`rounded-md p-2 hover:bg-slate-300 hover:dark:bg-slate-800`}
            onClick={() => setCode(!code)}
          >
            {!code ? (
              <CommandLineIcon width={20} height={20} />
            ) : (
              <PhotoIcon width={20} height={20} />
            )}
          </button>
        </nav>
      )}
      <div style={{ display: code ? "" : "none" }}>
        <div className="not-prose relative">
          <pre className={`${language} h-full w-full`}>
            <code className={`${language}`}>{children}</code>
          </pre>

          <CopyToClipboard
            text={children.props.children}
            onCopy={() => setIsCopied(true)}
          >
            <button className="absolute top-2 right-2 rounded-md bg-slate-200/10 p-1.5 text-slate-50 hover:bg-slate-200/40">
              {isCopied ? (
                <ClipboardDocumentCheckIcon
                  width={20}
                  height={20}
                  className="text-emerald-300"
                />
              ) : (
                <ClipboardDocumentIcon width={20} height={20} />
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

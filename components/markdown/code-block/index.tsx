import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/20/solid";
import Prism from "prismjs";

interface CodeBlockProps {
  className: string;
  children: string;
}

const CodeBlock = ({ className = "lang-js", children }: CodeBlockProps) => {
  const language = className.replace("lang-", "");

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);

  return (
    <div className="relative">
      <pre className="h-full w-full">
        <code className={`language-${language}`}>{children}</code>
      </pre>

      <CopyToClipboard text={children} onCopy={() => setIsCopied(true)}>
        <button className="absolute top-2 right-2 rounded-md bg-slate-200/10 p-1.5 text-slate-50 hover:bg-slate-200/40">
          {isCopied ? (
            <ClipboardDocumentCheckIcon className="h-4 w-4 text-emerald-300" />
          ) : (
            <ClipboardDocumentIcon className="h-4 w-4" />
          )}{" "}
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default CodeBlock;

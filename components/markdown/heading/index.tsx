import React, { ReactNode } from "react";

export const H2 = ({ children }: { children?: ReactNode }) => {
  return (
    <h2 className={`group relative flex items-center`}>
      <a
        href={`#${children?.toString().replace(/\s+/g, "-").toLowerCase()}`}
        id={`${children?.toString().replace(/\s+/g, "-").toLowerCase()}`}
        className={`absolute -left-8 grid place-content-center rounded-md border border-slate-300 px-1.5 py-0 text-base font-bold no-underline opacity-0 transition-all group-hover:opacity-100 dark:border-slate-700`}
      >
        #
      </a>
      {children}
    </h2>
  );
};

export const H3 = ({ children }: { children?: ReactNode }) => {
  return (
    <h3 className={`group relative flex items-center`}>
      <a
        href={`#${children?.toString().replace(/\s+/g, "-").toLowerCase()}`}
        id={`${children?.toString().replace(/\s+/g, "-").toLowerCase()}`}
        className={`absolute -left-8 grid place-content-center rounded-md border border-slate-300 px-1.5 py-0 text-base font-bold no-underline opacity-0 transition-all group-hover:opacity-100 dark:border-slate-700`}
      >
        #
      </a>
      {children}
    </h3>
  );
};

export const H4 = ({ children }: { children?: ReactNode }) => {
  return (
    <h4 className={`group relative flex items-center`}>
      <a
        href={`#${children?.toString().replace(/\s+/g, "-").toLowerCase()}`}
        id={`${children?.toString().replace(/\s+/g, "-").toLowerCase()}`}
        className={`absolute -left-8 grid place-content-center rounded-md border border-slate-300 px-1.5 py-0 text-base font-bold no-underline opacity-0 transition-all group-hover:opacity-100 dark:border-slate-700`}
      >
        #
      </a>
      {children}
    </h4>
  );
};

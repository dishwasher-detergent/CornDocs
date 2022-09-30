import React, { ReactNode } from "react";

export const H2 = ({ children }: { children?: ReactNode }) => {
  return (
    <h2>
      <a
        href={`#${children?.toString().replace(/\s+/g, "-").toLowerCase()}`}
        id={`${children?.toString().replace(/\s+/g, "-").toLowerCase()}`}
        className={`no-underline`}
      >
        {children}
      </a>
    </h2>
  );
};

export const H3 = ({ children }: { children?: ReactNode }) => {
  return (
    <h3>
      <a
        href={`#${children?.toString().replace(/\s+/g, "-").toLowerCase()}`}
        id={`${children?.toString().replace(/\s+/g, "-").toLowerCase()}`}
        className={`no-underline`}
      >
        {children}
      </a>
    </h3>
  );
};

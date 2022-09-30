import React, { ReactNode } from "react";

const Heading = ({ children }: { children?: ReactNode }) => {
  return (
    <h2>
      <a
        href={`#${children?.toString().replace(/\s+/g, "-").toLowerCase()}`}
        className={`no-underline`}
      >
        {children}
      </a>
    </h2>
  );
};

export default Heading;

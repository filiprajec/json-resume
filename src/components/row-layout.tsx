import React, { forwardRef } from "react";

import * as classes from "./layouts.module.css";

interface RowLayoutProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const RowLayout = forwardRef<HTMLDivElement, RowLayoutProps>(
  ({ children, style }, ref) => (
    <div
      className={[classes.container, classes.gridVertical].join(" ")}
      style={style}
      ref={ref}
    >
      {children}
    </div>
  )
);

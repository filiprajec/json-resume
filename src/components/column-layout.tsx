import React, { forwardRef } from "react";

import * as classes from "./layouts.module.css";

interface ColumnLayoutProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const ColumnLayout = forwardRef<HTMLDivElement, ColumnLayoutProps>(
  ({ children, style }, ref) => (
    <div
      className={[classes.container, classes.gridHorizontal].join(" ")}
      style={style}
      ref={ref}
    >
      {children}
    </div>
  )
);

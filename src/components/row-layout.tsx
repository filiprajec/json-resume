import React, { forwardRef } from "react";

import classes from "./layouts.module.scss";

const { container, vertical } = classes;

interface RowLayoutProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const RowLayout = forwardRef<HTMLDivElement, RowLayoutProps>(
  ({ children, style }, ref) => (
    <div className={[container, vertical].join(" ")} style={style} ref={ref}>
      {children}
    </div>
  )
);

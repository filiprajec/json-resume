import React, { forwardRef } from "react";

import classes from "./layouts.module.scss";

const { container, horizontal } = classes;

interface ColumnLayoutProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const ColumnLayout = forwardRef<HTMLDivElement, ColumnLayoutProps>(
  ({ children, style }, ref) => (
    <div className={[container, horizontal].join(" ")} style={style} ref={ref}>
      {children}
    </div>
  )
);

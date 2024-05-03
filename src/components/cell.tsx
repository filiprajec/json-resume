import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";

import { useGrid } from "../context";
import * as classes from "./layouts.module.css";

interface CellLayoutProps {
  children?: React.ReactNode;
  fraction?: number;
  outlined?: boolean;
  style?: React.CSSProperties;
}

export const Cell = forwardRef<HTMLDivElement, CellLayoutProps>(
  ({ children, fraction = 1, outlined = false, style }, ref) => {
    const cellRef = useRef<HTMLDivElement>(null);
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => cellRef.current,
      [cellRef]
    );
    const { outlineColor, outlineWidth } = useGrid();
    const getOutlinedClassFromProp = (outlinedProp) =>
      outlinedProp ? classes.cellOutlined : "";

    const cellClassName = [
      classes.cell,
      getOutlinedClassFromProp(outlined),
    ].join(" ");

    const cellStyle = {
      flex: fraction,
      ...style,
    };

    useEffect(() => {
      if (cellRef.current) {
        if (typeof window !== "undefined") {
          const { boxShadow } = window.getComputedStyle(cellRef.current);
          if (boxShadow && boxShadow !== "none") {
            let boxShadowUpdated = boxShadow.replaceAll(
              "rgb(0, 0, 0)",
              outlineColor
            );
            boxShadowUpdated = boxShadowUpdated.replaceAll(
              "1px",
              `${outlineWidth}px`
            );
            cellRef.current.style.boxShadow = boxShadowUpdated;
          }
        }
      }
    }, [cellRef]);

    return (
      <div className={cellClassName} style={cellStyle} ref={cellRef}>
        {children}
      </div>
    );
  }
);

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useMemo,
} from "react";

import classes from "./layouts.module.scss";
import { GridProvider } from "../context/grid-context";

const { grid } = classes;

interface GridProps {
  outlineColor?: string;
  outlineWidth?: number;
  outlined?: boolean;
  children: React.ReactNode;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      outlineColor = "rgb(0, 0, 0)",
      outlineWidth = 1,
      outlined = false,
      children,
    },
    ref
  ) => {
    const gridRef = useRef<HTMLDivElement>(null);

    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => gridRef.current,
      [gridRef]
    );

    useEffect(() => {
      if (gridRef.current) {
        if (typeof window !== "undefined") {
          const { boxShadow } = window.getComputedStyle(gridRef.current);
          if (boxShadow && boxShadow !== "none") {
            let boxShadowUpdated = boxShadow.replaceAll(
              "rgb(0, 0, 0)",
              outlineColor
            );
            boxShadowUpdated = boxShadowUpdated.replaceAll(
              "1px",
              `${outlined ? outlineWidth : "0"}px`
            );
            gridRef.current.style.boxShadow = boxShadowUpdated;
            gridRef.current.style.paddingLeft = `${outlineWidth}px`;
            gridRef.current.style.paddingTop = `${outlineWidth}px`;
          }
        }
      }
    }, [gridRef]);

    const value = useMemo(
      () => ({ outlineColor, outlineWidth, gridRef }),
      [outlineColor, outlineWidth, gridRef]
    );

    return (
      <GridProvider value={value}>
        <div className={grid} ref={gridRef}>
          {children}
        </div>
      </GridProvider>
    );
  }
);

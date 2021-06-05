/* 
    index.js (Layouts)
    <> Filip Rajec
*/

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useContext,
  createContext,
} from "react";
import PropTypes from "prop-types";
import stylePropType from "react-style-proptype";

import { childrenPropType } from "../../../../../../dingohead-creative/src/utils/customPropTypes";

import StyleSheet from "./Layouts.module.scss";

const { container, cell, horizontal, vertical, grid } = StyleSheet;

const GridContext = createContext({
  outlineColor: "rgb(0, 0, 0)",
  outlineWidth: 1,
  gridRef: null,
});

export const Grid = forwardRef(
  (
    { outlineColor = "rgb(0, 0, 0)", outlineWidth = 1, outlined = false, children = null },
    ref
  ) => {
    const gridRef = useRef();
    useImperativeHandle(ref, () => gridRef.current, [gridRef]);
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

    return (
      <GridContext.Provider value={{ outlineColor, outlineWidth, gridRef }}>
        <div className={grid} ref={gridRef}>
          {children}
        </div>
      </GridContext.Provider>
    );
  }
);

Grid.propTypes = {
  outlineColor: PropTypes.string,
  outlineWidth: PropTypes.number,
  outlined: PropTypes.bool,
  children: childrenPropType,
};

export const ColumnLayout = forwardRef(
  ({ children = null, style = {} }, ref) => (
    <div className={[container, horizontal].join(" ")} style={style} ref={ref}>
      {children}
    </div>
  )
);

export const RowLayout = forwardRef(({ children = null, style = {} }, ref) => (
  <div className={[container, vertical].join(" ")} style={style} ref={ref}>
    {children}
  </div>
));

export const Cell = forwardRef(
  ({ children = null, fraction = 1, outlined = false, style = {} }, ref) => {
    const cellRef = useRef();
    useImperativeHandle(ref, () => cellRef.current, [cellRef]);
    const { outlineColor, outlineWidth } = useContext(GridContext);
    const getOutlinedClassFromProp = (outlinedProp) =>
      outlinedProp ? StyleSheet.outlined : "";

    const cellClassName = [cell, getOutlinedClassFromProp(outlined)].join(" ");

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

ColumnLayout.propTypes = {
  children: childrenPropType,
  style: stylePropType,
};

RowLayout.propTypes = {
  children: childrenPropType,
  style: stylePropType,
};

Cell.propTypes = {
  children: childrenPropType,
  fraction: PropTypes.number,
  outlined: PropTypes.bool,
  style: stylePropType,
};

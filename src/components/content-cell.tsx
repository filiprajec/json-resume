import React, { forwardRef } from "react";

import { useTheme, useZoom } from "../context";
import { LayoutWrapper } from "./layout-wrapper";
import { Cell } from "./cell";
import { RowLayout } from "./row-layout";
import { ColumnLayout } from "./column-layout";
import { TablerIcon } from "../types";

const useDefaultStyles = () => {
  const { zoom } = useZoom();
  const theme = useTheme();
  const fontSizeDefault = theme.fontSize.px.h3 * zoom;

  return {
    container: {
      position: "relative",
    },
    heading: {
      fontSize: fontSizeDefault,
    },
    headingOuter: {
      display: "inline-flex",
      alignItems: "center",
      textAlign: "left",
      justifyContent: "left",
      fontSize: fontSizeDefault,
      gap: theme.padding.px.md * zoom,
      paddingBottom: theme.padding.px.sm * zoom,
      paddingLeft: theme.padding.px.sm * zoom,
    },
    headingHighlight: {
      position: "absolute",
      height: fontSizeDefault * 0.5,
      width: "100%",
      top: fontSizeDefault * 0.5,
      backgroundColor: theme.colorScheme.primary,
      zIndex: -1,
    },
    headingContainer: {
      position: "relative",
      zIndex: 0,
    },
    icon: {
      position: "relative",
      display: "flex",
      width: fontSizeDefault,
      height: fontSizeDefault,
      left: 0,
      top: 0,
      zIndex: 0,
    },
  };
};

export type ContentCellStyles = {
  container?: React.CSSProperties;
  heading?: React.CSSProperties;
  headingOuter?: React.CSSProperties;
  headingHighlight?: React.CSSProperties;
  icon?: React.CSSProperties;
  headingContainer?: React.CSSProperties;
};

interface ContentCellProps {
  heading: string;
  showHeading?: boolean;
  icon?: TablerIcon;
  showIcon?: boolean;
  columnLayout?: boolean;
  outlined?: boolean;
  outlinedHeading?: boolean;
  styles: ContentCellStyles;
  children: React.ReactNode;
  headingOffset?: number;
}

export const ContentCell = forwardRef<HTMLDivElement, ContentCellProps>(
  (
    {
      heading = "",
      showHeading = true,
      icon = null,
      showIcon = true,
      columnLayout = false,
      outlined = false,
      outlinedHeading = false,
      styles,
      children = null,
      headingOffset,
    },
    ref
  ) => {
    const stylesDefault = useDefaultStyles();
    const styles_: ContentCellStyles = {};

    Object.keys(stylesDefault).forEach((styleKey) => {
      styles_[styleKey] = { ...stylesDefault[styleKey], ...styles[styleKey] };
    });

    return (
      <Cell outlined={outlined} style={styles_.container} ref={ref}>
        <RowLayout>
          {heading && showHeading && (
            <>
              <ColumnLayout>
                {headingOffset && <Cell fraction={headingOffset}></Cell>}
                <Cell
                  fraction={headingOffset ? 1 - headingOffset : 1}
                  outlined={outlinedHeading}
                  style={styles_.headingOuter}
                >
                  {showIcon && icon && (
                    <div style={styles_.icon}>
                      {React.createElement(icon, {
                        size: styles_.icon?.width,
                      })}
                    </div>
                  )}
                  <div style={styles_.headingContainer}>
                    <div style={styles_.headingHighlight} />
                    <h3 style={styles_.heading}>{heading}</h3>
                  </div>
                </Cell>
              </ColumnLayout>
            </>
          )}
          <LayoutWrapper columnLayout={columnLayout}>{children}</LayoutWrapper>
        </RowLayout>
      </Cell>
    );
  }
);

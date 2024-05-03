import React, { useContext, forwardRef } from "react";

import { ThemeContext, ZoomContext } from "../context";
import { LayoutWrapper } from "./layout-wrapper";
import { styles } from "../styles";
import { Cell } from "./cell";
import { RowLayout } from "./row-layout";

const getStylesDefault = (zoom, theme) => {
  const fontSizeDefault = styles.fontSize.px.h3 * zoom;

  return {
    container: {
      position: "relative",
    },
    heading: {
      fontSize: fontSizeDefault,
      marginLeft: fontSizeDefault * 0.2,
      marginRight: fontSizeDefault * 0.2,
    },
    headingOuter: {
      display: "inline-flex",
      textAlign: "left",
      justifyContent: "left",
      fontSize: fontSizeDefault,
      fontWeight: 900,
      paddingBottom: styles.padding.px.small * zoom,
      paddingLeft: styles.padding.px.small * zoom,
    },
    headingHighlight: {
      position: "absolute",
      height: fontSizeDefault * 0.5,
      width: "100%",
      top: fontSizeDefault * 0.5,
      backgroundColor: theme.primary,
      zIndex: -1,
    },
    headingContainer: {
      position: "relative",
      zIndex: 0,
    },
    icon: {
      position: "relative",
      display: "inline-block",
      width: fontSizeDefault,
      height: fontSizeDefault,
      left: 0,
      top: 0,
      marginRight: styles.padding.px.small * zoom,
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
  icon?: React.ReactNode;
  showIcon?: boolean;
  columnLayout?: boolean;
  outlined?: boolean;
  outlinedHeading?: boolean;
  styles: ContentCellStyles;
  children: React.ReactNode;
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
    },
    ref
  ) => {
    const { zoom } = useContext(ZoomContext);
    const { theme } = useContext(ThemeContext);
    const stylesDefault = getStylesDefault(zoom, theme);
    const styles_: ContentCellStyles = {};

    Object.keys(stylesDefault).forEach((styleKey) => {
      styles_[styleKey] = { ...stylesDefault[styleKey], ...styles[styleKey] };
    });

    return (
      <Cell outlined={outlined} style={styles_.container} ref={ref}>
        <RowLayout>
          {heading && showHeading && (
            <Cell outlined={outlinedHeading} style={styles_.headingOuter}>
              {showIcon && <div style={styles_.icon}>{icon}</div>}
              <div style={styles_.headingContainer}>
                <div style={styles_.headingHighlight} />
                <h3 style={styles_.heading}>{heading}</h3>
              </div>
            </Cell>
          )}
          <LayoutWrapper columnLayout={columnLayout}>{children}</LayoutWrapper>
        </RowLayout>
      </Cell>
    );
  }
);

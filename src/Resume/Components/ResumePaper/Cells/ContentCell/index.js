/* 
    index.js (ContentCell)
    <> Filip Rajec
*/

import React, { useContext, forwardRef } from "react";
import PropTypes from "prop-types";
import stylePropType from "react-style-proptype";

import ZoomContext from "../../../../context/ZoomContext";
import ThemeContext from "../../../../context/ThemeContext";
import LayoutWrapper from "./LayoutWrapper";
import { Cell, RowLayout } from "../../Layouts";
import { childrenPropType } from "../../../../shared/utils/propTypes";
import Styles from "../../../../shared/styles";

const getStylesDefault = (zoom, theme) => {
  const fontSizeDefault = Styles.fontSize.px.h3 * zoom;

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
      paddingBottom: Styles.padding.px.small * zoom,
      paddingLeft: Styles.padding.px.small * zoom,
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
      // fontSize: "initial",
      marginRight: Styles.padding.px.small * zoom,
      zIndex: 0,
    },
  };
};

const ContentCell = forwardRef(
  (
    {
      heading = "",
      showHeading = true,
      icon = null,
      showIcon = true,
      columnLayout = false,
      outlined = false,
      outlinedHeading = false,
      styles = {},
      children = null,
    },
    ref
  ) => {
    const { zoom } = useContext(ZoomContext);
    const { theme } = useContext(ThemeContext);
    const stylesDefault = getStylesDefault(zoom, theme);
    const styles_ = {};
    
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

export const stylesPropType = PropTypes.shape({
  container: stylePropType,
  heading: stylePropType,
  headingOuter: stylePropType,
  headingHighlight: stylePropType,
  icon: stylePropType,
});

ContentCell.propTypes = {
  heading: PropTypes.string,
  showHeading: PropTypes.bool,
  icon: PropTypes.node,
  showIcon: PropTypes.bool,
  columnLayout: PropTypes.bool,
  outlined: PropTypes.bool,
  outlinedHeading: PropTypes.bool,
  styles: stylesPropType,
  children: childrenPropType,
};

export default ContentCell;

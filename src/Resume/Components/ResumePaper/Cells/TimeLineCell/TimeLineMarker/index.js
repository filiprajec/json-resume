/* 
    index.js (TimeLineMarker)
    <> Filip Rajec
*/

import React, { forwardRef, useContext } from "react";
import PropTypes from "prop-types";
import stylePropType from "react-style-proptype";

import ZoomContext from "../../../../../context/ZoomContext";
import ThemeContext from "../../../../../context/ThemeContext";
import { Cell } from "../../../Layouts";
import Styles from "../../../../../shared/styles";

const TimeLineMarker = forwardRef(({ size = 10, style }, ref) => {
  const { zoom } = useContext(ZoomContext);
  const { theme } = useContext(ThemeContext);

  const styleMarkerCell = {
    padding: Styles.padding.px.small * zoom,
    fontSize: Styles.fontSize.px.h5 * zoom,
  };

  const styleMarker = {
    display: "inline-block",
    width: size,
    height: size,
    borderRadius: "50%",
    border: `2px solid ${theme.dark}`,
    backgroundColor: theme.secondary,
    zIndex: 1,
    ...style,
  };

  return (
    <Cell fraction={1} style={styleMarkerCell}>
      <div style={styleMarker} ref={ref} />
    </Cell>
  );
});

TimeLineMarker.propTypes = {
  size: PropTypes.number,
  style: stylePropType,
};

export default TimeLineMarker;

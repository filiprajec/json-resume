/* 
    index.js (SVGLine)
    <> Filip Rajec
    Apr 2021
*/

import React from "react";
import PropTypes from "prop-types";
import stylePropType from "react-style-proptype";

const SVGLine = ({
  x1 = 0,
  x2 = 0,
  y1 = 0,
  y2 = 0,
  color = "black",
  width = 2,
  style = {},
}) => {
  const getNegativeOffset = (c1, c2) => (c2 - c1 < 0 ? Math.abs(c2 - c1) : 0);

  return (
    <svg
      height={Math.abs(y2 - y1) + width || width}
      width={Math.abs(x2 - x1) + width || width}
      style={{
        position: "absolute",
        left: x1 - width / 2 - getNegativeOffset(x1, x2),
        top: y1 - getNegativeOffset(y1, y2),
      }}
    >
      <line
        x1={getNegativeOffset(x1, x2)}
        y1={getNegativeOffset(y1, y2)}
        x2={x2 - x1 + getNegativeOffset(x1, x2)}
        y2={y2 - y1 + getNegativeOffset(y1, y2)}
        style={{ stroke: color, strokeWidth: width*2, ...style }}
      />
    </svg>
  );
};

SVGLine.propTypes = {
  x1: PropTypes.number,
  x2: PropTypes.number,
  y1: PropTypes.number,
  y2: PropTypes.number,
  color: PropTypes.string,
  width: PropTypes.number,
  style: stylePropType,
};

export default SVGLine;

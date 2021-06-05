/* 
    index.js (Bubble)
    <> Filip Rajec
*/

import React, { useContext } from "react";
import stylePropType from "react-style-proptype";

import ThemeContext from "../../../../../../context/ThemeContext";
import ZoomContext from "../../../../../../context/ZoomContext";
import { childrenPropType } from "../../../../../../shared/utils/propTypes";

const Bubble = ({ children = null, style = {} }) => {
  const { zoom } = useContext(ZoomContext);
  const { theme } = useContext(ThemeContext);
  const styleBubble = {
    display: "inline-block",
    backgroundColor: theme.light,
    border: `1px solid ${theme.dark}`,
    borderRadius: "10px",
    margin: 2 * zoom,
    padding: `${4 * zoom}px ${8 * zoom}px`,
    ...style,
  };
  return <div style={styleBubble}>{children}</div>;
};

Bubble.propTypes = {
  children: childrenPropType,
  style: stylePropType,
};

export default Bubble;

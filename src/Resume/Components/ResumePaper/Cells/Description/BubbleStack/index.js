/* 
    index.js (SkillStack)
    <> Filip Rajec
*/

import React, { useContext } from "react";
import PropTypes from "prop-types";
import stylePropType from "react-style-proptype";

import ZoomContext from "../../../../../context/ZoomContext";
import Bubble from "./Bubble";
import Styles from "../../../../../shared/styles";

const BubbleStack = ({ stack = [], styleBubble = {}, style = {} }) => {
  const { zoom } = useContext(ZoomContext);
  return (
    <div style={style}>
      {stack.map((eachPoint) => (
        <Bubble style={styleBubble} key={`bubble-${eachPoint.substring(0,5)}-${eachPoint.substring(eachPoint.length - 5)}`}>
          <p style={{ fontSize: Styles.fontSize.px.p * zoom }}>{eachPoint}</p>
        </Bubble>
      ))}
    </div>
  );
};

BubbleStack.propTypes = {
  stack: PropTypes.arrayOf(PropTypes.string),
  styleBubble: stylePropType,
  style: stylePropType,
};

export default BubbleStack;

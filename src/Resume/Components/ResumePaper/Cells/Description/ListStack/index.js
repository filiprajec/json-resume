/* 
    index.js (ListStack)
    <> Filip Rajec
*/

import React, { useContext } from "react";
import PropTypes from "prop-types";
import stylePropType from "react-style-proptype";

import ZoomContext from "../../../../../context/ZoomContext";
import Styles from "../../../../../shared/styles";

const ListStack = ({ stack = [], bullet = "•", style = {} }) => {
  const { zoom } = useContext(ZoomContext);
  return (
    <div style={style}>
      {stack.map((eachPoint) => (
        <p style={{ fontSize: Styles.fontSize.px.p * zoom }} key={`list-member-${eachPoint.substring(0,5)}-${eachPoint.substring(eachPoint.length - 5)}`}>{`${bullet} ${eachPoint}`}</p>
      ))}
    </div>
  );
};

ListStack.propTypes = {
  stack: PropTypes.arrayOf(PropTypes.string),
  bullet: PropTypes.string,
  style: stylePropType,
};

export default ListStack;

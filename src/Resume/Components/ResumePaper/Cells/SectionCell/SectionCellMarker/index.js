/* eslint-disable no-unused-vars */
/* 
    index.js (SectionCellMarker)
    <> Filip Rajec
*/

import React, { useContext } from "react";
import PropTypes from "prop-types";
import stylePropType from "react-style-proptype";

import ZoomContext from "../../../../../context/ZoomContext";
import { Cell } from "../../../Layouts";
import Styles from "../../../../../shared/styles";

const SectionCellMarker = ({ style }) => {
  const { zoom } = useContext(ZoomContext);

  const styleMarkerCell = {
    padding: Styles.padding.px.small * zoom,
    fontSize: Styles.fontSize.px.h5 * zoom,
    ...style
  };

  const marker = "•";

  return (
    <Cell fraction={1} style={styleMarkerCell}>
      {marker}
    </Cell>
  );
};

SectionCellMarker.propTypes = {
  style: stylePropType,
};

export default SectionCellMarker;

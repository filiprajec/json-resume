/* 
    index.js (TimeLineDate)
    <> Filip Rajec
*/

import React, { useContext } from "react";
import PropTypes from "prop-types";

import ZoomContext from "../../../../../context/ZoomContext";
import { Cell } from "../../../Layouts";
import Styles from "../../../../../shared/styles";

const TimeLineDate = ({ date = "" }) => {
  const { zoom } = useContext(ZoomContext);
  return (
    <Cell
      fraction={4}
      style={{
        padding: Styles.padding.px.small * zoom,
        fontSize: Styles.fontSize.px.h5 * zoom,
        textAlign: "right",
      }}
    >
      {date}
    </Cell>
  );
};

TimeLineDate.propTypes = {
  date: PropTypes.string
};

export default TimeLineDate;

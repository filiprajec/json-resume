/* 
    index.js (MarkerJoin)
    <> Filip Rajec
*/

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import SVGLine from "./SVGLine";

const Join = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`
const markerJoinWidth = 2;

const MarkerJoin = ({ coordinates = null, markerSize = 10 }) => {
  if (coordinates == null || !coordinates?.first?.center || !coordinates?.second?.center) {
    return null;
  }
  return (
    <Join>
      <SVGLine
        x1={coordinates.first.center.x + markerJoinWidth / 4}
        x2={coordinates.second.center.x + markerJoinWidth / 4}
        y1={coordinates.first.center.y + markerSize / 2}
        y2={coordinates.second.center.y - markerSize / 2}
        width={markerJoinWidth}
      />
    </Join>
  );
};

const coordinatePropType = {
  center: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

MarkerJoin.propTypes = {
  coordinates: PropTypes.exact({
    first: PropTypes.shape(coordinatePropType),
    second: PropTypes.shape(coordinatePropType),
  }),
  markerSize: PropTypes.number,
};

export default MarkerJoin;

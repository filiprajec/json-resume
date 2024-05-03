import styled from "styled-components";

import { SVGLine } from "./svg-line";

const Join = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;
const markerJoinWidth = 2;

export type Coordinate = {
  center: {
    x: number;
    y: number;
  };
};

interface MarkerJoinProps {
  coordinates: {
    first: Coordinate;
    second: Coordinate;
  } | null;
  markerSize?: number;
  color?: string;
}

export const MarkerJoin = ({
  coordinates = null,
  markerSize = 10,
  color,
}: MarkerJoinProps) => {
  if (
    coordinates == null ||
    !coordinates?.first?.center ||
    !coordinates?.second?.center
  ) {
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
        color={color}
      />
    </Join>
  );
};

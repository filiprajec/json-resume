import React from "react";

import { useZoom } from "../context";
import { styles } from "../styles";
import { Cell } from "./cell";

interface SectionCellMarkerProps {
  style?: React.CSSProperties;
}

export const SectionCellMarker = ({ style }: SectionCellMarkerProps) => {
  const { zoom } = useZoom();

  const styleMarkerCell = {
    padding: styles.padding.px.small * zoom,
    fontSize: styles.fontSize.px.h5 * zoom,
    ...style,
  };

  const marker = "•";

  return (
    <Cell fraction={1} style={styleMarkerCell}>
      {marker}
    </Cell>
  );
};

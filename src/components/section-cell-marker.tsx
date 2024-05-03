import React from "react";

import { useTheme, useZoom } from "../context";
import { Cell } from "./cell";

interface SectionCellMarkerProps {
  style?: React.CSSProperties;
}

export const SectionCellMarker = ({ style }: SectionCellMarkerProps) => {
  const { zoom } = useZoom();
  const theme = useTheme();
  const marker = "•";

  return (
    <Cell
      fraction={1}
      style={{
        padding: theme.padding.px.sm * zoom,
        fontSize: theme.fontSize.px.h5 * zoom,
        ...style,
      }}
    >
      {marker}
    </Cell>
  );
};

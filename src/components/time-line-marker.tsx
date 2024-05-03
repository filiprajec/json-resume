import React, { forwardRef } from "react";

import { useZoom, useTheme, increaseShade } from "../context";
import { Cell } from "./cell";

interface TimeLineMarkerProps {
  size?: number;
  style?: React.CSSProperties;
}

export const TimeLineMarker = forwardRef<HTMLDivElement, TimeLineMarkerProps>(
  ({ size = 10, style }, ref) => {
    const { zoom } = useZoom();
    const theme = useTheme();

    return (
      <Cell
        fraction={1}
        style={{
          padding: theme.padding.px.sm * zoom,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "inline-block",
            width: size,
            height: size * 2,
            borderRadius: "1rem",
            border: `2px solid ${theme.colorScheme.black}`,
            backgroundColor:
              theme.colorScheme.secondary[theme.colorScheme.secondaryShade],
            zIndex: 1,
            ...style,
          }}
          ref={ref}
        />
      </Cell>
    );
  }
);

import React, { forwardRef, useContext } from "react";

import { useZoom, useTheme } from "../context";
import { styles } from "../styles";
import { Cell } from "./cell";

interface TimeLineMarkerProps {
  size?: number;
  style?: React.CSSProperties;
}

export const TimeLineMarker = forwardRef<HTMLDivElement, TimeLineMarkerProps>(
  ({ size = 10, style }, ref) => {
    const { zoom } = useZoom();
    const { theme } = useTheme();

    const styleMarkerCell = {
      padding: styles.padding.px.small * zoom,
      fontSize: styles.fontSize.px.h5 * zoom,
    };

    const styleMarker = {
      display: "inline-block",
      width: size,
      height: size,
      borderRadius: "50%",
      border: `2px solid ${theme.dark}`,
      backgroundColor: theme.secondary,
      zIndex: 1,
      ...style,
    };

    return (
      <Cell fraction={1} style={styleMarkerCell}>
        <div style={styleMarker} ref={ref} />
      </Cell>
    );
  }
);

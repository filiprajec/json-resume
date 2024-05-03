import React from "react";

import { useTheme, useZoom } from "../context";

interface BubbleProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Bubble = ({ children, style }: BubbleProps) => {
  const { zoom } = useZoom();
  const theme = useTheme();

  return (
    <div
      style={{
        display: "inline-block",
        backgroundColor: theme.colorScheme.white,
        border: `1px solid ${theme.colorScheme.black}`,
        borderRadius: "16px",
        margin: 2 * zoom,
        padding: `${2 * zoom}px ${6 * zoom}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

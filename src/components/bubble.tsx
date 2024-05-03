import React from "react";

import { useTheme, useZoom } from "../context";

interface BubbleProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Bubble = ({ children, style }: BubbleProps) => {
  const { zoom } = useZoom();
  const { theme } = useTheme();
  const styleBubble = {
    display: "inline-block",
    backgroundColor: theme.light,
    border: `1px solid ${theme.dark}`,
    borderRadius: "16px",
    margin: 2 * zoom,
    padding: `${2 * zoom}px ${4 * zoom}px`,
    ...style,
  };

  return <div style={styleBubble}>{children}</div>;
};

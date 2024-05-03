import React, { Fragment } from "react";

import { useZoom } from "../context";
import { Bubble } from "./bubble";
import { styles } from "../styles/styles";

interface BubbleStack {
  stack: string[];
  styleBubble?: React.CSSProperties;
  style?: React.CSSProperties;
}

export const BubbleStack = ({ stack, styleBubble, style }: BubbleStack) => {
  const { zoom } = useZoom();

  return (
    <div style={style}>
      {stack.map((eachPoint) => (
        <Fragment
          key={`bubble-${eachPoint.substring(0, 5)}-${eachPoint.substring(
            eachPoint.length - 5
          )}`}
        >
          <Bubble style={styleBubble}>
            <p style={{ fontSize: styles.fontSize.px.p * zoom }}>{eachPoint}</p>
          </Bubble>
        </Fragment>
      ))}
    </div>
  );
};

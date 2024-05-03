import React, { Fragment } from "react";

import { useZoom } from "../context";
import { styles } from "../styles";

interface ListStackProps {
  stack: string[];
  bullet?: string;
  style?: React.CSSProperties;
}

export const ListStack = ({
  stack = [],
  bullet = "•",
  style,
}: ListStackProps) => {
  const { zoom } = useZoom();

  return (
    <div style={style}>
      {stack.map((eachPoint) => (
        <Fragment
          key={`list-member-${eachPoint.substring(0, 5)}-${eachPoint.substring(
            eachPoint.length - 5
          )}`}
        >
          <p
            style={{ fontSize: styles.fontSize.px.p * zoom }}
          >{`${bullet} ${eachPoint}`}</p>
        </Fragment>
      ))}
    </div>
  );
};

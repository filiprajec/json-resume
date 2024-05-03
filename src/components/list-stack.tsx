import React, { Fragment } from "react";

import { useTheme, useZoom } from "../context";

interface ListStackProps {
  stack: string[];
  bullet?: string;
  style?: React.CSSProperties;
}

export const ListStack = ({ stack = [], style }: ListStackProps) => {
  const { zoom } = useZoom();
  const theme = useTheme();

  return (
    <ul
      style={{
        marginBlockStart: "0.25rem",
        marginBlockEnd: 0,
        paddingInlineStart: "1rem",
        ...style,
      }}
    >
      {stack.map((eachPoint) => (
        <Fragment
          key={`list-member-${eachPoint.substring(0, 5)}-${eachPoint.substring(
            eachPoint.length - 5
          )}`}
        >
          <li
            style={{ fontSize: theme.fontSize.px.p * zoom }}
          >{`${eachPoint}`}</li>
        </Fragment>
      ))}
    </ul>
  );
};

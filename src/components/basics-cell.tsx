import React from "react";

import { useZoom, useTheme } from "../context";
import { RowLayout } from "./row-layout";
import { Cell } from "./cell";

export const BasicsCell = ({ basics }) => {
  const { zoom } = useZoom();
  const theme = useTheme();

  const cellStyle: React.CSSProperties = {
    padding: `${theme.padding.px.sm * zoom}px ${theme.padding.px.md * zoom}px`,
    fontSize: theme.fontSize.px.p * zoom,
    textAlign: "left",
  };

  return (
    <Cell outlined={false}>
      <RowLayout>
        <Cell style={cellStyle}>
          <h1 style={{ fontSize: theme.fontSize.px.h1 * zoom }}>
            {basics.name}
          </h1>
          <h4 style={{ fontSize: theme.fontSize.px.h4 * zoom }}>
            {basics.label}
          </h4>
          <h5 style={{ fontSize: theme.fontSize.px.h5 * zoom }}>
            {basics.location?.city}
          </h5>
        </Cell>
        <Cell style={cellStyle}>
          <p style={{ fontSize: "inherit" }}>{basics.phone}</p>
          <p style={{ fontSize: "inherit" }}>{basics.email}</p>
          <p style={{ fontSize: "inherit" }}>{basics.url}</p>
        </Cell>
        <Cell style={{ ...cellStyle, paddingBottom: 0, paddingTop: 0 }}>
          {basics.profiles.map((eachProfile) => (
            <p
              style={{ fontSize: "inherit" }}
              key={`profile-${eachProfile.network}-${eachProfile.username}`}
            >
              <span style={{ fontWeight: 500 }}>{eachProfile.network}:</span>{" "}
              {eachProfile.username}
            </p>
          ))}
        </Cell>
        {basics.summary && <Cell style={cellStyle}>{basics.summary}</Cell>}
      </RowLayout>
    </Cell>
  );
};

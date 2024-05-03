import React from "react";

import { useZoom } from "../context";
import { styles } from "../styles";
import { RowLayout } from "./row-layout";
import { Cell } from "./cell";

export const BasicsCell = ({ basics }) => {
  const { zoom } = useZoom();
  const styleCell: React.CSSProperties = {
    padding: `${styles.padding.px.small * zoom}px ${
      styles.padding.px.medium * zoom
    }px`,
    fontSize: styles.fontSize.px.p * zoom,
    textAlign: "left",
  };
  return (
    <Cell outlined={false}>
      <RowLayout>
        <Cell style={styleCell}>
          <h1 style={{ fontSize: styles.fontSize.px.h1 * zoom }}>
            {basics.name}
          </h1>
          <h4 style={{ fontSize: styles.fontSize.px.h4 * zoom }}>
            {basics.label}
          </h4>
          <h5 style={{ fontSize: styles.fontSize.px.h5 * zoom }}>
            {basics.location?.city}
          </h5>
        </Cell>
        <Cell style={styleCell}>
          <p style={{ fontSize: "inherit" }}>{basics.phone}</p>
          <p style={{ fontSize: "inherit" }}>{basics.email}</p>
          <p style={{ fontSize: "inherit" }}>{basics.url}</p>
        </Cell>
        {basics.profiles.map((eachProfile) => (
          <Cell
            style={styleCell}
            key={`profile-${eachProfile.network}-${eachProfile.username}`}
          >
            <p style={{ fontSize: "inherit" }}>
              {eachProfile.network}: {eachProfile.username}
            </p>
          </Cell>
        ))}
        {basics.summary && <Cell style={styleCell}>{basics.summary}</Cell>}
      </RowLayout>
    </Cell>
  );
};

/* 
    index.js (BasicsCell)
    <> Filip Rajec
*/

import React, { useContext } from "react";
import PropTypes from "prop-types";

import ZoomContext from "../../../../context/ZoomContext";
import Styles from "../../../../shared/styles";
import { Cell, RowLayout } from "../../Layouts";

const BasicsCell = ({ basics = {} }) => {
  const { zoom } = useContext(ZoomContext);
  const styleCell = {
    padding: `${Styles.padding.px.small * zoom}px ${
      Styles.padding.px.medium * zoom
    }px`,
    fontSize: Styles.fontSize.px.p * zoom,
    textAlign: "left",
  };
  return (
    <Cell outlined={false}>
      <RowLayout>
        <Cell style={styleCell}>
          <h1 style={{ fontSize: Styles.fontSize.px.h1 * zoom }}>
            {basics.name}
          </h1>
          <h4 style={{ fontSize: Styles.fontSize.px.h4 * zoom }}>
            {basics.label}
          </h4>
          <h5 style={{ fontSize: Styles.fontSize.px.h5 * zoom }}>
            {basics.location?.city}
          </h5>
        </Cell>
        <Cell style={styleCell}>
          <p style={{ fontSize: "inherit" }}>{basics.phone}</p>
          <p style={{ fontSize: "inherit" }}>{basics.email}</p>
          <p style={{ fontSize: "inherit" }}>{basics.url}</p>
        </Cell>
        {basics.profiles.map((eachProfile) => (
          <Cell style={styleCell} key={`profile-${eachProfile.network}-${eachProfile.username}`}>
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

BasicsCell.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  basics: PropTypes.any,
};

export default BasicsCell;

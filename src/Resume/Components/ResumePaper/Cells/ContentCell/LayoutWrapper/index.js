/* 
    index.js (LayoutWrapper)
    <> Filip Rajec
*/

import React from "react";
import PropTypes from "prop-types";

import { ColumnLayout, RowLayout } from "../../../Layouts";
import { childrenPropType } from "../../../../../shared/utils/propTypes";

const LayoutWrapper = ({ columnLayout, children }) =>
  columnLayout ? (
    <ColumnLayout>{children}</ColumnLayout>
  ) : (
    <RowLayout>{children}</RowLayout>
  );

LayoutWrapper.propTypes = {
  columnLayout: PropTypes.bool,
  children: childrenPropType,
};

export default LayoutWrapper;

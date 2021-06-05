/* 
    index.js (propTypes)
    <> Filip Rajec
*/

import PropTypes from "prop-types";

export const themePropType = PropTypes.exact({
  primary: PropTypes.string,
  secondary: PropTypes.string,
  light: PropTypes.string,
  dark: PropTypes.string, 
});

export const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

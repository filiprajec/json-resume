import PropTypes from "prop-types";

export const ratingBarDataPropType = PropTypes.objectOf(
  PropTypes.exact({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })
);

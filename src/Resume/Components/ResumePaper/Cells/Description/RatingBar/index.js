/* 
    index.js (RatingBar)
    <> Filip Rajec
*/

import React, { useContext } from "react";
import PropTypes from "prop-types";
import stylePropType from "react-style-proptype";
import styled from "styled-components";

import ZoomContext from "../../../../../context/ZoomContext";
import Styles from "../../../../../shared/styles";
import ThemeContext from "../../../../../context/ThemeContext";

const Bar = styled.div`
  width: "100%";
  border-radius: 20px;
  height: ${(props) => props.height};
  box-sizing: content-box;
  background-color: ${(props) => props.theme.light};
  border: 1px solid ${(props) => props.theme.dark};
`;

const Progress = styled.div`
  height: 100%;
  width: ${(props) => props.percentage}%;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: ${(props) => props.color};
`;

const Heading = styled.div`
  font-size: ${(props) => props.fontSize};
  font-style: italic;
  text-align: ${(props) => props.textAlign};
`;

const RatingBar = ({ rating = "", value = 0, style = {} }) => {
  const { zoom } = useContext(ZoomContext);
  const { theme } = useContext(ThemeContext);
  const valueInt = parseInt(value, 10) ?? 0;
  return (
    <div style={style}>
      {valueInt > 0 && (
        <Bar theme={theme} height={`${15 * zoom}px`}>
          <Progress color={theme.secondary} percentage={(valueInt / 5) * 100} />
        </Bar>
      )}
      <Heading textAlign={valueInt > 0 ? "right" : "left"} fontSize={`${Styles.fontSize.px.p * zoom}px`}>{rating}</Heading>
    </div>
  );
};

RatingBar.propTypes = {
  rating: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: stylePropType,
};

export default RatingBar;

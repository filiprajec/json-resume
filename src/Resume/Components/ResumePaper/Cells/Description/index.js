/* 
    index.js (Description)
    <> Filip Rajec
*/

import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import stylePropType from "react-style-proptype";

import BubbleStack from "./BubbleStack";
import RatingBar from "./RatingBar";
import ListStack from "./ListStack";
import Styles from "../../../../shared/styles";
import ZoomContext from "../../../../context/ZoomContext";
import { ratingBarDataPropType } from "../../../../ResumeSection/propTypes";

const Container = styled.div`
  text-align: left;
  padding: ${(props) => props.padding};
`;

const Heading = styled.h5`
  font-weight: 700;
  font-size: ${(props) => props.fontSize};
`;

const Date = styled.p`
  font-weight: 700;
  font-size: ${(props) => props.fontSize};
`;

const DescriptionText = styled.p`
  font-size: ${(props) => props.fontSize};
`;

const VerticalPadding = styled.div`
  padding-top: ${(props) => props.padding};
  padding-bottom: ${(props) => props.padding};
`

const Description = ({
  heading = "",
  rating = "",
  description = "",
  date = "",
  tags = [],
  list = [],
  styles = {},
  ratingBarData = {},
  ID = "0",
}) => {
  const { zoom } = useContext(ZoomContext);

  return (
    <Container padding={`${Styles.padding.px.small * zoom}px`} style={styles.container}>
      <Heading fontSize={`${Styles.fontSize.px.h5 * zoom}px`} style={styles.heading}>
        {heading}
      </Heading>
      {date && (
        <Date fontSize={`${Styles.fontSize.px.p * zoom}px`} style={styles.date}>{date}</Date>
      )}
      {rating && <VerticalPadding padding={`${Styles.padding.px.small * zoom}px`}><RatingBar rating={rating} value={ratingBarData[ID]?.value ?? 0} style={styles.ratingBar} /></VerticalPadding>}
      <DescriptionText
        fontSize={`${Styles.fontSize.px.p * zoom}px`}
        style={{
          paddingTop: Styles.padding.px.xxsmall * zoom,
          ...styles.text,
        }}
      >
        {description}
      </DescriptionText>
      <ListStack stack={list} style={{ marginBottom: 2 * zoom, ...styles.list }} />
      <BubbleStack stack={tags} style={styles.tags} />
    </Container>
  );
};

export const stylesPropType = PropTypes.shape({
  container: stylePropType,
  heading: stylePropType,
  date: stylePropType,
  ratingBar: stylePropType,
  text: stylePropType,
  list: stylePropType,
  tags: stylePropType,
})

Description.propTypes = {
  heading: PropTypes.string,
  rating: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  list: PropTypes.arrayOf(PropTypes.string),
  styles: stylesPropType,
  ratingBarData: ratingBarDataPropType,
  ID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Description;

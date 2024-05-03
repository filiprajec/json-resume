import React from "react";
import styled from "styled-components";

import { BubbleStack } from "./bubble-stack";
import { RatingBar } from "./rating-bar";
import { ListStack } from "./list-stack";
import { useTheme, useZoom } from "../context";

export type DescriptionStyles = {
  container?: React.CSSProperties;
  heading?: React.CSSProperties;
  date?: React.CSSProperties;
  ratingBar?: React.CSSProperties;
  text?: React.CSSProperties;
  list?: React.CSSProperties;
  tags?: React.CSSProperties;
};

interface DescriptionProps {
  heading?: string;
  rating?: string;
  description?: string;
  date?: string;
  tags?: string[];
  list?: string[];
  styles?: DescriptionStyles;
  ratingBarData?: any;
  ID?: string;
}

export const Description = ({
  heading = "",
  rating = "",
  description = "",
  date = "",
  tags = [],
  list = [],
  styles = {},
  ratingBarData = {},
  ID = "0",
}: DescriptionProps) => {
  const { zoom } = useZoom();
  const theme = useTheme();

  return (
    <Container
      padding={`${theme.padding.px.sm * zoom}px`}
      style={styles.container}
    >
      <Heading
        fontSize={`${theme.fontSize.px.h5 * zoom}px`}
        style={styles.heading}
      >
        {heading}
      </Heading>
      {date && (
        <Date fontSize={`${theme.fontSize.px.p * zoom}px`} style={styles.date}>
          {date}
        </Date>
      )}
      {rating && (
        <VerticalPadding padding={`${theme.padding.px.sm * zoom}px`}>
          <RatingBar
            rating={rating}
            value={ratingBarData[ID]?.value ?? 0}
            style={styles.ratingBar}
          />
        </VerticalPadding>
      )}
      {description && (
        <DescriptionText
          fontSize={`${theme.fontSize.px.p * zoom}px`}
          style={{
            paddingTop: theme.padding.px.sm * zoom,
            opacity: 0.7,
            ...styles.text,
          }}
        >
          {description}
        </DescriptionText>
      )}
      <ListStack
        stack={list}
        style={{ marginBottom: 2 * zoom, ...styles.list }}
      />
      <BubbleStack stack={tags} style={styles.tags} />
    </Container>
  );
};

const Container = styled.div<{ padding: React.CSSProperties["padding"] }>`
  text-align: left;
  padding: ${(props) => props.padding};
`;

const Heading = styled.h5<{ fontSize: React.CSSProperties["fontSize"] }>`
  font-weight: 900;
  font-size: ${(props) => props.fontSize};
  font-style: italic;
  text-decoration: underline;
`;

const Date = styled.p<{ fontSize: React.CSSProperties["fontSize"] }>`
  font-weight: 700;
  font-size: ${(props) => props.fontSize};
`;

const DescriptionText = styled.p<{ fontSize: React.CSSProperties["fontSize"] }>`
  font-size: ${(props) => props.fontSize};
`;

const VerticalPadding = styled.div<{ padding: React.CSSProperties["padding"] }>`
  padding-top: ${(props) => props.padding};
  padding-bottom: ${(props) => props.padding};
`;

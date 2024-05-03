import React, { useContext } from "react";
import styled from "styled-components";

import { useZoom, useTheme } from "../context";
import { styles } from "../styles";

interface RatingBarProps {
  rating?: string;
  value?: number | string;
  style?: React.CSSProperties;
}

export const RatingBar = ({
  rating = "",
  value = 0,
  style = {},
}: RatingBarProps) => {
  const { zoom } = useZoom();
  const { theme } = useTheme();
  const valueInt = parseInt(value.toString(), 10) ?? 0;
  return (
    <div style={style}>
      {valueInt > 0 && (
        <Bar theme={theme} height={`${15 * zoom}px`}>
          <Progress color={theme.secondary} percentage={(valueInt / 5) * 100} />
        </Bar>
      )}
      <Heading
        textAlign={valueInt > 0 ? "right" : "left"}
        fontSize={`${styles.fontSize.px.p * zoom}px`}
      >
        {rating}
      </Heading>
    </div>
  );
};

const Bar = styled.div<{ height: React.CSSProperties["height"] }>`
  width: "100%";
  border-radius: 20px;
  height: ${(props) => props.height};
  box-sizing: content-box;
  background-color: ${(props) => props.theme.light};
  border: 1px solid ${(props) => props.theme.dark};
`;

const Progress = styled.div<{
  percentage: number;
}>`
  height: 100%;
  width: ${(props) => props.percentage}%;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: ${(props) => props.color};
`;

const Heading = styled.div<{
  fontSize: React.CSSProperties["fontSize"];
  textAlign: React.CSSProperties["textAlign"];
}>`
  font-size: ${(props) => props.fontSize};
  font-style: italic;
  text-align: ${(props) => props.textAlign};
`;

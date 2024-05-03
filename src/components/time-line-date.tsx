import { increaseShade, useTheme, useZoom } from "../context";
import { Cell } from "./cell";

interface TimeLineDateProps {
  date?: string;
}

export const TimeLineDate = ({ date = "" }: TimeLineDateProps) => {
  const { zoom } = useZoom();
  const theme = useTheme();

  return (
    <Cell
      fraction={4}
      style={{ textAlign: "left", padding: theme.padding.px.sm * zoom }}
    >
      <span
        style={{
          fontSize: theme.fontSize.px.p * zoom,
          color:
            theme.colorScheme.secondary[
              increaseShade(theme.colorScheme.secondaryShade, 4)
            ],
          fontWeight: 700,
        }}
      >
        {date}
      </span>
    </Cell>
  );
};

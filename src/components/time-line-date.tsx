import { useZoom } from "../context";
import { styles } from "../styles";
import { Cell } from "./cell";

interface TimeLineDateProps {
  date?: string;
}

export const TimeLineDate = ({ date = "" }: TimeLineDateProps) => {
  const { zoom } = useZoom();

  return (
    <Cell
      fraction={4}
      style={{
        padding: styles.padding.px.small * zoom,
        fontSize: styles.fontSize.px.p * zoom,
        color: styles.colors.basic.gray,
        textAlign: "right",
      }}
    >
      {date}
    </Cell>
  );
};

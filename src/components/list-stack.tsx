import { List } from "@mantine/core";

import { useLayoutLocation } from "@/context";
import { PageBreak } from "./page-break";

interface ListStackProps {
  stack?: string[];
  withPageBreaks?: boolean;
}

export const ListStack = ({ stack, withPageBreaks }: ListStackProps) => {
  const { textColor } = useLayoutLocation();

  if (!stack || stack.length === 0) return null;

  return (
    <List>
      {stack.map((eachPoint) => (
        <PageBreak
          display="inline"
          key={[
            "list-member",
            eachPoint.substring(0, 5),
            eachPoint.substring(eachPoint.length - 5),
          ].join("-")}
          active={withPageBreaks}
          render={() => (
            <List.Item c={textColor} style={{ overflowWrap: "anywhere" }}>
              {eachPoint}
            </List.Item>
          )}
        />
      ))}
    </List>
  );
};

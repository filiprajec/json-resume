import { List } from "@mantine/core";

import { useLayout } from "@/context";
import { Breakable } from "./breakable";

interface ListStackProps {
  stack?: string[];
  withPageBreaks?: boolean;
}

export const ListStack = ({ stack, withPageBreaks }: ListStackProps) => {
  const { colors } = useLayout();

  if (!stack || stack.length === 0) return null;

  return (
    <List>
      {stack.map((eachPoint) => (
        <Breakable
          display="inline"
          key={[
            "list-member",
            eachPoint.substring(0, 5),
            eachPoint.substring(eachPoint.length - 5),
          ].join("-")}
          active={withPageBreaks}
          render={() => (
            <List.Item
              c={colors.text}
              style={{ overflowWrap: "anywhere" }}
              mr={24}
            >
              {eachPoint}
            </List.Item>
          )}
        />
      ))}
    </List>
  );
};

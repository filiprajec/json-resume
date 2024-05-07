import { List } from "@mantine/core";

interface ListStackProps {
  stack?: string[];
}

export const ListStack = ({ stack }: ListStackProps) => {
  if (!stack || stack.length === 0) return null;

  return (
    <List>
      {stack.map((eachPoint) => (
        <List.Item
          key={`list-member-${eachPoint.substring(0, 5)}-${eachPoint.substring(
            eachPoint.length - 5
          )}`}
        >
          {`${eachPoint}`}{" "}
        </List.Item>
      ))}
    </List>
  );
};

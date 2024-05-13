import { Badge, Group } from "@mantine/core";

import { useLayoutLocation } from "@/context";

interface BadgeGroupProps {
  tags?: string[];
  withPageBreaks?: boolean;
}

export const BadgeGroup = ({ tags }: BadgeGroupProps) => {
  const { accentColor } = useLayoutLocation();
  if (!tags) return null;

  return (
    <Group gap="xs">
      {tags.map((tag) => (
        <Badge
          size="lg"
          variant="light"
          key={`bubble-${tag.substring(0, 5)}-${tag.substring(tag.length - 5)}`}
          color={accentColor}
        >
          {tag}
        </Badge>
      ))}
    </Group>
  );
};

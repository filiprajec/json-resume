import { Badge, Group } from "@mantine/core";

import { useLayout } from "@/context";

interface BadgeGroupProps {
  tags?: string[];
}

export const BadgeGroup = ({ tags }: BadgeGroupProps) => {
  const { colors } = useLayout();
  if (!tags) return null;

  return (
    <Group gap="xs">
      {tags.map((tag) => (
        <Badge
          size="lg"
          variant="light"
          key={`bubble-${tag.substring(0, 5)}-${tag.substring(tag.length - 5)}`}
          color={colors.primary}
        >
          {tag}
        </Badge>
      ))}
    </Group>
  );
};

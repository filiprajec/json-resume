import { Badge, Group } from "@mantine/core";
import { useResume } from "../context";

interface BadgeGroupProps {
  tags?: string[];
}

export const BadgeGroup = ({ tags }: BadgeGroupProps) => {
  const { resume } = useResume();
  if (!tags) return null;

  return (
    <Group gap="xs">
      {tags.map((tag) => (
        <Badge
          size="lg"
          variant="light"
          key={`bubble-${tag.substring(0, 5)}-${tag.substring(tag.length - 5)}`}
          color={resume?.getColorScheme().primary}
        >
          {tag}
        </Badge>
      ))}
    </Group>
  );
};

import { Flex, Text } from "@mantine/core";

import { BadgeGroup } from "./badge-group";
import { ListStack } from "./list-stack";
import { SectionProperty } from "../resume/section-mapper";

interface DescriptionProps {
  property: SectionProperty;
  withHeading?: boolean;
}

export const Description = ({
  property,
  withHeading = true,
}: DescriptionProps) => {
  const { heading, rating, description, date, list, tags } = property;

  const hasMainContent = heading || rating || description || date || list;

  return (
    <Flex direction="column" gap="xs">
      {hasMainContent && (
        <Flex direction="column" gap={4}>
          {withHeading && heading && (
            <Text size="lg" fw={700} lh={1.25}>
              {heading}
            </Text>
          )}
          {date && (
            <Text c="dimmed" fw={600}>
              {date}
            </Text>
          )}
          {rating && <Text>{rating}</Text>}
          {description && <Text>{description}</Text>}
          {list && <ListStack stack={list} />}
        </Flex>
      )}
      <BadgeGroup tags={tags} />
    </Flex>
  );
};

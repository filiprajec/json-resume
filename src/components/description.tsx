import { Box, Flex, Text } from "@mantine/core";

import { useLayout, SectionProperty } from "@/context";
import { BadgeGroup } from "./badge-group";
import { ListStack } from "./list-stack";
import { Breakable } from "./breakable";

interface DescriptionProps {
  property: SectionProperty;
  withHeading?: boolean;
}

export const Description = ({
  property,
  withHeading = true,
}: DescriptionProps) => {
  const { heading, rating, description, date, list, tags } = property;
  const { colors } = useLayout();

  const hasMainContent = heading || rating || description || date || list;

  return (
    <Flex direction="column" gap="sm">
      {hasMainContent && (
        <Flex direction="column" gap={4}>
          {withHeading && heading && (
            <Breakable
              active={false}
              render={() => (
                <Text
                  size="lg"
                  fw={700}
                  lh={1.25}
                  c={colors.text}
                  style={{ overflowWrap: "anywhere" }}
                >
                  {heading}
                </Text>
              )}
            />
          )}
          {date && (
            <Breakable
              render={() => (
                <Text
                  fw={600}
                  c={colors.text}
                  opacity={0.7}
                  style={{ overflowWrap: "anywhere" }}
                >
                  {date}
                </Text>
              )}
            />
          )}
          {rating && (
            <Breakable
              render={() => (
                <Text c={colors.text} style={{ overflowWrap: "anywhere" }}>
                  {rating}
                </Text>
              )}
            />
          )}

          {description && (
            <Breakable
              render={() => (
                <Text c={colors.text} style={{ overflowWrap: "anywhere" }}>
                  {description}
                </Text>
              )}
            />
          )}
          {list && <Breakable render={() => <ListStack stack={list} />} />}
        </Flex>
      )}
      <Box>
        {tags && tags.length > 0 && (
          <Breakable render={() => <BadgeGroup tags={tags} />} />
        )}
      </Box>
    </Flex>
  );
};

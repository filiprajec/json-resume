import { Box, Flex, Text } from "@mantine/core";

import { useLayoutLocation, SectionProperty } from "@/context";
import { BadgeGroup } from "./badge-group";
import { ListStack } from "./list-stack";
import { PageBreak } from "./page-break";

interface DescriptionProps {
  property: SectionProperty;
  withHeading?: boolean;
  withPageBreaks?: boolean;
}

export const Description = ({
  property,
  withHeading = true,
  withPageBreaks,
}: DescriptionProps) => {
  const { heading, rating, description, date, list, tags } = property;
  const { textColor } = useLayoutLocation();

  const hasMainContent = heading || rating || description || date || list;

  return (
    <Flex direction="column" gap="xs">
      {hasMainContent && (
        <Flex direction="column" gap={4}>
          {withHeading && heading && (
            <PageBreak
              active={withPageBreaks}
              render={() => (
                <Text
                  size="lg"
                  fw={700}
                  lh={1.25}
                  c={textColor}
                  style={{ overflowWrap: "anywhere" }}
                >
                  {heading}
                </Text>
              )}
            />
          )}
          {date && (
            <PageBreak
              active={withPageBreaks}
              render={() => (
                <Text
                  fw={600}
                  c={textColor}
                  opacity={0.7}
                  style={{ overflowWrap: "anywhere" }}
                >
                  {date}
                </Text>
              )}
            />
          )}
          {rating && (
            <PageBreak
              active={withPageBreaks}
              render={() => (
                <Text c={textColor} style={{ overflowWrap: "anywhere" }}>
                  {rating}
                </Text>
              )}
            />
          )}

          {description && (
            <PageBreak
              active={withPageBreaks}
              render={() => (
                <Text c={textColor} style={{ overflowWrap: "anywhere" }}>
                  {description}
                </Text>
              )}
            />
          )}
          {list && (
            <PageBreak
              active={withPageBreaks}
              render={() => (
                <ListStack stack={list} withPageBreaks={withPageBreaks} />
              )}
            />
          )}
        </Flex>
      )}
      <Box>
        {tags && tags.length > 0 && (
          <PageBreak
            active={withPageBreaks}
            render={() => (
              <BadgeGroup tags={tags} withPageBreaks={withPageBreaks} />
            )}
          />
        )}
      </Box>
    </Flex>
  );
};

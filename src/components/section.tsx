import { Fragment } from "react";
import { Flex, rem, Text, ThemeIcon, Timeline, Title } from "@mantine/core";

import { Description } from "./description";
import { useResume } from "../context";
import type { ResumeDataSectionKey } from "../resume";
import styled from "styled-components";
import React from "react";
import { BasicsSection } from "./basics-section";

interface SectionProps {
  sectionKey: ResumeDataSectionKey;
}

export const Section = ({ sectionKey }: SectionProps) => {
  const { resume } = useResume();
  const config = resume?.getSectionConfig(sectionKey);

  if (!resume?.sectionHasContent(sectionKey) || !config?.visible) {
    return null;
  }

  if (sectionKey === "basics") {
    return <BasicsSection />;
  }

  const properties = resume?.getSectionProperties(sectionKey);
  const id = resume?.renderId;
  const icon = resume?.getIcon(sectionKey);

  return (
    <Flex direction="column" gap="sm">
      <Flex direction="row" gap="sm" justify="start" align="center" h="100%">
        {config?.showIcon && icon && (
          <ThemeIcon
            variant="light"
            radius="lg"
            size="lg"
            color={resume?.getColorScheme().primary}
          >
            {React.createElement(icon, {
              stroke: 1.5,
              style: {
                width: rem(24),
                height: rem(24),
              },
            })}
          </ThemeIcon>
        )}
        <Title order={4}>{config?.heading}</Title>
      </Flex>
      {config?.withTimeline === true ? (
        <Timeline bulletSize="1rem">
          {properties?.map((property, index) => (
            <TimeLineItem
              key={`timeline-cell-${index}`}
              title={
                <Text fw={700} size="lg" lh={1}>
                  {property.heading}
                </Text>
              }
            >
              <Flex direction="column">
                <Description property={property} withHeading={false} />
              </Flex>
            </TimeLineItem>
          ))}
        </Timeline>
      ) : (
        <Flex direction="column" gap="xs">
          {properties?.map((property, index) => (
            <Fragment key={`description-section-${id}`}>
              <Description property={property} />
            </Fragment>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

const TimeLineItem = styled(Timeline.Item)`
  --mantine-spacing-xl: calc(0.75rem * var(--mantine-scale));
`;

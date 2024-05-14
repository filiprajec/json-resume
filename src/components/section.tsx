import React, { Fragment } from "react";
import { Flex, rem, Text, ThemeIcon, Timeline, Title } from "@mantine/core";

import { useLayout, useResume, type ResumeDataSectionKey } from "@/context";
import { getResumeSectionIcon } from "@/lib/get-resume-section-icon";
import { Description } from "./description";
import { BasicsSection } from "./basics-section";
import { Breakable } from "./breakable";
import { TimelineBreakable } from "./timeline-breakable";

interface SectionProps {
  sectionKey: ResumeDataSectionKey;
  withPageBreaks?: boolean;
}

export const Section = ({ sectionKey, withPageBreaks }: SectionProps) => {
  const { resumeConfig, sectionHasContent, getSectionProperties } = useResume();
  const sectionConfig = resumeConfig.sectionConfig[sectionKey];
  const { colors } = useLayout();
  const properties = getSectionProperties(sectionKey);
  const icon = getResumeSectionIcon(sectionKey);

  if (!sectionHasContent(sectionKey) || !sectionConfig?.visible) {
    return null;
  }

  if (sectionKey === "basics") {
    return <BasicsSection />;
  }

  return (
    <Flex direction="column" gap="sm">
      <Breakable
        render={() => (
          <Flex
            direction="row"
            gap="sm"
            justify="start"
            align="center"
            h="100%"
          >
            {sectionConfig?.showIcon && icon && (
              <ThemeIcon
                variant="filled"
                radius="sm"
                size="lg"
                color={colors.primary}
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
            <Title order={3} c={colors.text}>
              {sectionConfig?.heading}
            </Title>
          </Flex>
        )}
      />
      {sectionConfig?.withTimeline === true ? (
        <Timeline radius="sm" bulletSize="1rem" lineWidth={3}>
          {properties?.map((property) => (
            <TimelineBreakable
              key={`timeline-cell-${property.id}`}
              title={
                <Text fw={700} size="lg" lh={1} c={colors.text}>
                  {property.heading}
                </Text>
              }
              active={withPageBreaks}
              render={() => (
                <Flex direction="column">
                  <Description
                    property={property}
                    withHeading={false}
                    withPageBreaks={withPageBreaks}
                  />
                </Flex>
              )}
            />
          ))}
        </Timeline>
      ) : (
        <Flex direction="column" gap="md">
          {properties?.map((property) => (
            <Fragment key={`description-section-${property.id}`}>
              <Breakable
                active={withPageBreaks}
                render={() => (
                  <Description
                    property={property}
                    withPageBreaks={withPageBreaks}
                  />
                )}
              />
            </Fragment>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

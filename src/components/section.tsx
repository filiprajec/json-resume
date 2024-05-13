import React, { Fragment } from "react";
import { Flex, rem, Text, ThemeIcon, Timeline, Title } from "@mantine/core";

import {
  useLayoutLocation,
  useResume,
  type ResumeDataSectionKey,
} from "@/context";
import { Description } from "./description";
import { BasicsSection } from "./basics-section";
import { PageBreak, TimelineItemBreak } from "./page-break";
import { getResumeSectionIcon } from "@/context/resume-context/get-resume-section-icon";

interface SectionProps {
  sectionKey: ResumeDataSectionKey;
  withPageBreaks?: boolean;
}

export const Section = ({ sectionKey, withPageBreaks }: SectionProps) => {
  const { resumeConfig, sectionHasContent, getSectionProperties } = useResume();
  const sectionConfig = resumeConfig.sectionConfig[sectionKey];
  const { textColor, accentColor } = useLayoutLocation();
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
      <PageBreak
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
                variant="light"
                radius="lg"
                size="lg"
                color={accentColor}
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
            <Title order={3} c={textColor}>
              {sectionConfig?.heading}
            </Title>
          </Flex>
        )}
      />
      {sectionConfig?.withTimeline === true ? (
        <Timeline bulletSize="1rem">
          {properties?.map((property) => (
            <TimelineItemBreak
              key={`timeline-cell-${property.id}`}
              title={
                <Text fw={700} size="lg" lh={1} c={textColor}>
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
        <Flex direction="column" gap="xs">
          {properties?.map((property) => (
            <Fragment key={`description-section-${property.id}`}>
              <PageBreak
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

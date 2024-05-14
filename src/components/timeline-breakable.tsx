import { useCallback, useState } from "react";
import styled from "styled-components";
import { Box, Timeline, TimelineItemProps } from "@mantine/core";

import {
  BreakableProvider,
  BreakableSetOptions,
  useBreakable,
  useLayout,
  usePage,
} from "@/context";
import { BreakablePropsBase } from "./breakable";

type TimelineBreakableProps = Omit<TimelineItemProps, "children" | "active"> &
  BreakablePropsBase;

export const TimelineBreakable = (props: TimelineBreakableProps) => {
  return (
    <BreakableProvider stopStatePropagation>
      <TimelineBreakableInner {...props} />
    </BreakableProvider>
  );
};

export const TimelineBreakableInner = ({
  render,
  active = false,
  ...timelineProps
}: TimelineBreakableProps) => {
  const { pageState, registerBreakable } = usePage();
  const { componentLocation, colors } = useLayout();
  const [pageBreakOptions, setBreakPageOptions] = useState<BreakableSetOptions>(
    {
      bottom: 0,
      hasBreakBelow: false,
      page: 0,
      top: 0,
      left: 0,
      distanceToBreakBelow: 0,
    }
  );
  const { setContainsPageBreak } = useBreakable();
  const setBreakOptionsCallback = useCallback(
    (options: Partial<BreakableSetOptions>) => {
      setBreakPageOptions((prev) => ({ ...prev, ...options }));
      if (options.hasBreakBelow) {
        setContainsPageBreak?.(true);
      }
    },
    []
  );
  const withBreakBelow = pageBreakOptions.hasBreakBelow;

  return (
    <TimeLineItem
      pos="relative"
      ref={(ref) =>
        registerBreakable(
          ref,
          {
            active,
            set: setBreakOptionsCallback,
          },
          componentLocation
        )
      }
      color="white"
      bullet={
        <Box
          bg={colors.primary}
          w="100%"
          h="100%"
          style={{ borderRadius: "0.1rem" }}
          opacity={0.5}
        />
      }
      {...timelineProps}
    >
      {render(pageBreakOptions)}
      {pageState === "ready" && withBreakBelow && (
        <div
          className="gap"
          style={{
            height: pageBreakOptions.distanceToBreakBelow,
            position: "relative",
          }}
        />
      )}
    </TimeLineItem>
  );
};

const TimeLineItem = styled(Timeline.Item)<{ lineHidden?: boolean }>`
  --mantine-spacing-xl: calc(0.75rem * var(--mantine-scale));
  --item-border-color: var(--mantine-color-gray-3);
`;

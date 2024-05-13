import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { Box, BoxProps, Timeline, TimelineItemProps } from "@mantine/core";

import { BreakableSetOptions, useLayoutLocation, usePage } from "@/context";
import "./page-break.css";

interface InitialContext {
  containsPageBreak: boolean;
  setContainsPageBreak: ((containsPageBreak: boolean) => void) | undefined;
}

const initialContext: InitialContext = {
  containsPageBreak: false,
  setContainsPageBreak: undefined,
};

const PageBreakContext = createContext<InitialContext>(initialContext);

const usePageBreakContext = () => {
  const context = useContext(PageBreakContext);
  if (!context) {
    return initialContext;
  }
  return context;
};

const PageBreakProvider = ({
  children,
  stopStatePropagation,
}: {
  children: React.ReactNode;
  stopStatePropagation?: boolean;
}) => {
  const [containsPageBreakLocal, setContainsPageBreakLocal] = useState(false);
  const {
    containsPageBreak: containsPageBreakUpper,
    setContainsPageBreak: setContainsPageBreakUpper,
  } = usePageBreakContext();

  const setContainsPageBreak = (containsPageBreak: boolean) => {
    if (!stopStatePropagation && setContainsPageBreakUpper) {
      setContainsPageBreakUpper(containsPageBreak);
    } else {
      setContainsPageBreakLocal(containsPageBreak);
    }
  };

  useEffect(() => {
    setContainsPageBreakLocal(containsPageBreakUpper);
  }, [containsPageBreakUpper]);

  return (
    <PageBreakContext.Provider
      value={{
        containsPageBreak: containsPageBreakLocal,
        setContainsPageBreak,
      }}
    >
      {children}
    </PageBreakContext.Provider>
  );
};

interface PageBreakBaseProps {
  render: (options: BreakableSetOptions) => React.ReactNode;
  active?: boolean;
}

type PageBreakProps = BoxProps & PageBreakBaseProps;

export const PageBreak = ({
  render,
  active = false,
  ...boxProps
}: PageBreakProps) => {
  const { layoutLocation } = useLayoutLocation();
  const [pageBreakOptions, setPageBreakOptions] = useState<BreakableSetOptions>(
    {
      bottom: 0,
      hasBreakBelow: false,
      page: 0,
      top: 0,
      left: 0,
      distanceToBreakBelow: 0,
    }
  );
  const { pageState, registerBreakable } = usePage();
  const { setContainsPageBreak } = usePageBreakContext();
  const setBreakOptionsCallback = useCallback(
    (options: Partial<BreakableSetOptions>) => {
      setPageBreakOptions((prev) => ({ ...prev, ...options }));

      if (options.hasBreakBelow) {
        setContainsPageBreak?.(true);
      }
    },
    []
  );
  const withBreakBelow = pageBreakOptions.hasBreakBelow; // blue - end of page

  return (
    <Box>
      <PageBreakProvider>
        <Box
          ref={(ref) =>
            registerBreakable(
              ref,
              { active, set: setBreakOptionsCallback },
              layoutLocation
            )
          }
          pos="relative"
          {...boxProps}
        >
          {render(pageBreakOptions)}
        </Box>
      </PageBreakProvider>
      {pageState === "ready" && withBreakBelow && (
        <div
          className="gap"
          style={{
            height: pageBreakOptions.distanceToBreakBelow,
            position: "relative",
          }}
        />
      )}
    </Box>
  );
};

type TimelineItemBreakProps = Omit<TimelineItemProps, "children" | "active"> &
  PageBreakBaseProps;

export const TimelineItemBreak = (props: TimelineItemBreakProps) => {
  return (
    <PageBreakProvider stopStatePropagation>
      <TimeLineItemBreakInner {...props} />
    </PageBreakProvider>
  );
};

export const TimeLineItemBreakInner = ({
  render,
  active = false,
  ...timelineProps
}: TimelineItemBreakProps) => {
  const { marginY, registerBreakable } = usePage();
  const { layoutLocation } = useLayoutLocation();
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
  const { containsPageBreak, setContainsPageBreak } = usePageBreakContext();

  const setBreakOptionsCallback = useCallback(
    (options: Partial<BreakableSetOptions>) => {
      setBreakPageOptions((prev) => ({ ...prev, ...options }));
      if (options.hasBreakBelow) {
        setContainsPageBreak?.(true);
      }
    },
    []
  );
  const withBreakBelow = pageBreakOptions.hasBreakBelow; // blue - end of page

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
          layoutLocation
        )
      }
      color="gray"
      // remove the link between the timeline and the page break
      lineHidden={containsPageBreak}
      {...timelineProps}
    >
      {/* <Box pos="absolute" w="100vw" bg="pink" h={12} /> */}
      {render(pageBreakOptions)}
      {withBreakBelow && (
        <Box h={pageBreakOptions.distanceToBreakBelow + marginY} />
      )}
    </TimeLineItem>
  );
};

const TimeLineItem = styled(Timeline.Item)<{ lineHidden?: boolean }>`
  --mantine-spacing-xl: calc(0.75rem * var(--mantine-scale));
  /* --timeline-line-display: ${(props) =>
    props.lineHidden ? "none" : "inherit"}; */
`;

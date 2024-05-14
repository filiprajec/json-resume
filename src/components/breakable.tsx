import { useCallback, useState } from "react";
import { Box, BoxProps } from "@mantine/core";

import {
  BreakableProvider,
  BreakableSetOptions,
  useBreakable,
  useLayout,
  usePage,
} from "@/context";

export interface BreakablePropsBase {
  render: (options: BreakableSetOptions) => React.ReactNode;
  active?: boolean;
}

type BreakableProps = BoxProps & BreakablePropsBase;

export const Breakable = ({
  render,
  active = false,
  ...boxProps
}: BreakableProps) => {
  const { componentLocation } = useLayout();
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
  const { setContainsPageBreak } = useBreakable();
  const setBreakOptionsCallback = useCallback(
    (options: Partial<BreakableSetOptions>) => {
      setPageBreakOptions((prev) => ({ ...prev, ...options }));

      if (options.hasBreakBelow) {
        setContainsPageBreak?.(true);
      }
    },
    []
  );
  const withBreakBelow = pageBreakOptions.hasBreakBelow;

  return (
    <Box>
      <BreakableProvider>
        <Box
          ref={(ref) =>
            registerBreakable(
              ref,
              { active, set: setBreakOptionsCallback },
              componentLocation
            )
          }
          pos="relative"
          {...boxProps}
        >
          {render(pageBreakOptions)}
        </Box>
      </BreakableProvider>
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

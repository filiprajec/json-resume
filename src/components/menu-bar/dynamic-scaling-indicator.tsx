import { Badge, Box, Loader, ThemeIcon, Tooltip } from "@mantine/core";

import { usePage } from "@/context";
import { IconCheck } from "@tabler/icons-react";

export const DynamicScalingIndicator = () => {
  const { pageState } = usePage();

  return (
    <Tooltip label="Content will be scaled to fit page heights while respecting page breaks.">
      <Box pos="relative">
        <Loader
          size="xs"
          color="teal"
          pos="absolute"
          top={5}
          opacity={pageState === "rendering" ? 1 : 0}
          style={{
            transition: "all 0.2s",
          }}
        />
        <ThemeIcon
          size="xs"
          color="teal"
          pos="absolute"
          top={5}
          opacity={pageState === "rendering" ? 0 : 1}
          style={{
            transition: "all 0.2s",
          }}
        >
          <IconCheck />
        </ThemeIcon>

        <Badge
          size="lg"
          variant={pageState === "rendering" ? "gradient" : "light"}
          gradient={{
            from: "teal",
            to: "cyan",
            deg: 45,
          }}
          style={{
            marginLeft: 32,
            transition: "all 0.2s",
          }}
        >
          Dynamic scaling
        </Badge>
      </Box>
    </Tooltip>
  );
};

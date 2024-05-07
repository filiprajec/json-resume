import { Box, Stack, Skeleton } from "@mantine/core";

import { SelectColorSchemePanel } from "./select-color-scheme-panel";
import { ResumeJsonFieldPanel } from "./resume-json-field-panel";
import { SectionPanel } from "./section-panel";

export const MenuBar = () => {
  return (
    <Box h="100%" pos="relative" bg="white">
      <form style={{ height: "100%" }}>
        <Stack gap="xl">
          <Box pt="sm" pb="lg" px="lg" bg="gray.0">
            <ResumeJsonFieldPanel />
          </Box>
          <Box px="lg">
            <SelectColorSchemePanel />
          </Box>
          <Box pb="sm" px="lg">
            <SectionPanel />
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

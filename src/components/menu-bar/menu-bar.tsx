import { Box, Stack } from "@mantine/core";

import { SelectColorSchemePanel } from "./select-color-scheme-panel";
import { ResumeJsonPanel } from "./resume-json-panel";
import { SectionPanel } from "./section-panel";
import { SelectPagesSection } from "./select-pages-section";
import { AccuracySelectPanel } from "./accuracy-select-panel";

export const MenuBar = () => {
  return (
    <Box h="100%" pos="relative" bg="white">
      <form style={{ height: "100%" }}>
        <Stack gap="xl">
          <Box pt="sm" pb="lg" px="lg" bg="gray.0">
            <ResumeJsonPanel />
          </Box>
          <Box px="lg">
            <AccuracySelectPanel />
          </Box>
          <Box px="lg">
            <SelectPagesSection />
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

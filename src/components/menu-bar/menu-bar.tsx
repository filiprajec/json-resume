import { Box, Paper, Stack, Tabs } from "@mantine/core";

import { AccuracySelectPanel } from "./accuracy-select-panel";
import { DynamicScalingIndicator } from "./dynamic-scaling-indicator";
import { JsonSchemaAlert } from "./json-schema-alert";
import { LayoutPanel } from "./layout-panel";
import { ResumeJsonPanel } from "./resume-json-panel";
import { SelectColorSchemePanel } from "./select-color-scheme-panel";
import { SelectPagesPanel } from "./select-pages-panel";

export const MenuBar = () => {
  return (
    <Box h="100%" pos="relative" bg="white">
      <Box pos="relative" bg="gray.0" p="lg">
        <DynamicScalingIndicator />
      </Box>

      <Tabs defaultValue="page" variant="pills" radius="lg">
        <Box pos="relative" bg="gray.0" pb="md">
          <Paper bg="white" p="xs" mx="lg" radius="lg" withBorder>
            <Tabs.List>
              <Tabs.Tab value="page">Page</Tabs.Tab>
              <Tabs.Tab value="layout">Layout</Tabs.Tab>
              <Tabs.Tab value="colors">Color Scheme</Tabs.Tab>
            </Tabs.List>
          </Paper>
        </Box>

        <Tabs.Panel value="page" p="lg">
          <Stack gap="xl">
            <JsonSchemaAlert />
            <ResumeJsonPanel />
            <AccuracySelectPanel />
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="layout" p="lg">
          <Stack gap="md">
            <SelectPagesPanel />
            <LayoutPanel />
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="colors" p="lg">
          <SelectColorSchemePanel />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

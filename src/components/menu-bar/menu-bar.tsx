import {
  Alert,
  Anchor,
  Badge,
  Box,
  Fieldset,
  Flex,
  Group,
  Indicator,
  Loader,
  Paper,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";

import { SelectColorSchemePanel } from "./select-color-scheme-panel";
import { ResumeJsonPanel } from "./resume-json-panel";
import { SectionPanel } from "./section-panel";
import { SelectPagesSection } from "./select-pages-section";
import { AccuracySelectPanel } from "./accuracy-select-panel";
import { usePage } from "@/context";
import { IconCheck, IconInfoCircle } from "@tabler/icons-react";

export const MenuBar = () => {
  const { pageState } = usePage();

  return (
    <Box h="100%" pos="relative" bg="white">
      <Box pos="relative" bg="gray.0">
        <Stack gap="md">
          <Tooltip
            label="Content will be scaled to fit page heights while respecting page
                breaks."
          >
            <Box mx="lg" pos="relative" mt="lg">
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
        </Stack>
      </Box>

      <Tabs defaultValue="page" variant="pills" radius="lg">
        <Box pos="relative" bg="gray.0" pb="md" pt="md">
          <Paper bg="white" p="xs" mx="lg" radius="lg" withBorder>
            <Tabs.List>
              <Tabs.Tab value="page">Page</Tabs.Tab>
              <Tabs.Tab value="layout">Layout</Tabs.Tab>
              <Tabs.Tab value="colors">Color Scheme</Tabs.Tab>
            </Tabs.List>
          </Paper>
        </Box>

        <Tabs.Panel value="page">
          <Box p="lg">
            <Stack gap="xl">
              <Alert
                variant="default"
                icon={<IconInfoCircle stroke={1.5} />}
                radius="lg"
              >
                <Text size="sm" c="dimmed">
                  The engine follows the JSON schema made popular by{" "}
                  <Anchor href="https://jsonresume.org/">jsonresume.org</Anchor>
                  .
                </Text>
              </Alert>
              <ResumeJsonPanel />
              <Stack mb="lg">
                <AccuracySelectPanel />
              </Stack>
            </Stack>
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="layout">
          <Box p="lg">
            <Stack gap="md">
              <SelectPagesSection />
              <SectionPanel />
            </Stack>
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="colors">
          <Box p="lg">
            <SelectColorSchemePanel />
          </Box>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

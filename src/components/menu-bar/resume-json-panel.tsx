import { useState } from "react";
import { Box, Button, Stack, Text, Group } from "@mantine/core";

import { usePage } from "@/context";
import { EditJsonModal } from "./edit-json-modal";
import { FetchJsonModal } from "./fetch-json-modal";

export const ResumeJsonPanel = () => {
  const { pageState } = usePage();
  const [editJsonOpened, setEditJsonOpened] = useState(false);
  const [loadJsonUrlModalOpened, setLoadJsonUrlModalOpened] = useState(false);

  return (
    <>
      <Box h="100%" pos="relative">
        <Stack gap="xs">
          <Text size="sm" fw={500}>
            JSON
          </Text>
          <Group gap="xs" w="100%">
            <Button
              onClick={() => setEditJsonOpened(true)}
              disabled={["rendering", "fetching"].includes(pageState)}
              flex={1}
            >
              Edit JSON
            </Button>
            <Button
              flex={1}
              onClick={() => setLoadJsonUrlModalOpened(true)}
              variant="default"
              loading={pageState === "fetching"}
              disabled={["rendering", "fetching"].includes(pageState)}
            >
              Get From URL
            </Button>
          </Group>
        </Stack>
      </Box>
      <FetchJsonModal
        opened={loadJsonUrlModalOpened}
        onClose={() => setLoadJsonUrlModalOpened(false)}
      />
      <EditJsonModal
        opened={editJsonOpened}
        onClose={() => setEditJsonOpened(false)}
      />
    </>
  );
};

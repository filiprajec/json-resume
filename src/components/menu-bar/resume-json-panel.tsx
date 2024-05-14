import { useState } from "react";
import { Box, Button, Stack, Text, Group, Input } from "@mantine/core";

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
        <Input.Wrapper
          label="Resume JSON"
          description="Paste a resume json into the editor or fetch from a URL. "
          size="md"
        >
          <Group gap="xs" w="100%" mt="xs">
            <Button
              onClick={() => setEditJsonOpened(true)}
              disabled={["rendering", "fetching"].includes(pageState)}
              flex={1}
            >
              Open JSON editor
            </Button>
            <Button
              flex={1}
              onClick={() => setLoadJsonUrlModalOpened(true)}
              variant="default"
              loading={pageState === "fetching"}
              disabled={["rendering", "fetching"].includes(pageState)}
            >
              Get JSON from URL
            </Button>
          </Group>
        </Input.Wrapper>
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

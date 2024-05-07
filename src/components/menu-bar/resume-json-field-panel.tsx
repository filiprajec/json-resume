import { useState, useEffect } from "react";
import { Box, Button, TextInput, Stack, Text } from "@mantine/core";
import { useField } from "@mantine/form";

import { EditJsonModal } from "./edit-json-modal";
import { usePage, useResume } from "../../context";

export const ResumeJsonFieldPanel = () => {
  const { fetchJson, error: jsonError } = useResume();
  const { pageState } = usePage();
  const [editJsonOpened, setEditJsonOpened] = useState(false);

  const field = useField({
    initialValue:
      "https://raw.githubusercontent.com/jsonresume/resume-schema/master/sample.resume.json",
  });

  useEffect(() => {
    if (jsonError) {
      field.setError(jsonError);
    } else {
      field.setError(null);
    }
  }, [jsonError]);

  const updateUrl = () => {
    try {
      const value = field.getValue();
      fetchJson(value);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Box h="100%" pos="relative">
        <Stack gap="xs">
          <Text size="sm" fw={500}>
            JSON
          </Text>
          <Button
            onClick={() => setEditJsonOpened(true)}
            variant="default"
            disabled={["calculating", "fetching"].includes(pageState)}
          >
            Edit JSON
          </Button>
          <TextInput
            type="url"
            label="Resume JSON URL"
            description="Enter URL to your resume JSON file"
            {...field.getInputProps()}
          />
          <Button
            onClick={updateUrl}
            variant="default"
            loading={pageState === "fetching"}
            disabled={["calculating", "fetching"].includes(pageState)}
          >
            Get From URL
          </Button>
        </Stack>
      </Box>
      <EditJsonModal
        opened={editJsonOpened}
        onClose={() => setEditJsonOpened(false)}
      />
    </>
  );
};

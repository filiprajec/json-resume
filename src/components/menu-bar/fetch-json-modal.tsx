import { Button, TextInput, Stack, Modal, Flex, Group } from "@mantine/core";
import { useField } from "@mantine/form";

import { usePage, useResume } from "@/context";
import { useFetchResumeJson } from "./use-fetch-resume-json";
import { ResumeJsonSchema } from "@/lib/resume-schema-types";
import { logger } from "@/lib/logger";

interface FetchJsonModalProps {
  opened: boolean;
  onClose: () => void;
}

export const FetchJsonModal = ({
  opened,
  onClose: onCloseProp,
}: FetchJsonModalProps) => {
  const { updateJson } = useResume();
  const { updatePageState } = usePage();
  const { fetch, loading } = useFetchResumeJson();

  const field = useField({
    initialValue:
      "https://raw.githubusercontent.com/jsonresume/resume-schema/master/sample.resume.json",
  });

  const onClose = () => {
    if (loading) return;
    field.reset();
    onCloseProp();
  };

  const updateUrl = async () => {
    const value = field.getValue();
    updatePageState("fetching", "fetchJsonModal");
    await fetch(value, {
      onSuccess: (resumeJson) => {
        updateJson(resumeJson);
        updatePageState("ready", "fetchJsonModal");
        onClose();
      },
      onError: (e) => {
        updatePageState("error", "fetchJsonModal");
        if (e instanceof Error) {
          field.setError(e.message);
        } else if (typeof e === "string") {
          field.setError(e);
        } else {
          field.setError("An error occurred while processing the json.");
        }
        logger.error(e);
      },
    });
  };

  return (
    <Modal title="Get JSON From URL" opened={opened} onClose={onClose}>
      <Stack gap="xs">
        <TextInput
          type="url"
          label="URL"
          description="Enter URL to your resume JSON file"
          {...field.getInputProps()}
        />
        <Flex w="100%" justify="flex-end">
          <Group gap="xs">
            <Button variant="default" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={updateUrl} loading={loading}>
              Get
            </Button>
          </Group>
        </Flex>
      </Stack>
    </Modal>
  );
};

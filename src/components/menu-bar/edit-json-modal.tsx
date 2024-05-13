import { Button, Stack, Group, Modal, JsonInput, Flex } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useField } from "@mantine/form";
import resumeSchema from "resume-schema";

import { logger } from "@/lib/logger";
import { useResume } from "@/context";

interface EditJsonModalProps {
  opened: boolean;
  onClose: () => void;
}

export const EditJsonModal = ({ opened, onClose }: EditJsonModalProps) => {
  const { updateJson, resumeConfig } = useResume();

  const jsonField = useField({
    initialValue: "",
    validateOnBlur: true,
    validate: (value) => {
      if (value) {
        try {
          const parsed = JSON.parse(value);
          resumeSchema.validate(
            parsed,
            (err) => {
              if (err) {
                return err.message;
              }
              return null;
            },
            (err) => {
              return err.message;
            }
          );
          return null;
        } catch (error) {
          if (error instanceof Error) {
            return error.message;
          }
          return "An error occurred.";
        }
      }
      return null;
    },
  });

  useShallowEffect(() => {
    jsonField.setValue(JSON.stringify(resumeConfig.json, null, 2));
  }, [opened, resumeConfig.json]);

  const onSaveJson = () => {
    try {
      jsonField.validate();
      const json = jsonField.getValue();
      const parsed = JSON.parse(json);
      updateJson(parsed);
      onClose();
    } catch (e) {
      logger.error(e);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit JSON" size="90%">
      <Stack gap="xs">
        <JsonInput rows={20} {...jsonField.getInputProps()} />
        <Flex w="100%" justify="flex-end">
          <Group gap="xs">
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onSaveJson}>Save</Button>
          </Group>
        </Flex>
      </Stack>
    </Modal>
  );
};

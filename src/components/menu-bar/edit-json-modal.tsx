import resumeSchema from "resume-schema";
import { Button, Stack, Group, Modal, JsonInput, Flex } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useField } from "@mantine/form";

import { useResume } from "../../context";

interface EditJsonModalProps {
  opened: boolean;
  onClose: () => void;
}

export const EditJsonModal = ({ opened, onClose }: EditJsonModalProps) => {
  const { resume } = useResume();

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
    jsonField.setValue(JSON.stringify(resume?.getJson(), null, 2));
  }, [resume, opened]);

  const onSaveJson = () => {
    try {
      jsonField.validate();
      const json = jsonField.getValue();
      const parsed = JSON.parse(json);
      resume?.updateJson(parsed);
      onClose();
    } catch (e) {
      console.log(e);
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

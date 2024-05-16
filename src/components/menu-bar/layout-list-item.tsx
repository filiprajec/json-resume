import {
  TextInput,
  Text,
  Stack,
  Paper,
  rem,
  Group,
  ActionIcon,
  Flex,
  Center,
  Badge,
  Switch,
  Popover,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEditCircle, IconGripVertical } from "@tabler/icons-react";
import { Draggable } from "@hello-pangea/dnd";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";

import { usePage, useResume, type ResumeDataSectionKey } from "@/context";
import { capitalizeFirstLetter } from "@/lib/utils";
import { logger } from "@/lib/logger";

export type ListState = {
  sectionKey: ResumeDataSectionKey;
};

export type LayoutFormValues = {
  heading: string | undefined;
  sectionKey: ResumeDataSectionKey;
  visible: boolean;
  withTimeline: boolean;
  showIcon: boolean;
};

interface LayoutListItemProps {
  item: ListState;
  index: number;
}

export const LayoutListItem = ({ item, index }: LayoutListItemProps) => {
  const { sectionHasContent, resumeConfig, updateResumeSectionConfig } =
    useResume();
  const { pageState } = usePage();
  const sectionForm = useForm<LayoutFormValues>({
    initialValues: {
      ...resumeConfig.sectionConfig[item.sectionKey],
      sectionKey: item.sectionKey,
    },
  });

  const [opened, handlers] = useDisclosure(false);
  const { sectionKey } = item;
  const sectionConfig = resumeConfig.sectionConfig[item.sectionKey];
  const hasContent = sectionHasContent(sectionKey);

  useShallowEffect(() => {
    sectionForm.setValues(resumeConfig.sectionConfig[sectionKey]);
  }, [resumeConfig.sectionConfig[sectionKey]]);

  const handleSubmit = (values: LayoutFormValues) => {
    try {
      updateResumeSectionConfig(sectionKey, {
        heading: values.heading,
        visible: values.visible,
        withTimeline: values.withTimeline,
        showIcon: values.showIcon,
      });
      handlers.close();
    } catch (e) {
      logger.error(e);
    }
  };

  return (
    <Draggable
      key={sectionKey}
      index={index}
      draggableId={sectionKey}
      isDragDisabled={pageState !== "ready"}
    >
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Popover
            width={200}
            position="right"
            withArrow
            shadow="md"
            opened={opened}
            onClose={handlers.close}
          >
            <Paper p="sm" radius="lg" withBorder opacity={hasContent ? 1 : 0.5}>
              <Flex align="center" justify="space-between">
                <Group align="center" gap={6} wrap="nowrap">
                  <div {...provided.dragHandleProps}>
                    <Center h="100%">
                      <IconGripVertical
                        style={{
                          width: rem(16),
                          height: rem(16),
                        }}
                        stroke={1.5}
                      />
                    </Center>
                  </div>
                  <Text size="sm" fw={500}>
                    {capitalizeFirstLetter(sectionKey)}
                  </Text>
                </Group>
                <Group justify="end" gap="xs" wrap="nowrap">
                  {!hasContent && (
                    <Badge color="gray" variant="light" size="sm">
                      Empty
                    </Badge>
                  )}
                  {hasContent && !sectionConfig?.visible && (
                    <Badge color="gray" variant="light" size="sm">
                      Hidden
                    </Badge>
                  )}
                  <Popover.Target>
                    <ActionIcon
                      variant="filled"
                      size="sm"
                      radius="xl"
                      onClick={handlers.toggle}
                      disabled={!hasContent}
                    >
                      <IconEditCircle
                        stroke={1.5}
                        style={{
                          width: rem(16),
                          height: rem(16),
                        }}
                      />
                    </ActionIcon>
                  </Popover.Target>
                </Group>
              </Flex>
              <Popover.Dropdown>
                <Stack>
                  {sectionKey !== "basics" && (
                    <TextInput
                      placeholder="Enter Title"
                      label="Section Title"
                      size="sm"
                      {...sectionForm.getInputProps("heading")}
                    />
                  )}
                  <Stack gap="sm">
                    <Switch
                      label="Visible"
                      size="sm"
                      {...sectionForm.getInputProps("visible", {
                        type: "checkbox",
                      })}
                    />
                    <Switch
                      label={
                        sectionKey !== "basics" ? "Show Icon" : "Show Avatar"
                      }
                      size="sm"
                      {...sectionForm.getInputProps("showIcon", {
                        type: "checkbox",
                      })}
                    />
                    {sectionKey !== "basics" && (
                      <Switch
                        label="With Timeline"
                        size="sm"
                        {...sectionForm.getInputProps("withTimeline", {
                          type: "checkbox",
                        })}
                      />
                    )}
                  </Stack>

                  <Button
                    onClick={() => handleSubmit(sectionForm.getValues())}
                    size="sm"
                  >
                    Update
                  </Button>
                </Stack>
              </Popover.Dropdown>
              <TextInput
                hidden
                type="hidden"
                {...sectionForm.getInputProps("sectionKey")}
              />
            </Paper>
          </Popover>
        </div>
      )}
    </Draggable>
  );
};

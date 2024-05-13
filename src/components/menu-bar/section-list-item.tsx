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

import { useResume, type ResumeDataSectionKey } from "@/context";
import { capitalizeFirstLetter } from "@/utils";
import { logger } from "@/lib/logger";

export type ListState = {
  sectionKey: ResumeDataSectionKey;
};

export type SectionFormValues = {
  heading: string | undefined;
  sectionKey: ResumeDataSectionKey;
  visible: boolean;
  withTimeline: boolean;
  showIcon: boolean;
};

interface SectionListItemProps {
  item: ListState;
  index: number;
}

export const SectionListItem = ({ item, index }: SectionListItemProps) => {
  const { sectionHasContent, resumeConfig, updateResumeSectionConfig } =
    useResume();
  const sectionForm = useForm<SectionFormValues>({
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

  const handleSubmit = (values: SectionFormValues) => {
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
    <Draggable key={sectionKey} index={index} draggableId={sectionKey}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Popover
            width={200}
            position="right"
            withArrow
            shadow="md"
            opened={opened}
            onClose={handlers.close}
          >
            <Paper p={4} withBorder shadow="xs" opacity={hasContent ? 1 : 0.5}>
              <Flex align="center" justify="space-between">
                <Group align="center" gap={4} wrap="nowrap">
                  <div {...provided.dragHandleProps}>
                    <Center c="dimmed" h="100%">
                      <IconGripVertical
                        style={{
                          width: rem(14),
                          height: rem(14),
                        }}
                        stroke={1.5}
                      />
                    </Center>
                  </div>
                  <Text size="xs" fw={500} c="dimmed">
                    {capitalizeFirstLetter(sectionKey)}
                  </Text>
                </Group>
                <Group justify="end" gap={4} wrap="nowrap">
                  {!hasContent && (
                    <Badge color="gray" variant="light" size="xs">
                      Empty
                    </Badge>
                  )}
                  {hasContent && !sectionConfig?.visible && (
                    <Badge color="gray" variant="light" size="xs">
                      Hidden
                    </Badge>
                  )}
                  <Popover.Target>
                    <ActionIcon
                      variant="light"
                      size="xs"
                      radius="sm"
                      onClick={handlers.toggle}
                      disabled={!hasContent}
                    >
                      <IconEditCircle
                        stroke={1.5}
                        style={{
                          width: rem(14),
                          height: rem(14),
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
                      size="xs"
                      {...sectionForm.getInputProps("heading")}
                    />
                  )}
                  <Stack gap="sm">
                    <Switch
                      label="Visible"
                      size="xs"
                      {...sectionForm.getInputProps("visible", {
                        type: "checkbox",
                      })}
                    />
                    {sectionKey !== "basics" && (
                      <Switch
                        label="Show Icon"
                        size="xs"
                        {...sectionForm.getInputProps("showIcon", {
                          type: "checkbox",
                        })}
                      />
                    )}
                    {sectionKey !== "basics" && (
                      <Switch
                        label="With Timeline"
                        size="xs"
                        {...sectionForm.getInputProps("withTimeline", {
                          type: "checkbox",
                        })}
                      />
                    )}
                  </Stack>

                  <Button
                    onClick={() => handleSubmit(sectionForm.getValues())}
                    size="xs"
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

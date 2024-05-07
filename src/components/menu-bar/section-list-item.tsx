import {
  TextInput,
  Text,
  Stack,
  Paper,
  rem,
  Group,
  Collapse,
  ActionIcon,
  Flex,
  Center,
  Badge,
  Switch,
  SimpleGrid,
  Fieldset,
  Popover,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconCheck,
  IconEditCircle,
  IconGripVertical,
} from "@tabler/icons-react";
import { Draggable } from "@hello-pangea/dnd";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";

import { ListState } from "./types";
import { capitalizeFirstLetter } from "./utils";
import { ResumeDataSectionKey } from "../../resume";
import { useResume } from "../../context";

export type SectionFormValues = {
  heading: string;
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
  const sectionForm = useForm<SectionFormValues>({
    initialValues: {
      heading: "",
      sectionKey: item.sectionKey,
      visible: false,
      withTimeline: false,
      showIcon: false,
    },
  });

  const { resume } = useResume();
  const [opened, handlers] = useDisclosure(false);
  const { sectionKey } = item;
  const sectionConfig = resume?.getSectionConfig(item.sectionKey);
  const hasContent = resume?.sectionHasContent(sectionKey);

  useShallowEffect(() => {
    if (!resume) {
      return;
    }

    const sectionConfig = resume.getSectionConfig(sectionKey);

    sectionForm.setValues({
      heading: sectionConfig.heading,
      sectionKey,
      visible: sectionConfig.visible,
      withTimeline: sectionConfig.withTimeline,
      showIcon: sectionConfig.showIcon,
    });
  }, [sectionKey, resume]);

  const handleSubmit = (values: SectionFormValues) => {
    try {
      resume?.setSectionConfig(sectionKey, {
        heading: values.heading,
        visible: values.visible,
        withTimeline: values.withTimeline,
        showIcon: values.showIcon,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Draggable key={sectionKey} index={index} draggableId={sectionKey}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <form>
            <Popover width={200} position="right" withArrow shadow="md">
              <Paper
                p={4}
                withBorder
                shadow="xs"
                opacity={hasContent ? 1 : 0.5}
              >
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
                        onClick={() => {
                          handlers.toggle();
                        }}
                        variant="light"
                        size="xs"
                      >
                        {opened ? (
                          <IconCheck
                            stroke={1.5}
                            style={{
                              width: rem(14),
                              height: rem(14),
                            }}
                          />
                        ) : (
                          <IconEditCircle
                            stroke={1.5}
                            style={{
                              width: rem(14),
                              height: rem(14),
                            }}
                          />
                        )}
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
          </form>
        </div>
      )}
    </Draggable>
  );
};

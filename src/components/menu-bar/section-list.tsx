import { Box, Text, Stack, Paper, Center, Divider } from "@mantine/core";
import { Droppable } from "@hello-pangea/dnd";

import { ListState } from "./types";
import { SectionListItem } from "./section-list-item";

interface SectionListProps {
  state: (ListState | undefined)[];
  droppableId: string;
  pageNumber: number;
}

export const SectionList = ({
  state,
  droppableId,
  pageNumber,
}: SectionListProps) => {
  return (
    <Box pos="relative">
      <Stack gap="xs" pos="relative" style={{ zIndex: 1 }}>
        <Droppable droppableId={droppableId} direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Stack gap="xs" mih={150}>
                {state?.map((item, index) => {
                  if (!item) return null;

                  return <SectionListItem item={item} index={index} />;
                })}
              </Stack>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Stack>
      <Paper
        h="100%"
        top={0}
        shadow="none"
        bg="gray.0"
        pos="absolute"
        w="100%"
        opacity={state.length === 0 ? 1 : 0}
        style={{
          transition: "opacity 0.1s ease-in-out",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Center w="100%" h="100%">
          <Text c="dimmed" size="xs">
            Empty Section
          </Text>
        </Center>
      </Paper>
    </Box>
  );
};

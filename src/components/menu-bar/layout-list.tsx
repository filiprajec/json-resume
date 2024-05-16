import { Box, Text, Stack, Paper, Center } from "@mantine/core";
import { Droppable } from "@hello-pangea/dnd";

import { type ListState, LayoutListItem } from "./layout-list-item";

interface LayoutListProps {
  state: (ListState | undefined)[];
  droppableId: string;
}

export const LayoutList = ({ state, droppableId }: LayoutListProps) => {
  return (
    <Box pos="relative">
      <Stack gap="xs" pos="relative" style={{ zIndex: 1 }}>
        <Droppable droppableId={droppableId} direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Stack gap="xs" mih={150}>
                {state?.map((item, index) => {
                  if (!item) return null;

                  return (
                    <LayoutListItem
                      item={item}
                      index={index}
                      key={item.sectionKey}
                    />
                  );
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

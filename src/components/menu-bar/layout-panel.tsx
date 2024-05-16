import { useCallback, useRef } from "react";
import { Box, Divider, SimpleGrid, Stack, Text } from "@mantine/core";
import { useListState, useShallowEffect } from "@mantine/hooks";
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";

import { notEmpty } from "@/lib/utils";
import { usePage, useResume, type ResumePageLayout } from "@/context";
import { LayoutList } from "./layout-list";
import type { ListState } from "./layout-list-item";

export const LayoutPanel = () => {
  const { getSectionKeysWithContent, resumeConfig, updateResumeConfig } =
    useResume();
  const { runScaler } = usePage();
  const hasDragged = useRef(false);
  const [panelState, panelHandlers] = useListState<ListState | undefined>(
    undefined
  );
  const [bodyState, bodyHandlers] = useListState<ListState | undefined>(
    undefined
  );
  const sectionKeys = getSectionKeysWithContent();

  const getLayoutFromState: () => ResumePageLayout = useCallback(() => {
    return {
      panel: panelState.map((item) => item?.sectionKey).filter(notEmpty),
      body: bodyState.map((item) => item?.sectionKey).filter(notEmpty),
    };
  }, [panelState, bodyState]);

  // initialize the panel and body state
  useShallowEffect(() => {
    if (!sectionKeys) return;

    const pageLayout = resumeConfig.layout;
    const panelListState: ListState[] = pageLayout.panel?.map((sectionKey) => ({
      sectionKey,
    }));
    panelHandlers.setState(panelListState);
    const bodyListState: ListState[] = pageLayout.body?.map((sectionKey) => ({
      sectionKey,
    }));
    bodyHandlers.setState(bodyListState);
  }, [sectionKeys]);

  // update the resume layout when the panel or body state changes
  useShallowEffect(() => {
    if (hasDragged.current) {
      hasDragged.current = false;
      const updatedLayout = getLayoutFromState();
      updateResumeConfig({ layout: updatedLayout });
      runScaler();
    }
  }, [getLayoutFromState, panelState, bodyState, runScaler]);

  const onDragEnd: OnDragEndResponder = (result) => {
    hasDragged.current = true;
    const { destination, source } = result;
    if (!destination) return;

    if (source.droppableId === "panel-list") {
      if (destination.droppableId === "panel-list") {
        panelHandlers.reorder({
          from: source.index,
          to: destination.index,
        });
        return;
      }

      const element = panelState[source.index];
      panelHandlers.remove(source.index);
      bodyHandlers.insert(destination.index, element);
    }

    if (source.droppableId === "body-list") {
      if (destination.droppableId === "body-list") {
        bodyHandlers.reorder({
          from: source.index,
          to: destination.index,
        });
        return;
      }

      const element = bodyState[source.index];
      bodyHandlers.remove(source.index);
      panelHandlers.insert(destination.index, element);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box w="100%" mih={200} h="100%">
        <SimpleGrid cols={1} spacing="xs">
          <Box>
            <Divider label="Panel" mb="md" />
            <LayoutList state={panelState} droppableId={`panel-list`} />
          </Box>
          <Box>
            <Divider label="Body" mb="md" />
            <LayoutList state={bodyState} droppableId={`body-list`} />
          </Box>
        </SimpleGrid>
      </Box>
    </DragDropContext>
  );
};

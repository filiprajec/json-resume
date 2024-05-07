import { useCallback, useRef, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";

import { useShallowEffect } from "@mantine/hooks";
import { ListState } from "./types";
import { SectionList } from "./section-list";
import { notEmpty } from "./utils";
import { useMultiplePageListState } from "./use-page-list-state";
import { usePage, useResume } from "../../context";
import { ResumePageLayout } from "../../resume/config";

const MAX_PAGES = 5;

export const SectionPanel = () => {
  const { resume } = useResume();
  const { pageState } = usePage();
  const hasDragged = useRef(false);
  const { pageListStates, move, swapPages } =
    useMultiplePageListState(MAX_PAGES);
  const [visibleMenuPages, setVisibleMenuPages] = useState<number>(1);
  const sectionKeys = resume?.getSectionKeysWithContent();
  const renderedPages = resume?.getPageCount();
  const isLastPageEmpty = Boolean(
    renderedPages && visibleMenuPages > renderedPages
  );

  const getLayoutFromState: () => ResumePageLayout[] = useCallback(() => {
    let layout: ResumePageLayout[] = pageListStates.map(({ state }) => ({
      panel: state.panel.map((item) => item?.sectionKey).filter(notEmpty),
      body: state.body.map((item) => item?.sectionKey).filter(notEmpty),
    }));

    return layout.filter(
      (pageLayout) => pageLayout.panel.length > 0 || pageLayout.body.length > 0
    );
  }, [pageListStates]);

  const getEmptyPageIndexesFromState: () => number[] = useCallback(() => {
    let emptyPageIndexes: number[] = [];
    pageListStates.forEach(({ state }, index) => {
      if (state.panel.length === 0 && state.body.length === 0) {
        emptyPageIndexes.push(index);
      }
    });

    return emptyPageIndexes;
  }, [pageListStates]);

  const getPopulatedPageIndexesFromState: () => number[] = useCallback(() => {
    let emptyPageIndexes: number[] = [];
    pageListStates.forEach(({ state }, index) => {
      if (state.panel.length !== 0 || state.body.length !== 0) {
        emptyPageIndexes.push(index);
      }
    });

    return emptyPageIndexes;
  }, [pageListStates]);

  const cleanUpEmptyPages = useCallback(() => {
    const emptyPageIndexes = getEmptyPageIndexesFromState();
    const populatedPageIndexes = getPopulatedPageIndexesFromState();

    const highestPopulatedPageIndex = Math.max(...populatedPageIndexes);

    const emptyPageIndexesToSwap = emptyPageIndexes.filter(
      (index) => index < highestPopulatedPageIndex
    );
    // order empty pages to swap from highest to lowest
    emptyPageIndexesToSwap.sort((a, b) => b - a);

    emptyPageIndexesToSwap.forEach((emptyPageIndex) => {
      // swap upwards to preserve order
      let currentEmptyPageIndex = emptyPageIndex;
      while (currentEmptyPageIndex < highestPopulatedPageIndex) {
        swapPages(currentEmptyPageIndex, currentEmptyPageIndex + 1);
        currentEmptyPageIndex++;
      }
    });
  }, [
    getEmptyPageIndexesFromState,
    getPopulatedPageIndexesFromState,
    swapPages,
  ]);

  useShallowEffect(() => {
    if (pageState === "ready" && hasDragged.current) {
      hasDragged.current = false;
      const updatedLayout = getLayoutFromState();
      resume?.setLayout(updatedLayout);
      cleanUpEmptyPages();
      // also check that there are no blank pages in between
    }
  }, [pageListStates, getLayoutFromState]);

  useShallowEffect(() => {
    if (!sectionKeys || !resume) return;

    resume.getLayout().forEach((pageLayout, index) => {
      const panelListState: ListState[] = pageLayout.panel?.map(
        (sectionKey) => ({
          sectionKey,
        })
      );
      pageListStates[index].handlers.panel.setState(panelListState);

      const bodyListState: ListState[] = pageLayout.body?.map((sectionKey) => ({
        sectionKey,
      }));
      pageListStates[index].handlers.body.setState(bodyListState);
    });

    setVisibleMenuPages(resume.getPageCount());
  }, [sectionKeys]);

  const onDragEnd: OnDragEndResponder = (result, provided) => {
    hasDragged.current = true;
    const { destination, source } = result;
    if (!destination) return;
    const sourcePage = Number(source.droppableId.split("-")[2]);
    const destinationPage = Number(destination?.droppableId.split("-")[2]);
    const sourceLocation = source.droppableId.split("-")[0] as "panel" | "body";
    const destinationLocation = destination?.droppableId.split("-")[0] as
      | "panel"
      | "body";

    move(
      {
        page: sourcePage,
        location: sourceLocation,
        index: source.index,
      },
      {
        page: destinationPage,
        location: destinationLocation,
        index: destination?.index || 0,
      }
    );
  };

  const addPage = useCallback(() => {
    setVisibleMenuPages((prev) => {
      if (prev < MAX_PAGES) {
        return prev + 1;
      }

      return prev;
    });
  }, []);

  const removePage = useCallback(() => {
    setVisibleMenuPages((prev) => {
      if (prev > 1) {
        return prev - 1;
      }

      return prev;
    });
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack>
        <Text size="sm" fw={500}>
          Sections
        </Text>

        {pageListStates.map((pageListState, index) => {
          if (index >= visibleMenuPages) return null;

          const isLastPage = index === visibleMenuPages - 1;

          return (
            <Paper
              w="100%"
              mih={200}
              h="100%"
              withBorder
              px={8}
              py="sm"
              shadow="sm"
            >
              <Stack gap="xs">
                <Flex align="center" justify="space-between">
                  <Box ml="sm">
                    <Text size="xs" fw={600} c="dimmed">
                      PAGE {index + 1}
                    </Text>
                  </Box>

                  {index === 0 && (
                    <Tooltip
                      withArrow
                      label="The scale of the resume will be adjusted according to this page."
                    >
                      <Badge variant="light" size="xs">
                        Dynamic Fit
                      </Badge>
                    </Tooltip>
                  )}
                  {index > 0 && (
                    <Button
                      onClick={removePage}
                      disabled={!isLastPage || !isLastPageEmpty}
                      size="xs"
                    >
                      Hide Page
                    </Button>
                  )}
                </Flex>
                <Divider />
                <SimpleGrid cols={2} spacing="xs">
                  <Box>
                    <SectionList
                      state={pageListState.state.panel}
                      droppableId={`panel-list-${index}`}
                      pageNumber={index + 1}
                    />
                  </Box>
                  <Box>
                    <SectionList
                      state={pageListState.state.body}
                      droppableId={`body-list-${index}`}
                      pageNumber={index + 1}
                    />
                  </Box>
                </SimpleGrid>
              </Stack>
            </Paper>
          );
        })}
        <Button
          onClick={addPage}
          disabled={isLastPageEmpty || visibleMenuPages === MAX_PAGES}
          variant="light"
        >
          Add Page
        </Button>
      </Stack>
    </DragDropContext>
  );
};

import { useListState } from "@mantine/hooks";
import { ListState } from "./types";
import { useCallback } from "react";

export function usePageListState(index: number) {
  const [panelState, panelHandlers] = useListState<ListState | undefined>(
    undefined
  );
  const [bodyState, bodyHandlers] = useListState<ListState | undefined>(
    undefined
  );

  return {
    state: {
      panel: panelState,
      body: bodyState,
    },
    handlers: {
      panel: panelHandlers,
      body: bodyHandlers,
    },
  };
}

export function useMultiplePageListState(pages: number) {
  const pageListStates = Array.from({ length: pages }, (_, i) =>
    usePageListState(i)
  );

  const swapPages = useCallback(
    (pageFrom: number, pageTo: number) => {
      const pageFromPanelState = [...pageListStates[pageFrom].state.panel];
      const pageFromBodyState = [...pageListStates[pageFrom].state.body];
      const pageToPanelState = [...pageListStates[pageTo].state.panel];
      const pageToBodyState = [...pageListStates[pageTo].state.body];

      pageListStates[pageFrom].handlers.panel.setState(pageToPanelState);
      pageListStates[pageFrom].handlers.body.setState(pageToBodyState);
      pageListStates[pageTo].handlers.panel.setState(pageFromPanelState);
      pageListStates[pageTo].handlers.body.setState(pageFromBodyState);
    },
    [pageListStates]
  );

  const move = useCallback(
    (
      source: { page: number; location: "panel" | "body"; index: number },
      destination: { page: number; location: "panel" | "body"; index: number }
    ) => {
      const sourcePageStates = pageListStates[source.page];

      if (source.page === destination.page) {
        // same page
        if (source.location === destination.location) {
          // same location
          sourcePageStates.handlers[source.location].reorder({
            from: source.index,
            to: destination?.index || 0,
          });
          return;
        }

        // different location
        const element = sourcePageStates.state[source.location][source.index];
        sourcePageStates.handlers[source.location].remove(source.index);
        sourcePageStates.handlers[destination.location].insert(
          destination.index,
          element
        );
        return;
      }

      // different page
      const destinationPageStates = pageListStates[destination.page];

      const element = sourcePageStates.state[source.location][source.index];
      sourcePageStates.handlers[source.location].remove(source.index);
      destinationPageStates.handlers[destination.location].insert(
        destination.index,
        element
      );
    },
    [pageListStates]
  );

  return { pageListStates, move, swapPages };
}

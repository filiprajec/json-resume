import { useState, useEffect } from "react";

import { useZoom } from "../context";

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export type MarkerCoordinate = {
  center: {
    x: number;
    y: number;
  };
  topLeft: {
    x: number;
    y: number;
  };
};

export const useMarkerCoordinates = (parentBoxRef, markerRefs) => {
  const [markerCoordinates, setMarkerCoordinates] = useState<
    MarkerCoordinate[] | null
  >([]);
  const [boxHeight, setBoxHeight] = useState(0);
  const { zoom, rendering } = useZoom();
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (!isBrowser || rendering) {
      return;
    }

    if (parentBoxRef.current) {
      const syncBoxHeight = () => {
        if (parentBoxRef.current) {
          setBoxHeight(parentBoxRef.current.clientHeight);
        }
      };
      syncBoxHeight();
      resizeObserver = new ResizeObserver(syncBoxHeight);
      resizeObserver.observe(parentBoxRef.current);
    }

    return () => {
      if (parentBoxRef.current && resizeObserver) {
        resizeObserver.unobserve(parentBoxRef.current);
        resizeObserver.disconnect();
      }
    };
  }, [parentBoxRef, zoom, rendering]);

  // gets the center coordinate of a ref absolute to the browser window
  const getRelativeCoordinatesFromRef = (
    ref,
    relativeToCoordinate
  ): {
    center: { x: number; y: number };
    topLeft: { x: number; y: number };
  } | null => {
    if (ref == null) {
      return null;
    }
    const refBoundingClientRect = ref.getBoundingClientRect();
    const absoluteCenterX =
      refBoundingClientRect.left + refBoundingClientRect.width / 2;
    const absoluteCenterY =
      refBoundingClientRect.top + refBoundingClientRect.height / 2;
    return {
      center: {
        x: absoluteCenterX - relativeToCoordinate.x,
        y: absoluteCenterY - relativeToCoordinate.y,
      },
      topLeft: {
        x: refBoundingClientRect.left - relativeToCoordinate.x,
        y: refBoundingClientRect.top - relativeToCoordinate.y,
      },
    };
  };

  // this hook ensures markers are repositioned on box height changes
  useEffect(() => {
    if (markerRefs.current && parentBoxRef.current) {
      const origin = { x: 0, y: 0 };
      const boxCoordinates = getRelativeCoordinatesFromRef(
        parentBoxRef.current,
        origin
      );

      const markerCoordinatesUpdated: (MarkerCoordinate | null)[] = [];

      markerRefs.current.forEach((eachBoxMarkerRef) => {
        markerCoordinatesUpdated.push(
          getRelativeCoordinatesFromRef(
            eachBoxMarkerRef,
            boxCoordinates?.topLeft
          )
        );
      });

      setMarkerCoordinates(markerCoordinatesUpdated.filter(notEmpty));
    }
  }, [boxHeight, parentBoxRef, zoom]);

  return markerCoordinates;
};

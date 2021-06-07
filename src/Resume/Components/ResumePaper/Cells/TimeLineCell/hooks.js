import { useState, useEffect, useContext } from "react";
import ZoomContext from "../../../../context/ZoomContext";

export const useMarkerCoordinates = (parentBoxRef, markerRefs) => {
  const [markerCoordinates, setMarkerCoordinates] = useState([]);
  const [boxHeight, setBoxHeight] = useState(0);
  const { zoom, rendering } = useContext(ZoomContext);
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    let resizeObserver = null;
    if (!isBrowser) return null;
    if (rendering) return null;
    
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
  const getRelativeCoordinatesFromRef = (ref, relativeToCoordinate) => {
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

      const markerCoordinatesUpdated = [];

      markerRefs.current.forEach((eachBoxMarkerRef) => {
        markerCoordinatesUpdated.push(
          getRelativeCoordinatesFromRef(
            eachBoxMarkerRef,
            boxCoordinates.topLeft
          )
        );
      });

      setMarkerCoordinates(markerCoordinatesUpdated);
    }
  }, [boxHeight, parentBoxRef, zoom]);

  return markerCoordinates;
};

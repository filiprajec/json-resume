/*
  ZoomContext.scss
  <> Filip Rajec
*/

import { createContext, useCallback, useEffect, useState, useRef } from "react";

const startingAccuracy = 0.005;
const minRenderIterations = 100;
const percentageIncreasePerRender = 1.02;

export const useZoomValue = (paperRefs, dependencies) => {
  const [zoom, setZoom] = useState(1);
  const [rendering, setRendering] = useState(false);
  const [marginTop, setMarginTop] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const [stoppingAccuracy, setStoppingAccuracy] = useState(startingAccuracy);
  const ignoreNextRender = useRef(false);
  const isBrowser = typeof window !== "undefined";

  const getZoom = useCallback(() => {
    const paperRefsExist =
      paperRefs?.current?.inner != null && paperRefs?.current?.outer != null;
    if (!paperRefsExist) {
      return;
    }

    if (!isBrowser) return;

    const marginTop_ =
      paperRefs.current.outer.clientHeight -
      paperRefs.current.inner.clientHeight;
    const zoom_ =
      paperRefs.current.outer.clientHeight /
      paperRefs.current.inner.clientHeight;

    // eslint-disable-next-line consistent-return
    return [zoom_, marginTop_];
  }, [paperRefs]);

  const setTopOffset = useCallback(
    (marginTop_) => {
      const { inner } = paperRefs.current;
      inner.style.marginTop = `${marginTop_}px`;
      setMarginTop(marginTop_);
    },
    [paperRefs]
  );

  useEffect(() => {
    if (ignoreNextRender.current === true) {
      ignoreNextRender.current = false;
      return;
    }

    const [zoom_, marginTop_] = getZoom(renderCount);

    if (Math.abs(1 - zoom_) < stoppingAccuracy && renderCount) {
      // stop
      setRendering(false);
      setTopOffset(marginTop_);
      setRenderCount(0);
      setStoppingAccuracy(startingAccuracy);
      ignoreNextRender.current = true;
    } else {
      // keep going
      setRendering(true);
      setRenderCount((prev) => prev + 1);
      if (zoom_ > 1) {
        setZoom((prev) => prev + startingAccuracy);
      } else if (zoom_ < 1) {
        setZoom((prev) => prev - startingAccuracy);
      }
      if (renderCount > minRenderIterations) {
        const accuracyDecreaseFactor =
          percentageIncreasePerRender ** (renderCount - minRenderIterations);
        setStoppingAccuracy((prev) => prev * accuracyDecreaseFactor);
      }
    }
  }, [renderCount, stoppingAccuracy, dependencies]);

  return { zoom, rendering, marginTop };
};

const getInitialContext = () => ({ zoom: 1, rendering: false, marginTop: 0 });

const ZoomContext = createContext(getInitialContext());
export const ZoomProvider = ZoomContext.Provider;
export default ZoomContext;

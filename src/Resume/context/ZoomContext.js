/*
  ZoomContext.scss
  <> Filip Rajec
*/

import { createContext, useCallback, useEffect, useState, useRef } from "react";

const initialAccuracy = 0.005;
const rendersBeforeDecreasingAccuracy = 100;
const accuracyDecreasePerRender = 1.02;

export const useZoomValue = (paperRefs, dependencies) => {
  const [zoom, setZoom] = useState(1);
  const [rendering, setRendering] = useState(false);
  const [deltaHeight, setDeltaHeight] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const [stoppingAccuracy, setStoppingAccuracy] = useState(initialAccuracy);
  const skipRender = useRef(false);
  const isBrowser = typeof window !== "undefined";

  const getZoomAndDeltaHeight = useCallback(() => {
    const paperRefsExist =
      paperRefs?.current?.inner != null && paperRefs?.current?.outer != null;
    if (!paperRefsExist) {
      return;
    }

    const deltaHeight_ =
      paperRefs.current.outer.clientHeight -
      paperRefs.current.inner.clientHeight;
    const zoom_ =
      paperRefs.current.outer.clientHeight /
      paperRefs.current.inner.clientHeight;

    // eslint-disable-next-line consistent-return
    return [zoom_, deltaHeight_];
  }, [paperRefs]);

  const setTopPaperOffset = useCallback(
    (deltaHeight_) => {
      const { inner } = paperRefs.current;
      inner.style.marginTop = `${deltaHeight_ / 2}px`;
    },
    [paperRefs]
  );

  const updateZoomHelper = useCallback((zoom_) => {
    if (zoom_ > 1) {
      setZoom((prev) => prev + initialAccuracy);
    } else if (zoom_ < 1) {
      setZoom((prev) => prev - initialAccuracy);
    }
  }, []);

  const updateStoppingAccuracyHelper = useCallback((renderCount_) => {
    const accuracyDecreaseFactor =
      accuracyDecreasePerRender **
      (renderCount_ - rendersBeforeDecreasingAccuracy);
    setStoppingAccuracy((prev) => prev * accuracyDecreaseFactor);
  }, []);

  useEffect(() => {
    if (skipRender.current === true) {
      skipRender.current = false;
      return;
    }
    if (!isBrowser) return;

    const [zoom_, deltaHeight_] = getZoomAndDeltaHeight(renderCount);
    const stoppingCondition =
      Math.abs(1 - zoom_) < stoppingAccuracy && deltaHeight_ > 0;

    if (stoppingCondition) {
      setRendering(false);
      setTopPaperOffset(deltaHeight_);
      setDeltaHeight(deltaHeight_);
      setRenderCount(0);
      setStoppingAccuracy(initialAccuracy);
      skipRender.current = true;
    } else {
      setRendering(true);
      setRenderCount((prev) => prev + 1);
      updateZoomHelper(zoom_);
      if (renderCount > rendersBeforeDecreasingAccuracy) {
        updateStoppingAccuracyHelper(renderCount);
      }
    }
  }, [renderCount, stoppingAccuracy, dependencies]);

  return { zoom, rendering, deltaHeight };
};

const getInitialContext = () => ({ zoom: 1, rendering: false, deltaHeight: 0 });

const ZoomContext = createContext(getInitialContext());
export const ZoomProvider = ZoomContext.Provider;
export default ZoomContext;

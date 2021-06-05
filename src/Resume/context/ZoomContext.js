/*
  ZoomContext.scss
  <> Filip Rajec
*/

import { createContext, useCallback, useEffect, useState } from "react";

const startingAccuracy = 0.005;

export const useZoomValue = (paperRefs, dependencies) => {
  const [zoom, setZoom] = useState(1);
  const [rendering, setRendering] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  const [accuracy, setAccuracy] = useState(startingAccuracy);
  const [marginTop, setMarginTop] = useState(0);
  const minRenderIterations = 100;
  const isBrowser = typeof window !== "undefined";

  const syncZoom = useCallback(() => {
    const paperRefsExist =
      paperRefs?.current?.inner != null && paperRefs?.current?.outer != null;
    if (!paperRefsExist) {
      return;
    }

    if (!isBrowser) return;

    setRendering(true);

    const heightDiff =
      paperRefs.current.outer.clientHeight -
      paperRefs.current.inner.clientHeight;
    const zoomRatio =
      paperRefs.current.outer.clientHeight /
      paperRefs.current.inner.clientHeight;
    const setTopOffset = () => {
      const { inner } = paperRefs.current;
      const marginTop_ = heightDiff / 2;
      inner.style.marginTop = `${marginTop_}px`;
      setMarginTop(marginTop_);
    };

    const stoppingCondition = Math.abs(1 - zoomRatio) < accuracy;

    if (stoppingCondition && heightDiff >= 0) {
      setTopOffset();
      setRendering(false);
      setRenderCount(0);
      return;
    }

    if (renderCount > minRenderIterations) {
      setAccuracy((prev) => prev * 1.01);
    }

    if (zoomRatio > 1) {
      setZoom((prev) => prev + startingAccuracy);
    } else if (zoomRatio < 1) {
      setZoom((prev) => prev - startingAccuracy);
    }

    setRenderCount((prev) => prev + 1);
  }, [renderCount, paperRefs]);

  useEffect(() => {
    let resizeObserver = null;
    if (!isBrowser) return null;

    if (paperRefs?.current?.inner) {
      resizeObserver = new ResizeObserver(() => syncZoom());
      resizeObserver.observe(paperRefs.current.inner);
    }

    return () => {
      if (paperRefs?.current?.inner) {
        resizeObserver.unobserve(paperRefs.current.inner);
      }
    };
  }, [paperRefs, syncZoom]);

  useEffect(() => {
    const paperRefsExist =
      paperRefs?.current?.inner != null && paperRefs?.current?.outer != null;
    if (!isBrowser) return;
    if (paperRefsExist) {
      syncZoom();
    }
  }, [paperRefs, syncZoom, zoom]);

  // trigger rerender when custom dependencies change
  useEffect(() => {
    const paperRefsExist =
      paperRefs?.current?.inner != null && paperRefs?.current?.outer != null;
    if (!isBrowser) return;
    setAccuracy(startingAccuracy);
    if (!rendering) {
      if (paperRefsExist) {
        syncZoom();
      } else {
        setRendering(false);
      }
    }
  }, [dependencies]);

  return { zoom, rendering, marginTop };
};

const getInitialContext = () => ({ zoom: 1, rendering: false });

const ZoomContext = createContext(getInitialContext());
export const ZoomProvider = ZoomContext.Provider;
export default ZoomContext;

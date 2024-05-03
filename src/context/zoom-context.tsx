import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";
import { ResumePaperRef } from "../components";

const initialAccuracy = 0.005;
const rendersBeforeDecreasingAccuracy = 100;
const accuracyDecreasePerRender = 1.02;

interface InitialContext {
  zoom: number;
  rendering: boolean;
  deltaHeight: number;
}

const initialContext: InitialContext = {
  zoom: 1,
  rendering: false,
  deltaHeight: 0,
};

const ZoomContext = createContext(initialContext);

export const useZoomValue = (
  paperRefs: React.RefObject<ResumePaperRef>,
  dependencies: any[]
) => {
  const [zoom, setZoom] = useState(1);
  const [rendering, setRendering] = useState(false);
  const [deltaHeight, setDeltaHeight] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const [stoppingAccuracy, setStoppingAccuracy] = useState(initialAccuracy);
  const skipRender = useRef(false);
  const isBrowser = typeof window !== "undefined";

  const getZoomAndDeltaHeight = useCallback(() => {
    if (
      !paperRefs.current ||
      !paperRefs.current.inner ||
      !paperRefs.current.outer
    ) {
      return [1, 0];
    }

    const deltaHeight_ =
      paperRefs.current?.outer.clientHeight -
      paperRefs.current?.inner.clientHeight;
    const zoom_ =
      paperRefs.current?.outer.clientHeight /
      paperRefs.current?.inner.clientHeight;
    return [zoom_, deltaHeight_];
  }, [paperRefs]);

  const setTopPaperOffset = useCallback(
    (deltaHeight_) => {
      if (!paperRefs.current || !paperRefs.current.inner) {
        return;
      }

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
    const paperRefsExist =
      paperRefs?.current?.inner != null && paperRefs?.current?.outer != null;
    if (!paperRefsExist) {
      return;
    }

    if (!isBrowser) return;
    const [zoom_, deltaHeight_] = getZoomAndDeltaHeight();

    const stoppingCondition =
      Math.abs(1 - zoom_) < stoppingAccuracy && deltaHeight_ >= 0;

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

interface ZoomProviderProps {
  children: React.ReactNode;
  paperRefs: React.RefObject<ResumePaperRef>;
  dependencies: any[];
}

export const ZoomProvider = ({
  children,
  paperRefs,
  dependencies,
}: ZoomProviderProps) => {
  const zoomValue = useZoomValue(paperRefs, dependencies);

  return (
    <ZoomContext.Provider value={zoomValue}>{children}</ZoomContext.Provider>
  );
};

export const useZoom = () => {
  const context = useContext(ZoomContext);
  if (!context) {
    throw new Error("useZoom must be used within a ZoomProvider");
  }
  return context;
};

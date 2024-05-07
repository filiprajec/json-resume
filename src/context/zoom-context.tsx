import {
  createContext,
  useCallback,
  useState,
  useRef,
  useContext,
} from "react";
import { MantineProvider } from "@mantine/core";

import { paperTheme } from "../theme";
import { usePage } from "./page-context";

const initialAccuracy = 0.01;
const rendersBeforeDecreasingAccuracy = 10;
const accuracyDecreasePerRender = 1.02;

interface InitialContext {
  zoom: number;
  deltaHeight: number;
  applyCustomZoom: (zoom: number) => void;
  applyDynamicZoom: () => void;
  attachOuterRef: (ref: HTMLDivElement | null) => void;
  attachInnerRef: (ref: HTMLDivElement | null) => void;
}

const initialContext: InitialContext = {
  zoom: 1,
  deltaHeight: 0,
  applyCustomZoom: () => {},
  applyDynamicZoom: () => {},
  attachOuterRef: () => {},
  attachInnerRef: () => {},
};

const ZoomContext = createContext(initialContext);

interface ZoomProviderProps {
  children: React.ReactNode;
}

export const ZoomProvider = ({ children }: ZoomProviderProps) => {
  const { onCalculatingLayout } = usePage();
  const [customZoom, setCustomZoom] = useState(1);
  const [deltaHeight, setDeltaHeight] = useState(0);
  const [isDynamicZoom, setIsDynamicZoom] = useState(true);
  const [zoom, setZoom] = useState(1);
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const isBrowser = typeof window !== "undefined";

  const applyCustomZoom = useCallback((zoom: number) => {
    setIsDynamicZoom(false);
    setCustomZoom(zoom);
  }, []);

  const applyDynamicZoom = useCallback(() => {
    setIsDynamicZoom(true);
    setCustomZoom(1);
  }, []);

  const attachOuterRef = useCallback((ref: HTMLDivElement | null) => {
    outerRef.current = ref;
    if (outerRef.current && innerRef.current) {
      onCalculatingLayout("calculating");
      startDynamicZoom();
    }
  }, []);

  const attachInnerRef = useCallback((ref: HTMLDivElement | null) => {
    innerRef.current = ref;
    if (outerRef.current && innerRef.current) {
      onCalculatingLayout("calculating");
      startDynamicZoom();
    }
  }, []);

  const startDynamicZoom = useCallback(
    (renderCount: number = 0, stoppingAccuracy: number = initialAccuracy) => {
      if (
        !isDynamicZoom ||
        !isBrowser ||
        !outerRef.current ||
        !innerRef.current
      ) {
        return;
      }

      const deltaHeight_ =
        outerRef.current.clientHeight - innerRef.current.clientHeight;
      const zoom_ =
        outerRef.current.clientHeight / innerRef.current.clientHeight;
      const stoppingCondition =
        Math.abs(1 - zoom_) < stoppingAccuracy && deltaHeight_ >= 0;

      if (stoppingCondition) {
        onCalculatingLayout("ready");
        setDeltaHeight(deltaHeight_);
        innerRef.current.style.marginTop = `${deltaHeight_ / 2}px`;
        return;
      }

      if (zoom_ > 1) {
        setZoom((prev) => prev + initialAccuracy);
      } else if (zoom_ < 1) {
        setZoom((prev) => prev - initialAccuracy);
      }
      let newStoppingAccuracy = stoppingAccuracy;
      if (renderCount > rendersBeforeDecreasingAccuracy) {
        const accuracyDecreaseFactor =
          accuracyDecreasePerRender **
          (renderCount - rendersBeforeDecreasingAccuracy);
        newStoppingAccuracy = newStoppingAccuracy * accuracyDecreaseFactor;
      }

      setTimeout(() => {
        startDynamicZoom(renderCount + 1, newStoppingAccuracy);
      }, 1);
    },
    []
  );

  return (
    <MantineProvider
      theme={paperTheme(zoom)}
      getRootElement={() => document.getElementById("theme-root") ?? undefined}
      cssVariablesSelector="#theme-root"
    >
      <div id="theme-root">
        <ZoomContext.Provider
          value={{
            zoom: isDynamicZoom ? zoom : customZoom,
            deltaHeight,
            applyCustomZoom,
            applyDynamicZoom,
            attachOuterRef,
            attachInnerRef,
          }}
        >
          {children}
        </ZoomContext.Provider>
      </div>
    </MantineProvider>
  );
};

export const useZoom = () => {
  const context = useContext(ZoomContext);
  if (!context) {
    throw new Error("useZoom must be used within a ZoomProvider");
  }
  return context;
};

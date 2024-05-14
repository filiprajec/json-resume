import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
  useRef,
} from "react";

import { ResumePage } from "./resume-page";
import {
  BreakableDistributor,
  BreakableItem,
  BreakableOptions,
} from "./breakable-distributor";
import { AccuracyLevel, Scaler } from "./scaler";
import { logger } from "@/lib/logger";
import { useResume } from "../resume-context";

export type PageState =
  | "ready"
  | "fetching"
  | "rendering"
  | "error"
  | "initial";

interface InitialContext {
  attachContentRef: (ref: HTMLDivElement | null) => void;
  attachResumeRef: (ref: HTMLDivElement | null) => void;
  marginX: number;
  marginY: number;
  pageState: PageState;
  registerBreakable: (
    ref: HTMLDivElement | null,
    options: BreakableOptions,
    location: "body" | "panel"
  ) => void;
  runScaler: () => void;
  scale: number;
  updateMarginX: (newMarginX: number) => void;
  updateMarginY: (newMarginY: number) => void;
  updatePageState: (state: PageState, location?: string) => void;
  accuracyLevel: AccuracyLevel;
  updateAccuracyLevel: (level: AccuracyLevel) => void;
}

const initialContext: InitialContext = {
  attachContentRef: () => {
    logger.warn("No content ref attached");
  },
  attachResumeRef: () => {
    logger.warn("No resume ref attached");
  },
  marginX: 32,
  marginY: 42,
  pageState: "initial",
  registerBreakable: () => {
    logger.warn("No breakable ref attached");
  },
  runScaler: () => {
    logger.warn("No scaler attached");
  },
  scale: 1,
  updateMarginX: () => {},
  updateMarginY: () => {},
  updatePageState: () => {},
  accuracyLevel: "low",
  updateAccuracyLevel: () => {},
};

const PageContext = createContext<InitialContext>(initialContext);

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [accuracyLevel, setAccuracyLevel] = useState<AccuracyLevel>("low");
  const [marginX, setMarginX] = useState<number>(32);
  const [marginY, setMarginY] = useState<number>(42);
  const [pageState, setPageState] = useState<PageState>("initial");
  const [scale, setScale] = useState<number>(1);
  const { resumeConfig, addOnConfigChangeEvent } = useResume();
  const breakableBodyDistributor = useRef<BreakableDistributor | null>(null);
  const breakablePanelDistributor = useRef<BreakableDistributor | null>(null);
  const breakablesBody = useRef<BreakableItem[]>([]);
  const breakablesPanel = useRef<BreakableItem[]>([]);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isInitialised = useRef<boolean>(false);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const resumePage = useRef<ResumePage | null>(null);
  const scaler = useRef<Scaler | null>(null);

  const initialise = useCallback(() => {
    if (isInitialised.current) {
      return;
    }

    isInitialised.current = true;
    resumePage.current = new ResumePage(resumeConfig.pageCount, marginY);
    resumePage.current.addMarkers(pageRef);
    breakableBodyDistributor.current = new BreakableDistributor(
      resumePage.current
    );
    breakablePanelDistributor.current = new BreakableDistributor(
      resumePage.current
    );

    breakableBodyDistributor.current.setBreakables(breakablesBody.current);
    breakablePanelDistributor.current.setBreakables(breakablesPanel.current);

    scaler.current = new Scaler(
      resumePage.current,
      [breakableBodyDistributor.current, breakablePanelDistributor.current],
      {
        onStart: () => {
          updatePageState("rendering", "scaler onStart");
        },
        onChange: (scale: number) => {
          setScale(scale);
        },
        onEnd: (scale) => {
          setScale(scale);
          updatePageState("ready", "scaler onEnd");
        },
      }
    );

    scaler.current.calculate(pageRef, contentRef, resumeConfig.pageCount);

    addOnConfigChangeEvent((config) => {
      logger.debug("config change event", config);
      resumePage.current?.setNumberOfPages(config.pageCount);
      scaler.current?.calculate(pageRef, contentRef, config.pageCount);
    });

    new ResizeObserver(() => {
      logger.debug("resize event");
      scaler.current?.calculate(pageRef, contentRef, resumeConfig.pageCount);
      resumePage.current?.addMarkers(pageRef);
    }).observe(pageRef.current!);
  }, [resumeConfig]);

  const updatePageState = useCallback((state: PageState, location?: string) => {
    logger.debug("updating page state", state, location);
    setPageState(state);
  }, []);

  const updateMarginY = useCallback(
    (newMarginY: number) => {
      setMarginY(newMarginY);
      resumePage.current?.setMarginY(newMarginY);
      scaler.current?.calculate(pageRef, contentRef, resumeConfig.pageCount);
    },
    [resumeConfig]
  );

  const updateMarginX = useCallback(
    (newMarginX: number) => {
      setMarginX(newMarginX);
      scaler.current?.calculate(pageRef, contentRef, resumeConfig.pageCount);
    },
    [resumeConfig]
  );

  const registerBreakable = useCallback(
    (
      ref: HTMLDivElement | null,
      options: BreakableOptions,
      location: "body" | "panel"
    ) => {
      if (!ref) {
        return;
      }

      if (location === "panel") {
        breakablesPanel.current.push({ ref, options });
      } else {
        breakablesBody.current.push({ ref, options });
      }
    },
    []
  );

  const attachResumeRef = useCallback((ref: HTMLDivElement | null) => {
    pageRef.current = ref;
    if (pageRef.current && pageRef.current) {
      initialise();
    }
  }, []);

  const attachContentRef = useCallback((ref: HTMLDivElement | null) => {
    contentRef.current = ref;
    if (pageRef.current && contentRef.current) {
      initialise();
    }
  }, []);

  const runScaler = useCallback(() => {
    if (!scaler.current) {
      logger.warn("No scaler attached");
      return;
    }
    scaler.current?.calculate(pageRef, contentRef, resumeConfig.pageCount);
  }, [resumeConfig]);

  const updateAccuracyLevel = useCallback((level: AccuracyLevel) => {
    setAccuracyLevel(level);
    if (scaler.current) {
      scaler.current.accuracyLevel = level;
      scaler.current.calculate(pageRef, contentRef, resumeConfig.pageCount);
    }
  }, []);

  const value = useMemo(
    () => ({
      attachContentRef,
      attachResumeRef,
      marginX,
      marginY,
      pageState,
      registerBreakable,
      runScaler,
      scale,
      updateMarginX,
      updateMarginY,
      updatePageState,
      accuracyLevel,
      updateAccuracyLevel,
    }),
    [
      attachContentRef,
      attachResumeRef,
      marginX,
      marginY,
      pageState,
      registerBreakable,
      runScaler,
      scale,
      updateMarginX,
      updateMarginY,
      updatePageState,
      accuracyLevel,
      updateAccuracyLevel,
    ]
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};

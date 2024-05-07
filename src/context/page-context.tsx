import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
} from "react";

export type PageState =
  | "ready"
  | "fetching"
  | "rendering"
  | "error"
  | "initial";

interface InitialContext {
  pageState: PageState;
  onLoadingJson: (state: "fetching" | "error" | "success") => void;
  onCalculatingLayout: (state: "calculating" | "ready" | "error") => void;
}

const initialContext: InitialContext = {
  pageState: "initial",
  onLoadingJson: () => {},
  onCalculatingLayout: () => {},
};

const PageContext = createContext<InitialContext>(initialContext);

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [pageState, setPageState] = useState<PageState>("initial");

  const updatePageState = useCallback((state: PageState) => {
    setPageState(state);
  }, []);

  const onLoadingJson = useCallback(
    (state: "fetching" | "error" | "success") => {
      if (state === "fetching") {
        updatePageState("fetching");
      } else if (state === "error") {
        updatePageState("error");
      } else {
        updatePageState("rendering");
      }
    },
    [updatePageState]
  );

  const onCalculatingLayout = useCallback(
    (state: "calculating" | "ready" | "error") => {
      if (state === "calculating") {
        updatePageState("rendering");
      } else if (state === "error") {
        updatePageState("error");
      } else {
        updatePageState("ready");
      }
    },
    [updatePageState]
  );

  const value = useMemo(
    () => ({
      pageState,
      onLoadingJson,
      onCalculatingLayout,
    }),
    [pageState, onLoadingJson, onCalculatingLayout]
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

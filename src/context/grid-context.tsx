import { createContext, RefObject, useContext } from "react";

type GridContextType = {
  outlineColor: string;
  outlineWidth: number;
  gridRef: RefObject<HTMLDivElement> | null;
};

export const GridContext = createContext<GridContextType>({
  outlineColor: "rgb(0, 0, 0)",
  outlineWidth: 1,
  gridRef: null,
});

export const GridProvider = GridContext.Provider;

export const useGrid = () => {
  const context = useContext(GridContext);
  if (context === undefined) {
    throw new Error("useGrid must be used within a GridProvider");
  }
  return context;
};

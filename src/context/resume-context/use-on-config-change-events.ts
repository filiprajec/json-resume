import { useState, useCallback } from "react";
import { ResumeConfig } from "./config";

export type OnConfigChangeEvent = (config: ResumeConfig) => void;

export function useOnConfigChangeEvents() {
  const [onConfigChangeEvents, setOnConfigChangeEvents] = useState<
    OnConfigChangeEvent[]
  >([]);

  const addOnConfigChangeEvent = useCallback((event: OnConfigChangeEvent) => {
    setOnConfigChangeEvents((prev) => [...prev, event]);
  }, []);

  const removeOnConfigChangeEvent = useCallback(
    (event: OnConfigChangeEvent) => {
      setOnConfigChangeEvents((prev) => prev.filter((item) => item !== event));
    },
    []
  );

  const removeAllOnConfigChangeEvents = useCallback(() => {
    setOnConfigChangeEvents([]);
  }, []);

  return {
    onConfigChangeEvents,
    addOnConfigChangeEvent,
    removeOnConfigChangeEvent,
    removeAllOnConfigChangeEvents,
  };
}

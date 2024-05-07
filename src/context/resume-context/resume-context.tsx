import { createContext, useContext, useMemo } from "react";

import { ResumeClass } from "../../resume";
import { useFetchJson } from "./use-resume-json";
import { useResumeClass } from "./use-resume-class";

interface InitialContext {
  resume: ResumeClass | undefined;
  resumeId: string | undefined;
  fetchJson: (url: string) => void;
  error: string | undefined;
  save: () => void;
}

const initialContext: InitialContext = {
  resume: undefined,
  resumeId: undefined,
  fetchJson: () => {},
  error: undefined,
  save: () => {},
};

const ResumeContext = createContext<InitialContext>(initialContext);

export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const { resume, resumeId, save } = useResumeClass();
  const { fetch: fetchJson, error } = useFetchJson(resume);

  const value = useMemo(
    () => ({
      resume,
      resumeId,
      error,
      fetchJson,
      save,
    }),
    [resume, resumeId, error, fetchJson, save]
  );

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};

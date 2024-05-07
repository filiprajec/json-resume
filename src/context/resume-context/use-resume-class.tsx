import { useCallback, useRef, useState } from "react";
import { useLocalStorage, useShallowEffect } from "@mantine/hooks";

import { Resume, ResumeClass, ResumeConfig } from "../../resume";
import { ResumeJsonSectionKey } from "../../resume-schema-types";

export type ResumeSections = Partial<Record<ResumeJsonSectionKey, ResumeClass>>;

/**
 * Custom hook that processes the provided JSON data and returns the resume sections.
 *
 * @param json - The JSON data representing the resume.
 * @returns The resume sections or null if the JSON data is undefined.
 */
export const useResumeClass = (): {
  resume: ResumeClass;
  resumeId: string | undefined;
  save: () => void;
} => {
  const [resumeConfig, setResumeConfig] = useLocalStorage<
    ResumeConfig | undefined
  >({
    key: "mantine-resume-json-config",
    defaultValue: undefined,
  });
  const [resumeId, setResumeId] = useState<string | undefined>(undefined);

  const save = useCallback(() => {
    const config = resume.current.getConfig();
    if (config) {
      setResumeConfig(config);
    }
  }, [setResumeConfig]);

  const onResumeChange = (id: string) => {
    setResumeId(id);
    save();
  };

  const resume = useRef(
    new Resume({
      rerenderCallback: onResumeChange,
    })
  );

  useShallowEffect(() => {
    if (resumeConfig) {
      resume.current.setConfig(resumeConfig);
    }
  }, [resumeConfig]);

  return { resume: resume.current, resumeId, save };
};

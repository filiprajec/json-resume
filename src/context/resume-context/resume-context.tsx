import { createContext, useContext, useEffect, useMemo } from "react";
import { useCallback, useState } from "react";
import { useLocalStorage, useShallowEffect } from "@mantine/hooks";
import { v4 as uuidv4 } from "uuid";

import { ResumeJsonSchema } from "@/lib/resume-schema-types";
import { jsonSectionKeys, sectionKeys } from "./keys";
import { sectionPropertyMapper } from "./section-property-mapper";
import { ResumeData, ResumeDataSectionKey } from "./types";
import { configInitial, ResumeConfig, ResumeSectionConfig } from "./config";
import { useOnConfigChangeEvents } from "./use-on-config-change-events";

function validateConfig(config: ResumeConfig | undefined): ResumeConfig {
  if (!config) {
    return configInitial;
  }

  let newConfig = { ...config };
  if (newConfig.pageCount < 1) {
    newConfig.pageCount = 1;
  }

  return newConfig;
}

function parseJson(
  json: Partial<ResumeJsonSchema>,
  onSuccess: (data: ResumeData) => void
) {
  let data = {} as ResumeData;

  if (!json) {
    throw new Error("JSON data is undefined.");
  }

  jsonSectionKeys.forEach((key) => {
    let dataForKey = json[key];

    if (dataForKey) {
      data[key] = (!Array.isArray(dataForKey) ? [dataForKey] : dataForKey).map(
        (d) => ({ ...d, id: uuidv4() })
      );
    } else {
      data[key] = [];
    }
  });

  onSuccess(data);
}

interface InitialContext {
  resumeConfig: ResumeConfig;
  updateResumeConfig: (config: Partial<ResumeConfig>) => void;
  updateResumeSectionConfig: (
    section: ResumeDataSectionKey,
    config: Partial<ResumeSectionConfig>
  ) => void;
  save: () => void;
  getSection: (
    sectionKey: ResumeDataSectionKey
  ) => ResumeData[keyof ResumeData];
  getSectionProperties: (
    sectionKey: ResumeDataSectionKey
  ) => ReturnType<typeof sectionPropertyMapper>;
  sectionHasContent: (sectionKey: ResumeDataSectionKey) => boolean;
  getSectionKeysWithContent: () => ResumeDataSectionKey[];
  isResumeEmpty: () => boolean;
  updateJson: (json: ResumeJsonSchema) => void;
  resetConfig: () => void;
  onConfigChangeEvents: Array<(config: ResumeConfig) => void>;
  addOnConfigChangeEvent: (callback: (config: ResumeConfig) => void) => void;
  removeOnConfigChangeEvent: (callback: (config: ResumeConfig) => void) => void;
  removeAllOnConfigChangeEvents: () => void;
}

const initialContext: InitialContext = {
  resumeConfig: configInitial,
  updateResumeConfig: () => {},
  updateResumeSectionConfig: () => {},
  save: () => {},
  getSection: () => [],
  getSectionProperties: () => [],
  sectionHasContent: () => false,
  getSectionKeysWithContent: () => [],
  isResumeEmpty: () => true,
  updateJson: () => {},
  resetConfig: () => {},
  onConfigChangeEvents: [],
  addOnConfigChangeEvent: () => {},
  removeOnConfigChangeEvent: () => {},
  removeAllOnConfigChangeEvents: () => {},
};

const ResumeContext = createContext<InitialContext>(initialContext);

export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<ResumeData>({} as ResumeData);
  const [resumeConfig, setResumeConfig] = useLocalStorage<ResumeConfig>({
    key: "mantine-resume-json-config-v1",
    defaultValue: configInitial,
  });
  const {
    onConfigChangeEvents,
    addOnConfigChangeEvent,
    removeOnConfigChangeEvent,
    removeAllOnConfigChangeEvents,
  } = useOnConfigChangeEvents();

  const updateJson = useCallback(
    (json: ResumeJsonSchema) => {
      parseJson(json, setData);
      updateResumeConfig({
        json,
      });
    },
    [setData]
  );

  useEffect(() => {
    if (resumeConfig.json) {
      parseJson(resumeConfig.json, setData);
    }
  }, [resumeConfig.json]);

  const getSection = useCallback(
    (sectionKey: ResumeDataSectionKey) => {
      return data[sectionKey] ?? [];
    },
    [data]
  );

  const getSectionProperties = useCallback(
    (sectionKey: ResumeDataSectionKey) => {
      return sectionPropertyMapper(data, sectionKey);
    },
    [getSection, data]
  );

  const sectionHasContent = useCallback(
    (sectionKey: ResumeDataSectionKey) => {
      return data[sectionKey]?.length > 0;
    },
    [data]
  );

  const getSectionKeysWithContent = useCallback(() => {
    return sectionKeys.filter((key) => sectionHasContent(key));
  }, [sectionHasContent]);

  const isResumeEmpty = useCallback(() => {
    const sectionKeysWithContent = getSectionKeysWithContent();
    return sectionKeysWithContent?.length === 0;
  }, [getSectionKeysWithContent]);

  const updateResumeConfig = useCallback(
    (config: Partial<ResumeConfig>) => {
      setResumeConfig((prev) => {
        if (!prev) {
          return config as ResumeConfig;
        }

        return {
          ...prev,
          ...config,
        };
      });
    },
    [setResumeConfig]
  );

  const updateResumeSectionConfig = useCallback(
    (section: ResumeDataSectionKey, config: Partial<ResumeSectionConfig>) => {
      setResumeConfig((prev) => {
        return {
          ...prev,
          sectionConfig: {
            ...prev.sectionConfig,
            [section]: {
              ...prev.sectionConfig[section],
              ...config,
            },
          },
        };
      });
    },
    [setResumeConfig]
  );

  const save = useCallback(() => {}, []);

  const resetConfig = useCallback(() => {
    setResumeConfig(configInitial);
  }, [setResumeConfig]);

  useShallowEffect(() => {
    onConfigChangeEvents.forEach((event) => event(resumeConfig));
  }, [resumeConfig]);

  const value = useMemo(
    () => ({
      resumeConfig,
      save,
      updateResumeConfig,
      updateResumeSectionConfig,
      getSection,
      getSectionProperties,
      sectionHasContent,
      getSectionKeysWithContent,
      isResumeEmpty,
      updateJson,
      resetConfig,
      onConfigChangeEvents,
      addOnConfigChangeEvent,
      removeOnConfigChangeEvent,
      removeAllOnConfigChangeEvents,
    }),
    [
      resumeConfig,
      save,
      updateResumeConfig,
      updateResumeSectionConfig,
      getSection,
      getSectionProperties,
      sectionHasContent,
      getSectionKeysWithContent,
      isResumeEmpty,
      updateJson,
      resetConfig,
      onConfigChangeEvents,
      addOnConfigChangeEvent,
      removeOnConfigChangeEvent,
      removeAllOnConfigChangeEvents,
    ]
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

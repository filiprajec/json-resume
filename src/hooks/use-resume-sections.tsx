import { useState, useEffect } from "react";

import { ResumeSection } from "../components";
import {
  ResumeSchema,
  ResumeSectionName,
  ResumeSectionInstance,
} from "../types";

export type ResumeSections = Partial<
  Record<ResumeSectionName, ResumeSectionInstance>
>;

export const useResumeSections = (
  json: ResumeSchema
): ResumeSections | null => {
  const [sections, setSections] = useState<ResumeSections | null>(null);

  useEffect(() => {
    if (json) {
      const processResumeJson = (): Promise<ResumeSections> =>
        new Promise((res) => {
          const sections_: ResumeSections = {};
          Object.keys(json).forEach((sectionName) => {
            try {
              sections_[sectionName] = new ResumeSection(
                json[sectionName],
                sectionName as ResumeSectionName
              );
            } catch (err) {
              delete sections_[sectionName];
            }
          });
          res(sections_);
        });

      (async () => {
        const sections_: ResumeSections = await processResumeJson();
        setSections(sections_);
      })();
    }
  }, [json]);

  return sections;
};

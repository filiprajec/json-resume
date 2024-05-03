import { useState, useEffect } from "react";

import { headingsDefault } from "../components";
import { RatingBarData, ResumeSectionName } from "../types";
import { ResumeSections } from "./use-resume-sections";

export type ResumeSettings = {
  headings: Partial<Record<ResumeSectionName, string>>;
  ratingBarData: Partial<Record<ResumeSectionName, RatingBarData>>;
};

export const useResumeSettings = (resumeSections: ResumeSections | null) => {
  const [settings, setSettings] = useState<ResumeSettings>({
    headings: {},
    ratingBarData: {},
  });

  const initialiseRatingBarData = (
    sections_: ResumeSections,
    headings_: Record<ResumeSectionName, string>
  ): Promise<Record<string, RatingBarData>> =>
    new Promise((res: (value: Record<string, RatingBarData>) => void, rej) => {
      if (sections_ == null) {
        rej(
          new Error(
            "resumeSections is null or undefined in initialiseRatingBarData routine."
          )
        );
      }
      const ratingBarData_: Record<string, RatingBarData> = {};
      Object.keys(sections_).forEach((sectionType) => {
        const section = sections_[sectionType as ResumeSectionName];
        const { subheadings, ratings } = section ?? {};
        const IDs = sections_[sectionType as ResumeSectionName]?.dataIDs;

        if (!ratings || !IDs) {
          return undefined;
        }

        for (let i = 0; i < ratings.length; i++) {
          if (ratings[i] != null && ratings[i] !== "") {
            ratingBarData_[IDs[i]] = {
              name: "",
              value: 4,
            };
            ratingBarData_[IDs[i]].name = `${headings_[sectionType]}${
              subheadings?.[i] != null && subheadings[i] !== ""
                ? `/${subheadings[i]}`
                : ""
            } - ${ratings[i]}`;
            ratingBarData_[IDs[i]].value = 4;
          }
        }
      });

      res(ratingBarData_);
    });

  useEffect(() => {
    if (resumeSections == null) {
      return;
    }

    (async () => {
      const headings = headingsDefault;
      const ratingBarData = await initialiseRatingBarData(
        resumeSections,
        headings
      );
      setSettings({ headings, ratingBarData });
    })();
  }, [resumeSections]);

  return { settings, setSettings };
};

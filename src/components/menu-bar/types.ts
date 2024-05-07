import { ResumeDataSectionKey } from "../../resume";

export type SectionFormValues = {
  sections: Partial<
    Record<
      ResumeDataSectionKey,
      {
        heading: string;
        sectionKey: ResumeDataSectionKey;
      }
    >
  >;
};

export type ListState = {
  sectionKey: ResumeDataSectionKey;
};

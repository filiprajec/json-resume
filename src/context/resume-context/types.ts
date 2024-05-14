import { IconProps, Icon } from "@tabler/icons-react";

import {
  ResumeSchemaBasics,
  ResumeSchemaWork,
  ResumeSchemaVolunteer,
  ResumeSchemaEducation,
  ResumeSchemaSkills,
  ResumeSchemaInterests,
  ResumeSchemaProjects,
  ResumeSchemaAwards,
  ResumeSchemaPublications,
  ResumeSchemaReferences,
  ResumeSchemaLanguages,
} from "@/lib/resume-schema-types";

export type TablerIcon = React.ForwardRefExoticComponent<
  Omit<IconProps, "ref"> & React.RefAttributes<Icon>
>;

export type ResumeDataBasics = Partial<ResumeSchemaBasics> & {
  id: string;
  key: "basics";
};

export type ResumeDataWork = Partial<ResumeSchemaWork> & {
  id: string;
  key: "work";
};
export type ResumeDataVolunteer = Partial<ResumeSchemaVolunteer> & {
  id: string;
  key: "volunteer";
};
export type ResumeDataEducation = Partial<ResumeSchemaEducation> & {
  id: string;
  key: "education";
};
export type ResumeDataSkills = Partial<ResumeSchemaSkills> & {
  id: string;
  key: "skills";
};
export type ResumeDataInterests = Partial<ResumeSchemaInterests> & {
  id: string;
  key: "interests";
};
export type ResumeDataProjects = Partial<ResumeSchemaProjects> & {
  id: string;
  key: "projects";
};
export type ResumeDataAwards = Partial<ResumeSchemaAwards> & {
  id: string;
  key: "awards";
};
export type ResumeDataPublications = Partial<ResumeSchemaPublications> & {
  id: string;
  key: "publications";
};
export type ResumeDataReferences = Partial<ResumeSchemaReferences> & {
  id: string;
  key: "references";
};

export type ResumeDataLanguages = Partial<ResumeSchemaLanguages> & {
  id: string;
  key: "languages";
};

export type ResumeData = {
  awards: ResumeDataAwards[];
  basics: ResumeDataBasics[];
  education: ResumeDataEducation[];
  interests: ResumeDataInterests[];
  languages: ResumeDataLanguages[];
  projects: ResumeDataProjects[];
  publications: ResumeDataPublications[];
  references: ResumeDataReferences[];
  skills: ResumeDataSkills[];
  volunteer: ResumeDataVolunteer[];
  work: ResumeDataWork[];
};

export type ResumeDataSectionKey = keyof ResumeData;

export type RenderCondition = "start" | "middle" | "end";

export type ResumeRenderEvent = {
  id: string;
  event: (id: string) => void;
  options: {
    dispatchAfter?: boolean;
    conditions: RenderCondition[];
  };
};

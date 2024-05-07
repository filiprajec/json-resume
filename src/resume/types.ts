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
  ResumeJsonSchema,
} from "../resume-schema-types";
import { ResumeConfig, ResumePageLayout, ResumeSectionConfig } from "./config";
import { ColorSchemes } from "./color-schemes";
import { SectionProperty } from "./section-mapper";

export type TablerIcon = React.ForwardRefExoticComponent<
  Omit<IconProps, "ref"> & React.RefAttributes<Icon>
>;

export type ResumeDataBasics = ResumeSchemaBasics & {
  id: number;
  key: "basics";
};

export type ResumeDataWork = ResumeSchemaWork & { id: number; key: "work" };
export type ResumeDataVolunteer = ResumeSchemaVolunteer & {
  id: number;
  key: "volunteer";
};
export type ResumeDataEducation = ResumeSchemaEducation & {
  id: number;
  key: "education";
};
export type ResumeDataSkills = ResumeSchemaSkills & {
  id: number;
  key: "skills";
};
export type ResumeDataInterests = ResumeSchemaInterests & {
  id: number;
  key: "interests";
};
export type ResumeDataProjects = ResumeSchemaProjects & {
  id: number;
  key: "projects";
};
export type ResumeDataAwards = ResumeSchemaAwards & {
  id: number;
  key: "awards";
};
export type ResumeDataPublications = ResumeSchemaPublications & {
  id: number;
  key: "publications";
};
export type ResumeDataReferences = ResumeSchemaReferences & {
  id: number;
  key: "references";
};

export type ResumeDataLanguages = ResumeSchemaLanguages & {
  id: number;
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

export interface ResumeClass {
  get renderId(): string;
  getLayout(): ResumePageLayout[];
  getPageLayout(pageIndex: number): ResumePageLayout;
  getConfig(): ResumeConfig;
  setConfig(config: ResumeConfig): void;
  resetConfig(): void;
  setLayout(layout: ResumePageLayout[]): void;
  getPageCount(): number;
  rerender(): void;
  parseJson(json: ResumeJsonSchema): void;
  getJson(): Partial<ResumeJsonSchema>;
  updateJson(json: ResumeJsonSchema): void;
  isEmpty(): boolean;
  getSections(): ResumeData;
  getBasicsSection(): ResumeDataBasics;
  getSectionsWithContent(): Partial<ResumeData>;
  getSectionKeysWithContent(): ResumeDataSectionKey[];
  getSection(
    sectionKey: ResumeDataSectionKey
  ): ResumeData[ResumeDataSectionKey];
  getSectionConfig(sectionKey: ResumeDataSectionKey): ResumeSectionConfig;
  setSectionConfig(
    sectionKey: ResumeDataSectionKey,
    config: Partial<ResumeSectionConfig>
  ): void;
  getSectionLength(sectionKey: ResumeDataSectionKey): number;
  sectionHasContent(sectionKey: ResumeDataSectionKey): boolean;
  typeSwitchGetter<T>(
    sectionKey: ResumeDataSectionKey,
    switches: {
      [K in keyof ResumeData]: (data: NonNullable<ResumeData[K]>) => T;
    }
  ): T;
  getIcon(sectionKey: ResumeDataSectionKey): TablerIcon | undefined;
  getSectionProperties(sectionKey: ResumeDataSectionKey): SectionProperty[];
  updateColorScheme(colorSchemeKey: string): void;
  getColorScheme(): ResumeConfig["colorScheme"];
  getColorSchemeKey(): ResumeConfig["colorSchemeKey"];
  getColorSchemes(): ColorSchemes;
}

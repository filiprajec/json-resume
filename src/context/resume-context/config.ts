import { ResumeJsonSchema } from "@/resume-schema-types";
import { ColorScheme, ColorSchemeKey, colorSchemes } from "./color-schemes";
import { ResumeDataSectionKey } from "./types";

export type ResumeSectionConfig = {
  heading: string | undefined;
  visible: boolean;
  showIcon: boolean;
  withTimeline: boolean;
};

export type ResumePageLayout = {
  panel: ResumeDataSectionKey[];
  body: ResumeDataSectionKey[];
};

export type ResumeConfig = {
  json: Partial<ResumeJsonSchema>;
  layout: ResumePageLayout;
  sectionConfig: Record<ResumeDataSectionKey, ResumeSectionConfig>;
  colorScheme: ColorScheme;
  colorSchemeKey: ColorSchemeKey;
  pageCount: number;
};

export const layoutDefault: ResumePageLayout = {
  panel: ["basics", "skills", "interests"],
  body: [
    "work",
    "volunteer",
    "education",
    "awards",
    "projects",
    "publications",
    "languages",
    "references",
  ],
};

export const colorSchemeDefault: ColorSchemeKey = "grayAndViolet";

export const configInitial: ResumeConfig = {
  json: {
    $schema:
      "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  },
  sectionConfig: {
    basics: {
      heading: undefined,
      visible: true,
      showIcon: false,
      withTimeline: false,
    },
    work: {
      heading: "Experience",
      visible: true,
      showIcon: false,
      withTimeline: true,
    },
    volunteer: {
      heading: "Involvement",
      visible: true,
      showIcon: false,
      withTimeline: false,
    },
    education: {
      heading: "Education",
      visible: true,
      showIcon: false,
      withTimeline: false,
    },
    awards: {
      heading: "Awards",
      visible: true,
      showIcon: false,
      withTimeline: false,
    },
    publications: {
      heading: "Publications",
      visible: true,
      showIcon: false,
      withTimeline: false,
    },
    skills: {
      heading: "Skills",
      visible: true,
      showIcon: false,
      withTimeline: false,
    },
    languages: {
      heading: "Languages",
      visible: true,
      showIcon: false,
      withTimeline: false,
    },
    interests: {
      heading: "Interests",
      visible: true,
      showIcon: false,
      withTimeline: false,
    },
    references: {
      heading: "References",
      visible: true,
      showIcon: false,
      withTimeline: false,
    },
    projects: {
      heading: "Projects",
      visible: true,
      showIcon: false,
      withTimeline: false,
    },
  },
  layout: layoutDefault,
  colorScheme: colorSchemes[colorSchemeDefault],
  colorSchemeKey: colorSchemeDefault,
  pageCount: 1,
};

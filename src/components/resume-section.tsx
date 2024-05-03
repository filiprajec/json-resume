import {
  AcademicCapIcon,
  CheckBadgeIcon,
  BookOpenIcon,
  ChatBubbleLeftIcon,
  FaceSmileIcon,
  HeartIcon,
  BoltIcon,
  StarIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";

import { v4 as uuidv4 } from "uuid";
import {
  ResumeSchemaAwards,
  ResumeSchemaEducation,
  ResumeSchemaInterests,
  ResumeSchemaLanguages,
  ResumeSchemaProjects,
  ResumeSchemaPublications,
  ResumeSchemaReferences,
  ResumeSchemaSection,
  ResumeSchemaSkills,
  ResumeSchemaVolunteer,
  ResumeSchemaWork,
  ResumeSectionInstance,
  ResumeSectionName,
} from "../types";
import { IconBuildingEstate } from "@tabler/icons-react";

export const headingsDefault: Record<ResumeSectionName, string> = {
  work: "Experience",
  volunteer: "Involvement",
  education: "Education",
  awards: "Awards",
  publications: "Publications",
  skills: "Skills",
  languages: "Languages",
  interests: "Interests",
  references: "References",
  projects: "Projects",
};

export class ResumeSection implements ResumeSectionInstance {
  ID_: string;
  data_: ResumeSchemaSection;
  dataIDs_: string[];
  type_: ResumeSectionName;

  constructor(data: ResumeSchemaSection, type: ResumeSectionName) {
    this.dataIDs_ = [];
    this.data_ = data;
    this.data = data;
    this.type_ = type;
    this.type = type;
    this.ID_ = uuidv4();
  }

  get ID(): string {
    return this.ID_;
  }

  // eslint-disable-next-line class-methods-use-this
  get allowedTypes(): ResumeSectionName[] {
    return [
      "work",
      "volunteer",
      "education",
      "awards",
      "publications",
      "skills",
      "languages",
      "interests",
      "references",
      "projects",
    ];
  }

  set data(data: ResumeSchemaSection) {
    this.data_ = data;
    const dataIDs: string[] = [];
    for (let i = 0; i < data.length; i++) {
      dataIDs.push(uuidv4());
    }
    this.dataIDs_ = dataIDs;
  }

  get data(): ResumeSchemaSection {
    return this.data_;
  }

  get dataIDs(): string[] {
    return this.dataIDs_;
  }

  set type(type: ResumeSectionName) {
    if (!this.allowedTypes.includes(type)) {
      throw new Error("Unknown/incompatible type assigned to Resume object.");
    }
    this.type_ = type;
  }

  get type(): ResumeSectionName {
    return this.type_;
  }

  typeSwitchGetter<T>(switches: Record<ResumeSectionName, () => T>): T {
    if (!(this.type_ in switches)) {
      throw new Error("Tried to access method that has not been set for type.");
    }
    return switches[this.type_]();
  }

  get length(): number {
    return this.data.length;
  }

  hasContent(): boolean {
    return this.length > 0;
  }

  get icon(): JSX.Element {
    return this.typeSwitchGetter({
      work: () => <IconBuildingEstate />,
      volunteer: () => <HeartIcon />,
      education: () => <AcademicCapIcon />,
      awards: () => <StarIcon />,
      publications: () => <BookOpenIcon />,
      skills: () => <CommandLineIcon />,
      languages: () => <ChatBubbleLeftIcon />,
      interests: () => <FaceSmileIcon />,
      references: () => <CheckBadgeIcon />,
      projects: () => <BoltIcon />,
    });
  }

  get subheadings(): string[] {
    const dividerSecondary = " • ";
    return this.typeSwitchGetter<string[]>({
      work: () =>
        this.data.map(
          // @ts-ignore
          (eachData: ResumeSchemaWork) =>
            `${eachData.position} at ${eachData.name}${
              eachData.location ? ` - ${eachData.location}` : ""
            }`
        ),
      volunteer: () =>
        // @ts-ignore
        this.data.map((eachData: ResumeSchemaVolunteer) =>
          [eachData.organization, eachData.position].join(" - ")
        ),
      education: () =>
        this.data.map(
          // @ts-ignore
          (eachData: ResumeSchemaEducation) =>
            `${[eachData.studyType, eachData.area, eachData.institution].join(
              dividerSecondary
            )} ${eachData.score ?? `(${eachData.score})`}`
        ),
      awards: () =>
        // @ts-ignore
        this.data.map((eachData: ResumeSchemaAwards) =>
          [eachData.title, eachData.awarder].join(dividerSecondary)
        ),
      publications: () =>
        // @ts-ignore
        this.data.map((eachData: ResumeSchemaPublications) =>
          [eachData.name, eachData.publisher].join(dividerSecondary)
        ),
      skills: () =>
        this.data.map((eachData) => (eachData as ResumeSchemaSkills).name),
      languages: () =>
        this.data.map(
          (eachData) => (eachData as ResumeSchemaLanguages).language
        ),
      interests: () =>
        this.data.map((eachData) => (eachData as ResumeSchemaInterests).name),
      references: () =>
        this.data.map((eachData) => (eachData as ResumeSchemaReferences).name),
      projects: () =>
        this.data.map(
          // @ts-ignore
          (eachData: ResumeSchemaProjects) =>
            `${[eachData.name, eachData.roles.join(", ")].join(", ")}${
              eachData.entity ? ` •  ${eachData.entity}` : ""
            }
              ${eachData.type ? ` •  ${eachData.type}` : ""}
            `
        ),
    });
  }

  get descriptions(): string[] {
    return this.typeSwitchGetter<string[]>({
      work: () =>
        this.data.map((eachData) => (eachData as ResumeSchemaWork).summary),
      volunteer: () =>
        this.data.map(
          (eachData) => (eachData as ResumeSchemaVolunteer).summary
        ),
      education: () => [],
      awards: () =>
        this.data.map((eachData) => (eachData as ResumeSchemaAwards).summary),
      publications: () =>
        this.data.map(
          (eachData) => (eachData as ResumeSchemaPublications).summary
        ),
      skills: () => [],
      languages: () => [],
      interests: () => [],
      references: () =>
        this.data.map(
          (eachData) => (eachData as ResumeSchemaReferences).reference
        ),
      projects: () =>
        this.data.map(
          (eachData) => (eachData as ResumeSchemaProjects).description
        ),
    });
  }

  get dates(): string[] {
    const processDate = (date: string) => {
      const dateObj = new Date(date);
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(dateObj.getTime())) {
        return ""; // check date validity
      }
      const month = dateObj.toLocaleString("default", { month: "short" });
      const year = dateObj.getFullYear();
      return `${month} ${year}`;
    };

    const processStartEndDates = (eachData: {
      startDate: string;
      endDate: string;
    }) =>
      `${
        processDate(eachData.startDate) &&
        `${processDate(eachData.startDate)} - `
      }${processDate(eachData.endDate)}`;

    return this.typeSwitchGetter<string[]>({
      work: () =>
        this.data.map((eachData) =>
          processStartEndDates(eachData as ResumeSchemaWork)
        ),
      volunteer: () =>
        this.data.map((eachData) =>
          processStartEndDates(eachData as ResumeSchemaVolunteer)
        ),
      education: () =>
        this.data.map((eachData) =>
          processStartEndDates(eachData as ResumeSchemaEducation)
        ),
      awards: () =>
        this.data.map((eachData) =>
          processDate((eachData as ResumeSchemaAwards).date)
        ),
      publications: () =>
        this.data.map((eachData) =>
          processDate((eachData as ResumeSchemaPublications).releaseDate)
        ),
      skills: () => [],
      languages: () => [],
      interests: () => [],
      references: () => [],
      projects: () =>
        this.data.map((eachData) =>
          processStartEndDates(eachData as ResumeSchemaProjects)
        ),
    });
  }

  get tags(): string[][] {
    return this.typeSwitchGetter<string[][]>({
      work: () => [],
      volunteer: () => [],
      education: () => [],
      awards: () => [],
      publications: () => [],
      skills: () =>
        this.data.map((eachData) => (eachData as ResumeSchemaSkills).keywords),
      languages: () => [],
      interests: () =>
        this.data.map(
          (eachData) => (eachData as ResumeSchemaInterests).keywords
        ),
      references: () => [],
      projects: () =>
        this.data.map(
          (eachData) => (eachData as ResumeSchemaProjects).keywords
        ),
    });
  }

  get lists(): (string[] | undefined)[] {
    return this.typeSwitchGetter<(string[] | undefined)[]>({
      work: () =>
        this.data.map((eachData) => (eachData as ResumeSchemaWork).highlights),
      volunteer: () =>
        this.data.map(
          (eachData) => (eachData as ResumeSchemaVolunteer).highlights
        ),
      education: () =>
        this.data.map(
          (eachData) => (eachData as ResumeSchemaEducation).courses
        ),
      awards: () => [],
      publications: () => [],
      skills: () => [],
      languages: () => [],
      interests: () => [],
      references: () => [],
      projects: () =>
        this.data.map(
          (eachData) => (eachData as ResumeSchemaProjects).highlights
        ),
    });
  }

  get ratings(): (string | undefined)[] {
    return this.typeSwitchGetter<(string | undefined)[]>({
      work: () => [],
      volunteer: () => [],
      education: () => [],
      awards: () => [],
      publications: () => [],
      skills: () =>
        this.data.map((eachData) => (eachData as ResumeSchemaSkills).level),
      languages: () =>
        this.data.map(
          (eachData) => (eachData as ResumeSchemaLanguages).fluency
        ),
      interests: () => [],
      references: () => [],
      projects: () =>
        this.data.map((eachData) => (eachData as ResumeSchemaProjects).level),
    });
  }
}

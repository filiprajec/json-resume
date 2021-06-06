import React from "react";
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ChatAlt2Icon,
  EmojiHappyIcon,
  HeartIcon,
  LightningBoltIcon,
  StarIcon,
  TerminalIcon,
} from "@heroicons/react/outline";
import { v4 as uuidv4 } from "uuid";

class ResumeSection {
  constructor(data, type) {
    this.data = data;
    this.type = type;
    this.ID_ = uuidv4();
  }

  get ID() {
    return this.ID_;
  }

  // eslint-disable-next-line class-methods-use-this
  get allowedTypes() {
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

  set data(data) {
    this.data_ = data;
    const dataIDs = [];
    for (let i = 0; i < data.length; i++) {
      dataIDs.push(uuidv4());
    }
    this.dataIDs_ = dataIDs;
  }

  get data() {
    return this.data_;
  }

  get dataIDs() {
    return this.dataIDs_;
  }

  set type(type) {
    const typeLowerCase = type.toLowerCase();
    if (!this.allowedTypes.includes(typeLowerCase)) {
      throw new Error("Unknown/incompatible type assigned to Resume object.");
    }
    this.type_ = type.toLowerCase();
  }

  get type() {
    return this.type_;
  }

  typeSwitchGetter(switches) {
    if (!(this.type_ in switches)) {
      throw new Error("Tried to access method that has not been set for type.");
    }
    return switches[this.type_]();
  }

  get length() {
    return this.data.length;
  }

  hasContent() {
    return this.length > 0;
  }

  get icon() {
    return this.typeSwitchGetter({
      work: () => <BriefcaseIcon />,
      volunteer: () => <HeartIcon />,
      education: () => <AcademicCapIcon />,
      awards: () => <StarIcon />,
      publications: () => <BookOpenIcon />,
      skills: () => <TerminalIcon />,
      languages: () => <ChatAlt2Icon />,
      interests: () => <EmojiHappyIcon />,
      references: () => <BadgeCheckIcon />,
      projects: () => <LightningBoltIcon />,
    });
  }

  get subheadings() {
    const dividerSecondary = " • ";
    return this.typeSwitchGetter({
      work: () =>
        this.data.map(
          (eachData) =>
            `${eachData.position} at ${eachData.name}${
              eachData.location && ` - ${eachData.location}`
            }`
        ),
      volunteer: () =>
        this.data.map((eachData) =>
          [eachData.organization, eachData.position].join(" - ")
        ),
      education: () =>
        this.data.map(
          (eachData) =>
            `${[eachData.studyType, eachData.area, eachData.institution].join(
              dividerSecondary
            )} ${eachData.score ?? `(${eachData.score})`}`
        ),
      awards: () =>
        this.data.map((eachData) =>
          [eachData.title, eachData.awarder].join(dividerSecondary)
        ),
      publications: () =>
        this.data.map((eachData) =>
          [eachData.name, eachData.publisher].join(dividerSecondary)
        ),
      skills: () => this.data.map((eachData) => eachData.name),
      languages: () => this.data.map((eachData) => eachData.language),
      interests: () => this.data.map((eachData) => eachData.name),
      references: () => this.data.map((eachData) => eachData.name),
      projects: () =>
        this.data.map(
          (eachData) =>
            `${[eachData.name, eachData.roles.join(", ")].join(", ")}${
              eachData.entity ? ` •  ${eachData.entity}` : ""
            }
              ${eachData.type ? ` •  ${eachData.type}` : ""}
            `
        ),
    });
  }

  get descriptions() {
    return this.typeSwitchGetter({
      work: () => this.data.map((eachData) => eachData.summary),
      volunteer: () => this.data.map((eachData) => eachData.summary),
      education: () => [],
      awards: () => this.data.map((eachData) => eachData.summary),
      publications: () => this.data.map((eachData) => eachData.summary),
      skills: () => [],
      languages: () => [],
      interests: () => [],
      references: () => this.data.map((eachData) => eachData.reference),
      projects: () => this.data.map((eachData) => eachData.description),
    });
  }

  get dates() {
    const processDate = (date) => {
      const dateObj = new Date(date);
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(dateObj.getTime())) {
        return ""; // check date validity
      }
      const month = dateObj.toLocaleString("default", { month: "short" });
      const year = dateObj.getFullYear();
      return `${month} ${year}`;
    };

    const processStartEndDates = (eachData) =>
      `${
        processDate(eachData.startDate) &&
        `${processDate(eachData.startDate)} - `
      }${processDate(eachData.endDate)}`;

    return this.typeSwitchGetter({
      work: () => this.data.map((eachData) => processStartEndDates(eachData)),
      volunteer: () =>
        this.data.map((eachData) => processStartEndDates(eachData)),
      education: () =>
        this.data.map((eachData) => processStartEndDates(eachData)),
      awards: () => this.data.map((eachData) => processDate(eachData.date)),
      publications: () =>
        this.data.map((eachData) => processDate(eachData.releaseDate)),
      skills: () => [],
      languages: () => [],
      interests: () => [],
      references: () => [],
      projects: () =>
        this.data.map((eachData) => processStartEndDates(eachData)),
    });
  }

  get tags() {
    return this.typeSwitchGetter({
      work: () => [],
      volunteer: () => [],
      education: () => [],
      awards: () => [],
      publications: () => [],
      skills: () => this.data.map((eachData) => eachData.keywords),
      languages: () => [],
      interests: () => this.data.map((eachData) => eachData.keywords),
      references: () => [],
      projects: () => this.data.map((eachData) => eachData.keywords),
    });
  }

  get lists() {
    return this.typeSwitchGetter({
      work: () => this.data.map((eachData) => eachData.highlights),
      volunteer: () => this.data.map((eachData) => eachData.highlights),
      education: () => this.data.map((eachData) => eachData.courses),
      awards: () => [],
      publications: () => [],
      skills: () => [],
      languages: () => [],
      interests: () => [],
      references: () => [],
      projects: () => this.data.map((eachData) => eachData.highlights),
    });
  }

  get ratings() {
    return this.typeSwitchGetter({
      work: () => [],
      volunteer: () => [],
      education: () => [],
      awards: () => [],
      publications: () => [],
      skills: () => this.data.map((eachData) => eachData.level),
      languages: () => this.data.map((eachData) => eachData.fluency),
      interests: () => [],
      references: () => [],
      projects: () => this.data.map((eachData) => eachData.level),
    });
  }
}

export default ResumeSection;

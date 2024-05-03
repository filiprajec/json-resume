export type RatingBarData = {
  name: string;
  value: string | number;
};

export type ResumeSchemaSection =
  | ResumeSchemaWork[]
  | ResumeSchemaVolunteer[]
  | ResumeSchemaEducation[]
  | ResumeSchemaSkills[]
  | ResumeSchemaInterests[]
  | ResumeSchemaProjects[]
  | ResumeSchemaAwards[]
  | ResumeSchemaPublications[]
  | ResumeSchemaReferences[]
  | ResumeSchemaLanguages[];

export type ResumeSchema = {
  basics: ResumeSchemaBasics;
  work: ResumeSchemaWork[];
  volunteer: ResumeSchemaVolunteer[];
  education: ResumeSchemaEducation[];
  skills: ResumeSchemaSkills[];
  interests: ResumeSchemaInterests[];
  projects?: ResumeSchemaProjects[];
  awards?: ResumeSchemaAwards[];
  publications?: ResumeSchemaPublications[];
  references?: ResumeSchemaReferences[];
  languages?: ResumeSchemaLanguages[];
};

export type ResumeSectionName =
  | "work"
  | "volunteer"
  | "education"
  | "awards"
  | "publications"
  | "skills"
  | "languages"
  | "interests"
  | "references"
  | "projects";

export interface ResumeSectionInstance {
  get ID(): string;
  get allowedTypes(): ResumeSectionName[];
  set data(data: ResumeSchemaSection);
  get data(): ResumeSchemaSection;
  get dataIDs(): string[];
  set type(type: ResumeSectionName);
  get type(): ResumeSectionName;
  typeSwitchGetter<T>(switches: Record<ResumeSectionName, () => T>): T;
  get length(): number;
  hasContent(): boolean;
  get icon(): JSX.Element;
  get subheadings(): string[];
  get descriptions(): string[];
  get dates(): string[];
  get tags(): string[][];
  get lists(): (string[] | undefined)[];
  get ratings(): (string | undefined)[];
}

export type ResumeSchemaBasics = {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  location: {
    city: string;
  };
  profiles: {
    network: string;
    username: string;
  }[];
};

export type ResumeSchemaWork = {
  name: string;
  position: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights?: string[];
  location?: string;
};

export type ResumeSchemaVolunteer = {
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights?: string[];
};

export type ResumeSchemaEducation = {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
};

export type ResumeSchemaSkills = {
  name: string;
  keywords: string[];
  level?: string;
};

export type ResumeSchemaInterests = {
  name: string;
  keywords: string[];
};

export type ResumeSchemaProjects = {
  name: string;
  description: string;
  keywords: string[];
  startDate: string;
  endDate: string;
  roles: string[];
  type: string;
  entity: string;
  highlights?: string[];
  level: string;
};

export type ResumeSchemaAwards = {
  date: string;
  summary: string;
  title: string;
  awarder: string;
};

export type ResumeSchemaPublications = {
  releaseDate: string;
  summary: string;
  name: string;
  publisher: string;
};

export type ResumeSchemaReferences = {
  name: string;
  reference: string;
};

export type ResumeSchemaLanguages = {
  language: string;
  fluency: string;
};

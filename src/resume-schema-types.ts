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
  url: string;
  summary: string;
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

export type ResumeJsonSchema = {
  $schema: string;
  awards?: ResumeSchemaAwards[];
  basics: ResumeSchemaBasics;
  education: ResumeSchemaEducation[];
  interests: ResumeSchemaInterests[];
  languages?: ResumeSchemaLanguages[];
  projects?: ResumeSchemaProjects[];
  publications?: ResumeSchemaPublications[];
  references?: ResumeSchemaReferences[];
  skills: ResumeSchemaSkills[];
  volunteer: ResumeSchemaVolunteer[];
  work: ResumeSchemaWork[];
};

export type ResumeJsonSectionKey = keyof ResumeJsonSchema;

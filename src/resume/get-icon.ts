import {
  IconBuildingEstate,
  IconHeart,
  IconSchool,
  IconStar,
  IconBook,
  IconCode,
  IconSpeakerphone,
  IconMoodSmile,
  IconBadge,
  IconBolt,
} from "@tabler/icons-react";

import { ResumeClass, ResumeDataSectionKey, TablerIcon } from "./types";

export function getIcon(
  this: ResumeClass,
  sectionKey: ResumeDataSectionKey
): TablerIcon | undefined {
  return this.typeSwitchGetter<TablerIcon | undefined>(sectionKey, {
    basics: () => undefined,
    work: () => IconBuildingEstate,
    volunteer: () => IconHeart,
    education: () => IconSchool,
    awards: () => IconStar,
    publications: () => IconBook,
    skills: () => IconCode,
    languages: () => IconSpeakerphone,
    interests: () => IconMoodSmile,
    references: () => IconBadge,
    projects: () => IconBolt,
  });
}

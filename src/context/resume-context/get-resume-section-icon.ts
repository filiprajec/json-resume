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

import { ResumeDataSectionKey, TablerIcon } from "./types";

export function getResumeSectionIcon(
  sectionKey: ResumeDataSectionKey
): TablerIcon | undefined {
  return {
    basics: undefined,
    work: IconBuildingEstate,
    volunteer: IconHeart,
    education: IconSchool,
    awards: IconStar,
    publications: IconBook,
    skills: IconCode,
    languages: IconSpeakerphone,
    interests: IconMoodSmile,
    references: IconBadge,
    projects: IconBolt,
  }[sectionKey];
}

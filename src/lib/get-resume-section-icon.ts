import {
  IconSchool,
  IconStar,
  IconBook,
  IconCode,
  IconSpeakerphone,
  IconMoodSmile,
  IconBadge,
  IconBolt,
  IconBriefcase,
  IconHeartHandshake,
} from "@tabler/icons-react";

import {
  ResumeDataSectionKey,
  TablerIcon,
} from "../context/resume-context/types";

export function getResumeSectionIcon(
  sectionKey: ResumeDataSectionKey
): TablerIcon | undefined {
  return {
    basics: undefined,
    work: IconBriefcase,
    volunteer: IconHeartHandshake,
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

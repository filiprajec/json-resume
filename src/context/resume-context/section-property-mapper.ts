import { getStartEndDateStart, getDateString } from "@/lib/utils";
import { ResumeDataSectionKey, ResumeDataWork, ResumeData } from "./types";
import { typeSwitchGetter } from "./type-switch-getter";

export type SectionProperty = {
  id: string;
  heading: string | undefined;
  rating: string | undefined;
  date: string | undefined;
  description: string | undefined;
  list: string[] | undefined;
  tags: string[] | undefined;
};

const workMapper = (items: ResumeDataWork[]): SectionProperty[] => {
  return items.map((item) => {
    const heading = [
      `${item.position} at ${item.name}`,
      item.location ? ` - ${item.location}` : undefined,
    ]
      .filter(Boolean)
      .join(" ");

    return {
      id: item.id,
      heading,
      rating: item.location,
      date: getStartEndDateStart({
        startDate: item.startDate,
        endDate: item.endDate,
      }),
      description: item.summary,
      list: item.highlights,
      tags: undefined,
    };
  });
};

export function sectionPropertyMapper(
  data: ResumeData,
  sectionKey: ResumeDataSectionKey
): SectionProperty[] {
  return typeSwitchGetter<SectionProperty[]>(data, sectionKey, {
    basics: (items) => {
      return items.map((item) => {
        return {
          id: item.id,
          heading: undefined,
          rating: undefined,
          date: undefined,
          description: undefined,
          list: undefined,
          tags: undefined,
        };
      });
    },
    work: workMapper,
    volunteer: (items) => {
      return items.map((item) => {
        return {
          id: item.id,
          heading: [item.organization, item.position].join(" - "),
          rating: item.position,
          date: getStartEndDateStart({
            startDate: item.startDate,
            endDate: item.endDate,
          }),
          description: item.summary,
          list: item.highlights,
          tags: undefined,
        };
      });
    },
    education: (items) => {
      return items.map((item) => {
        const heading = [
          item.studyType,
          item.area,
          [item.institution, item.score ? `(${item.score})` : undefined]
            .filter(Boolean)
            .join(" "),
        ]
          .filter(Boolean)
          .join(" • ");

        return {
          id: item.id,
          heading,
          rating: item.score,
          date: getStartEndDateStart({
            startDate: item.startDate,
            endDate: item.endDate,
          }),
          description: "",
          list: item.courses,
          tags: undefined,
        };
      });
    },
    awards: (items) => {
      return items.map((item) => {
        return {
          id: item.id,
          heading: [item.title, item.awarder].join(" • "),
          rating: "",
          date: getDateString(item.date),
          description: item.summary,
          list: undefined,
          tags: undefined,
        };
      });
    },
    publications: (items) => {
      return items.map((item) => {
        return {
          id: item.id,
          heading: [item.name, item.publisher].join(" • "),
          rating: "",
          date: getDateString(item.releaseDate),
          description: item.summary,
          list: undefined,
          tags: undefined,
        };
      });
    },
    skills: (items) => {
      return items.map((item) => {
        return {
          id: item.id,
          heading: item.name,
          rating: item.level,
          date: undefined,
          description: undefined,
          list: undefined,
          tags: item.keywords,
        };
      });
    },
    languages: (items) => {
      return items.map((item) => {
        return {
          id: item.id,
          heading: item.language,
          rating: item.fluency,
          date: undefined,
          description: undefined,
          list: undefined,
          tags: undefined,
        };
      });
    },
    interests: (items) => {
      return items.map((item) => {
        return {
          id: item.id,
          heading: item.name,
          rating: undefined,
          date: undefined,
          description: undefined,
          list: undefined,
          tags: item.keywords,
        };
      });
    },
    references: (items) => {
      return items.map((item) => {
        return {
          id: item.id,
          heading: item.name,
          rating: undefined,
          date: undefined,
          description: item.reference,
          list: undefined,
          tags: undefined,
        };
      });
    },
    projects: (items) => {
      return items.map((item) => {
        const nameAndRoles = [item.name, item.roles?.join(", ")].join(", ");
        const heading = [nameAndRoles, item.entity, item.type]
          .filter(Boolean)
          .join(" • ");

        return {
          id: item.id,
          heading,
          rating: item.level,
          date: getStartEndDateStart({
            startDate: item.startDate,
            endDate: item.endDate,
          }),
          description: item.description,
          list: item.highlights,
          tags: item.keywords,
        };
      });
    },
  });
}

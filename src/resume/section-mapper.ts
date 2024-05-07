import { getStartEndDate, parseDate } from "./utils";
import { ResumeClass, ResumeDataSectionKey, ResumeDataWork } from "./types";

export type SectionProperty = {
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
      heading,
      rating: item.location,
      date: getStartEndDate(item),
      description: item.summary,
      list: item.highlights,
      tags: undefined,
    };
  });
};

export function sectionMapper(
  this: ResumeClass,
  sectionKey: ResumeDataSectionKey
): SectionProperty[] {
  return this.typeSwitchGetter<SectionProperty[]>(sectionKey, {
    basics: (items) => {
      return items.map(() => {
        return {
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
          heading: [item.organization, item.position].join(" - "),
          rating: item.position,
          date: getStartEndDate(item),
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
          heading,
          rating: item.score,
          date: getStartEndDate(item),
          description: "",
          list: item.courses,
          tags: undefined,
        };
      });
    },
    awards: (items) => {
      return items.map((item) => {
        return {
          heading: [item.title, item.awarder].join(" • "),
          rating: "",
          date: parseDate(item.date),
          description: item.summary,
          list: undefined,
          tags: undefined,
        };
      });
    },
    publications: (items) => {
      return items.map((item) => {
        return {
          heading: [item.name, item.publisher].join(" • "),
          rating: "",
          date: parseDate(item.releaseDate),
          description: item.summary,
          list: undefined,
          tags: undefined,
        };
      });
    },
    skills: (items) => {
      return items.map((item) => {
        return {
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
        const nameAndRoles = [item.name, item.roles.join(", ")].join(", ");
        const heading = [nameAndRoles, item.entity, item.type]
          .filter(Boolean)
          .join(" • ");

        return {
          heading,
          rating: item.level,
          date: getStartEndDate(item),
          description: item.description,
          list: item.highlights,
          tags: item.keywords,
        };
      });
    },
  });
}

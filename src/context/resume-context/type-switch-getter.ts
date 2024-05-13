import { ResumeDataSectionKey, ResumeData } from "./types";

export function typeSwitchGetter<T>(
  data: ResumeData,
  sectionKey: ResumeDataSectionKey,
  switches: {
    [K in keyof ResumeData]: (data: NonNullable<ResumeData[K]>) => T;
  }
): T {
  const sectionData: ResumeData[keyof ResumeData] = data[sectionKey];
  if (sectionData === undefined) {
    return [] as T;
  }

  // @ts-ignore
  const res = switches[sectionKey]?.(sectionData);

  if (res === undefined) {
    throw new Error("Method not implemented for section.");
  }

  return res;
}

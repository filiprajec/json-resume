import { ResumeClass, ResumeDataSectionKey, ResumeData } from "./types";

export function typeSwitchGetter<T>(
  this: ResumeClass,
  sectionKey: ResumeDataSectionKey,
  switches: {
    [K in keyof ResumeData]: (data: NonNullable<ResumeData[K]>) => T;
  }
): T {
  const sectionData: ResumeData[keyof ResumeData] = this.getSection(sectionKey);
  // @ts-ignore
  const res = switches[sectionKey]?.(sectionData);

  if (res === undefined) {
    throw new Error("Method not implemented for section.");
  }

  return res;
}

import { v4 as uuidv4 } from "uuid";
import { ResumeJsonSchema } from "../resume-schema-types";
import type {
  ResumeClass,
  ResumeData,
  ResumeDataBasics,
  ResumeDataSectionKey,
} from "./types";
import { getIcon } from "./get-icon";
import { sectionMapper } from "./section-mapper";
import { typeSwitchGetter } from "./type-switch-getter";
import {
  configInitial,
  ResumeConfig,
  ResumePageLayout,
  ResumeSectionConfig,
} from "./config";
import { jsonSectionKeys, sectionKeys } from "./keys";
import { ColorSchemeKey, ColorSchemes, colorSchemes } from "./color-schemes";

export class Resume implements ResumeClass {
  private renderId_: string;
  private data_: ResumeData;
  private rerenderCallback_: (id: string) => void;
  private config_: ResumeConfig;

  constructor(options: {
    rerenderCallback?: (id: string) => void;
    config?: ResumeConfig;
  }) {
    this.renderId_ = uuidv4();
    this.data_ = {} as ResumeData;
    this.rerenderCallback_ = options.rerenderCallback || (() => {});
    this.config_ = options.config ?? configInitial;
    this.parseJson();
  }

  get renderId(): string {
    return this.renderId_;
  }

  /**
   * Updates the ID of the resume component and triggers a rerender.
   */
  rerender() {
    this.renderId_ = uuidv4();
    this.rerenderCallback_(this.renderId_);
  }

  parseJson() {
    let data = {} as ResumeData;
    const json = this.config_.json;

    if (!json) {
      throw new Error("JSON data is undefined.");
    }

    jsonSectionKeys.forEach((key) => {
      let dataForKey = json[key];

      if (dataForKey) {
        data[key] = (
          !Array.isArray(dataForKey) ? [dataForKey] : dataForKey
        ).map((d) => ({ ...d, id: uuidv4() }));
      } else {
        data[key] = [];
      }
    });

    this.data_ = data;
  }

  isEmpty(): boolean {
    const sectionKeysWithContent = this.getSectionKeysWithContent();
    return sectionKeysWithContent.length === 0;
  }

  getLayout(): ResumePageLayout[] {
    return this.config_.layout;
  }

  setLayout(layout: ResumePageLayout[]) {
    this.config_.layout = layout;
    this.rerender();
  }

  getPageLayout(pageIndex: number): ResumePageLayout {
    return this.config_.layout[pageIndex];
  }

  getPageCount(): number {
    return this.config_.layout.length;
  }

  getJson(): Partial<ResumeJsonSchema> {
    return this.config_.json;
  }

  updateJson(json: ResumeJsonSchema) {
    this.config_.json = json;
    this.parseJson();
    this.rerender();
  }

  getSection(
    sectionKey: ResumeDataSectionKey
  ): ResumeData[ResumeDataSectionKey] {
    return this.data_[sectionKey];
  }

  getBasicsSection(): ResumeDataBasics {
    return this.data_.basics[0];
  }

  getSections(): ResumeData {
    return this.data_;
  }

  getSectionsWithContent(): Partial<ResumeData> {
    return Object.fromEntries(
      Object.entries(this.data_).filter(([key, value]) => value.length > 0)
    );
  }

  getSectionKeysWithContent(): ResumeDataSectionKey[] {
    return sectionKeys.filter((key) => this.sectionHasContent(key));
  }

  getSectionConfig(sectionKey: ResumeDataSectionKey): ResumeSectionConfig {
    return this.config_.sectionConfig[sectionKey];
  }

  setSectionConfig(
    sectionKey: ResumeDataSectionKey,
    settings: Partial<ResumeSectionConfig>
  ) {
    this.config_.sectionConfig[sectionKey] = {
      ...this.config_.sectionConfig[sectionKey],
      ...settings,
    };
    this.rerender();
  }

  getSectionLength(sectionKey: ResumeDataSectionKey): number {
    return this.data_[sectionKey].length;
  }

  sectionHasContent(sectionKey: ResumeDataSectionKey): boolean {
    return this.getSectionLength(sectionKey) > 0;
  }

  getConfig(): ResumeConfig {
    return this.config_;
  }

  setConfig(config: ResumeConfig) {
    this.config_ = config;
    this.parseJson();
    this.rerender();
  }

  resetConfig(): void {
    this.config_ = configInitial;
    this.parseJson();
    this.rerender();
  }

  updateColorScheme(colorSchemeKey: ColorSchemeKey) {
    this.config_.colorSchemeKey = colorSchemeKey;
    this.config_.colorScheme = colorSchemes[colorSchemeKey];
    this.rerender();
  }

  getColorSchemeKey(): ColorSchemeKey {
    return this.config_.colorSchemeKey;
  }

  getColorScheme() {
    return this.config_.colorScheme;
  }

  getColorSchemes(): ColorSchemes {
    return colorSchemes;
  }
  getSectionProperties = sectionMapper;
  typeSwitchGetter = typeSwitchGetter;
  getIcon = getIcon;
}

import "./styles/styles.module.scss";
import "./styles/fonts/Karrik/import.scss";

import React, { useRef, useMemo } from "react";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { createGlobalStyle } from "styled-components";

import {
  useZoomValue,
  ZoomProvider,
  useThemeValue,
  ThemeProvider,
} from "./context";
import {
  useResumeJson,
  useResumeSections,
  useJsonUrl,
  useResumeSettings,
} from "./hooks";
import { ResumePaper, Menu } from "./components";
import { styles } from "./styles";

const GlobalPrintStyle = createGlobalStyle`
  @media print {
    @page { 
      margin: 0; 
    }
    html,
    body {
      margin: 0;
      box-shadow: none;
      width: 21cm;
      height: 29.5cm;
      overflow: hidden;
      background: ${(props: any) => props.background};
    }
    * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    color-adjust: exact !important; 
    }
  }
`;

export const Resume = () => {
  const { url: jsonUrl, setUrl: setJsonUrl } = useJsonUrl();
  const { json, loading, error } = useResumeJson(jsonUrl);
  const sections = useResumeSections(json);
  const { settings, setSettings } = useResumeSettings(sections);
  const resumePaperRefs = useRef<HTMLDivElement>(null);
  const resumePaperRefsPage2 = useRef<HTMLDivElement>(null);
  const themeValue = useThemeValue();
  const zoomValue = useZoomValue(
    resumePaperRefs,
    useMemo(
      () => [sections, settings.headings, settings.ratingBarData],
      [sections, settings.headings, settings.ratingBarData]
    )
  );
  const isLoading = !sections || loading || zoomValue.rendering;

  return (
    <ThemeProvider value={themeValue}>
      <GlobalPrintStyle background={styles.colors.basic.paper} />
      <Menu
        resumeJsonUrl={jsonUrl}
        setResumeJsonUrl={setJsonUrl}
        resumeSections={sections}
        settings={settings}
        setSettings={setSettings}
        errorMessage={error}
        isLoading={isLoading}
      />
      <ZoomProvider value={zoomValue}>
        <ResumePaper
          resumeSections={{
            work: sections?.work,
            skills: sections?.skills,
            projects: sections?.projects,
            awards: sections?.awards,
            publications: sections?.publications,
            languages: sections?.languages,
            references: sections?.references,
          }}
          resumeJson={json}
          headings={settings.headings}
          ratingBarData={settings.ratingBarData}
          errorMessage={error}
          isLoading={isLoading}
          ref={resumePaperRefs}
        />
      </ZoomProvider>
      <ZoomProvider value={zoomValue}>
        <ResumePaper
          resumeSections={{
            education: sections?.education,
            volunteer: sections?.volunteer,
            interests: sections?.interests,
          }}
          resumeJson={{ ...json, basics: undefined }}
          headings={settings.headings}
          ratingBarData={settings.ratingBarData}
          errorMessage={error}
          isLoading={isLoading}
          ref={resumePaperRefsPage2}
        />
      </ZoomProvider>
    </ThemeProvider>
  );
};

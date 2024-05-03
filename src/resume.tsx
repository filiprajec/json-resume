import "./styles/styles.module.css";
import "./styles/fonts/Karrik/import.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "open-color/open-color.css";

import { useRef, useMemo } from "react";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { createGlobalStyle } from "styled-components";

import { useZoomValue, ZoomProvider, useTheme } from "./context";
import {
  useResumeJson,
  useResumeSections,
  useJsonUrl,
  useResumeSettings,
} from "./hooks";
import { ResumePaper, Menu, ResumePaperRef } from "./components";

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
  const theme = useTheme();
  const { url: jsonUrl, setUrl: setJsonUrl } = useJsonUrl();
  const { json, loading, error } = useResumeJson(jsonUrl);
  const sections = useResumeSections(json);
  const { settings, setSettings } = useResumeSettings(sections);
  const resumePaperRefs = useRef<ResumePaperRef>(null);
  const resumePaperRefsPage2 = useRef<ResumePaperRef>(null);
  const dependencies = useMemo(
    () => [sections, settings.headings, settings.ratingBarData],
    [sections, settings.headings, settings.ratingBarData]
  );

  const isLoading = !sections || loading;

  return (
    <>
      <GlobalPrintStyle background={theme.colors.white} />
      <Menu
        resumeJsonUrl={jsonUrl}
        setResumeJsonUrl={setJsonUrl}
        resumeSections={sections}
        settings={settings}
        setSettings={setSettings}
        errorMessage={error}
        isLoading={isLoading}
      />
      <ZoomProvider paperRefs={resumePaperRefs} dependencies={dependencies}>
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
      <ZoomProvider paperRefs={resumePaperRefs} dependencies={dependencies}>
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
    </>
  );
};

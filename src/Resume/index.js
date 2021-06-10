/*
    index.js (Resume)
    <> Filip Rajec
*/

import React, { useRef, useMemo } from "react";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { createGlobalStyle } from "styled-components";

import { useZoomValue, ZoomProvider } from "./context/ZoomContext";
import { useThemeValue, ThemeProvider } from "./context/ThemeContext";
import {
  useResumeJson,
  useResumeSections,
  useJsonUrl,
  useResumeSettings,
} from "./hooks";
import ResumePaper from "./Components/ResumePaper";
import Menu from "./Components/Menu";
import Styles from "./shared/styles";

import "./shared/styles/fonts/Karrik/import.scss";

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
      background: ${(props) => props.background};
    }
    * {
    -webkit-print-color-adjust: exact;
    color-adjust: exact !important; 
    }
  }
`;

const Resume = () => {
  const [jsonUrl, setJsonUrl] = useJsonUrl();
  const [json, isLoadingJson, jsonError] = useResumeJson(jsonUrl);
  const sections = useResumeSections(json);
  const [settings, setSettings] = useResumeSettings(sections);
  const resumePaperRefs = useRef();
  const themeValue = useThemeValue();
  const zoomValue = useZoomValue(
    resumePaperRefs,
    useMemo(
      () => [sections, settings.headings, settings.ratingBarData],
      [sections, settings.headings, settings.ratingBarData]
    )
  );
  const isLoading = !sections || isLoadingJson || zoomValue.rendering;

  return (
    <ZoomProvider value={zoomValue}>
      <ThemeProvider value={themeValue}>
        <GlobalPrintStyle
          background={Styles.colors.basic.paper}
        />
        <Menu
          resumeJsonUrl={jsonUrl}
          setResumeJsonUrl={setJsonUrl}
          resumeSections={sections}
          settings={settings}
          setSettings={setSettings}
          errorMessage={jsonError}
          isLoading={isLoading}
        />
        <ResumePaper
          resumeSections={sections}
          resumeJson={json}
          headings={settings.headings}
          ratingBarData={settings.ratingBarData}
          errorMessage={jsonError}
          isLoading={isLoading}
          ref={resumePaperRefs}
        />
      </ThemeProvider>
    </ZoomProvider>
  );
};

Resume.propTypes = {};

export default Resume;

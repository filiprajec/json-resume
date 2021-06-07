/*
    index.js (Resume)
    <> Filip Rajec
*/

import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { createGlobalStyle } from "styled-components";

import { useZoomValue, ZoomProvider } from "./context/ZoomContext";
import { useThemeValue, ThemeProvider } from "./context/ThemeContext";
import { useResumeJson, useResumeSections } from "./hooks";
import ResumePaper from "./Components/ResumePaper";
import Menu from "./Components/Menu";
import { headingsDefault } from "./ResumeSection/defaults";
import Styles from "./shared/styles";

import "./shared/styles/fonts/Karrik/import.scss";

const GlobalPrintStyle = createGlobalStyle`
  @media print {
    @page { margin: ${props => {
      // sets margin on [min,max]
      const margin = { max: 15, min: 2, current: props.margin }
      margin.current = margin.max - margin.current;
      if (margin.current < margin.min) {
        margin.current = margin.min;
      }
      return margin.current;
     }}px }
    html,
    body {
      margin: 0;
      box-shadow: none;
      width: 21cm;
      height: 29.7cm;
      overflow: hidden;
      background: ${(props) => props.background};
    }
    * {
    -webkit-print-color-adjust: exact;
    color-adjust: exact !important; 
    }
  }
`;

const defaultJsonUrl = "https://raw.githubusercontent.com/jsonresume/resume-schema/master/sample.resume.json";

const Resume = () => {
  const [jsonUrl, setJsonUrl] = useState(defaultJsonUrl);
  const [json, isLoadingJson, jsonError] = useResumeJson(jsonUrl);
  const [headings, setHeadings] = useState(headingsDefault);
  const [sections, ratingBarData, setRatingBarData] = useResumeSections(
    json,
    headings
  );
  const resumePaperRefs = useRef();
  const themeValue = useThemeValue();
  const zoomValue = useZoomValue(
    resumePaperRefs,
    useMemo(
      () => [sections, headings, ratingBarData],
      [sections, headings, ratingBarData]
    )
  );
  const isLoading = !sections || isLoadingJson || zoomValue.rendering;

  const getURLFromQueryString = useCallback(() => {
    const isBrowser = typeof window !== "undefined";
    if (!isBrowser) {
      return null;
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('json');
  },[]);

  useEffect(() => {
    const jsonUrl_ = getURLFromQueryString();
    if (jsonUrl_) {
      setJsonUrl(jsonUrl_);
    }
  },[]);

  return (
    <ZoomProvider value={zoomValue}>
      <ThemeProvider value={themeValue}>
        <GlobalPrintStyle background={Styles.colors.basic.paper} margin={zoomValue.deltaHeight/2} />
        <Menu
          resumeJsonUrl={jsonUrl}
          setResumeJsonUrl={setJsonUrl}
          resumeSections={sections}
          headings={headings}
          setHeadings={setHeadings}
          ratingBarData={ratingBarData}
          setRatingBarData={setRatingBarData}
          errorMessage={jsonError}
          isLoading={isLoading}
        />
        <ResumePaper
          resumeSections={sections}
          resumeJson={json}
          headings={headings}
          ratingBarData={ratingBarData}
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

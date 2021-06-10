/*
    hooks.js (Resume)
    <> Filip Rajec
*/

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import resumeSchema from "resume-schema";

import ResumeSection from "./ResumeSection/ResumeSection";
import { headingsDefault } from "./ResumeSection/defaults";

export const useJsonUrl = () => {
  const defaultJsonUrl =
    "https://raw.githubusercontent.com/jsonresume/resume-schema/master/sample.resume.json";
  const [url, setUrl] = useState(defaultJsonUrl);

  const getURLFromQueryString = useCallback(() => {
    const isBrowser = typeof window !== "undefined";
    if (!isBrowser) {
      return null;
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("json");
  }, []);

  useEffect(() => {
    const url_ = getURLFromQueryString();
    if (url_) {
      setUrl(url_);
    }
  }, []);

  return [url, setUrl];
};

export const useResumeJson = (url) => {
  const [json, setJson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError("");
    (async () => {
      let response = null;
      try {
        response = await axios.get(url);
      } catch (err) {
        setError(
          err?.toString() ?? "An error occurred while downloading the json."
        );
        setIsLoading(false);
        return;
      }

      const resumeJson_ = response?.data;
      if (resumeJson_ != null) {
        resumeSchema.validate(
          resumeJson_,
          (err) => {
            if (err) {
              setError(err[0].message ?? "Unknown error with json schema.");
              setIsLoading(false);
              return;
            }
            setJson(resumeJson_);
            setIsLoading(false);
          },
          (err) => {
            setError(err[0].message ?? "Unknown error with json schema.");
            setIsLoading(false);
          }
        );
      } else {
        setError("Could not read json file.");
        setIsLoading(false);
      }
    })();
  }, [url]);

  return [json, isLoading, error];
};

export const useResumeSections = (json) => {
  const [sections, setSections] = useState(null);

  useEffect(() => {
    if (json) {
      const processResumeJson = () =>
        new Promise((res) => {
          const sections_ = {};
          Object.keys(json).forEach((sectionName) => {
            try {
              sections_[sectionName] = new ResumeSection(
                json[sectionName],
                sectionName
              );
            } catch (err) {
              delete sections_[sectionName];
            }
          });
          res(sections_);
        });

      (async () => {
        const sections_ = await processResumeJson();
        setSections(sections_);
      })();
    }
  }, [json]);

  return sections;
};

export const useResumeSettings = (resumeSections) => {
  const [settings, setSettings] = useState({ headings: {}, ratingBarData: {} });

  const initialiseRatingBarData = (sections_, headings_) =>
    new Promise((res, rej) => {
      if (sections_ == null) {
        rej(
          new Error(
            "resumeSections is null or undefined in initialiseRatingBarData routine."
          )
        );
      }
      const ratingBarData_ = {};
      Object.keys(sections_).forEach((sectionType) => {
        const { subheadings, ratings } = sections_[sectionType];
        const IDs = sections_[sectionType].dataIDs;
        for (let i = 0; i < ratings.length; i++) {
          if (ratings[i] != null && ratings[i] !== "") {
            ratingBarData_[IDs[i]] = {};
            ratingBarData_[IDs[i]].name = `${headings_[sectionType]}${
              subheadings[i] != null && subheadings[i] !== ""
                ? `/${subheadings[i]}`
                : ""
            } - ${ratings[i]}`;
            ratingBarData_[IDs[i]].value = 4;
          }
        }
      });
      res(ratingBarData_);
    });

  useEffect(() => {
    if (resumeSections == null) {
      return;
    }
    (async () => {
      const headings = headingsDefault;
      const ratingBarData = await initialiseRatingBarData(
        resumeSections,
        headings
      );
      setSettings({ headings, ratingBarData });
    })();
  }, [resumeSections]);

  return [settings, setSettings];
};

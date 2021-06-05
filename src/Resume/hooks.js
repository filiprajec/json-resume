/*
    hooks.js (Resume)
    <> Filip Rajec
*/

import { useState, useEffect } from "react";
import axios from "axios";
import resumeSchema from "resume-schema";

import ResumeSection from "./ResumeSection/ResumeSection";

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

export const useResumeSections = (json, headings) => {
  const [sections, setSections] = useState(null);
  const [ratingBarData, setRatingBarData] = useState({});

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

      const initialiseRatingBarData = (sections_) =>
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
                ratingBarData_[IDs[i]].name = `${headings[sectionType]}${
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

      (async () => {
        const sections_ = await processResumeJson();
        const ratingBarData_ = await initialiseRatingBarData(sections_);
        setSections(sections_);
        setRatingBarData(ratingBarData_);
      })();
    }
  }, [json]);

  return [sections, ratingBarData, setRatingBarData];
};

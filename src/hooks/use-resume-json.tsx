import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import resumeSchema from "resume-schema";

import myResumeJson from "../my-resume.json";
import { ResumeSchema } from "../types";

export const useResumeJson = (url: string) => {
  const [json, setJson] = useState<ResumeSchema>(myResumeJson);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!json) {
      setLoading(true);
      setError("");
      (async () => {
        let response: any = null;
        try {
          response = await axios.get(url);
        } catch (err) {
          setError(
            err?.toString() ?? "An error occurred while downloading the json."
          );
          setLoading(false);
          return;
        }

        const resumeJson_ = response?.data;
        if (resumeJson_ != null) {
          resumeSchema.validate(
            resumeJson_,
            (err) => {
              if (err) {
                setError(err[0].message ?? "Unknown error with json schema.");
                setLoading(false);
                return;
              }
              setJson(resumeJson_);
              setLoading(false);
            },
            (err) => {
              setError(err[0].message ?? "Unknown error with json schema.");
              setLoading(false);
            }
          );
        } else {
          setError("Could not read json file.");
          setLoading(false);
        }
      })();
    }
  }, [url]);

  return {
    json,
    loading,
    error,
  };
};

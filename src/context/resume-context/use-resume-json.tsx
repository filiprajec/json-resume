import { useState, useCallback } from "react";
import axios from "axios";
import resumeSchema from "resume-schema";

import { usePage } from "../page-context";
import { ResumeJsonSchema } from "../../resume-schema-types";
import { ResumeClass } from "../../resume";

export const useFetchJson = (resume: ResumeClass | undefined) => {
  const { onLoadingJson } = usePage();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetch = useCallback(
    (url: string) => {
      (async () => {
        try {
          if (!url) {
            throw new Error("No URL provided.");
          }

          if (!resume) {
            throw new Error("No resume initialised.");
          }

          onLoadingJson("fetching");
          setError(undefined);
          setLoading(true);

          const response = await axios.get<ResumeJsonSchema>(url);
          const resumeJson = response?.data;

          if (resumeJson == null) {
            throw new Error("Could not read json file.");
          }

          resumeSchema.validate(
            resumeJson,
            (err) => {
              if (err) {
                throw err;
              }
              resume?.updateJson(resumeJson);
            },
            (err) => {
              throw err;
            }
          );
          onLoadingJson("success");
        } catch (e) {
          onLoadingJson("error");
          if (e instanceof Error) {
            setError(e.message);
          } else if (typeof e === "string") {
            setError(e);
          } else {
            setError("An error occurred while processing the json.");
          }
        } finally {
          setLoading(false);
        }
      })();
    },
    [resume, onLoadingJson]
  );

  return {
    fetch,
    loading,
    error,
  };
};

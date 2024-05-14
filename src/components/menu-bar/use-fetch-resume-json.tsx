import { useState, useCallback } from "react";
import axios from "axios";
import resumeSchema from "resume-schema";

import { ResumeJsonSchema } from "@/lib/resume-schema-types";

export const useFetchResumeJson = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetch = useCallback(
    async (
      url: string,
      options?: {
        onSuccess?: (resumeJson: ResumeJsonSchema) => void;
        onError?: (error: unknown) => void;
      }
    ) => {
      try {
        if (!url) {
          throw new Error("No URL provided.");
        }

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
              options?.onError?.(err);
            }
            options?.onSuccess?.(resumeJson);
          },
          (err) => {
            options?.onError?.(err);
          }
        );
      } catch (e) {
        options?.onError?.(e);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { fetch, loading, error };
};

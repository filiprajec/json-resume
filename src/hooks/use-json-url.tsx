import { useState, useEffect, useCallback } from "react";

export const useJsonUrl = () => {
  const defaultJsonUrl =
    "https://raw.githubusercontent.com/jsonresume/resume-schema/master/sample.resume.json";
  const [url, setUrl] = useState<string>(defaultJsonUrl);

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

  return { url, setUrl };
};

import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import {
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
  SparklesIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";

import { ThemeProps, useTheme } from "../context/theme-context";
import { ResumeSettings, ResumeSections } from "../hooks";

const functionDefault = () => {
  // eslint-disable-next-line no-console
  console.error("Called a function that has not been attached.");
};

interface MenuProps {
  resumeJsonUrl: string;
  setResumeJsonUrl: (url: string) => void;
  resumeSections: ResumeSections | null;
  settings: ResumeSettings;
  setSettings: React.Dispatch<React.SetStateAction<ResumeSettings>>;
  errorMessage: string;
  isLoading: boolean;
}

export const Menu = ({
  resumeJsonUrl = "",
  setResumeJsonUrl = functionDefault,
  resumeSections = {},
  settings = {
    headings: {},
    ratingBarData: {},
  },
  setSettings = functionDefault,
  errorMessage = "",
  isLoading = false,
}: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [resumeJsonUrlValue, setResumeJsonUrlValue] = useState(resumeJsonUrl);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [headingValues, setHeadingValues] = useState(settings.headings);
  const [ratingBarDataLocal, setRatingBarDataLocal] = useState(
    settings.ratingBarData
  );
  const { name: themeName, setTheme, themes } = useTheme();

  const isError = errorMessage !== "";

  useEffect(() => {
    setHeadingValues(settings.headings);
  }, [settings.headings]);

  useEffect(() => {
    setRatingBarDataLocal(settings.ratingBarData);
  }, [settings.ratingBarData]);

  useEffect(() => {
    setResumeJsonUrlValue(resumeJsonUrl);
  }, [resumeJsonUrl]);

  useEffect(() => {
    if (errorMessage !== "") {
      setShowMoreOptions(false);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (isLoading) {
      setShowMoreOptions(false);
    }
  }, [isLoading]);

  const handleSubmitResumeJsonUrl = (event) => {
    event.preventDefault();
    setResumeJsonUrl(resumeJsonUrlValue);
    //@ts-ignore
    setSettings((prev) => ({
      ...prev,
      headings: headingValues,
      ratingBarData: ratingBarDataLocal,
    }));
  };

  return (
    <Container open={isOpen}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ToggleButton onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <ChevronDoubleUpIcon /> : <ChevronDoubleDownIcon />}
        </ToggleButton>
        <ToggleButton onClick={() => window.print()}>
          <PrinterIcon />
        </ToggleButton>
      </div>
      <MainContent open={isOpen}>
        <form onSubmit={handleSubmitResumeJsonUrl}>
          <Label>
            Resume JSON link
            <InputWide
              type="url"
              value={resumeJsonUrlValue}
              onChange={(event) => setResumeJsonUrlValue(event.target.value)}
              hasError={isError}
            />
          </Label>
          {isError && <ErrorMessageText>{errorMessage}</ErrorMessageText>}
          <MoreOptionsContent open={showMoreOptions}>
            <div style={{ marginBottom: 10, textDecoration: "underline" }}>
              Headings
            </div>
            {headingValues &&
              Object.keys(headingValues).map((heading) =>
                resumeSections && resumeSections[heading]?.hasContent() ? (
                  <Input
                    type="text"
                    value={headingValues[heading]}
                    placeholder={heading}
                    onChange={(event) =>
                      setHeadingValues((prev) => ({
                        ...prev,
                        [heading]: event.target.value,
                      }))
                    }
                    key={`heading-input-${heading}`}
                  />
                ) : null
              )}
            <div style={{ marginBottom: 10, textDecoration: "underline" }}>
              Rating Bars
            </div>
            {ratingBarDataLocal &&
              Object.keys(ratingBarDataLocal).map((dataID) => (
                <Label key={`rating-bar-input-${dataID}`}>
                  {ratingBarDataLocal[dataID].name}
                  <Input
                    type="range"
                    value={ratingBarDataLocal[dataID].value}
                    min="0"
                    max="5"
                    style={{ margin: "5px 10px", verticalAlign: "middle" }}
                    onChange={(event) =>
                      setRatingBarDataLocal((prev) => ({
                        ...prev,
                        [dataID]: {
                          name: prev[dataID].name,
                          value: event.target.value,
                        },
                      }))
                    }
                  />
                </Label>
              ))}
          </MoreOptionsContent>
          <Button type="submit">
            <SparklesIcon height="16" style={{ verticalAlign: "text-top" }} />{" "}
            Update
          </Button>
          <Button
            type="button"
            background={isLoading || isError ? "grey" : "blue"}
            style={{ marginLeft: 10 }}
            onClick={() => setShowMoreOptions((prev) => !prev)}
            disabled={isLoading || isError}
          >
            {showMoreOptions ? "Hide" : "Show"} More Options
          </Button>
        </form>
        {Object.keys(themes).map((themeName_) => (
          <Fragment key={`theme-tablet-${themeName_}`}>
            <ThemeTablet
              theme={themes[themeName_]}
              name={themeName_}
              setTheme={setTheme}
              selected={themeName_ === themeName}
            />
          </Fragment>
        ))}
      </MainContent>
    </Container>
  );
};

interface ThemeTabletProps {
  theme: ThemeProps;
  name: string;
  setTheme: (name: string) => void;
  selected: boolean;
}

const ThemeTablet = ({ theme, name, setTheme, selected }: ThemeTabletProps) => (
  <Tablet type="button" onClick={() => setTheme(name)} selected={selected}>
    <LeftTablet color={theme.primary} />
    <RightTablet color={theme.secondary} />
  </Tablet>
);

const Container = styled.div<{ open: boolean }>`
  position: sticky;
  width: 100%;
  height: fit-content;
  top: 0;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  z-index: 2;
  transition: all 0.1s ease-in-out;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow: ${(props) => (props.open ? "scroll" : "hidden")};
  overscroll-behavior: contain;

  * {
    font-family: "Karrik";
    font-size: 16px;
  }

  @media print {
    display: none;
  }
`;

const MainContent = styled.div<{ open: boolean }>`
  width: 100%;
  height: 100%;
  padding: ${(props) => (props.open ? "10px" : "0 10px")};
  transition: all 0.1s ease-in-out;
  height: ${(props) => (props.open ? "100%" : 0)};
  opacity: ${(props) => (props.open ? 1 : 0)};
  box-sizing: border-box;
  overflow: ${(props) => (props.open ? "visible" : "hidden")};
`;

const MoreOptionsContent = styled.div<{ open: boolean }>`
  width: 100%;
  height: 100%;
  padding: ${(props) => (props.open ? "10px 0" : 0)};
  transition: all 0.1s ease-in-out;
  height: ${(props) => (props.open ? "100%" : 0)};
  opacity: ${(props) => (props.open ? 1 : 0)};
  box-sizing: border-box;
  overflow: ${(props) => (props.open ? "visible" : "hidden")};
`;

const ToggleButton = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const InputWide = styled.input<{ hasError: boolean }>`
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid ${(props) => (props.hasError ? "red" : "#c8c8c8")};
  color: ${(props) => (props.hasError ? "red" : "black")};
  border-radius: 2px;
`;

const Input = styled.input<{ hasError?: boolean }>`
  max-width: 300px;
  width: 100%;
  margin-bottom: 10px;
  margin-right: 10px;
  border: 1px solid ${(props) => (props.hasError ? "red" : "#c8c8c8")};
  color: ${(props) => (props.hasError ? "red" : "black")};
  border-radius: 2px;
`;

const Label = styled.label`
  display: block;
`;

const ErrorMessageText = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Button = styled.button<{
  background?: React.CSSProperties["background"];
  textColor?: React.CSSProperties["color"];
}>`
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  background-color: ${(props) => props.background ?? "black"};
  color: ${(props) => props.textColor ?? "white"};
  appearance: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  margin-right: 5px;
  margin-bottom: 10px;
`;

const Tablet = styled.button<{ selected: boolean }>`
  display: inline-block;
  margin: 5px 5px 5px 0;
  cursor: pointer;
  height: 20px;
  width: 40px;
  border: ${(props) => (props.selected ? "black solid 2px" : "none")};
  box-sizing: content-box;
  padding: 0;
  appearance: none;
`;

const LeftTablet = styled.div`
  display: inline-block;
  height: 20px;
  width: 20px;
  background-color: ${(props) => props.color};
`;

const RightTablet = styled.div`
  display: inline-block;
  height: 20px;
  width: 20px;
  background-color: ${(props) => props.color};
`;

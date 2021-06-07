/* 
    index.js (Menu)
    <> Filip Rajec
*/

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
  SparklesIcon,
  PrinterIcon,
} from "@heroicons/react/outline";

import ThemeContext from "../../context/ThemeContext";
import { ratingBarDataPropType } from "../../ResumeSection/propTypes";
import { themePropType } from "../../shared/utils/propTypes";
import { functionDefault } from "../../shared/utils/defaults";

const Container = styled.div`
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

const MainContent = styled.div`
  width: 100%;
  height: 100%;
  padding: ${(props) => (props.open ? "10px" : "0 10px")};
  transition: all 0.1s ease-in-out;
  height: ${(props) => (props.open ? "100%" : 0)};
  opacity: ${(props) => (props.open ? 1 : 0)};
  box-sizing: border-box;
  overflow: ${(props) => (props.open ? "visible" : "hidden")};
`;

const MoreOptionsContent = styled.div`
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

const InputWide = styled.input`
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid ${(props) => (props.error ? "red" : "#c8c8c8")};
  color: ${(props) => (props.error ? "red" : "black")};
  border-radius: 2px;
`;

const Input = styled.input`
  max-width: 300px;
  width: 100%;
  margin-bottom: 10px;
  margin-right: 10px;
  border: 1px solid ${(props) => (props.error ? "red" : "#c8c8c8")};
  color: ${(props) => (props.error ? "red" : "black")};
  border-radius: 2px;
`;

const Label = styled.label`
  display: block;
`;

const ErrorMessageText = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Button = styled.button`
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

const Tablet = styled.button`
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

const ThemeTablet = ({ theme, name, setTheme, selected }) => (
  <Tablet type="button" onClick={() => setTheme(name)} selected={selected}>
    <LeftTablet color={theme.primary} />
    <RightTablet color={theme.secondary} />
  </Tablet>
);

ThemeTablet.propTypes = {
  theme: themePropType,
  name: PropTypes.string,
  setTheme: PropTypes.func,
  selected: PropTypes.bool,
};

const Menu = ({
  resumeJsonUrl = "",
  setResumeJsonUrl = functionDefault,
  resumeSections = {},
  headings = {},
  setHeadings = functionDefault,
  ratingBarData = {},
  setRatingBarData = functionDefault,
  errorMessage = "",
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [resumeJsonUrlValue, setResumeJsonUrlValue] = useState(resumeJsonUrl);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [headingValues, setHeadingValues] = useState(headings);
  const [ratingBarDataLocal, setRatingBarDataLocal] = useState(ratingBarData);
  const { name: themeName, setTheme, themes } = useContext(ThemeContext);

  const isError = errorMessage !== "";

  useEffect(() => {
    setHeadingValues(headings);
  }, [headings]);

  useEffect(() => {
    setRatingBarDataLocal(ratingBarData);
  }, [ratingBarData]);

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
    setHeadings(headingValues);
    setRatingBarData(ratingBarDataLocal);
  };
  
  return (
    <Container open={isOpen}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ToggleButton type="button" onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <ChevronDoubleUpIcon /> : <ChevronDoubleDownIcon />}
        </ToggleButton>
        <ToggleButton type="button" onClick={() => window.print()}>
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
              error={isError}
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
          <ThemeTablet
            theme={themes[themeName_]}
            name={themeName_}
            setTheme={setTheme}
            selected={themeName_ === themeName}
            key={`theme-tablet-${themeName_}`}
          />
        ))}
      </MainContent>
    </Container>
  );
};

Menu.propTypes = {
  resumeJsonUrl: PropTypes.string,
  setResumeJsonUrl: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  resumeSections: PropTypes.object,
  headings: PropTypes.objectOf(PropTypes.string),
  setHeadings: PropTypes.func,
  ratingBarData: ratingBarDataPropType,
  setRatingBarData: PropTypes.func,
  errorMessage: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Menu;

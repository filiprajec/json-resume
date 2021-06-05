/*
    index.js (ResumePaper)
    <> Filip Rajec
*/

import React, {
  useContext,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

import ZoomContext from "../../context/ZoomContext";
import ThemeContext from "../../context/ThemeContext";
import { RowLayout, ColumnLayout, Cell, Grid } from "./Layouts";
import TimeLineCell from "./Cells/TimeLineCell";
import SectionCell from "./Cells/SectionCell";
import BasicsCell from "./Cells/BasicsCell";
import { ratingBarDataPropType } from "../../ResumeSection/propTypes";
import Styles from "../../shared/styles";

const Page = styled.div`
  display: block;
  position: relative;
  top: ${(props) => props.top ?? 0};
  width: 21cm;
  height: 29.7cm;
  margin: 0.5cm auto calc(0.5cm + ${(props) => props.top ?? "0cm"}) auto;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.1);
  background: ${(props) => props.background};
  font-family: "Karrik";
  line-height: 1.1;
  transition: all 0.1s ease-in-out;
  overflow: hidden;

  * {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  @media print {
    margin: 0;
    top: 0;
    box-shadow: none;
    width: 21cm;
    height: 29.7cm;
    background: ${(props) => props.background};
  }
`;

const PageInner = styled.div`
  position: absolute;
  margin: ${(props) => props.margin};
  width: calc(100% - 2 * ${(props) => props.margin});
  height: calc(100% - 2 * ${(props) => props.margin});
`;

const FullPage = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.background};
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const LoadingPage = () => (
  <FullPage background={Styles.colors.basic.paper}>
    <Loader type="Rings" color="#c8c8c8" height={150} width={150} />
  </FullPage>
);

const ErrorPage = () => (
  <FullPage background={Styles.colors.basic.paper}>
    <div style={{ height: 40, width: 40, color: "#c8c8c8" }}>
      <ExclamationCircleIcon />
    </div>
  </FullPage>
);

const ResumePaper = forwardRef(
  (
    {
      resumeSections = {},
      resumeJson = {},
      headings = {},
      ratingBarData = {},
      errorMessage = "",
      isLoading = false,
    },
    ref
  ) => {
    const { zoom } = useContext(ZoomContext);
    const { theme } = useContext(ThemeContext);
    const outerRef = useRef();
    const innerRef = useRef();

    useImperativeHandle(
      ref,
      () => ({
        outer: outerRef.current,
        inner: innerRef.current,
      }),
      [outerRef, innerRef, errorMessage]
    );

    if (errorMessage !== "") {
      return (
        <Page background={Styles.colors.basic.paper}>
          <ErrorPage />
        </Page>
      );
    }

    return (
      <Page background={Styles.colors.basic.paper}>
        {isLoading && <LoadingPage />}
        <PageInner margin="20px" ref={outerRef}>
          <Grid ref={innerRef}>
            <ColumnLayout>
              <Cell fraction={1} style={{ backgroundColor: theme.primary }}>
                <RowLayout>
                  {resumeJson?.basics && (
                    <BasicsCell basics={resumeJson.basics} />
                  )}
                  {resumeSections?.skills && resumeSections.skills.length > 0 && (
                    <SectionCell
                      heading={headings.skills}
                      ratingBarData={ratingBarData}
                      data={resumeSections.skills}
                      showMarkers={false}
                      showIcon={false}
                      styles={{
                        contentCell: {
                          container: {
                            paddingTop: `${zoom * 30}px`,
                          },
                        },
                        description: {
                          container: {
                            paddingBottom: 20,
                            textAlign: "left",
                          },
                        },
                      }}
                    />
                  )}
                </RowLayout>
              </Cell>
              <Cell fraction={3}>
                <RowLayout>
                  <Cell>
                    <ColumnLayout>
                      <Cell>
                        <RowLayout>
                          {resumeSections?.work?.hasContent() && (
                            <TimeLineCell
                              heading={headings.work}
                              data={resumeSections.work}
                            />
                          )}
                          {resumeSections?.education?.hasContent() && (
                            <TimeLineCell
                              heading={headings.education}
                              data={resumeSections.education}
                            />
                          )}
                          {resumeSections?.volunteer?.hasContent() && (
                            <TimeLineCell
                              heading={headings.volunteer}
                              data={resumeSections.volunteer}
                            />
                          )}
                          {resumeSections?.awards?.hasContent() && (
                            <SectionCell
                              heading={headings.awards}
                              data={resumeSections.awards}
                            />
                          )}
                          {resumeSections?.publications?.hasContent() && (
                            <SectionCell
                              heading={headings.publications}
                              data={resumeSections.publications}
                            />
                          )}
                          {resumeSections?.projects?.hasContent() && (
                            <SectionCell
                              heading={headings.projects}
                              data={resumeSections.projects}
                              ratingBarData={ratingBarData}
                            />
                          )}
                        </RowLayout>
                      </Cell>
                    </ColumnLayout>
                  </Cell>

                  {resumeSections?.languages?.hasContent() && (
                    <SectionCell
                      heading={headings.languages}
                      data={resumeSections.languages}
                      ratingBarData={ratingBarData}
                    />
                  )}
                  {resumeSections?.interests?.hasContent() && (
                    <SectionCell
                      heading={headings.interests}
                      data={resumeSections.interests}
                    />
                  )}
                  {resumeSections?.references?.hasContent() && (
                    <SectionCell
                      heading={headings.references}
                      data={resumeSections.references}
                    />
                  )}
                </RowLayout>
              </Cell>
            </ColumnLayout>
          </Grid>
        </PageInner>
      </Page>
    );
  }
);

export default ResumePaper;

ResumePaper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  resumeSections: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  resumeJson: PropTypes.object,
  headings: PropTypes.objectOf(PropTypes.string),
  ratingBarData: ratingBarDataPropType,
  errorMessage: PropTypes.string,
  isLoading: PropTypes.bool,
};

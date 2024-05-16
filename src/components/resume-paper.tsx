import React from "react";
import { Box, Flex } from "@mantine/core";
import styled from "styled-components";

import {
  useResume,
  usePage,
  type ResumeDataSectionKey,
  LayoutProvider,
} from "@/context";
import { Section } from "./section";
import { ErrorPageOverlay } from "./error-page-overlay";
import { EmptyPageOverlay } from "./empty-page-overlay";

const ResumePaperOverlay = () => {
  const { pageState } = usePage();
  const { isResumeEmpty } = useResume();

  if (pageState === "error") {
    return <ErrorPageOverlay />;
  }

  if (isResumeEmpty()) {
    return <EmptyPageOverlay />;
  }

  return null;
};

export const ResumePaper = () => {
  const { attachContentRef, attachResumeRef, marginX, marginY } = usePage();
  const { resumeConfig } = useResume();
  const { pageCount, layout } = resumeConfig;
  const hasPanel = layout.panel && layout.panel.length > 0;

  return (
    <Paper pages={pageCount}>
      <ResumePaperOverlay />
      <Box
        ref={attachResumeRef}
        pos="absolute"
        w="100%"
        h="100%"
        style={{ boxSizing: "content-box" }}
      >
        <Flex
          ref={attachContentRef}
          direction="row"
          style={{
            marginLeft: marginX,
            marginRight: marginX,
            marginTop: marginY,
            marginBottom: marginY,
          }}
        >
          {hasPanel && (
            <LayoutProvider componentLocation="panel">
              <Flex
                bg={
                  resumeConfig.colorScheme.inverted
                    ? resumeConfig.colorScheme.primary
                    : resumeConfig.colorScheme.secondary
                }
                direction="column"
                gap="lg"
                py="sm"
                px="md"
                flex={1}
                maw="35%"
              >
                {layout.panel.map((sectionKey: ResumeDataSectionKey) => (
                  <Section sectionKey={sectionKey} key={sectionKey} />
                ))}
              </Flex>
            </LayoutProvider>
          )}
          <LayoutProvider componentLocation="body">
            <Flex direction="column" gap="lg" px="md" flex={2}>
              {layout?.body.map((sectionKey: ResumeDataSectionKey) => (
                <Section key={sectionKey} sectionKey={sectionKey} />
              ))}
            </Flex>
          </LayoutProvider>
        </Flex>
      </Box>
    </Paper>
  );
};

const Paper = styled.div<{
  top?: React.CSSProperties["top"];
  pages?: number;
}>`
  display: block;
  position: relative;
  top: ${(props) => props.top ?? 0};
  width: 21cm;
  height: ${(props) => (props.pages ?? 1) * 29.7}cm;
  margin: 0.75cm auto 0.75cm auto;
  box-shadow: var(--mantine-shadow-xl);
  border: 1px solid var(--mantine-color-gray-2);
  background: var(--mantine-color-white);
  transition: all 0.1s ease-in-out;
  overflow: hidden;
  box-sizing: content-box;

  * {
    box-sizing: border-box;
  }

  @media print {
    width: 21cm;
    height: ${(props) => (props.pages ?? 1) * 29.7}cm;
    margin: 0;
    background: var(--mantine-color-white);
    box-sizing: content-box;
    box-shadow: none;
    border: none;
  }
`;

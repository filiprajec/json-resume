import React from "react";
import { Box, Flex, Loader, MantineProvider, Text } from "@mantine/core";
import styled from "styled-components";
import { IconExclamationCircle } from "@tabler/icons-react";

import {
  useResume,
  usePage,
  type ResumeDataSectionKey,
  LayoutProvider,
} from "@/context";
import { Section } from "./section";

export const ResumePaper = () => {
  const { attachContentRef, attachResumeRef, marginX, marginY, pageState } =
    usePage();
  const { resumeConfig, isResumeEmpty } = useResume();
  const { pageCount, layout } = resumeConfig;
  const hasPanel = layout.panel && layout.panel.length > 0;

  return (
    <Paper pages={pageCount}>
      {pageState === "error" && <ErrorPage />}
      {isResumeEmpty() && <EmptyPage />}
      <PaperInner ref={attachResumeRef}>
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
                <Section
                  key={sectionKey}
                  sectionKey={sectionKey}
                  withPageBreaks
                />
              ))}
            </Flex>
          </LayoutProvider>
        </Flex>
      </PaperInner>
    </Paper>
  );
};

const EmptyPage = () => {
  return (
    <FullPage style={{ zIndex: 2 }}>
      <MantineProvider
        getRootElement={() =>
          document.getElementById("empty-root") ?? undefined
        }
        cssVariablesSelector="#empty-root"
        theme={{ scale: 1 }}
      >
        <Box id="empty-root">
          <Text c="dimmed">Nothing here...</Text>
        </Box>
      </MantineProvider>
    </FullPage>
  );
};

const ErrorPage = () => {
  return (
    <FullPage style={{ zIndex: 2 }}>
      <Box w={40} h={40} c="dimmed">
        <IconExclamationCircle />
      </Box>
    </FullPage>
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

const PaperInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: content-box;
`;

const FullPage = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--mantine-color-white);
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

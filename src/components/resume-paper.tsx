import React from "react";
import { Box, Flex, Loader, MantineProvider, Stack, Text } from "@mantine/core";
import styled from "styled-components";
import { IconExclamationCircle } from "@tabler/icons-react";

import { useZoom, useResume, usePage } from "../context";
import { Section } from "./section";
import type { ResumeDataSectionKey } from "../resume";

interface ResumePaperProps {
  attachZoomRef?: boolean;
  errorMessage?: string;
  pageIndex: number;
}

export const ResumePaper = ({
  errorMessage,
  pageIndex,
  attachZoomRef = false,
}: ResumePaperProps) => {
  const { attachOuterRef, attachInnerRef } = useZoom();
  const { pageState } = usePage();
  const { resume } = useResume();
  const pageLayout = resume?.getPageLayout(pageIndex);
  const hasPanel = pageLayout?.panel && pageLayout?.panel.length > 0;

  if (errorMessage !== undefined) {
    return <ErrorPage />;
  }

  if (resume?.isEmpty()) {
    return <EmptyPage />;
  }

  return (
    <Paper>
      {pageState !== "ready" && <LoadingPage />}
      <PaperInner margin="20px" ref={attachZoomRef ? attachOuterRef : null}>
        <Flex ref={attachZoomRef ? attachInnerRef : null}>
          {hasPanel && (
            <Flex
              flex={1}
              bg={resume?.getColorScheme().panel}
              direction="column"
              gap="md"
              py="sm"
              px="md"
            >
              {pageLayout.panel.map((sectionKey: ResumeDataSectionKey) => (
                <Section sectionKey={sectionKey} />
              ))}
            </Flex>
          )}
          <Flex flex={3} direction="column" gap="xl" px="md">
            {pageLayout?.body.map((sectionKey: ResumeDataSectionKey) => (
              <Section sectionKey={sectionKey} />
            ))}
          </Flex>
        </Flex>
      </PaperInner>
    </Paper>
  );
};

const LoadingPage = () => {
  return (
    <FullPage style={{ zIndex: 2 }}>
      <MantineProvider
        getRootElement={() =>
          document.getElementById("loader-root") ?? undefined
        }
        cssVariablesSelector="#loader-root"
        theme={{ scale: 1 }}
      >
        <Box id="loader-root">
          <Loader size="xl" />
        </Box>
      </MantineProvider>
    </FullPage>
  );
};

const EmptyPage = () => {
  return (
    <Paper>
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
    </Paper>
  );
};

const ErrorPage = () => {
  return (
    <Paper>
      <FullPage>
        <Box w={40} h={40} c="dimmed">
          <IconExclamationCircle />
        </Box>
      </FullPage>
    </Paper>
  );
};

const Paper = styled.div<{
  top?: React.CSSProperties["top"];
}>`
  display: block;
  position: relative;
  top: ${(props) => props.top ?? 0};
  width: 21cm;
  height: 29.5cm;
  margin: 0.25cm auto calc(0.25cm + ${(props) => props.top ?? "0cm"}) auto;
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
    height: 29.5cm;
    margin: 0;
    background: var(--mantine-color-white);
    box-sizing: content-box;
    box-shadow: none;
    border: none;
  }
`;

const PaperInner = styled.div<{
  margin: React.CSSProperties["margin"];
}>`
  position: absolute;
  top: 0.1cm;
  margin: ${(props) => props.margin};
  width: calc(100% - 2 * ${(props) => props.margin});
  height: calc(100% - 2 * ${(props) => props.margin});
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

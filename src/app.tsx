import "./assets/fonts/Karrik/import.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@mantine/core/styles.css";

import { useRef, useMemo } from "react";
import {
  AppShell,
  Box,
  Flex,
  MantineProvider,
  ScrollArea,
  ScrollAreaAutosize,
} from "@mantine/core";

import { useResume, ZoomProvider } from "./context";
import {
  ResumePaper,
  MenuBar,
  GlobalPrintStyleDom,
  Header,
} from "./components";
import { theme } from "./theme";

export const App = () => {
  const { resume, resumeId } = useResume();
  const layout = resume?.getLayout();

  return (
    <MantineProvider theme={theme}>
      <GlobalPrintStyleDom />
      <AppShell header={{ height: 48 }}>
        <AppShell.Header id="header-root" h={48}>
          <Header />
        </AppShell.Header>
        <AppShell.Main id="main-root" h="calc(100vh - 48px)">
          <Flex h="calc(100vh - 48px)" id="main-root-flex">
            <ScrollAreaAutosize
              w={600}
              style={{
                borderRight: "1px solid var(--mantine-color-gray-3)",
              }}
              pb="md"
            >
              <Box h="calc(100vh - 48px)">
                <MenuBar />
              </Box>
            </ScrollAreaAutosize>
            <ScrollArea w="100%">
              <Box key={resumeId}>
                <ZoomProvider>
                  {layout?.map((_, index) => (
                    <ResumePaper
                      pageIndex={index}
                      attachZoomRef={index === 0}
                    />
                  ))}
                </ZoomProvider>
              </Box>
            </ScrollArea>
          </Flex>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
};

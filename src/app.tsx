import "./assets/fonts/Karrik/import.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@mantine/core/styles.css";

import {
  AppShell,
  Box,
  Flex,
  LoadingOverlay,
  MantineProvider,
  ScrollArea,
  ScrollAreaAutosize,
} from "@mantine/core";

import { PaperThemeProvider, usePage } from "./context";
import { ResumePaper, MenuBar, GlobalPrintStyle, Header } from "./components";
import { theme } from "./lib/theme";

export const App = () => {
  const { pageState } = usePage();

  return (
    <MantineProvider theme={theme}>
      <GlobalPrintStyle />
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
              <Box>
                <LoadingOverlay
                  visible={pageState !== "ready"}
                  zIndex={2}
                  overlayProps={{ blur: 15 }}
                  loaderProps={{ type: "dots" }}
                />
                <PaperThemeProvider>
                  <ResumePaper />
                </PaperThemeProvider>
              </Box>
            </ScrollArea>
          </Flex>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
};

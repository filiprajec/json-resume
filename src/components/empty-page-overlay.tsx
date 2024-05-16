import { Box, Button, MantineProvider, Stack, Text } from "@mantine/core";

import { useFetchResumeJson } from "@/hooks/use-fetch-resume-json";
import { usePage, useResume } from "@/context";
import { logger } from "@/lib/logger";
import { ResumePaperOverlay } from "./resume-paper-overlay";

export const EmptyPageOverlay = () => {
  const { fetch, loading } = useFetchResumeJson();
  const { updateJson } = useResume();
  const { updatePageState } = usePage();

  const fetchUrl = async () => {
    updatePageState("fetching", "EmptyPageOverlay");
    await fetch("https://www.dingohead.com/resume.json", {
      onSuccess: (resumeJson) => {
        updateJson(resumeJson);
        updatePageState("ready", "EmptyPageOverlay");
      },
      onError: (e) => {
        updatePageState("error", "EmptyPageOverlay");
        logger.error(e);
      },
    });
  };

  return (
    <ResumePaperOverlay>
      <MantineProvider
        getRootElement={() =>
          document.getElementById("empty-root") ?? undefined
        }
        cssVariablesSelector="#empty-root"
        theme={{ scale: 1 }}
      >
        <Box id="empty-root">
          <Stack>
            <Text c="dimmed">Nothing here...</Text>
            <Button onClick={fetchUrl} loading={loading}>
              Get Sample
            </Button>
          </Stack>
        </Box>
      </MantineProvider>
    </ResumePaperOverlay>
  );
};

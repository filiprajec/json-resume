import { Box } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

import { ResumePaperOverlay } from "./resume-paper-overlay";

export const ErrorPageOverlay = () => {
  return (
    <ResumePaperOverlay>
      <Box w={40} h={40} c="dimmed">
        <IconExclamationCircle />
      </Box>
    </ResumePaperOverlay>
  );
};

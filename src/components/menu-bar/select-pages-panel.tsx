import { Box, NumberInput } from "@mantine/core";

import { usePage, useResume } from "@/context";

export const SelectPagesPanel = () => {
  const { resumeConfig, updateResumeConfig: updateConfig } = useResume();
  const { pageState } = usePage();

  return (
    <NumberInput
      label="Number of pages"
      placeholder="Select the number of pages"
      description="The number of pages the resume should scale onto."
      disabled={pageState !== "ready"}
      value={resumeConfig?.pageCount}
      min={1}
      size="md"
      onChange={(value) => {
        if (typeof value === "string") return;
        if (value < 1 || value === resumeConfig?.pageCount) return;
        updateConfig({ pageCount: value });
      }}
      inputContainer={(children) => <Box w={120}>{children}</Box>}
    />
  );
};

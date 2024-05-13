import { NumberInput } from "@mantine/core";

import { usePage, useResume } from "@/context";

export const SelectPagesSection = () => {
  const { resumeConfig, updateResumeConfig: updateConfig } = useResume();
  const { pageState } = usePage();

  return (
    <NumberInput
      label="Number of pages"
      placeholder="Input placeholder"
      disabled={pageState !== "ready"}
      value={resumeConfig?.pageCount}
      min={1}
      onChange={(value) => {
        if (typeof value === "string") return;
        if (value < 1 || value === resumeConfig?.pageCount) return;
        updateConfig({ pageCount: value });
      }}
    />
  );
};

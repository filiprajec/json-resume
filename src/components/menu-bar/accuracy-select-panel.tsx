import { SegmentedControl, Stack, Text } from "@mantine/core";

import { usePage } from "@/context";
import { AccuracyLevel } from "@/context/page-context/scaler";

export const AccuracySelectPanel = () => {
  const { pageState, accuracyLevel, updateAccuracyLevel } = usePage();

  return (
    <Stack gap="xs">
      <Text size="sm" fw={500}>
        Dynamic Scale Accuracy
      </Text>
      <SegmentedControl
        disabled={pageState !== "ready"}
        value={accuracyLevel}
        onChange={(value) => updateAccuracyLevel(value as AccuracyLevel)}
        data={[
          { label: "Low", value: "low" },
          { label: "Mid", value: "mid" },
          { label: "High", value: "high" },
        ]}
      />
    </Stack>
  );
};

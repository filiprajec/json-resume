import { Input, SegmentedControl, Slider, Stack, Text } from "@mantine/core";

import { usePage } from "@/context";
import { AccuracyLevel } from "@/context/page-context/scaler";
import { capitalizeFirstLetter } from "@/lib/utils";

export const AccuracySelectPanel = () => {
  const { pageState, accuracyLevel, updateAccuracyLevel } = usePage();

  const sliderValueToAccuracyLevel = (value: number) => {
    if (value < 49) return "low";
    if (value < 99) return "mid";
    return "high";
  };

  const accuracyLevelToSliderValue = (level: AccuracyLevel) => {
    if (level === "low") return 0;
    if (level === "mid") return 50;
    return 100;
  };

  return (
    <Input.Wrapper
      label="Dynamic Scaling Accuracy"
      description="The higher the accuracy the better the resume will fit onto the selected number of pages."
      size="md"
    >
      <Slider
        mt="xs"
        mx="lg"
        disabled={pageState !== "ready"}
        value={accuracyLevelToSliderValue(accuracyLevel)}
        onChange={(value) =>
          updateAccuracyLevel(sliderValueToAccuracyLevel(value))
        }
        color="dark"
        showLabelOnHover={false}
        label={(value) => (
          <Text size="sm" style={{ color: "var(--mantine-color-dark)" }}>
            {capitalizeFirstLetter(sliderValueToAccuracyLevel(value))}
          </Text>
        )}
        marks={[
          { label: "Low", value: 0 },
          { label: "Mid", value: 50 },
          { label: "High", value: 100 },
        ]}
      />
    </Input.Wrapper>
  );
};

import { Fragment } from "react";
import styled from "styled-components";
import { Box, Text, Stack, Group, UnstyledButton, Badge } from "@mantine/core";

import {
  useResume,
  ColorScheme,
  ColorSchemeKey,
  colorSchemes,
} from "@/context";

export const SelectColorSchemePanel = () => {
  const { resumeConfig, updateResumeConfig } = useResume();
  const selectedColorScheme = resumeConfig.colorSchemeKey;

  return (
    <Box>
      <Stack gap="xs">
        <Text size="sm" fw={500}>
          Color Scheme
        </Text>
        <Box>
          <Group gap="xs">
            {Object.keys(colorSchemes).map((colorSchemeKey) => (
              <Fragment key={`theme-tablet-${colorSchemeKey}`}>
                <ColorSchemeTablet
                  colorScheme={colorSchemes[colorSchemeKey]}
                  colorSchemeKey={colorSchemeKey}
                  changeColorScheme={() =>
                    updateResumeConfig({
                      colorSchemeKey: colorSchemeKey as ColorSchemeKey,
                      colorScheme: colorSchemes[colorSchemeKey],
                    })
                  }
                  selected={colorSchemeKey === selectedColorScheme}
                />
              </Fragment>
            ))}
          </Group>
        </Box>
      </Stack>
    </Box>
  );
};

interface ColorSchemeTabletProps {
  colorScheme: ColorScheme;
  colorSchemeKey: string;
  changeColorScheme: (key: string) => void;
  selected: boolean;
}

const ColorSchemeTablet = ({
  colorScheme,
  colorSchemeKey,
  changeColorScheme,
  selected,
}: ColorSchemeTabletProps) => (
  <ColorSchemeButton
    onClick={() => changeColorScheme(colorSchemeKey)}
    selected={selected}
  >
    <Stack gap={0}>
      <Box
        bg={colorScheme.inverted ? colorScheme.primary : colorScheme.secondary}
        w={82}
        p={6}
      >
        <Stack gap={4}>
          <Text
            fz={12}
            fw={700}
            ff="heading"
            c={colorScheme.inverted ? "gray.0" : "dark.9"}
          >
            Title
          </Text>
          <Badge
            color={
              colorScheme.inverted ? colorScheme.secondary : colorScheme.primary
            }
            variant="light"
            size="xs"
          >
            ABC
          </Badge>
        </Stack>
      </Box>
      <Box bg="white" w={82} p={6}>
        <Stack gap={4}>
          <Text fz={8} fw={500} ff="text">
            Lorem Ipsum
          </Text>
        </Stack>
      </Box>
    </Stack>
  </ColorSchemeButton>
);

const ColorSchemeButton = styled(UnstyledButton<"button">)<{
  selected: boolean;
}>`
  display: inline-flex;
  gap: 0px;
  overflow: hidden;
  border: ${(props) =>
    props.selected
      ? "var(--mantine-color-gray-4) solid 1px"
      : "var(--mantine-color-gray-3) solid 1px"};
  transition: "opacity 0.2s ease-in-out";
  opacity: ${(props) => (props.selected ? "1" : "0.5")};
  border-radius: var(--mantine-radius-md);
`;

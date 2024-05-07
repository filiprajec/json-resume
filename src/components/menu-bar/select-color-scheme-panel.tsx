import { Fragment } from "react";
import styled from "styled-components";
import { Box, Text, Stack, Group, UnstyledButton, Paper } from "@mantine/core";

import { useResume } from "../../context";
import { ColorScheme } from "../../resume/color-schemes";

export const SelectColorSchemePanel = () => {
  const { resume } = useResume();

  if (!resume) return null;

  const colorSchemes = resume.getColorSchemes();
  const selectedColorScheme = resume.getColorSchemeKey();

  return (
    <Box>
      <Stack gap="xs">
        <Text size="sm" fw={500}>
          Color Scheme
        </Text>
        <Paper withBorder p="sm">
          <Group gap="xs">
            {Object.keys(colorSchemes).map((colorSchemeKey) => (
              <Fragment key={`theme-tablet-${colorSchemeKey}`}>
                <ColorSchemeTablet
                  colorScheme={colorSchemes[colorSchemeKey]}
                  colorSchemeKey={colorSchemeKey}
                  changeColorScheme={() =>
                    resume.updateColorScheme(colorSchemeKey)
                  }
                  selected={colorSchemeKey === selectedColorScheme}
                />
              </Fragment>
            ))}
          </Group>
        </Paper>
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
  <Swatch onClick={() => changeColorScheme(colorSchemeKey)} selected={selected}>
    <Box bg={colorScheme.panel} w={10} h={20} />
    <Box bg={colorScheme.primary} w={10} h={20} />
  </Swatch>
);

const Swatch = styled(UnstyledButton<"button">)<{ selected: boolean }>`
  display: inline-flex;
  gap: 0px;
  border-radius: var(--mantine-radius-lg);
  overflow: hidden;
  border: ${(props) =>
    props.selected
      ? "var(--mantine-color-gray-6) solid 1px"
      : "var(--mantine-color-gray-3) solid 1px"};
  transform: ${(props) => (props.selected ? "scale(1.1)" : "scale(1)")};
  transition: "transform 0.2s ease-in-out";
`;

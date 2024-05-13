import { ActionIcon, Flex, Group, Text } from "@mantine/core";
import { IconDeviceFloppy, IconPrinter } from "@tabler/icons-react";

import { usePage, useResume } from "@/context";
import { SettingsMenu } from "./settings-menu";

export const Header = () => {
  const { pageState } = usePage();
  const { save } = useResume();

  return (
    <Flex justify="space-between" px="md" align="center" h="100%">
      <Flex gap="xs">
        <Text fw={700}>🧑‍💻</Text>
        <Text fw={700}>JSON Resume x Mantine</Text>
      </Flex>
      <Group gap="xs">
        <ActionIcon
          onClick={() => save()}
          size="md"
          variant="white"
          disabled={pageState !== "ready"}
        >
          <IconDeviceFloppy stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          onClick={() => window.print()}
          size="md"
          variant="white"
          disabled={pageState !== "ready"}
        >
          <IconPrinter stroke={1.5} />
        </ActionIcon>
        <SettingsMenu />
      </Group>
    </Flex>
  );
};

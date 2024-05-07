import { ActionIcon, Menu, rem } from "@mantine/core";
import { IconSettings, IconTrash } from "@tabler/icons-react";
import { usePage, useResume } from "../context";

export const SettingsMenu = () => {
  const { pageState } = usePage();
  const { resume } = useResume();

  const onDelete = () => {
    resume?.resetConfig();
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon size="md" variant="white" disabled={pageState !== "ready"}>
          <IconSettings stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Options</Menu.Label>
        <Menu.Item
          color="red"
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={onDelete}
        >
          Delete resume
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

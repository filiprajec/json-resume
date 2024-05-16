import { Alert, Anchor, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export const JsonSchemaAlert = () => {
  return (
    <Alert variant="default" icon={<IconInfoCircle stroke={1.5} />} radius="lg">
      <Text size="sm" c="dimmed">
        The engine follows the JSON schema made popular by{" "}
        <Anchor href="https://jsonresume.org/">jsonresume.org</Anchor>.
      </Text>
    </Alert>
  );
};

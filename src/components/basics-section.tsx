import { Box, Flex, Stack, Text, Title } from "@mantine/core";

import { useResume } from "../context";

export const BasicsSection = () => {
  const { resume } = useResume();
  const basics = resume?.getBasicsSection();
  const sectionConfig = resume?.getSectionConfig("basics");

  if (!basics) {
    return null;
  }

  if (!sectionConfig?.visible) {
    return null;
  }

  return (
    <Flex direction="column" gap="xs">
      <Stack gap="xs">
        <Title order={1}>{basics.name}</Title>
        <Title order={3}>{basics.label}</Title>
        <Title order={5}>{basics.location?.city}</Title>
      </Stack>
      <Box>
        <Text>{basics.phone}</Text>
        <Text>{basics.email}</Text>
        <Text>{basics.url}</Text>
      </Box>
      <Box>
        {basics.profiles.map((eachProfile) => (
          <Text key={`profile-${eachProfile.network}-${eachProfile.username}`}>
            <span style={{ fontWeight: 500 }}>{eachProfile.network}:</span>{" "}
            {eachProfile.username}
          </Text>
        ))}
      </Box>
      {basics.summary && (
        <Box>
          <Text>{basics.summary}</Text>
        </Box>
      )}
    </Flex>
  );
};

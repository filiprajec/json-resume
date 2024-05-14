import { Avatar, Box, Flex, Stack, Text, Title } from "@mantine/core";

import { ResumeDataBasics, useLayout, useResume } from "@/context";
import { Breakable } from "./breakable";

export const BasicsSection = () => {
  const { getSection, resumeConfig } = useResume();
  const [basics] = getSection("basics") as Partial<ResumeDataBasics>[];
  const sectionConfig = resumeConfig.sectionConfig.basics;
  const { colors } = useLayout();

  if (!basics) {
    return null;
  }

  if (!sectionConfig?.visible) {
    return null;
  }

  return (
    <Breakable
      active
      render={() => (
        <Flex direction="column" gap="xs">
          <Stack gap="xs">
            {sectionConfig.showIcon && (
              <Avatar color={colors.primary} size="xl">
                <Text ff="text" fz="h2">
                  💻
                </Text>
              </Avatar>
            )}
            <Breakable
              render={() => (
                <Title
                  order={1}
                  c={colors.text}
                  style={{ overflowWrap: "anywhere" }}
                >
                  {basics.name}
                </Title>
              )}
            />
            <Breakable
              render={() => (
                <Title
                  order={2}
                  c={colors.text}
                  style={{ overflowWrap: "anywhere" }}
                >
                  {basics.label}
                </Title>
              )}
            />
            <Breakable
              render={() => (
                <Title
                  order={4}
                  c={colors.text}
                  style={{ overflowWrap: "anywhere" }}
                >
                  {basics.location?.city}
                </Title>
              )}
            />
          </Stack>
          <Box>
            <Breakable
              render={() => (
                <Text c={colors.text} style={{ overflowWrap: "anywhere" }}>
                  {basics.phone}
                </Text>
              )}
            />
            <Breakable
              render={() => (
                <Text c={colors.text} style={{ overflowWrap: "anywhere" }}>
                  {basics.email}
                </Text>
              )}
            />
            <Breakable
              render={() => (
                <Text c={colors.text} style={{ overflowWrap: "anywhere" }}>
                  {basics.url}
                </Text>
              )}
            />
          </Box>
          <Box>
            {basics.profiles?.map((eachProfile) => (
              <Breakable
                key={`profile-${eachProfile.network}-${eachProfile.username}`}
                render={() => (
                  <Text c={colors.text} style={{ overflowWrap: "anywhere" }}>
                    <span style={{ fontWeight: 500 }}>
                      {eachProfile.network}:
                    </span>{" "}
                    {eachProfile.username}
                  </Text>
                )}
              />
            ))}
          </Box>
          {basics.summary && (
            <Breakable
              render={() => (
                <Box>
                  <Text c={colors.text} style={{ overflowWrap: "anywhere" }}>
                    {basics.summary}
                  </Text>
                </Box>
              )}
            />
          )}
        </Flex>
      )}
    />
  );
};

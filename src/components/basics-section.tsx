import { Box, Flex, Stack, Text, Title } from "@mantine/core";

import { ResumeDataBasics, useLayoutLocation, useResume } from "@/context";
import { PageBreak } from "./page-break";

export const BasicsSection = () => {
  const { getSection, resumeConfig } = useResume();
  const [basics] = getSection("basics") as ResumeDataBasics[];
  const sectionConfig = resumeConfig.sectionConfig.basics;
  const { textColor } = useLayoutLocation();

  if (!basics) {
    return null;
  }

  if (!sectionConfig?.visible) {
    return null;
  }

  return (
    <PageBreak
      active
      render={() => (
        <Flex direction="column" gap="xs">
          <Stack gap="xs">
            <PageBreak
              render={() => (
                <Title
                  order={1}
                  c={textColor}
                  style={{ overflowWrap: "anywhere" }}
                >
                  {basics.name}
                </Title>
              )}
            />
            <PageBreak
              render={() => (
                <Title
                  order={2}
                  c={textColor}
                  style={{ overflowWrap: "anywhere" }}
                >
                  {basics.label}
                </Title>
              )}
            />
            <PageBreak
              render={() => (
                <Title
                  order={4}
                  c={textColor}
                  style={{ overflowWrap: "anywhere" }}
                >
                  {basics.location?.city}
                </Title>
              )}
            />
          </Stack>
          <Box>
            <PageBreak
              render={() => (
                <Text c={textColor} style={{ overflowWrap: "anywhere" }}>
                  {basics.phone}
                </Text>
              )}
            />
            <PageBreak
              render={() => (
                <Text c={textColor} style={{ overflowWrap: "anywhere" }}>
                  {basics.email}
                </Text>
              )}
            />
            <PageBreak
              render={() => (
                <Text c={textColor} style={{ overflowWrap: "anywhere" }}>
                  {basics.url}
                </Text>
              )}
            />
          </Box>
          <Box>
            {basics.profiles.map((eachProfile) => (
              <PageBreak
                key={`profile-${eachProfile.network}-${eachProfile.username}`}
                render={() => (
                  <Text c={textColor} style={{ overflowWrap: "anywhere" }}>
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
            <PageBreak
              render={() => (
                <Box>
                  <Text c={textColor} style={{ overflowWrap: "anywhere" }}>
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

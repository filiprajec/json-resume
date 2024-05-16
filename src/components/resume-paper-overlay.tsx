import { Box, BoxProps, Center } from "@mantine/core";

interface ResumePaperOverlayProps
  extends Omit<BoxProps, "pos" | "w" | "h" | "bg"> {
  children: React.ReactNode;
}

export const ResumePaperOverlay = ({
  children,
  ...boxProps
}: ResumePaperOverlayProps) => {
  return (
    <Box
      {...boxProps}
      pos="absolute"
      w="100%"
      h="100%"
      bg="white"
      style={{ zIndex: 2, ...boxProps.style }}
    >
      <Center h="100%" w="100%">
        {children}
      </Center>
    </Box>
  );
};

import { Box, HStack, Progress } from "@chakra-ui/react";

export default function AchievementExperienceBar({ percent, status }) {
  let color = "yellow";
  if (percent >= 100) color = "green";

  return (
    <HStack position="relative" width="100%" bgColor="gray.400" spacing="0rem">
      <Progress
        value={percent}
        size="xs"
        // colorScheme="green"
        variant={color}
        w="100%"
        height="0.5rem"
      />
      {/* <Box
        width="0.2rem"
        height="100%"
        position="absolute"
        top="0"
        left="20%"
        bgColor="gray.700"
      ></Box>
      <Box
        width="0.2rem"
        height="100%"
        position="absolute"
        top="0"
        left="40%"
        bgColor="gray.700"
      ></Box>
      <Box
        width="0.2rem"
        height="100%"
        position="absolute"
        top="0"
        left="60%"
        bgColor="gray.700"
      ></Box>
      <Box
        width="0.2rem"
        height="100%"
        position="absolute"
        top="0"
        left="80%"
        bgColor="gray.700"
      ></Box> */}
      {/* <Box width="0.4rem" height="100%" position="absolute" top="0" left="20%" ></Box> */}
    </HStack>
  );
}

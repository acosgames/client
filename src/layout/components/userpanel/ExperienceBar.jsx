import { Box, HStack, Progress } from "@chakra-ui/react";
import { useBucket } from "../../../actions/bucket";
import { btUser } from "../../../actions/buckets";
export default function ExperienceBar({}) {
  let user = useBucket(btUser);
  let level = user.level || 1;
  let percent = (level - Math.floor(level)) * 100;

  return (
    <HStack
      position="relative"
      width="100%"
      bgColor="gray.400"
      spacing="0.4rem"
      clipPath="polygon(0 100%, 100% 0, 100% 100%)"
      top="-0.5rem"
    >
      <Progress
        value={percent}
        size="xs"
        colorScheme="green"
        w="100%"
        height="1rem"
      />
      <Box
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
      ></Box>
      {/* <Box width="0.4rem" height="100%" position="absolute" top="0" left="20%" ></Box> */}
    </HStack>
  );
}

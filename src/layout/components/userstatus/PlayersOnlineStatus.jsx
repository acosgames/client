import { Box, HStack, Text } from "@chakra-ui/react";

export default function PlayersOnlineStatus({}) {
  return (
    <HStack>
      <Box
        bgColor="blue.300"
        borderRadius="50%"
        width="0.8rem"
        height="0.8rem"
        mt={"0.1rem"}
        boxShadow={
          "inset 0.2em 0.2em 0.2em 0 rgba(255,255,255,0.2), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.2)"
        }
      />
      <Text as="span" color="gray.0" fontWeight={"light"} fontSize="1rem">
        25 online
      </Text>
    </HStack>
  );
}

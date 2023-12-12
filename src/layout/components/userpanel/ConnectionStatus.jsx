import { Box, HStack, Text } from "@chakra-ui/react";

export default function ConnectionStatus({}) {
  return (
    <HStack>
      <Box
        bgColor="red.500"
        borderRadius="50%"
        mt={"0.1rem"}
        width="0.8rem"
        height="0.8rem"
        boxShadow={
          "inset 0.2em 0.2em 0.2em 0 rgba(255,255,255,0.2), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.2)"
        }
      />
      <Text as="span" color="gray.0" fontWeight={"light"} fontSize="1rem">
        disconnected
      </Text>
    </HStack>
  );
}

import { HStack, Image, Text, VStack } from "@chakra-ui/react";

export default function ChatMessage({ flagCode, username, msgTime, msg }) {
  return (
    <VStack w="100%" spacing="0.5rem" mb="1rem">
      <HStack w="100%" height="1rem">
        <HStack justifyContent={"flex-start"} flex="1">
          <Image src={flagCode} borderRadius="3px" height="14px" />
          <Text fontSize="1.2rem" fontWeight="bold" color="gray.10">
            {username}
          </Text>
        </HStack>
        <Text fontSize="1rem" fontWeight="bold" color="gray.200">
          {msgTime}
        </Text>
      </HStack>
      <Text
        as="span"
        display="block"
        fontSize="1.2rem"
        fontWeight="medium"
        color="gray.50"
        width="100%"
        textAlign={"left"}
      >
        {msg}
      </Text>
    </VStack>
  );
}

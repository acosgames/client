import { HStack, Icon, Text } from "@chakra-ui/react";
import { FaCoins } from "@react-icons";

export default function BadgePoints({ points }) {
  return (
    <HStack
      borderRadius="6px"
      pl="0.75rem"
      pr="0.75rem"
      bgColor="gray.800"
      justifyContent={"center"}
      alignItems={"center"}
      spacing="0.3rem"
    >
      <Icon as={FaCoins} fontSize="1rem" color="yellow.200" />
      <Text as="span" fontSize="1.2rem" color="gray.0" fontWeight="bold">
        {points}
      </Text>
    </HStack>
  );
}

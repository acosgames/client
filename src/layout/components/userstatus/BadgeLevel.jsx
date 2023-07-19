import { HStack, Icon, Text } from "@chakra-ui/react";
import { GiCandlebright } from "@react-icons";

export default function BadgeLevel({ level }) {
  return (
    <HStack
      borderRadius="6px"
      pl="0.4rem"
      pr="0.75rem"
      bgColor="gray.800"
      justifyContent={"flex-start"}
      alignItems={"center"}
      spacing="0.3rem"
    >
      <Icon as={GiCandlebright} fontSize="1.2rem" color="brand.300" />
      <Text
        as="span"
        fontSize="1.2rem"
        color="gray.0"
        fontWeight="bold"
        lineHeight="1.7rem"
      >
        Lvl {level}
      </Text>
    </HStack>
  );
}

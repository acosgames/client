import { Box, HStack, Text } from "@chakra-ui/react";

export default function UserName({}) {
  return (
    <Text
      as="span"
      color="gray.0"
      fontWeight={"500"}
      fontSize="1.3rem"
      // width={["13rem", "17rem"]}
      maxW="20rem"
      height={"1.6rem"}
      lineHeight="1.7rem"
      minWidth="0"
      whiteSpace={"nowrap"}
      overflow={"hidden"}
      textOverflow={"ellipsis"}
      display="block"
      pl="0.5rem"
      float="left"
    >
      JoeOfTexas
    </Text>
  );
}

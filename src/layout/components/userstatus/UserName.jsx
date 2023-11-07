import { Box, HStack, Text } from "@chakra-ui/react";

export default function UserName({}) {
  return (
    <Text
      as="span"
      color="gray.0"
      fontWeight={""}
      fontSize="1.4rem"
      width={["13rem", "17rem"]}
      height={"1.6rem"}
      lineHeight="1.7rem"
      overflow={"hidden"}
      textOverflow={"ellipsis"}
      whiteSpace="nowrap"
      display="block"
      float="left"
    >
      JoeOfTexas
    </Text>
  );
}

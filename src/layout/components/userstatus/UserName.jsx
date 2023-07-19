import { Box, HStack, Text } from "@chakra-ui/react";

export default function UserName({}) {
  return (
    <Text
      as="span"
      color="gray.0"
      fontWeight={""}
      fontSize="1.2rem"
      width={["13rem", "17rem"]}
      height={"1.3rem"}
      lineHeight="1.3rem"
      overflow={"hidden"}
      textOverflow={"ellipsis"}
      whiteSpace="nowrap"
      display="inline-block"
      float="left"
    >
      JoeOfTexas
    </Text>
  );
}

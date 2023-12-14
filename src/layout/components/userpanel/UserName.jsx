import { Box, HStack, Text } from "@chakra-ui/react";
import fs from "flatstore";

export default function UserName({}) {
  let [user] = fs.useWatch("user");
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
      {user.displayname}
    </Text>
  );
}

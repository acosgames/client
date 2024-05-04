import { Box, HStack, Text } from "@chakra-ui/react";

import { btUser } from "../../../actions/buckets";
import { useBucket } from "../../../actions/bucket";

export default function UserName({}) {
  let user = useBucket(btUser);
  return (
    <Text
      as="span"
      color="gray.0"
      fontWeight={"500"}
      fontSize="1.6rem"
      // width={["13rem", "17rem"]}
      maxW="20rem"
      // height={"1.6rem"}
      // lineHeight="1.3rem"
      letterSpacing={"-1px"}
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

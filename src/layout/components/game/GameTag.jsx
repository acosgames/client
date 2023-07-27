import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function GameTag({ to, title }) {
  if (to) {
    return (
      <Box>
        <Link href={to} target="_blank">
          <Text
            display="inline-block"
            // borderRadius='3px'
            padding=".3rem .8rem .3rem"
            paddingLeft="0.8rem"
            borderRadius="4px"
            background="gray.800"
            borderLeft="1rem solid"
            borderLeftColor="gray.600"
            color="gray.100"
            fontWeight="900"
            margin=".25em .1em"
            fontSize={["1rem", "1rem", "1.2rem"]}
            position="relative"
            _hover={{
              borderLeftColor: "yellow.100",
            }}
          >
            <Text
              as="span"
              color="gray.125"
              pr="0.2rem"
              position="relative"
              top="0.05rem"
            >
              #
            </Text>
            {title}
          </Text>
        </Link>
      </Box>
    );
  }

  return (
    <Box>
      <Text
        display="inline-block"
        // borderRadius='3px'
        padding=".3rem .8rem .3rem"
        paddingLeft="0.8rem"
        borderRadius="4px"
        background="gray.800"
        // borderLeft="1rem solid"
        // borderLeftColor="transparent"
        color="gray.100"
        fontWeight="900"
        margin=".25em .1em"
        fontSize={["1rem", "1rem", "1.2rem"]}
        position="relative"
      >
        <Text
          as="span"
          color="gray.125"
          pr="0.2rem"
          position="relative"
          top="0.05rem"
        >
          #
        </Text>
        {title}
      </Text>
    </Box>
  );
}

import {
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  IconButton,
  WrapItem,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";

export default function ActionBarItem({
  title,
  value,
  children,
  spacing,
  ml,
  mr,
}) {
  return (
    <Box>
      <HStack
        spacing={spacing || "0"}
        align={"center"}
        justify={"center"}
        mr={mr || "1rem"}
        //
      >
        {/* <WrapItem color="gray.0" h="6rem"> */}
        <Box
        //   transform={["scale(0.60)", "scale(0.7)", "scale(0.75)", "scale(1)"]}
        >
          {children}
        </Box>
        {/* </WrapItem> */}
        {/* <WrapItem color="gray.0" alignSelf={"center"}> */}
        <VStack spacing="0" ml={ml || "1rem"}>
          <Text
            as="span"
            color="brand.300"
            fontWeight="700"
            fontSize={["1rem", "1rem", "1rem", "1.2rem"]}
            letterSpacing={"1px"}
            whiteSpace={"nowrap"}
          >
            {title}
          </Text>
          <Text
            as="span"
            color="gray.0"
            fontWeight="700"
            fontSize={["2rem", "2rem", "2rem", "2.2rem"]}
          >
            {value}
          </Text>
        </VStack>
        {/* </WrapItem> */}
      </HStack>
    </Box>
  );
}

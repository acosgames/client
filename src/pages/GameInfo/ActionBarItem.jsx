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
      <VStack
        spacing={spacing || "0"}
        alignItems={"center"}
        justifyContent={"center"}
        // ml={mr || ["0", "0", "1rem"]}
        //
      >
        {/* <WrapItem color="gray.0" h="6rem"> */}
        <VStack
          //   transform={["scale(0.60)", "scale(0.7)", "scale(0.75)", "scale(1)"]}
          h={["6rem"]}
          //   w="6rem"
          justifyContent={"flex-end"}
          mb={"1rem"}
        >
          {children}
        </VStack>
        {/* </WrapItem> */}
        {/* <WrapItem color="gray.0" alignSelf={"center"}> */}
        <VStack spacing="0" alignItems={"center"}>
          <Heading
            as="h6"
            color="brand.300"
            fontWeight="700"
            pb="0.25rem"
            fontSize={["1rem", "1rem", "1rem", "1.2rem"]}
            letterSpacing={"1px"}
            whiteSpace={"nowrap"}
          >
            {title}
          </Heading>
          <Heading
            as="h5"
            color="gray.0"
            fontWeight="700"
            fontSize={["2rem", "2rem", "2rem", "2.2rem"]}
          >
            {value}
          </Heading>
        </VStack>
        {/* </WrapItem> */}
      </VStack>
    </Box>
  );
}

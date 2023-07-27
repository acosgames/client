import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Collapse,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";

import SimpleBar from "simplebar-react";

export default function WaitingPanel({}) {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <VStack h={["auto", "auto"]} w="100%" px={["0.5rem", "1rem"]}>
      <Accordion allowToggle w="100%" defaultIndex={0}>
        <AccordionItem
          w="100%"
          borderTop="0"
          borderBottom="0"
          bgColor="gray.800"
          borderRadius="0.5rem"
        >
          <AccordionButton p="0" onClick={onToggle} display={["none", "block"]}>
            <HStack w="100%" alignItems={"center"} pb="0.5rem">
              <Heading
                as="h4"
                fontWeight={"bold"}
                fontSize="1.6rem"
                color="gray.0"
                flex="1"
                textAlign={"left"}
                pl="1rem"
                pt="0.5rem"
              >
                Player Queue
              </Heading>
              <VStack
                position="relative"
                top="0.3rem"
                //   top="-0.8rem"
                //   left="-0.8rem"
                bgColor="red.500"
                zIndex="2"
                borderRadius="50%"
                alignItems={"center"}
                justifyContent={"center"}
                width="2.4rem"
                height="2.4rem"
                // border="2px solid var(--chakra-colors-gray-900)"
                // boxShadow={
                //   "inset 0.2em 0.2em 0.2em 0 rgba(255,255,255,0.2), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.2)"
                // }
              >
                <Text
                  as="span"
                  color="gray.0"
                  fontWeight="bold"
                  fontSize="1.4rem"
                  display="inline-block"
                  textAlign={"center"}
                  lineHeight={"2.2rem"}
                >
                  3
                </Text>
              </VStack>
              <AccordionIcon position="relative" top="0.3rem" color="gray.50" />
            </HStack>
          </AccordionButton>
          <Box
            as={Collapse}
            in={!isOpen}
            startingHeight="0"
            w="100%"
            maxHeight={"20rem"}
            display="flex !important"
            flexDirection={"column"}
            position="relative"
            overflow="hidden"
          >
            <GamesWithQueue isOpen={isOpen} />
          </Box>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
}

function NoQueues() {
  return (
    <Box fontSize="1.4rem">
      <Text as="span" color="gray.50">
        no players in queue
      </Text>
    </Box>
  );
}

function GamesWithQueue({ isOpen }) {
  const ChakraSimpleBar = chakra(SimpleBar);

  return (
    <VStack
      width="100%"
      height={!isOpen ? "100%" : "0%"}
      transition={"all 0.1s ease"}
      boxSizing="border-box"
      spacing="0"
      position="relative"
      overflow="hidden"
      bgColor="gray.800"
    >
      <ChakraSimpleBar
        boxSizing="border-box"
        maxHeight={!isOpen ? "20rem" : "0%"}
        borderTop={["2px solid var(--chakra-colors-gray-800)"]}
        style={{
          width: "100%",
          height: "auto",
          overflow: "hidden scroll",
          boxSizing: "border-box",
        }}
      >
        <VStack
          w="100%"
          justifyContent={"flex-start"}
          spacing="1rem"
          px="1rem"
          pt="0.5rem"
          pb="0.5rem"
        >
          <GameQueue />
          <GameQueue />
          <GameQueue />
          <GameQueue />
          <GameQueue />
          <GameQueue />
          <GameQueue />
          <GameQueue />
          <GameQueue />
          <GameQueue />
          <GameQueue />
          <GameQueue />
        </VStack>
      </ChakraSimpleBar>
    </VStack>
  );
}

function GameQueue() {
  return (
    <HStack
      width="100%"
      justifyContent={"flex-start"}
      alignItems={"center"}
      bgColor="gray.300"
      p="0.5rem"
      borderRadius={"1rem"}
    >
      <Image
        // borderRadius={"2rem"}
        // position="absolute"
        width="6.4rem"
        height="6.4rem"
        // height="100%"
        // objectFit={"fill"}
        src={
          "https://cdn.acos.games/file/acospub/g/tictactoe/preview/QGNPJ8.png"
        }
        // fallbackSrc={config.https.cdn + 'placeholder.png'}
        // w="100%"
      />
      <VStack
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        spacing="0.25rem"
        flex="1"
      >
        <Text
          as="span"
          fontSize="1.2rem"
          fontWeight={"bold"}
          color="brand.50"
          wordBreak={"break-all"}
          height="1.4rem"
          display="inline-block"
          overflow="hidden"
        >
          Advanced Tic Tac Toe
        </Text>
        <Text as="span" fontSize="1rem" fontWeight={"medium"} color="gray.20">
          <Text as="span" fontWeight="bold">
            2
          </Text>{" "}
          player(s) waiting
        </Text>
        <HStack w="100%" justifyContent="space-between">
          <Text
            fontSize={["1rem"]}
            fontWeight={"bold"}
            // lineHeight="2rem"
            display="inline-block"
            bgColor="gray.700"
            borderRadius="0.8rem"
            color="gray.0"
            py="0rem"
            px="1rem"
            // h="2rem"
          >
            RANKED
          </Text>
          <Button
            alignSelf={"flex-end"}
            border="3px solid"
            height="3rem"
            borderColor="brand.400"
            color="brand.300"
            borderRadius={"2rem"}
            fontSize="1rem"
            fontWeight="bold"
            transition={"all 0.2s ease"}
            _hover={{
              borderColor: "brand.300",
              color: "gray.900",
              bgColor: "brand.300",
            }}
          >
            JOIN
          </Button>
          {/* <Button
            alignSelf={"flex-end"}
            // border="3px solid"
            height="3rem"
            bgColor="yellow.400"
            border="0"
            color="gray.700"
            borderRadius={"2rem"}
            fontSize="1rem"
            fontWeight="bold"
            transition={"all 0.2s ease"}
            _hover={{
              //   borderColor: "brand.300",
              color: "gray.900",
              bgColor: "brand.300",
            }}
          >
            QUEUED
          </Button> */}
        </HStack>
      </VStack>
    </HStack>
  );
}

import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function WaitingPanel({}) {
  return (
    <VStack w="100%" px={["0.5rem", "2rem"]}>
      <HStack alignItems={"flex-start"} w="100%" mb="1rem">
        <Heading as="h4" fontWeight={"bold"} fontSize="1.6rem" color="gray.0">
          Waiting In Queue
        </Heading>
      </HStack>
      <GamesWithQueue />
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

function GamesWithQueue() {
  return (
    <HStack w="100%" justifyContent={"flex-start"}>
      <GameQueue />
    </HStack>
  );
}

function GameQueue() {
  return (
    <HStack width="100%" justifyContent={"flex-start"} alignItems={"center"}>
      <Image
        // borderRadius={"2rem"}
        // position="absolute"
        width="3.2rem"
        height="3.2rem"
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
        spacing="0"
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
          Tic Tac Toe is a really long name
        </Text>
        <Text as="span" fontSize="1.2rem" fontWeight={"medium"} color="gray.20">
          <Text as="span" fontWeight="bold">
            2
          </Text>{" "}
          player(s)
        </Text>
      </VStack>
      <Button
        border="3px solid"
        height="3rem"
        borderColor="brand.400"
        color="brand.400"
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
    </HStack>
  );
}

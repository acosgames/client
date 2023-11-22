import {
  Box,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Text,
  VStack,
  IconButton,
  chakra,
  Button,
} from "@chakra-ui/react";

import { BsThreeDotsVertical } from "@react-icons";
import config from "../../../config";
import { Link } from "react-router-dom";

const ChakraLink = chakra(Link);

export default function QueueMessage({ game_slug, name, userCount, msgTime }) {
  let filename = "assorted-1-original.webp";

  game_slug = game_slug || "tictactoe";

  return (
    <HStack
      width="100%"
      justifyContent={"flex-start"}
      alignItems={"center"}
      //   bgColor="gray.950"
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
        src={`https://assets.acos.games/g/${game_slug}/preview/QGNPJ8.png`}
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
          color="brand.300"
          wordBreak={"break-all"}
          height="1.4rem"
          display="inline-block"
          overflow="hidden"
        >
          {name}
        </Text>
        <Text as="span" fontSize="1rem" fontWeight={"medium"} color="gray.20">
          <Text as="span" fontWeight="bold">
            {userCount}
          </Text>{" "}
          player(s) waiting
        </Text>
        <HStack w="100%" justifyContent="space-between">
          <Text
            fontSize={["1rem"]}
            fontWeight={"bold"}
            // lineHeight="2rem"
            display="inline-block"
            bgColor="gray.200"
            borderRadius="0.8rem"
            textShadow={"1px 1px 3px var(--chakra-colors-gray-1200)"}
            color="gray.0"
            py="0rem"
            px="1rem"
            // h="2rem"
          >
            RANKED QUEUE
          </Text>
          <Button
            alignSelf={"flex-end"}
            border="3px solid"
            height="3rem"
            borderColor="brand.300"
            color="gray.0"
            borderRadius={"2rem"}
            fontSize="1rem"
            fontWeight="bold"
            transition={"all 0.2s ease"}
            _hover={{
              borderColor: "brand.300",
              color: "gray.1200",
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

import fs from "flatstore";
import Layout from "../layout/Layout.jsx";
import "./IndexPage.scss";
import {
  Image,
  Box,
  Text,
  Heading,
  Flex,
  VStack,
  HStack,
  Center,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import {
  Link,
  useLocation,
  //Link,
  useParams,
} from "react-router-dom";

import MultiplayerBG from "../assets/images/all-games-bg.png";

export default function GamesPage({}) {
  return (
    <Layout>
      <Box w="100%">
        <Box
          //   px={["1rem", "1.5rem", "3rem"]}
          w="100%"
          m={"0 auto"}
          maxWidth={["100%", "90%", "90%", "90%", "90%", "1200px"]}
          position="relative"
        >
          <EggDoodad />
          <MultiplayerList />
          <SinglePlayerList />
        </Box>
      </Box>
    </Layout>
  );
}

function EggDoodad() {
  return (
    <Box
      position="absolute"
      top="0"
      right="-40%"
      transform="rotate(0)"
      display="block"
      width="50%"
      height="100%"
      backgroundColor="brand.300"
      borderRadius="50% 50% 50% 50% / 60% 60% 40% 40%"
    ></Box>
  );
}

function MultiplayerList() {
  return (
    <Box w="100%" minHeight="20rem" position="relative">
      <Heading as="h1" color="gray.0">
        <Text as="span" color="brand.300">
          Multiplayer
        </Text>{" "}
        Games
      </Heading>
      <Heading as="h4" color="gray.50" fontSize="1.6rem" fontWeight="medium">
        Play against other players from around the world. Joining a queue will
        notify users on our Discord.
      </Heading>
    </Box>
  );
}

function SinglePlayerList() {
  return (
    <Box w="100%" minHeight="20rem" position="relative">
      <Heading as="h1" color="gray.0">
        <Text as="span" color="brand.300">
          Single Player
        </Text>{" "}
        Games
      </Heading>
      <Heading as="h4" color="gray.50" fontSize="1.6rem" fontWeight="medium">
        Play ranked or casual matches against other players. Joining a queue
        will notify users on our Discord.
      </Heading>
    </Box>
  );
}

function GameSection() {}

function GameListItem() {}

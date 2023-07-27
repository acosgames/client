import fs from "flatstore";
import Layout from "../layout/Layout.jsx";
import "./GamesPage.scss";
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
  Button,
  Tooltip,
  Icon,
  Grid,
  GridItem,
  Link as ChLink,
  chakra,
  Spacer,
} from "@chakra-ui/react";

import {
  Link,
  useLocation,
  //Link,
  useParams,
} from "react-router-dom";

import { FaPlay, GiBattleAxe, FaUsers } from "@react-icons";
// import MultiplayerBG from "../assets/images/all-games-bg.png";
import { useEffect } from "react";
import { findGames, joinGame } from "../actions/game.js";
import config from "../config";
import { addJoinQueues, findQueue } from "../actions/queue.js";
import { setLastJoinType } from "../actions/room.js";
import { validateLogin } from "../actions/connection.js";

import MultiplayerBG1 from "../assets/images/abs-items/object-1.png";
import MultiplayerBG2 from "../assets/images/abs-items/star.png";

export default function GamesPage({}) {
  useEffect(() => {
    findGames();
  }, []);
  return (
    <Layout>
      <Box w="100%" pt={["6rem", "3rem", "4rem"]}>
        <Box
          //   px={["1rem", "1.5rem", "3rem"]}
          w="100%"
          m={"0 auto"}
          maxWidth={["100%", "100%", "100%", "70%", "80%", "60%"]}
          p={["1rem", "1rem", "1rem"]}
          position="relative"
        >
          {/* <EggDoodad /> */}
          <VStack spacing="1rem" alignItems={"flex-start"} position="relative">
            <MultiplayerList />

            <SinglePlayerList />
          </VStack>
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
      backgroundColor="brand.400"
      borderRadius="50% 50% 50% 50% / 60% 60% 40% 40%"
    ></Box>
  );
}

function MultiplayerList() {
  let [gameLists] = fs.useWatch("gameLists");

  let rankList = gameLists?.rankList || [];
  //   let experimentalList = gameLists?.experimentalList || [];

  return (
    <>
      <VStack
        alignItems={"flex-start"}
        position="relative"
        w="100%"
        h="auto"
        pb={["10rem", "10rem", "10rem"]}
        //mb={["15rem"]}
        _before={{
          content: '""',
          width: "200%",
          height: "150%",
          position: "absolute",
          top: "0rem",
          left: "-10rem",
          transform: "rotate(-4deg)",
          bgColor: "gray.900",
          zIndex: -2,
        }}
      >
        <Image
          src={MultiplayerBG1}
          position="absolute"
          width={["48px", "48px", "64px"]}
          top={["-5%"]}
          right="5%"
          zIndex="-1"
          animation="rotate 30s linear infinite"
        />
        <Heading as="h1" color="gray.0">
          <Text as="span" color="brand.300">
            Multiplayer
          </Text>{" "}
          Games
        </Heading>
        <Heading as="h4" color="gray.50" fontSize="1.8rem" fontWeight="medium">
          Battle against players from around the world to reach Grandmaster.
        </Heading>

        <VStack
          w="100%"
          minHeight="20rem"
          position="relative"
          mt="4rem"
          spacing={["3rem", "1.5rem"]}
          justify={["center", "flex-start"]}
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
            "repeat(5, 1fr)",
          ]}
          gap="2rem"
        >
          {rankList.map((game) => (
            // <GridItem key={"gamelistitem-" + game.game_slug}>
            <GameListItem game={game}></GameListItem>
            // </GridItem>
          ))}
          {/* {rankList.map((game) => (
            <GridItem>
              <GameListItem
                key={"gamelistitem-" + game.game_slug}
                game={game}
              ></GameListItem>
            </GridItem>
          ))} */}
        </VStack>
      </VStack>
    </>
  );
}

function SinglePlayerList() {
  let [gameLists] = fs.useWatch("gameLists");

  let soloList = gameLists?.soloList || [];

  let rankList = gameLists?.rankList || [];
  let bg = (
    <Box
      position="relative"
      left="-8rem"
      w="200%"
      height="100%"
      bgColor="brand.400"
      transform="rotate(-2deg)"
    ></Box>
  );

  return (
    <>
      <VStack
        alignItems={"flex-start"}
        position="relative"
        w="100%"
        h="auto"
        pt={["10rem"]}
        mb={["20rem"]}
        // overflow="hidden"
        _before={{
          content: '""',
          width: "300rem",
          height: "120%",
          position: "absolute",
          top: "0",
          left: "-100rem",
          transform: "rotate(-2deg)",
          bgColor: "gray.800",
          zIndex: -1,
          borderTop: "3rem solid var(--chakra-colors-gray-300)",
          borderBottom: "3rem solid var(--chakra-colors-gray-300)",
        }}
      >
        <Image
          src={MultiplayerBG2}
          position="absolute"
          width="64px"
          top={["5rem", "5rem", "10rem"]}
          right="5%"
          zIndex="-1"
          transform="rotate(30deg)"
          animation="rotate 30s linear infinite"
        />
        <Heading as="h1" color="gray.0">
          <Text as="span" color="brand.300">
            Single Player
          </Text>{" "}
          Games
        </Heading>
        <Heading as="h4" color="gray.50" fontSize="1.8rem" fontWeight="medium">
          Break the daily, monthly, or all-time highscore records.
        </Heading>
        <VStack
          w="100%"
          //   minHeight="20rem"
          position="relative"
          mt="4rem"
          spacing={["3rem", "1.5rem"]}
          justify={["center", "flex-start"]}
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
            "repeat(5, 1fr)",
          ]}
          gap="2rem"
        >
          {soloList.map((game) => (
            // <GridItem w="auto" key={"gamelistitem-" + game.game_slug}>
            <GameListItem game={game}></GameListItem>
            // </GridItem>
          ))}
          {/* {rankList.map((game) => (
            <GridItem>
              <GameListItem
                key={"gamelistitem-" + game.game_slug}
                game={game}
              ></GameListItem>
            </GridItem>
          ))} */}
        </VStack>
      </VStack>
    </>
  );
}

function GameSection() {}

const abbrevNumber = (num) => {
  if (num > 999999) {
    return (num / 1000000.0).toFixed(1) + "M";
  }
  if (num > 999) {
    return (num / 1000.0).toFixed(1) + "k";
  }
  return num;
};

function GameListItem({ game }) {
  var imgUrl = config.https.cdn + "placeholder.png";
  if (game.preview_images && game.preview_images.length > 0)
    imgUrl = `${config.https.cdn}g/${game.game_slug}/preview/${game.preview_images}`;

  let gameName = game.name;
  if (gameName.length > 20) {
    gameName = gameName.substr(0, 20) + "...";
  }

  let gameQueueCount = game.queueCount;

  let gameType = "FFA";
  if (game.maxteams == 0) {
    gameType = "FFA";
  } else if (
    game.maxteams == 1 &&
    game.maxplayers != (game.teams && game.teams[0].maxplayers)
  ) {
    gameType = "Royale";
  } else if (game.maxteams == 1) {
    gameType = "FFA";
  } else if (game.maxteams > 1) {
    gameType = "Teams";
  }

  let inQueue = findQueue(game.game_slug);

  //   const game = props.game;

  const handleJoin = async () => {
    setLastJoinType("rank");

    fs.set("game", game);

    addJoinQueues(game.game_slug, "rank");

    if (!(await validateLogin())) return;

    joinGame(game);
  };

  let StyledLink = chakra(Link);

  return (
    <Box
      w={["100%"]}
      //   maxH={"20rem"}
      bgColor={game.maxplayers > 1 ? "gray.600" : "gray.400"}
      borderRadius="3rem"
      p={["2rem", "1rem"]}
      boxShadow="4px 4px 16px var(--chakra-colors-gray-950)"
      borderBottom="4px solid transparent"
      borderRight="4px solid transparent"
      position="relative"
      _hover={
        {
          // borderColor: " var(--chakra-colors-gray-400)",
          // borderRight: "4px solid var(--chakra-colors-brand-300)",
        }
      }
    >
      <HStack
        spacing="2rem"
        w="100%"
        minHeight="100%"
        alignItems={"flex-start"}
      >
        <StyledLink
          to={"/g/" + game.game_slug}
          display={["none", "inline-block"]}
          w={["7.5rem", "10rem", "12.8rem"]}
          borderRadius="1rem"
          filter="drop-shadow(4px 4px 16px var(--chakra-colors-gray-800))"
          transition="transform 0.2s ease"
          _hover={{
            transform: "scale(1.05) rotate(-2deg)",
          }}
        >
          <Image
            borderRadius="1rem"
            w={["7.5rem", "10rem", "12.8rem"]}
            borderBottom="0"
            alt={gameName}
            src={imgUrl}
          />
        </StyledLink>
        <Flex
          direction="column"
          alignSelf={"center"}
          alignItems={["center", "flex-start"]}
          h="100%"
          //   position="relative"
          //   overflow="hidden"

          w="100%"
          gap={["2rem", "1rem"]}
        >
          <StyledLink
            display={["inline-block", "none"]}
            to={"/g/" + game.game_slug}
            w={["10rem", "10rem", "12.8rem"]}
            borderRadius="1rem"
            filter="drop-shadow(4px 4px 16px var(--chakra-colors-gray-800))"
            transition="transform 0.2s ease"
            _hover={{
              transform: "scale(1.05) rotate(-2deg)",
            }}
          >
            <Image
              w={["10rem", "10rem", "12.8rem"]}
              //   h={["10rem", "10rem", "12.8rem"]}
              borderRadius="1rem"
              borderBottom="0"
              alt={gameName}
              src={imgUrl}
            />
          </StyledLink>
          <VStack
            w="100%"
            minHeight="100%"
            alignItems={["center", "flex-start"]}
          >
            <Heading
              as="h5"
              color="gray.0"
              fontWeight="bold"
              fontSize="2.2rem"
              mr="1rem"
            >
              <StyledLink
                to={"/g/" + game.game_slug}
                _hover={{ color: "brand.300" }}
              >
                {game.name}
              </StyledLink>
            </Heading>

            <Text
              as="h4"
              color="gray.40"
              fontWeight={"medium"}
              fontSize="1.4rem"
              display="inline-block"
              textAlign={["center", "left"]}
            >
              {game.shortdesc}
            </Text>
          </VStack>
          {/* <Spacer /> */}
          <Wrap
            flex="1"
            minHeight="100%"
            justify={["center", "left"]}
            spacing={["1rem"]}
            w="100%"
          >
            <WrapItem>
              <Text
                fontSize={["1.2rem"]}
                fontWeight={"medium"}
                display="inline-block"
                borderRadius="0.8rem"
                bgColor="gray.900"
                color="gray.20"
                px="1rem"
              >
                <Icon
                  as={FaUsers}
                  height="1rem"
                  width="1rem"
                  position="relative"
                  // top="2px"
                  mr="0.5rem"
                />
                {abbrevNumber(game.maxplayers)} player
              </Text>
            </WrapItem>
            <WrapItem>
              <Text
                fontSize={["1.2rem"]}
                fontWeight={"medium"}
                display="inline-block"
                borderRadius="0.8rem"
                bgColor="gray.900"
                color="gray.20"
                px="1rem"
                flex="1"
              >
                <Icon
                  as={GiBattleAxe}
                  height="1rem"
                  width="1rem"
                  mr="0.5rem"
                  position="relative"
                  // top="1px"
                />
                {gameType}
              </Text>
            </WrapItem>
            {/* <WrapItem>
              <Box w={["10rem"]} pb={["0.2rem", "0.5rem"]}>
                <PlayButton inQueue={inQueue} handleJoin={handleJoin} />
              </Box>
            </WrapItem> */}
          </Wrap>
        </Flex>
      </HStack>
    </Box>
  );

  return (
    <Box display="inline-block">
      <VStack alignItems={"flex-start"} spacing={"1rem"}>
        <Link to={"/g/" + game.game_slug} className="game-item-image-link">
          <Image w="100%" h="auto" alt={gameName} src={imgUrl} />
        </Link>
        <VStack alignItems={"flex-start"} spacing="1rem">
          <Heading as="h5" color="gray.0" fontWeight="bold" fontSize="1.6rem">
            {game.name}
          </Heading>
          {/* <Text
            as="p"
            color="gray.50"
            fontWeight={"medium"}
            fontSize="1.2rem"
            display="inline-block"
            height="6.4rem"
          >
            {game.shortdesc}
          </Text> */}

          <HStack alignItems={"flex-start"} w="100%" spacing={["0.5rem"]}>
            <Text
              fontSize={["1rem"]}
              fontWeight={"medium"}
              lineHeight="2rem"
              display="inline-block"
              bgColor="gray.700"
              borderRadius="0.8rem"
              color="gray.0"
              px="0.5rem"
              h="2rem"
            >
              <Icon
                as={FaUsers}
                height="1rem"
                width="1rem"
                position="relative"
                // top="2px"
                mr="0.5rem"
              />
              {abbrevNumber(game.maxplayers)} player
            </Text>

            <Text
              fontSize={["1rem"]}
              fontWeight={"medium"}
              lineHeight="2rem"
              display="inline-block"
              bgColor="gray.700"
              borderRadius="0.8rem"
              color="gray.0"
              px="0.5rem"
              h="2rem"
            >
              <Icon
                as={GiBattleAxe}
                height="1rem"
                width="1rem"
                mr="0.5rem"
                position="relative"
                // top="1px"
              />
              {gameType}
            </Text>
          </HStack>
          {/* <Box w={["100%", "100%"]} pb={["0.2rem", "0.5rem"]}>
            <PlayButton inQueue={inQueue} handleJoin={handleJoin} />
          </Box> */}
        </VStack>
      </VStack>
    </Box>
  );
}

function PlayButton(props) {
  return (
    <>
      <Button
        display={"flex"}
        bgColor="brand.300"
        _hover={{ bg: "brand.300" }}
        _active={{ bg: "brand.300" }}
        boxShadow={`inset 0 1px 3px 0 rgb(255 255 255 / 60%), inset 0 0 3px 5px rgb(0 0 0 / 5%)`}
        mr="0"
        w="5rem"
        h="5rem"
        p="0.5rem"
        borderTopLeftRadius={"9999px"}
        borderBottomLeftRadius={"9999px"}
        borderTopRightRadius={"9999px"}
        borderBottomRightRadius={"9999px"}
        onClick={props.handleJoin}
      >
        <Icon color={"white"} ml={0} fontSize="12px" as={FaPlay} />
      </Button>
    </>
  );
}

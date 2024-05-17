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

import { FaPlay } from "react-icons/fa";
// import MultiplayerBG from "../assets/images/all-games-bg.png";
import { useEffect } from "react";
import { findGames, joinGame } from "../actions/game.js";
import config from "../config";
import { addJoinQueues, findQueue } from "../actions/queue.js";
import { setLastJoinType } from "../actions/room.js";
import { validateLogin } from "../actions/connection.js";

import MultiplayerBG1 from "../assets/images/abs-items/object-1.png";
import MultiplayerBG2 from "../assets/images/abs-items/star.png";
import { btGameLists } from "../actions/buckets.js";
import { useBucket } from "../actions/bucket.js";

const ChakraLink = chakra(Link);

export default function GamesPage({}) {
    useEffect(() => {
        findGames();
    }, []);
    return (
        <Box w="100%" pt={["1rem", "3rem", "3rem"]}>
            <Box
                //   px={["1rem", "1.5rem", "3rem"]}

                m={"0 auto"}
                w={["100%", "100%", "100%", "100%", "1000px"]}
                p={["1rem", "1rem", "1rem"]}
                px={["1rem", "1rem", "1rem", "3rem"]}
                position="relative"
            >
                {/* <EggDoodad /> */}
                <VStack
                    w="100%"
                    spacing="1rem"
                    alignItems={"flex-start"}
                    position="relative"
                >
                    <MultiplayerList />

                    <SinglePlayerList />
                </VStack>
            </Box>
        </Box>
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
    let gameLists = useBucket(btGameLists);

    let rankList = gameLists?.rankList || [];
    //   let experimentalList = gameLists?.experimentalList || [];

    return (
        <>
            <VStack
                alignItems={"flex-start"}
                position="relative"
                w="100%"
                h="auto"
                // pb={["10rem", "10rem", "10rem"]}
            >
                <Heading as="h1" color="gray.0">
                    <Text as="span" color="brand.300">
                        Multiplayer
                    </Text>{" "}
                    Games
                </Heading>
                <Heading
                    as="h4"
                    color="gray.50"
                    fontSize="1.8rem"
                    fontWeight="medium"
                >
                    Battle against players from around the world and improve
                    yourself.
                </Heading>
                <GameList list={rankList} />
            </VStack>
        </>
    );
}

function GameList({ list }) {
    // list = list.concat(list).concat(list).concat(list);
    return (
        <Grid
            w="100%"
            minHeight="20rem"
            position="relative"
            spacing={["2rem", "1.5rem"]}
            flexDir={["column", "column", "row"]}
            // justify={["flex-start", "flex-start"]}
            templateColumns={[
                "repeat(2, 1fr)",
                "repeat(3, 1fr)",
                "repeat(4, 1fr)",
                "repeat(4, 1fr)",
                "repeat(5, 1fr)",
                "repeat(5, 1fr)",
            ]}
            gap={["1rem", "1rem", "1rem", "2rem"]}
        >
            {list.map((game, i) => (
                <GridItem
                    key={"gamelistitem-" + game.game_slug + i}
                    className="gamelistitem section"
                    overflow="hidden"
                    mt="2rem"
                    //width={["42vw", "18vw", "20vw", "15vw", "10vw"]}
                >
                    <GameListItem game={game}></GameListItem>
                </GridItem>
            ))}
            {/* {rankList.map((game) => (
    <GridItem>
      <GameListItem
        key={"gamelistitem-" + game.game_slug}
        game={game}
      ></GameListItem>
    </GridItem>
  ))} */}
        </Grid>
    );
}

function SinglePlayerList() {
    let gameLists = useBucket(btGameLists);

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
                pt={["6rem"]}
                mb={["8rem"]}
            >
                <Heading as="h1" color="gray.0">
                    <Text as="span" color="brand.300">
                        Solo
                    </Text>{" "}
                    Games
                </Heading>
                <Heading
                    as="h4"
                    color="gray.50"
                    fontSize="1.8rem"
                    fontWeight="medium"
                >
                    Break the daily, monthly, or all-time highscore records.
                </Heading>
                <GameList list={soloList} />
            </VStack>
        </>
    );
}

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

        btGame.set(game);

        addJoinQueues(game.game_slug, "rank");

        if (!(await validateLogin())) return;

        joinGame(game);
    };

    return (
        <Box display="inline-block" w="100%">
            <VStack alignItems={"flex-start"} spacing={"0.5rem"} w="100%">
                <ChakraLink
                    to={"/g/" + game.game_slug}
                    className="game-item-image-link"
                >
                    <Image w="100%" h="auto" alt={gameName} src={imgUrl} />
                </ChakraLink>
                <VStack alignItems={"flex-start"} spacing="0.5rem" width="100%">
                    <Heading
                        as="h5"
                        color="gray.0"
                        fontWeight="bold"
                        fontSize={[
                            "1.2rem",
                            "1.2rem",
                            "1.2rem",
                            "1.2rem",
                            "1.4rem",
                        ]}
                        textOverflow={"ellipsis"}
                        overflow="hidden"
                        maxWidth={["100%"]}
                        whiteSpace="nowrap"
                        title={game.name}
                    >
                        {game.name}
                    </Heading>
                    <HStack
                        alignItems={"flex-start"}
                        w="100%"
                        spacing={["0.5rem"]}
                    >
                        <Text
                            fontSize={["1rem", "1.2rem", "1.2rem"]}
                            fontWeight={"medium"}
                            lineHeight="2rem"
                            display="inline-block"
                            bgColor="gray.700"
                            borderRadius="0.8rem"
                            color="gray.40"
                            px="0.5rem"
                            h="2rem"
                        >
                            {/* <Icon
                as={FaUsers}
                height={["0.8rem", "1rem", "1rem"]}
                width={["0.8rem", "1rem", "1rem"]}
                position="relative"
                top="1px"
                mr="0.5rem"
              /> */}
                            {abbrevNumber(game.maxplayers)} player
                        </Text>

                        <Text
                            fontSize={["1rem", "1.2rem", "1.2rem"]}
                            fontWeight={"medium"}
                            lineHeight="2rem"
                            display="inline-block"
                            bgColor="gray.700"
                            borderRadius="0.8rem"
                            color="gray.40"
                            px="0.5rem"
                            h="2rem"
                        >
                            {/* <Icon
                as={GiBattleAxe}
                height={["0.8rem", "1rem", "1rem"]}
                width={["0.8rem", "1rem", "1rem"]}
                mr="0.5rem"
                position="relative"
                top="1px"
              /> */}
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

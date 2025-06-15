import { Box, Flex, HStack, Heading, Icon, Image, Text, VStack, chakra } from "@chakra-ui/react";
import { useEffect, useRef, useState, memo } from "react";

import SimpleBar from "simplebar-react";
import { findGamePanelByRoom, getPrimaryGamePanel } from "../../../actions/room";

// import ratingconfig from "shared/util/ratingconfig";
// import config from "../../../config";

import { motion, AnimatePresence } from "framer-motion";
import RenderPlayer from "./RenderPlayer.jsx";
import { compareStringified, useBucket, useBucketSelector } from "../../../actions/bucket";
import { btGamePanels, btPrimaryGamePanel } from "../../../actions/buckets";
const ChakraSimpleBar = chakra(SimpleBar);
const MotionVStack = motion(VStack);

export default function Scoreboard({}) {
    const scrollRef = useRef();

    return (
        <VStack
            w="100%"
            h={["100%"]}
            spacing="0"
            position="relative"
            // overflow="hidden"
            flex="1"
            // mb="0.5rem"
            // pt="0.5rem"
            // px="0.5rem"
            mb="1rem"
        >
            <VStack
                width="100%"
                height={"100%"}
                transition={"all 0.3s ease"}
                boxSizing="border-box"
                spacing="0rem"
                position="relative"
                // overflow="hidden"
                gap="0"
                flex="1"
                mb="0"
                pb="0"
                borderRadius={"8px"}
                border="1px solid"
                zIndex="2"
                borderColor="gray.925"
                // bgColor="gray.900"
                // boxShadow="inset 0 0px 6px var(--chakra-colors-gray-1000), inset 0 0px 2px var(--chakra-colors-gray-1000), inset 0 0px 4px var(--chakra-colors-gray-1000)"
            >
                <ChakraSimpleBar
                    boxSizing="border-box"
                    flex="1"
                    w="100%"
                    p="0"
                    // borderTop={["2px solid var(--chakra-colors-gray-800)"]}
                    style={{
                        width: "100%",
                        height: "auto",
                        flex: "1",
                        overflow: "visible scroll",
                        boxSizing: "border-box",
                    }}
                    scrollableNodeProps={{ ref: scrollRef }}
                >
                    <RenderPlayers />
                </ChakraSimpleBar>
            </VStack>
        </VStack>
    );
}

export function RenderPlayers({ room_slug }) {
    // const [parent, enableAnimations] = useAutoAnimate();
    let primary = null;
    let id = 0;

    if (!room_slug) {
        primary = getPrimaryGamePanel();
        id = primary?.id;
        room_slug = primary.room_slug;
    } else {
        primary = findGamePanelByRoom(room_slug);
        id = primary?.id;
    }

    // let primaryId = useBucketSelector(btGamePanels, (bucket) => bucket[id]);

    let [sort, setSorted] = useState(false);

    // useEffect(() => {
    //   enableAnimations(true);
    // }, []);

    if (!primary || !primary.gamestate) return <></>;

    let gamestate = primary.gamestate;
    let players = gamestate.players;
    let teams = gamestate.teams;

    if (teams) {
        return (
            <VStack
                w="100%"
                p="0.5rem"
                // spacing="0.25rem"
            >
                <Heading
                    display={primary.room.isReplay ? "none" : "block"}
                    as="h5"
                    fontSize="1.4rem"
                    color="gray.10"
                    fontWeight="300"
                    pt="0.5rem"
                >
                    {primary?.room?.name || "Unknown game"}
                </Heading>
                {/* <HStack w="100%" lineHeight="1rem">
                    <Box h="1px" flex="1"></Box>
                    <Text
                        as="span"
                        color="gray.75"
                        fontWeight="200"
                        fontSize="1rem"
                        letterSpacing={"1px"}
                        pr="1rem"
                    >
                        Score
                    </Text>
                </HStack> */}
                <AnimatePresence>
                    <RenderTeams gamepanel={primary} players={players} teams={teams} />
                </AnimatePresence>
            </VStack>
        );
    }

    let playerElems = [];
    let playerList = Object.keys(players || {});

    //sort from highest to lowest
    playerList.sort((a, b) => {
        let playerA = players[a];
        let playerB = players[b];
        if (playerA.score == playerB.score) {
            if (sort) return playerB.displayname?.localeCompare(playerA.displayname);
            return playerA.displayname?.localeCompare(playerB.displayname);
        }

        if (sort) return playerA.score - playerB.score;

        return playerB.score - playerA.score;
    });

    //render the players
    for (let i = 0; i < playerList.length; i++) {
        let shortid = playerList[i];
        let player = players[shortid];

        playerElems.push(player);
    }

    return (
        <VStack
            w="100%"
            p="0.5rem"
            // spacing="0.5rem"
            pt="0.5rem"
            onClick={() => {
                setSorted(!sort);
            }}
        >
            <Heading
                display={primary.room.isReplay ? "none" : "block"}
                as="h5"
                fontSize="1.5rem"
                color="gray.20"
                fontWeight="600"
                pt="0.5rem"
            >
                {primary?.room?.name || "Unknown game"}
            </Heading>
            <AnimatePresence>
                {/* <LayoutGroup> */}
                {playerElems.map((player) => (
                    <RenderPlayer
                        gamepanel={primary}
                        key={primary.room.replayId + player.displayname}
                        {...player}
                    />
                ))}
                {/* </LayoutGroup> */}
            </AnimatePresence>
        </VStack>
    );
}

const sortTeamByScore = (teams) => (a, b) => {
    let teamA = teams[a];
    let teamB = teams[b];
    if (teamA.score == teamB.score) {
        return teamA.name.localeCompare(teamB.name);
    }

    return teamB.score - teamA.score;
};

function RenderTeams({ gamepanel, players }) {
    // let teamList = Object.keys(teams);
    let teamElems = [];

    let teams = useBucketSelector(btGamePanels, (panels) => panels[gamepanel.id]?.gamestate?.teams);

    // let isUpdated = useBucketSelector(btGamePanels, (panels) => Date.now());

    let teamList = Object.keys(teams || []);
    if (!teamList) return <></>;

    teamList.sort(sortTeamByScore(teams));
    // if (teams) teams[teamList[0]].score = 10;

    // teamList.sort((a, b) => {
    //   let teamA = teams[a];
    //   let teamB = teams[b];
    //   if (teamA.score == teamB.score) {
    //     return teamA.name.localeCompare(teamB.name);
    //   }

    //   return teamB.score - teamA.score;
    // });

    for (let i = 0; i < teamList.length; i++) {
        let team_slug = teamList[i];
        let team = teams[team_slug];

        teamElems.push(
            <RenderTeam
                gamepanel={gamepanel}
                key={"renderteams-" + team_slug + gamepanel.room.replayId}
                team={team}
                players={players}
            />
        );
    }

    return teamElems;
}

function RenderTeam({ gamepanel, players, team }) {
    let playerElems = [];

    team.players.sort((a, b) => {
        let playerA = players[a];
        let playerB = players[b];
        if (playerA.score == playerB.score) {
            if (sort) return playerB.displayname.localeCompare(playerA.displayname);
            return playerA.displayname.localeCompare(playerB.displayname);
        }

        if (sort) return playerA.score - playerB.score;

        return playerB.score - playerA.score;
    });

    for (let i = 0; i < team.players.length; i++) {
        let shortid = team.players[i];
        let player = players[shortid];
        playerElems.push(
            <RenderPlayer
                gamepanel={gamepanel}
                key={gamepanel.room.replayId + "renderteam-player-" + shortid}
                shortid={shortid}
                {...player}
                team={team}
            />
        );
    }

    return (
        <MotionVStack
            // layout
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            w="100%"
            spacing="0"
            mb="1rem"
            alignItems={"flex-start"}
        >
            <Text
                w="100%"
                // bgColor="gray.1200"
                pl="0.5rem"
                as="span"
                fontWeight="300"
                lineHeight={"1.4rem"}
                pb="0.5rem"
                // color="gray.10"
                fontSize="1.6rem"
                color="gray.10"
                borderBottom={`2px solid ${team.color}`}

                // color={team.color}
                // opacity="0.7"
                // textShadow={team.color ? '0 0 3px ' + team.color : ''}
            >
                {team.name}
            </Text>
            <Box
                w="100%"
                pt="0.5rem"
                // borderRight={team ? "2px solid" : ''}
                // borderRightColor={team ? team.color : ''}>
            >
                {playerElems}
            </Box>
        </MotionVStack>
    );
}

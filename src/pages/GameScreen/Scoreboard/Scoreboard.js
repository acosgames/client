import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";
import { useEffect, useRef, useState, memo } from "react";
import fs from "flatstore";
import SimpleBar from "simplebar-react";
import { getPrimaryGamePanel } from "../../../actions/room";

import ratingtext from "shared/util/ratingtext";
import config from "../../../config";

import { motion, AnimatePresence } from "framer-motion";
import RenderPlayer from './RenderPlayer';
export default function Scoreboard({ }) {
  const scrollRef = useRef();
  const ChakraSimpleBar = chakra(SimpleBar);

  return (
    <VStack
      w="100%"
      h={["100%"]}
      spacing="0"
      position="relative"
      overflow="hidden"
      flex="1"
      // mb="0.5rem"
      // pt="0.5rem"
      px="0.5rem"
      mb="1rem"
    >
      <VStack
        width="100%"
        height={"100%"}
        transition={"all 0.3s ease"}
        boxSizing="border-box"
        spacing="0rem"
        position="relative"
        overflow="hidden"
        flex="1"
        mb="0"
        pb="0"
        borderRadius={"8px"}
        border="1px solid"
        zIndex="2"
        borderColor="gray.925"
        bgColor="gray.900"
        boxShadow="inset 0 0px 6px var(--chakra-colors-gray-1000), inset 0 0px 2px var(--chakra-colors-gray-1000), inset 0 0px 4px var(--chakra-colors-gray-1000)"
      >
        <ChakraSimpleBar
          boxSizing="border-box"
          flex="1"
          // borderTop={["2px solid var(--chakra-colors-gray-800)"]}
          style={{
            width: "100%",
            height: "auto",
            flex: "1",
            overflow: "hidden scroll",
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

function RenderPlayers({ }) {
  // const [parent, enableAnimations] = useAutoAnimate();
  let [primaryId] = fs.useWatch("primaryGamePanel");
  let [primaryPlayers] = fs.useWatch("primary/players");
  let primary = getPrimaryGamePanel();

  let [sort, setSorted] = useState(false);

  // useEffect(() => {
  //   enableAnimations(true);
  // }, []);

  if (!primary) return;

  let gamestate = primary.gamestate;
  let players = gamestate.players;
  let teams = gamestate.teams;

  if (teams) {
    return (
      <VStack w="100%" p="0.25rem" spacing="0rem">
        <Heading as="h5" fontSize="1.6rem" pt="0.5rem">
          {primary?.room?.name || "Unknown game"}
        </Heading>
        <HStack w="100%">
          <Box h="1px" flex="1"></Box>
          <Text as="span" color="gray.300" fontSize="1.2rem" pr="1rem">Score</Text>
        </HStack>
        <AnimatePresence>
          <RenderTeams players={players} teams={teams} />
        </AnimatePresence>
      </VStack>
    );
  }

  let playerElems = [];
  let playerList = Object.keys(players);

  //sort from highest to lowest
  playerList.sort((a, b) => {
    let playerA = players[a];
    let playerB = players[b];
    if (playerA.score == playerB.score) {
      if (sort) return playerB.name.localeCompare(playerA.name);
      return playerA.name.localeCompare(playerB.name);
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
      p="0.25rem"
      spacing="0.5rem"
      pt="0.5rem"
      onClick={() => {
        setSorted(!sort);
      }}
    >
      <Heading as="h5" fontSize="1.6rem" py="0.5rem">
        {primary?.room?.name || "Unknown game"}
      </Heading>
      <AnimatePresence>
        {/* <LayoutGroup> */}
        {playerElems.map((player) => (
          <RenderPlayer key={player.name} {...player} />
        ))}
        {/* </LayoutGroup> */}
      </AnimatePresence>
    </VStack>
  );
}

function RenderTeams({ players, teams }) {
  let teamList = Object.keys(teams);
  let teamElems = [];

  teamList.sort((a, b) => {
    let teamA = teams[a];
    let teamB = teams[b];
    if (teamA.score == teamB.score) {
      return teamA.name.localeCompare(teamB.name);
    }

    return teamB.score - teamA.score;
  });

  for (let i = 0; i < teamList.length; i++) {
    let team_slug = teamList[i];
    let team = teams[team_slug];

    teamElems.push(
      <RenderTeam
        key={"renderteams-" + team_slug}
        team={team}
        players={players}
      />
    );
  }

  return teamElems;
}

function RenderTeam({ players, team }) {
  let playerElems = [];
  for (let i = 0; i < team.players.length; i++) {
    let shortid = team.players[i];
    let player = players[shortid];
    playerElems.push(
      <RenderPlayer
        key={"renderteam-player-" + shortid}
        shortid={shortid}
        {...player}
        team={team}
      />
    );
  }

  return (
    <VStack w="100%" spacing="0" pb="0.5rem" alignItems={"flex-start"} >
      <Text w="100%" bgColor="gray.1200" pl="0.5rem" as="span" fontWeight="300" py="0.5rem"
        borderRight={team ? "2px solid" : ''}
        borderRightColor={team ? team.color : ''}
        color={team.color}
      // textShadow={team.color ? '0 0 3px ' + team.color : ''}
      >
        {team.name}
      </Text>
      {playerElems}
    </VStack>
  );
}

import {
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";
import { useEffect, useRef, useState, memo } from "react";
import fs from "flatstore";
import SimpleBar from "simplebar-react";
import { getPrimaryGamePanel } from "../../actions/room";

import ratingtext from "shared/util/ratingtext";
import config from "../../config";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

export default function Scoreboard({}) {
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

function RenderPlayers({}) {
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
      <VStack w="100%" p="0.25rem" spacing="0.5rem">
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
      />
    );
  }

  return (
    <VStack w="100%" py="1rem">
      <Text as="span">{team.name}</Text>
      {playerElems}
    </VStack>
  );
}

const RenderPlayer = ({ name, portraitid, rating, countrycode, score }) => {
  let filename = `assorted-${portraitid || 1}-thumbnail.webp`;
  let ratingClass = ratingtext.ratingToRank(rating);

  let [primaryId] = fs.useWatch("primary/players");

  const HStackMotion = motion(HStack);
  return (
    <motion.div
      key={"motion-" + name}
      // initial={{ opacity: 0, scale: 0 }}
      // animate={{ opacity: 1, scale: 1 }}
      // exit={{ opacity: 0, scale: 0 }}
      layout
      style={{ width: "100%" }}
    >
      <HStack
        w="100%"
        spacing="1rem"
        // justifyContent={"flex-start"}
        // alignItems={"flex-start"}
        bgColor="gray.800"
        clipPath="polygon(100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 0)"
      >
        <Image
          display="inline-block"
          src={`${config.https.cdn}images/portraits/${filename}`}
          loading="lazy"
          borderRadius={"8px"}
          maxHeight="100%"
          w="5.5rem"
          // mb="1rem"
          position="relative"
          zIndex="2"
          // border="1px solid"
          // borderColor={player.ready ? "brand.100" : "brand.900"}
        />
        <VStack
          w="100%"
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          spacing="0"
          pr="0.5rem"
          flex="1"
        >
          <HStack w="100%">
            <Text
              as="span"
              textAlign={"center"}
              color="gray.0"
              fontWeight="600"
              fontSize={["1.4rem"]}
              maxW={["19rem"]}
              overflow="hidden"
              whiteSpace={"nowrap"}
              textOverflow={"ellipsis"}
            >
              {name}
            </Text>
            <Image
              src={`${config.https.cdn}images/country/${countrycode}.svg`}
              // mt="0.5rem"
              borderColor="gray.100"
              borderRadius="0px"
              width="2rem"
              filter="opacity(0.8)"
            />
          </HStack>
          <HStack
            spacing="1rem"
            alignSelf={"flex-start"}
            justifyContent={"flex-start"}
            w="100%"
            // w="20rem"
          >
            <VStack alignItems={"flex-start"} w="8rem">
              <Text
                as="span"
                color="gray.100"
                fontWeight="500"
                fontSize="1.2rem"
                lineHeight={"1.0rem"}
                //   textShadow={"0 2px 3px black,0 2px 6px var(--chakra-colors-gray-900)"}
              >
                Class {ratingClass}
              </Text>
              {/* <Text
              as="span"
              color="gray.100"
              fontWeight="500"
              fontSize="1.2rem"
              lineHeight={"1.3rem"}
              //   textShadow={"0 2px 3px black,0 2px 6px var(--chakra-colors-gray-900)"}
            >
              {player.rating}
            </Text> */}
            </VStack>
          </HStack>
          <HStack
            position="relative"
            top="-1rem"
            h="100%"
            w="100%"
            justifyContent={"flex-end"}
            alignItems={"center"}
            pr="1rem"
          >
            <Text as="span" fontSize="1.6rem">
              {score}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </motion.div>
  );
};

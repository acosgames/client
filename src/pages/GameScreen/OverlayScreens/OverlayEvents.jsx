import {
  Box,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import fs from "flatstore";
import config from "../../../config";
import {
  getGamePanel,
  getGamePanels,
  getPrimaryGamePanel,
  getRoomStatus,
} from "../../../actions/room";
import { memo, useEffect, useState } from "react";
import ratingconfig from "shared/util/ratingconfig";
import { FaCheck } from "@react-icons";

import LeftPlayer from "./LeftPlayer";
import RightPlayer from "./RightPlayer";
import PregameTimer from "./PregameTimer";
import { BottomHalf, TopHalf, Vs } from "./Vs";
import CompactPlayer from "./CompactPlayer";
import { AnimatePresence, motion } from "framer-motion";
import ModalGameOver from "./ModalGameOver";

fs.set("showPregameOverlay", null);
/**
 * Displays on:
 * - Game Joined (status == pregame or starting)
 * Hides on:
 * - Game Start
 * - Forfeit
 * @param {*} param0
 * @returns
 */

export default function OverlayEvents({ gamepanelid, layoutRef }) {
  // let [primaryId] = fs.useWatch("primaryGamePanel");
  // let [gamepanel] = fs.useWatch("gamepanel/" + gamepanelid);

  let [showPregameOverlay] = fs.useWatch("showPregameOverlay");

  // let [gamestatus] = fs.useWatch("gamestatus/" + showPregameOverlay);
  let gamepanel = getGamePanel(showPregameOverlay);

  if (showPregameOverlay == null || !gamepanel)
    return <AnimatePresence></AnimatePresence>;

  if (gamepanel.room.maxplayers == 1) {
    return <AnimatePresence></AnimatePresence>;
  }
  // if (!gamepanel) return [];

  // const room = gamepanel.room;
  // const room_slug = room.room_slug;
  // const game_slug = room.game_slug;
  // const mode = room.mode;

  let timeleft = fs.get("timeleft/" + gamepanel.id) || 0;
  timeleft = Math.ceil(timeleft / 1000);

  // let game = fs.get('games>' + game_slug) || {};
  let gamestate = gamepanel.gamestate; // fs.get('gamestate') || {};
  let events = gamestate?.events;
  let players = gamestate.players;
  let teams = gamestate.teams;

  if (!players) {
    return <AnimatePresence></AnimatePresence>;
  }

  let status = gamestate.room.status;
  let isGamestart = status == "gamestart";
  let isGameover = status == "gameover" || events?.gameover;
  // let elems = [];

  // if (isGameover || gamepanel.forfeit) {
  // elems.push(

  // );
  // elems.push(
  //   <motion.div
  //     key={"overlay-gameover-mask"}
  //     initial={{ opacity: 0 }}
  //     animate={{ opacity: 1 }}
  //     exit={{ opacity: 0 }}
  //     transition={{ duration: 0.3 }}
  //     style={{
  //       backgroundColor: "gray.925",
  //       width: "100%",
  //       height: "100%",
  //       position: "absolute",
  //       zIndex: 111,
  //     }}
  //   >
  //   </motion.div>
  // );
  // } else if (isGamestart) {
  // } else {
  // elems.push(

  // );
  // elems.push(

  // );
  // }
  const onClickMessage = () => {};

  // return <>{elems}</>;
  return (
    <AnimatePresence>
      <motion.div
        key={"overlay-gamestart"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: "var(--chakra-colors-gray-925)",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 112,
        }}
      >
        <Box
          display={"block"}
          width={"100%"}
          height="100%"
          position="relative"
          color="gray.100"
        >
          <OverlayPregame
            gamepanel={gamepanel}
            players={players}
            teams={teams}
            status={status}
          />
        </Box>
      </motion.div>
      <motion.div
        key={"overlay-gamestart-mask"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: "var(--chakra-colors-gray-925)",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 111,
        }}
      >
        {/* <Box w="100%" h="100%" bgColor="gray.925"></Box> */}
      </motion.div>
    </AnimatePresence>
  );
}

const MotionBox = motion(Box);
// const MotionMemo = memo(
//   ({ gamepanel, players, teams, status }) => (

//   ),
//   (prev, next) => prev.gamepanel == next.gamepanel && prev.status == next.status
// );
const MotionVStack = motion(VStack);
function OverlayGameOver({ gamepanel, players, teams, status }) {
  return (
    <ModalGameOver
      gamepanel={gamepanel}
      players={players}
      teams={teams}
      status={status}
    />
  );
  return (
    <MotionVStack
      position="relative"
      zIndex={101}
      top="1rem"
      left="50%"
      transform="translate(-50%,0)"
      w="90%"
      h="100%"
      border="0"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="gray.1200"
      initial={{ width: 0 }}
      animate={{ width: "90%" }}
      transition={{
        duraton: 1,
      }}
      opacity="0.95"
      bg="linear-gradient(to top, var(--chakra-colors-gray-1000), var(--chakra-colors-gray-825))"
    >
      <Heading
        as="h5"
        fontSize="3rem"
        color="gray.0"
        textShadow="0 0 4px white, 0 0 4px white"
      >
        WINNER BY FORFEIT
      </Heading>
    </MotionVStack>
  );
}

/**
 * Overlay Pregame Scenarios
 * - 1 vs 1 (with / without team setup)
 * - N vs N (team setup, up to 6 on each team)
 * - N vs N (team setup, no player limit)
 * - N vs ALL (team setup)
 * - N vs N vs N vs ... (team setup)
 * - Free For All
 * @param {*} param0
 * @returns
 */

function OverlayPregame({ gamepanel, players, teams, status }) {
  let room = gamepanel?.room;
  if (room && room.maxplayers > 2) {
    return (
      <PregameFFA
        gamepanel={gamepanel}
        players={players}
        teams={teams}
        status={status}
      />
    );
  }
  if (Object.keys(players).length == 2) {
    return (
      <PregameVs2
        gamepanel={gamepanel}
        players={players}
        teams={teams}
        status={status}
      />
    );
  }

  return <HStack></HStack>;
}

function PregameFFA({ gamepanel, players, teams, status }) {
  let playersList = Object.keys(players);
  let leftPlayer = playersList[0];
  let rightPlayer = playersList[1];

  let imgUrl = config.https.cdn + "placeholder.png";
  if (gamepanel.room.preview_images && gamepanel.room.preview_images.length > 0)
    imgUrl = `${config.https.cdn}g/${gamepanel.room.game_slug}/preview/${gamepanel.room.preview_images}`;

  const MotionImage = motion(Image);
  return (
    // <AnimatePresence>
    <Box
      width="100%"
      height="100%"
      justifyContent={"center"}
      alignItems={"center"}
      // templateColumns={"0.5% 35% 10rem 35%"}
      rowGap={"1rem"}
      fontWeight="100"
      position="relative"
      // bgColor="rgba(0,0,0,0.9)"
      filter="opacity(0)"
      animation="fadeIn 0.3s forwards"
      bg={`url("${config.https.cdn}acos-logo-background-repeat7.png") top 3rem left, linear-gradient(to bottom, var(--chakra-colors-gray-900), var(--chakra-colors-gray-1000))`}
    >
      <PregameTimer gamepanel={gamepanel} status={status} />
      <CompetitiveHeading />
      {/* <GameName name={gamepanel?.room?.name || "a game"} /> */}
      <VStack
        position="absolute"
        top="0"
        left="0"
        w={["100%", "100%", "100%", "100%"]}
        pt="6rem"
        // h="50%"
        zIndex="5"
        justifyContent={["center"]}
        alignItems={["center"]}
        // pl={["1rem", "1rem", "4rem", "4rem"]}
        // pb={["4rem", "4rem", "4rem", "4rem"]}
        pl={["0", "1rem", "2rem", "0"]}
      >
        <VStack w={["95%", "90%", "90%", "70%"]} spacing="0.5rem">
          {playersList.map((shortid, index) => (
            <CompactPlayer
              key={"ffa-loading-" + shortid}
              player={players[shortid]}
              index={index}
              delay={0.3}
            />
          ))}
        </VStack>
      </VStack>
    </Box>
    // </AnimatePresence>
  );
}

function PregameVs2({ gamepanel, players, teams, status }) {
  //   let filename = "assorted-" + user.portraitid + "-original.webp";

  let playersList = Object.keys(players);
  let leftPlayer = playersList[0];
  let rightPlayer = playersList[1];

  return (
    <Box
      width="100%"
      height="100%"
      justifyContent={"center"}
      alignItems={"center"}
      // templateColumns={"0.5% 35% 10rem 35%"}
      rowGap={"1rem"}
      fontWeight="100"
      position="relative"
      // bgColor="rgba(0,0,0,1)"
      filter="opacity(0)"
      animation="fadeIn 0.3s forwards"
    >
      <TopHalf />
      <BottomHalf />

      <PregameTimer gamepanel={gamepanel} status={status} />

      <CompetitiveHeading />
      <VStack
        position="absolute"
        top="0"
        left="0"
        w={["100%", "100%", "100%", "60%"]}
        h="50%"
        zIndex="5"
        justifyContent={["center", "center", "center", "center"]}
        alignItems={["flex-start", "flex-start", "flex-start", "center"]}
        // pl={["1rem", "1rem", "4rem", "4rem"]}
        // pb={["4rem", "4rem", "4rem", "4rem"]}
        pl={["1rem", "10%", "2rem", "0"]}
      >
        <LeftPlayer
          shortid={leftPlayer}
          isLeft={true}
          gamepanelid={gamepanel.id}
        />
      </VStack>
      <Vs status={status} />
      <VStack
        position="absolute"
        bottom="0"
        right="0"
        w={["100%", "100%", "100%", "60%"]}
        h="50%"
        zIndex="5"
        justifyContent={["center", "center", "center", "center"]}
        alignItems={["flex-end", "flex-end", "flex-end", "center"]}
        pr={["1rem", "10%", "2rem", "0"]}
        pl={[0, 0, 0, "4rem"]}
        // pr={["1rem", "1rem", "4rem", "4rem"]}
        // pt={["4rem", "4rem", "4rem", "4rem"]}
      >
        <LeftPlayer shortid={rightPlayer} gamepanelid={gamepanel.id} />
      </VStack>
      {/* <GameName name={gamepanel?.room?.name || "a game"} /> */}
    </Box>
  );
}

function GameName({ name }) {
  return (
    <MotionBox
      position="absolute"
      top="1rem"
      left="1rem"
      // transform="translate(-50%,0)"
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Text as="span" color="gray.200" fontSize="1.6rem" fontWeight="500">
        Playing {name || "a game"}
      </Text>
    </MotionBox>
  );
}
function CompetitiveHeading({}) {
  return (
    <MotionBox
      position="absolute"
      bottom="0"
      left="0"
      zIndex="1"
      // transform="translate(-50%,0)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
    >
      <Heading
        as="h1"
        color="gray.60"
        letterSpacing={"-2px"}
        lineHeight="5rem"
        fontSize={["5rem"]}
        fontWeight="500"
        fontStyle={"italic"}
        background="linear-gradient(to bottom,  var(--chakra-colors-gray-30) 60%, var(--chakra-colors-gray-800))"
        backgroundClip="text"
        // textFillColor="transparent"
        className="versusText"
        pr="1rem"
      >
        COMPETITIVE
      </Heading>
    </MotionBox>
  );
}

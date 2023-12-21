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
  getPrimaryGamePanel,
  getRoomStatus,
} from "../../../actions/room";
import { memo, useEffect, useState } from "react";
import ratingtext from "shared/util/ratingtext";
import { FaCheck } from "@react-icons";

import LeftPlayer from "./LeftPlayer";
import RightPlayer from "./RightPlayer";
import PregameTimer from "./PregameTimer";
import { BottomHalf, TopHalf, Vs } from "./Vs";
import CompactPlayer from "./CompactPlayer";
import { AnimatePresence, motion } from "framer-motion";

export default function OverlayEvents({ gamepanelid, layoutRef }) {
  let [gamepanel] = fs.useWatch("gamepanel/" + gamepanelid);
  // let gamepanel = getGamePanel(gamepanelid);
  const [hide, setHide] = useState(false);

  if (!gamepanel) return <></>;

  const room = gamepanel.room;
  const room_slug = room.room_slug;
  const game_slug = room.game_slug;
  const mode = room.mode;

  let timeleft = fs.get("timeleft/" + gamepanel.id) || 0;
  timeleft = Math.ceil(timeleft / 1000);

  // let game = fs.get('games>' + game_slug) || {};
  let gamestate = gamepanel.gamestate; // fs.get('gamestate') || {};
  let gameroom = gamestate.room;
  let state = gamestate?.state;
  let events = gamestate?.events;

  let players = gamestate.players;
  let teams = gamestate.teams;

  if (!players) {
    return <></>;
  }

  let status = gamestate.room.status;

  let isPregame = status == "pregame";
  let isStarting = status == "starting";
  let isGamestart = status == "gamestart";
  let isGameover = status == "gameover" || events?.gameover;
  let isPrimary = gamepanel.isPrimary;
  let roomStatus = getRoomStatus(room_slug);

  if (isGamestart) return <></>;
  const onClickMessage = () => {};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ height: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: "rgba(0,0,0,1)",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 101,
      }}
    >
      <Box
        display={"block"}
        // w="200px"
        // bgColor="rgba(0,0,0,1)"
        width={"100%"}
        height="100%"
        // pr={layoutRef?.current ? layoutRef.current.style.paddingRight : 0}
        // borderRadius="6px"
        // height="150px"
        position="relative"
        // bottom="0"
        // right="0"
        // transform="translate(-50%, -50%)"
        // left="50%"
        // top="50%"
        color="gray.100"
        // borderRadius={'50%'}
        /* bring your own prefixes */
        //   p="1rem"
        zIndex={1002}
        // transform="translate(0, 0)"
        //   filter={hide ? "opacity(0)" : "opacity(100%)"}
        // transition={"filter 0.3s ease-in"}
        // onClick={onClickMessage}
      >
        <OverlayPregame
          gamepanel={gamepanel}
          players={players}
          teams={teams}
          status={status}
        />
      </Box>
    </motion.div>
    // <MotionMemo
    //   gamepanel={gamepanel}
    //   players={players}
    //   teams={teams}
    //   status={status}
    // />
    // <AnimatePresence>

    // </AnimatePresence>
  );
}

const MotionBox = motion(Box);
// const MotionMemo = memo(
//   ({ gamepanel, players, teams, status }) => (

//   ),
//   (prev, next) => prev.gamepanel == next.gamepanel && prev.status == next.status
// );

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
      bg="linear-gradient(to bottom, var(--chakra-colors-gray-800), var(--chakra-colors-gray-1200))"
    >
      <PregameTimer gamepanel={gamepanel} status={status} />
      <Box
        position="absolute"
        top="0"
        left="0"
        zIndex="-1"
        fontStyle={"italic"}
        // transform="translate(-50%,0)"
        opacity="0.1"
      >
        <Heading
          as="h1"
          color="gray.60"
          letterSpacing={"-2px"}
          lineHeight="5rem"
          fontSize={["5rem"]}
          fontWeight="500"
          background="linear-gradient(to bottom,  var(--chakra-colors-gray-30) 60%, var(--chakra-colors-gray-800))"
          backgroundClip="text"
          // textFillColor="transparent"
          className="versusText"
          pr="1rem"
        >
          COMPETITIVE
        </Heading>
      </Box>
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
        <Box
        // position="absolute"
        // bottom="1rem"
        // left="1rem"
        >
          <Text as="span" color="gray.0" fontSize="1.6rem" fontWeight="500">
            {gamepanel?.room?.name || "a game"}
          </Text>
        </Box>
        <VStack w={["95%", "90%", "90%", "70%"]} spacing="0.5rem">
          <AnimatePresence>
            {playersList.map((shortid, index) => (
              <CompactPlayer
                key={"ffa-loading-" + shortid}
                player={players[shortid]}
                index={index}
              />
            ))}
          </AnimatePresence>
        </VStack>
      </VStack>
    </Box>
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
        <LeftPlayer player={players[leftPlayer]} isLeft={true} />
      </VStack>
      <Vs status={status} />
      <Box
        position="absolute"
        top="0"
        left="0"
        zIndex="0"
        fontStyle={"italic"}
        // transform="translate(-50%,0)"
        opacity="0.1"
      >
        <Heading
          as="h1"
          color="gray.60"
          letterSpacing={"-2px"}
          lineHeight="7rem"
          fontSize={["7rem"]}
          fontWeight="500"
          background="linear-gradient(to bottom,  var(--chakra-colors-gray-30) 60%, var(--chakra-colors-gray-800))"
          backgroundClip="text"
          // textFillColor="transparent"
          className="versusText"
          pr="1rem"
        >
          COMPETITIVE
        </Heading>
      </Box>
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
        <LeftPlayer player={players[rightPlayer]} />
      </VStack>
      <Box
        position="absolute"
        top="1rem"
        left="50%"
        transform="translate(-50%,0)"
      >
        <Text as="span" color="gray.10" fontSize="1.6rem" fontWeight="500">
          {gamepanel?.room?.name || "a game"}
        </Text>
      </Box>
    </Box>
  );
}

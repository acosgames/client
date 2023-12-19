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
import { getPrimaryGamePanel, getRoomStatus } from "../../../actions/room";
import { useEffect, useState } from "react";
import ratingtext from "shared/util/ratingtext";
import { FaCheck } from "@react-icons";

import LeftPlayer from "./LeftPlayer";
import RightPlayer from "./RightPlayer";
import PregameTimer from "./PregameTimer";
import { BottomHalf, TopHalf, Vs } from "./Vs";

export default function OverlayEvents({ gamepanelid, layoutRef }) {
  let [gamepanel] = fs.useWatch("gamepanel/" + gamepanelid);

  if (!gamepanel) return <></>;

  const room = gamepanel.room;
  const room_slug = room.room_slug;
  const game_slug = room.game_slug;
  const mode = room.mode;

  const [hide, setHide] = useState(false);

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
    <Box
      display={"block"}
      // w="200px"
      bgColor="rgba(0,0,0,0.5)"
      width={"100%"}
      height="100%"
      // pr={layoutRef?.current ? layoutRef.current.style.paddingRight : 0}
      // borderRadius="6px"
      // height="150px"
      position="absolute"
      // bottom="0"
      // right="0"
      transform="translate(-50%, -50%)"
      left="50%"
      top="50%"
      color="gray.100"
      // borderRadius={'50%'}
      /* bring your own prefixes */
      //   p="1rem"
      zIndex={1002}
      // transform="translate(0, 0)"
      //   filter={hide ? "opacity(0)" : "opacity(100%)"}
      transition={"filter 0.3s ease-in"}
      onClick={onClickMessage}
    >
      <OverlayPregame
        gamepanel={gamepanel}
        players={players}
        teams={teams}
        status={status}
      />
    </Box>
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
      bgColor="rgba(0,0,0,1)"
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
        <LeftPlayer player={players[leftPlayer]} />
      </VStack>
      <Vs />
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
    </Box>
  );
}

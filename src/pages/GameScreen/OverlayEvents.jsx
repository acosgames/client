import {
  Box,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import fs from "flatstore";
import config from "../../config";
import { getPrimaryGamePanel, getRoomStatus } from "../../actions/room";
import { useState } from "react";
import ratingtext from "shared/util/ratingtext";

export default function OverlayEvents({ gamepanelid }) {
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
  if (!state) {
    return <></>;
  }

  let players = gamestate.players;
  let teams = gamestate.teams;

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
      bgColor="rgba(0,0,0,0.95)"
      width="100%"
      height="100%"
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
    <Grid
      width="100%"
      height="100%"
      justifyContent={"center"}
      alignItems={"center"}
      templateColumns={"0.5% 35% 15% 35%"}
      rowGap={"1rem"}
      fontWeight="100"
      position="relative"
    >
      <StartTime gamepanel={gamepanel} status={status} />
      <GridItem></GridItem>
      <RenderPlayer player={players[leftPlayer]} bgTo={"top"} />
      <Heading
        zIndex="1"
        textAlign={"center"}
        as="h3"
        fontWeight="600"
        color="gray.0"
        // textShadow={"2px 2px 0px var(--chakra-colors-gray-0)"}
        filter="drop-shadow(0 0 30px var(--chakra-colors-gray-100))"
        fontSize={"3rem"}
      >
        VS
      </Heading>
      <RenderPlayer player={players[rightPlayer]} bgTo="bottom" />
    </Grid>
  );
}

function StartTime({ gamepanel, status }) {
  let [timeleftUpdated] = fs.useWatch("timeleftUpdated");
  let timeleft = fs.get("timeleft/" + gamepanel.id) || 0;
  timeleft = Math.ceil(timeleft / 1000);

  return (
    <Box
      position="absolute"
      left="50%"
      top="2rem"
      transform="translate(-50%,0)"
      p="1rem"
      px="3rem"
      bgColor="rgba(0,0,0,0.9)"
      borderRadius={"8px"}
      textAlign={"center"}
    >
      <Text fontSize="1.4rem">Starting in</Text>
      <Text
        color="gray.0"
        lineHeight={"2rem"}
        fontWeight={"500"}
        as="h3"
        fontSize="2rem"
      >
        {timeleft}
      </Text>
    </Box>
  );
}

function RenderPlayer({ player, bgTo }) {
  let filename = `assorted-${player.portraitid || 1}-original.webp`;

  let ratingClass = ratingtext.ratingToRank(player.rating);
  return (
    <GridItem w="100%" h="100%" zIndex="2">
      <VStack w="100%" h="100%" justifyContent={"center"}>
        <VStack
          // w="100%"
          // h="100%"
          width="20rem"
          height="30rem"
          position="relative"
          transition="1s"
          justifyContent={"center"}
          spacing="0"
          transform={
            bgTo == "top" ? "translate(-100vw, 0)" : "translate(100vw, 0)"
          }
          animation={
            bgTo == "top"
              ? "fromLeft 0.6s forwards 0.2s"
              : "fromRight 0.6s forwards 0.2s"
          }
          bgColor="gray.875"
          borderRadius="12px"
          border="1px solid #27313f"
          // position="relative"
          // spacing="0.5rem"
          overflow="hidden"
          zIndex="1"
          clipPath="polygon(100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 0)"
          _before={{
            content: "''",
            position: "absolute",
            left: "-3rem",
            top: "-30px",
            width: "30px",
            height: "20rem",
            bgColor: "gray.950",
            transform: "rotate(-55deg)",
            transition: "all 0.3s ease-out 0s",
            opacity: 0.55,
            zIndex: -1,
          }}
          _after={{
            content: "''",
            position: "absolute",
            left: "auto",
            right: "-3rem",
            top: "-30px",
            width: "30px",
            height: "20rem",
            bgColor: "gray.950",
            transform: "rotate(55deg)",
            transition: "all 0.3s ease-out 0s",
            opacity: 0.55,
            zIndex: -1,
          }}
          //   bg={`linear-gradient(to top, var(--chakra-colors-gray-700), var(--chakra-colors-gray-800))`}
          // alignItems={alignItems}
        >
          {/* <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          zIndex={"-1"}
          opacity="0.9"
          transform="skew(-3deg)"
          bg={`linear-gradient(to ${bgTo}, var(--chakra-colors-gray-700), var(--chakra-colors-gray-800))`}
          filter="drop-shadow(2px 0 8px var(--chakra-colors-gray-1200))"
          border="3px solid"
          borderColor="gray.900"
          borderTop="0"
          borderRight={bgTo != "top" ? "0" : ""}
          borderLeft={bgTo == "top" ? "0" : ""}
          borderBottom="0"
        ></Box> */}
          <Image
            display="inline-block"
            src={`${config.https.cdn}images/portraits/${filename}`}
            loading="lazy"
            borderRadius={"8px"}
            width={["80%"]}
            mb="1rem"
            border="1px solid"
            borderColor={player.ready ? "brand.100" : "brand.900"}
            // boxShadow={
            //   "0 0 20px var(--chakra-colors-gray-1200),0 0 20px var(--chakra-colors-gray-1200)"
            // }
          />
          <Text
            as="span"
            //   width="100%"
            px="1rem"
            textAlign={"center"}
            color="gray.0"
            fontWeight="600"
            fontSize={["1.1rem", "1.2rem", "1.4rem", "1.6rem"]}
            overflow="hidden"
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
            textShadow={
              "0 2px 3px var(--chakra-colors-gray-900),0 2px 6px var(--chakra-colors-gray-900)"
            }
          >
            {player.name}
          </Text>
          <Text
            as="span"
            color="gray.40"
            fontWeight="600"
            fontSize="1.3rem"
            textShadow={
              "0 2px 3px black,0 2px 6px var(--chakra-colors-gray-900)"
            }
          >
            Class {ratingClass}
          </Text>
        </VStack>
      </VStack>
    </GridItem>
  );
}

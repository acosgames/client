import { Box, Button, HStack } from "@chakra-ui/react";
import { wsLeaveGame } from "../../actions/connection";
import {
  getPrimaryGamePanel,
  getRoomStatus,
  clearRoom,
  clearPrimaryGamePanel,
  setRoomForfeited,
} from "../../actions/room";
import fs from "flatstore";
import { joinGame } from "../../actions/game";

export default function GameActions() {
  let [primaryId] = fs.useWatch("primaryGamePanel");
  let [gamestatusUpdated] = fs.useWatch("gamestatusUpdated");

  let gamepanel = getPrimaryGamePanel();

  if (!gamepanel) return <></>;

  //   let primary = getGamePanel(primaryId);
  const room = gamepanel.room;
  const room_slug = room.room_slug;
  const game_slug = room.game_slug;
  const mode = room.mode;

  let gamestate = gamepanel.gamestate; // fs.get('gamestate') || {};//-events-gameover');
  let events = gamestate?.events || {};
  let roomStatus = getRoomStatus(room_slug);
  let isGameover =
    roomStatus == "GAMEOVER" ||
    roomStatus == "NOSHOW" ||
    roomStatus == "ERROR" ||
    !gamepanel.active;

  const onForfeit = (elem) => {
    fs.set("displayMode", "none");
    roomStatus = getRoomStatus(room_slug);
    isGameover =
      roomStatus == "GAMEOVER" ||
      roomStatus == "NOSHOW" ||
      roomStatus == "ERROR" ||
      !gamepanel.active;

    if (isGameover) {
      // wsLeaveGame(game_slug, room_slug);
      clearRoom(room_slug);
      clearPrimaryGamePanel();
    } else {
      setRoomForfeited(room_slug);
      wsLeaveGame(game_slug, room_slug);
    }
  };

  const handleJoin = async () => {
    // let iframe = gamepanel.iframe;// fs.get('iframe');
    //let game_slug = props.match.params.game_slug;
    // let game = fs.get('game');
    // if (!game)
    //     return

    if (room.maxplayers == 1) fs.set("showLoadingBox/" + gamepanel.id, true);

    fs.set("displayMode", "none");
    clearRoom(room_slug);
    // clearPrimaryGamePanel();
    let isExperimental = mode == "experimental"; // (window.location.href.indexOf('/experimental/') != -1);
    // await wsLeaveGame(game_slug, room_slug);

    //0=experimental, 1=rank
    joinGame({ game_slug: room.game_slug }, isExperimental);
  };

  return (
    <HStack h="4rem" color="#fff">
      <Box>
        <Button
          // height="1.6rem"
          display={!isGameover ? "block" : "none"}
          fontSize={"xxs"}
          bgColor={"red.800"}
          onClick={onForfeit}
        >
          {"Forfeit"}
        </Button>
      </Box>

      <Box>
        <Button
          // height="1.6rem"
          display={isGameover ? "block" : "none"}
          fontSize={"xxs"}
          bgColor={"red.800"}
          onClick={onForfeit}
        >
          {"Leave"}
        </Button>
      </Box>

      <Box display={isGameover ? "block" : "none"} ml="1rem">
        <Button
          // height="1.6rem"
          fontSize={"xxs"}
          bgColor="brand.500"
          _hover={{ bg: "brand.600" }}
          _active={{ bg: "brand.900" }}
          onClick={handleJoin}
        >
          Play Again
        </Button>
      </Box>
    </HStack>
  );
}

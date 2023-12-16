import { Button, HStack } from "@chakra-ui/react";
import { wsLeaveGame } from "../../actions/connection";
import {
  getPrimaryGamePanel,
  getRoomStatus,
  clearRoom,
  clearPrimaryGamePanel,
  setRoomForfeited,
} from "../../actions/room";
import fs from "flatstore";

export default function GameActions() {
  let [primaryId] = fs.useWatch("primaryGamePanel");

  let gamepanel = getPrimaryGamePanel();

  if (!gamepanel) return <></>;

  //   let primary = getGamePanel(primaryId);
  const room = gamepanel.room;
  const room_slug = room.room_slug;
  const game_slug = room.game_slug;
  const mode = room.mode;

  let gamestate = gamepanel.gamestate; // fs.get('gamestate') || {};//-events-gameover');
  let events = gamestate?.events || {};
  //   let roomStatus = getRoomStatus(room_slug);
  //   let isGameover =
  //     roomStatus == "GAMEOVER" ||
  //     roomStatus == "NOSHOW" ||
  //     roomStatus == "ERROR" ||
  //     !gamepanel.active;

  const onForfeit = (elem) => {
    fs.set("displayMode", "none");
    let roomStatus = getRoomStatus(room_slug);
    let isGameover =
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
  return (
    <HStack>
      <Button
        onClick={onForfeit}
        fontSize="1.4rem"
        fontWeight="600"
        color="red.600"
        bgColor="gray.800"
      >
        FORFEIT
      </Button>
    </HStack>
  );
}

import { Box } from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import {
  replayJumpToIndex,
  replaySendGameStart,
} from "../../../actions/connection";
import { findGamePanelByRoom, updateGamePanel } from "../../../actions/room";
import GamePanel from "./GamePanel";
import { useParams } from "react-router-dom";

function EmbeddedGamePanel(props) {
  const embeddedRef = useRef();

  let [loaded, setLoaded] = useState(false);

  useEffect(() => {});

  useEffect(() => {
    if (props.room_slug) {
      let gamepanel = findGamePanelByRoom(props.room_slug);
      gamepanel.canvasRef = embeddedRef;
      updateGamePanel(gamepanel);
      setLoaded(true);
    }
  });

  useEffect(() => {
    let gamepanel = findGamePanelByRoom(props.room_slug);
    // if (gamepanel?.room?.isReplay)
    //     replaySendGameStart(props.room_slug)
    return () => {
      let gamepanel = findGamePanelByRoom(props.room_slug);
      if (gamepanel?.room?.replayTimerHandle) {
        clearTimeout(gamepanel.room.replayTimerHandle);
        gamepanel.room.replayTimerHandle = 0;
      }
    };
  }, []);

  let gamepanel = findGamePanelByRoom(props.room_slug);
  return (
    <Box
      key="embedded-gamepanel"
      position="relative"
      w="100%"
      h="100%"
      p="0"
      m="0"
      ref={embeddedRef}
    >
      {loaded && (
        <GamePanel key={"gamepanel-" + gamepanel.id} id={gamepanel.id} />
      )}
    </Box>
  );
}

export default EmbeddedGamePanel;

import { Box } from '@chakra-ui/react';
import fs from 'flatstore';
import { useEffect, useRef } from 'react';
import { replayJumpToIndex, replaySendGameStart } from '../../../actions/connection';
import { findGamePanelByRoom, updateGamePanel } from '../../../actions/room';


function EmbeddedGamePanel(props) {

    const embeddedRef = useRef();

    useEffect(() => {

    })

    useEffect(() => {

        if (props.room_slug) {
            let gamepanel = findGamePanelByRoom(props.room_slug);
            gamepanel.canvasRef = embeddedRef;
            updateGamePanel(gamepanel);

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
        }
    }, [])

    return (
        <Box position="relative" w="300px" h="300px" p="0" m="0" ref={embeddedRef}>
        </Box>
    )
}

export default EmbeddedGamePanel;
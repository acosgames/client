import { Box } from '@chakra-ui/react';
import fs from 'flatstore';
import { useEffect, useRef, useState } from 'react';
import { replayJumpToIndex, replaySendGameStart } from '../../../actions/connection';
import { findGamePanelByRoom, updateGamePanel } from '../../../actions/room';
import GamePanel from './GamePanel';


function EmbeddedGamePanel(props) {

    const embeddedRef = useRef();

    let [loaded, setLoaded] = useState(false);

    useEffect(() => {

    })

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
        }
    }, [])

    let gamepanel = findGamePanelByRoom(props.room_slug);
    return (
        <Box position="relative" w="300px" h="300px" p="0" m="0" ref={embeddedRef}>
            {loaded && (
                <GamePanel key={'gamepanel-' + gamepanel.id} id={gamepanel.id} w={300} h={300} />
            )}
        </Box>
    )
}

export default EmbeddedGamePanel;
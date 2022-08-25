import fs from 'flatstore';
import { useEffect, useRef } from 'react';
import { findGamePanelByRoom, updateGamePanel } from '../../../actions/room';


function EmbeddedGamePanel(props) {

    const embeddedRef = useRef();

    useEffect(() => {

        if (props.room_slug) {
            let gamepanel = findGamePanelByRoom(room_slug);
            gamepanel.canvasRef = embeddedRef;
            updateGamePanel(gamepanel);
        }
    });

    return (
        <Box w="300px" h="300px" p="0" m="0" ref={embeddedRef}>
        </Box>
    )
}

export default GamePanelEmbedded;
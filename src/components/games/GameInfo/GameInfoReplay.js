import { Box, Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { downloadGameReplay, findGameReplays } from "../../../actions/game";
import EmbeddedGamePanel from "../GameDisplay/EmbeddedGamePanel";
import fs from 'flatstore';
import { replayNextIndex, replayPrevIndex, sendPauseMessage, sendUnpauseMessage } from "../../../actions/connection";
import { findGamePanelByRoom } from "../../../actions/room";
import { BiSkipPrevious, BiSkipNext } from '@react-icons';


function GameInfoReplay(props) {

    let game_slug = props.game_slug;
    let [room_slug] = fs.useWatch('replay/' + game_slug);

    useEffect(() => {
        if (!game_slug)
            return;

        findGameReplays(game_slug);

    }, [])


    if (!room_slug) {
        return <></>
    }

    // let randomReplay = props.replays[Math.floor(Math.random() * props.replays.length)];

    // if (!replay) {
    //     return <></>
    // }

    return (
        <Box width="30rem" height="30rem" position="relative">
            <VStack w="100%" h="100%">
                <EmbeddedGamePanel room_slug={room_slug} />
                <ReplayControls room_slug={room_slug} />
            </VStack>

        </Box>
    )
}

function ReplayControls(props) {


    let [paused, setPaused] = useState(false);
    // let [room_slug] = fs.useWatch('replay/' + game_slug);

    let gamepanel = findGamePanelByRoom(props.room_slug);

    let [gp] = fs.useWatch('gamepanel/' + gamepanel.id);

    let history = gamepanel?.gamestate || [];

    let startIndex = 0;
    for (let i = 0; i < history.length; i++) {
        let h = history[i];
        if (h.payload.room.status == 'gamestart') {
            startIndex = i;
            break;
        }
    }

    let endIndex = history.length;
    let total = endIndex - startIndex;
    let replayIndex = gamepanel.room.replayIndex || startIndex;
    let currentOffset = (replayIndex - startIndex) + 1;
    return (
        <Box w="100%">
            <HStack spacing="0">
                <Button p="0" m="0" onClick={() => {
                    replayPrevIndex(props.room_slug);
                }}><Icon
                        as={BiSkipPrevious}
                        height='3rem'
                        width='3rem' /></Button>
                {/* <Button onClick={() => {
                    if (paused)
                        sendUnpauseMessage(props.room_slug);
                    else
                        sendPauseMessage(props.room_slug);
                    setPaused(!paused);
                }}>{paused ? 'Play' : 'Pause'}</Button> */}
                <Box px="0.25rem" align="center" fontSize="xs" color="white">
                    <Text as="span">{currentOffset}</Text>
                    <Text as="span" px="0.5rem">of</Text>
                    <Text as="span">{total}</Text>
                </Box>
                <Button p="0" m="0" onClick={() => {
                    replayNextIndex(props.room_slug);
                }}><Icon
                        as={BiSkipNext}
                        height='3rem'
                        width='3rem' /></Button>

            </HStack>
        </Box>
    )
}

function ReplayTimer(props) {

}



// let onCustomWatched = ownProps => {
//     return ['replays/' + ownProps.game_slug, 'replay/' + ownProps.game_slug];
// };
// let onCustomProps = (key, value, store, ownProps) => {
//     if (key == ('replays/' + ownProps.game_slug))
//         return { replays: value }
//     if (key == ('replay/' + ownProps.game_slug))
//         return { replay: value }
//     return {};
// };

export default GameInfoReplay;
import { Box, Button, Header, Heading, HStack, Icon, Spacer, Text, useBreakpoint, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { downloadGameReplay, findGameReplays } from "../../actions/game";
import EmbeddedGamePanel from "../../components/games/GameDisplay/EmbeddedGamePanel";
import fs from 'flatstore';
import { replayNextIndex, replayPrevIndex, sendPauseMessage, sendUnpauseMessage } from "../../actions/connection";
import { clearRoom, findGamePanelByRoom, setPrimaryGamePanel } from "../../actions/room";
import { BiSkipPrevious, BiSkipNext, BiExpand } from '@react-icons';
import { useNavigate, useParams } from "react-router-dom";
import { calculateGameSize } from "../../util/helper";


function GameInfoReplay({ game_slug }) {

    let [game] = fs.useWatch("game");
    let [room_slug] = fs.useWatch('replay/' + game_slug);
    let [replay] = fs.useWatch('replays/' + game_slug);
    let [primaryGamePanelId] = fs.useWatch('primaryGamePanel');
    let [screenResized] = fs.useWatch('screenResized');
    let [isMobile] = fs.useWatch('isMobile');
    // const location = useLocation();
    const { filename } = useParams();
    let ref = useRef();


    useEffect(() => {
        if (!game_slug || typeof filename !== 'undefined')
            return;

        findGameReplays(game_slug);


    }, [game_slug, filename])


    if (!room_slug || typeof filename !== 'undefined') {
        return <></>
    }

    if (typeof primaryGamePanelId !== 'undefined' && primaryGamePanelId != null)
        return <></>
    // let randomReplay = props.replays[Math.floor(Math.random() * props.replays.length)];

    // if (!replay) {
    //     return <></>
    // }

    let replaySettings = replay[0];
    if (!replaySettings)
        return <></>

    let h = window.innerHeight - 100;
    let w = window.innerWidth
    if (window.innerWidth < 600)
        w -= 50;
    else if (window.innerWidth < 768)
        w -= 400
    else
        w -= 500;
    let { bgWidth, bgHeight } = calculateGameSize(w, h, replaySettings.resow, replaySettings.resoh, 1);

    let replayRating = 0;
    let history = replaySettings.history;
    if (history && history[0]) {
        replayRating = history[0].payload.action[0].user.rating
    }

    return (
        <VStack w="100%" mt="1rem">
            <VStack ml="1rem" w="100%" alignItems={'center'} _after={{
                content: '""',
                display: 'block',
                clipPath: 'polygon(0% 0%, 100% 0%, 93.846% 100%, 6.154% 100%, 0% 0%)',
                width: '65px',
                height: '5px',
                margin: '0.5rem 0 0',
                background: 'brand.600',
            }
            }>
                <Text as="span" color="brand.600" letterSpacing={'2px'} fontWeight={'bold'} fontSize={['1.2rem', '1.2rem', "1.4rem"]}>Game Replay</Text>
                <Heading as="h2" color="gray.0" fontSize={['2.4rem', '2.4rem', "4rem"]} fontWeight={'600'}>Rating {replayRating}</Heading>
            </VStack>

            <HStack w="90%" mt="1rem" spacing='0' justifyContent={'center'} alignItems={'flex-start'}>


                {/* <Text as="h3" fontWeight={'bold'} color="white">Watch Replay</Text> */}
                <Box width={[`${bgWidth}px`]} h={[`${bgHeight}px`]} position="relative" mb="1.5rem" ref={ref}>
                    <Box width={[`${bgWidth}px`]} h={[`${bgHeight}px`]} borderRadius={'12px'} overflow="hidden" border="3px solid" borderColor="gray.1200" >

                        <EmbeddedGamePanel key="replay-panel" room_slug={room_slug} />

                    </Box>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{
                        position: 'absolute', left: '10px', bottom: '-15px', fill: 'var(--chakra-colors-gray-1200)'
                    }} width="130" height="20" viewBox="0 0 65 5">
                        <path d="M968,5630h65l-4,5H972Z" transform="translate(-968 -5630)"></path>
                    </svg>
                </Box>

                <VStack display={['none', 'none', 'flex']}>

                    <VStack h="100%" flex="1" justifyContent={'flex-end'}>

                        <ReplayControls room_slug={room_slug} />
                    </VStack>
                </VStack>
            </HStack>
            <VStack w="100%" display={['flex', 'flex', 'none']}>

                <VStack h="100%" w="100%" flex="1" justifyContent={'flex-end'}>

                    <ReplayControls room_slug={room_slug} />
                </VStack>
            </VStack>
        </VStack>
    )
}

function ReplayControls({ room_slug }) {


    let navigate = useNavigate();
    let [paused, setPaused] = useState(false);
    // let [room_slug] = fs.useWatch('replay/' + game_slug);

    let gamepanel = findGamePanelByRoom(room_slug);

    let [gp] = fs.useWatch('gamepanel/' + gamepanel.id);

    let history = gamepanel?.room.history || [];

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
                    replayPrevIndex(room_slug);
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
                    replayNextIndex(room_slug);
                }}><Icon
                        as={BiSkipNext}
                        height='3rem'
                        width='3rem' /></Button>
                <Box flex="1"></Box>
                <Box>
                    <Button p="0" m="0" onClick={() => {
                        //clearRoom('REPLAY/' + gamepanel.room.game_slug);
                        setPrimaryGamePanel(gamepanel);
                        fs.set('replay/navigated', true);
                        navigate(`/ g / ${gamepanel.room.game_slug} / replays / ${gamepanel.room.mode} / ${gamepanel.room.version} / ${gamepanel.room.filename.replace('.json', '')}`);
                    }}><Icon
                            as={BiExpand}
                            height='2rem'
                            width='2rem' /></Button>
                </Box>
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
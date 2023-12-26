import { Box, Button, Header, Heading, HStack, Icon, Image, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useBreakpoint, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { downloadGameReplay, findGameReplays } from "../../actions/game";
import EmbeddedGamePanel from "../../components/games/GameDisplay/EmbeddedGamePanel";
import fs from 'flatstore';
import { replayNextIndex, replayPrevIndex, sendPauseMessage, sendUnpauseMessage } from "../../actions/connection";
import { clearRoom, findGamePanelByRoom, setPrimaryGamePanel } from "../../actions/room";
import { BiSkipPrevious, BiSkipNext, BiExpand } from '@react-icons';
import { useNavigate, useParams } from "react-router-dom";
import { calculateGameSize } from "../../util/helper";

import USAFlag from "../../assets/images/flags/USA.svg";
import config from '../../config'
import { RenderPlayers } from "../GameScreen/Scoreboard/Scoreboard";


function GameInfoReplay({ game_slug }) {
    return (
        <Box w="100%" h="100%" p="0" pt="1rem">
            <Tabs variant="unstyled" isLazy>
                <TabList border="0" justifyContent={"center"}>
                    <Tab
                        as="span"
                        color="gray.200"
                        cursor={"pointer"}
                        _selected={{
                            cursor: "auto",
                            color: "brand.600",
                        }}
                        // letterSpacing={"2px"}
                        fontWeight={"bold"}
                        textTransform={'uppercase'}
                        fontSize={["1.2rem", "1.2rem", "1.4rem"]}
                    >
                        REPLAY
                    </Tab>
                    <Tab
                        color="gray.200"
                        cursor={"pointer"}
                        _selected={{
                            cursor: "auto",
                            color: "red.500",
                        }}
                        as="span"
                        // letterSpacing={"2px"}
                        fontWeight={"bold"}
                        textTransform={'uppercase'}
                        fontSize={["1.2rem", "1.2rem", "1.4rem"]}
                    >
                        LIVE
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel p="0">
                        <GameInfoReplayContent game_slug={game_slug} />
                    </TabPanel>
                    <TabPanel></TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

function GameInfoReplayContent({ game_slug }) {

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
    if (window.innerWidth < 500)
        w -= 50;
    else if (window.innerWidth < 800)
        w -= 150;
    // else if (window.innerWidth < 900)
    // w -= w * 0.6;
    else
        w -= w * 0.6;
    let { bgWidth, bgHeight } = calculateGameSize(w, h, replaySettings.resow, replaySettings.resoh, 1);

    let replayRating = 0;
    let history = replaySettings.history;
    if (history && history[0] && history[0]?.payload?.action) {
        replayRating = history[0].payload.action[0].user.rating
    }

    return (
        <VStack pb="10rem" w="100%" spacing="0" filter="drop-shadow(5px 5px 10px var(--chakra-colors-gray-1200))">

            <VStack
                // ml="1rem"
                //  mb="2rem"
                w="100%"
                alignItems={"center"}
                pb="2rem"
            // _after={{
            //     content: '""',
            //     display: "block",
            //     clipPath:
            //         "polygon(0% 0%, 100% 0%, 93.846% 100%, 6.154% 100%, 0% 0%)",
            //     width: "65px",
            //     height: "5px",
            //     margin: "0.5rem 0 0",
            //     background: "brand.600",
            // }}
            >
                <Heading
                    as="h2"
                    color="gray.0"
                    fontSize={["2.4rem", "2.4rem", "4rem"]}
                    fontWeight={"600"}
                >
                    Match #123
                </Heading>
            </VStack>
            <HStack w="90%" spacing='0' justifyContent={'center'} alignItems={'flex-start'} >


                {/* <Text as="h3" fontWeight={'bold'} color="white">Watch Replay</Text> */}
                <Box width={[`${bgWidth}px`]} h={[`${bgHeight}px`]} position="relative" ref={ref} scrollSnapStop={'start'}>
                    <Box
                        width={[`${bgWidth}px`]}
                        h={[`${bgHeight}px`]}
                        // borderRadius={'12px'}
                        overflow="hidden"
                        // border="3px solid"
                        // borderColor="gray.1200" 
                        borderRadius="8px"
                        scrollSnapStop={'start'}>

                        <EmbeddedGamePanel key="replay-panel" room_slug={room_slug} />

                    </Box>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" style={{
                        position: 'absolute', left: '10px', bottom: '-15px', fill: 'var(--chakra-colors-gray-1200)'
                    }}
                        width="30"
                        height="15"
                        viewBox="0 0 65 1">
                        <path d="M968,5630h65l-4,5H972Z" transform="translate(-968 -5630)"></path>
                    </svg> */}
                </Box>

                <VStack display={['none', 'none', 'flex']} h={[`${bgHeight}px`]} maxW="26rem" flex="1" >
                    {/* <Heading as="h5" fontSize="1.6rem" color="brand.600">Replay <Text as="span" color="gray.10">/SAHdh1</Text></Heading> */}
                    <VStack
                        //borderRightRadius={'12px'}

                        position="relative" left="-1rem" pl="2rem" h="100%" w="calc(100% + 2rem)" flex="1" justifyContent={'flex-end'} bgColor="gray.1200" borderRadius="4px" spacing="0">

                        <ReplayInfoPanel room_slug={room_slug} />

                        <ReplayControls room_slug={room_slug} />
                    </VStack>
                </VStack>
            </HStack >
            <VStack width={[`${bgWidth}px`]} maxH={[`${bgHeight}px`]} display={['flex', 'flex', 'none']} >

                {/* <Heading as="h5" fontSize="1.6rem" color="brand.600">Replay <Text as="span" color="gray.10">/SAHdh1</Text></Heading> */}
                <VStack borderRightRadius={'12px'} position="relative" left="0rem" h="100%" w="100%" flex="1" justifyContent={'flex-end'} bgColor="gray.1200" spacing="0">
                    <ReplayControls room_slug={room_slug} />
                    <ReplayInfoPanel room_slug={room_slug} />
                </VStack>
            </VStack>
        </VStack >
    )
}

function ReplayInfoPanel({ room_slug }) {
    return (<Tabs w="100%" h="100%" variant="unstyled">
        <TabList justifyContent={'center'} bgColor="gray.1200" >
            <Tab fontSize="1.2rem" color="gray.200" _selected={{ color: 'brand.600', bg: 'gray.1200', border: '0px solid', borderColor: 'gray.1200' }}>Players</Tab>
            <Tab fontSize="1.2rem" color="gray.200" _selected={{ color: 'brand.600', bg: 'gray.1200', border: '0px solid', borderColor: 'gray.1200' }}>Logs</Tab>
        </TabList>
        <TabPanels p="0" minH="12.5rem">
            <TabPanel p="0">
                <Box w="100%" h="100%" flex="1">
                    <RenderPlayers room_slug={room_slug} />
                    {/* <PlayersList room_slug={room_slug} /> */}
                </Box>
            </TabPanel>
            <TabPanel >

            </TabPanel>
        </TabPanels>
    </Tabs>)
}

function PlayersList({ room_slug }) {

    let gamepanel = findGamePanelByRoom(room_slug);
    let room = gamepanel.room;

    if (!room)
        return <></>
    let maxplayers = room.maxplayers;
    if (room.maxteams == 0)
        return <PlayersFFA gamepanelid={gamepanel.id} />

    return <PlayersTeams gamepanelid={gamepanel.id} />
}

function PlayersFFA({ gamepanelid }) {
    let [gamepanel] = fs.useWatch('gamepanel/' + gamepanelid);
    // let [players] = fs.useWatch('primary/players');
    let gamestate = gamepanel.gamestate;
    if (!gamestate || !gamestate.players)
        return <></>
    let players = gamestate.players;

    // let history = room.history;

    // let players = history[0].payload.players;
    let playerIds = Object.keys(players);

    let playerList = [];
    for (let id of playerIds) {
        players[id].id = id;
        playerList.push(players[id]);
    }

    playerList.sort((a, b) => {
        if (a.score != b.score)
            return b.score - a.score;
        if (a.rating != b.rating)
            return b.rating - a.rating;
        return b.localeCompare(a);
    })

    return (
        <>
            {playerList.map((player, index) => {
                let portraitid = player.portraitid || '3';
                return (
                    <ReplayPlayer key={'replay-player-' + player.name} name={player.name} score={player.score} countrycode={player.countrycode} portraitid={portraitid} rating={player.rating} isLast={index == (playerList.length - 1)} />
                )
            })}
        </>
    )
}

function PlayersTeams({ }) {


}

// function ReplayPlayer({ team, name, score, rating, countrycode, portraitid, isLast, flagCode }) {
//     return (
//         <VStack spacing="0.5rem"
//             w="100%"
//             bgColor="gray.875"
//             h="100%"
//             // borderRadius="4px" 

//             mb={isLast ? '0' : "0.5rem"} alignItems={'flex-start'} justifyContent={'flex-start'}>
//             <HStack justifyContent={'flex-start'} spacing="0" w="100%" h={["6rem"]}>
//                 <Image
//                     src={`${config.https.cdn}images/portraits/assorted-${portraitid}-thumbnail.webp`}
//                     loading="lazy"

//                     w={["6rem"]}
//                     minW={["6rem"]}
//                 />
//                 <VStack alignItems={'flex-start'} spacing="0rem" flex="1" h="100%">


//                     <HStack justifyContent={'flex-end'} pt="0.5rem" h="2.5rem" pl="0.5rem">
//                         <Text as="span" minWidth="0"
//                             whiteSpace={'nowrap'}
//                             overflow={'hidden'}
//                             textOverflow={'ellipsis'}
//                             color="gray.0"
//                             fontSize={["1.4rem", "1.4rem", "1.2rem", "1.4rem"]}
//                         >
//                             {name}
//                         </Text>
//                         <Image
//                             display="inline-block"
//                             src={flagCode || USAFlag}
//                             verticalAlign={"middle"}
//                             // borderRadius="5px"
//                             w="1.6rem"
//                         />

//                     </HStack>
//                     <HStack flex="1" spacing="0" justifyContent={'flex-end'} h="100%" alignItems={'center'} >
//                         <HStack h="100%" spacing="0.5rem" px="0.5rem">
//                             <Text as="span" color="gray.100" fontWeight={'light'} fontSize="1rem" >rating</Text>
//                             <Text as="span" fontWeight={'normal'} color="gray.10" fontSize="1rem">{rating}</Text>
//                         </HStack>

//                     </HStack>
//                     <HStack spacing="0" w="100%" h="2rem" bgColor="gray.875" pl="0.5rem" justifyContent={'flex-end'}>

//                         <HStack spacing="0" justifyContent={'flex-end'} h="100%" alignItems={'center'} >
//                             <HStack h="100%" spacing="0.5rem" px="0.5rem">
//                                 {/* <Text as="span" color="gray.50" fontWeight={'bold'} fontSize="1.2rem">SCORE</Text> */}
//                                 <Text as="span" fontWeight={'bold'} color="gray.10" fontSize={["1.6rem", "1.6rem", "1.4rem", "1.6rem"]}>{score}</Text>
//                             </HStack>
//                         </HStack>

//                     </HStack>
//                 </VStack>

//             </HStack >
//         </VStack >
//     )
// }
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
        <Box w="100%" h="3rem">
            <HStack h="3rem" spacing="0" justifyContent={'center'} >
                <Button p="0" m="0" onClick={() => {
                    replayPrevIndex(room_slug);
                }}><Icon
                        as={BiSkipPrevious}
                        height='3rem'
                        width='3rem' _hover={{
                            color: 'gray.100'
                        }} /></Button>
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
                        width='3rem' _hover={{
                            color: 'gray.100'
                        }} /></Button>
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
                            width='2rem' _hover={{
                                color: 'gray.100'
                            }} /></Button>
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
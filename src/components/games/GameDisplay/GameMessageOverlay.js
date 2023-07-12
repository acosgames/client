
import { Box, Flex, HStack, Icon, Portal, Spinner, Text, VStack } from '@chakra-ui/react';
import fs from 'flatstore';
import { useState } from 'react';

import { AiOutlineDisconnect } from '@react-icons';

import { FaCheck } from '@react-icons';

import { getPrimaryGamePanel, getRoomStatus } from '../../../actions/room';
import MessageGameOverMulti from './MessageOverlays/MessageGameOverMulti';


function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function isDark(hex) {
    var rgb = hexToRgb(hex);

    var sum = Math.round(((parseInt(rgb.r) * 299) + (parseInt(rgb.g) * 587) + (parseInt(rgb.b) * 114)) / 1000);
    return (sum <= 128);
}

function GameMessageOverlay(props) {
    let [gamestatusUpdated] = fs.useWatch('gamestatusUpdated');
    let [wsConnected] = fs.useWatch('wsConnected');
    let [timeleftUpdated] = fs.useWatch('timeleftUpdated');
    // const params = useParams();
    // const location = useLocation();

    // console.log('params', params);
    // console.log('location', location);;

    // const game_slug = params.game_slug;
    // const mode = params.mode;
    // const room_slug = params.room_slug;
    let [gamepanel] = fs.useWatch('gamepanel/' + props.gamepanel.id);

    // let gamepanel = props.gamepanel;//getPrimaryGamePanel();

    if (!gamepanel)
        return <></>

    const room = gamepanel.room;
    const room_slug = room.room_slug;
    const game_slug = room.game_slug;
    const mode = room.mode;

    const [hide, setHide] = useState(false);

    let timeleft = fs.get('timeleft/' + gamepanel.id) || 0;
    timeleft = Math.ceil(timeleft / 1000);

    // let game = fs.get('games>' + game_slug) || {};
    let gamestate = gamepanel.gamestate;// fs.get('gamestate') || {};
    let gameroom = gamestate.room;
    let state = gamestate?.state;
    let events = gamestate?.events;
    if (!state) {
        return <></>
    }

    let players = gamestate.players;
    let teams = gamestate.teams;

    const renderPlayers = () => {
        let elems = [];
        for (var key in players) {
            let player = players[key];

            elems.push(
                <HStack key={'waiting-' + key} spacing="0">
                    <Box display={player.ready ? 'flex' : 'none'} w="40px" justifyContent={'center'}>
                        <Icon as={FaCheck} color="green.400" />
                    </Box>
                    <Box display={player.ready ? 'none' : 'flex'} w="40px" justifyContent={'center'}>
                        <Spinner color='yellow.200' size="sm" />
                    </Box>
                    <Box w="150px">
                        <Text as="span" color={player.ready ? 'white' : 'gray.500'}>{player?.name || 'unknown'}</Text>
                    </Box>
                </HStack>
            )
        }

        return elems;
    }

    let message = null;

    let isPregame = gameroom?.status == 'pregame';
    let isStarting = gameroom?.status == 'starting';
    let isGamestart = gameroom?.status == 'gamestart';
    let isGameover = gameroom?.status == 'gameover' || events?.gameover;
    let isPrimary = gamepanel.isPrimary;
    let roomStatus = getRoomStatus(room_slug);
    // if (isGamestart)
    //     return <></>

    if (roomStatus == 'NOSHOW') {
        message = <VStack w="100%" h="100%" justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
            <Text as="h3" fontSize={isPrimary ? "3xl" : 'xxs'}>Not all players joined.</Text>
        </VStack>;
    }
    else if (roomStatus == 'FORFEIT') {
        message = <VStack w="100%" h="100%" justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
            <Text as="h3" fontSize={isPrimary ? "3xl" : 'xxs'}>Forfeit</Text>
        </VStack>;
    }
    else if (roomStatus == 'GAMEOVER') {

        let local = fs.get('user');
        let playerList = Object.keys(players);
        let shortid = local?.shortid;
        if (!local || !shortid || room.isReplay) {
            shortid = playerList[Math.floor(Math.random() * playerList.length)];
            // local = players[shortid];
        }

        let localPlayer = players[shortid] || {};
        let isSoloGame = false;
        if (typeof room.maxplayers !== 'undefined') {
            isSoloGame = room.maxplayers == 1;
        } else {
            isSoloGame = playerList.length == 1;
        }

        let hasHighscore = isSoloGame || room.lbscore;
        let extra = <></>
        if (gamestate?.timer?.sequence <= 2 && !isSoloGame) {
            extra = <Text as="h3" fontSize={isPrimary ? "3xl" : 'xxs'}>Game Over. Players left early.</Text>
        }
        else if (!isSoloGame) {

            if (players) {
                extra = <MessageGameOverMulti players={players} teams={teams} local={shortid} isPrimary={isPrimary} />

            }
        }
        else {
            extra = [
                <Text key="header-gameover" as="h3" fontSize={isPrimary ? "3xl" : 'xxs'}>Game Over</Text>
            ]

            let localPlayerHighscore = fs.get('localPlayerHighscore');

            if (localPlayerHighscore && localPlayerHighscore?.score < localPlayer.score) {
                extra.push(<Text key="header-new-high-score" as="h4" fontSize={isPrimary ? "md" : 'xxs'}>NEW High Score: {localPlayer.highscore}</Text>);
            }
            else if (room.isReplay) {
                extra.push(<Text key="header-high-score" as="h4" fontSize={isPrimary ? "md" : 'xxs'}>Score: {localPlayer.score}</Text>)
            } else {

                extra.push(<Text key="header-high-score" as="h4" fontSize={isPrimary ? "md" : 'xxs'}>High Score: {localPlayer.highscore}</Text>)
            }
        }


        message = <VStack w="100%" h="100%" justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
            {extra}
        </VStack>;
    }
    else if (roomStatus == 'ERROR') {
        message = <VStack w="100%" h="100%" justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
            <Text as="h4" fontSize={isPrimary ? "md" : 'xxs'}>Error in Game</Text>
            <Text as="h3" fontSize={isPrimary ? "3xl" : 'xxs'}>{events?.error}</Text>
        </VStack>;
    }
    else if ((isPregame && room.maxplayers > 1) || ((isStarting && room.maxplayers > 1) && timeleft > 4)) {
        message = <VStack w="100%" h="100%" justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
            <Text as="h4" fontSize={isPrimary ? "md" : 'xxs'}>Waiting for players</Text>
            {renderPlayers()}

            <Text display={isStarting ? 'none' : 'block'} as="h3" fontSize="3xl">{timeleft}</Text>
        </VStack>
    }
    else if (isStarting && room.maxplayers > 1) {
        message = <VStack w="100%" h="100%" justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
            <Text as="h4" fontSize={isPrimary ? "md" : 'xxs'}>Starting in </Text>
            <Text as="h3" fontSize={isPrimary ? "3xl" : 'xxs'}>{timeleft > 0 ? timeleft : 'GO!'}</Text>
        </VStack>;
    }
    else if (isGamestart) {

        let ws = fs.get('wsConnected');
        if (!ws && !room.isReplay)
            message = (
                <VStack w="100%" h="100%" justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
                    <HStack>
                        <Icon as={AiOutlineDisconnect} fontSize={isPrimary ? "2.4rem" : 'xxs'} color='red.400' />
                        <Text as="h4" fontSize={isPrimary ? "md" : 'xxs'}>DISCONNECTED</Text>
                    </HStack>
                    <Text as="h3" fontSize={isPrimary ? "md" : 'xxs'}>Reconnecting to server...</Text>
                </VStack>
            );
        else
            return <></>
    }
    else {
        return <></>
    }


    const onClickMessage = (e) => {

        // setHide(true);
    }


    return (
        // <Portal>
        <Box
            display={'block'}
            // w="200px" 
            bgColor='rgba(0,0,0,0.5)'
            width="100%"
            // borderRadius="6px"
            // height="150px"
            position="absolute"
            // bottom="0"
            // right="0"
            transform='translate(-50%, -50%)'
            left="50%"
            top="50%"
            color="gray.100"
            // borderRadius={'50%'}
            /* bring your own prefixes */
            p="1rem"
            zIndex={3}
            // transform="translate(0, 0)"
            filter={hide ? 'opacity(0)' : 'opacity(100%)'}
            transition={'filter 0.3s ease-in'}
            onClick={onClickMessage}
        >
            <Flex w="100%" h="100%" justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
                {message}
            </Flex>
        </Box>
        // </Portal>
    )


}




export default GameMessageOverlay;
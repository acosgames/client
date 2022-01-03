
import { Box, Flex, HStack, Icon, Portal, Spinner, Text, VStack } from '@chakra-ui/react';
import fs from 'flatstore';
import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { FaCheck } from '@react-icons';


function GameScreenStarting(props) {

    const game_slug = props.match.params.game_slug;
    const mode = props.match.params.mode;
    const room_slug = props.match.params.room_slug;

    let timeleft = props.gameTimeleft || 0;
    timeleft = Math.ceil(timeleft / 1000);

    let gamestate = fs.get('gamestate') || {};
    let state = gamestate?.state;
    let events = gamestate?.events;
    if (!state) {
        return <></>
    }

    let players = gamestate.players;
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

    let isPregame = state?.gamestatus == 'pregame';
    let isStarting = state?.gamestatus == 'starting';
    let isGamestart = state?.gamestatus == 'gamestart';
    let isGameover = state?.gamestatus == 'gameover' || events?.gameover;

    if (isGamestart)
        return <></>

    if (isPregame || (isStarting && timeleft > 4)) {
        message = <VStack w="100%" h="100%" justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
            <Text as="h4" fontSize="md">Waiting for players</Text>
            {renderPlayers()}

            <Text display={isStarting ? 'none' : 'block'} as="h3" fontSize="3xl">{timeleft}</Text>
        </VStack>
    }
    else {
        message = <VStack w="100%" h="100%" justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
            <Text as="h4" fontSize="md">Starting in </Text>
            <Text as="h3" fontSize="3xl">{timeleft > 0 ? timeleft : 'GO!'}</Text>
        </VStack>;
    }





    return (
        <Portal>
            <Box
                display={isGameover ? 'none' : 'block'}
                // w="200px" 
                bgColor={'rgba(0,0,0,0.5)'}
                // height="150px"
                position="fixed"
                top="0"
                right="0"
                // borderRadius={'50%'}
                /* bring your own prefixes */
                p="1rem"
                transform="translate(0, 0)"
            >
                <Flex w="100%" h="100%" justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
                    {message}
                </Flex>
            </Box>
        </Portal>
    )


}




export default withRouter(fs.connect(['gameTimeleft', 'gamestate'])(GameScreenStarting));

import fs from 'flatstore';
import { Box, chakra, Text, VStack, } from '@chakra-ui/react';

import ColorHash from 'color-hash'
import ChatMessages from './ChatMessages.js';
import ChatSend from './ChatSend.js';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useEffect, useRef } from 'react';
import GameActions from '../games/GameDisplay/GameActions.js';

fs.set('chat', []);
fs.set('chat_room', []);
fs.set('chatMessage', '');
fs.set('chatMode', 'all');
fs.set('chatToggle', true);
const colorHash = new ColorHash({ lightness: 0.7 });

const ModeFromID = [
    'experimental', 'rank', 'public', 'private'
]
const ModeFromName = {
    'experimental': 0,
    'rank': 1,
    'public': 2,
    'private': 3
}

function getGameModeID(name) {
    return ModeFromName[name];
}

function getGameModeName(id) {
    return ModeFromID[id];
}

function LobbyPanel(props) {
    let [layoutMode] = fs.useWatch('layoutMode');
    let [lobbyExpanded] = fs.useWatch('lobbyExpanded');
    let [resized] = fs.useWatch('resized');
    let width = '100%';
    let height = '100%';
    let minHeight = '40%';

    switch (layoutMode) {
        case 'off': break;
        case 'right':
            width = ['30rem', '30rem', '30rem']//, '40rem']
            break;
        case 'bottom':
            width = '100%'

            height = "40%";
            minHeight = "40%";




            break;
    }

    if (layoutMode == 'bottom' && !lobbyExpanded) {
        height = '4rem';
        minHeight = '4rem'
    }

    const ChakraSimpleBar = chakra(SimpleBar)

    return (
        <VStack
            className="actionpanel-wrapper"
            minHeight={minHeight}
            h={height}
            w={width}
            spacing="0"
            justifyContent={'flex-start'}
            alignItems="flex-start"
            bgColor="gray.1200"
            position="relative"
            pb="4rem"
            overflow="hidden">

            <Box w="100%" height="4rem"
                onClick={() => {
                    let lobbyExpanded = fs.get('lobbyExpanded');
                    fs.set('lobbyExpanded', !lobbyExpanded);
                    // if (scoreboardExpanded) {
                    //     fs.set('layoutRightMode', 'none');
                    // }
                }}>

                <Text w="100%" as="div" align="center" fontSize="xs" fontWeight={'bold'} color="gray.200" lineHeight={'4rem'}>Lobby</Text>
            </Box>
            <ChatMessages />

            <ChatSend />
        </ VStack>
    )
}


export default LobbyPanel;
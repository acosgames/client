
import fs from 'flatstore';
import { Box, chakra, VStack, } from '@chakra-ui/react';

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
    // let [gamescreenRef] = fs.useWatch('gamescreenRef');
    let [resized] = fs.useWatch('resized');
    let width = '100%';
    let height = '100%';
    let minHeight = '30%';

    switch (layoutMode) {
        case 'off': break;
        case 'right':
            width = ['30rem', '30rem', '30rem', '40rem']
            break;
        case 'bottom':
            width = '100%'

            height = "30%";
            minHeight = "30%";


            break;
    }

    const ChakraSimpleBar = chakra(SimpleBar)

    return (
        <VStack className="actionpanel-wrapper" minHeight={minHeight} h={height} w={width} spacing="0" justifyContent={'flex-start'} alignItems="flex-start" bgColor="gray.1100" position="relative" pb="4rem" overflow="hidden">

            <ChatMessages />

            <ChatSend />
        </ VStack>
    )
}


export default LobbyPanel;
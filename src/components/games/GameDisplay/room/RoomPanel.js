
import fs from 'flatstore';
import { Box, chakra, VStack, } from '@chakra-ui/react';

import { clearChatMessages, getChatMessages, sendChatMessage } from '../../../../actions/chat.js';

import config from '../../../../config'
import ColorHash from 'color-hash'
import ratingtext from 'shared/util/ratingtext';
import Timeleft from '../Timeleft';
import ScoreboardTimer from './ScoreboardTimer.js';
import Scoreboard from './Scoreboard.js';
import ChatMessages from './ChatMessages.js';
import ChatSend from './ChatSend.js';
import Highscores from './Highscores.js';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useEffect, useRef } from 'react';
import GameActions from '../GameActions.js';

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

function RoomPanel(props) {
    let [layoutMode] = fs.useWatch('layoutMode');
    let [gamescreenRef] = fs.useWatch('gamescreenRef');
    let [resized] = fs.useWatch('resized');
    let width = '100%';
    let height = '100%';

    switch (layoutMode) {
        case 'off': break;
        case 'right':
            width = ['30rem', '30rem', '30rem', '40rem']
            break;
        case 'bottom':
            width = '100%'

            let room = fs.get('primary/room');
            if (!room || room.screentype == 1) {
                height = "40%";
            } else {
                // let gamescreenRef = fs.get('gamescreenRef')
                const domRect = gamescreenRef.current.getBoundingClientRect();

                var w = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth;

                var h = window.innerHeight
                    || document.documentElement.clientHeight
                    || document.body.clientHeight;

                height = h - (domRect.height + 40);
            }
            break;
    }
    let timeHandle = 0;
    const scrollBarHideDelay = 2000;
    const scrollRef = useRef();
    const roomPanelRef = useRef();

    //setup scroll styling with classes
    const onScroll = () => {
        if (timeHandle > 0)
            clearTimeout(timeHandle);

        scrollRef.current.classList.add('showscroll');
        scrollRef.current.classList.remove("hidescroll")
        timeHandle = setTimeout(() => {
            scrollRef.current.classList.remove("showscroll")
            scrollRef.current.classList.add("hidescroll")
        }, scrollBarHideDelay)
    }

    //setup scroll event
    useEffect(() => {
        scrollRef.current.addEventListener('scroll', onScroll);
        // return () => {
        //     if (scrollRef.current)
        //         scrollRef.current.removeEventListener('scroll', onScroll);
        // }
    }, [])

    useEffect(() => {
        fs.set('roomPanelRef', roomPanelRef);
    })

    const ChakraSimpleBar = chakra(SimpleBar)

    return (
        <VStack ref={roomPanelRef} minHeight="40%" h={height} w={width} spacing="0" justifyContent={'flex-start'} alignItems="flex-start" bgColor="gray.1100">
            <Box w="100%" height="4rem" >
                <ScoreboardTimer isBottomLayout={layoutMode == 'bottom'} />
            </Box>
            <VStack overflow="hidden" flex="1" w={width} spacing="0" justifyContent={'flex-start'} alignItems="flex-start">
                <ChakraSimpleBar
                    boxSizing='border-box'
                    style={{
                        width: '100%',
                        height: 'auto', flex: '1', overflow: 'hidden scroll', boxSizing: 'border-box',
                    }} scrollableNodeProps={{ ref: scrollRef }}>

                    <Scoreboard />
                    <GameActions />
                    <Highscores />
                    <ChatMessages />
                </ChakraSimpleBar>
            </VStack>

            <ChatSend />
        </ VStack>
    )
}


export default RoomPanel;
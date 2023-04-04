
import fs from 'flatstore';
import { Box, chakra, VStack, } from '@chakra-ui/react';

import ColorHash from 'color-hash'
import ScoreboardTimer from './ScoreboardTimer.js';
import Scoreboard from './Scoreboard.js';
import ChatMessages from './ChatMessages.js';
import ChatSend from './ChatSend.js';
import Highscores from './Highscores.js';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useEffect, useRef } from 'react';
import GameActions from '../games/GameDisplay/GameActions.js';
import { calculateGameSize } from '../../util/helper.js';
import ActionMenu from '../chat/ActionMenu.js';

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
    // let [gamescreenRefWatch] = fs.useWatch('gamescreenRef');
    let [resized] = fs.useWatch('resized');
    let [rooms] = fs.useWatch('rooms');
    let [scoreboardExpanded] = fs.useWatch('scoreboardExpanded');
    let [primaryGamePanelId] = fs.useWatch('primaryGamePanel');

    const scrollRef = useRef();
    const roomPanelRef = useRef();



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
            height = '40%';
            let room = fs.get('primary/room');
            let roomstate = fs.get('primary/roomstate');
            let gamescreenRef = document.querySelector('.gamescreenRef');

            var w = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

            var h = window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;

            let windowWidth = w;//gamewrapperRef.current.offsetWidth;
            let windowHeight = h;//gamewrapperRef.current.offsetHeight;

            if (room.screentype == '1') {
                if (windowHeight > h * 0.6) {
                    windowHeight = (h * 0.6);
                }
            }


            let { bgWidth, bgHeight } = calculateGameSize(windowWidth, windowHeight, room.resow, room.resoh, 1);

            height = (h - bgHeight) + 'px';

            break;
    }

    if (layoutMode == 'bottom' && !scoreboardExpanded) {
        height = '4rem';
        minHeight = '4rem'
    }
    let timeHandle = 0;
    const scrollBarHideDelay = 2000;


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
        // fs.set('roomPanelRef', roomPanelRef);
    })

    const ChakraSimpleBar = chakra(SimpleBar)

    if (typeof primaryGamePanelId === 'undefined' || primaryGamePanelId == null) {
        return <></>
    }

    return (
        <VStack
            ref={roomPanelRef}
            className="actionpanel-wrapper"
            minHeight={minHeight}
            h={height}
            w={width}
            spacing="0"
            justifyContent={'flex-start'}
            alignItems="flex-start"
            bgColor="gray.1100"
            position="relative"
        >
            <Box position="absolute" height="4rem" top="0" right="0" zIndex="1000">
                <ActionMenu />
            </Box>

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
import { Box, Center, Fade, Flex, Heading, IconButton, Image, ScaleFade, Text, useToast, VStack, Wrap, WrapItem } from '@chakra-ui/react';

import { useEffect, useRef, useState } from 'react';
import fs from 'flatstore';
import { sendLoadMessage } from '../../../actions/connection';
import config from '../../../config'

import { getGame, getRoom, getRoomStatus, setIFrame } from '../../../actions/room';

import LoadingBox from './LoadingBox';

import GameScreenActions from './GameActions';
import GameScreenStarting from './GameMessageOverlay';

import iframeSrc from './iframesrc'

fs.set('iframes', {});
fs.set('iframesLoaded', {});


function GamePanel(props) {
    const room_slug = props?.room_slug;
    if (!room_slug)
        return <LoadingBox />

    let room = getRoom(room_slug);
    if (!room)
        return <LoadingBox />

    let game = getGame(room.game_slug);
    if (!game)
        return <LoadingBox />

    return <GameIFrame room={room} game={game} />
}

function GameIFrame(props) {

    let room = props.room;
    let game = props.game;

    const [isLoaded, setIsLoaded] = useState(true);
    const iframeRef = useRef(null)
    const gamescreenRef = useRef(null)
    const gamewrapperRef = useRef(null)

    const room_slug = room.room_slug;
    const game_slug = room.game_slug;
    const version = room.version;

    let screentype = game.screentype;
    let resow = game.resow;
    let resoh = game.resoh;
    let screenwidth = game.screenwidth;

    if (room.mode == 'experimental') {
        screentype = game.latest_screentype;
        resow = game.latest_resow;
        resoh = game.latest_resoh;
        screenwidth = game.latest_screenwidth;
    }
    let screenheight = (resoh / resow) * screenwidth;

    var timestamp = 0;
    var THROTTLE = 0;


    const transformStr = (obj) => {
        var obj = obj || {},
            val = '',
            j;
        for (j in obj) {
            val += j + '(' + obj[j] + ') ';
        }

        return `
            -webkit-transform: ${val}; 
            -moz-transform: ${val}; 
            transform: ${val};
            transition: transform 0.1s, scale 0.1s, transform-origin 0.1s
        `
    }

    const checkFullScreen = () => {
        if (document.fullscreenElement || document.webkitFullscreenElement ||
            document.mozFullScreenElement)
            return true;
        else
            return false;
    }

    const onResize = () => {
        if (!gamescreenRef?.current || !iframeRef?.current)
            return;

        var now = (new Date).getTime();
        if (now - timestamp < THROTTLE) {
            return onResize;
        }
        timestamp = now;

        let isFullscreen = checkFullScreen();
        let windowWidth = isFullscreen ? window.screen.width : gamewrapperRef.current.offsetWidth;
        let windowHeight = isFullscreen ? window.screen.height : gamewrapperRef.current.offsetHeight;


        let roomStatus = getRoomStatus(room_slug);
        let offsetRatio = !isLoaded ? 0.1 : 1;

        if (isLoaded) {
            if (roomStatus == 'GAME' || roomStatus == 'LOADING' || roomStatus == 'GAMEOVER') {
                offsetRatio = 1;
            }
            if (roomStatus == 'NOSHOW' || roomStatus == 'ERROR') {
                offsetRatio = 0.4;
            }
        }


        windowWidth *= offsetRatio;
        windowHeight *= offsetRatio;

        let bgWidth = 0;
        let bgHeight = 0;
        let scale = 1;
        let wsteps = (windowWidth / resow);
        let hsteps = (windowHeight / resoh);
        let steps = 0;

        if (wsteps < hsteps) {
            steps = wsteps
        }
        else {
            steps = hsteps
        }

        bgWidth = (steps * resow);
        bgHeight = (steps * resoh);

        if (screentype == '3') {
            gamescreenRef.current.style.width = bgWidth + 'px';
            gamescreenRef.current.style.height = bgHeight + 'px';
            scale = ((bgWidth / screenwidth));

            iframeRef.current.setAttribute('style', transformStr({
                scale: scale,
                translateZ: '0'
            }) + `; transform-origin: left top; width:${screenwidth}px; height:${screenheight}px;`);
        }
        else if (screentype == '2') {
            gamescreenRef.current.style.width = bgWidth + 'px';
            gamescreenRef.current.style.height = bgHeight + 'px';
            iframeRef.current.setAttribute('style', 'width:100%; height:100%;')
        }
        else if (screentype == '1') {
            gamescreenRef.current.style.width = windowWidth + 'px';
            gamescreenRef.current.style.height = windowHeight + 'px';
            iframeRef.current.setAttribute('style', 'width:100%; height:100%;')
        }
    }


    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize();
        return () => {
            window.removeEventListener('resize', onResize);
        }
    })

    // useEffect(() => {
    //     fs.set('iframeLoaded', false);
    // }, [])


    return (
        <VStack
            className="screen-wrapper"
            justifyContent={'flex-start'}
            alignContent={'center'}
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h={'100%'}
            zIndex={10}
            ref={gamewrapperRef}
            transition={'filter 0.3s ease-in, width 0.3s, height 0.3s'}
        >
            <Box
                ref={gamescreenRef}
                height="100%"
                position="relative"
                boxShadow={'0px 12px 24px rgba(0,0,0,0.2)'}>
                <LoadingBox />
                <iframe
                    className="gamescreen"
                    ref={iframeRef}
                    onLoad={() => {
                        setIFrame(room_slug, iframeRef);

                        // let iframes = fs.get('iframes') || {};
                        // iframes[room_slug] = iframeRef;
                        // fs.set('iframeLoaded', true);
                        // fs.set('iframes', iframes);
                        // fs.set('gamepanel', gamescreenRef);
                        // fs.set('gamewrapper', gamewrapperRef);
                        sendLoadMessage(room_slug, game_slug, version, onResize);
                        onResize();
                        setTimeout(() => {
                            onResize();
                        }, 1000);
                    }}
                    srcDoc={iframeSrc}
                    sandbox="allow-scripts allow-same-origin"
                />
                <GameScreenStarting />
            </Box>
        </VStack>
    )
}


GamePanel = fs.connect([])(GamePanel);

export default GamePanel;
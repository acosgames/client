import { Box, Fade, Flex, IconButton, ScaleFade, Text, useToast, VStack } from '@chakra-ui/react';

import { useEffect, useRef, useState } from 'react';
import fs from 'flatstore';
import { sendLoadMessage } from '../../../actions/connection';
import config from '../../../config'

import { getRoomStatus } from '../../../actions/room';


fs.set('iframes', {});
fs.set('iframesLoaded', {});


function GameScreenIframeWrapper(props) {
    const room_slug = props.room?.room_slug;
    const game_slug = props.room?.game_slug;

    if (!props.room || !room_slug)
        return <></>

    let game = fs.get('games>' + game_slug);
    if (!game)
        return <></>

    return <GameScreenIframe {...props.room} />
}

function GameScreenIframe(room) {


    const [isLoaded, setIsLoaded] = useState(false);

    const iframeRef = useRef(null)
    const gamescreenRef = useRef(null)
    const gamewrapperRef = useRef(null)

    useEffect(() => {
        fs.set('iframeLoaded', false);
        setIsLoaded(true);

    }, [])







    const room_slug = room.room_slug;
    const game_slug = room.game_slug;
    const version = room.version;

    var srcUrl = config.https.cdn + 'static/iframe-localhost.html';
    if (process.env.NODE_ENV == 'production')
        srcUrl = config.https.cdn + 'static/iframe.html';



    // let room = fs.get('rooms>' + room_slug);
    let game = fs.get('games>' + game_slug);


    if (!room || !room.room_slug)
        return <></>


    // if (!game)
    //     return <></>

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

    var scaled = room.scaled || 1;
    var CONTENT_WIDTH = screenwidth;
    var timestamp = 0;
    var THROTTLE = 0;
    // useEffect(() => {
    // return () => {
    //     fs.set('iframes', null);
    //     fs.set('gamepanel', null);
    //     fs.set('gamewrapper', null);
    // }


    // })
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
        let windowWidth = isFullscreen ? window.screen.width : document.documentElement.clientWidth;
        let windowHeight = isFullscreen ? window.screen.height : document.documentElement.clientHeight;

        let gamestate = fs.get('gamestate');
        let roomStatus = getRoomStatus(room_slug);
        let offsetRatio = 0.4;
        if (roomStatus == 'GAME' || roomStatus == 'LOADING' || roomStatus == 'GAMEOVER') {
            offsetRatio = 1;
        }
        if (roomStatus == 'NOSHOW' || roomStatus == 'ERROR') {
            offsetRatio = 0.4;
        }

        windowWidth *= offsetRatio;
        windowHeight *= offsetRatio;

        var bgWidth = 0;//parseInt(getComputedStyle(maincontent).width, 10);
        var bgHeight = 0;//parseInt(getComputedStyle(maincontent).height, 10);
        var scale = 1;

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
            gamewrapperRef.current.style.height = bgHeight + 'px';
            scale = ((bgWidth / screenwidth));

            iframeRef.current.setAttribute('style', transformStr({
                scale: scale,
                translateZ: '0'
            }) + `; transform-origin: left top; width:${screenwidth}px; height:${screenheight}px;`);
        }
        else if (screentype == '2') {
            gamescreenRef.current.style.width = bgWidth + 'px';
            gamescreenRef.current.style.height = bgHeight + 'px';
            gamewrapperRef.current.style.height = bgHeight + 'px';
            iframeRef.current.setAttribute('style', 'width:100%; height:100%;')
        }
        else if (screentype == '1') {
            gamescreenRef.current.style.width = windowWidth + 'px';
            gamescreenRef.current.style.height = windowHeight + 'px';
            gamewrapperRef.current.style.height = windowHeight + 'px';
            iframeRef.current.setAttribute('style', 'width:100%; height:100%;')
        }
    }


    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize();
        return () => {
            window.removeEventListener('resive', onResize);
        }


    })



    return (
        <VStack
            justifyContent={'flex-start'}
            alignContent={'center'}
            w="100%"
            h="100%"
            ref={gamewrapperRef}
            // transform={transform}
            filter={isLoaded ? 'opacity(100%)' : 'opacity(0)'}
            transition={'transform 0.3s ease-in, filter 0.3s ease-in'}
        >

            <Box
                // bg="white"
                overflow={'hidden'}
                ref={gamescreenRef}
                boxShadow="rgb(0 0 0 / 24%) 0px 6px 12px"
                transition={'width 0.3s, height 0.3s'} position="relative">
                <iframe
                    className="gamescreen"
                    ref={iframeRef}
                    onLoad={() => {
                        let iframes = fs.get('iframes') || {};
                        iframes[room_slug] = iframeRef;
                        fs.set('iframeLoaded', true);
                        fs.set('iframes', iframes);
                        fs.set('gamepanel', gamescreenRef);
                        fs.set('gamewrapper', gamewrapperRef);
                        sendLoadMessage(room_slug, game_slug, version, onResize);



                        onResize();
                        setTimeout(() => {

                            onResize();
                        }, 1000);
                    }}
                    src={srcUrl}
                    sandbox="allow-scripts allow-same-origin"
                />


                <LoadingBox />
            </Box>


        </VStack>
    )
}

function LoadingBox(props) {

    const toast = useToast();
    const [show, setShow] = useState(true);

    useEffect(() => {

        if (props.gameLoaded) {
            toast.closeAll()
            setTimeout(() => {
                setShow(false);

            }, 300)
        }
    })

    if (!show)
        return <></>
    return (
        <Box
            className="loading-screen"
            position={'absolute'}
            left="0"
            top="0"
            w="100%"
            h="100%"
            bgColor={'gray.800'}
            transition={'all 0.3s ease-in'}
            filter={props.gameLoaded ? 'opacity(0)' : 'opacity(1)'}
        >
            <Flex w="100%" h="100%" justifyItems={'center'} justifyContent="center" alignContent="center" alignItems={'center'}>
                <Text>Loading...</Text>
            </Flex>
        </Box>
    )
}

LoadingBox = fs.connect(['gameLoaded'])(LoadingBox);
GameScreenIframe = fs.connect(['iframeLoaded', 'gameLoaded', 'gamestate'])(GameScreenIframe);

export default GameScreenIframeWrapper;
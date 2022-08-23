import { Box, Center, Fade, Flex, Heading, IconButton, Image, ScaleFade, Text, useToast, VStack, Wrap, WrapItem } from '@chakra-ui/react';

import { useEffect, useRef, useState } from 'react';
import fs from 'flatstore';
import { sendLoadMessage } from '../../../actions/connection';
import config from '../../../config'

import { getRoomStatus } from '../../../actions/room';

import './LoadingBox.scss';
import GameScreenActions from './GameScreenActions';
import GameScreenInfo from './GameScreenInfo';
import GameInfoTop10 from '../GameInfo/GameInfoTop10';
import GameInfoTop10Highscores from '../GameInfo/GameInfoTop10Highscores';
import GameScreenStarting from './GameScreenStarting';

fs.set('iframes', {});
fs.set('iframesLoaded', {});


const iframeSrcDoc = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Acos-Client Simulator</title>
        <meta name="description" content="ACOS Client Simulator" />
        <meta name="author" content="A Cup of Skill" />
        <meta
            http-equiv="Content-Security-Policy"
            content="default-src https://fonts.gstatic.com https://fonts.googleapis.com https://cdn.acos.games 'unsafe-inline' 'self' data:"
        />
    </head>
    <body>
        <div id="root"></div>
        <script>
            const urlprefix = 'cdn.acos.games/file/acospub/g/';;
            const onMessage = (evt) => {
                let m = evt.data;
                let origin = evt.origin;
                let source = evt.source;
                if (!m || m.length == 0)
                    return;
                if( m.type == 'load' ) { 
                    de();
                    let url = 'https://'+urlprefix+m.payload.game_slug+'/client/client.bundle.'+m.payload.version+'.js';
                    console.log(">>> Loading Client Bundle: ", url);
                    loadJS(url);
                }
            }
            function de() {
                window.removeEventListener('message', onMessage, false);
            }
            function at() {
                window.addEventListener('message', onMessage, false);
            }
            function loadJS(url) {
                loadScript(url, function(path, status) {
                    if( status == 'ok')
                        setTimeout(()=>{
                            window.parent.postMessage({ type:'loaded' }, '*');
                        },1)
                });
            }
            at();
            function loadScript(path, callback) {
                var done = false;
                var scr = document.createElement('script');
                scr.onload = handleLoad;
                scr.onreadystatechange = handleReadyStateChange;
                scr.onerror = handleError;
                scr.src = path;
                document.body.appendChild(scr);
                function handleLoad() {
                    if (!done) {
                        done = true;
                        callback(path, "ok");
                    }
                }
                function handleReadyStateChange() {
                    var state;
                    if (!done) {
                        state = scr.readyState;
                        if (state === "complete") {
                            handleLoad();
                        }
                    }
                }
                function handleError() {
                    if (!done) {
                        done = true;
                        callback(path, "error");
                    }
                }
            }
        </script>
    </body>
</html>`;

function GameScreenIframeWrapper(props) {
    const room_slug = props.room?.room_slug;
    const game_slug = props.room?.game_slug;

    if (!props.room || !room_slug)
        return <LoadingBox />

    let game = fs.get('games>' + game_slug);
    if (!game)
        return <LoadingBox />

    return <GameScreenIframe room={props.room} game={props.game} />
}

function GameScreenIframe(props) {


    const [isLoaded, setIsLoaded] = useState(true);

    const iframeRef = useRef(null)
    const gamescreenRef = useRef(null)
    const gamewrapperRef = useRef(null)
    const gamescreenResizer = useRef(null);

    useEffect(() => {
        fs.set('iframeLoaded', false);
        // setTimeout(() => {
        // setIsLoaded(true);
        // }, 100);


    }, [])

    let room = props.room;
    let game = props.game;

    const room_slug = room.room_slug;
    const game_slug = room.game_slug;
    const version = room.version;

    var srcUrl = config.https.cdn + 'static/iframe-localhost.html';
    if (process.env.NODE_ENV == 'production')
        srcUrl = config.https.cdn + 'static/iframe.html';



    // let room = fs.get('rooms>' + room_slug);
    game = fs.get('games>' + game_slug);


    if (!room || !room.room_slug)
        return <LoadingBox />


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
        // let windowWidth = isFullscreen ? window.screen.width : document.documentElement.clientWidth;
        // let windowHeight = isFullscreen ? window.screen.height : document.documentElement.clientHeight;
        let windowWidth = isFullscreen ? window.screen.width : gamewrapperRef.current.offsetWidth;
        let windowHeight = isFullscreen ? window.screen.height : gamewrapperRef.current.offsetHeight;


        let gamestate = fs.get('gamestate');
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
            // gamewrapperRef.current.style.height = bgHeight + 'px';
            scale = ((bgWidth / screenwidth));

            iframeRef.current.setAttribute('style', transformStr({
                scale: scale,
                translateZ: '0'
            }) + `; transform-origin: left top; width:${screenwidth}px; height:${screenheight}px;`);
        }
        else if (screentype == '2') {
            gamescreenRef.current.style.width = bgWidth + 'px';
            gamescreenRef.current.style.height = bgHeight + 'px';
            // gamewrapperRef.current.style.height = bgHeight + 'px';
            iframeRef.current.setAttribute('style', 'width:100%; height:100%;')
        }
        else if (screentype == '1') {
            gamescreenRef.current.style.width = windowWidth + 'px';
            gamescreenRef.current.style.height = windowHeight + 'px';
            // gamewrapperRef.current.style.height = windowHeight + 'px';
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



    return (
        <Box ref={gamescreenResizer} className="gameScreenIframe" height="100%">

            <VStack
                justifyContent={'flex-start'}
                alignContent={'center'}
                w="100%"
                h={'100%'}//["calc(100vh - 3rem)", "calc(100vh - 3rem)", "calc(100vh - 5rem)",]}
                ref={gamewrapperRef}

                // transform={transform}
                // filter={isLoaded ? 'opacity(100%)' : 'opacity(0)'}
                transition={'filter 0.3s ease-in, width 0.3s, height 0.3s'}
            >

                <Box
                    // bg="white"
                    // overflow={'hidden'}
                    ref={gamescreenRef}
                    // boxShadow="rgb(0 0 0 / 24%) 0px 6px 12px"
                    // transition={'width 0.3s, height 0.3s'} 
                    height="100%"
                    position="relative" boxShadow={'0px 12px 24px rgba(0,0,0,0.2)'}>
                    <LoadingBox />
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
                        srcDoc={iframeSrcDoc}
                        // src={srcUrl}
                        sandbox="allow-scripts allow-same-origin"
                    />


                    <GameScreenStarting />


                </Box>


            </VStack>
        </Box>
    )
}

function LoadingBox(props) {

    const toast = useToast();
    const [show, setShow] = useState(true);

    useEffect(() => {

        if (props.gameLoaded) {
            toast.closeAll()
            // setTimeout(() => {
            setShow(false);

            // }, 300)
        }
    })

    if (props.gameLoaded)
        return <></>
    return (
        <Box
            className="loading-screen"
            //position={'absolute'}
            left="0"
            top="0"
            w="100%"
            h="100%"
            bgColor={'blacks.100'}
            transition={'all 0.3s ease-in'}
            filter={props.gameLoaded ? 'opacity(0)' : 'opacity(1)'}
        >
            <VStack w="100%" h="100%" justifyItems={'center'} justifyContent="center" alignContent="center" alignItems={'center'}>
                {/* <Text>Loading...</Text> */}
                <Image
                    alt={'A cup of skill logo'}
                    src={`${config.https.cdn}acos-logo-combined.png`}
                    w="300px" h="124.5px"
                />
                <div className="ldr-1"><div className="ball1"></div><div className="ball2"></div><div className="ball3"></div><div className="ball4"></div></div>
                {/* <br /><br />
                <Box className="factory-7"></Box> */}
            </VStack>
        </Box>
    )
}

LoadingBox = fs.connect(['gameLoaded'])(LoadingBox);
GameScreenIframe = fs.connect(['iframeLoaded', 'gameLoaded', 'gamestate'])(GameScreenIframe);

export default GameScreenIframeWrapper;
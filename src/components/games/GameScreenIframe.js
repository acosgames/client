import { Box, IconButton, VStack } from '@chakra-ui/react';
import Connection from './Connection';
import LeaveGame from './LeaveGame';
import { useEffect, useRef, useState } from 'react';
import fs from 'flatstore';
import { sendLoadMessage } from '../../actions/connection';

fs.set('iframes', {});
fs.set('iframesLoaded', {});

function GameScreenIframe(room) {

    const iframeRef = useRef(null)
    const gamescreenRef = useRef(null)
    const gamewrapperRef = useRef(null)

    if (!room || !room.room_slug)
        return <></>

    const room_slug = room.room_slug;
    const game_slug = room.game_slug;
    const version = room.version;
    const srcUrl = '/iframe';

    // let room = fs.get('rooms>' + room_slug);
    let game = fs.get('games>' + game_slug);

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
        var now = (new Date).getTime();

        if (now - timestamp < THROTTLE) {
            return onResize;
        }

        timestamp = now;

        let isFullscreen = checkFullScreen();
        let windowHeight = isFullscreen ? window.screen.height : document.documentElement.clientHeight;
        let windowWidth = isFullscreen ? window.screen.width : document.documentElement.clientWidth;
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


        // let isFullscreen = checkFullScreen();
        // let windowHeight = isFullscreen ? window.screen.height : document.documentElement.clientHeight;
        // let windowWidth = isFullscreen ? window.screen.width : document.documentElement.clientWidth;
        // // windowHeight -= 32;
        // let wsteps = Math.floor(windowWidth / resow);
        // let hsteps = Math.floor(windowHeight / resoh);
        // let steps = (wsteps > hsteps ? hsteps : wsteps);
        // let bgWidth = Math.round(steps * resow);
        // let bgHeight = Math.round(steps * resoh);

        // gamescreenRef.current.style.width = bgWidth + 'px';
        // gamescreenRef.current.style.height = bgHeight + 'px';

        // let scale = bgWidth / CONTENT_WIDTH;
        // if (screentype == 2) {
        //     iframeRef.current.setAttribute('style', transformStr({
        //         scale: scale,
        //         translateZ: '0'
        //     }) + `; transform-origin: left top; width:${screenwidth}px; height:${screenheight} px;`);
        // } else {
        //     iframeRef.current.setAttribute('style', 'width:100%; height:100%;')
        // }
    }

    window.addEventListener('resize', onResize, false);

    return (
        <VStack justifyContent={'flex-start'} alignContent={'center'} w="100%" h="100%" ref={gamewrapperRef}>
            <Box
                // bg="white"
                ref={gamescreenRef}
                transition={'width 0.1s, height 0.1s'}>
                <iframe
                    className="gamescreen"
                    ref={iframeRef}
                    onLoad={() => {
                        let iframes = fs.get('iframes') || {};
                        iframes[room_slug] = iframeRef;
                        fs.set('iframes', iframes);
                        fs.set('gamepanel', gamescreenRef);
                        fs.set('gamewrapper', gamewrapperRef);
                        sendLoadMessage(room_slug, game_slug, version, onResize);
                        setTimeout(() => {

                            onResize();
                        }, 1000);
                    }}
                    src={srcUrl}
                    sandbox="allow-scripts"
                />
            </Box>
        </VStack>
    )
}

export default GameScreenIframe;
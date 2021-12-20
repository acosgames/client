import { Box, IconButton } from '@chakra-ui/react';
import Connection from './Connection';
import LeaveGame from './LeaveGame';
import { BsArrowsFullscreen } from '@react-icons';
import { useEffect, useRef, useState } from 'react';
import fs from 'flatstore';
import { sendLoadMessage } from '../../actions/connection';

fs.set('iframes', {});
fs.set('iframesLoaded', {});

function GameScreenIframe(room) {

    const [iframe, setIframe] = useState(null);
    const [gamescreen, setGameScreen] = useState(null);

    const iframeRef = useRef(null)
    const gamescreenRef = useRef(null)

    if (!room.room_slug)
        return <></>
    const room_slug = room.room_slug;
    const gameid = room.gameid;
    const version = room.version;
    // const srcUrl = `https://cdn.fivesecondgames.com/file/fivesecondgames/${gameid}/client/client.bundle.${version}.html`;
    const srcUrl = '/iframe';

    // useEffect(() => {
    //     // let iframesLoaded = fs.get('iframesLoaded');
    //     // if (typeof iframesLoaded[room_slug] === 'undefined') {
    //     //     iframesLoaded[room_slug] = false;
    //     //     fs.set('iframesLoaded', iframesLoaded);
    //     // }
    // }, [])

    // useEffect(() => {

    // });

    /* When the openFullscreen() function is executed, open the video in fullscreen.
    Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
    const openFullscreen = (elem) => {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    var scaled = room.scaled || 1;
    var CONTENT_WIDTH = 1920;
    var CONTENT_HEIGHT = 1080;
    var timestamp = 0;
    var THROTTLE = 0;

    const transformStr = (obj) => {
        var obj = obj || {},
            val = '',
            j;
        for (j in obj) {
            val += j + '(' + obj[j] + ') ';
        }

        return '-webkit-transform: ' + val + '; ' +
            '-moz-transform: ' + val + '; ' +
            'transform: ' + val;
    }

    const checkFullScreen = () => {
        if (document.fullscreenElement || document.webkitFullscreenElement ||
            document.mozFullScreenElement)
            return true;
        else
            return false;
    }

    const onResize = () => {
        var now = +new Date,
            winWidth = window.innerWidth,
            scale,
            width,
            height,
            offsetTop,
            offsetLeft;

        if (now - timestamp < THROTTLE) {
            return onResize;
        }

        timestamp = now;

        let isFullscreen = checkFullScreen();
        let windowHeight = isFullscreen ? window.screen.height : document.documentElement.clientHeight;
        let windowWidth = isFullscreen ? window.screen.width : document.documentElement.clientWidth;
        var bgWidth = parseInt(getComputedStyle(gamescreenRef.current).width, 10);
        var bgHeight = parseInt(getComputedStyle(gamescreenRef.current).height, 10);
        var iframeWidth = parseInt(getComputedStyle(iframeRef.current).width, 10);
        let ratio = 1;

        if (bgHeight >= windowHeight) {
            ratio = (windowHeight / bgHeight);
        }
        else if (bgWidth >= windowWidth) {
            ratio = (windowWidth / bgWidth);
        }
        else {
            ratio = (windowWidth / bgWidth);
            if (bgHeight * ratio >= windowHeight) {
                ratio = (windowHeight / bgHeight);
            }
        }
        bgWidth *= ratio;
        let steps = Math.floor(bgWidth / 16);
        bgWidth = Math.round(steps * 16);
        bgHeight = Math.round(steps * 9);

        gamescreenRef.current.style.width = bgWidth + 'px';
        gamescreenRef.current.style.height = bgHeight + 'px';

        scale = ((bgWidth / CONTENT_WIDTH));

        offsetLeft = 0;

        if (scaled) {
            iframeRef.current.setAttribute('style', transformStr({
                scale: scale,
                translateX: offsetLeft + 'px',
                translateY: offsetLeft + 'px',
                translateZ: '0'
            }) + '; transform-origin: left top; width:1920px; height:1080px;');
        } else {
            iframeRef.current.setAttribute('style', 'width:100%; height:100%;')
        }
    }

    window.addEventListener('resize', onResize, false);





    if (!room)
        return (<React.Fragment></React.Fragment>)

    return (
        <Box
            bg="red"
            // id="gamepanel-wrapper"
            ref={gamescreenRef}>
            <iframe
                className="gamescreen"
                ref={iframeRef}
                onLoad={() => {
                    //joinGame(game, game.istest);
                    // let iframesLoaded = fs.get('iframesLoaded');
                    // iframesLoaded[room_slug] = true;
                    // fs.set('iframesLoaded', iframesLoaded);

                    let iframes = fs.get('iframes') || {};
                    iframes[room_slug] = iframeRef;
                    fs.set('iframes', iframes);

                    sendLoadMessage(room_slug, gameid, version);
                    onResize();
                }}
                src={srcUrl}
                sandbox="allow-scripts"
            />
            <Connection></Connection>
            <IconButton icon={<BsArrowsFullscreen />} onClick={() => { this.openFullscreen(this.gamepanel) }}>Full Screen</IconButton>
            <LeaveGame></LeaveGame>
        </Box>

    )

}

export default GameScreenIframe;
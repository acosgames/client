import {
    Box,
    Center,
    Fade,
    Flex,
    Heading,
    IconButton,
    Image,
    Portal,
    ScaleFade,
    Text,
    useToast,
    VStack,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";

import { replaySendGameStart, sendLoadMessage } from "../../actions/connection";
import config from "../../config";
// import { BsArrowsFullscreen, } from 'react-icons/bs';
import { CgMinimizeAlt } from "react-icons/cg";

import {
    findGamePanelByRoom,
    getGame,
    getRoom,
    getRoomStatus,
    setIFrame,
    setPrimaryGamePanel,
    updateGamePanel,
} from "../../actions/room";

import LoadingBox from "./LoadingBox";

import { calculateGameSize } from "../../util/helper";
import { useBucket, useBucketSelector } from "../../actions/bucket";
import {
    btDisplayMode,
    btGamePanels,
    btIsFullScreen,
    btLayoutMode,
    btResized,
    btScoreboardExpanded,
    btScreenResized,
    btShowLoadingBox,
} from "../../actions/buckets";

// import useBackButton from '../../widgets/useBackButton';

function GamePanel(props) {
    let key = "gamepanel/" + props.id;
    let gamepanel = useBucketSelector(
        btGamePanels,
        (bucket) => bucket[props.id]
    );
    let loaded = useBucketSelector(
        btShowLoadingBox,
        (bucket) => bucket[props.id]
    );

    // const isBack = useBackButton(() => {
    //     if (gamepanel.isPrimary && gamepanel.room.isReplay) {
    //         setPrimaryGamePanel();
    //     }
    // });
    // const gamepanel = props.gamepanel;

    if (!gamepanel) {
        return <></>;
        // return <LoadingBox />
    }

    if (gamepanel.available) return <></>;

    const room_slug = gamepanel?.room?.room_slug;
    if (!room_slug) return <></>;
    // return <LoadingBox />

    // let room = getRoom(room_slug);
    // if (!room)
    //     return <LoadingBox />

    // let game = getGame(room.game_slug);
    // if (!game)
    // return <LoadingBox />

    return (
        // <Portal containerRef={gamepanel.draggableRef}>
        <>
            <LoadingBox id={gamepanel.id} />
            <GameIFrame gamepanel={gamepanel} canvasRef={props.canvasRef} />
        </>

        // </Portal>
    );
}

function GameIFrame(props) {
    let screenResized = useBucket(btScreenResized);
    // 'resize', 'isFullScreen', 'displayMode'

    let gamepanel = props.gamepanel;
    let room = gamepanel.room;

    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
    const iframeRef = useRef(null);
    const gamescreenRef = useRef(null);
    const gamewrapperRef = useRef(null);
    const gameResizer = useRef();

    const room_slug = room.room_slug;
    const game_slug = room.game_slug;
    const version = room.version;

    let screentype = room.screentype;
    let resow = room.resow;
    let resoh = room.resoh;
    let screenwidth = room.screenwidth;

    // if (room.mode == 'experimental') {
    //     screentype = game.latest_screentype;
    //     resow = game.latest_resow;
    //     resoh = game.latest_resoh;
    //     screenwidth = game.latest_screenwidth;
    // }
    let screenheight = (resoh / resow) * screenwidth;

    var timestamp = 0;
    var THROTTLE = 0;

    const transformStr = (obj) => {
        var obj = obj || {},
            val = "",
            j;
        for (j in obj) {
            val += j + "(" + obj[j] + ") ";
        }

        return `
            -webkit-transform: ${val}; 
            -moz-transform: ${val}; 
            transform: ${val};
            
        `;
    };

    const checkFullScreen = () => {
        if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement
        )
            return true;
        else return false;
    };

    const onResize = () => {
        let showLoading = btShowLoadingBox.get(
            (bucket) => bucket[gamepanel.id]
        );
        if (!gamescreenRef?.current || !iframeRef?.current) {
            // console.log("NOT FOUND - gamescreenRef or iframeRef or loadingBox");
            return;
        }

        var now = new Date().getTime();
        if (now - timestamp < THROTTLE) {
            console.log("Throttled: ", now - timestamp);
            return onResize;
        }

        timestamp = now;

        let isFullscreen = checkFullScreen();
        // let windowWidth = isFullscreen ? window.screen.width : gamewrapperRef.current.offsetWidth;
        // let windowHeight = isFullscreen ? window.screen.height : gamewrapperRef.current.offsetHeight;

        var w =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;

        var h =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;

        let windowWidth = w; //gamewrapperRef.current.offsetWidth;
        let windowHeight = h; //gamewrapperRef.current.offsetHeight;
        if (props.canvasRef) {
            windowWidth = props.canvasRef.current.offsetWidth;
            windowHeight = props.canvasRef.current.offsetHeight;
        }

        let roomPanelRef = document.querySelector(".actionpanel-wrapper");
        let layoutMode = btLayoutMode.get();
        // if (roomPanelRef) {
        //     if (layoutMode == 'bottom') {
        //         windowHeight = h - roomPanelRef.offsetHeight;
        //     } else {
        //         windowWidth = w - roomPanelRef.offsetWidth;
        //     }
        // } else {

        // }
        // if (roomPanelRef) {
        if (!gamepanel.isPrimary && gamepanel?.canvasRef?.current) {
            windowWidth = gamepanel.canvasRef.current.offsetWidth;
            windowHeight = gamepanel.canvasRef.current.offsetHeight;
            // console.log("Rendering IFrame", "embedded");
        } else if (layoutMode == "bottom") {
            // if (screentype == '1') {
            // windowWidth += roomPanelRef.current.offsetWidth;
            // windowHeight += 50;
            let scoreboardExpanded = btScoreboardExpanded.get();
            if (!scoreboardExpanded) {
                if (windowHeight > h - 40) {
                    // windowHeight = h - 40;
                }
            } else if (windowHeight > h * 0.6) {
                // windowHeight = (h * 0.6);
            }
            // console.log("Rendering IFrame", "bottom");
            // }
        } else if (layoutMode == "off") {
        } else {
            if (h >= 992) {
                // windowWidth -= 400;
            } else {
                // windowWidth -= 300;
            }
            // windowWidth -= 240;
            // console.log("Rendering IFrame", "right", windowWidth, windowHeight, resow, resoh, isLoaded);
        }

        if (gamepanel.isPrimary && gamepanel?.room?.isReplay) {
            if (windowHeight > h - 40) {
                windowHeight = h - 40;
            }
        }
        // }

        let roomStatus = getRoomStatus(room_slug);
        let offsetRatio = !isLoaded ? 0.1 : 1;

        if (isLoaded) {
            if (
                roomStatus == "GAME" ||
                roomStatus == "LOADING" ||
                roomStatus == "GAMEOVER"
            ) {
                offsetRatio = 1;
            }
            if (roomStatus == "NOSHOW" || roomStatus == "ERROR") {
                // offsetRatio = 0.4;
            }
        }

        let { bgWidth, bgHeight } = calculateGameSize(
            windowWidth,
            windowHeight,
            resow,
            resoh,
            offsetRatio
        );

        // windowWidth *= offsetRatio;
        // windowHeight *= offsetRatio;

        // let bgWidth = 0;
        // let bgHeight = 0;
        let scale = 1;
        // let wsteps = (windowWidth / resow);
        // let hsteps = (windowHeight / resoh);
        // let steps = 0;

        // if (wsteps < hsteps) {
        //     steps = wsteps
        // }
        // else {
        //     steps = hsteps
        // }

        // bgWidth = (steps * resow);
        // bgHeight = (steps * resoh);

        let oldHeight = gamescreenRef.current.style.height;

        if (screentype == "3") {
            gamescreenRef.current.style.width = bgWidth + "px";
            gamescreenRef.current.style.height = bgHeight + "px";
            scale = bgWidth / screenwidth;

            iframeRef.current.setAttribute(
                "style",
                transformStr({
                    scale: scale,
                    translateZ: "0",
                }) +
                    `; transform-origin: left top; width:${screenwidth}px; height:${screenheight}px;`
            );
        } else if (screentype == "2") {
            gamescreenRef.current.style.width = bgWidth + "px";
            gamescreenRef.current.style.height = bgHeight + "px";
            iframeRef.current.setAttribute("style", "width:100%; height:100%;");
        } else if (screentype == "1") {
            gamescreenRef.current.style.width = windowWidth + "px";
            gamescreenRef.current.style.height = windowHeight + "px";
            iframeRef.current.setAttribute("style", "width:100%; height:100%;");
        }

        if (oldHeight !== "" && oldHeight != gamescreenRef.current.style.height)
            btResized.set(Date.now());
    };

    const myObserver = new ResizeObserver((entries) => {
        // this will get called whenever div dimension changes
        //  entries.forEach(entry => {
        //    console.log('width', entry.contentRect.width);
        //    console.log('height', entry.contentRect.height);
        //  });
        onResize();
        setTimeout(onResize, 500);
    });

    const onFullScreenChange = (evt) => {
        if (document.fullscreenElement) {
            btIsFullScreen.set(true);
        } else {
            btIsFullScreen.set(false);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", onResize);
        document.addEventListener("fullscreenchange", onFullScreenChange);

        myObserver.observe(gameResizer.current);

        // if (gamepanel.isPrimary) {
        // }
        setTimeout(() => {
            setIsOpen(true);
        }, 10);

        return () => {
            window.removeEventListener("resize", onResize);
            setIsOpen(false);
        };
    }, []);

    useEffect(() => {
        onResize();

        setTimeout(onResize, 1000);
    });

    let displayMode = props.displayMode;

    let iframeURL = `${config.https.cdn}static/iframe.html`;
    if (process.env.NODE_ENV) iframeURL = "/iframe.html";

    return (
        <>
            <VStack
                spacing="0"
                width="100%"
                // height="100%"
                position="relative"
                zIndex={10}
                top={0}
                left={0}
                justifyContent={"center"}
                alignContent={"center"}
                ref={gameResizer}
                // transition={isOpen ? 'filter 0.3s ease-in, opacity 0.5s ease-in' : ''}
                // filter={isOpen ? 'opacity(1)' : 'opacity(0)'}

                className={"gameResizer"}
                bgColor={"gray.925"}
            >
                {/* <LoadingBox isDoneLoading={gamepanel.loaded} /> */}
                <VStack
                    className="screen-wrapper"
                    // justifyContent={'flex-start'}
                    // alignContent={'center'}
                    w="100%"
                    // h={'100%'}
                    ref={gamewrapperRef}
                    transition={"filter 0.3s ease-in, opacity 0.5s ease-in"}
                    filter={isOpen ? "opacity(1)" : "opacity(0)"}
                    justifyContent={"flex-start"}
                    alignContent={"center"}
                    position="relative"
                >
                    <Box
                        ref={gamescreenRef}
                        className="gamescreenRef"
                        key={"gamescreenRef-" + gamepanel.id}
                        height="100%"
                        position="relative"
                        boxShadow={"0px 12px 24px rgba(0,0,0,0.2)"}
                        alignSelf="center"
                    >
                        {/* <ScaleFade initialScale={1} in={gamepanel.loaded} width="100%" height="100%" position="relative"> */}

                        {/* </ScaleFade> */}
                        <iframe
                            key={"iframe-game-" + gamepanel.id}
                            className="gamescreen"
                            ref={iframeRef}
                            // onResize={onResize}
                            onLoad={() => {
                                //let gamepanel = findGamePanelByRoom(room_slug);
                                gamepanel.iframe = iframeRef;
                                // setIFrame(room_slug, iframeRef);

                                sendLoadMessage(room_slug, game_slug, version);
                                onResize();
                                // setTimeout(() => {
                                //     onResize();
                                // }, 1000);
                                if (gamepanel.room.isReplay) {
                                    //replaySendGameStart(room_slug);
                                } else {
                                    updateGamePanel(gamepanel);
                                }
                            }}
                            src={iframeURL}
                            // srcDoc={iframeSrc}
                            allowtransparency="true"
                            sandbox="allow-scripts allow-same-origin"
                        />
                        {/* <GameMessageOverlay gamepanel={gamepanel} /> */}
                    </Box>
                </VStack>
                <Box
                    position="absolute"
                    bottom="1rem"
                    right="1rem"
                    display={
                        props.isFullScreen || displayMode == "theatre"
                            ? "block"
                            : "none"
                    }
                >
                    <IconButton
                        fontSize={"2rem"}
                        colorScheme={"clear"}
                        icon={<CgMinimizeAlt color="gray.300" />}
                        onClick={() => {
                            if (props.displayMode == "theatre") {
                                btDisplayMode.set("none");
                            }
                            if (props.isFullScreen) document.exitFullscreen();
                            // openFullscreen(props.fullScreenElem)
                        }}
                    >
                        Exit Full Screen
                    </IconButton>
                </Box>
                {/* <Box w="100%" height="3rem" bgColor="blue"></Box> */}
            </VStack>
        </>
    );
}

// let onCustomWatched = ownProps => {
//     return ['gamepanel/' + ownProps.id];
// };
// let onCustomProps = (key, value, store, ownProps) => {
//     if (key == ('gamepanel/' + ownProps.id))
//         return { gamepanel: value }
//     return {};
// };

export default GamePanel;

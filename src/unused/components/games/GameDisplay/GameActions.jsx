import {
    Badge,
    Box,
    Button,
    Text,
    Flex,
    IconButton,
    Input,
    Portal,
    Spacer,
    HStack,
    Icon,
    VStack,
} from "@chakra-ui/react";
import { BsArrowsFullscreen, RiLayoutRightLine, IoTimeOutline } from "@react-icons";

import { joinGame } from "../../../actions/game";
import { replayNextIndex, replayPrevIndex, wsLeaveGame } from "../../../actions/connection";
import {
    clearPrimaryGamePanel,
    clearRoom,
    findGamePanelByRoom,
    getGamePanel,
    getPrimaryGamePanel,
    getRoomStatus,
    setPrimaryGamePanel,
    setRoomForfeited,
} from "../../../actions/room";
import { useState } from "react";
import { BiSkipPrevious, BiSkipNext, BiCollapse } from "@react-icons";
import { useNavigate } from "react-router-dom";
import {
    btDisplayMode,
    btFullScreenElem,
    btGamePanels,
    btGameStatusUpdated,
    btIsMobile,
    btLatency,
    btPrimaryGamePanel,
    btShowLoadingBox,
} from "../../../actions/buckets";
import { useBucketSelector } from "../../../actions/bucket";

const resizeEvent = new Event("resize");

function GameActions(props) {
    let primaryGamePanel = useBucket(btPrimaryGamePanel);
    let isMobile = useBucket(btIsMobile);
    let gamestatusUpdated = useBucket(btGameStatusUpdated);
    let fullScreenElem = useBucket(btFullScreenElem);

    // const params = useParams();
    // const location = useLocation();

    // console.log('params', params);
    // console.log('location', location);;

    // const game_slug = params.game_slug;
    // const mode = params.mode;
    // const room_slug = params.room_slug;

    let gamepanel = getPrimaryGamePanel();

    if (!gamepanel) return <></>;

    const room = gamepanel.room;
    const room_slug = room.room_slug;
    const game_slug = room.game_slug;
    const mode = room.mode;

    let gamestate = gamepanel.gamestate || {}; //-events-gameover');
    let events = gamestate?.room?.events || {};
    let roomStatus = getRoomStatus(room_slug);
    let isGameover =
        roomStatus == "GAMEOVER" ||
        roomStatus == "GAMECANCELLED" ||
        roomStatus == "GAMEERROR" ||
        roomStatus == "NOSHOW" ||
        roomStatus == "ERROR" ||
        !gamepanel.active;

    /* When the openFullscreen() function is executed, open the video in fullscreen.
    Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
    const openFullscreen = (elem) => {
        if (!elem) return;
        elem = elem.current;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
        }

        window.dispatchEvent(resizeEvent);
    };

    const onForfeit = (elem) => {
        btDisplayMode.set("none");

        if (isGameover) {
            // wsLeaveGame(game_slug, room_slug);
            clearRoom(room_slug);
            clearPrimaryGamePanel();
        } else {
            setRoomForfeited(room_slug);
            wsLeaveGame(room_slug);
        }
    };

    const handleJoin = async () => {
        if (room.maxplayers == 1) btShowLoadingBox.assign({ [gamepanel.id]: true });

        btDisplayMode.set("none");
        clearRoom(room_slug);
        // clearPrimaryGamePanel();
        let isExperimental = mode == "experimental"; // (window.location.href.indexOf('/experimental/') != -1);
        // await wsLeaveGame(game_slug, room_slug);

        //0=experimental, 1=rank
        joinGame({ game_slug: room.game_slug }, isExperimental);
    };

    let latency = btLatency.get() || 0;
    let latencyColor = "green";
    if (latency > 400) {
        latencyColor = "red";
    } else if (latency > 200) {
        latencyColor = "yellow";
    }

    if (gamepanel.room.isReplay) {
        return <GameActionsReplay room_slug={room.room_slug} />;
    }

    return (
        <VStack
            // h={props.isBottomLayout ? '100%' : '5rem'}
            w={"100%"}
            justify={"center"}
            // bgColor={'gray.600'}
            py="0.6rem"
        >
            {/* <HStack alignItems={'center'}>
                <BsBarChartFill size="1.2rem" color={latencyColor} /><Text as="span" fontSize="xxs"> {latency}ms</Text>
            </HStack> */}

            {/* 
            <Box>
                <IconButton
                    fontSize={'xxs'}
                    colorScheme={'clear'}
                    icon={<RiLayoutRightLine color="white" />}
                    onClick={() => {
                        fs.set('displayMode', 'theatre');
                        // fs.set('chatToggle', false);
                        // openFullscreen(props.fullScreenElem)
                    }}
                >
                    Full Screen
                </IconButton>
            </Box>

            <Box>
                <IconButton
                    fontSize={'xxs'}
                    colorScheme={'clear'}
                    icon={<BsArrowsFullscreen color="white" />}
                    onClick={() => {
                        openFullscreen(props.fullScreenElem)
                    }}
                >
                    Full Screen
                </IconButton>
            </Box> */}

            <HStack h="4rem" color="#fff">
                <Box>
                    <Button
                        // height="1.6rem"
                        display={!isGameover ? "block" : "none"}
                        fontSize={"xxs"}
                        bgColor={"red.800"}
                        onClick={onForfeit}
                    >
                        {"Forfeit"}
                    </Button>
                </Box>

                <Box>
                    <Button
                        // height="1.6rem"
                        display={isGameover ? "block" : "none"}
                        fontSize={"xxs"}
                        bgColor={"red.800"}
                        onClick={onForfeit}
                    >
                        {"Leave"}
                    </Button>
                </Box>

                <Box display={isGameover ? "block" : "none"} ml="1rem">
                    <Button
                        // height="1.6rem"
                        fontSize={"xxs"}
                        bgColor="brand.500"
                        _hover={{ bg: "alt.300" }}
                        _active={{ bg: "alt.300" }}
                        onClick={handleJoin}
                    >
                        Play Again
                    </Button>
                </Box>
            </HStack>
            {/* <LeaveGame></LeaveGame> */}
        </VStack>
    );
}

function GameActionsReplay(props) {
    let [paused, setPaused] = useState(false);
    let navigate = useNavigate();

    let gamepanel = findGamePanelByRoom(props.room_slug);

    let gp = useBucketSelector(btGamePanels, (bucket) => bucket[gamepanel.id]);

    let history = gamepanel?.room.history || [];

    let startIndex = 0;
    for (let i = 0; i < history.length; i++) {
        let h = history[i];
        if (h.payload.room.status == "gamestart") {
            startIndex = i;
            break;
        }
    }

    let endIndex = history.length;
    let total = endIndex - startIndex;
    let replayIndex = gamepanel.room.replayIndex || startIndex;
    let currentOffset = replayIndex - startIndex + 1;
    return (
        <Box w="100%">
            <HStack spacing="0">
                <Button
                    p="0"
                    m="0"
                    onClick={() => {
                        replayPrevIndex(props.room_slug);
                    }}
                >
                    <Icon as={BiSkipPrevious} height="3rem" width="3rem" />
                </Button>
                {/* <Button onClick={() => {
                    if (paused)
                        sendUnpauseMessage(props.room_slug);
                    else
                        sendPauseMessage(props.room_slug);
                    setPaused(!paused);
                }}>{paused ? 'Play' : 'Pause'}</Button> */}
                <Box px="0.25rem" align="center" fontSize="xs" color="white">
                    <Text as="span">{currentOffset}</Text>
                    <Text as="span" px="0.5rem">
                        of
                    </Text>
                    <Text as="span">{total}</Text>
                </Box>
                <Button
                    p="0"
                    m="0"
                    onClick={() => {
                        replayNextIndex(props.room_slug);
                    }}
                >
                    <Icon as={BiSkipNext} height="3rem" width="3rem" />
                </Button>
                <Box flex="1"></Box>
                <Box>
                    <Button
                        p="0"
                        m="0"
                        onClick={() => {
                            // setPrimaryGamePanel();
                            //   let navigated = fs.get("replay/navigated");
                            // if (navigated)
                            //     navigate(-1);
                            // else {
                            //clearRoom('REPLAY/' + gamepanel.room.game_slug);
                            setPrimaryGamePanel();
                            navigate("/g/" + gamepanel.room.game_slug);

                            // }
                        }}
                    >
                        <Icon as={BiCollapse} height="2rem" width="2rem" />
                    </Button>
                </Box>
            </HStack>
        </Box>
    );
}

export default GameActions;

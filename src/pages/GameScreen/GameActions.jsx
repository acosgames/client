import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { wsLeaveGame } from "../../actions/connection";
import {
    getPrimaryGamePanel,
    getRoomStatus,
    clearRoom,
    clearPrimaryGamePanel,
    setRoomForfeited,
} from "../../actions/room";
import { joinGame } from "../../actions/game";
import { AnimatePresence, motion } from "framer-motion";
import { useBucket } from "../../actions/bucket";
import {
    btDisplayMode,
    btGameStatusUpdated,
    btPrimaryGamePanel,
    btShowLoadingBox,
} from "../../actions/buckets";

const MotionHStack = motion(HStack);

export default function GameActions() {
    let primaryId = useBucket(btPrimaryGamePanel);
    let gamestatusUpdated = useBucket(btGameStatusUpdated);

    let gamepanel = getPrimaryGamePanel();

    if (!gamepanel) return <AnimatePresence></AnimatePresence>;

    //   let primary = getGamePanel(primaryId);
    const room = gamepanel.room;
    const room_slug = room.room_slug;
    const game_slug = room.game_slug;
    const mode = room.mode;

    let gamestate = gamepanel.gamestate;
    let events = gamestate?.events || {};
    let roomStatus = getRoomStatus(room_slug);
    let isGameover =
        roomStatus == "GAMEOVER" ||
        roomStatus == "GAMECANCELLED" ||
        roomStatus == "GAMEERROR" ||
        roomStatus == "NOSHOW" ||
        roomStatus == "ERROR" ||
        !gamepanel.active;

    const onForfeit = (elem) => {
        btDisplayMode.set("none");
        roomStatus = getRoomStatus(room_slug);
        isGameover =
            roomStatus == "GAMEOVER" ||
            roomStatus == "GAMECANCELLED" ||
            roomStatus == "GAMEERROR" ||
            roomStatus == "NOSHOW" ||
            roomStatus == "ERROR" ||
            !gamepanel.active;

        // if (isGameover) {
        // wsLeaveGame(game_slug, room_slug);

        // } else {
        setRoomForfeited(room_slug);
        wsLeaveGame(room_slug);
        // }

        clearRoom(room_slug);
        clearPrimaryGamePanel();
    };

    const handleJoin = async () => {
        if (room.maxplayers == 1)
            btShowLoadingBox.assign({ [gamepanel.id]: true });

        btDisplayMode.set("none");
        clearRoom(room_slug);
        // clearPrimaryGamePanel();
        let isExperimental = mode == "experimental"; // (window.location.href.indexOf('/experimental/') != -1);
        // await wsLeaveGame(game_slug, room_slug);

        //0=experimental, 1=rank
        joinGame({ game_slug: room.game_slug }, isExperimental);
    };

    return (
        <AnimatePresence>
            <MotionHStack
                key={"game-actions-motion"}
                layout
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ x: 300 }}
                transition={{ duration: 0.3 }}
                position="relative"
                h="4rem"
                pt="1rem"
                pb="1.25rem"
                w="100%"
                // bg="linear-gradient(to right, var(--chakra-colors-gray-1200), var(--chakra-colors-gray-900))"
                bgColor="gray.925"
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Box>
                    <Button
                        // height="1.6rem"
                        borderRadius="4px"
                        display={!isGameover ? "block" : "none"}
                        fontSize={"xxs"}
                        bgColor={"gray.800"}
                        transform="skew(-15deg)"
                        boxShadow="3px 3px 0 var(--chakra-colors-red-600)"
                        _hover={{
                            boxShadow: "5px 3px 0 var(--chakra-colors-red-600)",
                        }}
                        onClick={onForfeit}
                    >
                        <Text as="span">Forfeit</Text>
                    </Button>
                </Box>

                <Box>
                    <Button
                        // height="1.6rem"
                        display={isGameover ? "block" : "none"}
                        fontSize={"xxs"}
                        bgColor={"gray.800"}
                        transform="skew(-15deg)"
                        boxShadow="3px 3px 0 var(--chakra-colors-red-600)"
                        _hover={{
                            boxShadow: "5px 3px 0 var(--chakra-colors-red-600)",
                        }}
                        onClick={onForfeit}
                    >
                        <Text as="span">Leave</Text>
                    </Button>
                </Box>

                <Box display={isGameover ? "block" : "none"} ml="1rem">
                    <Button
                        // height="1.6rem"
                        fontSize={"xxs"}
                        // bgColor="brand.500"
                        // _hover={{ bg: "brand.600" }}
                        // _active={{ bg: "brand.900" }}

                        bgColor={"gray.800"}
                        transform="skew(-15deg)"
                        boxShadow="3px 3px 0 var(--chakra-colors-brand-300)"
                        _hover={{
                            boxShadow:
                                "5px 3px 0 var(--chakra-colors-brand-300)",
                        }}
                        onClick={handleJoin}
                    >
                        <Text as="span">Play Again</Text>
                    </Button>
                </Box>
            </MotionHStack>
        </AnimatePresence>
    );
}

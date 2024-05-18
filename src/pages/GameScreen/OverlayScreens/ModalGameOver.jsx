import { Button, Heading, Text, VStack, chakra } from "@chakra-ui/react";
import SimpleBar from "simplebar-react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { getGamePanel, updateGamePanel } from "../../../actions/room";

import { AnimatePresence } from "framer-motion";
import {
    btGamePanels,
    btGameScreenSize,
    btGameStatus,
    btPrimaryGamePanel,
    btPrimaryState,
    btUser,
} from "../../../actions/buckets";
import { useBucket, useBucketSelector } from "../../../actions/bucket";

const MotionVStack = motion(VStack);
let ChakraSimpleBar = chakra(SimpleBar);

export default function ModalGameOver({ gamepanelid }) {
    let showGameover = useBucketSelector(
        btGamePanels,
        (gamepanels) => gamepanels[gamepanelid]?.showGameover
    );
    let scrollRef = useRef();

    if (!showGameover) return <></>;

    let gamepanel = getGamePanel(gamepanelid);
    if (!gamepanel) return <></>;

    let gamestate = gamepanel.gamestate;
    let players = gamestate.players;

    // let [show, setShow] = useState(true);

    const onClose = (e) => {
        gamepanel.showGameover = false;
        btGamePanels.assign({ [gamepanelid]: gamepanel });
    };

    let [bgWidth, bgHeight] = btGameScreenSize.get() || [0, 0];

    let localPlayer = btUser.get();
    let shortid = localPlayer.shortid;
    if (shortid in players) {
        localPlayer = players[shortid];
    }

    if (!localPlayer) return <></>;

    return (
        <AnimatePresence>
            <motion.div
                key={"overlay-gameover"}
                className="overlay-gameover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    // transform: "skew(-10deg)",
                    // backgroundColor: "rgba(0,0,0,1)",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    zIndex: 112,
                    filter: "drop-shadow(0 0 20px black)",
                }}
            >
                <MotionVStack
                    // overflow="hidden"
                    w={["90%", "70%", "60%", "50%"]}
                    // h="50%"
                    position="absolute"
                    top={bgHeight / 2}
                    left="50%"
                    border="0"
                    zIndex={101}
                    borderRadius="8px"
                    // overflow="hidden"
                    // borderTop="1px solid"
                    // borderBottom="1px solid"
                    // borderColor="gray.1200"
                    initial={{ scale: 0.1, x: "-50%", y: "-50%" }}
                    animate={{ scale: 1, x: "-50%", y: "-50%" }}
                    transition={{
                        duraton: 1,
                    }}
                    // filter="drop-shadow(0 0 20px var(--chakra-colors-red-300)) drop-shadow(0 0 40px black) drop-shadow(0 0 60px black)"
                    // opacity="0.95"
                    bgColor="rgba(0,0,0,0.8)"
                    // boxShadow="6px 5px 30px rgba(0,0,0,0.7)"
                    // bg="linear-gradient(to bottom, var(--chakra-colors-gray-900), var(--chakra-colors-gray-1200))"
                >
                    <VStack
                        width="100%"
                        height={"100%"}
                        transition={"all 0.3s ease"}
                        spacing="0rem"
                        position="relative"
                        // overflow="hidden"
                        flex="1"
                        mb="0"
                        pb="0"
                        borderRadius={"8px"}
                        zIndex="2"
                    >
                        {/* <ChakraSimpleBar
                            boxSizing="border-box"
                            flex="1"
                            // borderTop={["2px solid var(--chakra-colors-gray-800)"]}
                            style={{
                                width: "100%",
                                height: "auto",
                                flex: "1",
                                overflow: "hidden scroll",
                                boxSizing: "border-box",
                            }}
                            scrollableNodeProps={{ ref: scrollRef }}
                        > */}
                        <Screen1 gamepanelid={gamepanelid} />
                        {/* <LeftPlayer player={localPlayer} isLeft={true} ignoreLocal={true} initial={{ opacity: 0 }} animate={{ opacity: 1 }} /> */}
                        {/* 
                        Screen 1:
                            - Win / Lose / Forfeit / Crash
                            - Rank Up / Down 
                            - Skill Points awarded
                        Screen 2:
                            - Match Completed XP
                            - Score XP
                            - Win XP
                            - Daily Win XP
                        Screen 3 - Achievements
                        Screen 4 - Extras (bounties/etc)
                        */}
                        {/* </ChakraSimpleBar> */}
                    </VStack>
                </MotionVStack>
            </motion.div>
        </AnimatePresence>
    );
}

function Screen1({ gamepanelid }) {
    let primaryId = useBucket(btPrimaryGamePanel);
    let gamestatus = useBucketSelector(
        btGameStatus,
        (bucket) => bucket[primaryId]
    );
    let roomstate = useBucketSelector(
        btPrimaryState,
        (bucket) => bucket.roomstate
    );

    if (gamestatus == "GAMEOVER") {
        return <GameFinish gamepanelid={gamepanelid} />;
    }
    return <GameCancelled gamepanelid={gamepanelid} />;
}

function findPlayerRanks(players) {
    let rankOne = [];
    let rankOther = [];
    let lowestRank = 99999;
    for (var id in players) {
        let player = players[id];
        if (player.rank < lowestRank) lowestRank = player.rank;
    }
    for (var id in players) {
        let player = players[id];

        if (player.rank == lowestRank) {
            rankOne.push(id);
        } else {
            rankOther.push(id);
        }
    }
    return { rankOne, rankOther };
}

function findTeamRanks(teams) {
    let rankOne = [];
    let rankOther = [];
    let lowestRank = 99999;
    for (var id in teams) {
        let team = teams[id];
        if (team.rank < lowestRank) lowestRank = team.rank;
    }
    for (var id in teams) {
        let team = teams[id];

        if (team.rank == lowestRank) {
            rankOne.push(id);
        } else {
            rankOther.push(id);
        }
    }

    return { rankOne, rankOther };
}

function GameFinish({ gamepanelid }) {
    let gamepanel = btGamePanels.get((gps) => gps[gamepanelid]);
    let players = useBucketSelector(btPrimaryState, (bucket) => bucket.players);
    let teams = useBucketSelector(btPrimaryState, (bucket) => bucket.teams);

    let user = btUser.get() || { shortid: "none" };

    let localPlayer = players[user.shortid] || { rank: 0, team_slug: "none" };
    // let localTeam = teams[localPlayer.team_slug] || { rank: 0 };

    let title = "Victory";

    let playerRanks = findPlayerRanks(players || {});
    let teamRanks = findTeamRanks(teams || {});

    if (
        (teams && teamRanks.rankOther.length == 0) ||
        (!teams && playerRanks.rankOther.length == 0)
    ) {
        title = "Tied";
    } else {
        if (
            (teams && teamRanks.rankOne.find((r) => r == localPlayer.teamid)) ||
            (!teams &&
                playerRanks.rankOne.find((r) => r == localPlayer.shortid))
        )
            title = "Victory";
        else title = "Defeat";
    }

    return (
        <VStack w="100%" h="100%" pb="1rem" pt="0.5rem" position="relative">
            <Heading
                position="absolute"
                left="50%"
                transform="translateX(-50%) skew(-15deg)"
                top="-4.5rem"
                textTransform={"uppercase"}
                as="h5"
                fontWeight="600"
                fontSize={["6rem"]}
                color="gray.0"
                textShadow="0 0 4px black, 0 0 8px black, 0 0 8px black"
            >
                {title}
            </Heading>
            <VStack my="6rem">
                <Text as="span" fontSize="1.6rem" color="gray.0">
                    No XP
                </Text>
            </VStack>

            <VStack
                flex="1"
                minH="5rem"
                justifyContent={"flex-end"}
                position="absolute"
                bottom="-2rem"
                left="50%"
                transform="translateX(-50%)"
            >
                <Button
                    height="4rem"
                    w="10rem"
                    borderRadius="4px"
                    display={"block"}
                    fontSize={"xxs"}
                    bgColor={"gray.800"}
                    transform="skew(-15deg)"
                    boxShadow="3px 3px 0 var(--chakra-colors-brand-300)"
                    _hover={{
                        boxShadow: "5px 3px 0 var(--chakra-colors-brand-300)",
                    }}
                    onClick={() => {
                        gamepanel.showGameover = false;
                        gamepanel.closeOverlay = true;
                        updateGamePanel(gamepanel);
                    }}
                >
                    <Text as="span" color="gray.0" transform="skew(15deg)">
                        Close
                    </Text>
                </Button>
            </VStack>
        </VStack>
    );
}

function GameCancelled({ gamepanelid }) {
    let gamepanel = btGamePanels.get((gps) => gps[gamepanelid]);
    return (
        <VStack w="100%" h="100%" pb="1rem" pt="0.5rem">
            <Heading
                as="h5"
                fontWeight="300"
                fontSize={["2.4rem", "3rem", "3rem", "3rem"]}
                color="gray.0"
                // textShadow="0 0 4px var, 0 0 4px #ccc"
            >
                GAME CANCELLED
            </Heading>
            <VStack pt="2rem">
                <Text as="span">No XP</Text>
            </VStack>

            <VStack flex="1" minH="5rem" justifyContent={"flex-end"}>
                <Button
                    // height="1.6rem"
                    borderRadius="4px"
                    display={"block"}
                    fontSize={"xxs"}
                    bgColor={"gray.800"}
                    transform="skew(-15deg)"
                    boxShadow="3px 3px 0 var(--chakra-colors-brand-300)"
                    _hover={{
                        boxShadow: "5px 3px 0 var(--chakra-colors-brand-300)",
                    }}
                    onClick={() => {
                        gamepanel.showGameover = false;
                        gamepanel.closeOverlay = true;
                        updateGamePanel(gamepanel);
                    }}
                >
                    <Text as="span" color="gray.0" transform="skew(15deg)">
                        Close
                    </Text>
                </Button>
            </VStack>
        </VStack>
    );
}

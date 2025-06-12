import {
    Box,
    Button,
    HStack,
    Heading,
    Icon,
    Image,
    ModalOverlay,
    Portal,
    Progress,
    Text,
    VStack,
    chakra,
} from "@chakra-ui/react";
import SimpleBar from "simplebar-react";
import { useEffect, useRef, useState } from "react";
import {
    domAnimation,
    LazyMotion,
    motion,
    useAnimate,
    useInView,
    useMotionValue,
    useTransform,
} from "framer-motion";
import { getGamePanel, updateGamePanel } from "../../../actions/room";

import { AnimatePresence } from "framer-motion";
import {
    btExperience,
    btGamePanels,
    btGameScreenSize,
    btGameStatus,
    btPrimaryGamePanel,
    btPrimaryState,
    btRankingUpdate,
    btUser,
} from "../../../actions/buckets";

import config from "../../../config";

import ratingConfig from "../../../actions/ratingconfig";
import { bucket, useBucket, useBucketSelector } from "../../../actions/bucket";
import RenderPlayer from "../Scoreboard/RenderPlayer";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const MotionVStack = motion(VStack);
const MotionHStack = motion(HStack);
const MotionText = motion(Text);
let ChakraSimpleBar = chakra(SimpleBar);

let btGameoverScreen = bucket(0);

export function ModalGameOver({ gamepanelid }) {
    let showGameover = useBucketSelector(
        btGamePanels,
        (gamepanels) => gamepanels[gamepanelid]?.showGameover
    );
    let scrollRef = useRef();

    useEffect(() => {
        if (!showGameover && btGameoverScreen.get() != 0) {
            btGameoverScreen.set(0);
        }
    });

    if (!showGameover) return <></>;

    return (
        <AnimatePresence>
            <ScreenChooser gamepanelid={gamepanelid} />
        </AnimatePresence>
    );
}

function ScreenChooser({ gamepanelid }) {
    let screen = useBucket(btGameoverScreen);
    let gamestatus = useBucketSelector(btGameStatus, (bucket) => bucket[gamepanelid]);
    /* 
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
    */

    let screenComponent = <></>;

    if (gamestatus == "GAMECANCELLED") {
        return <GameCancelled gamepanelid={gamepanelid} />;
    } else if (gamestatus == "GAMEERROR") {
    } else if (gamestatus == "GAMEOVER") {
        switch (screen) {
            case 0:
                return <Screen1 gamepanelid={gamepanelid} />;
            case 1:
                return <Screen2 gamepanelid={gamepanelid} />;
            case 2:
                return <Screen3 gamepanelid={gamepanelid} />;
            case 3:
                return <Screen4 gamepanelid={gamepanelid} />;
        }
    }

    return <></>;
}

function Screen4({ gamepanelid }) {
    let gamestate = useBucketSelector(
        btGamePanels,
        (gamepanels) => gamepanels[gamepanelid]?.gamestate
    );

    let gamepanel = btGamePanels.get((gps) => gps[gamepanelid]);
    let players = gamestate?.players || {};
    let user = btUser.get();
    let player = players[user.shortid];
    if (!player) {
        return <></>;
    }

    return (
        <OverlayFrame
            gamepanelid={gamepanelid}
            title={"Stats"}
            onActionClick={() => {
                gamepanel.showGameover = false;
                gamepanel.closeOverlay = true;
                updateGamePanel(gamepanel);
                // btGameoverScreen.set(2);
            }}
            actionTitle={"Close"}
        >
            <VStack my="4rem" mx="2rem"></VStack>
        </OverlayFrame>
    );
}

let screen3Timeout = 0;
function Screen3({ gamepanelid }) {
    let newRanking = useBucket(btRankingUpdate);
    let ranking = useBucket(btRankingUpdate);

    let gamestate = useBucketSelector(
        btGamePanels,
        (gamepanels) => gamepanels[gamepanelid]?.gamestate
    );

    useEffect(() => {
        // screen3Timeout = setTimeout(() => {
        //     btGameoverScreen.set(3);
        // }, 6000);
        // return () => {
        //     if (screen3Timeout) clearTimeout(screen3Timeout);
        //     screen3Timeout = 0;
        // };
    }, []);

    let players = gamestate?.players || {};
    let user = btUser.get();
    let player = players[user.shortid];
    if (!player) {
        return <></>;
    }

    let prevRanking = { ...player };
    prevRanking.rating = 2000;

    let ratingDiff = ranking.rating - prevRanking.rating;
    let rankDiff = ranking.rank - prevRanking.rank;

    let prevClassString = ratingConfig.ratingToRank(prevRanking.rating);
    let classString = ratingConfig.ratingToRank(ranking.rating);

    let classChangeStatus = "";
    if (prevClassString != classString) {
        classChangeStatus = ratingDiff > 0 ? "Promoted" : "Demoted";
    }
    // let player = players[newRanking?.shortid];

    let ratingArrow = <></>;
    if (ratingDiff > 0) {
        ratingArrow = <Icon as={BiSolidUpArrow} color="brand.50" />;
    } else {
        ratingArrow = <Icon as={BiSolidDownArrow} color="red.300" />;
    }
    return (
        <OverlayFrame
            gamepanelid={gamepanelid}
            title={"Rating"}
            onActionClick={() => {
                btGameoverScreen.set(3);
            }}
            actionTitle={"Next"}
            // duration={6}
        >
            <VStack w="100%" mt="2rem" pt="1rem" pb="2rem" px="2rem">
                <HStack justifyContent={"center"} alignItems={"center"}>
                    {/* <Text as="span">Rank</Text> */}

                    <MotionText
                        initial={{
                            opacity: 0,
                            x: prevClassString != classString ? 20 : 0, //prevClassString != classString ? 1 : 0,
                        }}
                        animate={{
                            opacity: 1,
                            x: prevClassString != classString ? [20, 20, 0] : 0, //prevClassString != classString ? 0 : 1,
                        }}
                        transition={{ duration: 2 }}
                        as="span"
                        fontSize="3rem"
                        filter="drop-shadow(0 0 12px rgba(255,255,255,0.5)) drop-shadow(0 0 4px rgba(255,255,255,0.8))"
                        onAnimationComplete={(definition) => {}}
                    >
                        {prevClassString}
                    </MotionText>
                    {prevClassString != classString && (
                        <>
                            <MotionText
                                initial={{
                                    opacity: prevClassString != classString ? 0 : 1,
                                }}
                                animate={{
                                    opacity: prevClassString != classString ? 1 : 0,
                                }}
                                transition={{ delay: 1, duration: 2 }}
                                as="span"
                                fontSize="1.6rem"
                                position="relative"
                                // filter="drop-shadow(0 0 12px rgba(255,255,255,0.5)) drop-shadow(0 0 4px rgba(255,255,255,0.8))"
                            >
                                <Icon
                                    position="relative"
                                    top="0.25rem"
                                    as={FaArrowRight}
                                    color={ratingDiff > 0 ? "alt.50" : "red.300"}
                                />
                            </MotionText>
                            <MotionText
                                initial={{
                                    opacity: prevClassString != classString ? 0 : 1,
                                }}
                                animate={{
                                    opacity: prevClassString != classString ? 1 : 0,
                                }}
                                transition={{ delay: 1, duration: 2 }}
                                as="span"
                                fontSize="3rem"
                                filter="drop-shadow(0 0 12px rgba(255,255,255,0.5)) drop-shadow(0 0 4px rgba(255,255,255,0.8))"
                            >
                                {classString}
                            </MotionText>
                        </>
                    )}
                </HStack>

                <HStack>
                    <NumberIncrease
                        key={"ranking-rating-change-" + ranking.rating}
                        start={prevRanking.rating}
                        fontSize="1.6rem"
                        end={ranking.rating}
                        // color={ratingDiff > 0 ? "brand.50" : "red.300"}
                        duration={2}
                    />
                    {prevClassString == classString && ratingArrow}
                </HStack>

                <Box h="4rem">
                    {classChangeStatus && (
                        <MotionText
                            position="relative"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: [1.0, 1.5, 1.0] }}
                            transition={{ delay: 1, duration: 2 }}
                            textTransform="uppercase"
                            as="span"
                            display="block"
                            fontSize="1.8rem"
                            color={ratingDiff > 0 ? "alt.300" : "red.500"}
                        >
                            {classChangeStatus}
                        </MotionText>
                    )}
                </Box>
            </VStack>
        </OverlayFrame>
    );
}

let screen2Timeout = 0;

function Screen2({ gamepanelid }) {
    let gamepanel = btGamePanels.get((gps) => gps[gamepanelid]);
    let xp = btExperience.get();

    useEffect(() => {
        // screen2Timeout = setTimeout(() => {
        //     btGameoverScreen.set(2);
        // }, 6000);
        // return () => {
        //     if (screen2Timeout) clearTimeout(screen2Timeout);
        // };
    }, []);

    // xp.previousPoints = 900;
    // xp.points = 2000;
    // xp.previousLevel = 1;
    // xp.level = 3;
    return (
        <OverlayFrame
            gamepanelid={gamepanelid}
            title={"Experience"}
            onActionClick={() => {
                // gamepanel.showGameover = false;
                // gamepanel.closeOverlay = true;
                // updateGamePanel(gamepanel);
                btGameoverScreen.set(2);
            }}
            actionTitle={"Next"}
            // duration={6}
        >
            <VStack my="4rem" mx="2rem">
                <XPProgress {...xp} />
                <XPLineItems experience={xp.experience} points={xp.points} level={xp.level} />
            </VStack>
        </OverlayFrame>
    );
}

export function XPLineItems({ experience, points, level, hideTotal }) {
    console.log(experience);

    return (
        <VStack w="100%" className="xp-line-items" px="5rem" mt="1rem">
            {experience.map((xp, i) => {
                let delay = 0.4 * i;
                return (
                    <MotionHStack
                        w="100%"
                        key={"experience-" + xp.type}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay }}
                    >
                        <Text as="span" fontSize="1.4rem">
                            {xp.type}
                        </Text>
                        <Box flex="1"></Box>
                        <Text as="span" fontWeight="500" fontSize="1.4rem">
                            {xp.value} <Text as="span">XP</Text>
                        </Text>
                    </MotionHStack>
                );
            })}
            {!hideTotal && (
                <MotionHStack
                    w="100%"
                    key={"experience-total"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.3,
                        delay: 0.4 * experience.length,
                    }}
                >
                    <Text as="span" fontWeight={"bold"} fontSize="1.4rem">
                        Total
                    </Text>
                    <Box flex="1"></Box>
                    <Text as="span" fontWeight="bold" fontSize="1.4rem">
                        {points} <Text as="span">XP</Text>
                    </Text>
                </MotionHStack>
            )}
            <MotionHStack
                w="100%"
                mt="1rem"
                justifyContent="center"
                alignItems="center"
                key={"experience-level"}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                transition={{
                    duration: 1,
                    delay: 0.4 * (experience.length + 1),
                }}
            >
                <Text as="span" fontWeight={"bold"} fontSize="1.6rem">
                    Level
                </Text>

                <Text as="span" fontWeight="bold" fontSize="1.6rem">
                    {level}
                </Text>
            </MotionHStack>
        </VStack>
    );
}

let xpTimeout = 0;

export function XPProgress({ previousPoints, previousLevel, points, level, experience }) {
    // let userLevel = useBucketSelector(btUser, (user) => user.level);

    // let previousPct = (previousPoints / 1000) * 100;
    // let deltaPct = ((points - previousPoints) / 1000) * 100;

    // let totalPoints = experience.reduce((total, xp) => total + xp.value, 0);
    let [curPoints, setCurPoints] = useState(points);
    let [prevPoints, setPrevPoints] = useState(previousPoints);
    let [previousPct, setPreviousPct] = useState((previousPoints / 1000) * 100);
    let [deltaPct, setDeltaPct] = useState((points / 1000) * 100);
    let [currentLevel, setCurrentLevel] = useState(previousLevel);

    useEffect(() => {
        let overflowPct = 0;
        if (previousPct + deltaPct > 100) {
            overflowPct = previousPct + deltaPct - 100;
            deltaPct = 100;
        }
        console.log("deltaPct: ", deltaPct);
        console.log("overflow: ", overflowPct);
        if (overflowPct > 0) {
            xpTimeout = setTimeout(() => {
                setPreviousPct(0);
                setDeltaPct(overflowPct);
                setCurPoints(prevPoints + curPoints - 1000);

                setPrevPoints(0);
                setCurrentLevel(currentLevel + 1);
            }, 1000);
        }

        return () => {
            if (xpTimeout != 0) {
                clearTimeout(xpTimeout);
            }
        };
    });

    let cappedPct = Math.min(deltaPct, 100 - previousPct);
    let cappedEndPoints = Math.min(points, 1000);
    return (
        <VStack w="100%" spacing="0.25rem">
            <HStack position="relative" width="100%" h="1rem" spacing="2rem">
                <Text as="span" fontSize="1.4rem" w="4rem" textAlign={"right"}>
                    {currentLevel}
                </Text>
                <HStack
                    position="relative"
                    width="100%"
                    h="1rem"
                    bgColor="gray.400"
                    spacing="0.4rem"
                >
                    <VStack
                        h="1rem"
                        bgColor="alt.300"
                        width={previousPct + "%"}
                        // initial={{ width: previousPct + "%" }}
                        // animate={{ width: previousPct + "%" }}
                        // exit={{ width: "0%" }}
                        // transition={{ duration: 0.3 }}
                    ></VStack>
                    <MotionVStack
                        key={"xp-progress-" + currentLevel}
                        h="1rem"
                        bgColor="alt.600"
                        position={"absolute"}
                        borderRight="1px solid var(--chakra-colors-alt-900)"
                        left={previousPct + "%"}
                        top="0"
                        initial={{ width: "0%" }}
                        animate={{ width: cappedPct + "%" }}
                        exit={{ width: "0%" }}
                        transition={{
                            // delay: 0.25,
                            duration: 1,
                        }}
                    ></MotionVStack>
                </HStack>
                <Text as="span" fontSize="1.4rem" w="4rem" textAlign={"left"}>
                    {currentLevel + 1}
                </Text>
            </HStack>
            <HStack w="100%" justifyContent={"flex-end"} pr="5rem" color="gray.50" fontSize="1rem">
                <NumberIncrease
                    key={"xp-number-increase-" + currentLevel}
                    start={prevPoints}
                    end={prevPoints + curPoints}
                    duration={1}
                />
                <Text as="span">/</Text>
                <Text as="span">1,000</Text>
            </HStack>
        </VStack>
    );
}

function NumberIncrease({ start, end, duration, ease, fontSize, lineHeight, color }) {
    const ref = useRef(null);

    const isInView = useInView(ref, {
        once: true,
        margin: "0px 0px -100px 0px",
    });

    const [_, animate] = useAnimate();
    const startingValue = useMotionValue(start);

    const currentValue = useTransform(startingValue, (value) => Math.round(value).toLocaleString());

    useEffect(() => {
        if (isInView) {
            animate(startingValue, end, {
                duration,
                ease: ease || "circIn",
            });
        }
    }, [animate, isInView, end, startingValue]);

    return (
        <LazyMotion features={domAnimation}>
            <MotionText
                as="span"
                color={color || "gray.20"}
                lineHeight={lineHeight || "1.4rem"}
                fontSize={fontSize || "1.2rem"}
                ref={ref}
            >
                {currentValue}
            </MotionText>
        </LazyMotion>
    );
}

let screen1Timeout = 0;
// Victory screen
function Screen1({ gamepanelid }) {
    let gamepanel = btGamePanels.get((gps) => gps[gamepanelid]);
    let players = useBucketSelector(btPrimaryState, (bucket) => bucket.players);
    let teams = useBucketSelector(btPrimaryState, (bucket) => bucket.teams);

    const renderHeading = () => {
        if (!teams) return <></>;
        let teamRanks = findTeamRanks(teams || {});
        let winningTeamId = teamRanks?.rankOne[0];
        let winningTeam = teams[winningTeamId];
        return (
            <>
                <Heading
                    as="h3"
                    color="gray.0"
                    fontSize="2rem"
                    fontWeight="500"
                    textShadow={"0 0 8px " + winningTeam.color}
                >
                    {winningTeam.name}
                </Heading>
                <Box
                    w="100%"
                    height="2px"
                    my="0.5rem"
                    bg={`linear-gradient(to right, rgba(0,0,0,0) 0%, ${winningTeam.color} 50% ,  rgba(0,0,0,0) 100%)`}
                ></Box>
            </>
        );
    };

    const renderWinners = () => {
        if (teams) {
            let teamRanks = findTeamRanks(teams || {});
            let winningTeamId = teamRanks?.rankOne[0];
            let winningTeam = teams[winningTeamId];

            return (
                <>
                    {teamRanks.rankOne.map((teamid) => {
                        let team = teams[teamid];
                        return team.players.map((shortid) => {
                            let player = players[shortid];

                            return (
                                <RenderPlayerSimple
                                    gamepanelid={gamepanelid}
                                    key={"renderteam-player-" + shortid}
                                    shortid={shortid}
                                    {...player}
                                    team={team}
                                />
                            );
                        });
                    })}
                </>
            );
        } else {
            return (
                <>
                    {teamRanks.rankOne.map((teamid) => {
                        let team = teams[teamid];
                        return team.players.map((shortid) => {
                            let player = players[shortid];

                            return (
                                <RenderPlayerSimple
                                    gamepanelid={gamepanelid}
                                    key={"renderteam-player-" + shortid}
                                    shortid={shortid}
                                    {...player}
                                    team={team}
                                />
                            );
                        });
                    })}
                </>
            );
        }
    };

    useEffect(() => {
        // screen1Timeout = setTimeout(() => {
        //     btGameoverScreen.set(1);
        // }, 3000);

        return () => {
            if (screen1Timeout) clearTimeout(screen1Timeout);
        };
    }, []);

    return (
        <OverlayFrame
            title={"Winner"}
            onActionClick={() => {
                // gamepanel.showGameover = false;
                // gamepanel.closeOverlay = true;
                // updateGamePanel(gamepanel);
                btGameoverScreen.set(1);
            }}
            hideAction={true}
            actionTitle={"Next"}
            duration={3}
            gamepanelid={gamepanelid}
        >
            <VStack my="4rem" w="100%" justifyContent={"center"} px="2rem">
                {renderHeading()}
                <VStack spacing="1rem" alignItems={"flex-start"}>
                    {renderWinners()}
                </VStack>
            </VStack>
        </OverlayFrame>
    );
}

function RenderPlayerSimple({
    gamepanelid,
    shortid,
    portraitid,
    countrycode,
    displayname,
    rating,
    team,
}) {
    let filename = `assorted-${portraitid || 1}-medium.webp`;

    let ratingClass = ratingConfig.ratingToRank(rating);
    return (
        <HStack
            // bgColor={gamepanel.room.isReplay ? "gray.1050" : "gray.1200"}
            pl="1rem"
        >
            <Box
                position="relative"
                width="5rem"
                height="5rem"
                maxHeight="100%"
                _before={{
                    content: "''",
                    position: "absolute",
                    width: "5rem",
                    height: "5rem",
                    top: "-1px",
                    left: "-1px",
                    border: team ? "1px solid" : "none",
                    borderRadius: "50%",
                    borderColor: team ? team.color : "",
                    zIndex: 1,
                    opacity: 0.5,
                }}
            >
                <Image
                    src={`${config.https.cdn}images/country/${countrycode}.svg`}
                    // mt="0.5rem"
                    borderColor="gray.100"
                    borderRadius="3px"
                    width="1.75rem"
                    // height="1.75rem"
                    filter="opacity(0.9)"
                    position="absolute"
                    top="-0.1rem"
                    right="-0.7rem"
                    zIndex="2"
                />
                <Image
                    display="inline-block"
                    src={`${config.https.cdn}images/portraits/${filename}`}
                    loading="lazy"
                    w={"5rem"}
                    h={"5rem"}
                    borderRadius={"50%"}
                    // mb="1rem"
                    position="relative"
                    zIndex=""
                    // transform="skew(15deg)"
                />
            </Box>
            <VStack spacing="0" ml="1rem" alignItems={"flex-start"}>
                <HStack>
                    <Text
                        as="span"
                        textAlign={"left"}
                        color={"gray.0"}
                        fontWeight="500"
                        fontSize={["1.6rem"]}
                        maxW={["19rem"]}
                        overflow="hidden"
                        whiteSpace={"nowrap"}
                        textOverflow={"ellipsis"}
                        // textShadow={team ? "0 0 8px " + team.color : ""}
                    >
                        {displayname}
                    </Text>
                    {/* <Image
                        src={`${config.https.cdn}images/country/${countrycode}.svg`}
                        // mt="0.5rem"
                        borderColor="gray.100"
                        borderRadius="0px"
                        width="1.75rem"
                        filter="opacity(0.8)"
                    /> */}
                </HStack>
                <Text
                    as="span"
                    color="gray.100"
                    fontWeight="500"
                    fontSize="1.1rem"
                    //   textShadow={"0 2px 3px black,0 2px 6px var(--chakra-colors-gray-900)"}
                >
                    Class {ratingClass}
                </Text>
            </VStack>
        </HStack>
    );
}

function GameCancelled({ gamepanelid }) {
    let gamepanel = btGamePanels.get((gps) => gps[gamepanelid]);
    return (
        <OverlayFrame
            gamepanelid={gamepanelid}
            title={"GAME CANCELLED"}
            onActionClick={() => {
                gamepanel.showGameover = false;
                gamepanel.closeOverlay = true;
                updateGamePanel(gamepanel);
            }}
            actionTitle={"Close"}
        >
            <VStack my="4rem" w="100%" justifyContent={"center"}>
                <Text as="span" fontSize="1.6rem" color="gray.0">
                    No XP
                </Text>
            </VStack>
        </OverlayFrame>
    );
}

export function OverlayFrame({
    title,
    children,
    onActionClick,
    actionTitle,
    hideAction,
    duration,
    bgColor,
    gamepanelid,
}) {
    let scrollRef = useRef();

    let gamepanel = getGamePanel(gamepanelid || 0);
    // if (!gamepanel) return <></>;

    let gamestate = gamepanel.gamestate;
    let players = gamestate.players;

    let [bgWidth, bgHeight] = btGameScreenSize.get() || [0, 0];

    var w = window.innerWidth;

    var h = window.innerHeight;

    if (bgWidth == 0) bgWidth = w;
    if (bgHeight == 0) bgHeight = h;

    return (
        <motion.div
            key={"overlay-gameover"}
            className="overlay-gameover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                backgroundColor: "rgba(0,0,0,0.5)",
                top: "0%",
                zIndex: 112,
                filter: "drop-shadow(0 0 20px black)",
            }}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                onActionClick(e);
            }}
        >
            <MotionVStack
                w={["90%", "70%", "70%", "70%"]}
                position="absolute"
                top={bgHeight / 2}
                left="50%"
                border="0"
                zIndex={101}
                borderRadius="8px"
                initial={{ scale: 0.1, x: "-50%", y: "-50%" }}
                animate={{ scale: 1, x: "-50%", y: "-50%" }}
                transition={{
                    duraton: 1,
                }}
                bgColor={bgColor || "rgba(0,0,0,0.9)"}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
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
                    <VStack
                        w="100%"
                        maxHeight="calc(100vh - 10rem)"
                        h="100%"
                        pb="1rem"
                        pt="0.5rem"
                        position="relative"
                    >
                        <Heading
                            position="absolute"
                            left="50%"
                            transform="translateX(-50%) skew(-15deg)"
                            top="-2rem"
                            textTransform={"uppercase"}
                            whiteSpace={"nowrap"}
                            as="h5"
                            fontWeight="600"
                            fontSize={["3rem"]}
                            color="gray.0"
                            textShadow="0 0 4px black, 0 0 8px black, 0 0 8px black"
                        >
                            {title}
                        </Heading>

                        <ChakraSimpleBar
                            boxSizing="border-box"
                            flex="1"
                            // borderTop={["2px solid var(--chakra-colors-gray-800)"]}
                            style={{
                                width: "100%",
                                height: "auto",
                                flex: "1",
                                alignItems: "center",
                                overflow: "hidden scroll",
                                boxSizing: "border-box",
                            }}
                            scrollableNodeProps={{ ref: scrollRef }}
                        >
                            {children}
                        </ChakraSimpleBar>

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
                                height="3rem"
                                w="10rem"
                                borderRadius="4px"
                                display={hideAction ? "none" : "block"}
                                fontSize={"xxs"}
                                bgColor={"gray.1000"}
                                transform="skew(-15deg)"
                                boxShadow="3px 3px 0 var(--chakra-colors-brand-300)"
                                _hover={{
                                    boxShadow: "5px 3px 0 var(--chakra-colors-brand-300)",
                                }}
                                onClick={onActionClick}
                            >
                                <Text as="span" color="gray.0" transform="skew(15deg)">
                                    {actionTitle}{" "}
                                    {typeof duration !== "undefined" ? (
                                        <Text
                                            ml="0.5rem"
                                            as="span"
                                            color="gray.200"
                                            fontSize="1rem"
                                        >
                                            {"("}
                                            <NumberIncrease
                                                start={duration}
                                                end={0}
                                                duration={duration}
                                                ease="linear"
                                                fontSize="1.2rem"
                                            />
                                            {")"}
                                        </Text>
                                    ) : (
                                        ""
                                    )}
                                </Text>
                            </Button>
                        </VStack>
                    </VStack>
                </VStack>
            </MotionVStack>
        </motion.div>
    );
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

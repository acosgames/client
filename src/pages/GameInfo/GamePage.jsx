import "./GamePage.scss";
import { useEffect, useRef, useState } from "react";

import {
    VStack,
    HStack,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    chakra,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { loadUserGameData } from "../../actions/person.js";

import GameInfoReplay from "./GameInfoReplay.jsx";

import GameHeader from "./GameHeader.jsx";
import GameDescription from "./GameDescription.jsx";
import GameLeaderboard from "./leaderboard/GameLeaderboard.jsx";
import { GameActiveAchievements } from "./GameAchievements.jsx";
import GameStats from "./GameStats.jsx";
import { btGame, btLoadingGameInfo, btUser } from "../../actions/buckets.js";
import { useBucket } from "../../actions/bucket.js";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const ChakraSimpleBar = chakra(SimpleBar);

export default function GamePage({}) {
    let user = btUser.get();
    let { game_slug, room_slug, mode } = useParams();
    let loadingGameInfo = useBucket(btLoadingGameInfo);

    mode = mode || "rank";

    useEffect(() => {
        let game = btGame.get();
        if (game && game.game_slug == game_slug) return;

        loadUserGameData(game_slug);
    }, [user, game_slug]);

    return (
        <VStack w="100%" spacing="0" padding="0">
            <GameHeader />
            <GameTabs />
        </VStack>
    );
}

function GameTabs({}) {
    const targetRef = useRef();
    const tablistRef = useRef();
    const borderRef = useRef();
    const scrollRef = useRef();

    let { game_slug, room_slug, mode } = useParams();
    const [tabIndex, setTabIndex] = useState(1);

    useEffect(() => {
        window.addEventListener("resize", onResize);
        // if (tablistRef?.current) myObserver.observe(tablistRef.current);
        onResize();

        if (
            scrollRef.current &&
            scrollRef.current.scrollWidth > scrollRef.current.clientWidth
        ) {
            scrollRef.current.addEventListener("wheel", onScroll);
        }

        return () => {
            window.removeEventListener("resize", onResize);
            if (scrollRef.current) {
                scrollRef.current.removeEventListener("wheel", onScroll);
            }
        };
    }, []);

    const onScroll = (event) => {
        // event.preventDefault();

        // if (
        //   (scrollRef.current.scrollLeft >= 0 && event.deltaY > 0) ||
        //   (scrollRef.current.clientWidth + scrollRef.current.scrollLeft <
        //     scrollRef.current.scrollWidth &&
        //     event.deltaY < 0)
        // )
        event.preventDefault();
        scrollRef.current.scrollBy({
            left: event.deltaY < 0 ? -30 : 30,
        });
    };

    // const myObserver = new ResizeObserver((entries) => {
    // onResize();
    // });

    const onResize = (e) => {
        // if (borderRef.current && tablistRef.current)
        //   borderRef.current.style.width = tablistRef.current.offsetWidth + "px";
    };

    const executeScroll = () => {
        // targetRef.current.scrollIntoView({
        //   behavior: "smooth",
        //   block: "nearest",
        //   inline: "center",
        // });
    };

    const handleTabsChange = (index) => {
        if (tabIndex == index) {
            executeScroll();
        }
        setTabIndex(index);
    };

    return (
        <Tabs
            isLazy
            // bgColor="gray.650"
            colorScheme="brand"
            variant="brand"
            w="100%"
            display="flex"
            spacing="0"
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            p="0"
            // defaultIndex={1}
            ref={targetRef}
            value={tabIndex}
            onChange={handleTabsChange}
        >
            <VStack
                w="100%"
                justifyContent={"center"}
                alignItems={"center"}
                bgColor="gray.1000"
            >
                <TabList
                    onClick={executeScroll}
                    // w="100%"
                    // bgColor="gray.650"
                    className="gamepage-tablist"
                    w={["100%", "100%", "100%", "100%", "1000px"]}
                    p="0"
                    gap="0"
                    spacing="0"

                    // mb="-1.6rem"
                >
                    <ChakraSimpleBar
                        boxSizing="border-box"
                        style={{
                            width: "100%",
                            height: "6.4rem",
                            // height: '100%',
                            // flex: '1',
                            display: "flex",
                            justifyContent: "center",
                            overflowX: "scroll",
                            overflowY: "hidden",
                            boxSizing: "border-box",
                        }}
                        scrollableNodeProps={{ ref: scrollRef }}
                    >
                        <HStack
                            // ref={tablistRef}
                            ref={scrollRef}
                            spacing="0"
                            width="max-content"
                            // width={["auto", "auto", "auto", "auto", "100%"]}
                            justifyContent={"center"}
                            alignItems={"center"}
                            px="4rem"
                            height="6.4rem"
                            position={"relative"}
                            zIndex={2}
                        >
                            <Tab
                                onClick={(e) => {
                                    e.target.scrollIntoView({
                                        behavior: "smooth",
                                        block: "nearest",
                                    });
                                    handleTabsChange(0);
                                }}
                            >
                                Watch
                            </Tab>
                            <Tab
                                onClick={(e) => {
                                    e.target.scrollIntoView({
                                        behavior: "smooth",
                                        block: "nearest",
                                    });
                                    handleTabsChange(1);
                                }}
                            >
                                Leaderboard
                            </Tab>
                            <Tab
                                onClick={(e) => {
                                    e.target.scrollIntoView({
                                        behavior: "smooth",
                                        block: "nearest",
                                    });
                                    handleTabsChange(2);
                                }}
                            >
                                Tournaments
                            </Tab>
                            {/* <Tab>Private Server</Tab> */}
                            <Tab
                                onClick={(e) => {
                                    e.target.scrollIntoView({
                                        behavior: "smooth",
                                        block: "nearest",
                                    });
                                    handleTabsChange(3);
                                }}
                            >
                                Achievements
                            </Tab>
                            <Tab
                                onClick={(e) => {
                                    e.target.scrollIntoView({
                                        behavior: "smooth",
                                        block: "nearest",
                                    });
                                    handleTabsChange(4);
                                }}
                            >
                                Career
                            </Tab>
                            <Tab
                                onClick={(e) => {
                                    e.target.scrollIntoView({
                                        behavior: "smooth",
                                        block: "nearest",
                                    });
                                    handleTabsChange(5);
                                }}
                            >
                                Store
                            </Tab>
                            <Tab
                                onClick={(e) => {
                                    e.target.scrollIntoView({
                                        behavior: "smooth",
                                        block: "nearest",
                                    });
                                    handleTabsChange(6);
                                }}
                                mr={["1rem", "0"]}
                            >
                                Description
                            </Tab>
                        </HStack>
                    </ChakraSimpleBar>
                </TabList>
            </VStack>
            <TabPanels w={["100%", "100%", "100%", "100%", "1000px"]}>
                <TabPanel w="100%">
                    <GameInfoReplay game_slug={game_slug} />
                </TabPanel>

                <TabPanel w="100%">
                    <GameLeaderboard game_slug={game_slug} />
                </TabPanel>
                <TabPanel w="100%"></TabPanel>
                <TabPanel w={["100%", "100%", "100%", "100%", "1000px"]}>
                    <GameActiveAchievements />
                </TabPanel>
                <TabPanel>
                    <GameStats />
                </TabPanel>
                <TabPanel w="100%"></TabPanel>
                {/* <TabPanel w="100%"></TabPanel> */}
                <TabPanel w="100%">
                    <GameDescription />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}

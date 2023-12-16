import fs from "flatstore";
import Layout from "../../layout/Layout.jsx";
import "./GamePage.scss";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { findGame } from "../../actions/game.js";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Wrap,
  Tooltip,
  Button,
  Image,
  Center,
  Icon,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { loadUserGameData } from "../../actions/person.js";
import GameTag from "../../layout/components/game/GameTag.jsx";

import GameInfoReplay from "./GameInfoReplay.js";

import PlayNowBG from "../../assets/images/dark-green-2790337_640.png";
import GameInfoTop10 from "./GameInfoTop10.js";
import GameActionBar from "./GameActionBar.js";
import GameHeader from "./GameHeader.js";
import GameDescription from "./GameDescription.js";
import GameLeaderboard from "./GameLeaderboard.js";
import { GameActiveAchievements } from "./GameAchievements.jsx";
import GameStats from "./GameStats.jsx";
export default function GamePage({}) {
  // let [player_stats] = fs.useWatch("player_stats");

  let { game_slug, room_slug, mode } = useParams();

  mode = mode || "rank";

  useEffect(() => {
    // findGame();
    let game = fs.get("games>" + game_slug);
    if (game && game.longdesc && (!game || !game.longdesc)) {
      fs.set("game", game);
    } else {
      fs.set("game", { game_slug });
    }

    loadUserGameData(game_slug);
  }, [game_slug]);

  return <GameInfo />;
}

function GameInfo({}) {
  const targetRef = useRef();
  const tablistRef = useRef();
  const borderRef = useRef();
  const scrollRef = useRef();

  let [loadingGameInfo] = fs.useWatch("loadingGameInfo");
  let { game_slug, room_slug, mode } = useParams();
  const [tabIndex, setTabIndex] = useState(1);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    if (tablistRef?.current) myObserver.observe(tablistRef.current);
    onResize();

    if (scrollRef.current) {
      scrollRef.current.addEventListener(
        "wheel",
        (event) => {
          event.preventDefault();

          // if (
          //   (scrollRef.current.scrollLeft > 0 &&
          //   scrollRef.current.clientWidth + scrollRef.current.scrollLeft <
          //     scrollRef.current.scrollWidth
          // )
          scrollRef.current.scrollBy({
            left: event.deltaY < 0 ? -30 : 30,
          });
        },
        { passive: true }
      );
    }

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (loadingGameInfo) {
    // return <Box h="1000rem"></Box>;
  }

  const myObserver = new ResizeObserver((entries) => {
    onResize();
  });

  const onResize = (e) => {
    if (borderRef.current && tablistRef.current)
      borderRef.current.style.width = tablistRef.current.offsetWidth + "px";
  };

  const executeScroll = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const handleTabsChange = (index) => {
    if (tabIndex == index) {
      executeScroll();
    }
    setTabIndex(index);
  };

  return (
    <VStack w="100%" spacing="0" padding="0">
      <GameHeader />
      {/* <GameActionBar /> */}
      <Tabs
        isLazy
        bgColor="gray.925"
        colorScheme="brand"
        variant="brand"
        w="100%"
        display="flex"
        spacing="0"
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        p="0"
        defaultIndex={1}
        ref={targetRef}
        value={tabIndex}
        // onChange={handleTabsChange}
      >
        <TabList
          // onClick={executeScroll}
          ref={scrollRef}
          // w="100%"
          maxW={["100%", "100%", "100%", "95%", "70%", "70%"]}
          p="0"
          pt="1rem"
          px="3rem"
          gap="0"
          spacing="0"
        >
          <HStack ref={tablistRef} spacing="0">
            {/* <Box
              ref={borderRef}
              // _before={{
              content="''"
              width="80rem"
              position="absolute"
              bottom="0"
              left="3rem"
              // width: "100%"
              height="2px"
              background="linear-gradient(to right, var(--chakra-colors-gray-300),  var(--chakra-colors-gray-925))"
              // }}
            ></Box> */}
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
              Items
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
        </TabList>
        <TabPanels w="100%">
          <TabPanel w="100%">
            <GameInfoReplay game_slug={game_slug} />
          </TabPanel>

          <TabPanel w="100%">
            <GameLeaderboard />
          </TabPanel>
          <TabPanel w="100%"></TabPanel>
          <TabPanel w="100%">
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
    </VStack>
  );
}

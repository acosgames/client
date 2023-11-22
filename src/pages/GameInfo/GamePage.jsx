import fs from "flatstore";
import Layout from "../../layout/Layout.jsx";
import "./GamePage.scss";
import { useEffect, useRef } from "react";
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
export default function GamePage({}) {
  // let [player_stats] = fs.useWatch("player_stats");

  let { game_slug, room_slug, mode } = useParams();

  mode = mode || "rank";

  useEffect(() => {
    // findGame();
    loadUserGameData(game_slug);
  }, []);

  return (
    <Layout>
      {/* <GamePlayNow {...game} {...player_stats} /> */}
      <Center w="100%">
        <Box
          w="100%"
          // w={["100%", "800px", "800px", "800px", "1200px"]}
          className="gameeinfo-container"
          // pt={["3rem", "3rem", "4rem"]}
        >
          <Box
            //   px={["1rem", "1.5rem", "3rem"]}
            w="100%"
            m={"0 auto"}
            // maxWidth={["100%", "100%", "100%", "100%", "100%", "1200px"]}
            // py={["1rem", "1rem", "1rem"]}
            position="relative"
          >
            {/* <EggDoodad /> */}
            <VStack
              spacing="1rem"
              alignItems={"flex-start"}
              position="relative"
            >
              <GameInfo />
            </VStack>
          </Box>
        </Box>
      </Center>
    </Layout>
  );
}

function GameInfo({}) {
  const targetRef = useRef();
  const tablistRef = useRef();
  const borderRef = useRef();

  let [loadingGameInfo] = fs.useWatch("loadingGameInfo");
  let { game_slug, room_slug, mode } = useParams();

  useEffect(() => {
    window.addEventListener("resize", onResize);
    if (tablistRef?.current) myObserver.observe(tablistRef.current);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  if (loadingGameInfo) {
    return <Box h="1000rem"></Box>;
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

  return (
    <VStack w="100%" spacing="0" padding="0">
      <GameHeader />
      <GameActionBar />
      <Tabs
        isLazy
        bgColor="gray.925"
        colorScheme="brand"
        variant="brand"
        w="100%"
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        p="0"
        defaultIndex={1}
        ref={targetRef}
      >
        <TabList
          onClick={executeScroll}
          w="100%"
          maxW={["100%", "100%", "100%", "95%", "70%", "60%"]}
          p="0"
          pt="1rem"
          px="3rem"
        >
          <HStack ref={tablistRef}>
            <Box
              ref={borderRef}
              // _before={{
              content="''"
              width="70rem"
              position="absolute"
              bottom="0"
              left="3rem"
              // width: "100%"
              height="2px"
              background="linear-gradient(to right, var(--chakra-colors-gray-300),  var(--chakra-colors-gray-925))"
              // }}
            ></Box>
            <Tab>Watch</Tab>
            <Tab>Leaderboard</Tab>
            <Tab>Tournaments</Tab>
            {/* <Tab>Private Server</Tab> */}
            <Tab>Achievements</Tab>
            <Tab>Items</Tab>
            <Tab mr={["1rem", "0"]}>Description</Tab>
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
          <TabPanel w="100%"></TabPanel>
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

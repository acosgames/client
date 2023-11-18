import fs from "flatstore";
import Layout from "../../layout/Layout.jsx";
import "./GamePage.scss";
import { useEffect } from "react";
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
  let [loadingGameInfo] = fs.useWatch("loadingGameInfo");
  let { game_slug, room_slug, mode } = useParams();

  if (loadingGameInfo) {
    return <Box h="1000rem"></Box>;
  }
  return (
    <VStack w="100%" spacing="0" padding="0">
      <GameHeader />
      <GameActionBar />

      <GameInfoReplay game_slug={game_slug} />
      <GameLeaderboard />
      <GameDescription />
    </VStack>
  );
}

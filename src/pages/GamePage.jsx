import fs from "flatstore";
import Layout from "../layout/Layout.jsx";
import { useEffect } from "react";
import { findGame } from "../actions/game.js";
import { Box, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { loadUserGameData } from "../actions/person.js";
import GameTag from "../layout/components/game/GameTag.jsx";

export default function GamePage({}) {
  let [game] = fs.useWatch("game");
  let [player_stats] = fs.useWatch("player_stats");
  let [loadingGameInfo] = fs.useWatch("loadingGameInfo");

  let { game_slug, room_slug, mode } = useParams();

  mode = mode || "rank";

  useEffect(() => {
    // findGame();
    loadUserGameData(game_slug);
  }, []);

  return (
    <Layout>
      <Box w="100%" pt={["3rem", "3rem", "4rem"]}>
        <Box
          //   px={["1rem", "1.5rem", "3rem"]}
          w="100%"
          m={"0 auto"}
          maxWidth={["100%", "100%", "100%", "100%", "100%", "1200px"]}
          p={["1rem", "1rem", "1rem"]}
          position="relative"
        >
          {/* <EggDoodad /> */}
          <VStack spacing="1rem" alignItems={"flex-start"} position="relative">
            <GameInfo {...game} />
          </VStack>
        </Box>
      </Box>
    </Layout>
  );
}

function GameInfo({ name, longdesc, displayname }) {
  return (
    <VStack>
      <GameTag to="https://github.com" title={"opensource"} />
    </VStack>
  );
}

import {
  Box,
  chakra,
  VStack,
  Text,
  Icon,
  HStack,
  Grid,
  GridItem,
  Tr,
  Table,
  Th,
  Thead,
  Tbody,
  Td,
  Image,
  Heading,
  Center,
  Progress,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { RankingList } from "./RankingList";
import { LeaderboardHeading } from "./LeaderboardHeading";
import {
  btDivision,
  btGame,
  btLoading,
  btUser,
} from "../../../actions/buckets";
import { useBucket, useBucketSelector } from "../../../actions/bucket";
import { useEffect } from "react";
import {
  findGameRankDivision,
  findGameRankGlobal,
} from "../../../actions/game";
import { RankingDivisionList } from "./RankingDivisionList";

const ChakraLink = chakra(Link);

export default function GameRankDivision({ game_slug }) {
  let loading = useBucketSelector(btLoading, (l) => l?.GameRankDivision);
  let division = useBucketSelector(btDivision, (r) => r[game_slug]);

  let leaderboard = division?.leaderboard;
  let total = leaderboard?.length;
  let user = btUser.get();
  let game = btGame.get();

  useEffect(() => {
    let game = btGame.get();
    if (game_slug && game.division_id)
      findGameRankDivision(game_slug, game.division_id);
  }, [game_slug]);

  const renderContent = () => {
    if (!game || loading) {
      return (
        <Box w="100%" px="10%" py="3rem">
          <Progress w="100%" size="lg" isIndeterminate />
        </Box>
      );
    }

    if (!leaderboard || leaderboard.length == 0) {
      return (
        <Text
          fontSize="1.6rem"
          align="center"
          display={"block"}
          color="gray.10"
        >
          No rankings found.
        </Text>
      );
    }

    let playerRank = -1;
    for (var player of leaderboard) {
      let isLocalPlayer = user?.displayname == player.displayname;
      if (isLocalPlayer) {
        playerRank = player.rank;
        break;
      }
    }

    return (
      <>
        <RankingDivisionList
          playerRank={playerRank}
          total={total}
          leaderboard={leaderboard}
        />
      </>
    );
  };
  return (
    <Box w="100%" maxW={["100%", "100%"]} pt="0" pb="2rem">
      <VStack w="100%" spacing="0" alignItems={"center"}>
        <LeaderboardHeading
          subtitle={(game?.season || "Season 0") + " "}
          caption={game?.division_name}
        >
          Division Leaderboard
        </LeaderboardHeading>
        {renderContent()}
      </VStack>
    </Box>
  );
}

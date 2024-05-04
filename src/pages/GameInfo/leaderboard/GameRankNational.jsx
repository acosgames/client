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

import { useEffect, useMemo } from "react";
import {
  findGameRankGlobal,
  findGameRankNational,
} from "../../../actions/game";
import { PlayerRanking } from "./PlayerRank";
import { RankingList } from "./RankingList";
import { LeaderboardHeading } from "./LeaderboardHeading";
import ChooseCountry from "../../../layout/components/user/ChooseCountry";
import {
  btCountryChanged,
  btDefaultCountry,
  btGame,
  btLoading,
  btNationalRankings,
  btUser,
} from "../../../actions/buckets";
import { useBucket, useBucketSelector } from "../../../actions/bucket";

const ChakraLink = chakra(Link);

export default function GameRankNational({ game_slug, countrycode }) {
  let countryChanged = useBucket(btCountryChanged);

  countrycode = countryChanged?.value || countrycode || "US";

  return (
    <GameRankNationalView game_slug={game_slug} countrycode={countrycode} />
  );
}

function GameRankNationalView({ game_slug, countrycode }) {
  let ranking = useBucketSelector(
    btNationalRankings,
    (r) => r[game_slug] && r[game_slug][countrycode]
  );
  let loading = useBucketSelector(btLoading, (l) => l.GameRankNationalView);

  let leaderboard = ranking?.leaderboard;
  let total = ranking?.total || 0;
  let user = btUser.get();
  let game = btGame.get();

  useMemo(() => {
    btDefaultCountry.set(countrycode);
  }, []);
  useEffect(() => {
    let g = btGame.get();
    if (g) findGameRankNational(g.game_slug, countrycode);
  }, [game_slug, countrycode]);

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

    if (total == 0) {
      return (
        <Text fontSize="1.6rem" align="center" color="gray.10">
          No rankings yet.
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
        <RankingList
          type={"national"}
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
        <LeaderboardHeading subtitle={(game?.season || "Season 0") + " "}>
          National Leaderboard
        </LeaderboardHeading>
        <VStack
          mt="1rem"
          mb="2rem"
          px="1rem"
          py="0.25rem"
          bgColor="gray.600"
          spacing="0"
          alignItems={"flex-start"}
          borderRadius="8px"
          w="30rem"
        >
          <Text
            pl="0"
            as="span"
            fontSize="1.2rem"
            color="gray.50"
            fontWeight="500"
          >
            By Country
          </Text>
          <ChooseCountry />
        </VStack>
        {renderContent()}
      </VStack>
    </Box>
  );
}

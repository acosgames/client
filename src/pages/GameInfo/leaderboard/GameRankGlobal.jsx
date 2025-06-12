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

import { findGameRankGlobal } from "../../../actions/game";
import { useEffect } from "react";
import { RankingList } from "./RankingList";
import { LeaderboardHeading } from "./LeaderboardHeading";
import { btGame, btLoading, btRankings, btUser } from "../../../actions/buckets";
import { useBucketSelector } from "../../../actions/bucket";

const ChakraLink = chakra(Link);

export default function GameRankGlobal({ game_slug }) {
    let loading = useBucketSelector(btLoading, (l) => l.GameRankGlobal);
    let ranking = useBucketSelector(btRankings, (r) => r[game_slug]);

    let leaderboard = ranking?.leaderboard;
    let total = ranking?.total;
    let user = btUser.get();
    let game = btGame.get();

    useEffect(() => {
        if (game_slug) findGameRankGlobal(game_slug);
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
                <Text fontSize="1.6rem" align="center" w="100%" display={"block"} color="gray.10">
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
                    type={"global"}
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
                <LeaderboardHeading subtitle={game?.season || "Season 0"}>
                    Global Leaderboard
                </LeaderboardHeading>
                {renderContent()}
            </VStack>
        </Box>
    );
}

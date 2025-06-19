import { Box, HStack, Text } from "@chakra-ui/react";

import { btGame, btPlayerStats, btUser } from "../../../actions/buckets";
import DivisionSoloPlayerRow from "./DivisionSoloPlayerRow";
export function DivisionSoloTable({ playerRank, total, leaderboard }) {
    let game = btGame.get();
    let user = btUser.get();
    let player_stats = btPlayerStats.get();
    let playerGameStats = player_stats[game.game_slug];

    const renderRankings = () => {
        leaderboard = leaderboard || [];
        let elems = [];
        let rank = 0;
        let index = 0;
        let prevRank = 0;
        for (let player of leaderboard) {
            rank = player.rank;

            let isLocalPlayer = user?.displayname == player.displayname;
            // let isPast5Rank = rank == 10 && (playerGameStats && playerGameStats.ranking > 10);
            let displayname = player.displayname || player.value;
            // let ratingTxt = ratingconfig.ratingToRank(Number.parseInt(player.rating));
            // let ratingFormatted = ratingTxt.toUpperCase();
            let flagCode = null;
            elems.push(
                <DivisionSoloPlayerRow
                    key={"rankings-division-" + displayname}
                    prevRank={prevRank}
                    index={index++}
                    rank={player.rank}
                    flagCode={flagCode}
                    score={player.highscore}
                    displayname={displayname}
                    isLocalPlayer={isLocalPlayer}
                    portraitid={player.portraitid}
                    // winrating={player.winrating}
                    countrycode={player.countrycode}
                    // win={player.win}
                    // loss={player.loss}
                    // tie={player.tie}
                    total={total}
                />
            );

            prevRank = rank;
        }
        return elems;
    };

    return (
        <>
            <HStack w="100%" spacing="1rem" py="1rem" bgColor="gray.1200">
                <Text
                    w={["5rem", "5rem", "6rem", "6rem"]}
                    as="span"
                    p="0"
                    color={"gray.100"}
                    fontSize="xs"
                    textAlign={"right"}
                >
                    Rank
                </Text>
                <Text
                    as="span"
                    minW="0"
                    flex="1"
                    p="0"
                    color={"gray.100"}
                    fontSize="xs"
                    w={["70%", "70%", "60%", "60%"]}
                    pl="1.5rem"
                    // pl={["5rem", "5rem", "7rem", "7rem"]}
                >
                    Player
                </Text>
                <Text
                    justifySelf="flex-end"
                    as="span"
                    p="0"
                    color={"gray.100"}
                    fontSize="xs"
                    textAlign="right"
                    pr={["1rem", "1rem", "2.5rem"]}
                >
                    Highscore
                </Text>
            </HStack>
            {renderRankings()}
            <Box w="100%" display={playerRank == -1 ? "none" : "block"} pt="3rem">
                <Text
                    fontSize="1.6rem"
                    align="center"
                    display={total > 0 ? "block" : "none"}
                    color="gray.10"
                >
                    Rank{" "}
                    <Text as="span" fontWeight="500" color="brand.100">
                        {playerRank || -1}{" "}
                    </Text>
                    of{" "}
                    <Text as="span" fontWeight="500">
                        {total}
                    </Text>
                </Text>
            </Box>
            <Box w="100%" display={playerRank != -1 ? "none" : "block"} pt="3rem">
                <Text
                    fontSize="1.6rem"
                    align="center"
                    display={total > 0 ? "block" : "none"}
                    color="gray.10"
                >
                    Play games to be listed
                </Text>
            </Box>
        </>
    );
}

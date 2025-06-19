import {
    Box,
    Card,
    CardBody,
    Progress,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from "@chakra-ui/react";

import {
    btCountryChanged,
    btGame,
    btLeaderboard,
    btLeaderboardFilters,
    btLoading,
    btUser,
} from "../../../actions/buckets";
import { createRedisKey, findLeaderboard } from "../../../actions/game";
import { useBucket, useBucketSelector } from "../../../actions/bucket";
import { useEffect, useState } from "react";
import { RatingTable } from "./RatingTable";
import { LeaderboardHeading } from "./LeaderboardHeading";
import ChooseCountry from "../../../components/user/ChooseCountry";
import { DivisionMultiTable } from "./DivisionMultiTable";
import ChooseLeaderboardStat from "./ChooseLeaderboardStat";
import { DivisionSoloTable } from "./DivisionSoloTable";
import { HighScoreTable } from "./HighScoreTable";
import { StatTable } from "./StatTable";
import LeaderboardFilters from "./LeaderboardFilters";

function ContentContainer({ children }) {
    return (
        <Card variant="brand" w="100%">
            {/* <CardHeader>
                <Text fontWeight={"500"}>Game Settings</Text>
            </CardHeader> */}
            <CardBody pt="0">
                <VStack>{children}</VStack>
            </CardBody>
        </Card>
    );
}

export default function GameLeaderboard({ game_slug }) {
    let user = btUser.get();
    let game = btGame.get();

    return (
        // <Box w="100%" h="100%" p="0" pt="2rem" px={["1rem"]} bgColor="gray.925">
        <Tabs variant="subtabs" isLazy>
            <TabList border="0" justifyContent={"center"}>
                {game?.division_name && <Tab>Division</Tab>}
                {/* <Tab>National Rank</Tab> */}
                {game?.maxplayers > 1 && <Tab>Rank</Tab>}
                {game?.lbscore == 1 && <Tab>High Score</Tab>}
                {game?.stats?.length > 0 && <Tab>Stats</Tab>}
            </TabList>
            <TabPanels>
                {game?.division_name && (
                    <TabPanel>
                        <ContentContainer>
                            <LeaderboardTable
                                title={"Division Leaderboard"}
                                game_slug={game_slug}
                                type={game.maxplayers == 1 ? "divisionsolo" : "divisionmulti"}
                                caption={game.division_name || ""}
                                division_id={game.division_id}
                            />
                        </ContentContainer>
                    </TabPanel>
                )}
                {game?.maxplayers > 1 && (
                    <TabPanel>
                        <ContentContainer>
                            <LeaderboardTable
                                title={"Rating Leaderboard"}
                                game_slug={game_slug}
                                type={"rank"}
                                countrycode={user?.countrycode || "US"}
                            />
                            {/* <GameRankNational
                                game_slug={game_slug}
                                countrycode={user?.countrycode || "US"}
                            /> */}
                        </ContentContainer>
                    </TabPanel>
                )}
                {game?.lbscore == 1 && (
                    <TabPanel>
                        <ContentContainer>
                            <LeaderboardTable
                                title={"High Score Leaderboard"}
                                game_slug={game_slug}
                                type={"score"}
                            />
                        </ContentContainer>
                    </TabPanel>
                )}
                {game?.stats?.length > 0 && (
                    <TabPanel>
                        <ContentContainer>
                            <LeaderboardTable
                                title={"Stat Leaderboard"}
                                game_slug={game_slug}
                                type={"stat"}
                                is_solo={game.maxplayers == 1}
                                // aggregate={false}
                            />
                        </ContentContainer>
                    </TabPanel>
                )}
            </TabPanels>
        </Tabs>
        // </Box>
    );
}

export function LeaderboardTable({
    title,
    game_slug,
    type,
    countrycode,
    caption,
    division_id,
    aggregate,
    is_solo,
}) {
    let defaultStatSlug = "";
    if (type == "stat") {
        defaultStatSlug = is_solo ? "ACOS_SCORE" : "ACOS_SCORE";
    }

    // let [config, setConfig] = useState({
    //     game_slug,
    //     type,
    //     countrycode,
    //     division_id,
    //     is_solo,
    //     aggregate,
    //     stat_slug: defaultStatSlug,
    // });
    let config = useBucket(btLeaderboardFilters);
    let key = createRedisKey(config);

    let ranking = useBucketSelector(btLeaderboard, (r) => r[key]);
    let loading = useBucketSelector(btLoading, (l) => l.leaderboardAPI);

    let leaderboard = ranking?.leaderboard;
    let total = ranking?.total || 0;
    let user = btUser.get();
    let game = btGame.get();

    //initialize
    useEffect(() => {
        btLeaderboardFilters.set({
            title,
            game_slug,
            type,
            countrycode,
            caption,
            division_id,
            aggregate,
            is_solo,
        });
    }, []);

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

        if (config?.type == "rank") {
            return (
                <>
                    <RatingTable
                        type={"global"}
                        playerRank={playerRank}
                        total={total}
                        leaderboard={leaderboard}
                    />
                </>
            );
        }

        if (config?.type == "score") {
            return (
                <>
                    <HighScoreTable
                        type={"global"}
                        playerRank={playerRank}
                        total={total}
                        leaderboard={leaderboard}
                    />
                </>
            );
        }

        if (config?.type == "stat") {
            return (
                <>
                    <StatTable
                        type={"global"}
                        playerRank={playerRank}
                        total={total}
                        leaderboard={leaderboard}
                    />
                </>
            );
        }

        if (config?.type == "divisionmulti") {
            return (
                <>
                    <DivisionMultiTable
                        playerRank={playerRank}
                        total={total}
                        leaderboard={leaderboard}
                    />
                </>
            );
        }
        if (config?.type == "divisionsolo") {
            return (
                <>
                    <DivisionSoloTable
                        playerRank={playerRank}
                        total={total}
                        leaderboard={leaderboard}
                    />
                </>
            );
        }
    };

    return (
        <Box w="100%" maxW={["100%", "100%"]} pt="0" pb="2rem">
            <VStack w="100%" spacing="0" alignItems={"center"}>
                <LeaderboardHeading caption={caption}>{title}</LeaderboardHeading>
                <LeaderboardFilters />
                {renderContent()}
            </VStack>
        </Box>
    );
}

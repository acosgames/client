import { Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import ChooseLeaderboardStat from "./ChooseLeaderboardStat";
import { useBucket } from "../../../actions/bucket";
import {
    btCountryChanged,
    btGame,
    btLeaderboard,
    btLeaderboardFilters,
    btUser,
} from "../../../actions/buckets";
import ChooseCountry from "../../../components/user/ChooseCountry";
import ChooseLeaderboardSeason from "./ChooseLeaderboardSeason";
import ChooseLeaderboardCountry from "./ChooseLeaderboardCountry";
import { findLeaderboard } from "../../../actions/game";

export default function LeaderboardFilters() {
    let filters = [];
    let config = useBucket(btLeaderboardFilters);
    // let key = createRedisKey(config);
    //on change call API
    useEffect(() => {
        let g = btGame.get();
        let user = btUser.get();

        if (!config?.game_slug && g?.game_slug) {
            config.game_slug = g.game_slug;
        }
        if (config.type == null) {
            if (user?.displayname && g?.division_id) {
                config.type = g.maxplayers == 1 ? "divisionsolo" : "divisionmulti";
                config.division_id = g?.division_id;
            } else if (user?.displayname) config.type = "rank";
        }

        if (config?.type == "rank" && config?.season < 0) {
            config.season = g?.season || 0;
        }

        if (config?.type == "stat" && !config?.stat_slug) config.stat_slug = "ACOS_PLAYED";

        btLeaderboard.set({ leaderboard: [], total: 0 });
        if (g) findLeaderboard(config);
    }, [JSON.stringify(config)]);

    if (config?.type == "rank" || config?.type == "score" || config?.type == "stat") {
        // const onCountryFilterChange = ({ countrycode }) => {
        //     let prevCountry = config?.countrycode;
        //     countrycode = countrycode || config?.countrycode || "EARTH";

        //     if (countrycode == "EARTH" || prevCountry != countrycode) {
        //         let newConfig = Object.assign({}, config, { countrycode });
        //         if (countrycode == "EARTH" && newConfig.countrycode) delete newConfig.countrycode;
        //         setConfig(newConfig);
        //     }
        // };
        filters.push(
            <VStack
                key={"leaderboard-filter-country"}
                // mt="1rem"
                mb="2rem"
                ml="2rem"
                px="1rem"
                py="0.25rem"
                bgColor="gray.1200"
                spacing="0"
                alignItems={"flex-start"}
                borderRadius="8px"
                w="30rem"
            >
                <Text
                    pl="0"
                    as="span"
                    pb="0.5rem"
                    fontSize="1.2rem"
                    color="brand.75"
                    fontWeight="500"
                >
                    By Region
                </Text>
                <ChooseLeaderboardCountry />
            </VStack>
        );

        if (["score", "rank", "stat"].includes(config?.type)) {
            filters.push(
                <VStack
                    key={"leaderboard-filter-season"}
                    // mt="1rem"
                    mb="2rem"
                    ml="2rem"
                    px="1rem"
                    py="0.25rem"
                    bgColor="gray.1200"
                    spacing="0"
                    alignItems={"flex-start"}
                    borderRadius="8px"
                    w="30rem"
                >
                    <Text
                        pl="0"
                        as="span"
                        pb="0rem"
                        fontSize="1.2rem"
                        color="brand.75"
                        fontWeight="500"
                    >
                        By Date
                    </Text>
                    <ChooseLeaderboardSeason
                        hasMonthly={config.type == "stat" || config.type == "score"}
                        hasAllTime={config.type == "stat" || config.type == "score"}
                    />
                </VStack>
            );
        }

        if (config?.type == "stat") {
            filters.push(
                <VStack
                    key={"leaderboard-filter-stat"}
                    // mt="1rem"
                    mb="2rem"
                    ml="2rem"
                    px="1rem"
                    py="0.25rem"
                    bgColor="gray.1200"
                    spacing="0"
                    alignItems={"flex-start"}
                    borderRadius="8px"
                    w="30rem"
                >
                    <Text
                        pl="0"
                        as="span"
                        pb="0rem"
                        fontSize="1.2rem"
                        color="brand.75"
                        fontWeight="500"
                    >
                        By Stat
                    </Text>
                    <ChooseLeaderboardStat />
                </VStack>
            );
        }
    }

    return <>{filters}</>;
}

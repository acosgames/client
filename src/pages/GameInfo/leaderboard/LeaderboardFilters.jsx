import { Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import ChooseLeaderboardStat from "./ChooseLeaderboardStat";
import { useBucket } from "../../../actions/bucket";
import { btCountryChanged, btGame, btLeaderboardFilters } from "../../../actions/buckets";
import ChooseCountry from "../../../components/user/ChooseCountry";
import ChooseLeaderboardSeason from "./ChooseLeaderboardSeason";
import ChooseLeaderboardCountry from "./ChooseLeaderboardCountry";
import { findLeaderboard } from "../../../actions/game";

export default function LeaderboardFilters() {
    let filters = [];
    let config = useBucket(btLeaderboardFilters);

    //on change call API
    useEffect(() => {
        let g = btGame.get();
        if (g) findLeaderboard(config);
    }, [
        config?.game_slug,
        config?.countrycode,
        config?.type,
        config?.stat_slug,
        config?.division_id,
        config?.monthly,
        config?.is_solo,
        config?.aggregate,
        config?.season,
    ]);

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

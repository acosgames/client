import { Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import ChooseLeaderboardStat from "./ChooseLeaderboardStat";
import { useBucket } from "../../../actions/bucket";
import { btCountryChanged } from "../../../actions/buckets";
import ChooseCountry from "../../../components/user/ChooseCountry";
import ChooseLeaderboardSeason from "./ChooseLeaderboardSeason";
import ChooseLeaderboardCountry from "./ChooseLeaderboardCountry";

export default function LeaderboardFilters({ config, setConfig }) {
    let filters = [];

    const onFilterChange = (keyvalues) => {
        let newConfig = Object.assign({}, config, keyvalues);

        setConfig(newConfig);
    };

    if (["score", "rank", "stat"].includes(config?.type)) {
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
                    By Date
                </Text>
                <ChooseLeaderboardSeason
                    onChange={onFilterChange}
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
                <ChooseLeaderboardStat onChange={onFilterChange} />
            </VStack>
        );
    }

    if (config?.type == "rank" || config?.type == "score") {
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
                    pb="0.5rem"
                    fontSize="1.2rem"
                    color="brand.75"
                    fontWeight="500"
                >
                    By Region
                </Text>
                <ChooseLeaderboardCountry onChange={onFilterChange} />
            </VStack>
        );
    }

    return <>{filters}</>;
}

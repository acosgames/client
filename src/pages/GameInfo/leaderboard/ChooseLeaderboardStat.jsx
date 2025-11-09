import { Box, Image, Text, VStack } from "@chakra-ui/react";
import Select from "react-select";

import { useBucketSelector } from "../../../actions/bucket";
import { btGame, btLeaderboard, btLeaderboardFilters } from "../../../actions/buckets";

export default function ChooseLeaderboardStat({ onChange }) {
    let leaderboardStat = useBucketSelector(btLeaderboardFilters, (bucket) => bucket?.stat_slug);
    // let leaderboardStatSlug = useBucketSelector(btLeaderboardFilters, (bucket) => bucket?.stat);

    let game = btGame.get();
    if (!game) return <></>;

    let statMap = {};
    let statOptions = game.stats.map((stat) => {
        statMap[stat.stat_slug] = {
            value: stat.stat_slug,
            label: stat.stat_name,
        };
        return statMap[stat.stat_slug];
    });
    // let user = btUser.get() || {};

    let currentValue = statMap[leaderboardStat] || {
        label: "Matches Played",
        value: "ACOS_PLAYED",
    };
    return (
        <VStack p="0" spacing="0" w="100%" position="relative">
            <Select
                onChange={(e) => {
                    console.log("Country changed:", e);

                    // onChange({ stat_slug: e.value });
                    // let stat = statMap[e.value];
                    btLeaderboardFilters.assign({ stat_slug: e.value });
                }}
                value={currentValue}
                styles={{
                    container: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "100%",
                        bgColor: "var(--chakra-colors-brand-500)",
                    }),
                    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                        return {
                            color: "var(--chakra-colors-gray-50)",
                            fontSize: "1.2rem",
                            padding: "1rem",
                            backgroundColor: "var(--chakra-colors-gray-900)",
                            // borderBottom: "1px solid",
                            // borderBottomColor: "var(--chakra-colors-gray-800)",
                            position: "relative",
                            paddingLeft: "2rem",
                            zIndex: "1",
                            background: ` var(--chakra-colors-gray-900)`,
                            // backgroundSize: data.value == "EARTH" ? "34px 34px" : "",
                            ":hover": {
                                ...styles[":hover"],
                                color: "var(--chakra-colors-gray-0)",
                                backgroundColor: "var(--chakra-colors-brand-600)",
                            },
                        };
                    },
                    valueContainer: (styles) => ({
                        ...styles,
                        padding: 0,

                        // background: 'var(--chakra-colors-gray-900)',
                    }),
                    placeholder: (styles) => ({
                        color: "var(--chakra-colors-gray-10)",

                        fontSize: "1.2rem",
                    }),
                    menu: (styles) => ({
                        backgroundColor: "var(--chakra-colors-gray-900)",
                        // ...styles,
                        // background:
                        // "linear-gradient(to right, var(--chakra-colors-gray-600), var(--chakra-colors-gray-800))",
                        borderRadius: "1rem",
                        border: "1px solid var(--chakra-colors-gray-800)",

                        overflow: "hidden",
                        width: "100%",
                        position: "absolute",
                        zIndex: "9999",
                        top: "4rem",
                        filter: "drop-shadow(0 .375rem .5rem rgba(0,0,0,.65))",
                    }),
                    input: (styles) => ({
                        ...styles,
                        color: "var(--chakra-colors-gray-10)",
                        // background: "var(--chakra-colors-gray-600)",

                        // fontSize: '1.6rem',
                        // paddingLeft: '4rem',
                    }),
                    control: (baseStyles, styles) => ({
                        padding: "0",
                        borderRadius: "8px",
                        // background: "var(--chakra-colors-gray-600)",
                    }),

                    indicatorsContainer: (styles) => ({
                        // display: 'none',
                        position: "absolute",
                        top: 0,
                        right: "0px",
                        color: "var(--chakra-colors-gray-10)",
                        ":hover": {
                            color: "var(--chakra-colors-gray-10)",
                        },
                        ":active": {
                            color: "var(--chakra-colors-gray-10)",
                        },
                    }),
                    singleValue: (styles, { data }) => ({
                        ...styles,
                        color: "var(--chakra-colors-gray-10)",
                        fontSize: "1.4rem",
                        // fontWeight: "500",
                        padding: "0.5rem",
                        marginBottom: "0.1rem",
                        backgroundColor: "var(--chakra-colors-gray-900)",
                        // borderBottom: '1px solid',
                        // borderBottomColor: 'var(--chakra-colors-gray-800)',
                        zIndex: 1,
                        position: "relative",
                        paddingLeft: "1rem",
                        background: "transparent",
                        // background: `url(${flagSrc}/${data.value}.svg) no-repeat left 0rem center transparent`,
                    }),
                }}
                options={statOptions}
            />
        </VStack>
    );
}

import { Box, Image, Text, VStack } from "@chakra-ui/react";
import Select from "react-select";

import config from "../../../config";

import cc2 from "shared/model/countrycode2.json";
import { getCountry } from "../../../actions/person";
import { useEffect, useState } from "react";
import {
    btCountryChanged,
    btDefaultCountry,
    btLeaderboardFilters,
    btUser,
} from "../../../actions/buckets";
import { useBucket, useBucketSelector } from "../../../actions/bucket";

let flagSrc = `${config.https.cdn}images/country`;

let countryOptions = structuredClone(cc2);
countryOptions.unshift({ label: "Earth", value: "EARTH" });

function updateCountryLabels() {
    for (let i = 0; i < cc2.length; i++) {
        let cc = cc2[i];
        if (typeof cc.label !== "string") continue;
        cc.label = (
            <div>
                <img
                    src={flagSrc + cc.value + ".svg"}
                    // border="2px solid"
                    borderColor="gray.100"
                    borderRadius="0px"
                    height={["1.4rem"]}
                    loading="lazy"
                />
                <span>{cc.label}</span>
            </div>
        );
    }
}

// updateCountryLabels();

export default function ChooseLeaderboardCountry({
    onChange,
    bgColor,
    noCountry,
    overrideDefaultCountry,
}) {
    let filterValue = useBucketSelector(btLeaderboardFilters, (bucket) => bucket?.countrycode);
    let user = btUser.get() || {};

    let optionsMap = {};
    countryOptions.map((option) => {
        optionsMap[option.value] = option;
    });

    let currentValue = optionsMap[filterValue] || countryOptions[0];

    return (
        <VStack p="0" spacing="0" w="100%" position="relative">
            <Select
                onChange={(e) => {
                    console.log("Country changed:", e);

                    // onChange({ countrycode: e.value });
                    btLeaderboardFilters.assign({ countrycode: e.value });
                }}
                value={currentValue}
                options={countryOptions}
                styles={{
                    container: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "100%",
                    }),
                    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                        return {
                            color: "var(--chakra-colors-gray-50)",
                            fontSize: "1.2rem",
                            padding: "1rem",
                            backgroundColor: "var(--chakra-colors-gray-900)",
                            borderBottom: "1px solid",
                            borderBottomColor: "var(--chakra-colors-gray-800)",
                            position: "relative",
                            paddingLeft: "5rem",
                            // zIndex: "1",
                            background: `url(${flagSrc}/${data.value}.svg) no-repeat left 1rem center var(--chakra-colors-gray-900)`,
                            backgroundSize: data.value == "EARTH" ? "34px 34px" : "",
                            ":hover": {
                                ...styles[":hover"],
                                color: "var(--chakra-colors-gray-10)",
                                backgroundColor: "var(--chakra-colors-gray-875)",
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
                        // backgroundColor: 'var(--chakra-colors-gray-800)',
                        backgroundColor: bgColor ? bgColor : "var(--chakra-colors-gray-900)",
                        width: "100%",
                        padding: 0,
                        margin: 0,
                        position: "absolute",
                        zIndex: "99999",
                        top: "4rem",
                        borderRadius: "1rem",
                        filter: "drop-shadow(0 .375rem .5rem rgba(0,0,0,.65))",
                    }),
                    input: (styles) => ({
                        ...styles,
                        color: "var(--chakra-colors-gray-10)",
                        background: bgColor ? bgColor : "var(--chakra-colors-gray-600)",
                        // fontSize: '1.6rem',
                        // paddingLeft: '4rem',
                    }),
                    control: (baseStyles, styles) => ({
                        padding: "0",
                        borderRadius: "8px",
                        background: bgColor ? bgColor : "var(--chakra-colors-gray-1200)",
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
                        padding: "0.5rem",
                        marginBottom: "0.1rem",
                        backgroundColor: bgColor ? bgColor : "var(--chakra-colors-gray-1200)",
                        // borderBottom: '1px solid',
                        // borderBottomColor: 'var(--chakra-colors-gray-800)',
                        position: "relative",
                        paddingLeft: "4rem",
                        background: `url(${flagSrc}/${data.value}.svg) no-repeat left 0rem center var(--chakra-colors-gray-1200)`,
                        backgroundSize: data.value == "EARTH" ? "28px 28px" : "",
                    }),
                }}
            />
        </VStack>
    );
}

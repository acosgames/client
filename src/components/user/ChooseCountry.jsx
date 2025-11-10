import { Box, Image, Text, VStack } from "@chakra-ui/react";
import Select from "react-select";

import config from "../../config";

import cc2 from 'shared/model/countrycode2.json';
import { getCountry } from "../../actions/person";
import { useEffect } from "react";
import { btCountryChanged, btDefaultCountry, btUser } from "../../actions/buckets";
import { useBucket } from "../../actions/bucket";

let flagSrc = `${config.https.cdn}images/country`;

let countryList = structuredClone(cc2);

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

export default function ChooseCountry({ bgColor, noCountry, overrideDefaultCountry }) {
    let countryChanged = useBucket(btCountryChanged);
    let defaultCountry = useBucket(btDefaultCountry);
    let user = btUser.get() || {};

    defaultCountry = overrideDefaultCountry || user?.countrycode || defaultCountry;

    if (noCountry && countryList[0].value != "EARTH") {
        countryList.unshift({ label: "Earth", value: "EARTH" });
    }
    useEffect(() => {
        if (!defaultCountry) getCountry();
    }, []);
    // let filename = "assorted-"  + "-original.webp";

    if (!defaultCountry) {
        return <Text as="span">Identifying country...</Text>;
    } else {
        defaultCountry =
            countryList.find((cntry) => cntry.value == defaultCountry) || countryList[0];
    }

    countryChanged = countryChanged || defaultCountry;

    return (
        <VStack p="0" spacing="0" w="100%" position="relative" zIndex="1">
            <Select
                onChange={(e) => {
                    console.log("Country changed:", e);
                    btCountryChanged.set(e);
                }}
                value={countryChanged}
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
                            zIndex: "1",
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
                        backgroundColor: bgColor ? bgColor : "var(--chakra-colors-gray-600)",
                        width: "100%",
                        position: "absolute",
                        zIndex: "3",
                        top: "3.3rem",
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
                        background: bgColor ? bgColor : "var(--chakra-colors-gray-600)",
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
                        fontSize: "1.2rem",
                        padding: "0.5rem",
                        marginBottom: "0.1rem",
                        backgroundColor: bgColor ? bgColor : "var(--chakra-colors-gray-900)",
                        // borderBottom: '1px solid',
                        // borderBottomColor: 'var(--chakra-colors-gray-800)',
                        position: "relative",
                        paddingLeft: "4rem",
                        background: `url(${flagSrc}/${data.value}.svg) no-repeat left 0rem center transparent`,
                        backgroundSize: data.value == "EARTH" ? "28px 28px" : "",
                    }),
                }}
                options={countryList}
            />
        </VStack>
    );
}

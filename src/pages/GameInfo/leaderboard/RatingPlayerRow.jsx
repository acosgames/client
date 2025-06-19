import { HStack, Center, Heading, Box, Text, chakra, Image, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import config from "../../../config";
import { TopRankNumber } from "./LeaderboardHeading";

const ChakraLink = chakra(Link);

export function RatingPlayerRow({
    index,
    displayname,
    rank,
    prevRank,
    countrycode,
    isLocalPlayer,
    portraitid,
    ratingFormatted,
    rating,
    win,
    loss,
    tie,
    total,
}) {
    return (
        <HStack
            position="relative"
            width="100%"
            minW="100%"
            height="6rem"
            spacing="1rem"
            bgColor="transparent"
            borderBottom={
                total > 100 && index == 9 ? "2px solid" : index % 2 == 0 ? "1px solid" : "1px solid"
            }
            borderBottomColor={
                total > 100 && index == 9 ? "gray.100" : index % 2 == 0 ? "gray.925" : "gray.925"
            }
            role="group"
            _before={{
                position: "absolute",
                content: "''",
                width: "100%",
                height: "100%",
                top: "0",
                left: "0",
                _hover: {
                    bgColor: "gray.950",
                },
                bgColor: isLocalPlayer ? "gray.600" : index % 2 == 0 ? "gray.900" : "gray.875",

                // borderRadius: "12px",
                // transform: 'skew(-20deg)'
            }}
        >
            <Center
                minW={["4rem", "5rem", "6rem", "6rem"]}
                w={["4rem", "5rem", "6rem", "6rem"]}
                textAlign="center"
                p="0"
                pl="1.5rem"
                position="relative"
                borderTopRightRadius={"1rem"}
                borderBottomRightRadius={"1rem"}
                bgColor={
                    rank == 1 ? "yellow.200" : rank == 2 ? "gray.20" : rank == 3 ? "orange.200" : ""
                }
            >
                <Text
                    as="h6"
                    textAlign={"center"}
                    color={
                        rank == 1
                            ? "gray.1000"
                            : rank == 2
                            ? "gray.1000"
                            : rank == 3
                            ? "gray.1000"
                            : isLocalPlayer
                            ? "brand.75"
                            : "gray.0"
                    }
                    fontWeight={"500"}
                    fontSize={["1.6rem"]}
                    // fontSize={
                    //     rank == 1
                    //         ? "2rem"
                    //         : rank == 2
                    //         ? "2rem"
                    //         : rank == 3
                    //         ? "2rem"
                    //         : "1.6rem"s
                    // }
                    position="relative"
                >
                    {prevRank == rank && (
                        <Box
                            position="absolute"
                            left="50%"
                            top="-3.6rem"
                            transform="translateX(-50%)"
                            width="2px"
                            height="3rem"
                            bgColor="gray.50"
                            borderRadius="1px"
                            zIndex="0"
                            // borderRight="1px solid var(--chakra-colors-gray-1200)"
                            // borderLeft="1px solid var(--chakra-colors-gray-1200)"
                        ></Box>
                    )}
                    <Box position="relative" zIndex="1">
                        <TopRankNumber rank={rank} />
                    </Box>
                </Text>
            </Center>
            <Box p="0" flex="1" minW="0">
                <HStack>
                    <ChakraLink
                        w={["5rem", "5rem", "5rem", "5rem"]}
                        h={["5rem", "5rem", "5rem", "5rem"]}
                        minW={["5rem", "5rem", "5rem", "5rem"]}
                        whiteSpace={"nowrap"}
                        to={"/profile/" + displayname}
                        display="block"
                        position="relative"
                    >
                        <Image
                            src={`${config.https.cdn}images/country/${countrycode}.svg`}
                            // mt="0.5rem"
                            borderColor="gray.100"
                            borderRadius="3px"
                            width="1.75rem"
                            // height="1.75rem"
                            filter="opacity(0.9)"
                            position="absolute"
                            top="-0.1rem"
                            right="-0.7rem"
                            // zIndex="2"
                        />
                        <Image
                            src={`${config.https.cdn}images/portraits/assorted-${portraitid}-thumbnail.webp`}
                            loading="lazy"
                            w={["5rem", "5rem", "5rem", "5rem"]}
                            h={["5rem", "5rem", "5rem", "5rem"]}
                            minW={["5rem", "5rem", "5rem", "5rem"]}
                            // border="1px solid var(--chakra-colors-gray-1200)"
                            borderRadius={"50%"}
                            transition="transform 0.1s ease"
                            // transform="scale(1)"
                            _groupHover={
                                {
                                    // transform: 'scale(1.1)'
                                }
                            }
                        />
                    </ChakraLink>
                    <ChakraLink
                        zIndex={"1"}
                        minWidth="0"
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        pl="1.5rem"
                        fontSize={["1.4rem", "1.4rem", "1.6rem", "1.6rem"]}
                        lineHeight={"3rem"}
                        to={"/profile/" + displayname}
                        display="block"
                        textAlign="left"
                        color={isLocalPlayer ? "brand.75" : "gray.0"}
                        // textShadow={'1px 1px 6px var(--chakra-colors-gray-100)'}
                    >
                        {displayname}
                    </ChakraLink>
                    {/* <ChakraLink
                        zIndex={"1"}
                        w="2.5rem"
                        minW="2.5rem"
                        to={"/profile/" + displayname}
                        display="block"
                        position="relative"
                    >
                       
                    </ChakraLink> */}
                </HStack>
            </Box>
            <VStack spacing={0} gap="0" alignItems={"flex-end"}>
                <HStack
                    justifyContent={"center"}
                    alignItems={"center"}
                    h="100%"
                    px={["0", "1rem"]}
                    p="0"
                    // overflow={"hidden"}
                >
                    <Text
                        position="relative"
                        top={[0, 0, "0.1rem"]}
                        as="h6"
                        color={isLocalPlayer ? "brand.75" : "gray.30"}
                        fontWeight={"400"}
                        lineHeight="1.6rem"
                        // width="50px"
                        display={["none", "flex"]}
                        alignItems={"flex-start"}
                        fontSize={["1.1rem", "1.1rem", "1.2rem"]}
                        // display="flex"
                        pr={["0.5rem", "0.5rem", "0.5rem", "1rem"]}
                    >
                        <Text
                            lineHeight="1.6rem"
                            height="1.6rem"
                            as="span"
                            width="34px"
                            display={["inline-block"]}
                        >
                            Class&nbsp;
                        </Text>
                        <Text
                            as="span"
                            display={["block"]}
                            lineHeight="1.6rem"
                            width="16px"
                            textAlign={"center"}
                            fontWeight="400"
                            fontSize={["1.4rem", "1.4rem", "1.6rem"]}
                        >
                            {ratingFormatted}
                        </Text>
                    </Text>
                    <Text
                        zIndex={"1"}
                        as="h6"
                        display="inline-block"
                        width={["4.5rem", "4.5rem", "6rem"]}
                        lineHeight="1.6rem"
                        fontSize={["1.6rem", "1.6rem", "1.8rem"]}
                        fontWeight={"500"}
                        color={isLocalPlayer ? "brand.75" : "gray.0"}
                    >
                        {rating}
                    </Text>
                </HStack>
                <Text
                    zIndex={"1"}
                    as="h6"
                    display="inline-block"
                    width={["4.5rem", "4.5rem", "6rem"]}
                    fontSize={["1rem"]}
                    textAlign={"left"}
                    letterSpacing={"-1px"}
                    fontWeight={"500"}
                    height="1rem"
                    pt="0.2rem"
                    mr={["0", "1rem"]}
                    color={"gray.150"}
                >
                    {/* {(win || 0) + (tie || 0) + (loss || 0)} */}
                    {win || 0}-{tie || 0}-{loss || 0}
                </Text>
            </VStack>
        </HStack>
    );
}

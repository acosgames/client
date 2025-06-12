import { HStack, Center, Heading, Box, Text, chakra, Image, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import config from "../../../config";
import { TopRankNumber } from "./LeaderboardHeading";

const ChakraLink = chakra(Link);

export function PlayerDivisionRank({
    index,
    displayname,
    prevRank,
    rank,
    countrycode,
    isLocalPlayer,
    portraitid,
    rating,
    winrating,
    win,
    loss,
    tie,
}) {
    return (
        <HStack
            position="relative"
            width="100%"
            minW="100%"
            height="6rem"
            spacing="1rem"
            bgColor="transparent"
            borderBottom={index % 2 == 0 ? "1px solid" : "1px solid"}
            borderBottomColor={index % 2 == 0 ? "gray.925" : "gray.925"}
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
            >
                <Text
                    as="h6"
                    textAlign={"center"}
                    color={
                        rank == 1
                            ? "yellow.300"
                            : rank == 2
                            ? "gray.50"
                            : rank == 3
                            ? "orange.300"
                            : isLocalPlayer
                            ? "brand.75"
                            : "gray.0"
                    }
                    fontWeight={"500"}
                    fontSize={["1.4rem", "1.4rem", "1.6rem", "1.6rem", "1.8rem"]}
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
                    <TopRankNumber rank={rank} />
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
                            // borderRadius={'5px'}
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
                </HStack>
            </Box>
            <VStack spacing={0} alignItems={"flex-end"}>
                <HStack
                    justifyContent={"center"}
                    alignItems={"center"}
                    h="100%"
                    px={["0", "1rem"]}
                    overflow={"hidden"}
                >
                    <Text
                        zIndex={"1"}
                        as="h6"
                        display="inline-block"
                        textAlign={"center"}
                        width={["9rem", "9rem", "9rem"]}
                        lineHeight="1.8rem"
                        fontSize={["1.4rem", "1.4rem", "1.4rem"]}
                        fontWeight={"500"}
                        color={isLocalPlayer ? "brand.75" : "gray.0"}
                    >
                        {win || 0}-{tie || 0}-{loss || 0}
                    </Text>
                </HStack>
                {/* <Text
          position="relative"
          top={[0, 0, "0.1rem"]}
          as="h6"
          color={isLocalPlayer ? "brand.50" : "gray.50"}
          fontWeight={"400"}
          lineHeight="1.8rem"
          fontSize={["1.2rem", "1.2rem", "1.2rem"]}
          display={["none", "flex"]}
          pr={["0.5rem", "0.5rem", "0.5rem", "1rem"]}
        >
          {(winrating || 0).toFixed(2)}
        </Text> */}
                <Text
                    zIndex={"1"}
                    as="h6"
                    display="inline-block"
                    width={["9rem", "9rem", "9rem"]}
                    textAlign={"center"}
                    fontSize={["1.2rem"]}
                    fontWeight={"500"}
                    height="1rem"
                    pt="0.5rem"
                    mr={["0", "1rem"]}
                    color={"gray.150"}
                >
                    {(winrating || 0).toFixed(2)}
                    {/* {rating} */}
                </Text>
            </VStack>
        </HStack>
    );
}

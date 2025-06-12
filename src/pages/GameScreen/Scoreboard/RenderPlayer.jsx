import { motion } from "framer-motion";

import config from "../../../config";
import ratingConfig from "../../../actions/ratingconfig";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { getGamePanel, getPrimaryGamePanel, isUserNext } from "../../../actions/room";

import { IoMdArrowDropright } from "react-icons/io";
import { btGamePanels, btUser } from "../../../actions/buckets";
import { compareStringified, useBucketSelector } from "../../../actions/bucket";

const HStackMotion = motion(HStack);

function IsNextIndicator({ gamepanelid, shortid }) {
    let gamepanel = useBucketSelector(
        btGamePanels,
        (bucket) => bucket[gamepanelid]?.gamestate?.room?.next_id
    );
    let primary = getGamePanel(gamepanelid);
    let isNext = isUserNext(primary.gamestate, shortid);
    return (
        <Box
            display={isNext ? "block" : "none"}
            // borderRadius="50%"
            borderTopRightRadius={"8px"}
            position="absolute"
            // left="-1.2rem"
            // top="50%"
            bottom="0"
            left="0"
            width="0.8rem"
            h="0.8rem"
            // transform="translate(0,-50%)"
            zIndex={99}
            bgColor="brand.100"
        >
            {/* <IoMdArrowDropright fontSize="3rem" w="2rem" h="2rem" /> */}
        </Box>
    );
}
export default function RenderPlayer({
    gamepanelid,
    shortid,
    displayname,
    portraitid,
    rating,
    countrycode,
    // score,
    team,
}) {
    let score = useBucketSelector(
        btGamePanels,
        (panels) => panels[gamepanelid]?.gamestate?.players[shortid]?.score
    );

    // let { displayname, portraitid, rating, countrycode, score } = player;

    let filename = `assorted-${portraitid || 1}-medium.webp`;
    let ratingClass = ratingConfig.ratingToRank(rating);

    let localPlayer = btUser.get();
    let isLocalPlayer =
        localPlayer?.displayname == displayname || localPlayer?.displayname == displayname;
    // let primary = getPrimaryGamePanel();
    let gamepanel = getGamePanel(gamepanelid);

    let isNext = isUserNext(gamepanel.gamestate, shortid);

    let avatarSize = gamepanel.room.isReplay ? 4 : 3.5;
    let avatarScale = isNext ? 1.25 : 1;
    return (
        <HStackMotion
            key={"motion-" + name}
            position="relative"
            // px="0.5rem"
            bgColor={isNext ? "gray.600" : "gray.900"}
            p="1rem"
            w="100%"
            // initial={{ opacity: 0, scale: 0 }}
            // animate={{ opacity: 1, scale: 1 }}
            // exit={{ opacity: 0, scale: 0 }}
            // layout
            // style={{ width: "100%", filter: isNext ? gamepanel.room.isReplay ? 'drop-shadow(0 0 2px rgba(255,255,255,0.2))' : 'drop-shadow(0 0 2px rgba(255,255,255,0.6))' : '' }}
            _before={
                team
                    ? {
                          content: "''",
                          position: "absolute",
                          width: "2rem",
                          height: "2rem",
                          bottom: "0",
                          right: "0",
                          backgroundColor: team ? team.color : "gray.1050",
                          zIndex: "10",
                          clipPath:
                              "polygon(100% calc(100% - 10px), 100% 100%, calc(100% - 10px) 100%)",
                      }
                    : {}
            }
        >
            <IsNextIndicator gamepanelid={gamepanelid} shortid={shortid} />
            <HStack
                w="100%"
                // mx="0.5rem"
                // mr="1rem"
                spacing="0rem"
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
                // bgColor={gamepanel.room.isReplay ? 'gray.1050' : "gray.1200"}
                // borderRadius="8px"
                borderRightRadius={"0"}
                // overflow="hidden"
                // borderRight={team ? "2px solid" : ''}
                // borderRightColor={team ? team.color : ''}

                // transform="skew(-15deg)"
                // clipPath={
                //     team
                //         ? "polygon(100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 0)"
                //         : ""
                // } //, "
            >
                <Box position="relative" w={`${avatarSize}rem`} h={`${avatarSize}rem`}>
                    <Image
                        src={`${config.https.cdn}images/country/${countrycode}.svg`}
                        // mt="0.5rem"
                        borderColor="gray.100"
                        borderRadius="3px"
                        width="1.5rem"
                        // height="1.75rem"
                        filter="opacity(0.9)"
                        position="absolute"
                        top="-0.3rem"
                        right="-0.3rem"
                        zIndex="3"
                    />
                    <Image
                        display="inline-block"
                        src={`${config.https.cdn}images/portraits/${filename}`}
                        loading="lazy"
                        borderRadius={"50%"}
                        maxHeight="100%"
                        transition="all 0.5s linear(0, 0.402 7.4%, 0.711 15.3%, 0.929 23.7%, 1.008 28.2%, 1.067 33%, 1.099 36.9%, 1.12 41%, 1.13 45.4%, 1.13 50.1%, 1.111 58.5%, 1.019 83.2%, 1.004 91.3%, 1)"
                        w={`${avatarSize}rem`}
                        h={`${avatarSize}rem`}
                        // mb="1rem"
                        position="relative"
                        zIndex="2"
                        transform={`scale(${avatarScale})`}
                        // transform="skew(15deg)"
                        // border="1px solid"
                        // borderColor={player.ready ? "brand.100" : "brand.900"}
                    />
                </Box>
                <VStack
                    w="100%"
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                    spacing="0.25rem"
                    // pr="0.5rem"
                    flex="1"
                    // transform="skew(15deg)"
                >
                    <HStack
                        w="100%"
                        // bgColor={gamepanel.room.isReplay ? "gray.1050" : "gray.1200"}
                        pl="1rem"
                    >
                        <Text
                            as="span"
                            textAlign={"center"}
                            color={isLocalPlayer ? "gray.0" : "gray.40"}
                            fontWeight="500"
                            fontSize={gamepanel.room.isReplay ? "1.2rem" : ["1.4rem"]}
                            lineHeight={"1.4rem"}
                            maxW={["19rem"]}
                            overflow="hidden"
                            whiteSpace={"nowrap"}
                            textOverflow={"ellipsis"}
                            pt="0.5rem"
                            pb="0.25rem"
                        >
                            {displayname}
                        </Text>
                    </HStack>
                    <HStack
                        // bgColor={gamepanel.room.isReplay ? 'gray.1050' : "gray.1200"}
                        // bgColor="gray.1050"
                        display={gamepanel.room.isReplay ? "flex" : "flex"}
                        spacing="0.5rem"
                        alignSelf={"flex-start"}
                        justifyContent={"flex-start"}
                        w="100%"
                        pb="0.5rem"
                        pl="1rem"
                        // w="20rem"
                    >
                        <Text
                            as="span"
                            color="gray.100"
                            fontWeight="500"
                            fontSize="1rem"
                            lineHeight={"1.0rem"}
                            //   textShadow={"0 2px 3px black,0 2px 6px var(--chakra-colors-gray-900)"}
                        >
                            Class {ratingClass}
                        </Text>
                    </HStack>
                    <HStack
                        position="relative"
                        // top="-1rem"
                        h="100%"
                        w="100%"
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                        pr="2rem"
                        // bgColor={
                        //     gamepanel.room.isReplay ? "gray.1050" : "gray.1200"
                        // }

                        // borderTop="1px solid"
                        // borderTopColor="gray.100"
                    >
                        <Text as="span" fontSize={gamepanel.room.isReplay ? "2rem" : "3rem"}>
                            {score}
                        </Text>
                    </HStack>
                </VStack>
            </HStack>
        </HStackMotion>
    );
}

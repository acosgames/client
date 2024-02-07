

import { motion } from 'framer-motion';
import fs from 'flatstore'
import config from '../../../config';
import ratingconfig from 'shared/util/ratingconfig';
import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { getGamePanel, getPrimaryGamePanel, isUserNext } from '../../../actions/room';

import { IoMdArrowDropright } from "react-icons/io";


const HStackMotion = motion(HStack);

function IsNextIndicator({ gamepanelid, shortid }) {

    let [gamepanel] = fs.useWatch('gamepanel/' + gamepanelid)
    let primary = getGamePanel(gamepanelid);
    // let [next] = fs.useWatch('primary/next');
    let isNext = isUserNext(primary.gamestate, shortid)
    return (
        <Box display={isNext ? 'block' : 'none'} borderRadius="50%" position="absolute" left="-1rem" top="50%" transform="translate(0,-50%)" zIndex={99} color="brand.100"> <IoMdArrowDropright fontSize="2rem" w="1rem" h="1rem" /></Box>
    )
}
export default function RenderPlayer({ gamepanelid, shortid, name, portraitid, rating, countrycode, score, team }) {
    let filename = `assorted-${portraitid || 1}-medium.webp`;
    let ratingClass = ratingconfig.ratingToRank(rating);

    // let [players] = fs.useWatch("primary/players");

    let localPlayer = fs.get('user');
    // let primary = getPrimaryGamePanel();
    let gamepanel = getGamePanel(gamepanelid);

    let isNext = isUserNext(gamepanel.gamestate, shortid)
    return (
        <HStackMotion
            key={"motion-" + name}
            position="relative"
            px="0.5rem"
            // initial={{ opacity: 0, scale: 0 }}
            // animate={{ opacity: 1, scale: 1 }}
            // exit={{ opacity: 0, scale: 0 }}
            layout
            // style={{ width: "100%", filter: isNext ? gamepanel.room.isReplay ? 'drop-shadow(0 0 2px rgba(255,255,255,0.2))' : 'drop-shadow(0 0 2px rgba(255,255,255,0.6))' : '' }}
            _before={team ? {
                content: "''",
                position: 'absolute',
                width: 'calc(100% - 1rem)',
                height: 'calc(100% - 1px)',
                backgroundColor: team ? team.color : 'gray.1050',
                zIndex: '10',
                clipPath: 'polygon(100% calc(100% - 10px), 100% 100%, calc(100% - 10px) 100%)'
            } : {}}
        >
            <IsNextIndicator gamepanelid={gamepanelid} shortid={shortid} />
            <HStack
                w="100%"
                // mx="0.5rem"
                // mr="1rem"
                spacing="0rem"
                // justifyContent={"flex-start"}
                // alignItems={"flex-start"}
                // bgColor={gamepanel.room.isReplay ? 'gray.1050' : "gray.1200"}
                // borderRadius="8px"
                borderRightRadius={'0'}
                overflow="hidden"

                // borderRight={team ? "2px solid" : ''}
                // borderRightColor={team ? team.color : ''}

                // transform="skew(-15deg)"
                clipPath={team ? "polygon(100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 0)" : ''}//, "

            >
                <Image
                    display="inline-block"
                    src={`${config.https.cdn}images/portraits/${filename}`}
                    loading="lazy"
                    // borderRadius={"8px"}
                    maxHeight="100%"
                    w={gamepanel.room.isReplay ? '4rem' : "6.5rem"}
                    h={gamepanel.room.isReplay ? '4rem' : "6.5rem"}
                    // mb="1rem"
                    position="relative"
                    zIndex="2"
                // transform="skew(15deg)"
                // border="1px solid"
                // borderColor={player.ready ? "brand.100" : "brand.900"}
                />
                <VStack
                    w="100%"
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                    spacing="0"
                    // pr="0.5rem"
                    flex="1"
                // transform="skew(15deg)"
                >
                    <HStack w="100%"
                        bgColor={gamepanel.room.isReplay ? 'gray.1050' : "gray.1200"}
                        pl="1rem">
                        <Text
                            as="span"
                            textAlign={"center"}
                            color={localPlayer?.displayname == name || localPlayer?.name == name ? 'brand.1000' : "gray.0"}
                            fontWeight="500"
                            fontSize={gamepanel.room.isReplay ? '1.2rem' : ["1.4rem"]}
                            lineHeight={'1.4rem'}
                            maxW={["19rem"]}
                            overflow="hidden"
                            whiteSpace={"nowrap"}
                            textOverflow={"ellipsis"}
                            py="0.5rem"
                        >
                            {name}
                        </Text>
                        <Image
                            src={`${config.https.cdn}images/country/${countrycode}.svg`}
                            // mt="0.5rem"
                            borderColor="gray.100"
                            borderRadius="0px"
                            width="1.75rem"
                            filter="opacity(0.8)"
                        />
                    </HStack>
                    <HStack
                        bgColor={gamepanel.room.isReplay ? 'gray.1050' : "gray.1200"}
                        display={gamepanel.room.isReplay ? 'none' : 'block'}
                        spacing="1rem"
                        alignSelf={"flex-start"}
                        justifyContent={"flex-start"}
                        w="100%"
                        pb="0.5rem"
                        pl="1rem"
                    // w="20rem"
                    >
                        <VStack alignItems={"flex-start"} w="8rem">
                            <Text
                                as="span"
                                color="gray.100"
                                fontWeight="500"
                                fontSize="1.1rem"
                                lineHeight={"1.0rem"}
                            //   textShadow={"0 2px 3px black,0 2px 6px var(--chakra-colors-gray-900)"}
                            >
                                Class {ratingClass}
                            </Text>
                            {/* <Text
                as="span"
                color="gray.100"
                fontWeight="500"
                fontSize="1.2rem"
                lineHeight={"1.3rem"}
                //   textShadow={"0 2px 3px black,0 2px 6px var(--chakra-colors-gray-900)"}
              >
                {player.rating}
              </Text> */}
                        </VStack>
                    </HStack>
                    <HStack
                        position="relative"
                        // top="-1rem"
                        h="100%"
                        w="100%"
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                        pr="1rem"
                        bgColor={gamepanel.room.isReplay ? 'gray.1200' : "gray.1050"}

                    // borderTop="1px solid"
                    // borderTopColor="gray.100"
                    >
                        <Text as="span" fontSize={gamepanel.room.isReplay ? '1.2rem' : "1.6rem"}>
                            {score}
                        </Text>
                    </HStack>
                </VStack>
            </HStack>
        </HStackMotion>
    );
};

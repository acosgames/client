

import { motion } from 'framer-motion';
import fs from 'flatstore'
import config from '../../../config';
import ratingtext from 'shared/util/ratingtext';
import { HStack, Image, Text, VStack } from '@chakra-ui/react';



export default function RenderPlayer({ name, portraitid, rating, countrycode, score, team }) {
    let filename = `assorted-${portraitid || 1}-thumbnail.webp`;
    let ratingClass = ratingtext.ratingToRank(rating);

    let [primaryId] = fs.useWatch("primary/players");

    const HStackMotion = motion(HStack);
    return (
        <motion.div
            key={"motion-" + name}
            // initial={{ opacity: 0, scale: 0 }}
            // animate={{ opacity: 1, scale: 1 }}
            // exit={{ opacity: 0, scale: 0 }}
            layout
            style={{ width: "100%" }}
        >
            <HStack
                w="100%"
                // mx="0.5rem"
                // mr="1rem"
                spacing="1rem"
                // justifyContent={"flex-start"}
                // alignItems={"flex-start"}
                bgColor="gray.1050"
                // borderRadius="8px"
                borderRightRadius={'0'}
                overflow="hidden"

                borderRight={team ? "2px solid" : ''}
                borderRightColor={team ? team.color : ''}

            // transform="skew(-15deg)"
            // clipPath="polygon(100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 0)"
            >
                <Image
                    display="inline-block"
                    src={`${config.https.cdn}images/portraits/${filename}`}
                    loading="lazy"
                    // borderRadius={"8px"}
                    maxHeight="100%"
                    w="6.5rem"
                    h="6.5rem"
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
                    <HStack w="100%">
                        <Text
                            as="span"
                            textAlign={"center"}
                            color="gray.0"
                            fontWeight="600"
                            fontSize={["1.4rem"]}
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
                        spacing="1rem"
                        alignSelf={"flex-start"}
                        justifyContent={"flex-start"}
                        w="100%"
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
                    >
                        <Text as="span" fontSize="1.6rem">
                            {score}
                        </Text>
                    </HStack>
                </VStack>
            </HStack>
        </motion.div>
    );
};

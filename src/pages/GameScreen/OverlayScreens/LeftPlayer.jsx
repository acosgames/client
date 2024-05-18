import { HStack, Image, Text, VStack, Icon } from "@chakra-ui/react";

import config from "../../../config";
import ratingconfig from "../../../actions/ratingconfig";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import {
    btGamePanels,
    btScreenResized,
    btUser,
} from "../../../actions/buckets";
import { useBucket, useBucketSelector } from "../../../actions/bucket";

const MotionHStack = motion(HStack);

export default function LeftPlayer({
    shortid,
    gamepanelid,
    isLeft,
    ignoreLocal,
    initial,
    animate,
    transition,
}) {
    let player = useBucketSelector(
        btGamePanels,
        (bucket) => bucket[gamepanelid]?.gamestate?.players[shortid]
    );
    let screenRect = useBucket(btScreenResized);
    let filename = `assorted-${player.portraitid || 1}-original.webp`;

    let user = btUser.get();

    if (!player) return <></>;

    let ratingClass = ratingconfig.ratingToRank(player.rating);
    return (
        <MotionHStack
            position="relative"
            justifyContent={"center"}
            spacing="0"
            initial={initial || { x: isLeft ? "-50vw" : "50vw" }}
            animate={animate || { x: 0 }}
            transition={transition || { duration: 0.3, delay: 0.4 }}
            overflow="hidden"
            zIndex="1"
            boxShadow={
                user.displayname == player.displayname && !ignoreLocal
                    ? isLeft
                        ? "0 0 10px var(--chakra-colors-gray-100)"
                        : "0 0 10px var(--chakra-colors-gray-500)"
                    : "gray.1200"
            }
        >
            <Image
                display="inline-block"
                src={`${config.https.cdn}images/portraits/${filename}`}
                loading="lazy"
                maxHeight="100%"
                height={["9rem"]}
                position="relative"
                zIndex="2"
            />
            <VStack
                alignItems={"flex-start"}
                spacing="0"
                minWidth={["20rem", "22rem", "25rem", "30rem"]}
            >
                <HStack
                    flex="1"
                    w="100%"
                    h="5rem"
                    minHeight="5rem"
                    p="1rem"
                    spacing="0"
                    bgColor="gray.1200"
                >
                    <Text
                        as="span"
                        pr="1rem"
                        textAlign={"center"}
                        color={
                            user.displayname == player.displayname
                                ? "brand.900"
                                : "gray.0"
                        }
                        fontWeight="400"
                        fontSize={["1.4rem", "1.8rem", "1.8rem", "2rem"]}
                        letterSpacing={"-1px"}
                        fontStyle="italic"
                        maxW={["20rem", "22rem", "25rem", "30rem"]}
                        overflow="hidden"
                        whiteSpace={"nowrap"}
                        textOverflow={"ellipsis"}
                        textShadow={
                            "0 2px 3px var(--chakra-colors-gray-900),0 2px 6px var(--chakra-colors-gray-900)"
                        }
                    >
                        {player.displayname}
                    </Text>
                    <HStack
                        spacing="1rem"
                        justifyContent={"flex-start"}
                        width="2rem"
                        minW="2rem"
                    >
                        <Image
                            src={`${config.https.cdn}images/country/${player.countrycode}.svg`}
                            borderColor="gray.100"
                            borderRadius="0px"
                            width="2rem"
                            filter="opacity(0.8)"
                        />
                    </HStack>
                </HStack>
                <HStack
                    w="100%"
                    height="4rem"
                    minHeight="4rem"
                    spacing="0rem"
                    alignSelf={"flex-start"}
                    justifyContent={"flex-start"}
                    bgColor="gray.1050"
                    pb="0.5rem"
                >
                    <VStack
                        w="4rem"
                        minW="5rem"
                        h="5rem"
                        mr="0rem"
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Text
                            as="span"
                            textTransform="uppercase"
                            fontSize="2.2rem"
                            color="gray.10"
                            textShadow={`2px 2px 2px var(--chakra-colors-gray-200),
                        -2px 2px 2px var(--chakra-colors-gray-200),
                        2px -2px 2px var(--chakra-colors-gray-200),
                        -2px -2px 2px var(--chakra-colors-gray-200)`}
                            fontWeight="bold"
                            letterSpacing="0px"
                            textAlign="center"
                            lineHeight={"2.4rem"}
                            position="relative"
                            top="1rem"
                            borderRadius="20px"
                        >
                            {ratingClass}
                        </Text>
                        <Text
                            as="span"
                            color="gray.100"
                            p="0.25rem"
                            fontWeight="500"
                            fontSize="1.2rem"
                        >
                            {player.rating}
                        </Text>
                    </VStack>
                    <VStack
                        flex="1"
                        w="100%"
                        alignItems="flex-end"
                        justifyContent={"center"}
                    >
                        <Icon
                            display={player.ready ? "block" : "none"}
                            as={FaCheck}
                            fontSize="1.8rem"
                            color={"brand.300"}
                            mr="1rem"
                            // mr="2rem"
                            filter={
                                "drop-shadow(0 0 4px var(--chakra-colors-brand-100)) drop-shadow(0 0 1px var(--chakra-colors-brand-100))"
                            }
                        />
                    </VStack>
                </HStack>
            </VStack>
        </MotionHStack>
    );
}

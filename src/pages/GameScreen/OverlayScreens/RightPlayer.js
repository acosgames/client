import { HStack, Image, Text, VStack, Icon } from '@chakra-ui/react';
import fs from 'flatstore';

import config from '../../../config';
import ratingtext from "shared/util/ratingtext";
import { FaCheck } from '@react-icons';

export default function RightPlayer({ player }) {
    let filename = `assorted-${player.portraitid || 1}-original.webp`;

    let ratingClass = ratingtext.ratingToRank(player.rating);
    return (
        <HStack
            // w="100%"
            // h="100%"
            //   width="100%"
            //   height="15rem"
            position="relative"
            transition="1s"
            p="0"
            pb="1rem"

            pl={["3rem", "0"]}
            //   py="2rem"
            justifyContent={"center"}
            spacing="0"
            transform={"translate(100vw, 0)"}
            animation={"fromRightNoSkew 0.6s forwards 0.2s"}
            //   bgColor="gray.875"
            borderRadius="12px"
            overflow="hidden"
            zIndex="1"
        >
            <VStack alignItems={"flex-end"} w="100%">
                <Text
                    as="span"
                    // px="1rem"
                    pr="1rem"
                    textAlign={"center"}
                    color="gray.0"
                    fontWeight="600"
                    fontSize={["1.6rem", "1.8rem", "1.8rem", "1.8rem"]}
                    maxW={["20rem", "22rem", "20rem", "25rem"]}
                    overflow="hidden"
                    whiteSpace={"nowrap"}
                    textOverflow={"ellipsis"}
                    textShadow={
                        "0 2px 3px var(--chakra-colors-gray-900),0 2px 6px var(--chakra-colors-gray-900)"
                    }
                >
                    {player.name}
                </Text>
                <HStack
                    spacing="1rem"
                    alignSelf={"flex-end"}
                    pr="1rem"
                    justifyContent={"flex-start"}
                    w="20rem"
                >
                    <Icon
                        display={player.ready ? "block" : "none"}
                        as={FaCheck}
                        fontSize="3rem"
                        color={"brand.300"}
                        ml="2rem"
                        filter={
                            "drop-shadow(0 0 3px var(--chakra-colors-brand-100)) drop-shadow(0 0 8px var(--chakra-colors-brand-100))"
                        }
                    />
                    <VStack alignItems={"flex-end"} w="8rem">
                        <Text
                            as="span"
                            color="gray.20"
                            fontWeight="600"
                            fontSize="1.6rem"
                            lineHeight={"1.3rem"}
                        //   textShadow={"0 2px 3px black,0 2px 6px var(--chakra-colors-gray-900)"}
                        >
                            Class {ratingClass}
                        </Text>
                        <Text
                            as="span"
                            color="gray.20"
                            fontWeight="500"
                            fontSize="1.2rem"
                            lineHeight={"1.3rem"}
                        //   textShadow={"0 2px 3px black,0 2px 6px var(--chakra-colors-gray-900)"}
                        >
                            {player.rating}
                        </Text>
                    </VStack>
                    <Image
                        src={`${config.https.cdn}images/country/${player.countrycode}.svg`}
                        // mt="0.5rem"
                        borderColor="gray.100"
                        borderRadius="0px"
                        width="4rem"
                        filter="opacity(0.8)"
                    />
                </HStack>
            </VStack>

            <Image
                display="inline-block"
                src={`${config.https.cdn}images/portraits/${filename}`}
                loading="lazy"
                borderRadius={"8px"}
                maxHeight="100%"
                height={["10rem", "10rem", "10rem", "16rem", "20rem"]}
                // mb="1rem"
                position="relative"
                zIndex="2"
            // border="3px solid"
            // borderColor={player.ready ? "brand.100" : "brand.900"}
            />
        </HStack>
    );
}

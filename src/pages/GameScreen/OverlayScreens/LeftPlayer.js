import { HStack, Image, Text, VStack, Icon } from '@chakra-ui/react';
import fs from 'flatstore';

import config from '../../../config';
import ratingtext from "shared/util/ratingtext";
import { FaCheck } from '@react-icons';

export default function LeftPlayer({ player, isLeft }) {
    let [screenRect] = fs.useWatch("screenRect");
    let filename = `assorted-${player.portraitid || 1}-original.webp`;

    let ratingClass = ratingtext.ratingToRank(player.rating);
    return (
        <HStack
            // width="100%"
            //   maxHeight="15rem"
            pt="1rem"
            position="relative"
            transition="1s"
            //   py="2rem"
            justifyContent={"center"}
            spacing="0"
            transform={isLeft ? "translate(-100vw, 0)" : "translate(100vw, 0)"}
            animation={isLeft ? "fromLeftNoSkew 0.6s forwards 0.2s" : "fromRightNoSkew 0.6s forwards 0.2s"}
            borderRadius="12px"
            overflow="hidden"
            zIndex="1"
        >
            <Image
                display="inline-block"
                src={`${config.https.cdn}images/portraits/${filename}`}
                loading="lazy"
                // borderRadius={"8px"}
                maxHeight="100%"
                height={["9rem"]}
                // mb="1rem"
                position="relative"
                zIndex="2"
            // border="1px solid"
            // borderColor={player.ready ? "brand.100" : "brand.900"}
            />
            <VStack alignItems={"flex-start"} spacing="0" minWidth={["20rem", "22rem", "25rem", "30rem"]}>
                <HStack flex="1" w="100%" h="4rem" minHeight="4rem" p="1rem" spacing='0' bgColor="gray.1200">

                    <Text
                        as="span"
                        pr="1rem"
                        textAlign={"center"}
                        color="gray.0"
                        fontWeight="400"
                        fontSize={["1.4rem", "1.8rem", "1.8rem", "2rem"]}
                        letterSpacing={'-1px'}
                        fontStyle="italic"
                        maxW={["20rem", "22rem", "25rem", "30rem"]}
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
                        alignSelf={"flex-start"}
                        // pl="0.5rem"
                        justifyContent={"flex-start"}
                        // w="20rem"
                        // bgColor="gray.800"
                        // mt="1rem"
                        width="2rem"
                        minW="2rem"
                    // ml="1rem"
                    >
                        <Image
                            src={`${config.https.cdn}images/country/${player.countrycode}.svg`}
                            // mt="0.5rem"
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
                    // pl="1rem"
                    justifyContent={"flex-start"}
                    bgColor="gray.1050"
                    pb="0.5rem"
                // w="20rem"
                >
                    {/* <Image
                        src={`${config.https.cdn}images/country/${player.countrycode}.svg`}
                        // mt="0.5rem"
                        borderColor="gray.100"
                        borderRadius="0px"
                        width="4rem"
                        filter="opacity(0.8)"
                    /> */}
                    <VStack w="4rem" minW="5rem" h="5rem" mr="0rem"
                        // bgColor="gray.800"
                        justifyContent={"center"}
                        alignItems={'center'}>
                        <Text as="span"
                            textTransform='uppercase'
                            // display={played >= 10 ? 'block' : 'none'}
                            fontSize='2.2rem'
                            color='gray.10'
                            // textShadow='0 8px 9px var(--chakra-colors-brand-300) 0px -2px 20px var(--chakra-colors-brand-600)'
                            textShadow={`2px 2px 2px var(--chakra-colors-gray-200),
                        -2px 2px 2px var(--chakra-colors-gray-200),
                        2px -2px 2px var(--chakra-colors-gray-200),
                        -2px -2px 2px var(--chakra-colors-gray-200)`}
                            fontWeight='bold'
                            letterSpacing='0px'
                            textAlign='center'
                            lineHeight={'2.4rem'}
                            position='relative'
                            top="1rem"
                            borderRadius='20px'

                        >
                            {ratingClass}
                        </Text>
                        <Text
                            as="span"
                            color="gray.100"
                            // bgColor="gray.600"
                            p="0.25rem"
                            fontWeight="500"
                            fontSize="1.2rem"
                        //   textShadow={"0 2px 3px black,0 2px 6px var(--chakra-colors-gray-900)"}
                        >
                            {player.rating}
                        </Text>
                    </VStack>
                    <VStack flex="1" w="100%" alignItems="flex-end" justifyContent={'center'}>
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
        </HStack>
    );
}
import { Box, chakra, VStack, Text, Icon, HStack, Grid, GridItem, Tr, Table, Th, Thead, Tbody, Td, Image, Heading, Center } from '@chakra-ui/react';
import fs from 'flatstore';
import { Link } from 'react-router-dom';

import { GiLaurelsTrophy, } from '@react-icons';

import config from '../../config'
import ratingconfig from 'shared/util/ratingconfig';
import USAFlag from "../../assets/images/flags/USA.svg";
import { findGameRankGlobal } from '../../actions/game';
import { useEffect } from 'react';

const ChakraLink = chakra(Link);

export default function GameRankGlobal({ }) {

    let [rankings] = fs.useWatch('rankings/global');
    let [rankingsCount] = fs.useWatch('rankings/global/count');

    let user = fs.get('user');
    let player_stats = fs.get('player_stats');
    let game = fs.get('game');

    useEffect(() => {
        let g = fs.get('game');
        if (g)
            findGameRankGlobal(g.game_slug);
    }, [game?.game_slug])

    if (!rankings) {
        return <Box>
            <Text as="h4">No rankings found.</Text>
        </Box>
    }

    if (!game)
        return <Text as="span">Loading...</Text>

    let playerGameStats = player_stats[game.game_slug];

    const renderRankings = (players) => {
        rankings = rankings || [];
        let elems = [];
        let rank = 0;
        for (let player of rankings) {
            rank++;
            let isLocalPlayer = user?.displayname == player.displayname;
            let isPast5Rank = rank == 10 && (playerGameStats && playerGameStats.ranking > 10);
            let displayname = player.displayname || player.value;
            let ratingTxt = ratingconfig.ratingToRank(Number.parseInt(player.rating));
            let ratingFormatted = ratingTxt.toUpperCase();
            let flagCode = null;
            elems.push(<PlayerRanking
                key={'rankings-global-' + displayname}
                rank={player.rank}
                flagCode={flagCode}
                rating={player.rating}
                displayname={displayname}
                isLocalPlayer={isLocalPlayer}
                portraitid={player.portraitid}
                ratingFormatted={ratingFormatted}
                countrycode={player.countrycode}
            />)
        }
        return elems;
    }

    let playerRank = -1;
    for (var player of rankings) {
        let isLocalPlayer = user?.displayname == player.displayname;
        if (isLocalPlayer) {
            playerRank = player.rank;
            break;
        }
    }

    let lbCount = rankingsCount || 0;
    if (lbCount == 0) {
        return (
            <Box>
                <Text mt='1rem' fontWeight={'bold'}>No rankings yet.</Text>
            </Box>
        )
    }
    return (
        <Box w="100%" maxW={["100%", "100%", "100%", "95%", "70%", "60%"]} pt="0" pb="10rem" px={["1rem", "3rem"]}>
            <VStack w="100%" spacing="1rem" alignItems={'flex-start'}>
                <VStack
                    w="100%"
                    alignItems={'center'}
                >
                    <Heading as="h2" color="gray.0" fontSize={['2.4rem', '2.4rem', "3rem"]} fontWeight={'600'}>Global Rankings</Heading>
                </VStack>
                <HStack w="100%" spacing="1rem">
                    <Text w={["5rem", "5rem", "6rem", "6rem"]} as="span" p="0" color={'gray.100'} fontSize="xs" textAlign={'right'}>Rank</Text>
                    <Text as="span" minW="0" flex="1" p="0" color={'gray.100'} fontSize="xs" w={["70%", "70%", "60%", "60%"]} pl={["5rem", "5rem", "7rem", "7rem"]}>Player</Text>
                    <Text justifySelf="flex-end" as="span" p="0" color={'gray.100'} fontSize="xs" textAlign='right' pr={["1rem", "1rem", "2.5rem"]}>Rating</Text>
                </HStack>
                {renderRankings()}
                <Box w="100%" display={playerRank == -1 ? 'none' : 'block'} pt="1rem" >
                    <Text fontSize="2rem" align='center' display={lbCount > 0 ? 'block' : 'none'} color="gray.10">
                        Rank{" "}
                        <Text as="span" fontWeight='500' color="brand.300">
                            {playerRank || -1}{" "}
                        </Text>
                        of{" "}
                        <Text as="span" fontWeight='500' >
                            {lbCount}
                        </Text>
                    </Text>
                </Box>
                <Box w="100%" display={playerRank != -1 ? 'none' : 'block'} pt="1rem" >
                    <Text fontSize="2rem" align='center' display={lbCount > 0 ? 'block' : 'none'} color="gray.10">
                        Play more games to be listed
                    </Text>
                </Box>

            </VStack>
        </Box >
    )
}

function PlayerRanking({ displayname, rank, flagCode, isLocalPlayer, portraitid, countrycode, ratingFormatted, rating }) {
    return (
        <HStack
            position="relative"
            width="100%"
            minW="100%"
            spacing="1rem"
            bgColor="transparent"
            _before={{
                position: "absolute",
                content: "''",
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
                _hover: {
                    bgColor: 'gray.950'
                },
                bgColor: (isLocalPlayer ? 'brand.500' : "gray.875"),
                borderRadius: "12px",
                transform: 'skew(-20deg)'
            }}
        >
            <Center
                minW={["4rem", "5rem", "6rem", "6rem"]}
                w={["4rem", "5rem", "6rem", "6rem"]}
                textAlign='center'
                p="0"
                pl="1.5rem"
            >
                <Heading as="h6" textAlign={'center'} color="gray.0" fontWeight={'500'} fontSize={['1.4rem', '1.4rem', "1.6rem", "1.6rem", "1.8rem"]} position="relative">
                    {rank}
                </Heading>
            </Center>
            <Box p="0" flex="1" minW="0">
                <HStack >
                    <ChakraLink w={["4rem", "4rem", "6rem", "6rem"]}

                        minW={["4rem", "4rem", "6rem", "6rem"]} whiteSpace={'nowrap'} to={'/profile/' + displayname} display="block" position="relative" >
                        <Image
                            src={`${config.https.cdn}images/portraits/assorted-${portraitid}-thumbnail.webp`}
                            loading="lazy"
                            w={["4rem", "4rem", "6rem", "6rem"]}
                            minW={["4rem", "4rem", "6rem", "6rem"]}
                        // borderRadius={'5px'}
                        />
                    </ChakraLink>
                    <ChakraLink
                        zIndex={'1'}
                        minWidth="0"
                        whiteSpace={'nowrap'}
                        overflow={'hidden'}
                        textOverflow={'ellipsis'}
                        pl="0.5rem"
                        fontSize={["1.4rem", "1.4rem", "1.6rem", "2rem"]}
                        lineHeight={'3rem'}
                        to={'/profile/' + displayname}
                        display="block"
                        textAlign='left'
                        color={'gray.10'}
                        textShadow={'1px 1px 6px var(--chakra-colors-gray-100)'}
                    >
                        {displayname}
                    </ChakraLink>
                    <ChakraLink
                        zIndex={'1'}
                        w="2.5rem"
                        minW="2.5rem"
                        to={'/profile/' + displayname}
                        display="block"
                        position="relative" >
                        <Image
                            src={`${config.https.cdn}images/country/${countrycode}.svg`}
                            // mt="0.5rem"
                            display="inline-block"
                            verticalAlign={"middle"}
                            // borderRadius="5px"
                            w="2rem"
                            minW="2rem"
                        />

                    </ChakraLink>
                </HStack>
            </Box>
            <HStack justifyContent={'center'} alignItems={'center'} h="100%" px={["0", "1rem"]} overflow={"hidden"}>
                <Heading position="relative"
                    top="0.2rem"
                    as="h6"
                    color={(isLocalPlayer ? 'gray.0' : "gray.50")}
                    fontWeight={'500'}
                    fontSize="xs"
                    pr="1rem">
                    <Text as="span" display={['none', 'inline-block']}>CLASS&nbsp;</Text>
                    {ratingFormatted}
                </Heading>
                <Heading
                    zIndex={'1'}
                    as="h6"
                    display="inline-block"
                    width={["4.5rem", "4.5rem", "6rem"]}
                    fontSize={['1.6rem', '1.6rem', "2rem"]}
                    fontWeight={'500'}
                    color={(isLocalPlayer ? 'gray.0' : "gray.0")}
                >
                    {rating}
                </Heading>
            </HStack>
        </HStack >
    )
}
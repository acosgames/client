import { Box, chakra, VStack, Text, Icon, HStack, Grid, GridItem, Tr, Table, Th, Thead, Tbody, Td, Image, Heading, Center } from '@chakra-ui/react';
import fs from 'flatstore';
import { Link } from 'react-router-dom';

import { GiLaurelsTrophy, } from '@react-icons';

import config from '../../config'
import ratingtext from 'shared/util/ratingtext';
import USAFlag from "../../assets/images/flags/USA.svg";

const ChakraLink = chakra(Link);

export default function GameInfoTop10({ }) {

    let [leaderboard] = fs.useWatch('leaderboard');
    let [leaderboardCount] = fs.useWatch('leaderboardCount');

    if (!leaderboard) {
        return <Box>
            <Text as="h4">No rankings found.</Text>
        </Box>
    }

    let user = fs.get('user');
    let player_stats = fs.get('player_stats');
    let game = fs.get('game');

    let playerGameStats = player_stats[game.game_slug];

    const renderRankings = (players) => {

        leaderboard = leaderboard || [];
        let elems = [];

        // tag = tag || 'default'

        let rank = 0;
        for (var player of leaderboard) {
            rank++;
            let isLocalPlayer = user?.displayname == player.displayname;
            let isPast5Rank = rank == 10 && (playerGameStats && playerGameStats.ranking > 10);

            let displayname = player.displayname || player.value;
            if (displayname.length > 16) {
                displayname = displayname.substr(0, 16) + '...';
            }

            let ratingTxt = ratingtext.ratingToRank(Number.parseInt(player.rating));
            let ratingTextFormatted = ratingTxt.toUpperCase();
            let ratingImageFile = ratingTxt.replace(/ /ig, '');
            let rankNumber = ratingtext.ratingToRankNumber(Number.parseInt(player.rating));
            let flagCode = null;
            elems.push(<PlayerRanking
                key={'leaderboard-' + displayname}
                rank={rank}
                flagCode={flagCode}
                rating={player.rating}
                displayname={displayname}
                isLocalPlayer={isLocalPlayer}
                portrait={player.portrait}
                ratingTextFormatted={ratingTextFormatted}
                rankNumber={rankNumber} />)
        }
        return elems;
    }

    let playerRank = -1;
    for (var player of leaderboard) {
        let isLocalPlayer = user?.displayname == player.displayname;
        if (isLocalPlayer) {
            playerRank = player.rank;
            break;
        }
    }

    let lbCount = leaderboardCount || 0;
    if (lbCount == 0) {
        return (
            <Box>
                <Text mt='1rem' fontWeight={'bold'}>No rankings yet.</Text>
            </Box>
        )
    }
    return (
        <Box w="100%" maxW={["100%", "100%", "100%", "95%", "70%", "60%"]} pt="0" py="3rem" px="3rem">

            <VStack w="100%" spacing="1rem" alignItems={'flex-start'}>
                <VStack
                    w="100%"
                    alignItems={'center'}
                    // pb="3rem"
                    _after={{
                        content: '""',
                        display: 'block',
                        clipPath: 'polygon(0% 0%, 100% 0%, 93.846% 100%, 6.154% 100%, 0% 0%)',
                        width: '65px',
                        height: '5px',
                        margin: '0.5rem 0 0',
                        background: 'brand.300',
                    }
                    }>
                    <Text as="span" color="brand.300" letterSpacing={'2px'} fontWeight={'bold'} fontSize={['1.2rem', '1.2rem', "1.4rem"]}>TOP 10</Text>
                    <Heading as="h2" color="gray.0" fontSize={['2.4rem', '2.4rem', "4rem"]} fontWeight={'600'}>Leaderboard</Heading>
                </VStack>


                {/* <Table tableLayout="fixed" variant='none' mb={playerRank == -1 ? '1rem' : '0'} width="100%"
                    style={{ borderCollapse: "separate", borderSpacing: "0 1rem", borderColor: 'gray.900', tableLayout: 'fixed' }}
                > */}
                {/* <Thead >
                        <Tr
                            //borderBottomColor="gray.600"
                            p="0"
                            color="gray.100"
                            fontSize=""
                        > */}
                <HStack w="100%" spacing="1rem">
                    <Text minW="4rem" as="span" p="0" color={'gray.100'} fontSize="xs" textAlign={'right'}>Rank</Text>
                    <Text as="span" minW="0" flex="1" p="0" color={'gray.100'} fontSize="xs" w={["70%", "70%", "60%", "60%"]} pl="7rem">Player</Text>
                    <Text justifySelf="flex-end" as="span" p="0" color={'gray.100'} fontSize="xs" textAlign='right' pr={["3rem", "3rem", "4.5rem"]}>ELO</Text>
                </HStack>
                {/* </Tr>
                    </Thead> */}
                {/* <Tbody  > */}
                {renderRankings()}
                {/* </Tbody> */}
                {/* </Table> */}
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
                        {/* in
                        <Text as="span" > Rankings</Text> */}
                    </Text>
                </Box>

                <Box w="100%" display={playerRank != -1 ? 'none' : 'block'} pt="1rem" >
                    <Text fontSize="2rem" align='center' display={lbCount > 0 ? 'block' : 'none'} color="gray.10">
                        No Ranking

                    </Text>
                </Box>

            </VStack>
        </Box >

    )
}

function PlayerRanking({ displayname, rank, flagCode, isLocalPlayer, portrait, ratingTextFormatted, rankNumber, rating }) {
    return (
        <HStack
            position="relative"

            width="100%"
            minW="100%"
            spacing="1rem"
            bgColor="transparent"
            // zIndex='1'
            _before={{
                position: "absolute",
                content: "''",
                width: '100%',
                height: '100%',
                // zIndex: '0',
                top: '0',
                left: '0',
                _hover: {
                    bgColor: 'gray.950'
                },
                // clipPath="polygon(2% 0, 100% 0, 98% 100%, 0 100%)"
                bgColor: (isLocalPlayer ? 'brand.500' : "gray.875"),
                borderRadius: "12px",
                transform: 'skew(-20deg)'
            }}

        >
            <Center
                minW={["5rem", "5rem", "6rem", "6rem"]}
                w={["5rem", "5rem", "6rem", "6rem"]}
                textAlign='center'
                p="0"
                pl="1.5rem"
            >
                <Text as="span" textAlign={'center'} color="gray.0" fontSize={['1.4rem', '1.4rem', "1.6rem", "1.6rem", "1.8rem"]} position="relative">
                    {/* <Text as="span" position="absolute" top='-0rem' left="-1.1rem" fontSize="1.2rem" fontWeight='light' color="gray.100">#</Text> */}
                    {rank}
                </Text>
            </Center>
            <Box p="0" flex="1" minW="0">
                <HStack >
                    <ChakraLink w={["4rem", "4rem", "6rem", "6rem"]}

                        minW={["4rem", "4rem", "6rem", "6rem"]} whiteSpace={'nowrap'} to={'/profile/' + displayname} display="block" position="relative" >
                        <Image
                            src={`${config.https.cdn}images/portraits/${portrait.replace(".", "-thumbnail.")}`}
                            loading="lazy"
                            // w={["4.2rem", "4.2rem", "4.2rem"]}
                            w={["4rem", "4rem", "6rem", "6rem"]}
                            minW={["4rem", "4rem", "6rem", "6rem"]}
                            // pr="0.5rem"
                            borderRadius={'5px'}
                        // filter={['', '', "drop-shadow(0 0 1px var(--chakra-colors-brand-600))"]}

                        />
                    </ChakraLink>

                    <ChakraLink
                        zIndex={'1'}
                        // flex="1"
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
                        {/* <Text
                            minWidth="0"
                            whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}
                            display="block"
                            as="span"
                            fontSize={["1.4rem", "1.4rem", "1.6rem"]}
                            lineHeight={["3.2rem", "3.2rem", "3.2rem"]}
                            fontWeight={'500'}
                            color={isLocalPlayer ? "yellow.100" : 'gray.10'}>
                            {displayname}asdfasdfasdfasdfasdfasdfsd
                        </Text> */}
                    </ChakraLink>
                    <ChakraLink
                        zIndex={'1'}
                        w="2.5rem"
                        minW="2.5rem"
                        // whiteSpace={'nowrap'}
                        to={'/profile/' + displayname}
                        display="block"
                        position="relative" >
                        <Image
                            display="inline-block"
                            src={flagCode || USAFlag}
                            verticalAlign={"middle"}
                            borderRadius="5px"
                            w="2rem"
                            minW="2rem"
                        />
                    </ChakraLink>
                </HStack>
            </Box>

            <HStack justifyContent={'flex-end'} h="100%" px="1rem">
                <HStack justifyContent={'flex-end'} display={['none', 'none', 'flex']} spacing="0">


                    <Text position="relative"
                        top="0rem"
                        as="span"
                        display={['none', 'none', 'none', 'inline-block']}
                        // display="inline-block"
                        color={(isLocalPlayer ? 'gray.0' : "gray.50")}//"gray.50"
                        fontWeight={'light'}
                        fontSize="xs"
                        pr="1rem">
                        {ratingTextFormatted}
                    </Text>
                    <Image
                        src={`${config.https.cdn}icons/ranks/platform/${rankNumber}.webp`}
                        loading="lazy"
                        title={ratingTextFormatted}
                        height={["5rem"]}
                        minW='5rem'
                        position="relative"
                    />
                </HStack>
                <Text
                    zIndex={'1'}
                    as="span"
                    display="inline-block"
                    width={["4.5rem", "4.5rem", "6rem"]}
                    fontSize={['1.6rem', '1.6rem', "1.8rem"]}
                    fontWeight={'500'}
                    color={(isLocalPlayer ? 'gray.0' : "gray.0")}
                // color={'gray.50'}
                >
                    {rating}

                </Text>
            </HStack>
        </HStack >
    )
}

// export default fs.connect(['leaderboard', 'leaderboardCount'])(GameInfoTop10);
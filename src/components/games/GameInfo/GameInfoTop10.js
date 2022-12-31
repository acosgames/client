import { Box, IconButton, VStack, Text, Icon, HStack, Grid, GridItem, Tr, Table, Th, Thead, Tbody, Td, Image } from '@chakra-ui/react';
import fs from 'flatstore';
import { Link } from 'react-router-dom';

import { GiLaurelsTrophy, } from '@react-icons';

import config from '../../../config'
import ratingtext from 'shared/util/ratingtext';

function GameInfoTop10(props) {

    if (!props.leaderboard) {
        return <Box>
            <Text as="h4">No rankings found.</Text>
        </Box>
    }

    let user = fs.get('user');
    let player_stats = fs.get('player_stats');
    let game = fs.get('game');

    let playerGameStats = player_stats[game.game_slug];

    const renderRankings = (players) => {



        let leaderboard = props.leaderboard || [];
        let elems = [];

        let tag = props.tag || 'default'

        for (var player of leaderboard) {
            let isLocalPlayer = user?.displayname == player.value;
            let isPast5Rank = player.rank == 10 && (playerGameStats && playerGameStats.ranking > 10);

            let displayname = player.value;
            if (displayname.length > 16) {
                displayname = displayname.substr(0, 16) + '...';
            }

            let ratingTxt = ratingtext.ratingToRank(Number.parseInt(player.score));
            let ratingTextFormatted = ratingTxt.toUpperCase();
            let ratingImageFile = ratingTxt.replace(/ /ig, '');

            elems.push(
                <Tr key={tag + '-leaderboard-' + player.value} lineHeight="4rem" height="4rem" borderColor="gray.100" >
                    <Td isNumeric borderBottom={isPast5Rank ? '2px solid' : undefined}
                        borderBottomColor={isPast5Rank ? 'gray.300' : 'gray.600'}
                    // bgColor="gray.600"
                    >
                        <HStack width="auto" justifyContent={'flex-end'} spacing="1rem">
                            {player.rank == 1 && (<Icon as={GiLaurelsTrophy} color='gold' />)}
                            {player.rank == 2 && (<Icon as={GiLaurelsTrophy} color='silver' />)}
                            {player.rank == 3 && (<Icon as={GiLaurelsTrophy} color='#A78553' />)}
                            <Text
                                fontSize="xs"
                                fontWeight={isLocalPlayer ? 'bold' : 'bold'}
                                color={isLocalPlayer ? "yellow.100" : 'white'}>


                                {player.rank}
                            </Text>
                        </HStack>
                    </Td>
                    <Td borderBottom={isPast5Rank ? '2px solid' : undefined}
                        borderBottomColor={isPast5Rank ? 'gray.300' : 'gray.600'}
                    // bgColor="gray.400"
                    >

                        <Link to={'/profile/' + player.value}>
                            <Text
                                fontSize="xs"
                                fontWeight={'bold'}
                                wordBreak="break-all"
                                color={isLocalPlayer ? "yellow.100" : 'white'}>
                                {displayname}
                            </Text>
                        </Link>

                    </Td>
                    <Td
                        borderBottom={isPast5Rank ? '2px solid' : undefined}
                        borderBottomColor={isPast5Rank ? 'gray.300' : 'gray.600'}
                    // bgColor="gray.100"
                    >
                        <HStack>
                            <Image
                                src={`${config.https.cdn}icons/ranks/${ratingImageFile}.png`}
                                width={'auto'}
                                height={["2.4rem"]}
                            />
                            <Text
                                fontSize="xs"
                                fontWeight={isLocalPlayer ? 'bold' : 'normal'}
                                color={isLocalPlayer ? "yellow.100" : 'white'}>
                                {player.score}
                            </Text>
                        </HStack>
                    </Td>
                </Tr>
            )
        }
        return elems;
    }

    let playerRank = -1;
    for (var player of props.leaderboard) {
        let isLocalPlayer = user?.displayname == player.value;
        if (isLocalPlayer) {
            playerRank = player.rank;
            break;
        }
    }

    let lbCount = props.leaderboardCount || 0;
    if (lbCount == 0) {
        return (
            <Box>
                <Text mt='1rem' fontWeight={'bold'}>No rankings yet.</Text>
            </Box>
        )
    }
    return (
        <Box w="100%" pt="0" pb="1rem">

            <VStack w="100%">

                <Table variant='none' mb={playerRank == -1 ? '1rem' : '0'} width="100%"
                    style={{ borderCollapse: "separate", borderSpacing: "0 0.25rem" }}
                >
                    <Thead >
                        <Tr
                        //borderBottomColor="gray.600"
                        >
                            <Th color={'gray.100'} width="5rem" lineHeight="1rem" height="1rem">
                                <HStack width="100%" justifyContent={'flex-end'} spacing="1rem"><Text fontSize="2xs">Rank</Text></HStack>
                            </Th>
                            <Th color={'gray.100'} width="20rem" lineHeight="1rem" height="1rem" fontSize="2xs">Player</Th>
                            <Th color={'gray.100'} width="10rem" lineHeight="1rem" height="1rem" fontSize="2xs">Rating</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {renderRankings()}
                    </Tbody>
                </Table>
                <Box w="100%" display={playerRank == -1 ? 'none' : 'block'} lineHeight="3rem" height="3rem" pt="1rem" fontSize="sm" color="gray.200" fontWeight='300'>
                    <Text align='center' display={lbCount > 0 ? 'block' : 'none'}>Rank <Text as="span" fontWeight='bold' color="gray.200">{playerRank || -1}</Text> of {lbCount}
                        {/* in
                        <Text as="span" > Rankings</Text> */}
                    </Text>
                </Box>

            </VStack>
        </Box >

    )
}

export default fs.connect(['leaderboard', 'leaderboardCount'])(GameInfoTop10);
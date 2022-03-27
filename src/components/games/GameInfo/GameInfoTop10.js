import { Box, IconButton, VStack, Text, HStack, Grid, GridItem, Tr, Table, Th, Thead, Tbody, Td } from '@chakra-ui/react';
import fs from 'flatstore';
import { Link } from 'react-router-dom';


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
            elems.push(
                <Tr key={tag + '-leaderboard-' + player.value}>
                    <Td isNumeric borderBottom={isPast5Rank ? '2px solid' : undefined}
                        borderBottomColor={isPast5Rank ? 'gray.300' : undefined}>
                        <Text
                            fontWeight={isLocalPlayer ? 'bold' : 'normal'}
                            color={isLocalPlayer ? "yellow.100" : 'white'}>
                            {player.rank}
                        </Text>
                    </Td>
                    <Td borderBottom={isPast5Rank ? '2px solid' : undefined}
                        borderBottomColor={isPast5Rank ? 'gray.300' : undefined}>
                        <Link to={'/profile/' + player.value}>
                            <Text
                                fontWeight={isLocalPlayer ? 'bold' : 'normal'}
                                color={isLocalPlayer ? "yellow.100" : 'white'}>
                                {player.value}
                            </Text>
                        </Link>
                    </Td>
                    <Td
                        borderBottom={isPast5Rank ? '2px solid' : undefined}
                        borderBottomColor={isPast5Rank ? 'gray.300' : undefined}>
                        <Text
                            fontWeight={isLocalPlayer ? 'bold' : 'normal'}
                            color={isLocalPlayer ? "yellow.100" : 'white'}>
                            {player.score}
                        </Text>
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
        <Box w="100%">
            <VStack w="100%">
                <Table variant='simple' size="sm" mb={playerRank == -1 ? '1rem' : '0'}>
                    <Thead>
                        <Tr>
                            <Th isNumeric>Rank</Th>
                            <Th >Name</Th>
                            <Th >Rating</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {renderRankings()}
                    </Tbody>
                </Table>
                <Box w="100%" display={playerRank == -1 ? 'none' : 'block'}>
                    <Text color="gray.500" align='center' display={lbCount > 0 ? 'block' : 'none'}>Rank <Text as="span" fontWeight='bold' color="gray.500">{playerRank || -1}</Text> of {lbCount} on
                        <Text as="span" > /g/{game.game_slug}</Text></Text>
                </Box>

            </VStack>
        </Box>

    )
}

export default fs.connect(['leaderboard', 'leaderboardCount'])(GameInfoTop10);
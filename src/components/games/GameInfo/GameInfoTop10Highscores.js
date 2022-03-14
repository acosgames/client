import { Box, IconButton, VStack, Text, HStack, Grid, GridItem, Tr, Table, Th, Thead, Tbody, Td } from '@chakra-ui/react';
import fs from 'flatstore';
import { Link } from 'react-router-dom';


function GameInfoTop10Highscores(props) {

    if (!props.leaderboardHighscore) {
        return <Box>
            <Text as="h4">No highscores yet.</Text>
        </Box>
    }

    let user = fs.get('user');
    let player_stats = fs.get('player_stats');
    let game = fs.get('game');

    let playerGameStats = player_stats[game.game_slug];

    const renderHighscores = (players) => {

        let leaderboard = props.leaderboardHighscore || [];
        let elems = [];

        let tag = props.tag || 'default'

        for (var player of leaderboard) {
            let isLocalPlayer = user?.displayname == player.value;
            let isPast5Rank = player.rank == 10 && (playerGameStats && playerGameStats.ranking > 10);
            elems.push(
                <Tr key={tag + '-leaderboard-hs-' + player.value}>
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

    let lbCount = props.leaderboardHighscoreCount || 0;
    if (lbCount == 0) {
        return (
            <Box>
                <Text mt='1rem' fontWeight={'bold'}>No highscores yet.</Text>
            </Box>
        )
    }
    return (
        <Box w="100%">
            <VStack w="100%">
                <Table variant='simple' size="sm" >
                    <Thead>
                        <Tr>
                            <Th isNumeric>Rank</Th>
                            <Th >Name</Th>
                            <Th >Highscore</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {renderHighscores()}
                    </Tbody>
                </Table>
                <Box w="100%">
                    <Text color="gray.500" align='center' display={lbCount > 0 ? 'block' : 'none'}>Rank <Text as="span" fontWeight='bold' color="gray.500">{playerGameStats?.ranking || -1}</Text> of {lbCount} on
                        <Text as="span" > /g/{game.game_slug}</Text></Text>
                </Box>

            </VStack>
        </Box>

    )
}

export default fs.connect(['leaderboardHighscore', 'leaderboardHighscoreCount'])(GameInfoTop10Highscores);
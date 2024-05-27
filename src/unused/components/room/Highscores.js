import { Box, IconButton, VStack, Icon, Text, HStack, Grid, GridItem, Tr, Table, Th, Thead, Tbody, Td } from '@chakra-ui/react';
import fs from 'flatstore';
import { Link } from 'react-router-dom';

import { GiLaurelsTrophy, } from '@react-icons';
function Highscores(props) {

    let [leaderboardHighscore] = fs.useWatch('leaderboardHighscore');
    let [leaderboardHighscoreCount] = fs.useWatch('leaderboardHighscoreCount');
    let [room] = fs.useWatch('primary/room');

    if (!room?.lbscore)
        return <></>

    if (!leaderboardHighscore) {
        return <HStack justifyContent={'center'} alignItems='center' w="100%">
            <Text as="span" mt='1rem' fontWeight={'bold'}>No highscores yet.</Text>
        </HStack>
    }


    let user = fs.get('user');
    let player_stats = fs.get('player_stats');
    let game = fs.get('game');

    let playerGameStats = player_stats[game.game_slug];

    const renderHighscores = (players) => {

        let leaderboard = leaderboardHighscore || [];
        let elems = [];

        let tag = props.tag || 'default'

        for (var player of leaderboard) {
            let isLocalPlayer = user?.displayname == player.value;
            let isPast5Rank = player.rank == 10 && (playerGameStats && playerGameStats.ranking > 10);
            elems.push(
                <Tr key={tag + '-leaderboard-hs-' + player.value}>
                    <Td isNumeric p="0" border="0" px="1rem" w="3rem">
                        <HStack px="1rem" width="auto" justifyContent={'flex-end'} spacing="1rem">
                            {player.rank == 1 && (<Icon as={GiLaurelsTrophy} color='gold' />)}
                            {player.rank == 2 && (<Icon as={GiLaurelsTrophy} color='silver' />)}
                            {player.rank == 3 && (<Icon as={GiLaurelsTrophy} color='#A78553' />)}
                            <Text
                                fontSize="2xs"
                                fontWeight={isLocalPlayer ? 'bold' : 'normal'}
                                color={isLocalPlayer ? "yellow.100" : 'white'}>

                                {player.rank}
                            </Text>
                        </HStack>
                    </Td>
                    <Td p="0" border="0">
                        <Link to={'/profile/' + player.value}>
                            <Text
                                fontSize="2xs"
                                fontWeight={isLocalPlayer ? 'bold' : 'normal'}
                                color={isLocalPlayer ? "yellow.100" : 'white'}>
                                {player.value}

                            </Text>
                        </Link>
                    </Td>
                    <Td
                        p="0" border="0">
                        <Text
                            fontSize="2xs"
                            fontWeight={isLocalPlayer ? 'bold' : 'normal'}
                            color={isLocalPlayer ? "yellow.100" : 'white'} width="auto" display="inline-block" >
                            {player.score}
                        </Text>
                    </Td>
                </Tr>
            )
        }
        return elems;
    }

    let playerRank = -1;
    for (var player of leaderboardHighscore) {
        let isLocalPlayer = user?.displayname == player.value;
        if (isLocalPlayer) {
            playerRank = player.rank;
            break;
        }
    }

    let lbCount = leaderboardHighscoreCount || 0;
    if (lbCount == 0) {
        return (
            <HStack justifyContent={'center'} alignItems='center' w="100%">
                <Text as="span" mt='1rem' fontWeight={'bold'}>No highscores yet.</Text>
            </HStack>
        )
    }
    return (
        <Box w="100%" p="1rem"  >
            <Box w="100%" p="1rem" bgColor="gray.1200" borderRadius={"2rem"}>

                <VStack w="100%">
                    <Text as="h4" fontWeight={'bold'} color="gray.100">Top scores</Text>
                    <Table variant='simple' mb={playerRank == -1 ? '1rem' : '0'} width="100%">
                        {/* <Thead>
                        <Tr>
                            <Th color={'gray.100'} fontSize="sm" width="10rem" lineHeight="3rem" height="3rem" isNumeric>Rank</Th>
                            <Th color={'gray.100'} fontSize="sm" width="20rem" lineHeight="3rem" height="3rem" >Player</Th>
                            <Th color={'gray.100'} fontSize="sm" width="10rem" lineHeight="3rem" height="3rem">Highscore</Th>
                        </Tr>
                    </Thead> */}
                        <Tbody>
                            {renderHighscores()}
                        </Tbody>
                    </Table>


                    <Box w="100%" display={playerRank == -1 ? 'none' : 'block'} lineHeight="3rem" height="3rem" pt="1rem" fontSize="xs" color="gray.100" fontWeight={'300'}>
                        <Text align='center' display={lbCount > 0 ? 'block' : 'none'}>Rank <Text as="span" fontWeight='bold' color="gray.100">{playerRank || -1}</Text> of {lbCount}
                            {/* in
                        <Text as="span" > Highscore</Text>  */}
                        </Text>
                    </Box>


                </VStack>
            </Box>
        </Box>
    )
}

export default Highscores;
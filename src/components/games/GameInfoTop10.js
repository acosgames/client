import { Box, IconButton, VStack, Text, HStack, Grid, GridItem, Tr, Table, Th, Thead, Tbody, Td } from '@chakra-ui/react';
import fs from 'flatstore';


function GameInfoTop10(props) {

    if (!props.top10) {
        return <Box>
            <Text as="h4">No rankings found.</Text>
        </Box>
    }

    const renderRankings = (players) => {

        let user = fs.get('user');

        let top10 = props.top10 || [];
        let leaderboard = props.leaderboard || [];
        let elems = [];

        let combined = top10.concat(leaderboard);
        let rankmap = {};
        for (var i = 0; i < combined.length; i++) {
            let ranking = combined[i];
            rankmap[ranking.value] = ranking;
        }

        let fixed = [];
        for (var key in rankmap) {
            fixed.push(rankmap[key]);
        }

        fixed.sort((a, b) => a.rank - b.rank);

        for (var player of fixed) {
            let isLocalPlayer = user.displayname == player.value;
            elems.push(
                <Tr key={'leaderboard-' + player.value}>
                    <Td isNumeric>
                        <Text
                            fontWeight={isLocalPlayer ? 'bold' : 'normal'}
                            color={isLocalPlayer ? "yellow.100" : 'white'}>
                            {player.rank}
                        </Text>
                    </Td>
                    <Td >
                        <Text
                            fontWeight={isLocalPlayer ? 'bold' : 'normal'}
                            color={isLocalPlayer ? "yellow.100" : 'white'}>
                            {player.value}
                        </Text>
                    </Td>
                    <Td isNumeric>
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

    let lbCount = props.leaderboardCount || 0;
    return (
        <Box>
            <VStack>
                <Table variant='simple' size="sm">
                    <Thead>
                        <Tr>
                            <Th isNumeric>Rank</Th>
                            <Th >Name</Th>
                            <Th isNumeric>Rating</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {renderRankings()}
                    </Tbody>
                </Table>
                <Text>Total of {lbCount} players this season</Text>
            </VStack>
        </Box>

    )
}

export default fs.connect(['top10', 'leaderboard', 'leaderboardCount'])(GameInfoTop10);
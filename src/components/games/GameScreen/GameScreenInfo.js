import { Box, IconButton, VStack, Text, HStack, Grid, GridItem, Tr, Table, Th, Thead, Tbody, Td } from '@chakra-ui/react';
import fs from 'flatstore';


function GameScreenInfo(props) {

    const renderPlayers = (players) => {
        if (!players)
            return <></>

        let elems = [];
        let playerList = [];
        for (var id in players) {
            let player = players[id];
            playerList.push(player);
        }

        playerList.sort((a, b) => {
            if (a.rank == b.rank)
                return b.score - a.score;
            return (a.rank - b.rank)
        });
        for (var player of playerList) {
            elems.push(
                <Tr key={'players-' + player.name}>
                    <Td >
                        <Text
                            whiteSpace={'nowrap'}
                            textOverflow={'ellipsis'}
                            width={'100px'}
                            height={'1rem'}
                            lineHeight={'1rem'}
                            display={'block'}
                            overflow={'hidden'}

                            overflow={'hidden'}>
                            {player.name}
                        </Text>
                    </Td>
                    <Td isNumeric><Text>{player.rank}</Text></Td>
                    <Td isNumeric><Text>{player.score}</Text></Td>
                </Tr>
            )
        }
        return elems;
    }

    return (
        <Box>
            <VStack>
                <Text color={"gray.300"} as={'h4'} size={'md'} fontWeight={'bold'}>Game Players</Text>
                <Table variant='simple' size="sm">
                    <Thead>
                        <Tr>
                            <Th>Player</Th>
                            <Th isNumeric>Place</Th>
                            <Th isNumeric>Score</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {renderPlayers(props.gamestate?.players)}
                    </Tbody>
                </Table>

            </VStack>
        </Box>
    )
}


export default fs.connect(['gamestate'])(GameScreenInfo);
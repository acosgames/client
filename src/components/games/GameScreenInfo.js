import { Box, IconButton, VStack, Text, HStack, Grid, GridItem, Tr, Table, Th, Thead, Tbody, Td } from '@chakra-ui/react';
import fs from 'flatstore';


function GameScreenInfo(props) {

    const renderPlayers = (players) => {
        if (!players)
            return <></>

        let elems = [];

        for (var id in players) {
            let player = players[id];
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
                <Text as={'h4'} size={'md'}>In-Game Players</Text>
                <Table variant='simple' size="sm">
                    <Thead>
                        <Tr>
                            <Th>Player</Th>
                            <Th isNumeric>Rank</Th>
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
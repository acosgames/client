import { Box, IconButton, VStack, Text, HStack, Grid, GridItem, Tr, Table, Th, Thead, Tbody, Td, Center, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import fs from 'flatstore';
import { withRouter } from 'react-router-dom';
import GameInfoTop10 from '../GameInfo/GameInfoTop10';
import GameInfoTop10Highscores from '../GameInfo/GameInfoTop10Highscores';
import GameScreenActions from './GameScreenActions';


function GameScreenInfo(props) {


    const room_slug = props.room_slug;

    if (!room_slug) {
        return <></>
    }
    let room = props.room;
    let game = props.game;
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

        <VStack filter={'opacity(1)'}
            transition="filter 0.3s ease-in"
            // px={['1rem', '2rem', "5rem"]}
            className="gameScreenInfo"
            pb="2rem"
            mt="1rem"
            width="100%"
        //, '100%', '100%', '80%', '1000px']}
        >
            <Box bgColor={''} w="100%" >
                <GameScreenActions room={room} game={game} />
                {/* <Center>
                    <Heading py="1rem" fontWeight={'bold'} textAlign="center" size="lg">{game?.name || 'Game Info'}</Heading>
                </Center> */}
                {/* <Wrap justify={'center'} spacing="3rem">

                    <WrapItem display={game.maxplayers == 1 ? 'none' : 'flex'}>
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
                    </WrapItem>
                    <WrapItem display={game.maxplayers == 1 ? 'none' : 'flex'}>
                        <VStack justifyContent={'center'} >
                            <Text as={'h4'} color="gray.300" size={'md'} fontWeight={'bold'}>Rank Leaderboard</Text>
                            <GameInfoTop10 tag={'gamescreen'} />
                        </VStack>
                    </WrapItem>
                    <WrapItem display={(game.lbscore || game.maxplayers == 1) ? 'flex' : 'none'}>
                        <VStack justifyContent={'center'} >
                            <Text as={'h4'} color="gray.300" size={'md'} fontWeight={'bold'}>Highscore Leaderboard</Text>
                            <GameInfoTop10Highscores tag={'gamescreen-hs'} />
                        </VStack>
                    </WrapItem>

                </Wrap> */}
            </Box>


        </VStack>


    )
}



// let onCustomWatched = ownProps => {
//     return ['rooms', 'games', 'gamestate'];
// };
// let onCustomProps = (key, value, store, ownProps) => {
//     let room_slug = ownProps.match.params.room_slug;
//     let game_slug = ownProps.match.params.game_slug;
//     if (key == 'rooms' && room_slug in value) {
//         return {
//             'room': value[room_slug]
//         };
//     }

//     if (key == 'games' && game_slug in value) {
//         return {
//             'game': value[game_slug]
//         };
//     }

//     if (key == 'gamestate') {
//         return {
//             'gamestate': value
//         }
//     }

//     return {};
// };
export default fs.connect(['gamestate', 'room_slug'])(GameScreenInfo);

// export default fs.connect([])(GameScreenInfo);
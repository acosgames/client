
import { Box, VStack, Text, IconButton, HStack, Spacer, Wrap, WrapItem, Portal, Fade, Heading, Center } from '@chakra-ui/react';
import fs from 'flatstore';
import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { findAndRejoin } from '../../actions/game';
import Connection from './Connection';
import GameScreenIframe from './GameScreenIframe';
import GameScreenActions from './GameScreenActions';
import GameScreenInfo from './GameScreenInfo';
import LeaveGame from './LeaveGame';
import GameInfoTop10 from './GameInfoTop10';
import FSGGroup from '../widgets/inputs/FSGGroup';
import GameScreenStarting from './GameScreenStarting';
import { refreshGameState, wsRejoinRoom } from '../../actions/connection';

function GameScreen2(props) {

    const game_slug = props.match.params.game_slug;
    const mode = props.match.params.mode;
    const room_slug = props.match.params.room_slug;

    const gamescreenRef = useRef();
    const [game, setGame] = useState(null);
    const [isDarken, setIsDarken] = useState(false);
    useEffect(() => {
        let games = fs.get('games') || [];

        //for (var i = 0; i < games.length; i++) {
        // for (var key in games) {
        //     if (games[key].game_slug == game_slug) {
        //         setGame(games[key]);
        //         break;
        //     }
        // }


        setTimeout(() => {
            setIsDarken(true);
        }, 500)


        if (room_slug) {
            wsRejoinRoom(game_slug, room_slug);
        }


        fs.set('iframes', null);
        fs.set('gamepanel', null);
        fs.set('gamewrapper', null);


    }, [])

    useEffect(() => {
        fs.set('fullScreenElem', gamescreenRef);
    })

    useEffect(async () => {
        gtag('event', 'gamescreen', { game_slug });
    }, [])


    return (
        <Portal>
            <Box
                position="fixed"
                top="0"
                left="0"
                w="100%"
                h="100%"
                ref={gamescreenRef}
                bgColor={!isDarken ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.8)'}
                transition={'background-color 0.3s ease-in'}
            ></Box>
            <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                ref={gamescreenRef}
            >

                <GameScreenIframe room={props.room} />
                <VStack px={['1rem', '2rem', "5rem"]} pb="2rem" mt="1rem"
                >
                    <Box bgColor={'gray.800'} w="100%" >
                        <GameScreenActions room={props.room} game={props.game} />
                        <Center>
                            <Heading py="1rem" fontWeight={'bold'} textAlign="center" size="lg">{props.game?.name || 'Game Info'}</Heading>
                        </Center>
                        <Wrap justify={'center'} spacing="3rem">

                            <WrapItem >
                                <GameScreenInfo />
                            </WrapItem>
                            <WrapItem>
                                <VStack justifyContent={'center'}>
                                    <Text as={'h4'} color="gray.300" size={'md'} fontWeight={'bold'}>Global Leaderboard</Text>
                                    <GameInfoTop10 tag={'gamescreen'} />
                                </VStack>
                            </WrapItem>

                        </Wrap>
                    </Box>


                </VStack>


                <Connection></Connection>

                <GameScreenStarting />
            </Box >
        </Portal >
    )


}

let onCustomWatched = ownProps => {
    let room_slug = ownProps.match.params.room_slug;
    let game_slug = ownProps.match.params.game_slug;
    return ['rooms>' + room_slug, 'games>' + game_slug];
};
let onCustomProps = (key, value, store, ownProps) => {
    let room_slug = ownProps.match.params.room_slug;
    let game_slug = ownProps.match.params.game_slug;
    if (key == 'rooms>' + room_slug)
        key = 'room';

    if (key == 'games>' + game_slug)
        key = 'game';

    if (!value)
        return {};

    return {
        [key]: value
    };
};
export default withRouter(fs.connect([], onCustomWatched, onCustomProps)(GameScreen2));
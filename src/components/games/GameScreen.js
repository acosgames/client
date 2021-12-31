
import { Box, VStack, Text, IconButton, HStack, Spacer, Wrap, WrapItem } from '@chakra-ui/react';
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

function GameScreen(props) {

    const game_slug = props.match.params.game_slug;
    const mode = props.match.params.mode;
    const room_slug = props.match.params.room_slug;

    const gamescreenRef = useRef();
    const [game, setGame] = useState(null);

    useEffect(() => {
        let games = fs.get('games') || [];
        if (Object.keys(games).length == 0) {
            findAndRejoin(game_slug, room_slug);
        }
        else {
            for (var i = 0; i < games.length; i++) {
                if (games[i].game_slug == game_slug) {
                    setGame(games[i]);
                    break;
                }
            }
        }

        fs.set('iframes', null);
        fs.set('gamepanel', null);
        fs.set('gamewrapper', null);
    }, [])

    useEffect(() => {
        fs.set('fullScreenElem', gamescreenRef);
    })


    return (
        <Box w="100%" h="100%" position="relative" ref={gamescreenRef}>

            <GameScreenIframe {...props.room} />
            <VStack px="2rem" pb="2rem">
                <FSGGroup title={props.game?.name || 'Game Info'}>
                    <GameScreenActions room={props.room} game={props.game} />

                    <Wrap justify={'center'} spacing="3rem">

                        <WrapItem >
                            <GameScreenInfo />
                        </WrapItem>
                        <WrapItem>
                            <VStack justifyContent={'center'}>
                                <Text as={'h4'} size={'md'} fontWeight={'bold'}>Global Leaderboard</Text>
                                <GameInfoTop10 />
                            </VStack>
                        </WrapItem>

                    </Wrap>
                </FSGGroup>


            </VStack>


            <Connection></Connection>

            <GameScreenStarting />
        </Box>
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
export default withRouter(fs.connect([], onCustomWatched, onCustomProps)(GameScreen));
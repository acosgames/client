
import { Box, VStack, Text, IconButton, HStack, Spacer, Wrap } from '@chakra-ui/react';
import fs from 'flatstore';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { findAndRejoin } from '../../actions/game';
import Connection from './Connection';
import GameScreenIframe from './GameScreenIframe';
import GameScreenActions from './GameScreenActions';
import GameScreenInfo from './GameScreenInfo';
import LeaveGame from './LeaveGame';
import { BsArrowsFullscreen } from '@react-icons';
import GameInfoTop10 from './GameInfoTop10';

function GameScreen(props) {

    const game_slug = props.match.params.game_slug;
    const mode = props.match.params.mode;
    const room_slug = props.match.params.room_slug;


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




    return (
        <Box w="100%" h="100%" position="relative">

            <GameScreenIframe {...props.room} />
            <VStack>
                <GameScreenActions room={props.room} game={props.game} />
                <Wrap alignItems={'flex-start'} justifyContent={'center'}>
                    <Box>
                        <VStack>
                            <Text as={'h4'} size={'md'}>Global Leaderboard</Text>
                            <GameInfoTop10 />
                        </VStack>
                    </Box>
                    <Box w="2rem"></Box>

                    <GameScreenInfo />



                </Wrap>
            </VStack>


            <Connection></Connection>


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
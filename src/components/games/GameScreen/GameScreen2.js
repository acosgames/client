
import { Box, VStack, Text, IconButton, HStack, Spacer, Wrap, WrapItem, Portal, Fade, Heading, Center } from '@chakra-ui/react';
import fs from 'flatstore';
import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { findAndRejoin } from '../../../actions/game';
import Connection from '../Connection';
import GameScreenIframeWrapper from './GameScreenIframe';
import GameScreenActions from './GameScreenActions';
import GameScreenInfo from './GameScreenInfo';
import LeaveGame from '../LeaveGame';
import GameInfoTop10 from '../GameInfo/GameInfoTop10';
import FSGGroup from '../../widgets/inputs/FSGGroup';
import GameScreenStarting from './GameScreenStarting';
import { refreshGameState, wsRejoinRoom } from '../../../actions/connection';
import GameInfoTop10Highscores from '../GameInfo/GameInfoTop10Highscores';
import GamePanel from '../GameDisplay/GamePanel';

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

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera



        setTimeout(() => {
            setIsDarken(true);

        }, 100)


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

    const [isLoaded, setIsLoaded] = useState(true);
    useEffect(async () => {
        gtag('event', 'gamescreen', { game_slug });
        // setIsLoaded(true);
    }, [])


    return (
        // <Portal>
        <Box position="absolute" left="0" top="0" className="gameScreen" width="100%" h={'100%'}>
            <Box
                position="sticky"
                top="0"
                left="0"
                w="100%"
                h="100%"
                zIndex={'1'}
                //ref={gamescreenRef}
                bgColor={!isDarken ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,1)'}
                transition={'background-color 0.3s ease-in'}
            ></Box>
            <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                zIndex={'2'}
                ref={gamescreenRef}
            >

                <GamePanel room_slug={room_slug} />



                <Connection></Connection>


            </Box >
        </Box >
        // </Portal >
    )


}

let onCustomWatched = ownProps => {
    let room_slug = ownProps.match.params.room_slug;
    let game_slug = ownProps.match.params.game_slug;
    return ['rooms', 'games'];
};
let onCustomProps = (key, value, store, ownProps) => {
    let room_slug = ownProps.match.params.room_slug;
    let game_slug = ownProps.match.params.game_slug;
    if (key == 'rooms' && room_slug in value) {
        return {
            'room': value[room_slug]
        };
    }

    if (key == 'games' && game_slug in value) {
        return {
            'game': value[game_slug]
        };
    }

    return {};
};
export default withRouter(fs.connect([], onCustomWatched, onCustomProps)(GameScreen2));
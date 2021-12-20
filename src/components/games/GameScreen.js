
import { Box } from '@chakra-ui/react';
import fs from 'flatstore';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { findAndRejoin } from '../../actions/game';
import GameScreenIframe from './GameScreenIframe';


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
    })




    return (
        <Box>
            <GameScreenIframe {...props.room} />
        </Box>
    )


}

let onCustomWatched = ownProps => {
    let room_slug = ownProps.match.params.room_slug;
    return ['rooms>' + room_slug];
};
let onCustomProps = (key, value, store, ownProps) => {
    let room_slug = ownProps.match.params.room_slug;
    if (key == 'rooms>' + room_slug)
        key = 'room';

    if (!value)
        return {};

    return {
        [key]: value
    };
};
export default withRouter(fs.connect([], onCustomWatched, onCustomProps)(GameScreen));

import fs from 'flatstore';
import { useEffect, useState } from 'react';


function GameScreen(props) {

    const game_slug = props.match.params.game_slug;
    const mode = props.match.params.mode;
    const room_slug = props.match.params.room_slug;


    const [game, setGame] = useState(null);

    useEffect(() => {
        let games = fs.get('games') || [];
        if (games.length == 0) {
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


    let iframesLoaded = fs.get('iframesLoaded');
    if (!iframesLoaded[room_slug]) {
        iframesLoaded[room_slug] = false;
        fs.set('iframesLoaded', iframesLoaded);
    }


    return (
        <></>
    )


}

let onCustomWatched = ownProps => {
    let room_slug = ownProps.match.params.room_slug;
    return ['rooms>' + room_slug, 'iframesLoaded>' + room_slug];
};
let onCustomProps = (key, value, store, ownProps) => {
    let room_slug = ownProps.match.params.room_slug;
    if (key == 'rooms>' + room_slug)
        key = 'room';
    else if (key == 'iframesLoaded>' + room_slug)
        key = 'loaded';
    if (!value)
        return {};

    return {
        [key]: value
    };
};
export default withRouter(fs.connect([], onCustomWatched, onCustomProps)(GameScreen));
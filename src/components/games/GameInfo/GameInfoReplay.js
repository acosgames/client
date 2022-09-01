import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { downloadGameReplay, findGameReplays } from "../../../actions/game";
import EmbeddedGamePanel from "../GameDisplay/EmbeddedGamePanel";
import fs from 'flatstore';


function GameInfoReplay(props) {

    let game_slug = props.game_slug;
    let [room_slug] = fs.useWatch('replay/' + game_slug);

    useEffect(() => {
        if (!game_slug)
            return;

        findGameReplays(game_slug);

    }, [])


    if (!room_slug) {
        return <></>
    }

    // let randomReplay = props.replays[Math.floor(Math.random() * props.replays.length)];

    // if (!replay) {
    //     return <></>
    // }

    return (
        <Box width="30rem" height="30rem" position="relative">
            <EmbeddedGamePanel room_slug={room_slug} />
        </Box>
    )
}



// let onCustomWatched = ownProps => {
//     return ['replays/' + ownProps.game_slug, 'replay/' + ownProps.game_slug];
// };
// let onCustomProps = (key, value, store, ownProps) => {
//     if (key == ('replays/' + ownProps.game_slug))
//         return { replays: value }
//     if (key == ('replay/' + ownProps.game_slug))
//         return { replay: value }
//     return {};
// };

export default GameInfoReplay;
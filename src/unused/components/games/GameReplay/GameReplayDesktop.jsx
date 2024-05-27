import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { findGamePanelByRoom, setPrimaryGamePanel } from "../../../actions/room";
import { downloadGameReplay } from "../../../actions/game";


export default function GameReplayDesktop(props) {

    const { game_slug, mode, version, filename } = useParams();


    useEffect(() => {
        if (typeof filename !== 'undefined') {
            let replay = {};
            replay.game_slug = game_slug;
            replay.mode = mode;
            replay.version = version;
            replay.filename = filename;

            setTimeout(async () => {
                // let gamepanel = findGamePanelByRoom('REPLAY/' + game_slug);
                // if (gamepanel) {
                //     return;
                // }
                let gamepanel = await downloadGameReplay(replay);
                setPrimaryGamePanel(gamepanel);
            }, 1);

        }
    }, [filename])

    return (
        <></>
    )

}

import {
    Link,
    withRouter,
} from "react-router-dom";

import fs from 'flatstore';
import { useEffect } from "react";

function GameListItem(props) {

    const game = props.game;



    const handleClick = () => {
        fs.set('game', game);
        props.history.push("/g/" + game.game_slug);
    }

    var imgUrl = 'https://f000.backblazeb2.com/file/fivesecondgames/placeholder.png';
    if (game.preview_images && game.preview_images.length > 0)
        imgUrl = `https://f000.backblazeb2.com/file/fivesecondgames/${game.gameid}/preview/${game.preview_images}`;

    let gameName = game.name;
    if (gameName.length > 20) {
        gameName = gameName.substr(0, 20) + '...';
    }

    return (
        <div className="game-item" key={game.game_slug} onClick={handleClick}>
            <img alt={gameName} src={imgUrl} />
            <div className="game-title"><span>{gameName}</span></div>
            <div className="game-attributes">
                <ul>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="24px" fill="#ccc"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z" /></svg>
                        <span>3.2k</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default withRouter(GameListItem);
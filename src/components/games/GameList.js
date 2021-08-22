import { Component } from "react";

import {
    Link,
    withRouter,
} from "react-router-dom";
import { Redirect } from 'react-router';

import '../styles/GameList.scss'
import { findGames } from '../../actions/game';
import fs from 'flatstore';

class GameList extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        findGames();
    }

    handleClick(game) {
        fs.set('game', game);
        this.props.history.push("/game/" + game.game_slug);
    }

    renderGame(game) {
        let beta;
        if (game.latest_version > game.version) {
            beta = <Link to={"/game/" + game.game_slug + "/beta"}>(Beta)</Link>
        }
        let imgUrl = 'https://f000.backblazeb2.com/file/fivesecondgames/placeholder.png';
        if (game.preview_images && game.preview_images.length > 0)
            imgUrl = `https://f000.backblazeb2.com/file/fivesecondgames/${game.gameid}/preview/${game.preview_images}`;
        return (
            <div className="game-item" key={game.game_slug} onClick={() => { this.handleClick(game) }}>
                <img src={imgUrl} width="300" />
                <div className="game-title"><span>{game.name}</span></div>

            </div>
        )
    }

    render() {
        let games = this.props.games || [];

        return (
            <div id="game-grid-wrapper">
                <h3>Find a game to play!</h3>
                <div id="game-grid">
                    {
                        games.map(game => (this.renderGame(game)))
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(fs.connect(['games'])(GameList));
import { Component } from "react";

import {
    Link,
    withRouter,
} from "react-router-dom";

import { findGames } from '../../actions/game';
import fs from 'flatstore';

class GameList extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        findGames();
    }

    renderGame(game) {
        let beta;
        if (game.latest_version > game.version) {
            beta = <Link to={"/game/" + game.game_slug + "/beta"}>(Beta)</Link>
        }
        return (
            <li key={game.game_slug}><Link to={"/game/" + game.game_slug}>{game.name}</Link> {beta}</li>
        )
    }

    render() {
        let games = this.props.games || [];

        return (
            <div id="gamelist">
                <h3>Find a game to play!</h3>

                {
                    games.map(game => (this.renderGame(game)))
                }
            </div>
        )
    }
}

export default withRouter(fs.connect(['games'])(GameList));
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

    render() {
        let games = this.props.games || [];

        return (
            <div id="gamelist">
                <h3>Find a game to play!</h3>

                {
                    games.map(game => (<li><Link to={"/game/" + game.game_slug}>{game.name}</Link></li>))
                }
            </div>
        )
    }
}

export default withRouter(fs.connect(['games'])(GameList));
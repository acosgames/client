import { Component } from "react";

import {
    Link,
    withRouter,
} from "react-router-dom";
import { Redirect } from 'react-router';

import '../styles/GameList.scss'
import { findGames } from '../../actions/game';
import fs from 'flatstore';
import GameListItem from "./GameListItem";

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
            <div id="game-grid-wrapper">
                <h3>Find a game to play!</h3>
                <div id="game-grid">
                    {
                        games.map(game => (<GameListItem game={game}></GameListItem>))
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(fs.connect(['games'])(GameList));
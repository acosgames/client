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

        let productionGames = games.filter(v => v.status == 3);
        let betaGames = games.filter(v => v.status == 2);
        return (
            <div id="game-grid-wrapper">
                <h3>All Ranked Games</h3>
                <div id="game-grid">
                    {
                        productionGames.map(game => (<GameListItem key={"gamelistitem-" + game.gameid} game={game}></GameListItem>))
                    }
                </div>
                <h3>Games in Beta</h3>
                <div id="game-grid">
                    {
                        betaGames.map(game => (<GameListItem key={"gamelistitem-" + game.gameid} game={game}></GameListItem>))
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(fs.connect(['games'])(GameList));
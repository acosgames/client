import { Component } from "react";

import { findDevGames } from '../actions/devgame';

import {
    Link,
    withRouter,
} from "react-router-dom";
import fs from 'flatstore';

class DevDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        findDevGames(this.props.user.id)
    }

    listGames() {
        let games = this.props.devgames || [];
        let elems = [];

        for (var i = 0; i < games.length; i++) {
            let game = games[i];
            elems.push((
                <li className="devgame-item">
                    <Link to={'/dev/game/' + game.gameid}>{game.name}</Link>
                </li>
            ))
        }
        return elems;
    }
    /*
        Dashboard
        - Published games with stats
        - beta games with stats
        - create new game
        - documentation
        - exmaple code
        - discord
    */
    render() {
        return (
            <div id="devdash">

                <ul>
                    {this.listGames()}
                </ul>
            </div>
        )
    }
}

export default withRouter(fs.connect(['devgames'])(DevDashboard));


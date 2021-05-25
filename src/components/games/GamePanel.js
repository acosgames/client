import React, { Component } from "react";

import {
    withRouter,
} from "react-router-dom";

import Connection from "./Connection";
import '../styles/GameScreen.css';
import fs from 'flatstore';
import { wsJoinGame } from "../../actions/connection";
import { joinGame, findGame } from "../../actions/game";

fs.set('iframe', null);

class GamePanel extends Component {
    constructor(props) {
        super(props);

        this.iframe = null;
        this.state = {
        }

        this.sent = 0;
        let game_slug = props.match.params.game_slug;

        let games = fs.get('games') || [];
        if (games.length == 0) {
            findGame(game_slug);
        }
        else {
            this.game = null;
            for (var i = 0; i < games.length; i++) {
                if (games[i].game_slug == game_slug) {
                    this.game = games[i];
                    break;
                }
            }
        }
        setTimeout(() => { joinGame(game_slug) }, 1000);

    }

    render() {
        let game = this.props.game;
        if (!game)
            game = this.game;

        if (!game) {
            return (<React.Fragment />)
        }
        console.log("Game data: " + game);
        let srcUrl = `http://localhost:8080/iframe/${game.gameid}/${game.version}`;
        return (
            <div id="gamepanel">

                {/* <h3>Let's Play</h3> */}
                {/* <button onClick={() => {
                    this.send('ping', 'ping');
                }}>
                    Parent Button
                    </button> */}
                <iframe className="gamescreen" ref={(c) => {
                    this.iframe = c;
                    fs.set('iframe', c);
                }}
                    src={srcUrl}
                    sandbox="allow-scripts" >
                </iframe>

                <Connection></Connection>
            </div>
        )
    }
}

let onCustomWatched = ownProps => {
    let game_slug = ownProps.match.params.game_slug;
    return [game_slug];
};
let onCustomProps = (key, value, store, ownProps) => {
    // let game_slug = ownProps.match.params.game_slug;
    return {
        game: value
    };
};
export default fs.connect([], onCustomWatched, onCustomProps)(GamePanel);

// export default withRouter(fs.connect(['games'])(GamePanel));
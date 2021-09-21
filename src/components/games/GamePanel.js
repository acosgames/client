import React, { Component } from "react";

import {
    withRouter,
} from "react-router-dom";

import Connection from "./Connection";
import '../styles/GameScreen.css';
import fs from 'flatstore';
import { wsJoinGame, wsJoinRoom } from "../../actions/connection";
import { joinGame, findGame, downloadGame } from "../../actions/game";

fs.set('iframe', null);

class GamePanel extends Component {
    constructor(props) {
        super(props);

        this.iframe = null;
        this.state = {}
        this.sent = 0;
        this.game_slug = props.match.params.game_slug;
        this.beta = props.match.params.beta;
        this.room_slug = props.match.params.room_slug;

        let games = fs.get('games') || [];
        if (games.length == 0) {
            findGame(this.game_slug);
            wsJoinRoom(this.room_slug);
        }
        else {
            this.game = null;
            for (var i = 0; i < games.length; i++) {
                if (games[i].game_slug == this.game_slug) {
                    this.game = games[i];
                    break;
                }
            }
        }
    }

    async componentDidMount() {
        let game = this.props.game;
        if (!game)
            game = this.game;
    }

    render() {
        let mode = this.props.match.params.mode;
        let game_slug = this.props.match.params.game_slug;
        let game = fs.get(game_slug);

        if (!game) {
            return (<div>Loading...</div>)
        }
        console.log("Game data: ", game);

        fs.set('iframe_' + game_slug, false);

        let version = game.version;
        if (mode == 'beta')
            version = game.latest_version;

        let srcUrl = `https://f000.backblazeb2.com/file/fivesecondgames/${game.gameid}/client/client.bundle.${version}.html`;
        return (
            <div id="gameframe">
                <div id="gamepanel">

                </div>
                <div id="gamepanel-wrapper">
                    <iframe
                        className="gamescreen"
                        ref={(c) => {
                            this.iframe = c;
                            fs.set('iframe', c);
                        }}
                        onLoad={() => {
                            fs.set('iframe_' + game_slug, true);
                            //joinGame(game, game.istest);
                        }}
                        src={srcUrl}
                        sandbox="allow-scripts"
                    />
                    <Connection></Connection>
                </div>
            </div>
        )
    }
}

let onCustomWatched = ownProps => {
    let game_slug = ownProps.match.params.game_slug;
    return [game_slug];
};
let onCustomProps = (key, value, store, ownProps) => {
    return {
        game: value
    };
};
export default withRouter(fs.connect([], onCustomWatched, onCustomProps)(GamePanel));
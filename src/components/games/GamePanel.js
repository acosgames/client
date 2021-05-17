import { Component } from "react";

import {
    withRouter,
} from "react-router-dom";

import Connection from "./Connection";
import '../styles/GameScreen.css';
import fs from 'flatstore';
import { wsJoinGame } from "../../actions/connection";
import { joinGame } from "../../actions/game";

fs.set('iframe', null);

class GamePanel extends Component {
    constructor(props) {
        super(props);

        this.iframe = null;
        this.state = {
        }

        this.sent = 0;
        let game_slug = props.match.params.game_slug;
        setTimeout(() => { joinGame(game_slug) }, 1000);

    }



    render() {
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
                    src="http://localhost:3001"
                    sandbox="allow-scripts" >
                </iframe>

                <Connection></Connection>
            </div>
        )
    }
}

export default withRouter(GamePanel);
import React, { Component } from "react";

import {
    withRouter,
} from "react-router-dom";

import Connection from "./Connection";
import '../styles/GameScreen.css';
import fs from 'flatstore';
import { wsJoinGame } from "../../actions/connection";
import { joinGame, findGame, downloadGame } from "../../actions/game";

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

            //downloadGame(this.game.gameid, this.game.version);
        }
        setTimeout(() => { joinGame(game_slug) }, 1000);

    }

    async componentDidMount() {
        let game = this.props.game;
        if (!game)
            game = this.game;

    }

    render() {
        let game = this.props.game;
        if (!game)
            game = this.game;

        if (!game || !this.props.jsgame) {
            return (<React.Fragment />)
        }
        console.log("Game data: " + game);
        // let srcUrl = `http://localhost:8080/iframe/${game.gameid}/${game.version}`;
        // srcUrl = 'data:text/html,';
        // srcUrl += `
        //     <!DOCTYPE html>
        //     <html lang="en">
        //         <head>
        //             <meta charset="utf-8" />
        //             <title>FiveSecondGames - Client Simulator</title>
        //             <meta name="description" content="FiveSecondGames Client Simulator" />
        //             <meta name="author" content="fsg" />
        //             <meta http-equiv="Content-Security-Policy" content="script-src 'self' f000.backblazeb2.com 'unsafe-inline';" />
        //         </head>
        //         <body>
        //             <div id="root"></div>
        //             <script src="${this.props.jsgame}"></script>
        //         </body>
        //     </html>
        // `;
        // srcUrl = 'https://f000.backblazeb2.com/file/fivesecondgames/iframe.html';
        let srcUrl = `https://f000.backblazeb2.com/file/fivesecondgames/${game.gameid}/client/client.bundle.${game.version}.html`;
        return (
            <div id="gamepanel">

                {/* <h3>Let's Play</h3> */}
                {/* <button onClick={() => {
                    this.send('ping', 'ping');
                }}>
                    Parent Button
                    </button> */}
                <iframe 
                    className="gamescreen" 
                    // ref={(c) => {
                    //     this.iframe = c;
                    //     fs.set('iframe', c);
                    // }}
                    src={srcUrl}
                    sandbox="allow-scripts"
                    // onLoad={() => {

                    //     console.log(this.iframe);
                    // }} 
                />

                <Connection></Connection>
            </div>
        )
    }
}

let onCustomWatched = ownProps => {
    let game_slug = ownProps.match.params.game_slug;
    return [game_slug, 'jsgame'];
};
let onCustomProps = (key, value, store, ownProps) => {
    // let game_slug = ownProps.match.params.game_slug;
    if (key == 'jsgame')
        return { jsgame: value }

    return {
        game: value
    };
};
export default fs.connect([], onCustomWatched, onCustomProps)(GamePanel);

// export default withRouter(fs.connect(['games'])(GamePanel));
import { Component } from "react";

import {
    Link,
    withRouter,
} from "react-router-dom";
import { Redirect } from 'react-router';

import '../styles/GameList.scss'
import fs from 'flatstore';
import { findGame, joinGame } from "../../actions/game";

class GameInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        let game_slug = props.match.params.game_slug;
        let game = fs.get(game_slug);
        if (!game) {
            findGame(game_slug)
        }

    }

    handleGoBack() {
        this.props.history.push("/games");
    }

    handleJoin() {
        let game_slug = this.props.match.params.game_slug;
        let game = fs.get(game_slug);
        if (!game)
            return

        joinGame(game);
    }

    handleJoinBeta() {
        let game_slug = this.props.match.params.game_slug;
        let game = fs.get(game_slug);
        if (!game)
            return

        joinGame(game, true);
    }

    render() {
        let game_slug = this.props.match.params.game_slug;
        let game = fs.get(game_slug);
        if (!game) {
            //fs.set('game', null);
            return <React.Fragment></React.Fragment>
        }

        let imgUrl = 'https://f000.backblazeb2.com/file/fivesecondgames/placeholder.png';
        if (game.preview_images && game.preview_images.length > 0)
            imgUrl = `https://f000.backblazeb2.com/file/fivesecondgames/${game.gameid}/preview/${game.preview_images}`;

        return (
            <div id="game-grid-wrapper">
                <img src={imgUrl} width="300" />
                <h3>{game.name} <span>{game.version}</span></h3>
                <div className="game-info-attributes">
                    <div className="game-info-attribute">
                        <label>Maxplayers</label> <span>{game.maxplayers}</span>
                    </div>
                    <div className="game-info-attribute">
                        <label>Maxplayers</label> <span>{game.maxplayers}</span>
                    </div>
                </div>
                <h5>{game.shortdesc}</h5>
                <p>{game.longdesc}</p>
                <div id="game-join-ranked">
                    <button onClick={() => { this.handleJoin() }}>Join Ranked</button>
                    <button onClick={() => { this.handleJoinBeta() }}>Join Beta</button>
                </div>
            </div>
        )
    }
}

export default withRouter(fs.connect(['game'])(GameInfo));
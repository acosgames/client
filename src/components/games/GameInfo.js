import { Component } from "react";

import {
    Link,
    withRouter,
} from "react-router-dom";
import { Redirect } from 'react-router';

import fs from 'flatstore';
import { findGame, joinGame } from "../../actions/game";

class GameInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        let game_slug = props.match.params.game_slug;
        try {
            let game = fs.get(game_slug);
            if (!game)
                findGame(game_slug)
        }
        catch (e) {
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

        let imgUrl = 'https://cdn.fivesecondgames.com/file/fivesecondgames/placeholder.png';
        if (game.preview_images && game.preview_images.length > 0)
            imgUrl = `https://cdn.fivesecondgames.com/file/fivesecondgames/${game.gameid}/preview/${game.preview_images}`;

        let playerCntRange = game.minplayers + '-' + game.maxplayers;
        if (game.minplayers == game.maxplayers)
            playerCntRange = game.minplayers;

        return (
            <div id="game-info" onClick={(e) => {
                if (e.target == e.currentTarget)
                    this.props.history.push('/g');
            }}>
                <div id="game-info-content">
                    <img src={imgUrl} width="300" />
                    <h3>{game.name} <span>Build: {game.version}</span></h3>
                    <div className="game-info-attributes">
                        <div className="game-info-attribute">
                            <label>Seats</label> <span>{playerCntRange}</span>
                        </div>
                    </div>
                    <h5>{game.shortdesc}</h5>
                    <p>{game.longdesc}</p>
                    <div id="game-join-ranked">
                        <button onClick={() => { this.handleJoin() }}>Join Ranked</button>
                        <button onClick={() => { this.handleJoinBeta() }}>Join Beta</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(fs.connect(['game'])(GameInfo));
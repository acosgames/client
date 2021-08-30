import { Component } from "react";

import { findDevGames } from '../../actions/devgame';

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


    }

    showInvitation() {
        let user = this.props.user;
        if (user && user.isdev) {
            return <h4>Organization: fivesecondgames</h4>
        }

        return (
            <div>
                <span><a className="button" href="https://github.com/orgs/fivesecondgames/invitation">Accept Invitation</a> to Github Organization "fivescondgames"</span>
            </div>
        )
    }

    listGames() {
        let games = this.props.devgames || [];
        let elems = [];

        for (var i = 0; i < games.length; i++) {
            let game = games[i];
            elems.push((

                <Link key={'devgames-' + game.gameid} to={'/dev/game/' + game.gameid}>{game.name}</Link>

            ))
        }
        elems.push(<Link key={'devgamescreate'} to="/dev/game/create">Create Game</Link>);
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
                {this.showInvitation()}
                <ul>
                    {this.listGames()}
                </ul>
            </div>
        )
    }
}

export default withRouter(fs.connect(['devgames'])(DevDashboard));


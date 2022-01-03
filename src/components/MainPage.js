import { Component } from "react";

import {
    withRouter,
} from "react-router-dom";
import GameList from "./games/GameList";
import GameInfo from "./games/GameInfo";


class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        gtag('event', 'mainpage');

    }

    renderGameInfo() {

        if (!this.props.match.params.game_slug)
            return (<></>)

        return (
            <div className="modal" onClick={(e) => {
                if (e.target == e.currentTarget)
                    this.props.history.push('/g');
            }}>
                <GameInfo />
            </div>
        )
    }

    render() {
        return (
            <div id="mainpage">
                <GameList />
                {/* {this.renderGameInfo()} */}
            </div>
        )
    }
}

export default withRouter(MainPage);


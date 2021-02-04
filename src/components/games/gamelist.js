import { Component } from "react";

import {
    withRouter,
} from "react-router-dom";

class GameList extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div>
                <h3>Find a game to play!</h3>

            </div>
        )
    }
}

export default withRouter(GameList);
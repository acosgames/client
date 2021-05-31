import React, { Component } from "react";

import {
    Link,
    withRouter,
} from "react-router-dom";

import fs from 'flatstore';
import { wsLeaveGame } from "../../actions/connection";

class LeaveGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {

        if (!this.props.room_slug) {
            return (<React.Fragment></React.Fragment>)
        }
        return (
            <button onClick={() => { wsLeaveGame(this.props.room_slug) }}>Leave Game</button>
        )
    }
}

export default withRouter(fs.connect(['room_slug'])(LeaveGame));
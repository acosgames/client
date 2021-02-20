import { Component, Fragment } from "react";

import {
    withRouter,
} from "react-router-dom";
import DevManageGameFields from "./DevManageGameFields";
import DevCreateClient from "./DevCreateClient";
import DevCreateServer from './DevCreateServer';
import DevClientList from './DevClientList';
import { findGame } from '../actions/devgame';

class DevManageGame extends Component {
    constructor(props) {
        super(props);

        let gameid = props.match.params.gameid;
        findGame(gameid);
        this.state = {
        }
    }

    render() {

        return (
            <div id="devmanagegame">

                <DevManageGameFields />

                <div id="manageclients">
                    <DevCreateClient />
                    <DevClientList />
                </div>

                <div id="manageservers">
                    <DevCreateServer />
                </div>
            </div>

        )
    }
}

export default withRouter(DevManageGame);
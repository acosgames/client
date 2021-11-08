import { Component, Fragment } from "react";

import {
    withRouter,
} from "react-router-dom";
import DevManageGameFields from "./DevManageGameFields";
import DevClientBundle from "./DevClientBundle";
import DevCreateServer from './DevCreateServer';
import DevClientList from './DevClientList';
import { findGame } from '../../actions/devgame';

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

                {/* <div id="testenv">
                    <h2>Test Environment</h2>
                    <div id="manageclients">
                        <h3>Add your client bundle.</h3>
                        <DevClientBundle env="test" />
                    </div>

                    <div id="manageservers">
                        <DevCreateServer env="test" />
                    </div>
                </div> */}

                {/* <div id="prodenv">
                    <h2>Production Environment</h2>
                    <div id="manageclients">
                        <h3>Add your client bundle.</h3>
                        <DevClientBundle env="test" />
                    </div>

                    <div id="manageservers">
                        <DevCreateServer env="test" />
                    </div>
                </div> */}

            </div>

        )
    }
}

export default withRouter(DevManageGame);
import { Component, Fragment } from "react";

import {
    withRouter,
} from "react-router-dom";
import DevManageGameFields from "./DevManageGameFields";
// import DevClientBundle from "./DevClientBundle";
// import DevCreateServer from './DevCreateServer';
// import DevClientList from './DevClientList';
import { clearGameFields, findGame } from '../../actions/devgame';
import { Heading, VStack } from "@chakra-ui/react";
// import { Flex } from "@chakra-ui/layout";
class DevManageGame extends Component {
    constructor(props) {
        super(props);

        clearGameFields();
        let gameid = props.match.params.gameid;
        findGame(gameid);
        this.state = {
        }
    }

    render() {

        return (
            <VStack>
                <Heading>Manage Game</Heading>
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

            </VStack>

        )
    }
}

export default withRouter(DevManageGame);
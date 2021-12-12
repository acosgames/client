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
            <DevManageGameFields />


        )
    }
}

export default withRouter(DevManageGame);